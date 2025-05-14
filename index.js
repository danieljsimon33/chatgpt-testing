const OpenAI = require('openai');
require('dotenv').config();

console.log('File running...');

(async () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.openai.com/v1' // actual url: https://api.openai.com/v1/chat/completions
  });

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-2024-08-06',
    messages: [
      {
        role: 'system',
        content: 'Speak like a pirate.'
      },
      {
        role: 'user',
        content:
          'How much wood could a woodchuck chuck if a woodchuck could chuck wood?'
      }
    ],
    stream: true
  });

  for await (const chunk of stream) {
    // console.log(chunk);
    console.log(chunk.choices[0]?.delta?.content);
    // console.log('****************');
  }
})();
