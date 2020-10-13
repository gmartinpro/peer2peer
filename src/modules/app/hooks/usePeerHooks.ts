import Peer from "peerjs";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
export interface usePeerHooksType {
  peer: Peer;
}

export function usePeerHooks(): usePeerHooksType {
  const [peer] = useState<Peer>(new Peer(nanoid()));

  useEffect(() => {
    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        // Will print 'hi!'
        console.log(data);
      });
      console.log({ conn });
    });

    console.log(peer);

    // return () => peer.destroy()
  }, [peer]);

  return { peer };
}
