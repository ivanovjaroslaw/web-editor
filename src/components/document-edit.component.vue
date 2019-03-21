<template>
  <div class="document">
    <template v-if="document">
      <div class="title">
        <editable-textarea-component
          :content="document.title"
          @onUpdate="saveTitle($event)"
        />
      </div>
      <div class="content">
        <editable-textarea-component
          :content="document.content"
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
  import Vue from 'vue';
  import DocumentResourceService from '../services/document.resource.service';
  import EditableTextareaComponent from '../components/editable-textarea.component';
  import { debounce } from 'lodash';

  const config = {
    saveDebounceDelay: 500
  };

  export default Vue.extend({
    name: 'DocumentEditComponent',
    components: { EditableTextareaComponent },
    props: {
      documentId: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        resource: null,
        document: null
      };
    },
    created () {
      this.debouncedSave = debounce(this.save, config.saveDebounceDelay);

      this.resource = new DocumentResourceService();

      this.resource
        .getItem(this.documentId)
        .subscribe((doc) => {
          if (!doc.exists) {
            throw new Error('No such document!');
          }
          this.document = doc.data();
        });
    },
    methods: {
      saveTitle (title) {
        this.document.title = title;

        this.debouncedSave();
      },
      saveContent (content) {
        this.document.content = content;

        this.debouncedSave();
      },
      save () {
        this.resource
          .save(this.documentId, this.document)
          .subscribe();
      }
    }
  });
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
