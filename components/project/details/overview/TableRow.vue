<template>
  <tr>
    <td>
      <span :class="updateIconClass">&nbsp;</span>
    </td>
    <td>{{ update.name | replace('_', ' ') | capitalize }}</td>
    <td>{{ projectType | capitalize }}</td>
    <td>
      {{ update.existing_version }}<span v-if="update.hasUpdate">&nbsp;»
        <a :href="recommendedLink">{{ update.recommended }}</a>
      </span>
    </td>
    <td>
      <template v-if="update.hasUpdate">
        <a v-if="!isInProfile"
           href="#" class="button"
           @click.prevent="applyUpdate">
          Update
        </a>
        <span v-else class="distribution">
          Can't apply update: in profile
        </span>

        <span class="loader" v-show="isSubmitting">&nbsp;</span>
      </template>
    </td>
  </tr>
</template>

<script>
  import api from '@/api/index';

  export default {
    name: 'project-details-overview-table-row',
    props: {
      accessToken: { 'default': '', type: String },
      update: {
        'default': {
          name: '',
          project_type: '',
          existing_version: '',
        },
        type: Object,
      },
    },
    data () {
      return {
        isSubmitting: false,
      };
    },
    computed: {
      isInProfile () {
        return this.update.profile !== '' &&
            this.update.profile !== this.update.name;
      },
      updateIconClass () {
        if (this.update.hasSecurityUpdate) {
          return 'icon-update-critical';
        } else if (this.update.hasUpdate) {
          return 'icon-update-regular';
        } else {
          return '';
        }
      },
      recommendedRelease () {
        return this.update.releases[this.update.recommended];
      },
      recommendedLink () {
        return this.recommendedRelease.release_link;
      },
      projectType () {
        if (this.update.name === this.update.profile) {
          return 'profile';
        }

        return this.update.project_type;
      }
    },
    methods: {
      async applyUpdate () {
        if (this.isSubmitting) {
          return;
        }

        this.isSubmitting = true;

        try {
          const user = this.$store.state.user.currentUser;
          const response = await api.website.applyUpdate(user.userId, this.accessToken, this.update.name);
          const message = response.data.trim();

          if (message.indexOf('Fatal error') !== -1) {
            console.log(message);
            alert(message);
          }
        } catch (error) {
          if (error.response) {
            const message = error.response.data;

            if (message) {
              console.log(message);
              alert(message);
            }
          }
        }

        this.isSubmitting = false;
      },
    },
    filters: {
      replace (value, oldValue, newValue) {
        if (!value) {
          return '';
        }

        value = value.toString();
        return value.replace(new RegExp(oldValue, 'g'), newValue);
      },
      capitalize (value) {
        if (!value) {
          return '';
        }

        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .loader {
    position: absolute;
    margin-top: 15px;
  }

  tr {
    height: 48px;

    &:hover {
      background-image: linear-gradient(to top, rgba(249, 253, 255, 0) 0%, rgba(245, 249, 254, 0.57) 57%, #eef5ff 100%);
    }
  }

  td {
    border-top: 1px solid #e3e9fa;
    padding-left: 5px;
    padding-right: 5px;

    &:nth-child(4) {
      white-space: nowrap;
    }

    &, a {
      color: #505464;
      font-size: 16px;
      font-weight: 300;
      letter-spacing: 0.48px;
    }
  }

  td:first-child {
    width: 40px;
    text-align: center;
  }

  .button {
    display: inline-block;
    padding: 12px 14px 8px 15px;

    background-color: #2ba6e1;
    border-radius: 3px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.42px;
    line-height: 15px;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
  }

  .distribution {
    display: inline-block;
    font-size: 14px;
    text-align: center;
  }
</style>
