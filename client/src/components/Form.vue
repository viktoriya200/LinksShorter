<template>
  <form
      :class="$style.form"
      @submit.prevent="handleSubmit"
      @keydown.enter.prevent="handleSubmit"
  >
    <h1>Add new alias</h1>

    <VInput
        v-model="values.alias"
        :error="errors.alias"
        label="Alias"
        @input="errors.alias = ''"
    />

    <VInput
        v-model="values.full_link"
        :error="errors.full_link"
        label="Full link"
        @input="errors.full_link = ''"
    />

    <button type="submit" :class="$style.button">Submit</button>

    <transition name="fade">
      <div v-if="resultMessage"
           :class="$style.result"
      >
        {{ resultMessage }}
      </div>
    </transition>
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
  },

  methods: {
    async handleSubmit() {
      const validate = () => {
        let isValidated = true;

        if (!this.values.alias) {
          this.errors.alias = 'Required field';

          isValidated = false;
        }

        if (!this.values.full_link) {
          this.errors.full_link = 'Required field';

          isValidated = false;
        }

        return isValidated;
      };

      if (!validate()) {
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/alias', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({alias: this.values.alias, link: this.values.full_link})
        })

        if(response.ok) {
          this.resultMessage = 'Successfully send';
        } else {
          this.resultMessage = 'An error has occurred';
        }

        this.afterSubmit();
      } catch(e) {
        console.warn('Form/handleSubmit:', e);
      }
    },

    afterSubmit() {
      this.values.alias = '';
      this.values.full_link = '';

      setTimeout(() => {
        this.resultMessage = '';
      }, 3000)
    },
  }
};
</script>

<style lang="scss" module>
  .form{
    position: relative;
  }

  .button {
    margin-top: 32px;
  }

  .result {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #e9ccfc;
    font-size: 26px;
  }
</style>
