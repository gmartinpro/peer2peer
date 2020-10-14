import Peer from "peerjs";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import { Routes } from "../../navigation/AppRouter";

export interface useDiscussionHooksType {
  id?: string;
  discussion?: Peer.DataConnection;
  createDiscussion(id: string): void;
}

export function useDiscussion(): useDiscussionHooksType {
  const { peer } = useAppContext();
  const [discussion, setDiscussion] = useState<Peer.DataConnection>();
  const [id, setId] = useState<string>();
  const history = useHistory();

  const createDiscussion = (id: string) => {
    setId(id);
    const connection = peer.connect(id);
    if (connection) {
      connection.on("open", () => {
        connection.send({ id: peer.id });
        setDiscussion(connection);
      });
    }
  };

  useEffect(() => {
    if (discussion && id) {
      history.push(Routes.DISCUSSION.replace(":id", id!));
    }
  }, [discussion, history, id]);

  return {
    id,
    discussion,
    createDiscussion,
  };
}
