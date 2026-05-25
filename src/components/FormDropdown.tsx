"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FormDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
  });
  const [touched, setTouched] = useState({
    nome: false,
    email: false,
    telefone: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Validações
  const validateNome = (nome: string) => {
    const temNumeros = /\d/.test(nome);
    const temTamanho = nome.trim().length >= 3;
    return temTamanho && !temNumeros;
  };
  
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const validateTelefone = (telefone: string) => {
    const temLetras = /[a-zA-Z]/.test(telefone);
    const digitos = telefone.replace(/\D/g, "");
    return digitos.length >= 10 && !temLetras;
  };

  const isFormValid =
    validateNome(formData.nome) &&
    validateEmail(formData.email) &&
    validateTelefone(formData.telefone);

  const formatTelefone = (telefone: string) => {
    // Remove tudo que não é número
    const digitos = telefone.replace(/\D/g, "");
    
    // Limita a 11 dígitos
    const limitado = digitos.slice(0, 11);
    
    if (limitado.length === 0) return "";
    if (limitado.length <= 2) return limitado;
    if (limitado.length <= 6) return `(${limitado.slice(0, 2)}) ${limitado.slice(2)}`;
    if (limitado.length <= 10) return `(${limitado.slice(0, 2)}) ${limitado.slice(2, 6)}-${limitado.slice(6)}`;
    return `(${limitado.slice(0, 2)}) ${limitado.slice(2, 7)}-${limitado.slice(7)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let novoValor = value;
    if (name === "telefone") {
      novoValor = formatTelefone(value);
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: novoValor,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar formulário");
      }

      console.log("Resposta da API:", data);
      
      setSubmitMessage("✓ Obrigado! Entraremos em contato em breve.");
      setFormData({ nome: "", email: "", telefone: "" });
      setTimeout(() => {
        setSubmitMessage("");
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      let errorMessage = "Erro ao enviar";
      
      if (error instanceof Error) {
        if (error.message.includes("Unique constraint failed on the fields: (`email`)")) {
          errorMessage = "Este email já foi cadastrado";
        } else {
          errorMessage = error.message;
        }
      }
      
      console.error("Erro:", errorMessage);
      setSubmitMessage(`✗ ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full
          flex items-center justify-center gap-2
          bg-purple-600 text-white
          px-4 py-3 rounded-full
          shadow-md
          transition-all duration-300
          hover:scale-105 active:scale-95
          font-medium
        "
      >
        <span>Formulário de Contato</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-96 mt-3" : "max-h-0"}
        `}
      >
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`
                  w-full
                  px-4 py-2
                  border-2
                  rounded-lg
                  text-gray-700
                  placeholder-gray-400
                  focus:outline-none
                  transition-all duration-200
                  ${
                    touched.nome
                      ? validateNome(formData.nome)
                        ? "border-green-500 focus:ring-2 focus:ring-green-400"
                        : "border-red-500 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:ring-2 focus:ring-accent-mint"
                  }
                `}
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`
                  w-full
                  px-4 py-2
                  border-2
                  rounded-lg
                  text-gray-700
                  placeholder-gray-400
                  focus:outline-none
                  transition-all duration-200
                  ${
                    touched.email
                      ? validateEmail(formData.email)
                        ? "border-green-500 focus:ring-2 focus:ring-green-400"
                        : "border-red-500 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:ring-2 focus:ring-accent-mint"
                  }
                `}
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="telefone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Telefone
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`
                  w-full
                  px-4 py-2
                  border-2
                  rounded-lg
                  text-gray-700
                  placeholder-gray-400
                  focus:outline-none
                  transition-all duration-200
                  ${
                    touched.telefone
                      ? validateTelefone(formData.telefone)
                        ? "border-green-500 focus:ring-2 focus:ring-green-400"
                        : "border-red-500 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:ring-2 focus:ring-accent-mint"
                  }
                `}
                placeholder="(16) 9 1234-5678"
              />
            </div>

            {submitMessage && (
              <div
                className={`text-sm text-center py-2 rounded-lg ${
                  submitMessage.includes("✓")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {submitMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={`
                w-full
                px-4 py-2 rounded-lg
                font-medium
                transition-all duration-300
                ${
                  isFormValid
                    ? "bg-green-600 text-white hover:scale-105 active:scale-95 hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
