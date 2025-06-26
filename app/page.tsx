"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function UploadPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const router = useRouter()

  const onStep1Click = useCallback(() => {
    document.getElementById("image-upload")?.click()
  }, [])

const onStep2Click = useCallback(() => {
  router.push("/type")
}, [router])

  const onStep3Click = useCallback(() => {
    console.log("Step 3 clicked - ready to proceed")
  }, [])

  const onUploadAreaClick = useCallback(() => {
    document.getElementById("image-upload")?.click()
  }, [])

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        backgroundColor: "#e7e7e7",
        height: "100vh",
        overflow: "hidden",
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
            height: "420px",
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

          {/* Step 1 - Upload Photo - ATTIVO (Giallo) */}
          <div
            style={{
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "15px",
              backgroundColor: "#efd682",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={onStep1Click}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e6c875"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#efd682"
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "black",
              }}
            >
              Upload your photo
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
                1
              </span>
            </div>
          </div>

          {/* Step 2 - Type Name - SEMPRE ATTIVO */}
          <div
            style={{
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "15px",
              backgroundColor: "white",
              border: "2px solid #efd682",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "border-color 0.3s ease",
            }}
            onClick={onStep2Click}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#e6c875"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#efd682"
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "black",
              }}
            >
              Type your name
            </span>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#efd682",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "black",
                }}
              >
                2
              </span>
            </div>
          </div>

          {/* Step 3 - Select MSC bg - INATTIVO (Solo bordo) */}
                <div
            style={{
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "15px",
              backgroundColor: "white",
              border: "2px solid #efd682",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "border-color 0.3s ease",
            }}
            onClick={onStep3Click}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#e6c875"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#efd682"
            }}
          >
               <span
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "black",
              }}
            >
              Select your MSG bg
            </span>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#efd682",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "black",
                }}
              >
                3
              </span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "420px",
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

        {/* Upload Area */}
        <div
          style={{
            width: "380px",
            height: "420px",
            backgroundColor: "#d1d5db",
            borderRadius: "20px",
            cursor: "pointer",
            overflow: "hidden",
            justifySelf: "start",
          }}
          onClick={onUploadAreaClick}
        >
          {uploadedImage ? (
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={uploadedImage || "/placeholder.svg"}
                alt="Uploaded image"
                width={380}
                height={420}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setUploadedImage(null)
                }}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "35px",
                  height: "35px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                ×
              </button>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ position: "absolute", inset: "0" }}>
                {Array.from({ length: 10 }).map((_, row) =>
                  Array.from({ length: 12 }).map((_, col) => (
                    <div
                      key={`${row}-${col}`}
                      style={{
                        position: "absolute",
                        width: "12px",
                        height: "12px",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        opacity: "0.8",
                        top: `${row * 35 + 30}px`,
                        left: `${col * 30 + 25}px`,
                      }}
                    />
                  )),
                )}
              </div>
              <div
                style={{
                  position: "relative",
                  zIndex: "10",
                  textAlign: "center",
                  color: "#6b7280",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>📷</div>
                <div style={{ fontSize: "18px", fontWeight: "500" }}>Click to upload image</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <input
        type="file"
        id="image-upload"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
              const result = event.target?.result
              if (typeof result === "string") {
                setUploadedImage(result)
              }
            }
            reader.readAsDataURL(file)
          }
        }}
      />
    </div>
  )
}