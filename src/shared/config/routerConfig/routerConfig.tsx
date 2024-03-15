import {
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
  createHashRouter,
} from "@vkontakte/vk-mini-apps-router";

export const DEFAULT_ROOT = "default_root";

export const DEFAULT_VIEW = "default_view";

export enum DEFAULT_VIEW_PANELS {
  HOME = "home",
  FACT = "fact",
}

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, "/", []),
      createPanel(DEFAULT_VIEW_PANELS.FACT, `/${DEFAULT_VIEW_PANELS.FACT}`, []),
    ]),
  ]),
]);

export const routerConfig = createHashRouter(routes.getRoutes());
