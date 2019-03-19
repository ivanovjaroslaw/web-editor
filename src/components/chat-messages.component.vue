<template>
  <div>
    <div v-if="messages">
      <div
        v-for="message in messages"
        :key="message.id"
      >
        <h3>{{ message.userUid }}</h3>
        <p>{{ message.content }}</p>
        <em>{{ message.timestamp }}</em>
      </div>
    </div>
    <template v-else>
      <p>Loading...</p>
    </template>
  </div>
</template>

<script>
  import MessageResourceService from '../services/message.resource.service';
  import { eventBus } from '../index';

  export default {
    name: 'ChatMessagesComponent',
    props: {
      documentId: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        resource: null,
        messages: null
      };
    },
    created () {
      eventBus.$on('updateChatScope', this.update);

      this.resource = new MessageResourceService();
      this.resource.documentId = this.documentId;

      this.update();
    },
    methods: {
      update () {
        this.resource
          .getList()
          .subscribe((messages) => {
            this.messages = messages;
          });
      }
    }
  };
</script>

<style scoped>

</style>
