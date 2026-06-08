"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const professores = [
  {
    nome: 'Ryan Trevizan',
    thumb: "/images/Ryan1.jpeg",
    foto: "/images/Ryan2.jpeg",
    desc: "Artista musical e programador, Ryanex está aqui para trazer criatividade e inovação para nossas soluções educacionais. (Há quem diga que ele é O Cara)",
  },
  {
    nome: "Sara Eduarda",
    thumb: "/images/Sara1.jpeg",
    foto: "/images/Sara2.jpeg",
    desc: "Pedagoga e especialista em educação especial, Sara é a mente por trás de nossos programas educacionais.",
  },
  {
    nome: "Felipe Borges",
    thumb: "/images/Felipe1.jpeg",
    foto: "/images/Felipe3.jpeg",
    desc: "Programador, designer formado e responsável por este site. Ama aprender e ensinar e usa desse amor aqui. (Há quem diga que ele é O Cara)",
  },
  {
    nome: 'Anderson "Big Boss" Jr.',
    thumb: "/images/Anderson3.jpeg",
    foto: "/images/Anderson2.jpeg",
    desc: "Diretor da escola e professor dedicado, trazendo disciplina e paixão. (Ele é O Cara)",
  },
];

export default function Professores() {
  const [active, setActive] = useState<number | null>(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isRyanActive, setIsRyanActive] = useState(false);

  const RYAN_INDEX = 0;
  const FELIPE_INDEX = 2;

  // GLITCH ALEATÓRIO
  useEffect(() => {
    if (active !== FELIPE_INDEX) return;

    let timeout: number;

    const triggerGlitch = () => {
      const delay = 5000 + Math.random() * 25000;

      timeout = window.setTimeout(() => {
        setIsGlitching(true);

        setTimeout(() => {
          setIsGlitching(false);
          triggerGlitch();
        }, 800);
      }, delay);
    };

    triggerGlitch();

    return () => clearTimeout(timeout);
  }, [active]);

  // ATIVAÇÃO RYANEX
  useEffect(() => {
    if (active !== RYAN_INDEX) return;

    let timeout: number;

    const triggerRyan = () => {
      const delay = 5000 + Math.random() * 25000;

      timeout = window.setTimeout(() => {
        setIsRyanActive(true);

        setTimeout(() => {
          setIsRyanActive(false);
          triggerRyan();
        }, 1200); // duração do "drop"
      }, delay);
    };

    triggerRyan();

    return () => clearTimeout(timeout);
  }, [active]);

  return (
    <section
      className="w-full min-h-screen pt-24 pb-6 px-6 flex justify-center bg-cover bg-no-repeat relative"
      style={{
        backgroundImage: "url('/images/juntos.jpeg')",
        backgroundPosition: 'top',
      }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="w-full max-w-5xl relative z-10">

        {/* TÍTULO */}
        <h2 className="text-2xl font-semibold text-center bg-gray-200 rounded-full px-6 py-2 mb-6 shadow-lg text-black">
          Nossos Professores
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
          {professores.map((prof, index) => {
            const isHidden = active !== null && active !== index;

            return (
              <AnimatePresence key={index}>
                {!isHidden && (
                  <motion.div
                    layoutId={`card-${index}`}
                    onClick={() => setActive(index)}
                    className="bg-white rounded-2xl p-6 flex flex-col items-center cursor-pointer shadow-md"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      layoutId={`image-${index}`}
                      className="relative w-24 h-24"
                    >
                      <Image src={prof.thumb} alt="" fill className="object-contain" />
                    </motion.div>

                    <motion.h3 layoutId={`name-${index}`} className="mt-4 text-center text-black">
                      {prof.nome}
                    </motion.h3>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* EXPANSÃO */}
        <AnimatePresence>
          {active !== null && (
            <motion.div
              layoutId={`card-${active}`}
              className="absolute inset-0 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 overflow-hidden shadow-2xl"

              animate={
                active === RYAN_INDEX && isRyanActive
                  ? {
                      scale: [1, 1.02, 1],
                      boxShadow: [
                        "0 0 0px rgba(168,85,247,0)",
                        "0 0 40px rgba(168,85,247,0.8)",
                        "0 0 0px rgba(168,85,247,0)",
                      ],
                    }
                  : {
                      scale: 1,
                      boxShadow: "0 0 0px rgba(168,85,247,0)",
                    }
              }

              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}

              style={
                active === FELIPE_INDEX && isGlitching
                  ? {
                      background: "#000",
                      color: "#fff",
                      border: "2px solid red",
                    }
                  : active === RYAN_INDEX && isRyanActive
                  ? {
                      background: "linear-gradient(135deg, #0a001a, #1a0033)",
                      border: isRyanActive ? "2px solid #facc15" : "none",
                    }
                  : { backgroundColor: "var(--color-primary)" }
              }
            >
              {/* FLASH RYAN */}
              {active === RYAN_INDEX && isRyanActive && (
                <motion.div
                  className="absolute inset-0 bg-yellow-300/10 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.4, 0] }}
                  transition={{ duration: 0.6 }}
                />
              )}

              {/* TEXTO */}
              <motion.div
                className="rounded-2xl p-6 flex-1 max-w-[320px] shadow-xl"

                animate={
                  active === RYAN_INDEX && isRyanActive
                    ? {
                        scale: [1, 0.96, 1.04, 1],
                      }
                    : { scale: 1 }
                }

                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}

                style={
                  active === FELIPE_INDEX && isGlitching
                    ? {
                        background: "linear-gradient(135deg, #000 0%, #1a0000 100%)",
                        color: "#fff",
                        border: "1px solid red",
                        boxShadow: "0 0 15px rgba(255,0,0,0.5)",
                      }
                    : active === RYAN_INDEX && isRyanActive
                    ? {
                        background: "#0a001a",
                        color: "#facc15",
                      }
                    : {
                        backgroundColor: "#ffffff",
                        color: "#000",
                      }
                }
              >
                <motion.h2
                  layoutId={`name-${active}`}
                  className="text-xl font-semibold"

                  animate={
                    active === RYAN_INDEX && isRyanActive
                      ? { scale: [1, 1.1, 1] }
                      : { scale: 1 }
                  }

                  transition={{ duration: 0.6 }}

                  style={
                    active === FELIPE_INDEX && isGlitching
                      ? {
                          textShadow: "2px 0 red, -2px 0 cyan",
                          transform: "skewX(10deg)",
                        }
                      : active === RYAN_INDEX && isRyanActive
                      ? {
                          color: "#facc15",
                          textShadow: "0 0 20px rgba(250,204,21,0.8)",
                        }
                      : undefined
                  }
                >
                  {active === FELIPE_INDEX
                    ? isGlitching
                      ? "M̵͓͛̈́r̴̳̎́.̷͎̍͝ ̷̩̕Ṁ̶͎̈́p̴̳͌ė̵̲d̶͕̕i̴̪͊à̶̙"
                      : "Felipe Borges"
                    : active === RYAN_INDEX
                    ? isRyanActive
                      ? "RYANEX"
                      : professores[active].nome
                    : professores[active].nome}
                </motion.h2>

                <p
                  className="mt-3 text-sm transition-all duration-300"
                  style={
                    active === FELIPE_INDEX && isGlitching
                      ? { color: "#ff4d4d" }
                      : active === RYAN_INDEX && isRyanActive
                      ? { color: "#fde68a" }
                      : { color: "#4b5563" }
                  }
                >
                  {professores[active].desc}
                </p>

                <button
                  onClick={() => setActive(null)}
                  className="mt-4 text-primary text-sm"
                >
                  Voltar
                </button>
              </motion.div>

              {/* IMAGEM */}
              <motion.div
                layoutId={`image-${active}`}
                className="relative w-full md:w-1/2 h-64"
              >
                <Image
                  src={
                    active === RYAN_INDEX && isRyanActive
                      ? "/images/RyanPhoto (2).jpeg"
                      : active === FELIPE_INDEX && isGlitching
                      ? "/images/FelipePhoto (2).png"
                      : professores[active].foto
                  }
                  alt=""
                  fill
                  className="object-contain"
                />

                {/* 🌊 RYAN RIPPLE */}
                {active === RYAN_INDEX && isRyanActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="absolute rounded-full border border-purple-400/40"
                        style={{ width: 120, height: 120 }}
                        animate={{
                          scale: [1, 2.5],
                          opacity: [0.6, 0],
                        }}
                        transition={{
                          duration: 1.2,
                          delay: i * 0.2,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* 💀 FELIPE GLITCH */}
                {active === FELIPE_INDEX && isGlitching && (
                  <>
                    <div className="absolute inset-0 mix-blend-screen opacity-70 animate-glitch1">
                      <Image
                        src="/images/FelipePhoto (2).png"
                        alt=""
                        fill
                        className="object-contain translate-x-[2px] hue-rotate-[-20deg]"
                      />
                    </div>

                    <div className="absolute inset-0 mix-blend-screen opacity-70 animate-glitch2">
                      <Image
                        src="/images/FelipePhoto (2).png"
                        alt=""
                        fill
                        className="object-contain -translate-x-[2px] hue-rotate-[20deg]"
                      />
                    </div>

                    <div className="absolute inset-0 bg-red-600/10 animate-pulse" />
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
