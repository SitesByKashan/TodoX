import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], 
});

async function main(todo) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Help me finish this todo: ' + todo }],
    model: 'gpt-3.5-turbo',
  });

  return chatCompletion.choices
}


export async function POST(req) {
    const data = await req.json();
    let choices = await main(data.todo);
   return NextResponse.json({"text": choices[0].message.content})
}