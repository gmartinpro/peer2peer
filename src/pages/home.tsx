import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../modules/app/AppContext";
import { Layout } from "../modules/ui/components/Layout";
import { useForm } from "react-hook-form";
import Peer from "peerjs";

type form = {
  id: string;
  message: string;
};

export const Home = () => {
  const { peer } = useAppContext();
  const { handleSubmit, register } = useForm<form>();
  const video = useRef<HTMLVideoElement>();
  const [connection, setConnection] = useState<Peer.MediaConnection>();

  const onSubmit = async (values: form) => {
    const conn = peer.connect(values.id);
    conn.on("open", () => {
      conn.send(values.message);
    });

    const media = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const call = peer.call(values.id, media);
    call.on("stream", (remoteStream) => {
      video.current!.srcObject = new MediaStream(remoteStream.getVideoTracks());
    });
    setConnection(call);
  };

  useEffect(() => {
    peer.on("call", (call) => {
      call.on("stream", (remoteStream) => {
        video.current!.srcObject = new MediaStream(
          remoteStream.getVideoTracks()
        );
      });
      call.on("close", () => console.log("close"));
    });
  }, [peer]);

  const handleDisconnect = () => {
    connection?.close();
  };

  return (
    <Layout>
      <h1>Home</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="id" id="id" ref={register} type="text" />
        <input name="message" id="message" ref={register} type="text" />
        <button>Envoyer</button>
      </form>
      Lui: <video ref={(ref) => (video.current = ref!)} autoPlay />
      <button onClick={handleDisconnect}>Déconnecté</button>
    </Layout>
  );
};
