<template>
  <div
    class="textarea"
    contenteditable
    @input="update"
  />
</template>

<script>
  export default {
    name: 'EditableTextareaComponent',
    props: {
      content: {
        type: String,
        required: true
      }
    },
    mounted () {
      this.$el.innerText = this.content;
    },
    methods: {
      update (event) {
        this.$emit('onUpdate', event.target.innerText);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import 'assets/main';

 .textarea {
     padding: $padding;
     border: 1px solid $color-border;
     border-radius: 5px;
 }
</style>
