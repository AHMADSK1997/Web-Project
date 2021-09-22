const express = require('express'); 
const app = express();
const mongoose = require("mongoose");
const routesUlrs = require('./routes/route')
const cors = require('cors')
const port = process.env.PORT || 5000; 
const Binance = require('node-binance-api');
const router = require('./routes/route');
const binance = new Binance().options({
  APIKEY: '<key>',
  APISECRET: '<secret>'
});

mongoose.connect("mongodb://localhost:27017/webProject",
                { useNewUrlParser: true ,useUnifiedTopology: true },(err,client)=>{
  console.log("DB connected")
});

app.use(express.json())
app.use(cors())
app.use('/app',routesUlrs)
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6


// create a GET route
app.get('/historicalDataBTC', async(req, res) => { //Line 9
  BTCprice = await getData("BTCUSDT")
  BTCprice.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))
  res.send(BTCprice); //Line 10
}); //Line 11

app.get('/historicalDataETH', async(req, res) => { //Line 9
  ETHprice = await getData("ETHUSDT")
  ETHprice.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))
  res.send(ETHprice); //Line 10
}); //Line 11

app.get('/RealTimeBTCUSDT', async(req, res) => { //Line 9
  res.send(await RealTimeData()); //Line 10
}); //Line 11

app.get('/BTCUSDTandEThUSDT', async(req, res) => { //Line 9
  ETHprice = await getData("ETHUSDT")
  ETHprice.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))
  BTCprice = await getData("BTCUSDT")
  BTCprice.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))
  res.send({BTC:BTCprice, ETH: ETHprice}); //Line 10
}); //Line 11

app.get('/getPriceETH',async(req,res)=>{
  let ticker = await binance.prices();
  res.send(ticker.ETHUSDT); //Line 10
})
app.get('/getPriceBTC',async(req,res)=>{
  let ticker = await binance.prices();
  res.send(ticker.BTCUSDT); //Line 10
})
async function getData( currency,start=1592237345,lim=1000){//  1502942400000
  return new Promise((resolve, reject) => {
    binance.candlesticks(currency, "1m", async (error, ticks, symbol) => {
      if (error){ reject(error); }
      const candleData = await ticks.map(candle => ({ // is there a need to use await?
        time: candle[0],
        close: candle[4]
      }))
      resolve(candleData)
  } , { limit: lim })
})
}

function RealTimeData(){
  binance.websockets.chart("BTCUSDT", "1m", (symbol, interval, chart) => {
    let tick = binance.last(chart);
    const last = chart[tick].close;
    console.info(" last price: "+last)
  });
}

