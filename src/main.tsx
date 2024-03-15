import { createRoot } from "react-dom/client";
import vkBridge from "@vkontakte/vk-bridge";
import { AppProvider, QueryClientProvider } from "@app/providers";
import { App } from "@app/App.tsx";

vkBridge.send("VKWebAppInit");

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <QueryClientProvider>
      <App />
    </QueryClientProvider>
  </AppProvider>
);

if (import.meta.env.MODE === "development") {
  import("../config/eruda/eruda.ts");
}
