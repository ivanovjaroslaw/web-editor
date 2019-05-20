<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout__title">
          <router-link to="/">
            UI Web Editor
          </router-link>
        </span>
        <div class="mdl-layout-spacer" />
        <button
          type="button"
          class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
          @click="showModal = !showModal"
        >
          <i class="material-icons">
            logout
          </i>
        </button>

        <dialog
          v-mdl
          v-mdl-modal-show="showModal"
          class="mdl-dialog"
        >
          <h4 class="mdl-dialog__title">
            Are you sure to log out?
          </h4>
          <div class="mdl-dialog__content">
            <p>
              This will remove your current nickname and you will not be able to authenticate with same credentials.
            </p>
          </div>
          <div class="mdl-dialog__actions">
            <button
              type="button"
              class="mdl-button"
              @click="signOut()"
            >
              Agree
            </button>
            <button
              type="button"
              class="mdl-button"
              @click="showModal = !showModal"
            >
              Disagree
            </button>
          </div>
        </dialog>
      </div>
    </header>
    <main class="mdl-layout__content">
      <router-view />
    </main>
  </div>
</template>

<script>
  import { ApiAuthAdapterInstance } from './index';

  export default {
    components: {},
    data () {
      return {
        showModal: false,
      };
    },
    created () {},
    methods: {
      signOut () {
        ApiAuthAdapterInstance.signOut()
          .subscribe(
            null,
            (error) => { throw new Error(error); },
            () => {
              this.showModal = !this.showModal;
              this.$router.push('/');
            },
          );
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import 'assets/main';
</style>
