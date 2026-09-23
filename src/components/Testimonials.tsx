import React from 'react';
import { TESTIMONIALS } from '../data/reviews';
import { Star, Quote, Award } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#E8DFC8]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#8C1D40]">
            Vozes de Quem Já Celebrou Conosco
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1418] font-normal tracking-tight text-balance">
            Momentos Inesquecíveis em Cada Detalhe
          </h2>
          <p className="text-base text-[#5A4952] font-light leading-relaxed">
            Mais de 1.800 eventos atendidos com precisão, discrição e a mais alta nota de satisfação gastronômica.
          </p>
        </div>

        {/* Testimonials 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-3xl border border-[#EBE3D5] shadow-xs flex flex-col justify-between hover:border-[#8C1D40]/30 hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#C98A2C]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="font-serif text-lg text-[#1E1418] italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#F2ECE1] mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF0E6] text-[#8C1D40] font-bold text-xs flex items-center justify-center border border-[#E8DFC8]">
                  {item.avatarText}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1E1418]">
                    {item.author}
                  </div>
                  <div className="text-xs text-[#6F5B66]">
                    {item.role} · <span className="text-[#8C1D40] font-medium">{item.event}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Event Venues / Press logos quiet bar */}
        <div className="mt-16 pt-10 border-t border-[#E8DFC8]/60 text-center">
          <div className="text-xs uppercase tracking-widest text-[#8C7B83] font-medium mb-6">
            Presença nos Espaços Mais Exclusivos do País
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-sm font-serif text-[#6F5B66] opacity-75">
            <span>Palácio Tangará</span>
            <span>Casa Fasano</span>
            <span>Villa Bisutti</span>
            <span>Hípica Paulista</span>
            <span>Hotel Unique</span>
          </div>
        </div>

      </div>
    </section>
  );
};
