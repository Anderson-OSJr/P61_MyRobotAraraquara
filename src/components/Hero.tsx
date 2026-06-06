"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // SCROLL SUAVE
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setOpen(false);
  };

  // OBSERVER PARA ANIMAÇÃO DE DIGITAÇÃO
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section
      id="Hero"
      className="relative w-full h-screen bg-secondary overflow-hidden"
    >
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 bg-primary/80 backdrop-blur-md shadow-md">
        {/* LOGO */}
        <button onClick={() => scrollToSection("Hero")} className="flex items-center gap-3">
          <Image
            src="/images/MyRobot-Logo-Branca.svg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
        </button>

        {/* LOGOMARCA + CIDADE */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col leading-tight items-center pointer-events-none">
          <Image
            src="/images/MyRobot-Logomarca-Branca2.svg"
            alt="Logomarca"
            width={120}
            height={40}
            unoptimized
          />

          <span className="text-[10px] tracking-[0.35em] font-extralight text-white/70 mt-1.5 leading-none">
            ARARAQUARA
          </span>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("Sobre")}
              className="text-sm font-medium text-white/90 hover:text-accent-mint transition"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("Cursos")}
              className="text-sm font-medium text-white/90 hover:text-accent-blue transition"
            >
              Cursos
            </button>
            <button
              onClick={() => scrollToSection("Professores")}
              className="text-sm font-medium text-white/90 hover:text-secondary transition"
            >
              Professores
            </button>
            <button
              onClick={() => scrollToSection("Contato")}
              className="text-sm font-medium text-white/90 hover:text-accent-gray transition"
            >
              Contato
            </button>
          </nav>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-full bg-white/80 backdrop-blur-md shadow-md transition md:hidden"
          >
            {open ? (
              <X className="text-primary" />
            ) : (
              <Menu className="text-primary" />
            )}
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } md:hidden`}
      />

      {/* MENU LATERAL */}
      <div
        className={`fixed top-0 right-0 z-50 w-1/3 max-w-[320px] bg-white shadow-xl rounded-l-2xl p-6 flex flex-col gap-6 transition-transform  duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => scrollToSection("Sobre")}
          className="text-lg font-medium text-center hover:text-accent-mint transition"
        >
          Sobre
        </button>

        <button
          onClick={() => scrollToSection("Cursos")}
          className="text-lg font-medium text-center hover:text-accent-blue transition"
        >
          Cursos
        </button>

        <button
          onClick={() => scrollToSection("Professores")}
          className="text-lg font-medium text-center hover:text-secondary transition"
        >
          Professores
        </button>

        <button
          onClick={() => scrollToSection("Contato")}
          className="text-lg font-medium text-center hover:text-accent-gray transition"
        >
          Contato
        </button>
      </div>

      {/* HERO IMAGE */}
      <div className="w-full h-full">
        <Image
          src="/images/pexels-vanessa-loring-7868888.jpg"
          alt="Imagem do HERO"
          fill
          priority
          className="object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* TEXTO HERO */}
      <div className="absolute bottom-10 left-0 w-full px-6 text-white">
        <h1 className="text-3xl font-bold leading-tight md:text-6xl">
          Faça com quem entende
        </h1>

        <p className="mt-2 text-sm text-white/90">
          O futuro começa aqui
        </p>

        <button
          onClick={() => scrollToSection("Contato")}
          className="mt-4 bg-primary text-white px-5 py-3 rounded-full font-medium shadow-lg hover:scale-105 active:scale-95 transition"
        >
          Fale conosco
        </button>
      </div>
    </section>
  );
}