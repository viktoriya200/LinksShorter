<template>
  <form>
    <VInput />

    <VInput />

    <button type="submit">Submit</button>
  </form>
</template>

<script>
import VInput from './VInput.vue';

export default {
  name: 'Form',

  components: {
    VInput,
  },

  data() {
    return {
      values: {
        alias: '',
        full_link: '',
      },

      errors: {
        alias: '',
        full_link: '',
      },

      flags: {
        isLoading: false,
        isSuccess: false,
      },

      resultMessage: '',
    };
  }
};
</script>

<style lang="scss" module>
  .read-the-docs {
    color: #888;
  }
</style>
