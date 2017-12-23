<template>
  <form @submit.prevent>
    <text-field class="form-field--inline" type="url"
                name="url" :required="true"
                placeholder="Live site URL" :showTitle="false"
                v-model="url" :error="urlError"
                @input="validate">
    </text-field>

    <option-field class="form-field--inline" name="framework"
                  title="Framework" :showTitle="true"
                  v-model="framework">
      <option>Drupal 7</option>
      <option>Drupal 8</option>
    </option-field>

    <p>
      If you use HTTP authentication than use the folowing<br />
       construction:
      <span class="url">protocol://username:password@url</span>
    </p>

    <a @click.prevent="prev" class="prev" href="#">
      <span class="icon-prev">&nbsp;</span>
      Prev step
    </a>

    <a @click.prevent="next" class="next" href="#">
      Next step
      <span class="icon-next">&nbsp;</span>
    </a>
  </form>
</template>

<script>
  import validUrl from 'valid-url';

  import OptionField from '@/components/common/form/OptionField';
  import TextField from '@/components/common/form/TextField';

  export default {
    name: 'add-project-3',
    components: {
      'option-field': OptionField,
      'text-field': TextField,
    },
    data () {
      return {
        urlError: null,
      };
    },
    computed: {
      url: {
        get () {
          return this.$store.state.newProject.url;
        },
        set (value) {
          this.$store.commit('updateNewProject', { field: 'url', value });
        },
      },
      framework: {
        get () {
          return this.$store.state.newProject.framework;
        },
        set (value) {
          this.$store.commit('updateNewProject', { field: 'framework', value });
        },
      },
      isValidUrl () {
        return validUrl.isWebUri(this.url);
      },
    },
    methods: {
      validate () {
        const isValidUrl = this.isValidUrl;
        this.urlError = isValidUrl ? null : 'Invalid url';

        return isValidUrl;
      },
      prev () {
        this.$router.push('/projects/add/2');
      },
      next () {
        if (this.validate()) {
          this.$router.push('/projects/add/4');
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .form-field--inline {
    display: inline-block;
    margin-bottom: 20px;

    & + & {
      margin-left: 4%;
    }

    &:nth-of-type(1) {
      width: 55%;
    }

    &:nth-of-type(2) {
      width: 40%;
    }
  }

  .url {
    color: #63676b;
  }
</style>
