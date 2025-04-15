import { getENV } from "@/config/env.config";
import { ENV } from "@/enum";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: getENV(ENV.OPENAI_API_KEY),
});

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    const completion = await openai.chat.completions.create({
      model: getENV(ENV.OPEN_IA_MODEL),
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates product information for a restaurant menu. Provide the output as raw JSON without markdown code blocks.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image and generate a product description. It includes: name, description (maximum 200 characters), category, calories (number), preparation_time (number), ingredients (array), base_ingredients (array), extra_ingredients with their prices (array) ([name: string, price: number]), and the product_price. Remember that prices are in Chilean pesos, without periods or the $ symbol. JSON format.",
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
    });

    const raw = completion.choices[0].message.content ?? "";

    const cleaned = raw
      .replace(/^```json\s*/, "")
      .replace(/^```\s*/, "")
      .replace(/```$/, "")
      .trim();

    return NextResponse.json(JSON.parse(cleaned));
  } catch (error) {
    console.error("❌ ERROR:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
