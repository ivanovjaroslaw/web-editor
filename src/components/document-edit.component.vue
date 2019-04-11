<template>
  <div class="document">
    <template v-if="isLoaded">
      <div class="title">
        <editable-textarea-component
          :content="title"
          @onUpdate="saveTitle($event)"
        />
      </div>
      <div class="content">
        <editable-textarea-component
          :content="content"
          @onUpdate="saveContent($event)"
        />
      </div>
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
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
    color: $color-text;

    .title {
      font-size: 2em;
      margin-bottom: $margin-bottom;
    }
  }
</style>
