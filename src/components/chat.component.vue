<template>
  <div class="chat">
    <div class="title">
      <editable-textarea-component
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
  import Vue from 'vue';
  import MessageResourceService from '../services/message.resource.service';
  import EditableTextareaComponent from '../components/editable-textarea.component';
  import ChatMessagesComponent from '../components/chat-messages.component';
  import { authProvider, eventBus } from '../index';
  import { debounce } from 'lodash';

  const config = {
    saveDebounceDelay: 500
  };

  export default Vue.extend({
    name: 'ChatComponent',
    components: { EditableTextareaComponent, ChatMessagesComponent },
    props: {
      documentId: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        resource: null,
        newMessageContent: null
      };
    },
    computed: {
      userName () {
        return authProvider.currentUser.displayName;
      }
    },
    created () {
      this.debouncedSaveUserName = debounce(this.saveUserName, config.saveDebounceDelay);

      this.resource = new MessageResourceService();
      this.resource.documentId = this.documentId;

      if (!this.userName) {
        const randomId = Math.floor(Math.random() * (101 - 1)) + 1;
        this.saveUserName(`randomName${randomId}`);
      }

      this.update();
    },
    methods: {
      saveUserName (displayName) {
        authProvider.currentUser.updateProfile({ displayName });
        this.update();
      },
      submit () {
        const content = this.newMessageContent;

        this.resource
          .add({ content })
          .subscribe(() => {
            this.update();
          });
      },
      update () {
        eventBus.$emit('updateChatScope');
      }
    }
  });
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
