import express from "express";
const handleChat = express.Router();
// handleChat.use(express.json());

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

const gemini_api = process.env.REACT_APP_GEMINI_API_KEY;

const google = createGoogleGenerativeAI({
  apiKey: gemini_api,
});

handleChat.post("/api/chat", async (req, res) => {
  let messages = req.body.messages;

  const formattedMessages = JSON.stringify(messages, null, 2);
  // console.log("backend: ", formattedMessages);

  const result = await streamText({
    model: google("gemini-2.5-flash-preview-04-17"),
    temperature: 0.5,
    system: `You are a personalized AI nutritionist assisting a user with dietary guidance based on their profile.

Please provide the following:

🔢 1. Calculations:
- Calculate and show the user's **BMI**.
- Calculate and show the user's **BMR**.

📊 2. Daily Caloric Recommendation:
- Based on the user's goal (Lose Weight / Gain Weight / Maintain Weight), recommend a daily caloric intake:
  - Lose Weight: Suggest 15–25% less than BMR.
  - Gain Weight: Suggest 10–20% more than BMR.
  - Maintain Weight: Keep similar to BMR or adjust for activity level.

Format:
Calories Suggestion Min: [value]  
Calories Suggestion Max: [value]

🥗 3. Nutrient Guidelines (per 100g of any selected product):
Recommend healthy target values for the following:
Format:
Fat Suggestion: [value]  
Saturates Suggestion: [value]  
Sugars Suggestion: [value]  
Salt Suggestion: [value]

🍽️ 4. Food Group Suggestion:
Based on the user’s goal, suggest only from these groups:
- Lose Weight ➝ Cereals and potatoes  
- Gain Weight ➝ Sugary snacks  
- Maintain Weight ➝ Fish Meat Eggs  
- No specific goal ➝ Fat and sauces

Format:
Food-Group: [value]

📌 Output Instructions:
- Personalize all recommendations using the user's gender, age, height, weight, activity level, and dietary goal.
- Be concise. Limit the total output to **300 words**.
- Use line breaks between each section for clarity.
`,
    messages: messages
      .filter((message) => message.role === "user")
      .map((message) => ({
        role: message.role,
        content: message.content,
      })),
    // prompt: formattedMessages,
    maxRetries: 1,
    // maxTokens: 200,
  });
  result.pipeTextStreamToResponse(res);
});

handleChat.post("/api/chat-product", async (req, res) => {
  let messages = req.body.messages;

  const formattedMessages = JSON.stringify(messages, null, 2);
  // console.log("backend: ", formattedMessages);

  const result = await streamText({
    model: google("gemini-2.5-flash-preview-04-17"),
    temperature: 0.7,
    system: `
You are a helpful, friendly, and knowledgeable AI assistant for an online grocery platform. Your role is to answer customer questions about food products using data from the Open Food Facts database.

Respond with insightful, precise, and concise answers. Keep your response under 250 words, ideally around 200 words. Avoid repetition or filler language.

Provide answers in a clear and structured format using short paragraphs or bullet points. 

Do not use markdown formatting or symbols such as **, *, or any other styling indicators. Just use plain text for all output.

**Always include relevant product insights such as:**

- What is this food item?

- How it’s commonly used or eaten?

- Whether it’s considered healthy or not, and why.

- Any ingredients or additives that may require caution (e.g., allergens, high sugar/sodium levels, ultra-processed status).

- Nutritional highlights or concerns.

**Do not fabricate information. Use only the data provided from the Open Food Facts dataset.**

----

🧾 Example Input:
User: Can you tell me more about this product: Barilla Spaghetti No. 5? Is it healthy? What are its ingredients?
`,
    messages: messages
      .filter((message) => message.role === "user")
      .map((message) => ({
        role: message.role,
        content: message.content,
      })),
    // prompt: formattedMessages,
    maxRetries: 1,
    // maxTokens: 200,
  });
  result.pipeTextStreamToResponse(res);
});

export default handleChat;
