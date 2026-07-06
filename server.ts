import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini SDK with telemetry User-Agent
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory registry to mock a database for inquiry submissions
  const inquiries: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    productType: string;
    quantity: string;
    message: string;
    status: string;
    createdAt: string;
  }> = [];

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", geminiConfigured: !!ai });
  });

  // Submit product inquiry
  app.post("/api/inquiries", (req, res) => {
    try {
      const { name, email, phone, company, productType, quantity, message } = req.body;
      
      if (!name || !email || !phone || !productType) {
        return res.status(400).json({ error: "Required fields are missing." });
      }

      const inquiryId = `KRT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newInquiry = {
        id: inquiryId,
        name,
        email,
        phone,
        company: company || "",
        productType,
        quantity: quantity || "Not Specified",
        message: message || "",
        status: "Pending Review",
        createdAt: new Date().toISOString(),
      };

      inquiries.push(newInquiry);
      res.status(201).json({ success: true, inquiry: newInquiry });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit inquiry." });
    }
  });

  // Get active inquiries list
  app.get("/api/inquiries", (req, res) => {
    res.json({ inquiries });
  });

  // AI Advisor powered by Gemini 3.5 Flash
  app.post("/api/gemini/advisor", async (req, res) => {
    try {
      const { message, chatHistory } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      if (!ai) {
        return res.json({
          text: "The Kirit Corporation & UV Seeds AI Advisor is in demo mode. We are happy to help you with Groundnut Seeds (GG-20, GG-2, G-22) and industrial processing queries! Contact us directly at +91 98252 53123.",
        });
      }

      // Convert chat history format if passed
      const contents = chatHistory && chatHistory.length > 0 
        ? [...chatHistory, { role: "user", parts: [{ text: message }] }]
        : [{ role: "user", parts: [{ text: message }] }];

      const systemInstruction = `You are "Kirit Corp & UV Seeds Expert", the lead AI agronomist and corporate advisor for Kirit Corporation, one of Gujarat's most trusted companies in Groundnut Cleaning, Processing, Grading, and Agricultural Solutions, including its specialized seed division, UV Seeds.
Your corporate office and state-of-the-art plant is located at: Veraval Road, Opp. Shrinathji Weighbridge, Sondarda, Gujarat 362227, India.

Your company is highly trusted by farmers, oil mills, wholesalers, seed dealers, and B2B buyers across Saurashtra (including Keshod, Sondarda, Junagadh, Rajkot) and international exporters.

Your expertise includes:
1. Groundnut Seeds (UV Seeds Biyaran) - Highly selected seeds like GG-20, GG-2, G-22, ensuring 85%-90%+ premium germination, extreme purity, and high yield results.
2. Core Services - Industrial-scale Groundnut Cleaning, Processing, Grading, Color sorting, Bulk export packing, and Custom Processing (Job work).
3. Machinery - We use state-of-the-art industrial machines: Pre-cleaners, Destoners, Gravity separators, Air Classifiers, Rotary sizers, high-speed Color Sorters, and treated packaging.
4. Moisture & Quality - Maintaining seed moisture strictly at 7-7.5% in high-ventilation warehouses to retain vitality. Quality Assurance includes laboratory sprouting tests and strict aflatoxin monitoring.
5. Regional Sowing - Advancing sowing tips in Gujarat's Kharif (monsoon) and Summer seasons.

Guidance:
- Keep the tone warm, respectful, agricultural yet corporate and highly professional.
- You can answer in English or friendly transliterated Gujarati words ('Biyaran' for seeds, 'Sing' or 'Mungfali' for groundnuts, 'Dana' for kernels).
- If asked about prices, state that prices adjust with the market but invite them to submit an Inquiry via the "Request a Quote" form for transparent bulk business offers.
- Keep answers highly scannable, using clear bullet points.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ 
        error: "Failed to communicate with AI Advisor.",
        details: error.message || error 
      });
    }
  });

  // Vite development middleware vs Static Production files
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
