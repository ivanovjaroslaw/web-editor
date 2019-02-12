<template>
  <div class="full-width">
    <header>
      <h1>UI Web Editor</h1>
    </header>

    <main>
      <hello-component name="World" />

      <router-link to="/">
        Go to Home
      </router-link>

      <router-link to="/123">
        Go to Document
      </router-link>

      <router-view />
    </main>
  </div>
</template>

<script>
import HelloComponent from './components/HelloComponent.vue';

export default {
  components: { HelloComponent },
  created () {
    console.log('created');
  }
};
</script>

<style scoped>
header {
  background: blue;
  color: white;
  text-align: center;
}
</style>
