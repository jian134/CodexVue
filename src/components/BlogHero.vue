<template>
  <header class="hero">
    <div class="hero__content">
      <p class="eyebrow">Vue 3 / Tiny Blog</p>
      <h1>写点你真正想分享的。</h1>
      <p class="subtitle">一个干净、轻量、可扩展的个人小博客。</p>
      <div class="search">
        <input
          :value="query"
          type="text"
          placeholder="搜索标题或标签"
          @input="updateQuery"
        />
        <span class="pill">{{ count }} 篇</span>
      </div>
    </div>
    <div class="hero__panel">
      <h2>发表新文章</h2>
      <form @submit.prevent="submit">
        <label>
          标题
          <input v-model.trim="draft.title" required maxlength="80" />
        </label>
        <label>
          摘要
          <textarea v-model.trim="draft.excerpt" rows="3" required maxlength="160"></textarea>
        </label>
        <label class="row">
          标签（逗号分隔）
          <input v-model.trim="draft.tags" placeholder="Vue, 生活, 旅行" />
        </label>
        <button type="submit">发布</button>
      </form>
    </div>
  </header>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps({
  query: {
    type: String,
    default: "",
  },
  count: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update-query", "add-post"]);

const draft = reactive({
  title: "",
  excerpt: "",
  tags: "",
});

function updateQuery(event) {
  emit("update-query", event.target.value);
}

function submit() {
  emit("add-post", { ...draft });
  draft.title = "";
  draft.excerpt = "";
  draft.tags = "";
}
</script>
