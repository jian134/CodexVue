<template>
  <article class="card">
    <div class="card__top">
      <div>
        <p class="date">{{ formatDate(post.date) }}</p>
        <h3>{{ post.title }}</h3>
      </div>
      <button class="like" @click="$emit('like')">
        <span aria-hidden="true">❤</span>
        <strong>{{ post.likes }}</strong>
      </button>
    </div>
    <p class="excerpt">{{ post.excerpt }}</p>
    <div class="taglist">
      <button v-for="tag in post.tags" :key="tag" class="tag" @click="$emit('tag', tag)">
        #{{ tag }}
      </button>
    </div>
  </article>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
  formatDate: {
    type: Function,
    required: true,
  },
});
</script>
