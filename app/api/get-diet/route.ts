import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (request: Request) => {
  const body = await request.json();
  const { goal, activityLevel, dietPreference } = body;

  const prompt = `
        Create a personalized strict Indian diet plan based on the following details: 
        Goal: ${goal}
        Activity Level: ${activityLevel}
        Diet Preference: ${dietPreference}
        The plan should aim for an appropriate calorie intake based on the user's goal and activity level.
        For weight loss, create a calorie deficit, for muscle gain, focus on higher protein intake,
        and for endurance, ensure balanced nutrition. Include options for each meal of the
        day (breakfast, lunch, evening snack and dinner). 
        The meal plan should offer flexibility with 2 options per meal, 
        each with an approximate calorie count and weight. Ingredients must be available in india 
        The total daily calorie count should be appropriate for the user's
        goal (e.g., 1,400 calories for weight loss, 2,000 for maintenance, or 2,500+ for muscle gain).
         
        return in mentioned format 
        {
          "breakfast": [
            {
              "foodItem": "Oats with nuts and fruits",
              "calories": "300",
              "weight": "50g"
            },]}`

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "No response generated.";    
    const parsed = JSON.parse(reply);   

    return new Response(JSON.stringify({ message: "Success", data: parsed }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return new Response(JSON.stringify({ message: "Failed" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
