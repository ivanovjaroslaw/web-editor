<template>
  <div class="mdl-grid">
    <h4 class="mdl-cell mdl-cell--12-col">
      Dashboard page
    </h4>
    <div class="mdl-cell mdl-cell--12-col mdl-cell--6-col-desktop mdl-shadow--2dp mdl-grid">
      <form>
        <div
          v-mdl
          class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
        >
          <input
            id="document-title"
            v-model="newDocumentName"
            type="text"
            class="mdl-textfield__input"
          >
          <label
            class="mdl-textfield__label"
            for="document-title"
          >
            New Document Title
          </label>
        </div>

        <button
          v-mdl
          type="button"
          class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"
          @click="submit"
        >
          <i class="material-icons">
            check
          </i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import DocumentGateway from '../gateways/document.gateway';

  export default {
    name: 'DashboardComponent',
    data () {
      return {
        newDocumentName: '',
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
