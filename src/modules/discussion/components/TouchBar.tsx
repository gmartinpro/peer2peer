import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { Button, Input } from "../../ui";
import { useDiscussionContext } from "../DiscussionContext";

type Form = {
  message: string;
};

export const TouchBar = () => {
  const {
    sendMessage,
    id,
    createCall,
    videoCall,
    cancelVideoCall,
  } = useDiscussionContext();
  const { handleSubmit, register, setValue } = useForm<Form>();

  const onSubmit = (value: Form) => {
    if (value.message) {
      setValue("message", "");
      sendMessage(value.message);
    }
  };

  const beginCallTransaction = async () => {
    if (videoCall) {
      cancelVideoCall();
      return;
    }
    createCall(id!);
  };

  return (
    <TouchBarWrapper onSubmit={handleSubmit(onSubmit)}>
      <TouchBarInput ref={register} id="message" name="message" />
      <CustomButton>Envoyez le message</CustomButton>
      <CustomButton onClick={beginCallTransaction}>
        {videoCall ? "Raccrochez" : "Appelez"}
      </CustomButton>
    </TouchBarWrapper>
  );
};

const TouchBarWrapper = styled.form`
  margin-top: auto;
  display: flex;
`;
const TouchBarInput = styled(Input)`
  width: 100%;
  margin: 0;
`;
const CustomButton = styled(Button)``;
