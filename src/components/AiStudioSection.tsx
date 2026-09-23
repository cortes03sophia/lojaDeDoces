import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  Wand2, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  Search, 
  Download, 
  SendHorizontal,
  Layers,
  ChefHat
} from 'lucide-react';
import { PastryAnalysisResult } from '../types';

interface AiStudioSectionProps {
  onQuoteFromConcept: (conceptText: string, imageUrl?: string) => void;
}

export const AiStudioSection: React.FC<AiStudioSectionProps> = ({ onQuoteFromConcept }) => {
  const [activeTab, setActiveTab] = useState<'create' | 'analyze'>('create');

  // Tab 1 State: Create & Edit
  const [createPrompt, setCreatePrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '4:3' | '16:9'>('1:1');
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [sourceMime, setSourceMime] = useState<string>('image/jpeg');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generationNotes, setGenerationNotes] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Tab 2 State: Analyze with Gemini 3.1 Pro
  const [analyzeImage, setAnalyzeImage] = useState<string | null>(null);
  const [analyzeMime, setAnalyzeMime] = useState<string>('image/jpeg');
  const [customQuestion, setCustomQuestion] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PastryAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  // Preset inspiration prompts
  const presets = [
    'Bolo de casamento contemporâneo com 3 andares em veludo champanhe, escultura de flores botânicas e macarons de lavanda',
    'Coleção de bombons lapidados com pintura espelhada verde esmeralda e folha de ouro 24k em bandeja de ardósia',
    'Torta moderna entremet com glaçagem rubi brilhante, dacquoise de pistache siciliano e framboesas frescas',
  ];

  // Handle Image Upload for Tab 1 (Optional reference/edit)
  const handleSourceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSourceMime(file.type || 'image/jpeg');
      const reader = new FileReader();
      reader.onload = () => {
        setSourceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Image Upload for Tab 2 (Analysis)
  const handleAnalyzeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAnalyzeMime(file.type || 'image/jpeg');
      const reader = new FileReader();
      reader.onload = () => {
        setAnalyzeImage(reader.result as string);
        setAnalysisResult(null);
        setAnalysisError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger Creation/Editing (calls server endpoint using gemini-3.1-flash-image)
  const handleGenerate = async () => {
    if (!createPrompt.trim()) return;

    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedImage(null);
    setGenerationNotes(null);

    try {
      const response = await fetch('/api/create-sweet-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: createPrompt,
          base64Image: sourceImage,
          mimeType: sourceMime,
          aspectRatio,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Falha na renderização.');
      }

      setGeneratedImage(data.imageUrl);
      setGenerationNotes(data.notes);
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || 'Não foi possível gerar a imagem no momento.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Trigger Analysis (calls server endpoint using gemini-3.1-pro-preview)
  const handleAnalyze = async () => {
    if (!analyzeImage) return;

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze-pastry-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base64Image: analyzeImage,
          mimeType: analyzeMime,
          customQuestion: customQuestion.trim() || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Falha na análise da imagem.');
      }

      setAnalysisResult(data.analysis);
    } catch (err: any) {
      console.error(err);
      setAnalysisError(err.message || 'Erro ao analisar a fotografia.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="atelier-ia" className="py-20 md:py-28 bg-[#FFFFFF] border-t border-[#E8DFC8]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C1D40] text-xs font-semibold uppercase tracking-wider border border-[#E8DFC8]">
            <Sparkles className="w-3.5 h-3.5 text-[#C98A2C]" />
            <span>Laboratório Digital Maison Velouté</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1418] font-normal tracking-tight text-balance">
            Atelier de Confeitaria Inteligente
          </h2>

          <p className="text-base text-[#5A4952] font-light leading-relaxed">
            Una a tradição da pâtisserie francesa à tecnologia de ponta: crie ou edite o conceito visual do seu doce dos sonhos com IA ou envie uma foto de referência para análise sensorial e orçamento imediato.
          </p>

          {/* Segmented Control Tabs */}
          <div className="inline-flex p-1.5 bg-[#FAF7F2] rounded-2xl border border-[#EBE3D5] mt-6">
            <button
              onClick={() => setActiveTab('create')}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'create'
                  ? 'bg-[#1E1418] text-white shadow-sm'
                  : 'text-[#6F5B66] hover:text-[#1E1418]'
              }`}
            >
              <Wand2 className="w-4 h-4 text-[#E8C587]" />
              <span>Criar & Editar Doces (Gemini Image)</span>
            </button>

            <button
              onClick={() => setActiveTab('analyze')}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'analyze'
                  ? 'bg-[#1E1418] text-white shadow-sm'
                  : 'text-[#6F5B66] hover:text-[#1E1418]'
              }`}
            >
              <ChefHat className="w-4 h-4 text-[#8C1D40]" />
              <span>Sommelier por Foto (Gemini Pro)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CREATE & EDIT SWEET DESIGNS */}
        {activeTab === 'create' && (
          <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-[#E8DFC8] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Controls */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-[#1E1418] uppercase tracking-wider mb-2">
                    Descreva o Doce ou Bolo Desejado
                  </label>
                  <textarea
                    rows={4}
                    value={createPrompt}
                    onChange={(e) => setCreatePrompt(e.target.value)}
                    placeholder="Ex: Bolo minimalista de casamento em formato orgânico, textura aveludada off-white, detalhes em folha de ouro 24k e acabamento com macarons de framboesa..."
                    className="w-full text-sm p-4 rounded-xl border border-[#D5C2AF] bg-white focus:outline-none focus:ring-2 focus:ring-[#8C1D40] text-[#1E1418] placeholder:text-[#9C8B95] leading-relaxed shadow-xs"
                  />
                </div>

                {/* Preset Suggestions */}
                <div className="space-y-2">
                  <span className="text-[11px] font-medium text-[#6F5B66] uppercase tracking-wider">
                    Inspirações Prontas:
                  </span>
                  <div className="flex flex-col gap-2">
                    {presets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCreatePrompt(preset)}
                        className="text-left text-xs p-2.5 rounded-lg bg-white border border-[#E8DFC8] hover:border-[#8C1D40] text-[#5A4952] hover:text-[#1E1418] transition-colors leading-snug cursor-pointer"
                      >
                        "{preset}"
                      </button>
                    ))}
                  </div>
                </div>

                {/* Controls: Aspect Ratio & Image Reference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E1418] uppercase tracking-wider mb-2">
                      Proporção da Imagem
                    </label>
                    <div className="flex items-center gap-2">
                      {(['1:1', '4:3', '16:9'] as const).map((ratio) => (
                        <button
                          key={ratio}
                          type="button"
                          onClick={() => setAspectRatio(ratio)}
                          className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            aspectRatio === ratio
                              ? 'bg-[#1E1418] text-white border-[#1E1418]'
                              : 'bg-white text-[#5A4952] border-[#D5C2AF] hover:bg-[#F2ECE1]'
                          }`}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Optional Image for Editing */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1E1418] uppercase tracking-wider mb-2">
                      Editar Imagem Existente (Opcional)
                    </label>
                    <input
                      ref={fileInputRef1}
                      type="file"
                      accept="image/*"
                      onChange={handleSourceImageChange}
                      className="hidden"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef1.current?.click()}
                        className="flex-1 py-2 px-3 text-xs font-medium rounded-lg bg-white border border-[#D5C2AF] hover:bg-[#F2ECE1] text-[#1E1418] flex items-center justify-center gap-1.5 truncate cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#8C1D40]" />
                        <span>{sourceImage ? 'Trocar Foto' : 'Carregar Foto'}</span>
                      </button>
                      {sourceImage && (
                        <button
                          type="button"
                          onClick={() => setSourceImage(null)}
                          className="py-2 px-2 text-xs text-[#8C1D40] hover:underline"
                        >
                          Remover
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {sourceImage && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E8DFC8]">
                    <img
                      src={sourceImage}
                      alt="Referência"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="text-xs text-[#5A4952]">
                      <span className="font-semibold text-[#1E1418]">Foto anexada para edição: </span>
                      O modelo irá transformar a imagem conforme seu comando de texto.
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !createPrompt.trim()}
                  className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#8C1D40] hover:bg-[#6e1531] disabled:bg-[#C9A4B0] text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Renderizando Conceito com Gemini 3.1 Flash Image...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#E8C587]" />
                      <span>{sourceImage ? 'Editar Confeitaria com IA' : 'Criar Conceito de Confeitaria'}</span>
                    </>
                  )}
                </button>

                {generationError && (
                  <div className="p-4 rounded-xl bg-[#FDE8E8] text-[#9B1C1C] text-xs flex items-start gap-2 border border-[#F8B4B4]">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{generationError}</span>
                  </div>
                )}
              </div>

              {/* Right Column: Visual Result Preview */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden bg-[#2D1B22] border border-[#E8DFC8] shadow-md min-h-[380px] flex items-center justify-center">
                  
                  {isGenerating ? (
                    <div className="p-8 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-[#FAF0E6]/10 border-2 border-[#E8C587] border-t-transparent animate-spin mx-auto" />
                      <div className="space-y-1">
                        <div className="font-serif text-xl text-white">Esculpindo seu doce digital...</div>
                        <div className="text-xs text-[#E8DFC8]/70">Calculando iluminação gastronômica, reflexos de ouro e texturas aveludadas.</div>
                      </div>
                    </div>
                  ) : generatedImage ? (
                    <div className="w-full h-full flex flex-col">
                      <div className="relative aspect-square sm:aspect-auto sm:h-[420px] bg-black">
                        <img
                          src={generatedImage}
                          alt="Conceito gerado de confeitaria"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <a
                            href={generatedImage}
                            download="maison-veloute-conceito.png"
                            className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#1E1418] shadow-md transition-colors"
                            title="Baixar imagem em alta resolução"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      <div className="p-6 bg-white space-y-4">
                        <div className="text-xs text-[#5A4952] leading-relaxed">
                          <span className="font-semibold text-[#1E1418]">Conceito: </span>
                          "{createPrompt}"
                        </div>

                        <button
                          onClick={() => onQuoteFromConcept(createPrompt, generatedImage)}
                          className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1E1418] hover:bg-[#8C1D40] text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <SendHorizontal className="w-3.5 h-3.5 text-[#E8C587]" />
                          <span>Solicitar Orçamento Deste Conceito ao Atelier</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-[#E8DFC8]/70 space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-[#E8C587]">
                        <ImageIcon className="w-7 h-7" />
                      </div>
                      <div className="font-serif text-xl text-white">Seu conceito aparecerá aqui</div>
                      <p className="text-xs max-w-sm mx-auto leading-relaxed">
                        Escreva um prompt detalhado ao lado e clique em criar para ver uma obra inédita de alta confeitaria renderizada em segundos.
                      </p>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: SOMMELIER & PHOTO ANALYSIS WITH GEMINI 3.1 PRO */}
        {activeTab === 'analyze' && (
          <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-[#E8DFC8] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Photo Upload & Question */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-[#1E1418] uppercase tracking-wider mb-2">
                    Fotografia de Referência (Bolo, Doce ou Mesa)
                  </label>
                  
                  <input
                    ref={fileInputRef2}
                    type="file"
                    accept="image/*"
                    onChange={handleAnalyzeImageChange}
                    className="hidden"
                  />

                  {analyzeImage ? (
                    <div className="relative rounded-2xl overflow-hidden border border-[#D5C2AF] bg-black max-h-[300px]">
                      <img
                        src={analyzeImage}
                        alt="Foto para análise"
                        className="w-full h-full object-contain mx-auto"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef2.current?.click()}
                        className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-xs font-semibold text-[#1E1418] shadow-sm"
                      >
                        Trocar Foto
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef2.current?.click()}
                      className="border-2 border-dashed border-[#D5C2AF] hover:border-[#8C1D40] rounded-2xl p-8 text-center bg-white cursor-pointer transition-colors space-y-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#8C1D40] mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-[#1E1418]">
                          Clique para fazer upload da foto
                        </div>
                        <div className="text-xs text-[#6F5B66]">
                          PNG, JPG ou WEBP até 15MB
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E1418] uppercase tracking-wider mb-2">
                    Pergunta Específica para o Chef (Opcional)
                  </label>
                  <input
                    type="text"
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder="Ex: Serve 50 pessoas? Quais recheios combinam com este acabamento?"
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-[#D5C2AF] bg-white focus:outline-none focus:ring-1 focus:ring-[#8C1D40]"
                  />
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !analyzeImage}
                  className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1E1418] hover:bg-[#8C1D40] disabled:bg-[#8F8189] text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Examinando com Gemini 3.1 Pro Preview...</span>
                    </>
                  ) : (
                    <>
                      <ChefHat className="w-4 h-4 text-[#E8C587]" />
                      <span>Analisar Foto com Chef Sommelier IA</span>
                    </>
                  )}
                </button>

                {analysisError && (
                  <div className="p-4 rounded-xl bg-[#FDE8E8] text-[#9B1C1C] text-xs flex items-start gap-2 border border-[#F8B4B4]">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{analysisError}</span>
                  </div>
                )}
              </div>

              {/* Right Column: Structured Sommelier Report */}
              <div className="lg:col-span-7">
                {isAnalyzing ? (
                  <div className="bg-white rounded-2xl p-10 border border-[#E8DFC8] text-center space-y-4">
                    <div className="w-14 h-14 rounded-full border-2 border-[#8C1D40] border-t-transparent animate-spin mx-auto" />
                    <div className="font-serif text-xl text-[#1E1418]">O Chef Sommelier está avaliando...</div>
                    <p className="text-xs text-[#6F5B66] max-w-md mx-auto">
                      Identificando complexidade da glaçagem, flores esculpidas, estrutura de camadas e estimando porções e investimento artesanal.
                    </p>
                  </div>
                ) : analysisResult ? (
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-sm space-y-6">
                    
                    {/* Header of Report */}
                    <div className="flex items-start justify-between border-b border-[#F2ECE1] pb-4">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-[#8C1D40] font-semibold">
                          Parecer do Chef Pâtissier
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#1E1418] mt-1">
                          {analysisResult.sweetType}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-wider text-[#8C7B83] font-medium">
                          Estimativa do Atelier
                        </div>
                        <div className="font-serif text-lg font-bold text-[#8C1D40] tabular-nums">
                          {analysisResult.estimatedPriceRange}
                        </div>
                      </div>
                    </div>

                    {/* Flavors & Techniques */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EBE3D5] space-y-1">
                        <div className="text-xs font-semibold text-[#1E1418] uppercase tracking-wider">
                          Perfil Aromático & Sabor
                        </div>
                        <p className="text-xs text-[#5A4952] leading-relaxed">
                          {analysisResult.flavorProfile}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EBE3D5] space-y-1">
                        <div className="text-xs font-semibold text-[#1E1418] uppercase tracking-wider">
                          Rendimento Sugerido
                        </div>
                        <p className="text-xs text-[#5A4952] leading-relaxed">
                          {analysisResult.recommendedPortions}
                        </p>
                      </div>
                    </div>

                    {/* Pastry Techniques Identified */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-[#1E1418] uppercase tracking-wider">
                        Técnicas Confeiteiras Identificadas:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.pastryTechniques?.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-md bg-[#FAF0E6] text-[#8C1D40] text-xs font-medium border border-[#E8DFC8]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pairing */}
                    <div className="p-4 rounded-xl bg-[#F6F4F0] border border-[#E5DAC6] text-xs space-y-1">
                      <span className="font-semibold text-[#1E1418]">Harmonização Perfeita: </span>
                      <span className="text-[#5A4952]">{analysisResult.pairingSuggestion}</span>
                    </div>

                    {/* Verdict */}
                    <div className="text-xs text-[#5A4952] leading-relaxed bg-[#FAF7F2] p-4 rounded-xl border border-[#EBE3D5]">
                      <span className="font-semibold text-[#1E1418]">Veredito do Chef: </span>
                      {analysisResult.chefVerdict}
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => onQuoteFromConcept(`Reprodução inspirada em: ${analysisResult.sweetType} (${analysisResult.estimatedPriceRange})`, analyzeImage || undefined)}
                      className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#8C1D40] hover:bg-[#6e1531] text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                    >
                      <SendHorizontal className="w-4 h-4 text-[#E8C587]" />
                      <span>Solicitar Encomenda Deste Doce ao Atelier</span>
                    </button>

                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-10 border border-[#E8DFC8] text-center text-[#6F5B66] space-y-3 min-h-[380px] flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-[#FAF0E6] flex items-center justify-center text-[#8C1D40] mx-auto">
                      <Search className="w-7 h-7" />
                    </div>
                    <div className="font-serif text-xl text-[#1E1418]">Aguardando Imagem para Análise</div>
                    <p className="text-xs max-w-sm mx-auto leading-relaxed">
                      Carregue a foto de um doce do Pinterest, Instagram ou de uma festa. O modelo Gemini 3.1 Pro decifrará ingredientes, porções e preço estimado.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
