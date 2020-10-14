import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { useDiscussionContext } from "../modules/discussion/DiscussionContext";
import { Button, Input } from "../modules/ui";
import { Layout } from "../modules/ui/components/Layout";

type form = {
  id: string;
};

export const Home = () => {
  const { createDiscussion } = useDiscussionContext();
  const { handleSubmit, register } = useForm<form>();

  // const video = useRef<HTMLVideoElement>();
  // const [connection, setConnection] = useState<Peer.MediaConnection>();

  const onSubmit = async (values: form) => {
    createDiscussion(values.id);
    // const media = await navigator.mediaDevices.getUserMedia({
    //   video: true,
    //   audio: true,
    // });
    // const call = peer.call(values.id, media);
    // call.on("stream", (remoteStream) => {
    //   video.current!.srcObject = new MediaStream(remoteStream.getVideoTracks());
    // });
    // setConnection(call);
  };

  // useEffect(() => {
  //   peer.on("call", (call) => {
  //     call.on("stream", (remoteStream) => {
  //       video.current!.srcObject = new MediaStream(
  //         remoteStream.getVideoTracks()
  //       );
  //     });
  //     call.on("close", () => console.log("close"));
  //   });
  // }, [peer]);

  // const handleDisconnect = () => {
  //   connection?.close();
  // };

  return (
    <Layout>
      <h1>Home</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="id" id="id" ref={register} type="text" />
        <Button>Se connecter</Button>
      </Form>
      {/* Lui: <video ref={(ref) => (video.current = ref!)} autoPlay /> */}
      {/* <button onClick={handleDisconnect}>Déconnecté</button> */}
    </Layout>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
