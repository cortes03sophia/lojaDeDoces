import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles, PhoneCall } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFC8]/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a 
            href="#" 
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C1D40]"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-wide text-[#1E1418] group-hover:text-[#8C1D40] transition-colors">
              Maison Velouté
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide text-[#4A3B43]">
            <a href="#colecao" className="hover:text-[#8C1D40] transition-colors">
              Coleção
            </a>
            <a href="#diferenciais" className="hover:text-[#8C1D40] transition-colors">
              Diferenciais
            </a>
            <a href="#processo" className="hover:text-[#8C1D40] transition-colors">
              Como Funciona
            </a>
            <a href="#atelier-ia" className="hover:text-[#8C1D40] transition-colors flex items-center gap-1.5 text-[#8C1D40] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C98A2C]" />
              Atelier IA
            </a>
            <a href="#depoimentos" className="hover:text-[#8C1D40] transition-colors">
              Depoimentos
            </a>
            <a href="#faq" className="hover:text-[#8C1D40] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full text-[#1E1418] hover:text-[#8C1D40] hover:bg-[#F3EBDD] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C1D40]"
              aria-label={`Ver sacola de encomendas com ${cartCount} itens`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8C1D40] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-sm animate-scale">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1E1418] hover:bg-[#8C1D40] transition-all rounded-full shadow-sm hover:shadow active:scale-95 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C1D40]"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Fazer Encomenda</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1E1418] hover:text-[#8C1D40] focus:outline-none"
              aria-label="Abrir menu de navegação"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DFC8] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#4A3B43]">
            <a
              href="#colecao"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#8C1D40] transition-colors"
            >
              Coleção de Doces
            </a>
            <a
              href="#diferenciais"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#8C1D40] transition-colors"
            >
              Nossos Diferenciais
            </a>
            <a
              href="#processo"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#8C1D40] transition-colors"
            >
              Como Funciona
            </a>
            <a
              href="#atelier-ia"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#8C1D40] font-semibold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C98A2C]" />
              Atelier Criativo IA
            </a>
            <a
              href="#depoimentos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#8C1D40] transition-colors"
            >
              Depoimentos de Clientes
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#8C1D40] transition-colors"
            >
              Perguntas Frequentes
            </a>
          </nav>

          <div className="pt-4 border-t border-[#E8DFC8]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold tracking-wider uppercase text-white bg-[#8C1D40] hover:bg-[#6e1531] rounded-full shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Fazer Encomenda Personalizada</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
