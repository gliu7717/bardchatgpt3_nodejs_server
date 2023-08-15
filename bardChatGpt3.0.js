import express from "express";
// Define "require"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const {Configuration,OpenAIApi} = require("openai")
import Bard, { askAI } from "bard-ai";
await Bard.init("bard 1psid key");
const configuration = new Configuration({
    apiKey: "openai api key"
})
const openai = new OpenAIApi(configuration)
function init(app){
    const router =express.Router()
    console.log("router to chats")
    router.post("/send",  async function(request, result ) {
        const user = request.user
        const message = request.body.message
        console.log("message =" + message)

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt:message
        })
        console.log(completion.data.choices[0].text)
        var gptAnswer = completion.data.choices[0].text

        var answer = await askAI(message)
        console.log(answer)
        result.json({
            status: "success",
            message : answer,
            gptMessage: gptAnswer,
        })
        console.log(result.toString())
    })
    app.use(router)
}
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.listen(3000, () => {
    console.log("Server started at port 3000");
});
init(app)
