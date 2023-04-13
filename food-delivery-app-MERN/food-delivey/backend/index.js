const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db")
// here we are using require and not import because we are working with nodejs

// to get rid of that CORS error, mention the url where frontend id running
app.use((req,res,next) =>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

mongoDB();


// if we write all the javascript code for each functionality then the code will get too huge, hence
// creating differnt files for them
app.use(express.json())
app.use('/api',require("./Routes/CreatUser"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})