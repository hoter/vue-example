import utils from '@/utils';

export default class Website {
  constructor () {
    this.nid = 0;
    this.name = '';

    this.drupal = {
      username: '',
      password: '',
    };

    this.git = {
      protocol: 'http',
      url: '',
      tag: '',

      username: '',
      password: '',

      sshTitle: '',
      sshKey: '',

      commitMessage: 'Updated [update:name] from [update:version-from] to [update:version-to]',
    };

    this.distribution = true;
    this.useComposer = true;
    this.agency = null;
    this.emails = 'all';
    this.url = '';
    this.framework = 'Drupal 7';
    this.accessToken = '';
    this.updatesPaused = false;
    this.lastCheck = 0;
  }

  static createFromDrupal (data) {
    const website = new Website();
    website.nid = utils.drupal.fromField(data, 'nid');
    website.name = utils.drupal.fromField(data, 'title');

    website.git = {
      protocol: utils.drupal.fromField(data, 'website_git_protocol'),
      url: utils.drupal.fromField(data, 'website_git_url'),
      tag: utils.drupal.fromField(data, 'website_git_tag'),

      username: utils.drupal.fromField(data, 'website_git_username'),
      password: utils.drupal.fromField(data, 'website_git_password'),

      sshTitle: utils.drupal.fromField(data, 'website_git_ssh_title'),
      sshKey: utils.drupal.fromField(data, 'website_git_ssh_key'),

      commitMessage: utils.drupal.fromField(data, 'website_commit_message'),
    };

    website.drupal = {
      username: utils.drupal.fromField(data, 'website_drupal_username'),
      password: utils.drupal.fromField(data, 'website_drupal_password'),
    };

    website.distribution = utils.drupal.fromField(data, 'website_distribution').toString() === 'true';
    website.useComposer = utils.drupal.fromField(data, 'website_use_composer').toString() === 'true';
    website.agency = utils.drupal.fromField(data, 'website_agency', null, 'target_id');

    website.emails = utils.drupal.fromField(data, 'website_emails');
    website.url = utils.drupal.fromField(data, 'website_url');
    website.framework = utils.drupal.fromField(data, 'website_framework');
    website.accessToken = utils.drupal.fromField(data, 'website_access_token');
    website.updatesPaused = utils.drupal.fromField(data, 'website_updates_paused');
    website.lastCheck = utils.drupal.fromField(data, 'website_last_check', null);

    return website;
  }

  toDrupal () {
    return {
      title: utils.drupal.toField(this.name),

      website_drupal_username: utils.drupal.toField(this.drupal.username),
      website_drupal_password: utils.drupal.toField(this.drupal.password),

      website_git_protocol: utils.drupal.toField(this.git.protocol),
      website_git_url: utils.drupal.toField(this.git.url),
      website_git_tag: utils.drupal.toField(this.git.tag),
      website_git_username: utils.drupal.toField(this.git.username),
      website_git_password: utils.drupal.toField(this.git.password),
      website_git_ssh_title: utils.drupal.toField(this.git.sshTitle),
      website_git_ssh_key: utils.drupal.toField(this.git.sshKey),
      website_commit_message: utils.drupal.toField(this.git.commitMessage),

      website_distribution: utils.drupal.toField(this.distribution),
      website_use_composer: utils.drupal.toField(this.useComposer),
      website_agency: utils.drupal.toField(this.agency, 'target_id'),
      website_emails: utils.drupal.toField(this.emails),
      website_url: utils.drupal.toField(this.url),
      website_framework: utils.drupal.toField(this.framework),
    };
  }
};
