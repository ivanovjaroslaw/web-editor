<template>
  <div class="mdl-grid">
    <h4 class="mdl-cell mdl-cell--12-col">
      Document content
    </h4>
    <template v-if="isLoaded">
      <div class="mdl-cell mdl-cell--12-col title">
        <editable-textarea-component
          :content="title"
          :tooltip="'Document Title'"
          @onUpdate="saveTitle($event)"
        />
      </div>
      <div class="mdl-cell mdl-cell--12-col">
        <editable-textarea-component
          :content="content"
          :tooltip="'Document Content'"
          @onUpdate="saveContent($event)"
        />
      </div>
    </template>
    <div
      v-mdl
      class="mdl-spinner mdl-js-spinner"
      :class="{ 'is-active': !isLoaded }"
    />
  </div>
</template>

<script>
  import DocumentGateway from '../gateways/document.gateway';
  import EditableTextareaComponent from '../components/editable-textarea.component';
  import debounce from 'lodash/debounce';
  import config from '../config';

  export default {
    name: 'DocumentEditComponent',
    components: { EditableTextareaComponent },
    props: {
      documentId: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        title: null,
        content: null,
        isLoaded: false,
      };
    },
    created () {
      this.debouncedSave = debounce(this.save, config.form.inputDebounceInterval);

      DocumentGateway
        .listenItem(this.documentId)
        // @todo: usage of arrow fn here will be provided with SafeSubscriber context instead of actual 'this'
        .subscribe(function (document) {
          if (!document) {
            throw new Error('No such document!');
          }

          this.title = document.title || '';
          this.content = document.content || '';

          this.isLoaded = true;
        }.bind(this));
    },
    methods: {
      saveTitle (title) {
        this.title = title;

        this.debouncedSave();
      },
      saveContent (content) {
        this.content = content;

        this.debouncedSave();
      },
      save () {
        const body = {
          title: this.title,
          content: this.content,
        };
        DocumentGateway
          .save(this.documentId, body)
          .subscribe();
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import 'assets/main';

  .document {
    .title {
      font-size: 2em;
      margin-bottom: $margin-bottom;
    }
  }
</style>
