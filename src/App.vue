<template>
  <div class="page">
    <header class="hero">
      <div class="hero__top">
        <div class="hero__brand">
          <span class="brand-pill">广告位招租</span>
          <p class="brand-sub">华强北卖家微名片</p>
        </div>
        <button class="theme-toggle" type="button" @click="toggleTheme">
          <span>{{ isDark ? "日间" : "夜间" }}</span>
          <strong>{{ isDark ? "OFF" : "ON" }}</strong>
        </button> 
      </div>
      <h1>明亮橘色 · 科技感展示页</h1>
      <p class="hero__lead">
        耳机与配件集中展示，信息清晰、节奏利落，适合直接分享到客户群。
      </p>
      <div class="hero__cta">
        <button class="btn btn--primary" @click="copyWechat">复制微信号</button>
        <div class="cta-meta">
          <span>微信号</span>
          <strong>{{ wechatId }}</strong>
          <em v-if="copyState">{{ copyState }}</em>
        </div>
      </div>
    </header>

    <section class="section">
      <div class="section__head">
        <h2>主营类别</h2>
        <p>占位图便于后续替换为真实产品图。</p>
      </div>
      <div class="cards">
        <article v-for="item in categories" :key="item.title" class="card">
          <div class="card__media">
            <img :src="item.imagePath" :alt="item.title + '产品图'" loading="lazy" />
          </div>
          <div class="card__body">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="chip-row">
              <span v-for="chip in item.chips" :key="chip" class="chip">#{{ chip }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
 

    <section class="section">
      <div class="section__head">
        <h2>产品清单</h2>
        <p>点击查看详细信息，内页内容来自 JSON 数据。</p>
      </div>
      <div class="cards">
        <article
          v-for="product in products"
          :key="product.id"
          class="card card--product"
          @click="openProduct(product)"
        >
          <div class="card__media">
            <img :src="product.path" :alt="product.alt || product.name" loading="lazy" />
          </div>
          <div class="card__body">
            <div class="card__title">
              <h3>{{ product.name }}</h3>
              <span class="badge">{{ product.category }}</span>
            </div>
            <p>{{ product.summary }}</p>
            <div class="chip-row">
              <span v-for="tag in product.tags" :key="tag" class="chip">#{{ tag }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section v-if="activeProduct" class="detail">
      <div class="detail__panel">
        <button class="detail__close" type="button" @click="closeProduct">返回</button>
        <div class="detail__media">
          <img :src="activeProduct.path" :alt="activeProduct.alt || activeProduct.name" />
        </div>
        <div class="detail__content">
          <div class="detail__head">
            <div>
              <h2>{{ activeProduct.name }}</h2>
              <p>{{ activeProduct.summary }}</p>
            </div>
            <span class="badge">{{ activeProduct.category }}</span>
          </div>
          <div class="detail__meta">
            <span>{{ activeProduct.priceNote }}</span>
            <span>{{ activeProduct.stockNote }}</span>
          </div>
          <div class="detail__tags">
            <span v-for="tag in activeProduct.tags" :key="tag" class="chip">
              #{{ tag }}
            </span>
          </div>
          <div class="detail__block">
            <h3>核心卖点</h3>
            <ul>
              <li v-for="point in activeProduct.highlights" :key="point">{{ point }}</li>
            </ul>
          </div>
          <div v-if="activeProduct.specs && Object.keys(activeProduct.specs).length > 0" class="detail__block">
            <h3>规格信息</h3>
            <div class="specs">
              <div v-for="(value, label) in activeProduct.specs" :key="label" class="spec">
                <span>{{ label }}</span>
                <strong>{{ value }}</strong>
              </div>
            </div>
          </div>
          <button class="btn btn--primary detail__cta" @click="copyWechat">
            复制微信号
          </button>
        </div>
      </div>
    </section>

    <section class="section contact">
      <div class="contact__card">
        <div>
          <h2>加微信拿货</h2>
          <p>复制微信号后直接搜索添加，快速获取报价。</p>
        </div>
        <div class="contact__action">
          <strong>{{ wechatId }}</strong>
          <button class="btn btn--ghost" @click="copyWechat">一键复制</button>
        </div>
        <small v-if="copyState">{{ copyState }}</small>
      </div>
    </section>

    <footer class="footer">
      <p>Shenzhen HQB · Tech Supply</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import productsDesc from "../images/products-desc.json";
import categoriesData from "../images/categories.json";

const wechatId = "jk450127775";
const copyState = ref("");
const isDark = ref(false);
const activeProduct = ref(null);
const userThemePreference = ref(null); // 用户手动设置的主题偏好

// 适配 products-desc.json 数据结构
const products = computed(() => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  return productsDesc.map((item, index) => {
    // 处理图片路径：确保路径以 / 开头，并添加 base URL
    let imagePath = item.path;
    // 移除开头的斜杠（如果有），然后添加 base URL
    if (imagePath.startsWith('/')) {
      imagePath = imagePath.slice(1);
    }
    // 确保 baseUrl 以 / 结尾
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    imagePath = normalizedBase + imagePath;
    
    return {
      id: item.filename || `product-${index}`,
      name: item.name,
      category: item.category,
      summary: item.description,
      tags: item.features || [],
      highlights: item.features || [],
      priceNote: "价格咨询",
      stockNote: "现货充足",
      specs: {},
      path: imagePath,
      alt: item.alt,
    };
  });
});

// 从 JSON 文件加载类别数据，并处理图片路径
const categories = computed(() => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  return categoriesData.map((item) => {
    // 处理图片路径：确保路径正确，并添加 base URL
    let imagePath = item.path;
    // 移除开头的斜杠（如果有），然后添加 base URL
    if (imagePath.startsWith('/')) {
      imagePath = imagePath.slice(1);
    }
    // 确保 baseUrl 以 / 结尾
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    imagePath = normalizedBase + imagePath;
    
    return {
      ...item,
      imagePath: imagePath,
    };
  });
});


onMounted(() => {
  // 检查是否有保存的用户偏好
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
    userThemePreference.value = savedTheme;
    document.documentElement.dataset.theme = savedTheme;
  } else {
    // 如果没有保存的偏好，使用系统偏好
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      if (userThemePreference.value === null) {
        isDark.value = media.matches;
        document.documentElement.dataset.theme = isDark.value ? "dark" : "light";
      }
    };
    applyTheme();
    media.addEventListener?.("change", applyTheme);

    return () => {
      media.removeEventListener?.("change", applyTheme);
    };
  }
});

function toggleTheme() {
  isDark.value = !isDark.value;
  const theme = isDark.value ? "dark" : "light";
  userThemePreference.value = theme;
  document.documentElement.dataset.theme = theme;
  // 保存用户偏好到 localStorage
  localStorage.setItem("theme", theme);
}

function openProduct(product) {
  activeProduct.value = product;
}

function closeProduct() {
  activeProduct.value = null;
}

async function copyWechat() {
  copyState.value = "";
  try {
    await navigator.clipboard.writeText(wechatId);
    copyState.value = "已复制";
  } catch (error) {
    const copied = fallbackCopy(wechatId);
    copyState.value = copied ? "已复制" : "复制失败，请手动添加";
  }
  if (copyState.value === "已复制") {
    setTimeout(() => {
      copyState.value = "";
    }, 2000);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(textarea);
  return ok;
}
</script>
