import React from "react";
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

  const onSubmit = async (values: form) => {
    createDiscussion(values.id);
  };

  return (
    <Layout>
      <h1>Home</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="id" id="id" ref={register} type="text" />
        <Button>Se connecter</Button>
      </Form>
      {/* <button onClick={handleDisconnect}>Déconnecté</button> */}
    </Layout>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
