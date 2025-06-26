"use client"

import { useRouter } from "next/navigation"
import { useState, useCallback } from "react"

export default function Step3Page() {
  const router = useRouter()
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null)

  const backgrounds = [
    { id: "ship", name: "Ship" },
    { id: "airplane", name: "Airplane" },
    { id: "train", name: "Train" },
    { id: "camion", name: "Camion" }
  ]

  const onStep1Click = useCallback(() => {
    router.push("/")
  }, [router])

  const onStep2Click = useCallback(() => {
    router.push("/type")
  }, [router])

  const onGenerateClick = useCallback(() => {
    if (selectedBackground) {
      // Qui chiameresti il backend per generare l'immagine finale
      console.log("Generating final image with background:", selectedBackground)
      // router.push("/result")
      alert(`Generating your image with ${selectedBackground} background!`)
    } else {
      alert("Please select a background first!")
    }
  }, [selectedBackground])

  const onBackgroundSelect = useCallback((backgroundId: string) => {
    setSelectedBackground(backgroundId)
  }, [])

  const onNavClick = useCallback((path: string) => {
    router.push(path)
  }, [router])

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
            height: "620px", // Aumentata l'altezza per fare spazio al bottone
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
              marginBottom: "20px", // Aggiunto margine per separare dal grid
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
              marginBottom: "40px", // Aggiunto spazio prima del bottone
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
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onClick={() => onBackgroundSelect(bg.id)}
                onMouseEnter={(e) => {
                  if (selectedBackground !== bg.id) {
                    e.currentTarget.style.borderColor = "#efd682"
                    e.currentTarget.style.backgroundColor = "#fefce8"
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedBackground !== bg.id) {
                    e.currentTarget.style.borderColor = "#e5e7eb"
                    e.currentTarget.style.backgroundColor = "white"
                  }
                }}
              >
                <div style={{ fontSize: "16px", fontWeight: "600", color: "black" }}>
                  {bg.name}
                </div>
              </div>
            ))}
          </div>

          {/* Generate Button - Spostato più in basso */}
          <button
            onClick={onGenerateClick}
            style={{
              width: "100%",
              backgroundColor: selectedBackground ? "#efd682" : "#d1d5db",
              color: selectedBackground ? "black" : "#6b7280",
              border: "none",
              borderRadius: "15px",
              padding: "18px", // Aumentato il padding per renderlo più prominente
              fontSize: "18px",
              fontWeight: "600",
              cursor: selectedBackground ? "pointer" : "not-allowed",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (selectedBackground) {
                e.currentTarget.style.backgroundColor = "#e6c875"
              }
            }}
            onMouseLeave={(e) => {
              if (selectedBackground) {
                e.currentTarget.style.backgroundColor = "#efd682"
              }
            }}
          >
            Generate Image
          </button>
        </div>

        {/* Arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "620px", // Aggiornata l'altezza per allinearsi con la card
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

        {/* Empty Area - Backend will handle image generation */}
        <div
          style={{
            width: "380px",
            height: "620px", // Aggiornata l'altezza per allinearsi con la card
            backgroundColor: "#d1d5db",
            borderRadius: "20px",
            justifySelf: "start",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          Generated image will appear here
        </div>
      </div>
    </div>
  )
}