<template>
  <div class="chat">
    <div class="title">
      <editable-textarea-component
        v-if="userName"
        :content="userName"
        @onUpdate="debouncedSaveUserName($event)"
      />
    </div>
    <div>
      <chat-messages-component :document-id="documentId" />

      <form>
        <input
          v-model="newMessageContent"
          type="text"
        >
        <button
          type="button"
          @click="submit"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce';
  import { ApiAuthAdapterInstance, ApiResourceProviderNamespace } from '../index';
  import EditableTextareaComponent from '../components/editable-textarea.component';
  import ChatMessagesComponent from '../components/chat-messages.component';
  import config from '../config';
  import MessageGateway from '../gateways/message.gateway';

  export default {
    name: 'ChatComponent',
    components: { EditableTextareaComponent, ChatMessagesComponent },
    props: {
      documentId: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        newMessageContent: '',
        userName: null,
      };
    },
    created () {
      this.debouncedSaveUserName = debounce(this.saveUserName, config.form.inputDebounceInterval);

      this.userName = ApiAuthAdapterInstance.user.displayName;

      this.update();
    },
    methods: {
      saveUserName (displayName) {
        ApiAuthAdapterInstance
          .setUserDisplayName(displayName)
          .subscribe(() => { this.update(); });
      },
      submit () {
        const content = this.newMessageContent;
        const documentId = this.documentId;
        const timestamp = ApiResourceProviderNamespace.ServerValue.TIMESTAMP;
        const userUid = ApiAuthAdapterInstance.user.uid;

        MessageGateway
          .add({ content, timestamp, userUid }, { documentId })
          .subscribe(() => {
            this.update();
            this.newMessageContent = '';
          });
      },
      update () {
        this.userName = ApiAuthAdapterInstance.user.displayName;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import 'assets/main';

  .chat {
    width: 100%;

    .title {
      font-size: 2em;
      margin-bottom: $margin-bottom;
    }
  }
</style>
