<template>
  <div class="content-inner-header">
    <div>
      <h3>All Updates</h3>

      <a class="button right" href="#" @click.prevent="checkUpdates">
        <span class="icon-search-small">&nbsp;</span>
        Check for updates
        <span class="loader" v-show="isCheckingUpdates">&nbsp;</span>
      </a>
    </div>

    <div>
      <p>Updates available: {{ updatesCount }} ({{ securityUpdatesCount }} Security updates)</p>

      <p class="right">
        Last checked: {{ lastChecked }}
      </p>
    </div>

    <div>
      <a href="#" class="button"
         @click.prevent="applyUpdates">
        Apply all updates
        <span class="loader" v-show="isSubmitting">&nbsp;</span>
      </a>

      <a href="#" class="button right" @click.prevent="toggleUpdates">
        <span v-if="!website.updatesPaused">Pause update checking</span>
        <span v-else>Unpause update checking</span>
        <span class="loader" v-show="isTogglingUpdates">&nbsp;</span>
      </a>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  import api from '@/api/index';

  export default {
    name: 'project-details-overview-header',
    props: ['updatesCount', 'securityUpdatesCount', 'updates', 'website'],
    data () {
      return {
        now: Date.now(),
        isSubmitting: false,
        isCheckingUpdates: false,
        isTogglingUpdates: false,
      };
    },
    mounted () {
      const self = this;

      setInterval(function () {
        self.$data.now = Date.now();
      }, 1000);
    },
    computed: {
      lastChecked () {
        return moment.utc(this.website.lastCheck).from(moment.utc(this.now));
      },
    },
    methods: {
      async checkUpdates () {
        if (this.isCheckingUpdates) {
          return;
        }

        this.isCheckingUpdates = true;

        await this.$store.dispatch('updateProject', this.website.nid);

        this.isCheckingUpdates = false;
      },
      async toggleUpdates () {
        if (this.isTogglingUpdates) {
          return;
        }

        this.isTogglingUpdates = true;

        const data = {
          website_updates_paused: [{ value: !this.website.updatesPaused }],
        };

        await api.website.edit(this.website.nid, data);
        await this.$store.dispatch('updateProject', this.website.nid);

        this.isTogglingUpdates = false;
      },
      async applyUpdates () {
        if (this.isSubmitting) {
          return;
        }

        this.isSubmitting = true;

        const messages = [];

        for (let i = 0; i < this.updates.length; i++) {
          const update = this.updates[i];

          if (update.profile !== '' && update.profile !== update.name) {
            continue;
          }

          try {
            const user = this.$store.state.user.currentUser;
            const response = await api.website.applyUpdate(user.userId, this.website.accessToken, update.name);
            const message = response.data.trim();

            if (message.indexOf('Fatal error') !== -1) {
              messages.push(`${update.name}: ${message}`);
            }
          } catch (error) {
            if (error.response) {
              const message = error.response.data;

              if (message) {
                messages.push(`${update.name}: ${message}`);
              }
            }
          }
        }

        if (messages.length > 0) {
          const message = messages.join('\n');
          console.log(message);
          alert(message);
        }

        this.isSubmitting = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../../scss/loader.scss';

  .content-inner {
    padding: 0;

    box-shadow: 2px 4px 15px rgba(232, 237, 250, 0.5);
    background-color: #ffffff;
  }

  .content-inner-header {
    padding: 39px 23px 0 40px;
  }

  .right {
    float: right;
  }

  h3 {
    display: inline-block;
    margin-bottom: 19px;

    line-height: 32px;
    letter-spacing: 0.75px;
  }

  p {
    display: inline-block;
    margin-bottom: 19px;

    line-height: 30px;
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
    vertical-align: text-bottom;
  }

  .loader {
    @include loader(255, 255, 255);

    margin-left: 15px;
    margin-right: 5px;
  }
</style>
