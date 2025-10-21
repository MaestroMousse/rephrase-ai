import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OpenAI_API_KEY,
});

app.post("/api/rephrase", async (req, res) => {
  const { input, style, context } = req.body;

  if (!input)
    return res.status(400).json({ error: "Please enter a text to rephrase" });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `You are an english professor who's skilled at rewriting messages and emails. Rephrase this text to match a ${style} style suitable for a ${context} context.`,
        },
        { role: "user", content: input },
      ],
    });

    const rephrasedInput = response.choices[0].message.content;
    res.json({ rephrasedInput });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
