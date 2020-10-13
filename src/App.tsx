import React from "react";

import {
  AppContextProvider,
  useAppContextSubscriber,
} from "./modules/app/AppContext";
import { AppLoader, LoadingProcess } from "./modules/loader/AppLoader";
import { AppRouter } from "./modules/navigation/AppRouter";
import { LoadingScreen } from "./modules/ui";
import { TopBar } from "./modules/ui/components/TopBar";
import { AppThemeProvider, GlobalStyle } from "./modules/ui/theme";

function App() {
  const appContext = useAppContextSubscriber();

  const mandatoryProcesses: LoadingProcess[] = [
    { name: "peer", isReady: appContext?.peer ? true : false },
  ];

  return (
    <AppThemeProvider>
      <AppLoader
        loadingComponent={<LoadingScreen />}
        mandatoryProcesses={mandatoryProcesses}
      >
        <AppContextProvider value={appContext}>
          <TopBar />
          <AppRouter />
        </AppContextProvider>
      </AppLoader>
      <GlobalStyle />
    </AppThemeProvider>
  );
}

export default App;
