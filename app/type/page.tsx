"use client"

import type React from "react"
import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function TypePage() {
  const [userName, setUserName] = useState<string>("")
  const [error, setError] = useState<string>("")
  const router = useRouter()

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setError("")

    if (value.length > 15) {
      setError("Maximum 15 letters allowed")
      return
    }

    const validName = value.replace(/[^a-zA-Z\s]/g, "")
    setUserName(validName)
  }, [])

  const onStep1Click = useCallback(() => {
    document.getElementById("image-upload")?.click()
  }, [])

  const onStep3Click = useCallback(() => {
    if (userName.trim().length === 0) {
      setError("Please enter your name first")
      return
    }
    
    if (userName.trim().length < 2) {
      setError("Name must be at least 2 characters")
      return
    }

    console.log("Step 3 clicked - ready to proceed")
    router.push('/background')
  }, [userName, router])

  // Determina se lo Step 3 è abilitato
  const isStep3Enabled = userName.trim().length >= 2

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
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          Homepage
        </Link>
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

          {/* Step 1 - Upload Photo - Completed (Gray) */}
          <div
            style={{
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "15px",
              backgroundColor: "#e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
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

          {/* Step 2 - Type Name - Active (Yellow) */}
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
              Type your name
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
                2
              </span>
            </div>
          </div>

          {/* Step 3 - Select MSG bg - Dinamico basato su userName */}
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

        {/* Type Name Area */}
        <div
          style={{
            width: "380px",
            height: "420px",
            border: "4px dashed #efd682",
            borderRadius: "20px",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            justifySelf: "start",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "48px",
              textAlign: "center",
            }}
          >
            Type your name:
          </div>

          <div
            style={{
              width: "100%",
              marginBottom: "24px",
            }}
          >
            <input
              type="text"
              value={userName}
              onChange={handleNameChange}
              placeholder="Enter your name here..."
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: "25px",
                backgroundColor: "transparent",
                border: "none",
                borderBottom: "4px solid #efd682",
                outline: "none",
                paddingBottom: "16px",
                fontFamily: userName ? "Kristi, cursive" : "inherit",
              }}
              maxLength={15}
            />
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "#6b7280",
              marginBottom: "16px",
            }}
          >
            {userName.length}/15 characters
          </div>

          {error && (
            <div
              style={{
                color: "#ef4444",
                fontSize: "14px",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{
              fontSize: "14px",
              color: "#4b5563",
              textAlign: "center",
              marginBottom: "32px",
              lineHeight: "1.6",
            }}
          >
            The word should be a maximum of 15 letters,
            once written check typographical errors.
          </div>

          {/* Indicatore visivo dello stato dello Step 3 */}
          {isStep3Enabled && (
            <div
              style={{
                fontSize: "14px",
                color: "#059669",
                textAlign: "center",
                fontWeight: "600",
                backgroundColor: "#d1fae5",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              ✓ Ready to proceed to Step 3!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}