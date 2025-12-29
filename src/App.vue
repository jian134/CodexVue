<template>
  <div class="page">
    <BlogHero
      :query="query"
      :count="filteredPosts.length"
      @update-query="query = $event"
      @add-post="addPost"
    />

    <main class="grid">
      <PostCard
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
        :format-date="formatDate"
        @like="toggleLike(post)"
        @tag="addQuery"
      />
    </main>

    <footer class="footer">
      <p>Made with Vue 3 · 自己的节奏，自己的故事。</p>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import BlogHero from "./components/BlogHero.vue";
import PostCard from "./components/PostCard.vue";

const query = ref("");
const posts = ref([
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
]);

const filteredPosts = computed(() => {
  const keyword = query.value.trim().toLowerCase();
  if (!keyword) {
    return posts.value;
  }
  return posts.value.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(keyword);
    const tagMatch = post.tags.some((tag) => tag.toLowerCase().includes(keyword));
    return titleMatch || tagMatch;
  });
});

function addPost(payload) {
  const title = payload.title.trim();
  const excerpt = payload.excerpt.trim();
  if (!title || !excerpt) {
    return;
  }
  const tags = payload.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  posts.value.unshift({
    id: Date.now(),
    title,
    excerpt,
    tags: tags.length ? tags : ["随笔"],
    date: today(),
    likes: 0,
  });
  query.value = "";
}

function toggleLike(post) {
  post.likes += 1;
}

function addQuery(tag) {
  query.value = tag;
}

function today() {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

function formatDate(value) {
  const [year, month, day] = value.split("-");
  return `${year} / ${month} / ${day}`;
}
</script>
