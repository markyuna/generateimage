export async function getDalle3Image(prompt: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; // Cambiar a NEXT_PUBLIC_

  console.log("Clave de API:", process.env.NEXT_PUBLIC_OPENAI_API_KEY);

  if (!apiKey) {
    throw new Error("La clave de API de OpenAI no está configurada. Verifica tu archivo .env.local.");
  }

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: "1024x1024",
        model: "dall-e-3",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error: ${data.error?.message || "Error desconocido"}`);
    }

    return data.data[0].url;
  } catch (error) {
    console.error("Error al hacer la solicitud a OpenAI:", error);
    throw error;
  }
}
