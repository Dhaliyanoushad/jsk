"use client";

import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import { useScores } from "../context/ScoreContext";
import Link from "next/link";

export default function ImageClassifier() {
  const [model, setModel] = useState(null);
  const [classNames, setClassNames] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNext, setShowNext] = useState(false);
  const imageRef = useRef(null);

  const { setImageScore } = useScores();

  useEffect(() => {
    async function loadModel() {
      try {
        const modelUrl = "/models/model.json";
        const loadedModel = await tf.loadLayersModel(modelUrl);
        setModel(loadedModel);
        const names = ["gunda", "orphan"];
        setClassNames(names);
        setLoading(false);
      } catch (error) {
        console.error("Error loading model: ", error);
        setLoading(false);
      }
    }
    loadModel();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageURL(URL.createObjectURL(file));
      setPrediction(null);
      setShowNext(false);
    }
  };

  const handlePredict = async () => {
    if (!model || !imageRef.current) return;
    try {
      const tensor = tf.browser
        .fromPixels(imageRef.current)
        .resizeNearestNeighbor([180, 180])
        .toFloat()
        .expandDims(0);

      const predictions = await model.predict(tensor);
      const predictionsData = await predictions.data();

      const highestIndex = predictions.as1D().argMax().dataSync()[0];
      const predictedClass = classNames[highestIndex];
      const confidence = predictionsData[highestIndex];
      const confidencePercent = (confidence * 100).toFixed(1);
      setPrediction(`Predicted: ${predictedClass} (${confidencePercent}%)`);

      // Normalize score and update global score context
      let normalizedScore = 0;
      if (predictedClass === "gunda") {
        normalizedScore = confidence * 200 - 100;
      } else if (predictedClass === "orphan") {
        normalizedScore = (1 - confidence) * 200 - 100;
      }
      setImageScore(normalizedScore);

      setShowNext(true);

      tensor.dispose();
      predictions.dispose();
    } catch (error) {
      console.error("--- ERROR DURING PREDICTION ---", error);
      setPrediction("Failed to predict. Check console for errors.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto px-4 py-8 text-center font-sans text-gray-100 bg-transparent">
      <h2 className="text-4xl font-extrabold mb-8 select-none">
        Image Classifier
      </h2>
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 italic">Loading model, please wait...</p>
        </div>
      ) : (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="
              block w-full text-gray-200
              bg-transparent border-b border-gray-600
              py-2 px-1 mb-6
              cursor-pointer
              file:bg-gray-700 file:text-gray-300 file:py-1 file:px-3 file:border-0
              file:rounded-sm file:mr-4
              hover:file:bg-gray-600
              focus:outline-none focus:border-blue-500"
          />
          {prediction && (
            <h3 className="mb-4 text-xl font-bold tracking-wide select-text break-words text-amber-200">
              {prediction}
            </h3>
          )}
          {imageURL && (
            <div className="mb-4">
              <img
                ref={imageRef}
                src={imageURL}
                alt="Upload Preview"
                className="mx-auto rounded-md border border-gray-700 shadow-sm"
                width={250}
              />
            </div>
          )}
          {/* Spacer to push the button to the bottom */}
          <div className="flex-1" />
          <div className="sticky bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/40 pt-4 pb-2">
            <button
              onClick={handlePredict}
              disabled={!imageURL || !model || loading}
              className="
                w-full bg-blue-600 text-white font-semibold text-lg py-4 rounded-lg
                hover:bg-blue-700 transition-colors duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              {loading ? "Loading..." : "Predict"}
            </button>
            {showNext && (
              <Link
                href="/game" // CHANGE this to your target page!
                className="mt-4 inline-block w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-4 rounded-lg transition-colors duration-300"
              >
                Next
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
