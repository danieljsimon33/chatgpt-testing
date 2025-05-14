const OpenAI = require('openai');
const readline = require('node:readline');
require('dotenv').config();

console.log('File running...');

const main = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Prompt:', (input) => openAiStream(input));
};

const openAiStream = async (input = null) => {
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
          input ||
          'How much wood could a woodchuck chuck if a woodchuck could chuck wood?'
      }
    ],
    stream: true
  });

  for await (const chunk of stream) {
    if (chunk.error) {
      console.log('error');
      break;
    }
    // console.log(chunk);
    console.log(chunk.choices[0]?.delta?.content);
    // console.log('****************');
  }
};

const openAiChatCompletions = async (input = null) => {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-2024-08-06',
        messages: [
          {
            role: 'developer',
            content:
              'Speak like you are underwater, and constantly complain about the noise from your neighbors lawn mower.'
          },
          {
            role: 'user',
            content: input || 'Talk about your cat who thinks he is a person.'
          }
        ]
      })
    });

    if (!res.ok) {
      const errorText = await res.json();
      const errorData = JSON.stringify(errorText, null, 2);

      console.error('line 80', 'Error:', errorData);
      return;
    }
    data = await res.json();

    console.log(data, '\n\n');
    console.log(data.choices[0].message);
  } catch (e) {
    console.error('line 88', e);
  }
};

// main();
// openAiStream();
openAiChatCompletions();
