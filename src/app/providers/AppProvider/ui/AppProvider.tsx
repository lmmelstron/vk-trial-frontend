import { FC, ReactNode } from "react";
import vkBridge, {
  parseURLSearchParamsForGetLaunchParams,
} from "@vkontakte/vk-bridge";
import {
  useAdaptivity,
  useAppearance,
  useInsets,
} from "@vkontakte/vk-bridge-react";
import { AdaptivityProvider, ConfigProvider, AppRoot } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { routerConfig } from "@shared/config/routerConfig/routerConfig";
import { RouterProvider } from "@vkontakte/vk-mini-apps-router";
import { transformVKBridgeAdaptivity } from "@shared/utils";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const vkBridgeAppearance = useAppearance() || undefined;
  const vkBridgeInsets = useInsets() || undefined;
  const adaptivity = transformVKBridgeAdaptivity(useAdaptivity());
  const { vk_platform } = parseURLSearchParamsForGetLaunchParams(
    window.location.search
  );

  return (
    <ConfigProvider
      appearance={vkBridgeAppearance}
      platform={vk_platform === "desktop_web" ? "vkcom" : undefined}
      isWebView={vkBridge.isWebView()}
      hasCustomPanelHeaderAfter={true}
    >
      <AdaptivityProvider {...adaptivity}>
        <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
          <RouterProvider router={routerConfig}>{children}</RouterProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
