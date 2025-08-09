import React from "react";
import ImageClassifier from "../components/ImageClassifier";
import ScoreBar from "../components/ScoreBar";

const page = () => {
  return (
    <>
      <ScoreBar />
      <ImageClassifier />
    </>
  );
};

export default page;
