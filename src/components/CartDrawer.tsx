import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [deliveryDate, setDeliveryDate] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 300;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    let message = `*NOVA ENCOMENDA - MAISON VELOUTÉ*\n`;
    if (recipientName) message += `*Cliente:* ${recipientName}\n`;
    if (deliveryDate) message += `*Data Desejada:* ${deliveryDate}\n`;
    if (deliveryAddress) message += `*Endereço:* ${deliveryAddress}\n\n`;

    message += `*ITENS DA SACOLA:*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.quantity}x ${item.product.name} (R$ ${item.product.price.toFixed(2)})\n`;
      if (item.customNotes) message += `   _Obs: ${item.customNotes}_\n`;
    });

    message += `\n*Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    message += `_Gostaria de confirmar a disponibilidade e os detalhes de pagamento._`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5511999998888?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#E8DFC8] animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8DFC8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8C1D40]" />
            <h2 id="cart-drawer-title" className="font-serif text-xl font-bold text-[#1E1418]">
              Sacola de Encomendas
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#FAF7F2] text-[#1E1418] hover:text-[#8C1D40] transition-colors"
            aria-label="Fechar sacola"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="bg-[#FAF0E6] px-6 py-2.5 text-xs text-[#8C1D40] border-b border-[#E8DFC8] font-medium flex items-center justify-between">
          <span>
            {remainingForFreeShipping > 0 ? (
              <>Faltam <strong>R$ {remainingForFreeShipping.toFixed(2).replace('.', ',')}</strong> para frete cortesia em SP</>
            ) : (
              <span className="flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#C98A2C]" />
                Parabéns! Sua entrega em SP Capital é cortesia
              </span>
            )}
          </span>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-20 text-center text-[#6F5B66] space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#D5C2AF] mx-auto" />
              <p className="font-serif text-lg text-[#1E1418]">Sua sacola está vazia</p>
              <p className="text-xs max-w-xs mx-auto">
                Explore nossa coleção de doces artesanais e adicione suas criações favoritas.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-4 rounded-2xl border border-[#EBE3D5] flex gap-3 items-center justify-between shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-sm font-semibold text-[#1E1418] truncate">
                      {item.product.name}
                    </h3>
                    <div className="text-[11px] text-[#6F5B66]">
                      {item.product.unit}
                    </div>
                    <div className="text-xs font-bold text-[#8C1D40] tabular-nums mt-1">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                    </div>
                    {item.customNotes && (
                      <div className="text-[10px] text-[#8C7B83] italic truncate">
                        "{item.customNotes}"
                      </div>
                    )}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#8C7B83] hover:text-[#8C1D40] p-1 transition-colors"
                      title="Remover doce"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#D5C2AF] rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#1E1418] hover:bg-white rounded text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold tabular-nums px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#1E1418] hover:bg-white rounded text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Delivery Details when items present */}
          {items.length > 0 && (
            <div className="pt-4 border-t border-[#E8DFC8] space-y-3">
              <div className="text-xs font-semibold text-[#1E1418] uppercase tracking-wider">
                Dados Para Agendamento
              </div>
              
              <input
                type="text"
                placeholder="Seu nome completo"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D5C2AF] bg-white focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-[#6F5B66] mb-1 font-medium">Data Desejada:</label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#D5C2AF] bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#6F5B66] mb-1 font-medium">Bairro / Região (SP):</label>
                  <input
                    type="text"
                    placeholder="Ex: Jardins, Pinheiros"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#D5C2AF] bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#E8DFC8] bg-white space-y-4">
            <div className="space-y-1.5 text-xs text-[#6F5B66]">
              <div className="flex justify-between">
                <span>Subtotal dos doces</span>
                <span className="font-semibold text-[#1E1418] tabular-nums">
                  R$ {subtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Embalagem isotérmica de luxo</span>
                <span className="text-[#2E7D32] font-semibold">Inclusa</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#F2ECE1] text-sm font-bold text-[#1E1418]">
                <span>Total Estimado</span>
                <span className="font-serif text-xl text-[#8C1D40] tabular-nums">
                  R$ {subtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1E1418] hover:bg-[#8C1D40] text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#E8C587]" />
              <span>Finalizar Encomenda no WhatsApp</span>
            </button>

            <button
              onClick={onClearCart}
              className="w-full text-center text-[11px] text-[#8C7B83] hover:text-[#8C1D40] transition-colors"
            >
              Esvaziar sacola
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
