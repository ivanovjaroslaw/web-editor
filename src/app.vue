<template>
  <div class="full-width">
    <header>
      <h1>
        <router-link to="/">
          UI Web Editor
        </router-link>
      </h1>
      <button
        class="sign-out-button"
        type="button"
        @click="signOut"
      >
        Sign Out
      </button>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
  import { ApiAuthAdapterInstance } from './index';

  export default {
    components: {},
    data () {
      return {};
    },
    created () {},
    methods: {
      signOut () {
        ApiAuthAdapterInstance.signOut()
          .subscribe(
            null,
            (error) => { throw new Error(error); },
            () => {
              this.$router.push('/');
            },
          );
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import 'assets/main';

  header {
    text-align: center;

    h1 * {
      color: $color-main;
    }

    .sign-out-button {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
</style>
