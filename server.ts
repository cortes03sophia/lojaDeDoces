import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint: Create or Edit Pastry / Sweet Image using gemini-3.1-flash-image-preview / gemini-3.1-flash-image
app.post('/api/create-sweet-design', async (req: Request, res: Response) => {
  try {
    const { prompt, base64Image, mimeType, aspectRatio = '1:1' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'O prompt é obrigatório para gerar o doce.' });
    }

    const enhancedPrompt = `High-end luxury pastry and confectionery artisanal design, ultra realistic studio lighting, edible art: ${prompt}`;

    const parts: any[] = [];
    if (base64Image && mimeType) {
      parts.push({
        inlineData: {
          data: base64Image.replace(/^data:image\/\w+;base64,/, ''),
          mimeType: mimeType || 'image/jpeg',
        },
      });
      parts.push({
        text: `Edit or modify this confectionery photo according to instructions: ${enhancedPrompt}`,
      });
    } else {
      parts.push({
        text: enhancedPrompt,
      });
    }

    // Model specified: gemini-3.1-flash-image (or preview)
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image',
      contents: {
        parts,
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
          imageSize: '1K',
        },
      },
    });

    let generatedImageUrl = '';
    let commentary = '';

    const candidates = response.candidates?.[0]?.content?.parts || [];
    for (const part of candidates) {
      if (part.inlineData?.data) {
        generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
      } else if (part.text) {
        commentary += part.text + ' ';
      }
    }

    if (!generatedImageUrl) {
      return res.status(500).json({
        error: 'Nenhuma imagem pôde ser renderizada pelo modelo.',
        details: commentary,
      });
    }

    return res.json({
      imageUrl: generatedImageUrl,
      notes: commentary.trim() || 'Conceito gastronômico renderizado com sucesso pelo Atelier Digital Maison Velouté.',
    });
  } catch (error: any) {
    console.error('Error generating sweet design:', error);
    return res.status(500).json({
      error: error?.message || 'Falha ao gerar conceito visual de confeitaria.',
    });
  }
});

// Endpoint: Analyze Image using gemini-3.1-pro-preview
app.post('/api/analyze-pastry-photo', async (req: Request, res: Response) => {
  try {
    const { base64Image, mimeType = 'image/jpeg', customQuestion } = req.body;

    if (!base64Image) {
      return res.status(400).json({ error: 'A imagem é necessária para análise sensorial.' });
    }

    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');

    const promptText = `
Você é o Chef Pâtissier Executivo e Sommelier de Alta Confeitaria da Maison Velouté.
Analise a fotografia fornecida de bolo, doce fino ou mesa de doces.

${customQuestion ? `Pergunta específica do cliente: "${customQuestion}"` : ''}

Retorne uma análise detalhada em JSON estruturado com a seguinte estrutura:
{
  "sweetType": "Nome/Categoria do Doce (ex: Entremet Moderno de Frutas Vermelhas / Bolo de Casamento Geométrico)",
  "flavorProfile": "Descrição dos perfis de sabor predominantes (ex: Notas ácidas de framboesa silvestre, ganache aveludado de chocolate 70%, crocante de praliné)",
  "pastryTechniques": ["Técnica 1 (ex: Glaçagem espelhada)", "Técnica 2 (ex: Flores de açúcar esculpidas à mão)", "Técnica 3"],
  "recommendedPortions": "Sugestão de rendimento ou porções ideais (ex: Serve de 25 a 30 convidados)",
  "estimatedPriceRange": "Estimativa de investimento artesanal na Maison Velouté em R$ (ex: R$ 380 - R$ 450)",
  "pairingSuggestion": "Harmonização recomendada (ex: Champagne Brut Rosé ou Café Especial Bourbon Amarelo)",
  "chefVerdict": "Opinião do chef sobre a harmonia visual, elegância e dicas para reproduzir sob encomenda no nosso atelier."
}
Responda estritamente em JSON válido sem marcadores markdown adicionais.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            text: promptText,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      // fallback
      parsedData = {
        sweetType: 'Confeitaria Contemporânea Sob Medida',
        flavorProfile: text.slice(0, 200),
        pastryTechniques: ['Técnica Artesanal Francesa', 'Equilíbrio Sensorial'],
        recommendedPortions: 'Sob consulta com o atelier',
        estimatedPriceRange: 'R$ 250 - R$ 500',
        pairingSuggestion: 'Espumante Brut ou Infusão Floral',
        chefVerdict: text,
      };
    }

    return res.json({ analysis: parsedData });
  } catch (error: any) {
    console.error('Error analyzing pastry photo:', error);
    return res.status(500).json({
      error: error?.message || 'Falha ao analisar a fotografia do doce.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Maison Velouté server running on http://localhost:${PORT}`);
  });
}

startServer();
