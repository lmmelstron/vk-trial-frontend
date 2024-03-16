import { View, SplitLayout, SplitCol } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { Home, FactPage, AgePage } from "../pages";
import { DEFAULT_VIEW_PANELS } from "@shared/config/routerConfig/routerConfig";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id={DEFAULT_VIEW_PANELS.HOME} />
          <FactPage id={DEFAULT_VIEW_PANELS.FACT} />
          <AgePage id={DEFAULT_VIEW_PANELS.AGE} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
