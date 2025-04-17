import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (request: Request) => {
  const body = await request.json();
  const { weight, height, age, gender } = body;
  console.log("body", weight, height, age, gender)

  const prompt = `
      Based on the following user details, generate the following:
      - bmi (as a number)
      - idealWeight (as a string, e.g., "60-70 kg")
      - level (as a string like "Overweight/ Obese Class I")

      Respond **only** with a valid JSON object in the following format (no explanations or extra text):

      {
        "bmi": number,
        "idealWeight": string | number,
        "level": string
      }

      User details:
      - Weight: ${weight}
      - Gender: ${gender}
      - Age: ${age}
      - Height: ${height}`;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
      temperature: 0.7,
    });

    const resultContent = chatCompletion.choices[0]?.message?.content || '{"bmi": null, "idealWeight": null, "level": "No response generated."}';
    const result = JSON.parse(resultContent);
    
    const bmi = {
      bmi: result.bmi,
      idealWeight: result.idealWeight,
      message: `Your BMI of ${result.bmi} technically falls into the ${result.level} category`,
    };
    
    return new Response(JSON.stringify({ message: "Success", data: bmi }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return new Response(JSON.stringify({ message: "Failed" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}