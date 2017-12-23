<template>
  <fieldset class="margin-bottom fieldset">
    <legend>Git settings</legend>

    <div class="margin-bottom column-20">
      <option-field class="field"
                    name="git_protocol"
                    v-model="git.protocol">
        <option value="http">HTTP</option>
        <option value="https">HTTPS</option>
        <option value="ssh">SSH</option>
      </option-field>
    </div>

    <div class="column-60">
      <text-field class="field"
                  name="git_url"
                  title="URL" :showTitle="true"
                  v-model="git.url" :error="errors.urlError">
      </text-field>
    </div>

    <div class="column-20">
      <text-field class="field"
                  name="tag"
                  title="Tag" :showTitle="true"
                  v-model="git.tag" :error="errors.tagError">
      </text-field>
    </div>

    <template v-if="git.protocol === 'http' || git.protocol === 'https'">
      <text-field class="margin-bottom field"
                  name="git_username"
                  title="User name" :showTitle="true"
                  v-model="git.username" :error="errors.usernameError">
      </text-field>

      <text-field class="margin-bottom field" type="password"
                  name="git_password"
                  title="Password" :showTitle="true"
                  v-model="git.password" :error="errors.passwordError">
      </text-field>
    </template>
    <template v-else-if="git.protocol === 'ssh'">
      <text-field class="margin-bottom field"
                  name="git_sshTitle"
                  title="Title" :showTitle="true"
                  v-model="git.sshTitle">
      </text-field>

      <textarea-field class="margin-bottom field"
                      name="git_sshKey"
                      title="Key" :showTitle="true"
                      v-model="git.sshKey" :error="errors.sshKeyError">
      </textarea-field>
    </template>

    <hr/>

    <textarea-field class="field"
                name="git_commitMessage"
                title="Commit message" :showTitle="true"
                v-model="git.commitMessage">
    </textarea-field>

    <h4>Available tokens:</h4>

    <ul>
      <li>[update:name]</li>
      <li>[update:version-from]</li>
      <li>[update:version-to]</li>
    </ul>

    <p v-if="errors.connectionError" class="error">
      {{ errors.connectionError }}
    </p>
  </fieldset>
</template>

<script>
  import OptionField from '@/components/common/form/OptionField';
  import TextField from '@/components/common/form/TextField';
  import TextareaField from '@/components/common/form/TextareaField';

  import api from '@/api/index';

  export default {
    name: 'project-details-basic-settings',
    components: {
      'text-field': TextField,
      'textarea-field': TextareaField,
      'option-field': OptionField,
    },
    props: ['git'],
    data: function () {
      return {
        errors: {
          connectionError: null,
          urlError: null,
          tagError: null,
          usernameError: null,
          passwordError: null,
          sshKeyError: null,
        }
      };
    },
    methods: {
      validate () {
        this.errors.connectionError = null;
        this.errors.urlError = null;
        this.errors.tagError = null;
        this.errors.usernameError = null;
        this.errors.passwordError = null;
        this.errors.sshKeyError = null;

        if (this.git.url.length === 0) {
          return true;
        }

        const gitProtocol = this.git.protocol;

        if (gitProtocol === 'http' || gitProtocol === 'https') {
          const isValidGitUsername = this.git.username.length > 0;
          this.errors.usernameError = isValidGitUsername ? null : 'Required';

          const isValidGitPassword = this.git.password.length > 0;
          this.errors.passwordError = isValidGitPassword ? null : 'Required';

          return isValidGitUsername && isValidGitPassword;
        } else if (gitProtocol === 'ssh') {
          const isValidGitSshKey = this.git.sshKey.length > 0;
          this.errors.sshKeyError = isValidGitSshKey ? null : 'Required';

          return isValidGitSshKey;
        } else {
          return false;
        }
      },
      async testGitConnection () {
        if (this.git.url.length === 0) {
          return true;
        }

        let result = false;
        const gitProtocol = this.git.protocol;

        this.errors.connectionError = null;

        try {
          if (gitProtocol === 'http' || gitProtocol === 'https') {
            const response = await api.git.testHttp({
              protocol: gitProtocol,
              url: this.git.url,
              tag: this.git.tag,
              username: this.git.username,
              password: this.git.password,
            });

            result = response.data.result;

            if (response.data.error) {
              this.errors.connectionError = response.data.error
                  .replace(this.git.password, '********');
            }
          } else if (gitProtocol === 'ssh') {
            const response = await api.git.testSsh({
              protocol: gitProtocol,
              url: this.git.url,
              tag: this.git.tag,
              key: this.git.sshKey,
            });

            result = response.data.result;

            if (response.data.error) {
              this.errors.connectionError = response.data.error;
            }
          }
        } catch (error) {
          if (error.response) {
            const message = error.response.data;

            if (message) {
              console.log(message);
              this.errors.connectionError = message;
            }
          }
        }

        return result;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .margin-bottom {
    margin-bottom: 16px;
  }

  .fieldset {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    padding: 10px;

    legend {
      color: rgba(0, 0, 0, 0.73);
    }

    .error {
      margin-top: 20px;
      color: #ff4877;
    }
  }

  hr {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  h4 {
    margin-top: 25px;
    margin-bottom: 0;

    font-size: 16px;
    font-weight: 400;
  }

  ul {
    font-size: 14px;
  }

  .column + .column .field {
    margin-left: 10px;
  }
</style>
