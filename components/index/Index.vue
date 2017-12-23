<template>
  <div>
    <div class="content-inner">
      <h3>ADCI Solutions</h3>
      <p>We are a design and development web-shop specializing in Drupal projects of any scale. Our team is always eager to brainstorm the best possible solutions for our customers.</p>
      <ul>
        <li>9 years of experience</li>
        <li>248 websites launched</li>
        <li>35 professionals in their field</li>
        <li>60 Drupal contributions</li>
      </ul>

      <h3>We love what we do</h3>
      <p>We don’t just develop websites, we put ourselves in customers' shoes to find all their tricky problems and suggest as customized and efficient solution as possible.</p>

      <h4>Drupal Development</h4>
      <p>We develop websites and web-services using Drupal CMS</p>

      <h4>Responsive Web-Design</h4>
      <p>We create delightful experience for users across many devices</p>

      <h4>Migrating to Drupal</h4>
      <p>We can move your website to Drupal or upgrade to latest Drupal versions</p>

      <h4>Support and Maintenance</h4>
      <p>After the project is done, we’ll be there for you to help with any issues</p>

      <h4>Performance Optimization</h4>
      <p>We'll find and fix each imperfection in order to speed up your website</p>

      <h4>Search engine optimization</h4>
      <p>We make search engine friendly websites with high performance</p>

      <h3>Subscribe</h3>
      <form @submit.prevent="submit">
        <text-field class="field" type="email"
                    name="email" :required="true"
                    title="Email" :showTitle="true"
                    v-model="subscribe.email.value"
                    :error="subscribe.email.error">
        </text-field>

        <button type="submit">
          Subscribe
          <span class="loader" v-show="subscribe.isSubmitting">&nbsp;</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import api from '@/api';

  import TextField from '@/components/common/form/TextField';

  export default {
    name: 'menu',
    components: {
      'text-field': TextField,
    },
    data () {
      return {
        subscribe: {
          email: {
            value: '',
            error: null,
          },
          isSubmitting: false,
        },
      };
    },
    methods: {
      async submit () {
        if (this.subscribe.isSubmitting) {
          return;
        }

        this.subscribe.isSubmitting = true;
        this.subscribe.email.error = null;

        try {
          await api.subscription.subscribe({
            email: this.subscribe.email.value,
          });
        } catch (error) {
          if (error.email) {
            this.subscribe.email.error = error.email;
          }
        }

        this.subscribe.isSubmitting = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .content-inner {
    width: 500px;
    padding: 20px 44px 44px;
    margin-top: 39px;
    margin-bottom: 44px;
    box-shadow: -3px 3px 15px rgba(232, 237, 250, 0.5);
    border-radius: 2px;
    background-color: #fff;
  }

  .field {
    width: 236px;
    margin: 0 auto;
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
