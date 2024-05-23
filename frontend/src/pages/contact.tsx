import React from "react";
import { LayoutsTypes } from "@/layouts/Types";
import Head from "next/head";

const Contact: LayoutsTypes = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <div>Contact</div>
    </>
  );
};

Contact.Layout = "Base";
export default Contact;
