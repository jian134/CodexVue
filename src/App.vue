<template>
  <div class="page">
    <header class="hero">
      <div class="hero__top">
        <div class="hero__brand">
          <span class="brand-pill">广告位招租</span>
          <p class="brand-sub">华强北卖家微名片</p>
        </div>
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
            <span>{{ item.media }}</span>
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

    <section class="section panel">
      <div class="section__head">
        <h2>热销方向</h2>
        <p>快速传达主推卖点。</p>
      </div>
      <div class="grid">
        <div v-for="spot in hotSpots" :key="spot.title" class="spot">
          <div class="spot__top">
            <span class="spot__tag">{{ spot.tag }}</span>
            <strong>{{ spot.title }}</strong>
          </div>
          <p>{{ spot.desc }}</p>
          <span class="spot__meta">{{ spot.meta }}</span>
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
      <div ref="waveRef" class="wave" aria-hidden="true">
        <span class="wave__layer wave__layer--one"></span>
        <span class="wave__layer wave__layer--two"></span>
        <span class="wave__layer wave__layer--three"></span>
      </div>
      <p>Shenzhen HQB · Tech Supply</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const wechatId = "jk450127775";
const copyState = ref("");
const waveRef = ref(null);

const categories = [
  {
    title: "耳机",
    desc: "真无线、头戴、电竞、降噪等热门款式。",
    media: "HEADPHONE",
    chips: ["现货", "爆款", "多色"],
  },
  {
    title: "配件",
    desc: "充电器、数据线、磁吸配件、保护壳等。",
    media: "ACCESSORY",
    chips: ["配套", "通用", "加购"],
  },
];

const hotSpots = [
  {
    tag: "HOT",
    title: "降噪真无线",
    desc: "通勤高频需求，适合主推引流。",
    meta: "多价位区间可选",
  },
  {
    tag: "NEW",
    title: "电竞头戴",
    desc: "空间音效 + 麦克风套装。",
    meta: "主打沉浸体验",
  },
  {
    tag: "FAST",
    title: "快充配件",
    desc: "出货快、需求高，适合加购。",
    meta: "多协议可选",
  },
];

onMounted(() => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const applyTheme = () => {
    document.documentElement.dataset.theme = media.matches ? "dark" : "light";
  };
  applyTheme();
  media.addEventListener?.("change", applyTheme);

  let rafId = 0;
  let t = 0;
  const animateWave = () => {
    t += 0.8;
    if (waveRef.value) {
      waveRef.value.style.setProperty("--wave-shift", `${t}px`);
    }
    rafId = requestAnimationFrame(animateWave);
  };
  rafId = requestAnimationFrame(animateWave);

  return () => {
    media.removeEventListener?.("change", applyTheme);
    cancelAnimationFrame(rafId);
  };
});

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
