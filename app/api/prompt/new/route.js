import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt: prompt, tag: tag });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return new Response(`Error creating the prompt`, { status: 500 });
  }
};
