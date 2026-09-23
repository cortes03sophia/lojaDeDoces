import React, { useState } from 'react';
import { Product } from '../types';
import { X, Plus, Minus, ShoppingBag, ShieldAlert, Sparkles, Check } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, notes?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [customNotes, setCustomNotes] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, customNotes.trim() ? customNotes : undefined);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FAF7F2] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E8DFC8] flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#1E1418] hover:text-[#8C1D40] transition-colors shadow-sm focus:outline-none"
          aria-label="Fechar detalhes do produto"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image */}
        <div className="md:w-1/2 relative bg-[#1E1418] min-h-[260px] md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E8C587]">
              {product.dietary}
            </span>
            <div className="font-serif text-lg text-white font-medium">
              {product.unit}
            </div>
          </div>
        </div>

        {/* Right Column: Details & Order Controls */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-6 text-[#1E1418]">
          
          <div>
            <div className="text-xs uppercase tracking-widest text-[#8C1D40] font-semibold mb-1">
              Atelier Maison Velouté
            </div>
            <h3 id="product-modal-title" className="font-serif text-2xl sm:text-3xl font-semibold leading-tight">
              {product.name}
            </h3>
            <p className="text-sm text-[#5A4952] font-light mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Tasting Notes */}
          <div className="space-y-1.5 pt-3 border-t border-[#E8DFC8]">
            <div className="text-xs font-semibold text-[#1E1418] uppercase tracking-wider">
              Notas Sensoriais
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#5A4952]">
              {product.tastingNotes.map((note, idx) => (
                <React.Fragment key={idx}>
                  <span className="font-medium">{note}</span>
                  {idx < product.tastingNotes.length - 1 && <span aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Ingredients & Allergens */}
          <div className="space-y-2 text-xs text-[#6F5B66] bg-white p-4 rounded-xl border border-[#EBE3D5]">
            <div>
              <span className="font-semibold text-[#1E1418]">Ingredientes Nobres: </span>
              {product.ingredients.join(', ')}.
            </div>
            <div className="flex items-start gap-1.5 text-[#8C1D40] pt-1">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{product.allergens.join(' · ')}</span>
            </div>
          </div>

          {/* Custom dedication / note */}
          <div>
            <label className="block text-xs font-semibold text-[#1E1418] uppercase tracking-wider mb-1.5">
              Instruções de Personalização / Cartão de Mensagem (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ex: Mensagem para o cartão ou detalhes do evento..."
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#D5C2AF] bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1D40]"
            />
          </div>

          {/* Price & Quantity Actions */}
          <div className="pt-4 border-t border-[#E8DFC8] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#8C7B83] font-medium">
                  Subtotal
                </div>
                <div className="font-serif text-2xl font-bold text-[#1E1418] tabular-nums">
                  R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3 bg-white border border-[#D5C2AF] rounded-full p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#1E1418] hover:bg-[#FAF7F2] active:scale-95 transition-all"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-semibold tabular-nums min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#1E1418] hover:bg-[#FAF7F2] active:scale-95 transition-all"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                addedSuccess
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-[#1E1418] hover:bg-[#8C1D40] text-white active:scale-98'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Adicionado à Sacola!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#E8C587]" />
                  <span>Adicionar à Sacola de Encomendas</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
