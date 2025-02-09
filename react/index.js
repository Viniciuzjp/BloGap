import express from "express"
import mongoose from "mongoose"
const app = express()
const PORT = 3076
import Post from "./posts.js"
import cors from "cors"
import posts from "./posts.js"
import { ObjectId } from "mongodb"
import User from "./register.js"
import passport from "passport"
import LocalStrategy from "passport-local"
import session from "express-session"
import comments from "./comments.js"

const sessionMiddleware = session({
    secret: 'my secret',
    resave: true,
    saveUninitialized: true
})

app.use(sessionMiddleware)

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  }
));
  
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

mongoose.connect(
    "mongodb://localhost:27017/BloGap"
)
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', function() {
  console.log('Conexão estabelecida com sucesso!');
});

app.get("/posts", (req, res) => {
    posts.find().sort({ createdAt: -1 })
    .then(posts => res.send(posts))
})
app.post("/posts", async (req, res) => {
    const post = new Post(
        req.body
    )
    post.save()
    res.send(post)
})
app.get("/posts/:id", (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const objectId = new ObjectId(req.params.id)
      Post.findById(objectId)
        .then(post => res.send(post))
        .catch(err => res.status(404).send({ message: 'Post not found' }))
    }
  })
  
  app.put("/update/:id", (req, res) => {
    const id = req.params.id
    const post = req.body
    Post.findByIdAndUpdate({_id: id}, post)
      .then((updatedPost) => {
        res.send(updatedPost)
      })
      .catch((err) => {
        res.status(500).send({ message: 'Error updating post' })
      })
  })
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id
    Post.findOneAndDelete({_id: id})
    .then((deletedPost) => {
      res.send(deletedPost)
    })
  })

  app.post("/register", (req, res) => {
    const user = new User(
        req.body
    )
    user.save()
    res.send(user)
  })
  app.post('/login', passport.authenticate('local'), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.send(req.user);
});

  app.post("/comments", (req, res) => {
    const comment = new comments(
        req.body
    )
    comment.save()
    res.send(comment)
  })
  app.get("/comments/:postId", (req, res) => {
    const postId = req.params.postId;
    comments.find({ postId: postId })
      .then(comments => res.send(comments))
      .catch(err => res.status(500).send(err));
  })

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


