// @ts-nocheck
import "@/styles/globals.css";
import React from "react";
import ReactDOM from "react-dom";

if (typeof window !== "undefined" && !ReactDOM.findDOMNode) {
  ReactDOM.findDOMNode = (el) => {
    if (!el) return null;
    if (el instanceof HTMLElement) return el;
    // For React components that expose a DOM element, return the DOM node itself
    return el.editor || el.getEditor || el;
  };
}

import Navbar from "@/components/Navbar4";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { useEffect, useState } from "react";
import LoadingSpinner, { AnimatedLoader } from "@/components/LoadingBar";
import { useRouter } from "next/router";
// import Askme from "@/components/Askme";

const MAINTENANCE_MODE = false;

function MaintenancePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f0f0f",
        color: "#fff",
        fontFamily: "'Segoe UI', sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🔧</div>
      <h1
        style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "12px" }}
      >
        We Are Under Maintenance
      </h1>
      <p
        style={{
          color: "#aaaaaa",
          fontSize: "1.1rem",
          maxWidth: "450px",
          lineHeight: "1.6",
        }}
      >
        We will get back to you soon. Thank you for your patience! 🙏
      </p>
    </div>
  );
}

export default function App({ Component, pageProps }) {
  const [firstLoad, setFirstLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setFirstLoad(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (firstLoad) return <AnimatedLoader />;
  // if (MAINTENANCE_MODE) return <MaintenancePage />;

  const isAdminRoute = router.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-[#00974A]/10 to-white">
        <Component {...pageProps} />
      </main>
      {/* <Askme /> */}
      <ChatWidget />
      <Footer />
    </>
  );
}
