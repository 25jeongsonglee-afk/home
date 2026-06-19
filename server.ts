import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser with standard size safety limit
  app.use(express.json({ limit: '1mb' }));

  // Initialize server-side Gemini API
  // Use lazy logic to avoid crashing on start if the key is missing or blank
  let ai: GoogleGenAI | null = null;
  const getGeminiClient = (): GoogleGenAI => {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        throw new Error('GEMINI_API_KEY environment variable is not configured');
      }
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return ai;
  };

  // 1. API Route for AI Proposal Generation
  app.post('/api/ai/proposal', async (req, res) => {
    try {
      const { specs } = req.body;
      if (!specs) {
        return res.status(400).json({ error: 'Missing specifications parameter (specs)' });
      }

      console.log(`[AI Proposal] Fetching plan for business: "${specs.businessName}" (${specs.type})`);
      
      const client = getGeminiClient();
      const prompt = `
        You are a world-class Web Designer & AI Brand Strategist.
        Generate a highly personalized, creative, and professional web creation project proposal for the following customer requirements:
        
        - Business/Site Name (비즈니스 이름): "${specs.businessName || '이름 없음'}"
        - Site Type (종류): "${specs.type}"
        - Reference/Inspiration Site (참고 사이트): "${specs.referenceUrl || '없음'}"
        - Preferred Branding Colors (선호 색상): "${specs.colorScheme || '알아서 조합'}"
        - Essential Custom Features requested (대표 기능들): ${JSON.stringify(specs.features || [])}
        
        Create a tailored web blueprint containing:
        1. Slogan (슬로건): An extremely catchy, high-converting Korean slogan (one concise line).
        2. Concept (개발 컨셉): A description (around 2-3 sentences in Korean) of the branding, visual atmosphere, and UX approach.
        3. Color Palette (컬러 아웃룩): Precise modern hex codes that reflect the industry. Choose high-contrast, eye-friendly tones.
        4. Recommended Sections (추천 영역): A list of 4 highly strategic website sections to build, with title, description specifying Korean copy recommendations, and the ideal responsive container layout.
        5. Marketing Advice (인터넷 마케팅 분석): Actionable, specific growth hack tips in Korean.
      `;

      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You must only reply in valid JSON that strictly matches the requested schema. Do not output markdown code blocks or surrounding text, just provide the final parsed JSON object.',
          temperature: 0.8,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              slogan: { type: Type.STRING },
              concept: { type: Type.STRING },
              colorPalette: {
                type: Type.OBJECT,
                properties: {
                  primary: { type: Type.STRING, description: 'Dark contrasting text or slate base, hex format like #1E293B' },
                  secondary: { type: Type.STRING, description: 'Supportive brand color, hex format' },
                  background: { type: Type.STRING, description: 'Soft background off-white / light blue tone, hex format like #F8FAFC' },
                  accent: { type: Type.STRING, description: 'Vivid color for action buttons and links, hex format like #EF4444' }
                },
                required: ['primary', 'secondary', 'background', 'accent']
              },
              recommendedSections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING, description: 'Friendly section header in Korean' },
                    description: { type: Type.STRING, description: 'Content details and dynamic text copy suggested for this segment in Korean' },
                    suggestedLayout: { type: Type.STRING, description: 'Recommended layout type: e.g. Bento-grid, Split-row, Carousel-slider' }
                  },
                  required: ['title', 'description', 'suggestedLayout']
                }
              },
              marketingAdvice: { type: Type.STRING, description: 'Strategic SEO / Social utility referral advice in Korean' }
            },
            required: ['slogan', 'concept', 'colorPalette', 'recommendedSections', 'marketingAdvice']
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Gemini model did not return any text content');
      }

      const proposalData = JSON.parse(responseText.trim());
      res.json(proposalData);

    } catch (error: any) {
      console.error('[AI Proposal Route Error]:', error.message || error);
      res.status(500).json({ 
        error: 'AI Generation Failed', 
        message: error.message || 'Unknown internal error' 
      });
    }
  });

  // Serve static assets & bind Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Active & listening on http://localhost:${PORT}`);
  });
}

startServer();
