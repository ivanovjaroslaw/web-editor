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
  import Vue from 'vue';
  import DocumentResourceService from '../services/document.resource.service';

  export default Vue.extend({
    name: 'DashboardComponent',
    data () {
      return {
        newDocumentName: 'New Document',
        resource: null
      };
    },
    created () {
      this.resource = new DocumentResourceService();
    },
    methods: {
      submit () {
        const name = 'document';

        this.resource
          .add({ title: this.newDocumentName, content: '' })
          .subscribe((docRef) => {
            this.$router.push({ name, params: { documentId: docRef.id } });
          });
      }
    }
  });
</script>

<style scoped></style>
