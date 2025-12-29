const { createApp } = Vue;

createApp({
  data() {
    return {
      query: "",
      draft: {
        title: "",
        excerpt: "",
        tags: "",
      },
      posts: [
        {
          id: 1,
          title: "写给三个月后的自己",
          excerpt: "留一点空白给未来，让生活不必总是解释。",
          tags: ["随笔", "生活"],
          date: "2025-02-18",
          likes: 12,
        },
        {
          id: 2,
          title: "Vue 3 让我更快进入状态",
          excerpt: "组合式 API 让我写组件像写故事，结构清晰又自然。",
          tags: ["Vue", "前端"],
          date: "2025-02-26",
          likes: 27,
        },
        {
          id: 3,
          title: "雨后的城市",
          excerpt: "潮湿的空气里有一点薄荷味，街灯把世界按下慢放。",
          tags: ["城市", "记录"],
          date: "2025-03-04",
          likes: 9,
        },
      ],
    };
  },
  computed: {
    filteredPosts() {
      const keyword = this.query.trim().toLowerCase();
      if (!keyword) {
        return this.posts;
      }
      return this.posts.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(keyword);
        const tagMatch = post.tags.some((tag) => tag.toLowerCase().includes(keyword));
        return titleMatch || tagMatch;
      });
    },
  },
  methods: {
    addPost() {
      const title = this.draft.title.trim();
      const excerpt = this.draft.excerpt.trim();
      if (!title || !excerpt) {
        return;
      }
      const tags = this.draft.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      this.posts.unshift({
        id: Date.now(),
        title,
        excerpt,
        tags: tags.length ? tags : ["随笔"],
        date: this.today(),
        likes: 0,
      });
      this.draft.title = "";
      this.draft.excerpt = "";
      this.draft.tags = "";
      this.query = "";
    },
    toggleLike(post) {
      post.likes += 1;
    },
    addQuery(tag) {
      this.query = tag;
    },
    today() {
      const now = new Date();
      return now.toISOString().slice(0, 10);
    },
    formatDate(value) {
      const [year, month, day] = value.split("-");
      return `${year} / ${month} / ${day}`;
    },
  },
}).mount("#app");
