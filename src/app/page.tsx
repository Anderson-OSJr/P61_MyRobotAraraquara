import Image from "next/image";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import Carousel from "@/components/Carousel";
import Professores from "@/components/Professores";// só um comentário para um novo commit
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">

      {/* MOBILE: snap | DESKTOP: scroll livre */}
      <div className="
        h-screen overflow-y-scroll snap-y snap-mandatory
        md:h-auto md:overflow-visible md:snap-none
      ">

        <section id="Hero" className="min-h-screen snap-start md:snap-none">
          <Hero />
        </section>
        <div className="md:h-16 bg-secondary" />
        <section id="Sobre" className="min-h-screen snap-start md:snap-none">
          <Sobre />
        </section>
        <div className="md:h-16 bg-white" />
        <section id="Cursos" className="min-h-screen snap-start md:snap-none">
          <Carousel />
        </section>
        <div className="md:h-16 bg-white" />
        <section id="Professores" className="min-h-screen snap-start md:snap-none">
          <Professores />
        </section>

        <section id="Contato" className="min-h-screen snap-start md:snap-none">
          <Contato />
        </section>

        <section className="snap-start md:snap-none">
          <Footer />
        </section>

      </div>

      {/* BOTÃO WHATSAPP */}
      <a
        href="https://wa.me/1633316703?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20cursos%20de%20rob%C3%B3tica%20educacional."
        target="_blank"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition"
      >
        <Image src="/images/ZapLogo.svg" alt="WhatsApp" width={20} height={20} />
      </a>

    </main>
  );
}