const express = require("express");
const {uuid} = require('uuidv4');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/repositories", (req, res) => {
    return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const {title, url, techs} = req.body;
  const Repository = {
    id:uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(Repository);
  if(repositories <0){
    return res.send(400).json({ error: "unsent repository" });
  }
  return res.status(200).send("repository sent");
});

app.put("/repositories/:id", (req, res) => {
  const {id}= req.params;
  const {title, url, techs} = req.body;
  const repositoryIndex = repositories.findIndex(position => position.id === id);

  const likes = repositories[repositoryIndex].likes;
 
  if(repositoryIndex < 0){
    return res.status(404).json({ error: "ID not found"});
  }

  repositories[repositoryIndex] = {id, title, url, techs, "likes":likes}
  return res.status(200).send("victory");
});

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params;
  const repositoryIndex = repositories.findIndex(position => position.id === id);

  repositories.splice(repositoryIndex, 1);
  return res.send({ message: "successfully deleted"});
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;
  const repositoryIndex = repositories.findIndex(position => position.id === id);
  
  const likes = (repositories[repositoryIndex].likes+1);
  const {title , url, techs} = (repositories[repositoryIndex]);
  
  repositories[repositoryIndex] = {id, title, url, techs, "likes":likes}
  return res.send({message: "Likes +1"});
});

module.exports = app;
