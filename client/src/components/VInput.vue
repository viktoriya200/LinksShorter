<template>
  <div :class="$style.input">
    <label :class="$style.label" v-html="label"></label>

    <input
        v-model="lazyValue"
        v-bind="$attrs"
        type="text"
        :name="name"
        :class="$style.inner"
        @input="onInput"
    />

    <div :class="$style.error" v-html="error"></div>
  </div>
</template>

<script>
  export default {
    name: 'VInput',

    props: {
      name: {
        type: String,
        default: '',
      },

      value: {
        type: [String, Number],
        default: '',
      },

      label: {
        type: String,
        default: '',
      },

      error: {
        type: [String, Boolean],
        default: '',
      },
    },

    watch: {
      value(val) {
        if (val !== this.lazyValue) {
          let newValue = val;

          this.lazyValue = newValue;
          this.$emit('input', newValue);
        }
      },
    },

    data() {
      return {
        lazyValue: '',
      };
    },

    created() {
      this.lazyValue = this.value;
    },

    methods: {
      onInput() {
        this.$emit('input', this.lazyValue);
      },
    },
  };
</script>

<style lang="scss" module>
  .input {
    position: relative;
    width: 400px;
    font-size: 20px;

    &:not(:first-child) {
      margin-top: 32px;
    }
  }

  .label {
    display: block;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
    text-align: start;
  }

  .inner {
    width: 100%;
    padding: 20px;
    border: 1px solid grey;
    font-size: inherit;
    transition: all .3s ease;
    outline: none;
  }

  .error {
    position: absolute;
    bottom: -24px;
    left: 0;
    font-size: 14px;
    color: red;
  }
</style>
