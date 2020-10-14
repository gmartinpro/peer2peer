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
    peer.on("error", (error) => console.log(error));

    peer.on("call", async (call) => {
      const media = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      call.answer(media); // Answer the call with an A/V stream.
    });

    return () => peer.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { peer };
}
