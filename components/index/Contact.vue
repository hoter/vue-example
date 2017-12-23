<template>
  <div>
    <h2>Contact</h2>

    <form @submit.prevent="submit">
      <text-field class="field"
                  name="name" :required="true"
                  title="Name" :showTitle="true"
                  v-model="contact.name.value"
                  :error="contact.name.error">
      </text-field>

      <text-field class="field" type="email"
                  name="email" :required="true"
                  title="E-mail" :showTitle="true"
                  v-model="contact.email.value"
                  :error="contact.email.error">
      </text-field>

      <textarea-field class="field"
                      name="message" :required="true"
                      title="Message" :showTitle="true"
                      v-model="contact.message.value"
                      :error="contact.message.error">
      </textarea-field>

      <button type="submit">
        Submit
        <span class="loader" v-show="contact.isSubmitting">&nbsp;</span>
      </button>
    </form>
  </div>
</template>

<script>
  import TextField from '@/components/common/form/TextField';
  import TextareaField from '@/components/common/form/TextareaField';

  import api from '@/api/index';

  export default {
    name: 'contact-form',
    components: {
      'text-field': TextField,
      'textarea-field': TextareaField,
    },
    data () {
      return {
        contact: {
          name: {
            value: '',
            error: null,
          },
          email: {
            value: '',
            error: null,
          },
          message: {
            value: '',
            error: null,
          },
          isSubmitting: false,
        },
      };
    },
    methods: {
      async submit (event) {
        if (this.contact.isSubmitting) {
          return;
        }

        this.contact.isSubmitting = true;
        this.contact.name.error = null;
        this.contact.email.error = null;
        this.contact.message.error = null;

        try {
          await api.contact.submit({
            name: this.contact.name.value,
            email: this.contact.email.value,
            message: this.contact.message.value,
          });
        } catch (error) {
          if (error.name) {
            this.contact.name.error = error.name;
          }

          if (error.email) {
            this.contact.email.error = error.email;
          }

          if (error.message) {
            this.contact.message.error = error.message;
          }
        }

        this.contact.isSubmitting = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  form {
    width: 500px;
    padding-top: 20px;
    padding-bottom: 44px;
    margin-top: 39px;
    margin-bottom: 44px;
    box-shadow: -3px 3px 15px rgba(232, 237, 250, 0.5);
    border-radius: 2px;
    background-color: #fff;
  }

  .field {
    width: 320px;
    margin: 0 auto 24px auto;
  }

  button {
    width: 236px;
    height: 50px;
    margin-top: 20px;
    border: none;
    border-radius: 2px;
    background-color: #2ba6e1;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.9px;
    text-transform: uppercase;
  }
</style>
