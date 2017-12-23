<template>
  <form class="content-inner" @submit.prevent="submit">
    <h3>Connection credentials:</h3>

    <p><strong>User ID:</strong> {{ userId }}</p>
    <p><strong>Access token:</strong> {{ accessToken }}</p>

    <ol>
      <li>
        <a :href="agentModuleUrl" class="strong">Install DruLabs module</a>
        on your web site 
      </li>

      <li>
        <strong class="underline-dashed">Copy User ID</strong>
        to the module’s settings page
      </li>

      <li>
        <strong class="underline-dashed">Copy Access token</strong>
        to the module’s settings page
      </li>
    </ol>

    <text-field class="form-field" type="url"
                name="url" :required="true"
                title="Live site URL" :showTitle="true"
                placeholder="https://admin:securepass/"
                v-model="website.url" :error="urlError"
                @input="validate">
    </text-field>

    <checkbox-field name="composer"
                    title="Composer mode"
                    v-model="website.useComposer">
    </checkbox-field>

    <div class="buttons">
      <button type="reset">Reset</button>
      <button type="submit">Save</button>
    </div>
  </form>
</template>

<script>
  import validUrl from 'valid-url';

  import CheckboxField from '@/components/common/form/CheckboxField';
  import TextField from '@/components/common/form/TextField';

  import api from '@/api/index';
  import config from '@/config';

  export default {
    name: 'project-details-site-config',
    components: {
      'checkbox-field': CheckboxField,
      'text-field': TextField,
    },
    props: ['website'],
    data () {
      return {
        urlError: null,
        composer: true,
      };
    },
    computed: {
      agentModuleUrl () {
        return config.host + config.filesRootUrl + config.clientModule;
      },
      isValidUrl () {
        return validUrl.isWebUri(this.website.url);
      },
      userId () {
        return this.$store.state.user.currentUser.userId;
      },
      accessToken () {
        return this.website.accessToken;
      },
    },
    methods: {
      validate () {
        const isValidUrl = this.isValidUrl;
        this.urlError = isValidUrl ? null : 'Invalid url';

        return isValidUrl;
      },
      async submit () {
        if (this.validate()) {
          try {
            await api.website.edit(this.website.nid, {
              'website_url': [{'value': this.website.url}],
              'website_use_composer': [{'value': this.website.useComposer}],
            });
          } catch (error) {
            const message = error.response.data.message;

            if (message) {
              console.log(message);
              alert(message);
            }
          }

          this.$router.push(`/projects/${this.website.nid}`);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .content-inner {
    padding: 42px 43px 42px 43px;

    box-shadow: 2px 4px 15px rgba(232, 237, 250, 0.5);
    background-color: #ffffff;
  }

  h3 {
    margin-bottom: 25px;
  }

  ol {
    margin: 0;

    color: #212121;
    font-size: 18px;
    font-weight: 300;
    letter-spacing: 0.18px;
  }

  li {
    margin-bottom: 26px;
  }

  strong {
    font-weight: 400;
    line-height: 14px
  }

  a.strong {
    color: #212121;
    font-weight: 400;
    line-height: 14px
  }

  .underline {
    text-decoration: underline;
  }

  .underline-dashed {
    text-decoration: underline;
    text-decoration-style: dashed;
  }

  .form-field {
    margin-bottom: 15px;
  }

  .buttons {
    margin-top: 34px;
    text-align: right;
  }

  button {
    background: transparent;
    border: none;
    color: rgba(0, 0, 0, 0.54);
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.54px;

    &[type=submit] {
      color: #2ba6e1;
    }

    & + & {
      margin-left: 53px;
    }
  }
</style>
