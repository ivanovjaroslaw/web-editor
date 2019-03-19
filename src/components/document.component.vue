<template>
  <div class="document">
    <div class="document-edit-area">
      <document-edit-component :document-id="documentId" />
    </div>
    <div class="chat-area">
      <chat-component :document-id="documentId" />
    </div>
  </div>
</template>

<script>
  import DocumentEditComponent from './document-edit.component';
  import ChatComponent from './chat.component';

  export default {
    name: 'DocumentComponent',
    components: { DocumentEditComponent, ChatComponent },
    data () {
      return {
        resource: null,
        document: null
      };
    },
    computed: {
      documentId () {
        return this.$route.params['documentId'];
      }
    },
    created () {
    },
    methods: {
    }
  };
</script>

<style lang="scss" scoped>
  .document-edit-area {
    float: left;
    width: 70%;
  }

  .chat-area {
    float: left;
    margin-left: 5%;
    width: 25%;
  }
</style>
