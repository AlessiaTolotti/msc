// Funzione per uploadare l'immagine al backend
export async function uploadImage(file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append("image", file)

    // Chiamata al backend (da implementare)
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    const data = await response.json()

    // Ritorna l'URL dell'immagine processata/scontornata
    return data.imageUrl
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

// Funzione per scontornare l'immagine (background removal)
export async function removeBackground(imageUrl: string): Promise<string> {
  try {
    const response = await fetch("/api/remove-background", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    })

    if (!response.ok) {
      throw new Error("Background removal failed")
    }

    const data = await response.json()
    return data.processedImageUrl
  } catch (error) {
    console.error("Error removing background:", error)
    throw error
  }
}
