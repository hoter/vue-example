import utils from '@/utils';

export default class User {
  constructor () {
    this.uid = 0;
    this.name = '';
    this.mail = '';
    this.role = '';

    this.userId = '';

    this.accountType = '';
    this.country = '';
    this.firstName = '';
    this.lastName = '';
    this.picture = '';
  }

  /**
   * Checks is user has role.
   * @param {string} role
   * @return {boolean}
   */
  isInRole (role) {
    if (this.role === undefined || this.role === null) {
      return false;
    }

    return this.role.split(',').indexOf(role) !== -1;
  }

  /**
   * Checks is user admin.
   * @return {boolean}
   */
  get isAdmin () {
    return this.isInRole('administrator');
  }

  toDrupal () {
    return {
      mail: utils.drupal.toField(this.email),
      name: utils.drupal.toField(this.name),
      user_account_type: utils.drupal.toField(this.accountType),
      user_country: utils.drupal.toField(this.country),
      user_first_name: utils.drupal.toField(this.firstName),
      user_last_name: utils.drupal.toField(this.lastName),
    };
  }
}
