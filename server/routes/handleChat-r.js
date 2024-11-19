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
    model: google("gemini-1.5-flash"),
    temperature: 0.7,
    system: `
     Please provide the following:

Calculations:

Calculate and provide the user's BMI.
Calculate and provide the user's BMR.
Recommendations:

Recommend the amount of Calories for users based on their goal:
Suggest the about quantity nutrition food about Fat, Saturates, Sugars, Salt in one product (100g).
Lose Weight: Suggest a caloric deficit (e.g., 15-25% fewer calories than BMR).
Gain Weight: Suggest a caloric surplus (e.g., 10-20% more calories than BMR).
Maintain Weight: Align the caloric intake with the BMR or adjusted for activity levels.
Food Suggestions:
Based on the user's goal and preferences, assign suitable food groups:

Lose Weight: Cereals and potatoes.
Gain Weight: Sugary snacks.
Maintain Weight: Fish Meat Eggs.
None: Fat and sauces.
Output Requirements:

Use maximum 300 words total.
Use line breaks to separate each content item.
Save the calories suggestion into the format: Calories Suggestion Min: [value].
Calories Suggestion Max: [value].
Save the food groups suggestion into the format: Food-Group: [value] (just give the food groups that i give you).
Save the Fat, Saturates, Sugars, Salt suggestion into the format: 
Fat Suggestion: [value]
Saturates Suggestion: [value]
Sugars Suggestion: [value]
Salt Suggestion: [value]


Please ensure the recommendations are personalized based on the user's profile, including age, gender, height, weight, activity level, and dietary preferences.
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
