<template>
  <div>
    <h2>Create a new account</h2>
    <p>Try DruLabs for free and get your own company account today!</p>

    <form @submit.prevent="submit">
      <text-field class="field"
                  name="email" :required="true"
                  title="E-mail" :showTitle="true"
                  v-model="user.email" :error="emailError">
      </text-field>

      <text-field class="field"
                  name="username" :required="true"
                  title="Username" :showTitle="true"
                  v-model="user.name" :error="usernameError">
      </text-field>

      <text-field class="field" type="password"
                  name="password" :required="true"
                  title="Password" :showTitle="true"
                  v-model="password" :error="passwordError">
      </text-field>

      <text-field class="field"
                  name="first-name" :required="true"
                  title="First name" :showTitle="true"
                  v-model="user.firstName" :error="firstNameError">
      </text-field>

      <text-field class="field"
                  name="last-name" :required="true"
                  title="Last name" :showTitle="true"
                  v-model="user.lastName" :error="lastNameError">
      </text-field>

      <option-field class="field"
                    name="country" :required="true"
                    title="Select your country" :showTitle="false"
                    v-model="user.country" :error="countryError">
        <option value="" selected>
          Select your country
        </option>

        <option v-for="country in countries">
          {{ country }}
        </option>
      </option-field>

      <option-field class="field"
                    name="account-type" :required="true"
                    title="Select account type" :showTitle="false"
                    v-model="user.accountType" :error="accountTypeError">
        <option value="" selected>
          Select account type
        </option>

        <option v-for="accountType in accountTypes">
          {{ accountType }}
        </option>
      </option-field>

      <button type="submit">
        Create an account
        <span class="loader" v-show="isSubmitting">&nbsp;</span>
      </button>
    </form>
  </div>
</template>

