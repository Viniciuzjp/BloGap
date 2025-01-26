import express from "express"
import mongoose from "mongoose"
const app = express()
const PORT = 3076
import Post from "./posts.js"
import cors from "cors"
import posts from "./posts.js"

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


mongoose.connect(
    "mongodb://localhost:27017/BloGap"
)
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', function() {
  console.log('Conexão estabelecida com sucesso!');
});

app.get("/posts", (req, res) => {
    posts.find()
    .then(posts => res.send(posts))
})
app.post("/posts", async (req, res) => {
    const post = new Post(
        req.body
    )
    post.save()
    res.send(post)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


