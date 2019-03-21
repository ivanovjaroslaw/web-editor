<template>
  <div class="full-width">
    <header>
      <h1>
        <router-link to="/">
          UI Web Editor
        </router-link>
      </h1>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    components: {}
  });
</script>

<style lang="scss" scoped>
  @import 'assets/main';

  header {
    color: $color-main;
    text-align: center;
  }
</style>
