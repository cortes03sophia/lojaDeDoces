import React from 'react';
import chefImg from '../assets/images/atelier_pastry_chef_1790205748463.jpg';
import { Clock, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Curadoria de Sabores & Proposta',
      description: 'Você escolhe os doces da nossa coleção ou nos conta a identidade do seu evento. Auxiliamos na harmonização de paletas de cores, perfis aromáticos e cálculo exato de porções.',
    },
    {
      step: '02',
      title: 'Escultura & Produção Sob Demanda',
      description: 'Nossa brigada de pâtisserie inicia a confecção fresca nas 48h que antecedem o evento. Cada casquinha de bombom é polida, cada recheio emulsificado em temperatura cirúrgica e cada detalhe dourado aplicado à mão.',
    },
    {
      step: '03',
      title: 'Acondicionamento de Alta Costura',
      description: 'Os doces são dispostos em berços protetores individuais, lacrados em caixas rígidas seladas e envoltos em isolamento térmico premium que preserva brilho, crocância e aromas florais.',
    },
    {
      step: '04',
      title: 'Entrega Pontual em Clima Controlado',
      description: 'Nossos portadores especializados realizam o transporte em veículos climatizados (16°C a 18°C), garantindo que sua encomenda chegue impecável diretamente ao local da celebração ou à sua mesa.',
    },
  ];

  return (
    <section id="processo" className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#E8DFC8]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image showcase with story */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFC8]">
              <img
                src={chefImg}
                alt="Chef pâtissier da Maison Velouté aplicando pétalas botânicas e ouro em sobremesa de alta precisão"
                className="w-full h-[460px] sm:h-[540px] object-cover object-center"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1418]/85 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="text-xs uppercase tracking-widest text-[#E8C587] font-semibold">
                  O Segredo da Consistência
                </div>
                <div className="font-serif text-2xl text-white">
                  "A confeitaria fina é a matemática exata a serviço da pura poesia."
                </div>
                <div className="text-xs text-[#E8DFC8] pt-1 font-light">
                  Chef Executivo Pierre Laurent & Equipe Maison Velouté
                </div>
              </div>
            </div>

            {/* Small floating badge */}
            <div className="absolute -top-4 -right-4 sm:-right-6 bg-white p-4 rounded-2xl shadow-lg border border-[#E8DFC8] hidden sm:flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#8C1D40]" />
              <div className="text-xs">
                <div className="font-bold text-[#1E1418]">Zero Conservantes</div>
                <div className="text-[#6F5B66]">Cacau 100% Rastreável</div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Editorial Steps */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-semibold tracking-widest uppercase text-[#8C1D40]">
                Do Atelier à Sua Mesa
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1418] font-normal tracking-tight text-balance">
                Como Funciona a Experiência Maison Velouté
              </h2>
              <p className="text-base text-[#5A4952] font-light leading-relaxed">
                Desenvolvemos uma jornada transparente e precisa para que você receba obras de confeitaria em perfeitas condições organolépticas.
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#EBE3D5] hover:border-[#8C1D40]/30 transition-colors shadow-xs"
                >
                  <div className="font-serif text-2xl font-bold text-[#8C1D40] tabular-nums shrink-0 w-10">
                    {item.step}.
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#1E1418]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A4952] font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
