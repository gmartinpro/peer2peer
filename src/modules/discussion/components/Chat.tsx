import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useAppContext } from "../../app/AppContext";
import { useDiscussionContext } from "../DiscussionContext";
import { Bubble } from "./Bubble";

export const Chat = () => {
  const { peer } = useAppContext();
  const { messages, videoCall } = useDiscussionContext();
  const video = useRef<HTMLVideoElement>();

  useEffect(() => {
    peer.on("call", (call) => {
      call.on("stream", (remoteStream) => {
        video.current!.srcObject = new MediaStream(
          remoteStream.getVideoTracks()
        );
      });
      call.on("close", () => console.log("close"));
    });
  }, [peer, video]);

  useEffect(() => {
    if (videoCall) {
      videoCall.on("stream", (remoteStream) => {
        video.current!.srcObject = new MediaStream(
          remoteStream.getVideoTracks()
        );
      });
    }
  }, [videoCall]);

  return (
    <ChatWrapper>
      {messages.map((message) => (
        <Bubble
          author={message.author}
          isLeft={message.author !== peer.id}
          content={message.message}
        />
      ))}
      <video ref={(ref) => (video.current = ref!)} autoPlay />
    </ChatWrapper>
  );
};

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 82vh;
  overflow: auto;
  padding: 5px;
`;
