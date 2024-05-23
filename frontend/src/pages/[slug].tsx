import { useGetContentQuery } from "@/services/content";
import { useRouter } from "next/router";
import React from "react";

const Content = () => {
  const router = useRouter();

  const {
    data: content,
    isLoading,
    isSuccess,
  } = useGetContentQuery(`/content/${router.query.slug}`);

  return (
    <>
      {isLoading ? <h1>Yükleniyor</h1> : ""}
      <h1>{isSuccess && content.row.title}</h1>
      <h3>{isSuccess && content.row.description}</h3>
    </>
  );
};

export default Content;
