import Peer from "peerjs";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import { Routes } from "../../navigation/AppRouter";

export interface useDiscussionHooksType {
  id?: string;
  discussion?: Peer.DataConnection;
  messages: Message[];
  createDiscussion(id: string): void;
  sendMessage(message: string): void;
}

interface Message {
  message: string;
  author: string;
  date: Date;
}

export function useDiscussion(): useDiscussionHooksType {
  const { peer } = useAppContext();
  const [discussion, setDiscussion] = useState<Peer.DataConnection>();
  const [id, setId] = useState<string>();
  const history = useHistory();
  const [messages, setMessages] = useState<Message[]>([]);

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

  const sendMessage = (message: string) => {
    const constructMessage = {
      message,
      author: peer.id,
      date: new Date(),
    };
    discussion?.send(constructMessage);
    setMessages((prev) => [...prev, constructMessage]);
  };

  useEffect(() => {
    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        if (data.id) {
          history.push(Routes.DISCUSSION.replace(":id", data.id));
        }
      });
      setDiscussion(conn);
    });

    return () => discussion?.close();
  }, [discussion, history, peer]);

  useEffect(() => {
    if (discussion) {
      discussion.on("data", (data: Message) => {
        if (data.author) {
          setMessages((prev) => [...prev, data]);
        }
      });
    }
  }, [discussion]);

  useEffect(() => {
    if (discussion && id) {
      history.push(Routes.DISCUSSION.replace(":id", id!));
    }
  }, [discussion, history, id]);

  return {
    id,
    discussion,
    messages,
    createDiscussion,
    sendMessage,
  };
}
