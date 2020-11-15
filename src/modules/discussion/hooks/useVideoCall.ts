import Peer from "peerjs";
import { useEffect, useState } from "react";
import { useAppContext } from "../../app/AppContext";

export interface useVideoCallType {
  createCall(id: string): Promise<void>;
  cancelVideoCall(): any;
  videoCall?: Peer.MediaConnection;
}

export function useVideoCall(): useVideoCallType {
  const { peer } = useAppContext();
  const [videoCall, setVideoCall] = useState<
    Peer.MediaConnection | undefined
  >();

  const createCall = async (id: string) => {
    const media = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const call = peer.call(id!, media);
    setVideoCall(call!);
  };

  const cancelVideoCall = () => {
    videoCall?.close();
    setVideoCall(undefined);
  };

  useEffect(() => {
    peer.on("call", async (call) => {
      console.log("Answer");
      const media = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      call.answer(media);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { createCall, videoCall, cancelVideoCall };
}
