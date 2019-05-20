<template>
  <div class="mdl-grid">
    <h4 class="mdl-cell mdl-cell--12-col">
      Messages
    </h4>
    <div class="mdl-cell mdl-cell--12-col title">
      <editable-textarea-component
        v-if="userName"
        :content="userName"
        :tooltip="'Current Username'"
        @onUpdate="debouncedSaveUserName($event)"
      />
    </div>
    <div class="mdl-cell mdl-cell--12-col mdl-shadow--2dp">
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col">
          <form>
            <div
              v-mdl
              class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
            >
              <input
                id="document-title"
                v-model="newMessageContent"
                type="text"
                class="mdl-textfield__input"
              >
              <label
                class="mdl-textfield__label"
                for="document-title"
              >
                New Message Content
              </label>
            </div>

            <button
              v-mdl
              type="button"
              class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"
              @click="submit"
            >
              <i class="material-icons">
                add
              </i>
            </button>
          </form>
        </div>
        <div class="mdl-cell mdl-cell--12-col">
          <chat-messages-component :document-id="documentId" />
        </div>
      </div>
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

    .title {
      font-size: 2em;
      margin-bottom: $margin-bottom;
    }
  }
</style>
