import vercel from "solid-start-vercel";
import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    solid({
      adapter: vercel({})
    })
    // devtools({
    //   locator: {
    //     targetIDE: "vscode",
    //     componentLocation: true,
    //     jsxLocation: true
    //   }
    // })
  ]
});
