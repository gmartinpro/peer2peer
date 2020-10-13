import Peer from "peerjs";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
export interface usePeerHooksType {
  peer: Peer;
}

const unik = nanoid();
const myPeer = new Peer(unik, {
  port: 9000,
  secure: false,
  host: "localhost",
  path: "/myapp",
  key: "peerjs",
});

export function usePeerHooks(): usePeerHooksType {
  const [peer] = useState<Peer>(myPeer);

  useEffect(() => {
    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        // Will print 'hi!'
        console.log(data);
      });
    });

    peer.on("error", (error) => console.log(error));

    console.log(peer);

    return () => peer.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { peer };
}
