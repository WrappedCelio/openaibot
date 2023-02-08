const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "yourApiKey",
});
const openai = new OpenAIApi(configuration);

var gtts = require("better-node-gtts").default;
/*
const {Leopard} = require("@picovoice/leopard-node");


const handle = new Leopard(access);
 
const result = handle.processFile("./res.mp3");
console.log(result.transcript); */

async function ask(q,userid) {

  const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: ${q} \nAI:`,
  temperature: 0,
  max_tokens: 100,
  top_p: 1,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
  stop: ["\n"],
}).then(res=>{
    
 gtts.save("./"+userid+".mp3", res.data.choices[0].text)
  .then(() => {
    console.log("done")
  });
  })
  return response;
}

module.exports = {ask}
