const { Deepgram } = require("@deepgram/sdk");
const express = require("express");
const app = express();
const {ask} = require("./module.js");
const fs = require('fs');

/* app.get("/u.mp3", function(req,res){
  res.sendFile(__dirname+"/audio.mp3")
}) */

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html")
})

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function transcript(link){
const deepgram = new Deepgram("yourApiKey");

const fileSource = { buffer: link, mimetype: "audio/webm" };

const response = await deepgram.transcription.preRecorded(fileSource, {
  punctuate: true,
}).then(res=>JSON.stringify(res.results.channels[0].alternatives[0].transcript));
  return response
}

async function script(url, callback){ 
  var lst = [];
  var to = transcript(url).then(res=>res.replace(`"`,''));
  await to.then(res=>lst.push(res))
  await sleep(1000)
  return callback(lst[0]);
}

app.use(express.json())

app.post("/work/reco/", async function(req,res){
  var link = req.body.base64
  //console.log(link)
  //var lst = [];
  script(link, async function(response) {
  console.log(response)
}).catch(err=>console.log(err))
})

app.post("/uwu", async function(req,reo){
  var text = req.body.text
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  await ask(text,ip)
  
    await sleep(1000)
  //console.log(contents)
    return reo.send(fs.readFileSync(__dirname+"/"+ip+".mp3", {encoding: 'base64'}))
});

app.listen(3000);
