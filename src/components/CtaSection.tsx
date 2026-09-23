import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2, Calendar, Phone, User, MessageSquare } from 'lucide-react';

interface CtaSectionProps {
  initialPrompt?: string;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ initialPrompt = '' }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Casamento');
  const [eventDate, setEventDate] = useState('');
  const [details, setDetails] = useState(initialPrompt);
  const [submitted, setSubmitted] = useState(false);

  // Synchronize when initialPrompt changes (e.g. from AI Studio section)
  React.useEffect(() => {
    if (initialPrompt) {
      setDetails(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitted(true);

    // Also build formatted WhatsApp message link
    const textMsg = encodeURIComponent(
      `Olá Atelier Maison Velouté! Gostaria de um orçamento:\n\n*Nome:* ${name}\n*Contato:* ${phone}\n*Evento:* ${eventType}\n*Data:* ${eventDate || 'A definir'}\n*Detalhes:* ${details || 'Gostaria de ver o catálogo de casamentos'}`
    );

    // Option to open WhatsApp after 1 second
    setTimeout(() => {
      window.open(`https://wa.me/5511999998888?text=${textMsg}`, '_blank');
    }, 800);
  };

  return (
    <section id="encomenda" className="py-20 md:py-28 bg-[#1E1418] text-[#FAF7F2] relative overflow-hidden">
      
      {/* Subtle background ambient lighting */}
      <div 
        className="absolute -top-24 -left-24 w-96 h-96 bg-[#8C1D40]/30 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#E8C587]/15 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Call to Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E8C587]">
              <Sparkles className="w-4 h-4" />
              <span>Consultoria Exclusiva Sob Medida</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight text-balance leading-tight">
              Transforme sua celebração em um <span className="italic font-serif text-[#E8C587]">banquete de arte</span>.
            </h2>

            <p className="text-base text-[#E8DFC8]/80 font-light leading-relaxed max-w-lg">
              Agende uma degustação de sabores para o seu casamento ou solicite um orçamento sob medida para o seu evento. Nossa equipe de pâtissiers entrará em contato para cuidar de cada detalhe.
            </p>

            <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-[#E8DFC8]/70">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#E8C587] shrink-0" />
                <span>Atendimento personalizado para noivos e assessores</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#E8C587] shrink-0" />
                <span>Entrega com hora marcada e equipe de montagem no local</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#E8C587] shrink-0" />
                <span>Opções de personalização visual com identidade da marca ou monograma</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-6">
            <div className="bg-[#FAF7F2] text-[#1E1418] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#E8DFC8]">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FAF0E6] text-[#8C1D40] flex items-center justify-center mx-auto border border-[#E8DFC8]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1E1418]">
                    Solicitação Recebida com Sucesso!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A4952] max-w-sm mx-auto leading-relaxed">
                    Nossa concierge gastronômica já está revisando sua data. Você também será redirecionado para o WhatsApp oficial para atendimento imediato.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1E1418] text-white hover:bg-[#8C1D40] transition-colors"
                  >
                    Enviar Outra Mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1 mb-2">
                    <h3 className="font-serif text-2xl font-bold text-[#1E1418]">
                      Solicitar Orçamento / Degustação
                    </h3>
                    <p className="text-xs text-[#6F5B66]">
                      Preencha os campos abaixo. Retornamos em menos de 2 horas úteis.
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1E1418] uppercase tracking-wider mb-1">
                      Seu Nome Completo
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8C7B83] absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Dra. Camila Siqueira"
                        className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-[#D5C2AF] bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1D40]"
                      />
                    </div>
                  </div>

                  {/* Phone & Event Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1E1418] uppercase tracking-wider mb-1">
                        WhatsApp / Telefone
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#8C7B83] absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-[#D5C2AF] bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1D40]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#1E1418] uppercase tracking-wider mb-1">
                        Tipo de Ocasião
                      </label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-[#D5C2AF] bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1D40]"
                      >
                        <option value="Casamento">Casamento / Noivado</option>
                        <option value="Aniversario">Aniversário de Gala</option>
                        <option value="Corporativo">Evento Corporativo</option>
                        <option value="Maternidade">Maternidade / Batizado</option>
                        <option value="Presente">Presente de Alto Padrão</option>
                      </select>
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1E1418] uppercase tracking-wider mb-1">
                      Data Prevista do Evento
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#8C7B83] absolute left-3.5 top-3.5" />
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-[#D5C2AF] bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1D40]"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1E1418] uppercase tracking-wider mb-1">
                      Detalhes do Pedido ou Conceito Desejado
                    </label>
                    <div className="relative">
                      <textarea
                        rows={3}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Ex: Quantidade de convidados, sabores preferidos ou referência que gerou no Atelier IA..."
                        className="w-full text-xs p-3 rounded-xl border border-[#D5C2AF] bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1D40]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#8C1D40] hover:bg-[#6e1531] text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4 text-[#E8C587]" />
                    <span>Enviar Solicitação de Orçamento</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
