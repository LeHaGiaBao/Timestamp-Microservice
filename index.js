const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req,res) =>{
  let date = new Date();
  
  let result = {
    unix: date.getTime(),
    utc: date.toUTCString()
  }

  res.send(result);
});

app.get('/api/:date',(req,res) => {

  if(!Date.parse(req.params.date) && !Number(req.params.date))
  {
    return res.send({error: "Invalid Date"});
  }

  else if(!(/[-]/.test(req.params.date)) && Number(req.params.date))
  {
    let date = new Date(Number(req.params.date));

    return res.send({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } 

  let date = new Date(req.params.date);

  let result = {
    unix: date.getTime(),
    utc: date.toUTCString()
  }

  res.status(200).send(result);
});

const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
