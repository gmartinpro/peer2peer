import { createContext, useContext } from "react";

import { usePeerHooks, usePeerHooksType } from "./hooks/usePeerHooks";

export type InitializeAppContext = usePeerHooksType | null;

export type InitializedAppContext = usePeerHooksType;

// Create context
const AppContext = createContext<InitializeAppContext>(null);

// Export provider
export const AppContextProvider = AppContext.Provider;

// Export consumer
export function useAppContext(): InitializedAppContext {
  return useContext(AppContext)!;
}

/**
 * Export app initializer
 */
export function useAppContextSubscriber(): InitializeAppContext {
  const peer = usePeerHooks();

  return { ...peer };
}
