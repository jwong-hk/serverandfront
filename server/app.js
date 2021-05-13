const { json } = require('express');
const express = require('express');
const router = express.Router();
const got = require('got');
const axios = require('axios')
const app = express();
const { pipeline } = require('stream');
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/trying', (req, res) => {
    axios({method: 'get', 
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    headers: {'X-CMC_PRO_API_KEY': '3ba5252d-c117-4727-8677-2ec3ed026d2b'},
    })
    .then(response => {
        const tenCoinsList = response.data.data.slice(0, 10)
        const ethereumCoin = response.data.data[1]
        const tenCoinsListPrice = tenCoinsList.map(coin => {console.log(coin.name)})
        console.log(ethereumCoin.quote.USD.price)
        console.log(tenCoinsList.length)
        res.send(tenCoinsList)
    })
    .catch(error => console.log(error))
})

  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})