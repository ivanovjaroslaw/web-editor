<template>
  <div>
    <div v-if="messages">
      <div
        v-for="message in messages"
        :key="message.id"
      >
        <h3 v-if="userNames[message.userUid]">
          {{ userNames[message.userUid] }}
        </h3>
        <p>{{ message.content }}</p>
        <em>{{ message.timestamp | formatDate }}</em>
      </div>
    </div>
    <template v-else>
      <p>Loading...</p>
    </template>
  </div>
</template>

<script>
  import MessageGateway from '../gateways/message.gateway';
  import UserGateway from '../gateways/user.gateway';

  export default {
    name: 'ChatMessagesComponent',
    props: {
      documentId: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        messages: null,
        userNames: {},
      };
    },
    created () {
      const documentId = this.documentId;
      MessageGateway
        .listenList({ documentId })
        .subscribe((messages) => {
          this.messages = messages;
        });

      UserGateway
        .listenList()
        .subscribe((users) => {
          this.userNames = {};
          users.forEach(user => {
            this.userNames[user.uid] = user.displayName;
          });
        });
    },
    methods: {
    },
  };
</script>

<style scoped>

</style>
