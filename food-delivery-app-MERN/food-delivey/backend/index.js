const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db")
// here we are using require and not import because we are working with nodejs
mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// if we write all the javascript code for each functionality then the code will get too huge, hence
// creating differnt files for them
app.use(express.json())
app.use('/api',require("./Routes/CreatUser"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})