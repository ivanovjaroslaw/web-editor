<template>
  <div
    :title="documentId"
    class="text-editor"
  >
    <h2>This is a Document #{{ documentId }} !#{{ reverseDocumentId() }}page</h2>
    <div
      class="title"
      contenteditable="true"
    >
      Title
    </div>
    <div
      class="content"
      contenteditable="true"
    >
      Text
    </div>
  </div>
</template>

<script>
import { db } from '../index';

export default {
  name: 'DocumentComponent',
  data () {
    return {
      document: null
    };
  },
  firestore () {
    return {
      document: db.collection('documents').doc('dw4R9KsUUYopeuiSAcf2')
    };
  },
  computed: {
    documentId () {
      return this.$route.params['documentId'];
    }
  },
  methods: {
    reverseDocumentId () {
      return this.documentId.toString().split('').reverse().join('');
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to, from);
    next();
  }
};
</script>

<style lang="scss" scoped>
  .text-editor {
    color: #555;

    &:focus {
      outline: none;
    }

    .title {
      padding: 10px;
      font-size: 2em;
      margin-bottom: 10px;
    }

    .content {
      padding: 10px;
    }
  }
</style>
