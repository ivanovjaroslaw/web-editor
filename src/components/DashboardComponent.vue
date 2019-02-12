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
export default {
  name: 'DashboardComponent',
  data () {
    return {
      newDocumentName: '1'
    };
  },
  methods: {
    submit () {
      const name = 'document';
      const documentId = Math.floor(Math.random() * 1000 + 1).toString();
      this.$router.push({ name, params: { documentId } });
    }
  }
};
</script>

<style scoped></style>
