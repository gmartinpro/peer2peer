/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import { Routes } from "../../navigation/AppRouter";

export type useListenDiscussionType = {};

export function useListenDiscussion(): useListenDiscussionType {
  const { peer } = useAppContext();
  const history = useHistory();
  // const [askConne];

  useEffect(() => {
    peer.on("connection", (conn) => {
      console.log("connect");
      conn.on("data", (data) => {
        // Init discussion
        if (data.id) {
          history.push(Routes.DISCUSSION.replace(":id", data.id));
        }
      });
    });
  }, [peer]);

  return {};
}
