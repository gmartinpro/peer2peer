import React from "react";
import { useAppContext } from "../modules/app/AppContext";
import { Layout } from "../modules/ui/components/Layout";
import { useForm } from "react-hook-form";

type form = {
  id: string;
};

export const Home = () => {
  const { peer } = useAppContext();
  const { handleSubmit, register } = useForm<form>();

  const onSubmit = (values: form) => {
    const conn = peer.connect(values.id);
    conn?.on("open", () => {
      conn.send("hi!");
    });
  };

  return (
    <Layout>
      <h1>Home</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="id" id="id" ref={register} type="text" />
        <input name="message" id="message" ref={register} type="text" />
        <button>Envoyer</button>
      </form>
    </Layout>
  );
};
