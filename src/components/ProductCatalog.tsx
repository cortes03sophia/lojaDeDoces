import React, { useState } from 'react';
import { Product, Category } from '../types';
import { Eye, Plus, Check, Sparkles } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('todos');
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories: { label: string; value: Category }[] = [
    { label: 'Todos os Doces', value: 'todos' },
    { label: 'Bombons Lapidados', value: 'bombons' },
    { label: 'Macarons Parisienses', value: 'macarons' },
    { label: 'Bolos Esculpidos', value: 'bolos' },
    { label: 'Trufas & Banquete', value: 'trufas' },
  ];

  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="colecao" className="py-20 md:py-28 bg-[#FFFFFF] border-t border-[#E8DFC8]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Filter bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#8C1D40]">
              Coleção de Assinatura
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1418] font-normal tracking-tight">
              Nossas Obras em Confeitaria
            </h2>
            <p className="text-sm sm:text-base text-[#6F5B66] font-light max-w-xl">
              Cada item é produzido sob encomenda com rigor técnico francês e ingredientes puros. Escolha uma das nossas criações ou solicite um projeto exclusivo.
            </p>
          </div>

          {/* Filter Tabs (Interactive Segmented Control) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#FAF7F2] rounded-xl border border-[#EBE3D5] overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-2 text-xs font-semibold tracking-wide rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-[#1E1418] text-white shadow-sm'
                    : 'text-[#6F5B66] hover:text-[#1E1418] hover:bg-[#F2ECE1]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isJustAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group cursor-pointer bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#EAE2D3] hover:border-[#8C1D40]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Image Slot */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#2D1B22]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Badges / Text Markers */}
                  {product.isBestseller && (
                    <div className="absolute top-3 left-3 bg-[#FAF7F2] text-[#8C1D40] text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm border border-[#E8DFC8]">
                      Favorito do Atelier
                    </div>
                  )}

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-[#1E1418] flex items-center justify-center shadow-md">
                      <Eye className="w-4 h-4 text-[#8C1D40]" />
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[11px] text-[#E8C587] font-medium tracking-wide">
                      {product.dietary}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#8C1D40] font-semibold mb-1">
                      {product.unit}
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#1E1418] font-semibold group-hover:text-[#8C1D40] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A4952] font-light line-clamp-2 mt-2 leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Tasting notes text separators */}
                  <div className="text-[11px] text-[#8C7B83] flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#EAE2D3]">
                    {product.tastingNotes.map((note, idx) => (
                      <React.Fragment key={idx}>
                        <span>{note}</span>
                        {idx < product.tastingNotes.length - 1 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Price & Add to Cart button */}
                  <div className="pt-3 border-t border-[#EAE2D3] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#8C7B83] font-semibold">
                        Valor
                      </div>
                      <div className="font-serif text-xl font-bold text-[#1E1418] tabular-nums">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                        isJustAdded
                          ? 'bg-[#2E7D32] text-white'
                          : 'bg-[#1E1418] hover:bg-[#8C1D40] text-white hover:shadow-md active:scale-95'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Adicionado!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Adicionar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Custom Order Callout Bar */}
        <div className="mt-16 p-8 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-xl sm:text-2xl text-[#1E1418] font-semibold flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-[#8C1D40]" />
              Deseja um projeto de sobremesas personalizado?
            </h4>
            <p className="text-sm text-[#6F5B66] font-light">
              Desenhamos torres de macarons gigantes, bolos monumentais de casamento e mesas de doces temáticas para até 800 convidados.
            </p>
          </div>

          <a
            href="#atelier-ia"
            className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#8C1D40] hover:bg-[#6e1531] rounded-full transition-colors whitespace-nowrap shadow-sm"
          >
            Experimentar Atelier IA
          </a>
        </div>

      </div>
    </section>
  );
};
