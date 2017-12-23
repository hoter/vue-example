export default class BlogPost {
  constructor () {
    this.nid = 0;
    this.title = '';
    this.body = '';
  }

  static createFromDrupal (data) {
    const post = new BlogPost();

    post.nid = data.nid;
    post.title = data.title;
    post.body = data.body;

    return post;
  }
};
