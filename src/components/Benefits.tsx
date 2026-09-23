import React from 'react';
import { Gem, Sparkles, ThermometerSnowflake, Gift, ShieldCheck } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Gem,
      title: 'Ingredientes de Origem Nobre',
      description: 'Chocolates belgas Callebaut de colheita sustentável, pistache puro de Bronte (Sicília), framboesas frescas e favas autênticas de baunilha Bourbon de Madagascar.',
      detail: 'Pureza absoluta sem gorduras hidrogenadas',
    },
    {
      icon: Sparkles,
      title: 'Pintura & Escultura Manual',
      description: 'Cada peça é lapidada individualmente no atelier. Aplicações manuais de manteiga de cacau com micropigmentos botânicos e toques refinados de ouro comestível 24k.',
      detail: 'Design exclusivo assinado por pâtissier',
    },
    {
      icon: Gift,
      title: 'Embalagens Haute Couture',
      description: 'Caixas rígidas de alta gramatura forradas em veludo especial, fitas de gorgurão francês e lacre em cera sinete. Uma apresentação inesquecível para presentear.',
      detail: 'Inclui cartão personalizado caligrafado',
    },
    {
      icon: ThermometerSnowflake,
      title: 'Logística com Clima Controlado',
      description: 'Frota e portadores dedicados equipados com bolsas isotérmicas mantidas estritamente entre 16°C e 18°C, preservando o brilho espelhado e a textura aveludada.',
      detail: 'Entrega pontual garantida em SP e região',
    },
  ];

  return (
    <section id="diferenciais" className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#E8DFC8]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#8C1D40]">
            Padrão de Excelência Maison
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1418] font-normal tracking-tight text-balance">
            Por que nossa confeitaria se tornou referência em celebrações memoráveis
          </h2>
          <p className="text-base text-[#5A4952] font-light leading-relaxed">
            Rejeitamos a produção industrial massificada. Cada criação é tratada como uma joia gastronômica efêmera, pensada para despertar todos os sentidos.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-[#FFFFFF] p-8 rounded-2xl border border-[#EBE3D5] hover:border-[#8C1D40]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#8C1D40] group-hover:bg-[#8C1D40] group-hover:text-white transition-colors duration-300 mb-6">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[#1E1418] mb-3 group-hover:text-[#8C1D40] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#5A4952] leading-relaxed mb-6 font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2ECE1] text-xs font-medium text-[#8C1D40] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C98A2C]" />
                  <span>{item.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
