"use client";

import { useState } from "react";
import { Phone, MessageCircle, Share2 } from "lucide-react";
import FormDropdown from "./FormDropdown";

const faqs = [
  {
    pergunta: "Quantas aulas por semana?",
    resposta: "Uma vez por semana. Com aulas de robótica com duração de 2 horas e empreendedorismo com duração de 1 hora.",
  },
  {
    pergunta: "A partir de quantos anos vocês atendem?",
    resposta: "Atendemos crianças de 5 a 105 anos!.",
  },
  {
    pergunta: "Quanto tempo dura um curso?",
    resposta: "Entre 10 a 12 meses.",
  },
  {
    pergunta: "O que está incluso no curso?",
    resposta: "O curso matriculado e 3 livros de aula com tarefas."
  }
];

export default function Contato() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full h-full bg-white px-6 py-24 flex flex-col items-center">

      {/* CTA */}
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-semibold text-black">
          Comece agora com a gente 🚀
        </h2>

        <p className="mt-3 text-accent-gray">
          Dê o próximo passo e transforme seu futuro com tecnologia.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8 max-w-md w-full">

        {/* WHATSAPP */}
        <a
            href="https://wa.me/551633316703?text=Olá, gostaria de saber mais sobre os cursos de robótica educacional."
            target="_blank"
            className="
            flex items-center justify-center gap-2
            bg-green-500 text-white
            px-4 py-3 rounded-full
            shadow-md
            transition-all duration-300
            hover:scale-105 active:scale-95
            "
        >
            <MessageCircle size={18} />
            <span className="text-sm font-medium">WhatsApp</span>
        </a>

        {/* INSTAGRAM */}
        <a
            href="https://www.instagram.com/myrobot_araraquara/"
            target="_blank"
            className="
            flex items-center justify-center gap-2
            bg-gradient-to-r from-pink-500 to-orange-500 text-white
            px-4 py-3 rounded-full
            shadow-md
            transition-all duration-300
            hover:scale-105 active:scale-95
            "
        >
            <Share2 size={18} />
            <span className="text-sm font-medium">Instagram</span>
        </a>

        {/* LIGAÇÃO */}
        <a
            href="tel:+551633316703"
            className="
            col-span-2
            flex items-center justify-center gap-2
            bg-blue-600 text-white
            px-4 py-3 rounded-full
            shadow-md
            transition-all duration-300
            hover:scale-105 active:scale-95
            "
        >
            <Phone size={18} />
            <span className="text-sm font-medium">Ligar agora</span>
        </a>

        </div>

        {/* FORMULÁRIO DROPDOWN */}
        <div className="mt-6 w-full">
          <FormDropdown />
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16 w-full max-w-md">
        <h3 className="text-xl font-medium mb-6 text-center text-black">
          Dúvidas Frequentes
        </h3>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-4 cursor-pointer"
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <div className="flex justify-between items-center text-black">
                  <p className="font-medium">{faq.pergunta}</p>
                  <span>{isOpen ? "-" : "+"}</span>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 mt-2" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-accent-gray text-black">
                    {faq.resposta}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
