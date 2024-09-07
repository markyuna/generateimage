// components/DalleImageGenerator.tsx
"use client";

import React, { useState } from "react";
import { getDalle3Image } from "../lib/openai";
import Image from "next/image";

const DalleImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = await getDalle3Image(prompt);
      setImageUrl(url);
    } catch (err) {
      console.error("Error en la generación de la imagen:", err);
      setError("Error al generar la imagen. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Cuadro de texto */}
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe la imagen que deseas generar"
        className="w-full p-4 border border-gray-300 rounded-md shadow-sm mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Botón de generar con animación */}
      <button
        onClick={handleGenerateImage}
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Generando..." : "Generar Imagen"}
      </button>

      {/* Mostrar error si hay */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Mostrar la imagen generada */}
      {imageUrl && (
        <div className="mt-8">
          <Image
            src={imageUrl}
            alt="Imagen generada por IA"
            className="rounded-lg shadow-md max-w-full"
            width={512} // Especifica el ancho
            height={512} // Especifica la altura
          />
        </div>
      )}
    </div>
  );
};

export default DalleImageGenerator;
