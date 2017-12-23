<template>
  <div class="content">
    <h2>Edit profile</h2>

    <form class="content-inner" @submit.prevent>
      <file-field class="field"
                  name="picture" :required="false"
                  title="Avatar" :showTitle="true"
                  v-model="picture" :error="pictureError"
                  ref="picture">
      </file-field>

      <text-field class="field" type="email"
                  name="email" :required="true"
                  title="Email" :showTitle="true"
                  v-model="email" :error="emailError"
                  @input="validate">
      </text-field>

      <text-field class="field"
                  name="first-name" :required="true"
                  title="First name" :showTitle="true"
                  v-model="firstName" :error="firstNameError"
                  @input="validate">
      </text-field>

      <text-field class="field"
                  name="last-name" :required="true"
                  title="Last name" :showTitle="true"
                  v-model="lastName" :error="lastNameError"
                  @input="validate">
      </text-field>

      <text-field class="field" type="password"
                  name="password" :required="true"
                  title="Current password" :showTitle="true"
                  v-model="password" :error="passwordError"
                  @input="validate">
      </text-field>

      <a href="#" @click.prevent="submit" class="submit">
        Save
        <span class="loader" v-show="isSubmitting">&nbsp;</span>
      </a>
    </form>
  </div>
</template>

<script>
  import FileField from '@/components/common/form/FileField';
  import TextField from '@/components/common/form/TextField';

  import api from '@/api/index';

  export default {
    name: 'edit-profile',
    components: {
      'file-field': FileField,
      'text-field': TextField,
    },
    data () {
      return {
        picture: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',

        pictureError: null,
        emailError: null,
        firstNameError: null,
        lastNameError: null,
        passwordError: null,

        isSubmitting: false,
      };
    },
    computed: {
      isValidEmail () {
        return this.email.length > 0;
      },
      isValidFirstName () {
        return this.firstName.length > 0;
      },
      isValidLastName () {
        return this.lastName.length > 0;
      },
      isValidPassword () {
        return this.password.length > 0;
      },
    },
    created () {
      const user = this.$store.state.user.currentUser;

      if (user !== null) {
        this.email = user.mail;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
      }
    },
    methods: {
      validate () {
        const isValidEmail = this.isValidEmail;
        this.emailError = isValidEmail ? null : 'Required';

        const isValidFirstName = this.isValidFirstName;
        this.firstNameError = isValidFirstName ? null : 'Required';

        const isValidLastName = this.isValidLastName;
        this.lastNameError = isValidLastName ? null : 'Required';

        const isValidPassword = this.isValidPassword;
        this.passwordError = isValidPassword ? null : 'Required';

        return isValidEmail && isValidFirstName &&
            isValidLastName && isValidPassword;
      },
      async submit () {
        if (this.isSubmitting) {
          return;
        }

        this.isSubmitting = true;

        if (this.validate()) {
          const data = {
            mail: [{'value': this.email}],
            pass: [{'existing': this.password}],
            user_first_name: [{'value': this.firstName}],
            user_last_name: [{'value': this.lastName}],
          };

          if (this.picture.length > 0) {
            const picture = this.$refs.picture;
            const uid = this.$store.state.user.currentUser.uid;
            const fileName = picture.filename;
            const fileContent = await picture.getBase64();
            const response = await api.file.create(uid, fileName, fileContent);

            const fid = response.data.fid[0].value;

            data.user_picture = [{'target_id': fid}];
          }

          try {
            await api.user.edit(this.$store.state.user.currentUser.uid, data);
            await this.$store.dispatch('updateUser');
            this.$router.push('/projects');
          } catch (error) {
            if (error.response !== undefined &&
                error.response !== null &&
                error.response.status === 422) {
              const errors = error.response.data.message.split('\n');

              this.pictureError = null;
              this.emailError = null;
              this.firstNameError = null;
              this.lastNameError = null;
              this.passwordError = null;

              errors.forEach((error) => {
                // Split field name and error message.
                const delimiter = ': ';
                const delimiterIndex = error.indexOf(delimiter);
                const fieldName = error.substr(0, delimiterIndex);
                error = error.substr(delimiterIndex + delimiter.length);

                switch (fieldName) {
                  case 'user_picture.0':
                    this.pictureError = error;
                    break;

                  case 'mail':
                    this.emailError = error;
                    break;

                  case 'user_first_name':
                    this.firstNameError = error;
                    break;

                  case 'user_last_name':
                    this.lastNameError = error;
                    break;
                }
              });
            } else {
              console.log(JSON.stringify(error));
            }
          }
        }

        this.isSubmitting = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .content {
    max-width: 639px;
    min-height: calc(100vh - 68px - 20px - 41px);

    padding-top: 68px;
    padding-bottom: 20px;
  }

  h2 {
    margin-bottom: 40px;
    margin-right: 21px;

    letter-spacing: 1.05px;
  }

  .content-inner {
    display: inline-block;
    position: relative;
    padding: 33px 38px 41px 41px;
    box-shadow: 2px 4px 15px rgba(232, 237, 250, 0.5);
    background-color: #fff;
    text-align: center;
  }

  .field {
    max-width: 320px;
    margin-bottom: 20px;
  }

  .submit {
    color: #2ba6e1;
    font-weight: 700;
    letter-spacing: 0.54px;
    text-decoration: none;
    text-transform: uppercase;
  }
</style>
