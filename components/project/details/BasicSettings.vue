<template>
  <form class="content-inner" @submit.prevent="submit">
    <text-field class="margin-bottom field" name="project-name" :required="true"
                title="Project name" :showTitle="true"
                v-model="website.name" :error="projectNameError"
                @input="validate">
    </text-field>

    <fieldset-git-settings :git.sync="website.git" ref="git">
    </fieldset-git-settings>

    <checkbox-field class="margin-bottom field" name="distribution"
                    title="This project uses a distribution (profile)"
                    v-model="website.distribution">
    </checkbox-field>

    <fieldset class="margin-bottom fieldset">
      <legend>Drupal</legend>

      <div class="column-50">
        <text-field class="field"
                    name="drupal_username"
                    placeholder="User name"
                    v-model="website.drupal.username">
        </text-field>
      </div>

      <div class="column-50">
        <text-field class="field" type="password"
                    name="drupal_password"
                    placeholder="Password"
                    v-model="website.drupal.password">
        </text-field>
      </div>
    </fieldset>

    <option-field class="field margin-bottom"
                  name="agency"
                  title="Agency" :showTitle="true"
                  v-model="website.agency" :error="agencyError">
      <option value="0" selected>
        None
      </option>

      <option v-for="agency in agencies" :value="agency.uid">
        {{ agency.name }}
      </option>
    </option-field>

    <radio-field class="field" name="emails"
                 title="Inform me about critical updates"
                 value="critical" v-model="website.emails">
    </radio-field>

    <radio-field class="field" name="emails"
                 title="Inform me about all new update"
                 value="all" v-model="website.emails">
    </radio-field>

    <div class="buttons">
      <button type="reset">Reset</button>

      <button type="submit">
        Save
        <span class="loader" v-show="isValidating">&nbsp;</span>
      </button>
    </div>

    <hr />

    <button @click.prevent="deleteProject">Delete project</button>
  </form>
</template>

<script>
  import CheckboxField from '@/components/common/form/CheckboxField';
  import OptionField from '@/components/common/form/OptionField';
  import RadioField from '@/components/common/form/RadioField';
  import TextField from '@/components/common/form/TextField';
  import FieldsetGitSettings from '../FieldsetGitSettings';

  import api from '@/api/index';

  export default {
    name: 'project-details-basic-settings',
    components: {
      'checkbox-field': CheckboxField,
      'option-field': OptionField,
      'radio-field': RadioField,
      'text-field': TextField,
      'fieldset-git-settings': FieldsetGitSettings,
    },
    props: ['website'],
    data () {
      return {
        tags: '',
        projectNameError: null,
        agencyError: null,
        isValidating: false,
      };
    },
    computed: {
      agencies () {
        return this.$store.state.agencies;
      },
    },
    methods: {
      validate () {
        const isValidProjectName = this.website.name.length > 0;
        this.projectNameError = isValidProjectName ? null : 'Required';

        return isValidProjectName && this.$refs.git.validate();
      },
      deleteProject () {
        this.$router.push(`/projects/${this.website.nid}/delete`);
      },
      async submit () {
        if (this.isValidating) {
          return;
        }

        this.isValidating = true;

        if (this.validate() !== false &&
            await this.$refs.git.testGitConnection() !== false) {
          const website = this.website;
          const data = website.toDrupal();

          try {
            await api.website.edit(this.website.nid, data);
          } catch (error) {
            const message = error.response.data.message;

            if (message) {
              console.log(message);
              alert(message);
            }
          }

          this.$router.push(`/projects/${this.website.nid}`);
        }

        this.isValidating = false;
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

  .margin-bottom {
    margin-bottom: 16px;
  }

  .column + .column .field {
    margin-left: 10px;
  }

  .fieldset {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    padding: 10px;

    legend {
      color: rgba(0, 0, 0, 0.73);
    }
  }

  .buttons {
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
