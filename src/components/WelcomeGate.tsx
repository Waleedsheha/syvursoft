"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { GATE_COOKIE, GATE_PASSED } from "@/lib/gate";
import { startWelcomeGate } from "@/lib/welcome-gate";

/* The way into Syvursoft: the welcome lies frozen under ice, under snow; sweep the snow away and press Enter. Passing it
   sets this session's pass, fades the gate away over the home page, then refreshes so the server drops the gate. */
export default function WelcomeGate() {
  const t = useTranslations("welcomeGate");
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const root = rootRef.current, canvas = canvasRef.current, logo = logoRef.current, title = titleRef.current, enter = enterRef.current;
    if (!root || !canvas || !logo || !title || !enter) throw new Error("Welcome gate: its elements are missing.");
    const html = document.documentElement;
    html.classList.add("gate-open");
    let timer = 0;
    function pass() {
      document.cookie = `${GATE_COOKIE}=${GATE_PASSED}; path=/; SameSite=Lax; Secure`;
      setLeaving(true);
      timer = window.setTimeout(() => {
        html.classList.remove("gate-open");
        router.refresh();
      }, 700);
    }
    const stop = startWelcomeGate({ root, canvas, logo, title, enter }, pass);
    return () => {
      stop();
      window.clearTimeout(timer);
      html.classList.remove("gate-open");
    };
  }, [router]);

  return (
    <div
      ref={rootRef}
      className={leaving ? "welcome-gate is-leaving" : "welcome-gate"}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-gate-title"
    >
      <canvas ref={canvasRef} className="welcome-gate__scene" aria-hidden="true" />
      <div className="welcome-gate__layout">
        <div className="welcome-gate__frozen">
          <Image
            ref={logoRef}
            className="welcome-gate__logo"
            src="/images/syvursoft-logo.png"
            alt=""
            width={951}
            height={532}
            priority
            unoptimized
          />
          <h2 ref={titleRef} id="welcome-gate-title" className="welcome-gate__title">
            <span>{t("welcome")}</span>
            <span>{t("to")}</span>
            <span>Syvursoft</span>
          </h2>
          <button ref={enterRef} type="button" className="welcome-gate__enter">
            {t("enter")}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