<script>
  import TextField from '@/components/common/form/TextField';
  import OptionField from '@/components/common/form/OptionField';

  import api from '@/api/index';
  import store from '@/store';

  import User from '@/models/User';

  export default {
    name: 'register-form',
    components: {
      'text-field': TextField,
      'option-field': OptionField,
    },
    data () {
      return {
        user: new User(),
        password: '',

        emailError: null,
        usernameError: null,
        passwordError: null,
        firstNameError: null,
        lastNameError: null,
        countryError: null,
        accountTypeError: null,

        isSubmitting: false,
      };
    },
    computed: {
      countries () {
        return [
          'Afghanistan',
          'Albania',
          'Algeria',
          'Andorra',
          'Angola',
          'Antigua and Barbuda',
          'Argentina',
          'Armenia',
          'Australia',
          'Austria',
          'Azerbaijan',
          'Bahamas',
          'Bahrain',
          'Bangladesh',
          'Barbados',
          'Belarus',
          'Belgium',
          'Belize',
          'Benin',
          'Bhutan',
          'Bolivia',
          'Bosnia and Herzegovina',
          'Botswana',
          'Brazil',
          'Brunei',
          'Bulgaria',
          'Burkina Faso',
          'Burundi',
          'Cabo Verde',
          'Cambodia',
          'Cameroon',
          'Canada',
          'Central African Republic (CAR)',
          'Chad',
          'Chile',
          'China',
          'Colombia',
          'Comoros',
          'Democratic Republic of the Congo',
          'Republic of the Congo',
          'Costa Rica',
          'Cote d\'Ivoire',
          'Croatia',
          'Cuba',
          'Cyprus',
          'Czech Republic',
          'Denmark',
          'Djibouti',
          'Dominica',
          'Dominican Republic',
          'Ecuador',
          'Egypt',
          'El Salvador',
          'Equatorial Guinea',
          'Eritrea',
          'Estonia',
          'Ethiopia',
          'Fiji',
          'Finland',
          'France',
          'Gabon',
          'Gambia',
          'Georgia',
          'Germany',
          'Ghana',
          'Greece',
          'Grenada',
          'Guatemala',
          'Guinea',
          'Guinea-Bissau',
          'Guyana',
          'Haiti',
          'Honduras',
          'Hungary',
          'Iceland',
          'India',
          'Indonesia',
          'Iran',
          'Iraq',
          'Ireland',
          'Israel',
          'Italy',
          'Jamaica',
          'Japan',
          'Jordan',
          'Kazakhstan',
          'Kenya',
          'Kiribati',
          'Kosovo',
          'Kuwait',
          'Kyrgyzstan',
          'Laos',
          'Latvia',
          'Lebanon',
          'Lesotho',
          'Liberia',
          'Libya',
          'Liechtenstein',
          'Lithuania',
          'Luxembourg',
          'Macedonia (FYROM)',
          'Madagascar',
          'Malawi',
          'Malaysia',
          'Maldives',
          'Mali',
          'Malta',
          'Marshall Islands',
          'Mauritania',
          'Mauritius',
          'Mexico',
          'Micronesia',
          'Moldova',
          'Monaco',
          'Mongolia',
          'Montenegro',
          'Morocco',
          'Mozambique',
          'Myanmar (Burma)',
          'Namibia',
          'Nauru',
          'Nepal',
          'Netherlands',
          'New Zealand',
          'Nicaragua',
          'Niger',
          'Nigeria',
          'North Korea',
          'Norway',
          'Oman',
          'Pakistan',
          'Palau',
          'Palestine',
          'Panama',
          'Papua New Guinea',
          'Paraguay',
          'Peru',
          'Philippines',
          'Poland',
          'Portugal',
          'Qatar',
          'Romania',
          'Russia',
          'Rwanda',
          'Saint Kitts and Nevis',
          'Saint Lucia',
          'Saint Vincent and the Grenadines',
          'Samoa',
          'San Marino',
          'Sao Tome and Principe',
          'Saudi Arabia',
          'Senegal',
          'Serbia',
          'Seychelles',
          'Sierra Leone',
          'Singapore',
          'Slovakia',
          'Slovenia',
          'Solomon Islands',
          'Somalia',
          'South Africa',
          'South Korea',
          'South Sudan',
          'Spain',
          'Sri Lanka',
          'Sudan',
          'Suriname',
          'Swaziland',
          'Sweden',
          'Switzerland',
          'Syria',
          'Taiwan',
          'Tajikistan',
          'Tanzania',
          'Thailand',
          'Timor-Leste',
          'Togo',
          'Tonga',
          'Trinidad and Tobago',
          'Tunisia',
          'Turkey',
          'Turkmenistan',
          'Tuvalu',
          'Uganda',
          'Ukraine',
          'United Arab Emirates (UAE)',
          'United Kingdom (UK)',
          'United States of America (USA)',
          'Uruguay',
          'Uzbekistan',
          'Vanuatu',
          'Vatican City (Holy See)',
          'Venezuela',
          'Vietnam',
          'Yemen',
          'Zambia',
          'Zimbabwe',
        ];
      },
      accountTypes () {
        return [
          'Standard',
          'Professional',
        ];
      },
    },
    async beforeRouteEnter (to, from, next) {
      const isLoggedIn = store.getters.isLoggedIn || await api.user.isLoggedIn();

      if (isLoggedIn) {
        next('/');
      } else {
        next();
      }
    },
    methods: {
      async submit (event) {
        if (this.isSubmitting) {
          return;
        }

        this.isSubmitting = true;

        const data = this.user.toDrupal();
        data.pass = [{ value: this.password }];

        try {
          await api.user.register(data);
          this.$router.push('/login');
        } catch (error) {
          if (error.response !== undefined &&
              error.response !== null &&
              error.response.status === 422) {
            const errors = error.response.data.message.split('\n');

            this.emailError = null;
            this.usernameError = null;
            this.passwordError = null;
            this.firstNameError = null;
            this.lastNameError = null;
            this.countryError = null;
            this.accountTypeError = null;

            errors.forEach((error) => {
              // Split field name and error message.
              const delimiter = ': ';
              const delimiterIndex = error.indexOf(delimiter);
              const fieldName = error.substr(0, delimiterIndex);
              error = error.substr(delimiterIndex + delimiter.length);

              switch (fieldName) {
                case 'mail':
                  this.emailError = error;
                  break;

                case 'name':
                  this.usernameError = error;
                  break;

                case 'pass':
                  this.passwordError = error;
                  break;

                case 'user_first_name':
                  this.firstNameError = error;
                  break;

                case 'user_last_name':
                  this.lastNameError = error;
                  break;

                case 'user_country':
                  this.countryError = error;
                  break;

                case 'user_account_type':
                  this.accountTypeError = error;
                  break;
              }
            });
          } else {
            console.log(JSON.stringify(error));
          }
        }

        this.isSubmitting = false;
      },
    }
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
