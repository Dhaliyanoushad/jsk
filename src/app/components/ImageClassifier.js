// src/app/components/ImageClassifier.js
"use client";

import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";

export default function ImageClassifier() {
  const [model, setModel] = useState(null);
  const [classNames, setClassNames] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageRef = useRef(null);

  useEffect(() => {
    async function loadModel() {
      try {
        const modelUrl = "/models/model.json";
        const loadedModel = await tf.loadLayersModel(modelUrl);
        setModel(loadedModel);
        const names = ["gunda", "orphan"]; // ✅ REMEMBER TO USE YOUR CLASS NAMES
        setClassNames(names);
        setLoading(false);
        console.log("Model loaded successfully");
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
      const url = URL.createObjectURL(file);
      setImageURL(url);
      setPrediction(null);
    }
  };

  const handlePredict = async () => {
    // --- Start of Debug Section ---
    console.log("1. handlePredict function called.");

    if (!model) {
      console.error("Model not loaded yet.");
      return;
    }
    if (!imageRef.current) {
      console.error("Image reference is not available.");
      return;
    }
    console.log("2. Model and image ref are ready.");
    // --- End of Debug Section ---

    try {
      const tensor = tf.browser
        .fromPixels(imageRef.current)
        .resizeNearestNeighbor([180, 180])
        .toFloat()
        .expandDims(0);

      console.log("3. Image successfully converted to tensor.");

      const predictions = await model.predict(tensor);
      const predictionsData = await predictions.data();

      console.log("4. Prediction complete.", predictionsData);

      const highestIndex = predictions.as1D().argMax().dataSync()[0];
      const predictedClass = classNames[highestIndex];
      const confidence = (predictionsData[highestIndex] * 100).toFixed(1);

      setPrediction(`Predicted: ${predictedClass} (${confidence}%)`);

      tensor.dispose();
      predictions.dispose();
      console.log("5. Prediction displayed and tensors disposed.");
    } catch (error) {
      console.error("--- ERROR DURING PREDICTION ---", error);
      setPrediction("Failed to predict. Check console for errors.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
        marginTop: "40px",
      }}
    >
      <h2>Image Classifier</h2>
      {loading ? (
        <p>Loading model, please wait...</p>
      ) : (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginBottom: "20px" }}
          />
          {imageURL && (
            <div style={{ marginBottom: "20px" }}>
              <img
                ref={imageRef}
                src={imageURL}
                alt="Upload Preview"
                width="250"
                crossOrigin="anonymous"
              />
            </div>
          )}
          <button
            onClick={handlePredict}
            disabled={!imageURL || !model || loading}
            className="
    bg-blue-600 text-white font-bold py-2 px-4 rounded-lg
    transition-colors duration-300
    hover:bg-blue-700
    focus:outline-none focus:ring-2 focus:ring-blue-500
    disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Predict"}
          </button>
          {prediction && <h3 style={{ marginTop: "20px" }}>{prediction}</h3>}
        </>
      )}
    </div>
  );
}
