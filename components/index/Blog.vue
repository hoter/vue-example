<template>
  <div>
    <h2>Blog</h2>

    <div class="content-inner">
      <div v-for="post in posts" :key="post.nid">
        <h3>{{ post.title }}</h3>
        <p v-html="post.body"></p>
      </div>

      <p>
        <a href="#" @click.prevent="prev">&lt;</a>
        {{ currentPage + 1 }}
        <a href="#" @click.prevent="next">&gt;</a>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'blog',
    computed: {
      currentPage () {
        return this.$store.state.blog.currentPage;
      },
      posts () {
        return this.$store.getters['blog/posts'];
      },
    },
    async created () {
      await this.$store.dispatch('blog/setPage', { page: 0 });
    },
    methods: {
      async prev () {
        await this.$store.dispatch('blog/prevPage');
      },
      async next () {
        await this.$store.dispatch('blog/nextPage');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .content-inner {
    width: 500px;
    padding: 20px 44px 44px;
    margin-top: 39px;
    margin-bottom: 44px;
    box-shadow: -3px 3px 15px rgba(232, 237, 250, 0.5);
    border-radius: 2px;
    background-color: #fff;
  }

  a, a:focus, a:hover, a:active {
    color: rgba(0, 0, 0, 0.54);
    text-decoration: none;
  }
</style>
