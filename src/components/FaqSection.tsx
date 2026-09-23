import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/faq';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FFFFFF] border-t border-[#E8DFC8]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#8C1D40]">
            Tire Suas Dúvidas
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1418] font-normal tracking-tight text-balance">
            Perguntas Frequentes
          </h2>
          <p className="text-base text-[#5A4952] font-light leading-relaxed">
            Detalhes sobre conservação, entregas especiais, pedidos corporativos e degustações.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-[#EBE3D5] bg-[#FAF7F2] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C1D40]"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl font-semibold text-[#1E1418]">
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-white border border-[#E8DFC8] text-[#8C1D40] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#8C1D40] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#5A4952] font-light leading-relaxed border-t border-[#EBE3D5]/60">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra contact helper */}
        <div className="mt-12 text-center text-xs text-[#6F5B66]">
          Não encontrou o que precisava? Fale diretamente com nossa concierge pelo WhatsApp:{' '}
          <a
            href="https://wa.me/5511999998888?text=Olá,%20gostaria%20de%20tirar%20uma%20dúvida%20sobre%20as%20encomendas%20Maison%20Velouté"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8C1D40] font-semibold underline hover:text-[#1E1418] transition-colors"
          >
            (11) 99999-8888
          </a>
        </div>

      </div>
    </section>
  );
};
