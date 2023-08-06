import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      host: 'gdscmbti.duckdns.org' // 웹 소켓 연결을 허용할 호스트 주소를 설정합니다.
    }
  }
});
