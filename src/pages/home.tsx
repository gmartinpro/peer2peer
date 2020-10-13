import React, { useRef } from "react";
import { useAppContext } from "../modules/app/AppContext";
import { Layout } from "../modules/ui/components/Layout";
import { useForm } from "react-hook-form";

type form = {
  id: string;
  message: string;
};

export const Home = () => {
  const { peer } = useAppContext();
  const { handleSubmit, register } = useForm<form>();
  const video = useRef<HTMLVideoElement>();

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
      console.log({ remoteStream });
      video.current!.srcObject = new MediaStream(remoteStream.getVideoTracks());
    });
  };

  return (
    <Layout>
      <h1>Home</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="id" id="id" ref={register} type="text" />
        <input name="message" id="message" ref={register} type="text" />
        <button>Envoyer</button>
        <video ref={(ref) => (video.current = ref!)} autoPlay />
      </form>
    </Layout>
  );
};
