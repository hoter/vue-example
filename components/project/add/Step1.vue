<template>
  <form @submit.prevent>
    <text-field class="margin-bottom"
                name="project-name" :required="true"
                placeholder="Project name" :showTitle="false"
                v-model="projectName" :error="projectNameError"
                @input="validate">
    </text-field>

    <fieldset-git-settings :git.sync="git" ref="git">
    </fieldset-git-settings>

    <checkbox-field class="form-field--checkbox" name="distribution"
                    title="This project uses a distribution (profile)"
                    v-model="distribution">
    </checkbox-field>

    <h3>E-mails:</h3>

    <radio-field class="form-field--radio" name="emails"
                 title="Inform me about critical updates"
                 value="critical" v-model="emails">
    </radio-field>

    <radio-field class="form-field--radio" name="emails"
                 title="Inform me about all new update"
                 value="all" v-model="emails">
    </radio-field>

    <a @click.prevent="next" class="next" href="#">
      Next step
      <span class="icon-next">&nbsp;</span>
      <span class="loader" v-show="isValidating">&nbsp;</span>
    </a>
  </form>
</template>

<script>
  import CheckboxField from '@/components/common/form/CheckboxField';
  import RadioField from '@/components/common/form/RadioField';
  import TextField from '@/components/common/form/TextField';
  import FieldsetGitSettings from '../FieldsetGitSettings';

  export default {
    name: 'add-project-1',
    components: {
      'checkbox-field': CheckboxField,
      'radio-field': RadioField,
      'text-field': TextField,
      'fieldset-git-settings': FieldsetGitSettings,
    },
    data () {
      return {
        projectNameError: null,
        isValidating: false,
      };
    },
    computed: {
      projectName: {
        get () {
          return this.$store.state.newProject.name;
        },
        set (value) {
          this.$store.commit('updateNewProject', { field: 'name', value });
        },
      },
      git: {
        get () {
          return this.$store.state.newProject.git;
        },
        set (value) {
          this.$store.commit('updateNewProject', { field: 'git', value });
        },
      },
      distribution: {
        get () {
          return this.$store.state.newProject.distribution;
        },
        set (value) {
          this.$store.commit('updateNewProject', { field: 'distribution', value });
        },
      },
      emails: {
        get () {
          return this.$store.state.newProject.emails;
        },
        set (value) {
          this.$store.commit('updateNewProject', { field: 'emails', value });
        },
      },
    },
    methods: {
      validate () {
        const isValidProjectName = this.projectName.length > 0;
        this.projectNameError = isValidProjectName ? null : 'Required';

        return isValidProjectName && this.$refs.git.validate();
      },
      async next () {
        if (this.isValidating) {
          return;
        }

        this.isValidating = true;

        if (this.validate() !== false &&
            await this.$refs.git.testGitConnection() !== false) {
          this.$router.push('/projects/add/2');
        }

        this.isValidating = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .margin-bottom {
    margin-bottom: 20px;
  }

  .form-field--inline {
    display: inline-block;
    min-width: 123px;

    & + & {
      margin-left: 30px;
    }
  }

  .form-field--checkbox {
    margin-bottom: 30px;
  }

  .form-field--radio {
    margin-bottom: 12px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 17px;

    color: rgba(0, 0, 0, 0.87);
    font-size: 16px;
    font-weight: 700;
  }
</style>
