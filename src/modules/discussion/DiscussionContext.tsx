import React, { createContext, useContext } from "react";

import { useDiscussionHooksType, useDiscussion } from "./hooks/useDiscussion";
import {
  useListenDiscussion,
  useListenDiscussionType,
} from "./hooks/useListenDiscussion";

export type InitializeDiscussionContext =
  | (useDiscussionHooksType & useListenDiscussionType)
  | null;

export type InitializedDiscussionContext = useDiscussionHooksType;

// Create context
const DiscussionContext = createContext<InitializeDiscussionContext>(null);

// Export provider
export const DiscussionContextProvider: React.FC = (props) => {
  const discussionContext = useDiscussionContextSubscriber();
  return (
    <DiscussionContext.Provider value={discussionContext}>
      {props.children}
    </DiscussionContext.Provider>
  );
};

// Export consumer
export function useDiscussionContext(): InitializedDiscussionContext {
  return useContext(DiscussionContext)!;
}

export function useDiscussionContextSubscriber(): InitializeDiscussionContext {
  const discussion = useDiscussion();
  const listener = useListenDiscussion();

  return { ...discussion, ...listener };
}
