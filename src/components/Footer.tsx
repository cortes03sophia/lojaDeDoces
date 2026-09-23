import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-[#150D11] text-[#E8DFC8] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif text-3xl text-white tracking-wide block">
              Maison Velouté
            </span>
            <p className="text-xs sm:text-sm text-[#C4B7BF] font-light leading-relaxed max-w-sm">
              Confeitaria de alta precisão e chocolateria artesanal. Dedicada a transformar celebrações singulares em experiências sensoriais marcantes com cacau nobre e estética contemporânea.
            </p>

            <div className="pt-2 text-xs text-[#E8C587] font-medium tracking-wide">
              Membro da Associação Brasileira de Alta Confeitaria Artesanal
            </div>
          </div>

          {/* Location & Atelier Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm text-[#C4B7BF]">
            <div className="font-serif text-base text-white font-semibold uppercase tracking-wider mb-2">
              Atelier & Showroom
            </div>
            
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#E8C587] shrink-0 mt-0.5" />
              <span>Rua Oscar Freire, 1420 — Jardins, São Paulo / SP</span>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#E8C587] shrink-0 mt-0.5" />
              <span>
                Terça a Sábado: 10h às 19h<br />
                Domingos e Feriados: 11h às 17h
              </span>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <Phone className="w-4 h-4 text-[#E8C587] shrink-0" />
              <span>(11) 99999-8888</span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-2 text-xs sm:text-sm text-[#C4B7BF]">
            <div className="font-serif text-base text-white font-semibold uppercase tracking-wider mb-2">
              Navegação
            </div>
            <ul className="space-y-2">
              <li><a href="#colecao" className="hover:text-white transition-colors">Coleção de Doces</a></li>
              <li><a href="#diferenciais" className="hover:text-white transition-colors">Diferenciais Pâtissier</a></li>
              <li><a href="#processo" className="hover:text-white transition-colors">Como Funciona</a></li>
              <li><a href="#atelier-ia" className="hover:text-white transition-colors">Atelier Criativo IA</a></li>
              <li><a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a></li>
            </ul>
          </div>

          {/* Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-serif text-base text-white font-semibold uppercase tracking-wider mb-2">
              Carta do Atelier
            </div>
            <p className="text-xs text-[#C4B7BF] font-light leading-relaxed">
              Receba convites para lançamentos sazonais de Páscoa, Natal e coleções limitadas de bombons raros.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-[#8C7B83] focus:outline-none focus:border-[#E8C587]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#8C1D40] hover:bg-[#a6254e] text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Inscrito com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <span>Receber Novidades</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7B83] gap-4">
          <div>
            © {new Date().getFullYear()} Maison Velouté Confeitaria Fina Ltda. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Termos de Encomenda</span>
            <span className="hover:text-white transition-colors cursor-pointer">Política de Privacidade</span>
            <span className="hover:text-white transition-colors cursor-pointer">Guia de Alérgenos</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
