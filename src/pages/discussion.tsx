import React from "react";
import { Chat } from "../modules/discussion/components/Chat";
import { TouchBar } from "../modules/discussion/components/TouchBar";
import { Layout } from "../modules/ui/components/Layout";

export const Discussion = () => {
  return (
    <Layout>
      <Chat />
      <TouchBar />
    </Layout>
  );
};
