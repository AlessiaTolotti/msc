// Interfaccia per i dati della firma
export interface SignatureData {
  id: string
  name: string
  fontFamily: string
  fontSize: number
  color: string
  createdAt: string
}

// Funzione per salvare la firma nel backend
export async function saveSignature(signatureData: {
  name: string
  fontFamily?: string
  fontSize?: number
  color?: string
}): Promise<SignatureData> {
  try {
    const response = await fetch("/api/signature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signatureData.name,
        fontFamily: signatureData.fontFamily || "Kristi",
        fontSize: signatureData.fontSize || 48,
        color: signatureData.color || "#000000",
        createdAt: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to save signature")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error saving signature:", error)
    throw error
  }
}

// Funzione per recuperare una firma dal backend
export async function getSignature(signatureId: string): Promise<SignatureData> {
  try {
    const response = await fetch(`/api/signature/${signatureId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get signature")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error getting signature:", error)
    throw error
  }
}

// Funzione per generare l'immagine della firma
export async function generateSignatureImage(signatureData: SignatureData): Promise<string> {
  try {
    const response = await fetch("/api/signature/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signatureData),
    })

    if (!response.ok) {
      throw new Error("Failed to generate signature image")
    }

    const data = await response.json()
    return data.imageUrl // URL dell'immagine generata
  } catch (error) {
    console.error("Error generating signature image:", error)
    throw error
  }
}

// Funzione per eliminare una firma
export async function deleteSignature(signatureId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/signature/${signatureId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to delete signature")
    }

    return true
  } catch (error) {
    console.error("Error deleting signature:", error)
    throw error
  }
}

// Funzione per aggiornare una firma esistente
export async function updateSignature(
  signatureId: string,
  updateData: Partial<Omit<SignatureData, "id" | "createdAt">>,
): Promise<SignatureData> {
  try {
    const response = await fetch(`/api/signature/${signatureId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })

    if (!response.ok) {
      throw new Error("Failed to update signature")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error updating signature:", error)
    throw error
  }
}

// Funzione helper per validare il nome
export function validateSignatureName(name: string): {
  isValid: boolean
  error?: string
} {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: "Name is required" }
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters" }
  }

  if (name.trim().length > 15) {
    return { isValid: false, error: "Name must be maximum 15 characters" }
  }

  // Controlla che contenga solo lettere e spazi
  const validNameRegex = /^[a-zA-Z\s]+$/
  if (!validNameRegex.test(name.trim())) {
    return { isValid: false, error: "Name can only contain letters and spaces" }
  }

  return { isValid: true }
}

// Funzione per creare un ID univoco per la sessione
export function generateSessionId(): string {
  return `signature_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
