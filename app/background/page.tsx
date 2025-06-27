"use client"

import { useRouter } from "next/navigation"
import { useState, useCallback, useEffect } from "react"
import Image from "next/image"

// Tipi per le risposte del backend
interface BackendResponse {
  processedImage: string
  signature: string
  success: boolean
  message?: string
}

interface GeneratedImage {
  finalImage: string
  downloadUrl: string
}

interface Step1Data {
  images: string[]
}

interface Step2Data {
  signature: string
  name?: string
}

// Funzioni di fetch integrate nel componente
const fetchProcessedData = async (): Promise<BackendResponse> => {
  const step1DataRaw = localStorage.getItem("step1_images")
  const step2DataRaw = localStorage.getItem("step2_signature")

  if (!step1DataRaw || !step2DataRaw) {
    throw new Error("Missing data from previous steps")
  }

  const step1Data: Step1Data = JSON.parse(step1DataRaw)
  const step2Data: Step2Data = JSON.parse(step2DataRaw)

  const response = await fetch("/api/process-images", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      images: step1Data.images,
      signature: step2Data.signature,
      name: step2Data.name,
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data: BackendResponse = await response.json()

  if (!data.success) {
    throw new Error(data.message || "Failed to process images")
  }

  return data
}

const generateFinalImage = async (
  processedImage: string,
  signature: string,
  background: string,
): Promise<GeneratedImage> => {
  const response = await fetch("/api/generate-final-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      processedImage,
      signature,
      background,
      timestamp: Date.now(),
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}

const downloadImage = (downloadUrl: string, filename: string): void => {
  const link = document.createElement("a")
  link.href = downloadUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const validateStepData = (): { isValid: boolean; missingSteps: string[] } => {
  const missingSteps: string[] = []
  const step1Data = localStorage.getItem("step1_images")
  const step2Data = localStorage.getItem("step2_signature")

  if (!step1Data) {
    missingSteps.push("Step 1 (Upload Images)")
  }
  if (!step2Data) {
    missingSteps.push("Step 2 (Signature)")
  }

  return {
    isValid: missingSteps.length === 0,
    missingSteps,
  }
}

const saveGeneratedImage = (imageData: GeneratedImage): void => {
  localStorage.setItem("step3_generated", JSON.stringify(imageData))
}

const getGeneratedImage = (): GeneratedImage | null => {
  const data = localStorage.getItem("step3_generated")
  return data ? JSON.parse(data) : null
}

export default function Step3Page() {
  const router = useRouter()
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null)
  const [backendData, setBackendData] = useState<BackendResponse | null>(null)
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const backgrounds = [
    { id: "ship", name: "Ship", preview: "/backgrounds/ship-preview.jpg" },
    { id: "airplane", name: "Airplane", preview: "/backgrounds/airplane-preview.jpg" },
    { id: "train", name: "Train", preview: "/backgrounds/train-preview.jpg" },
    { id: "camion", name: "Camion", preview: "/backgrounds/camion-preview.jpg" },
  ]

  // Carica i dati quando la pagina si monta
  useEffect(() => {
    const initializePage = async () => {
      const validation = validateStepData()

      if (!validation.isValid) {
        return
      }

      const savedImage = getGeneratedImage()
      if (savedImage) {
        setGeneratedImage(savedImage)
      }

      await loadProcessedData()
    }

    const loadProcessedData = async () => {
      setIsLoading(true)

      try {
        const data = await fetchProcessedData()
        setBackendData(data)
      } catch (err) {
        console.error("Error loading processed data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    initializePage()
  }, [])

  const onStep1Click = useCallback(() => {
    router.push("/")
  }, [router])

  const onStep2Click = useCallback(() => {
    router.push("/type")
  }, [router])

  const onGenerateClick = useCallback(async () => {
    if (!selectedBackground || !backendData) {
      return
    }

    setIsGenerating(true)

    try {
      const imageData = await generateFinalImage(backendData.processedImage, backendData.signature, selectedBackground)
      setGeneratedImage(imageData)
      saveGeneratedImage(imageData)
    } catch (err) {
      console.error("Error generating image:", err)
    } finally {
      setIsGenerating(false)
    }
  }, [selectedBackground, backendData])

  const onDownloadClick = useCallback(() => {
    if (!generatedImage || !selectedBackground) return

    const filename = `msc-personalized-${selectedBackground}-${Date.now()}.png`
    downloadImage(generatedImage.downloadUrl, filename)
  }, [generatedImage, selectedBackground])

  const onBackgroundSelect = useCallback((backgroundId: string) => {
    setSelectedBackground(backgroundId)
  }, [])

  const onNavClick = useCallback(
    (path: string) => {
      router.push(path)
    },
    [router],
  )

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        backgroundColor: "#e7e7e7",
        minHeight: "100vh",
        overflow: "auto",
        textAlign: "left",
        color: "#000000",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Logo Circle */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "59px",
          borderRadius: "50%",
          backgroundColor: "#d9d9d9",
          width: "100px",
          height: "100px",
        }}
      />

      {/* Navigation */}
      <div
        style={{
          position: "absolute",
          top: "72px",
          left: "235px",
          fontSize: "30px",
          cursor: "pointer",
        }}
        onClick={() => onNavClick("/")}
      >
        Homepage
      </div>
      <div
        style={{
          position: "absolute",
          top: "72px",
          left: "466px",
          fontSize: "30px",
          cursor: "pointer",
        }}
        onClick={() => onNavClick("/about")}
      >
        About
      </div>
      <div
        style={{
          position: "absolute",
          top: "72px",
          left: "628px",
          fontSize: "30px",
          cursor: "pointer",
        }}
        onClick={() => onNavClick("/contact")}
      >
        Contact
      </div>

      {/* Main Heading */}
      <div
        style={{
          position: "absolute",
          top: "160px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "64px",
          fontWeight: "normal",
          textAlign: "center",
        }}
      >
        you move the world.
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: "240px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "18px",
          textAlign: "center",
          maxWidth: "600px",
          lineHeight: "1.5",
        }}
      >
        Create your personalised visual in just a few steps and show the
        <br />
        world the name that keeps the globe moving
      </div>

      {/* GRID CONTAINER */}
      <div
        style={{
          position: "absolute",
          top: "340px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          gridTemplateColumns: "380px 100px 380px",
          gap: "0px",
          alignItems: "center",
          width: "860px",
        }}
      >
        {/* Steps Card */}
        <div
          style={{
            boxShadow: "2px 2px 54.3px 2px rgba(0, 0, 0, 0.25)",
            borderRadius: "20px",
            backgroundColor: "white",
            width: "380px",
            height: "620px",
            padding: "40px",
            justifySelf: "end",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "32px",
              textAlign: "left",
            }}
          >
            STEP:
          </div>

          {/* Step 1 - Upload Photo - INATTIVO */}
          <div
            style={{
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "15px",
              backgroundColor: "white",
              border: "2px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "border-color 0.3s ease",
            }}
            onClick={onStep1Click}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#d1d5db"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#e5e7eb"
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#4b5563",
              }}
            >
              Upload your photo
            </span>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#9ca3af",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                1
              </span>
            </div>
          </div>

          {/* Step 2 - Type Name - INATTIVO */}
          <div
            style={{
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "15px",
              backgroundColor: "white",
              border: "2px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "border-color 0.3s ease",
            }}
            onClick={onStep2Click}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#d1d5db"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#e5e7eb"
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#4b5563",
              }}
            >
              Type your name
            </span>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#9ca3af",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                2
              </span>
            </div>
          </div>

          {/* Step 3 - Select MSG bg - ATTIVO (Giallo) */}
          <div
            style={{
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "15px",
              backgroundColor: "#efd682",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "black",
              }}
            >
              Select your MSC bg
            </span>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#efd682",
                }}
              >
                3
              </span>
            </div>
          </div>

          {/* Background Selection Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "40px",
            }}
          >
            {backgrounds.map((bg) => (
              <div
                key={bg.id}
                style={{
                  border: `2px solid ${selectedBackground === bg.id ? "#efd682" : "#e5e7eb"}`,
                  borderRadius: "10px",
                  backgroundColor: selectedBackground === bg.id ? "#fef3c7" : "white",
                  padding: "16px",
                  textAlign: "center",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  opacity: isLoading ? 0.6 : 1,
                }}
                onClick={() => !isLoading && onBackgroundSelect(bg.id)}
                onMouseEnter={(e) => {
                  if (selectedBackground !== bg.id && !isLoading) {
                    e.currentTarget.style.borderColor = "#efd682"
                    e.currentTarget.style.backgroundColor = "#fefce8"
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedBackground !== bg.id && !isLoading) {
                    e.currentTarget.style.borderColor = "#e5e7eb"
                    e.currentTarget.style.backgroundColor = "white"
                  }
                }}
              >
                <div style={{ fontSize: "16px", fontWeight: "600", color: "black" }}>{bg.name}</div>
              </div>
            ))}
          </div>

          {/* Generate Button */}
          <button
            onClick={onGenerateClick}
            disabled={!selectedBackground || !backendData || isLoading || isGenerating}
            style={{
              width: "100%",
              backgroundColor: selectedBackground && backendData && !isLoading ? "#efd682" : "#d1d5db",
              color: selectedBackground && backendData && !isLoading ? "black" : "#6b7280",
              border: "none",
              borderRadius: "15px",
              padding: "18px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: selectedBackground && backendData && !isLoading ? "pointer" : "not-allowed",
              transition: "all 0.3s ease",
              marginBottom: generatedImage ? "16px" : "0",
            }}
            onMouseEnter={(e) => {
              if (selectedBackground && backendData && !isLoading && !isGenerating) {
                e.currentTarget.style.backgroundColor = "#e6c875"
              }
            }}
            onMouseLeave={(e) => {
              if (selectedBackground && backendData && !isLoading && !isGenerating) {
                e.currentTarget.style.backgroundColor = "#efd682"
              }
            }}
          >
            {isGenerating ? "Generating..." : "Generate Image"}
          </button>

          {/* Download Button */}
          {generatedImage && (
            <button
              onClick={onDownloadClick}
              style={{
                width: "100%",
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "15px",
                padding: "18px",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#059669"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#10b981"
              }}
            >
              Download Image
            </button>
          )}
        </div>

        {/* Arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "620px",
          }}
        >
          <svg width="90" height="40" viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 20 C15 10, 25 30, 35 20 C45 10, 55 30, 65 20 C70 17, 75 20, 80 20"
              stroke="#0A416B"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M80 20 L75 15 M80 20 L75 25"
              stroke="#0A416B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Generated Image Area */}
        <div
          style={{
            width: "380px",
            height: "620px",
            backgroundColor: isLoading ? "#f3f4f6" : "#d1d5db",
            borderRadius: "20px",
            justifySelf: "start",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
            fontSize: "18px",
            fontWeight: "500",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "4px solid #e5e7eb",
                  borderTop: "4px solid #efd682",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 16px",
                }}
              />
              <div>Processing your images...</div>
            </div>
          ) : generatedImage ? (
            <Image
              src={generatedImage.finalImage || "/placeholder.svg"}
              alt="Generated personalized image"
              fill
              style={{ objectFit: "contain" }}
            />
          ) : backendData ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div style={{ marginBottom: "16px" }}>✅ Images processed successfully!</div>
              <div>Select a background and generate your image</div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div>Generated image will appear here</div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
