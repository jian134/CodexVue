import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: '/CodexVue/', // 例如：base: '/my-vue-app/'
  // ... 其他配置
});
