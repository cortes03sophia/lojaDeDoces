import React from 'react';
import { ArrowUpRight, Sparkles, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import heroImg from '../assets/images/hero_confectionery_table_1790205695899.jpg';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onOpenConsultation }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] pt-8 pb-20 md:pt-16 md:pb-28">
      {/* Subtle textured radial backdrop glow */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#F5E6D3]/60 via-[#F7D8DF]/30 to-transparent blur-3xl pointer-events-none -z-0" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Subtitle / Trust Kicker */}
        <div className="flex items-center gap-3 text-xs md:text-sm font-medium tracking-widest uppercase text-[#8C1D40] mb-4">
          <span>Haute Pâtisserie & Chocolaterie</span>
          <span aria-hidden="true">·</span>
          <span>São Paulo, Jardins</span>
          <span aria-hidden="true">·</span>
          <span>Desde 2018</span>
        </div>

        {/* Grid: High-impact typography + Hero Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Column Left: Text & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.08] text-[#1E1418] font-normal tracking-tight text-balance">
              A escultura da <span className="italic font-serif text-[#8C1D40]">alta confeitaria</span> em sabores inesquecíveis.
            </h1>

            <p className="text-base sm:text-lg text-[#5A4952] max-w-xl leading-relaxed font-light">
              Bombons lapidados como gemas preciosas, macarons de textura perfeita e bolos contemporâneos desenhados sob medida para os momentos mais singulares da sua vida.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold tracking-wide text-white bg-[#1E1418] hover:bg-[#8C1D40] transition-colors rounded-full shadow-md hover:shadow-lg active:scale-95 group"
              >
                <span>Explorar Coleção</span>
                <ArrowUpRight className="w-4 h-4 text-[#E8C587] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide text-[#1E1418] bg-transparent hover:bg-[#F0E6D8] border border-[#D5C2AF] rounded-full transition-colors active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#8C1D40]" />
                <span>Encomenda Sob Medida</span>
              </button>
            </div>

            {/* Quiet Trust Proof Bar */}
            <div className="pt-8 border-t border-[#E8DFC8]/70 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1418] tabular-nums">
                  100%
                </div>
                <div className="text-xs text-[#6F5B66] mt-0.5 font-medium">
                  Cacau Nobre & Favas Puras
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1418] tabular-nums">
                  48h
                </div>
                <div className="text-xs text-[#6F5B66] mt-0.5 font-medium">
                  Produção Fresca Sob Pedido
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1418] tabular-nums">
                  +1.8k
                </div>
                <div className="text-xs text-[#6F5B66] mt-0.5 font-medium">
                  Casamentos & Celebrações
                </div>
              </div>
            </div>
          </div>

          {/* Column Right: Focal Image Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer frame styling */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E5DAC6] bg-[#1E1418]">
                <img
                  src={heroImg}
                  alt="Mesa de doces artesanais finos da Maison Velouté com bombons lapidados e macarons"
                  className="w-full h-[400px] sm:h-[480px] lg:h-[530px] object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Subtle scrim gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1418]/80 via-transparent to-transparent pointer-events-none" />

                {/* Caption overlay */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-xs uppercase tracking-widest text-[#E8C587] font-semibold mb-1">
                    Criação Exclusiva da Temporada
                  </div>
                  <div className="font-serif text-xl sm:text-2xl text-white">
                    Grande Banquete Haute Sucrerie
                  </div>
                </div>
              </div>

              {/* Floating seal pill */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-[#E8DFC8] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#8C1D40]">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#1E1418] uppercase tracking-wide">
                    Prêmio Gastronomia 2025
                  </div>
                  <div className="text-[11px] text-[#6F5B66]">
                    Melhor Chocolateria Fina SP
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
