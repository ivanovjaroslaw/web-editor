<template>
  <div>
    <h2>This is a Dashboard page</h2>
    <form>
      <input
        v-model="newDocumentName"
        type="text"
      >
      <button
        type="button"
        @click="submit"
      >
        Create
      </button>
    </form>
  </div>
</template>

<script>
  import DocumentGateway from '../gateways/document.gateway';

  export default {
    name: 'DashboardComponent',
    data () {
      return {
        newDocumentName: 'New Document',
      };
    },
    created () {
    },
    methods: {
      submit () {
        const name = 'document';

        DocumentGateway
          .add({ title: this.newDocumentName, content: '' })
          .subscribe((id) => {
            this.$router.push({ name, params: { documentId: id } });
          });
      },
    },
  };
</script>

<style scoped></style>
