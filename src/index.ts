import express, { Request, Response } from 'express';
import axios from 'axios';
import mongoose from 'mongoose';
import cron from 'node-cron';
import Transaction from './models/Transaction';
import Price from './models/Price';

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://swataswayamdash:SwDXo9tW4svkEkXB@cluster0.fd5k2sa.mongodb.net/', {
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/transactions/:address', async (req: Request, res: Response) => {
  const address = req.params.address;
  const apiKey = 'UQ2ZNQDMQMZW2DSZ968WHNVH5BKI5Y34TP';

  try {
    const response = await axios.get('https://api.etherscan.io/api', {
      params: {
        module: 'account',
        action: 'txlist',
        address,
        startblock: 0,
        endblock: 99999999,
        sort: 'asc',
        apikey: apiKey
      }
    });

    const transactions = response.data.result;

    await Transaction.insertMany(transactions.map((tx: any) => ({
      address,
      txHash: tx.hash,
      blockNumber: tx.blockNumber,
      timeStamp: tx.timeStamp,
      gasUsed: tx.gasUsed,
      gasPrice: tx.gasPrice
    })));

    res.json(transactions);
  } catch (error:any) {
    res.status(500).send(error.message);
  }
});

async function fetchEthereumPrice() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'ethereum',
        vs_currencies: 'inr'
      }
    });

    const price = response.data.ethereum.inr;
    await Price.create({ price });
    console.log(`Ethereum price stored: ₹${price}`);
  } catch (error:any) {
    console.error('Error fetching Ethereum price:', error.message);
  }
}
cron.schedule('*/10 * * * *', fetchEthereumPrice);
fetchEthereumPrice();
app.get('/expenses/:address', async (req: Request, res: Response) => {
  const address = req.params.address;

  try {
    const transactions = await Transaction.find({ address });
    const totalExpenses = transactions.reduce((total, tx) => {
      const gasUsed = parseFloat(tx.gasUsed || '0');
      const gasPrice = parseFloat(tx.gasPrice || '0');
      return total + (gasUsed * gasPrice) / 1e18;
    }, 0);
    const latestPrice = await Price.findOne().sort({ timestamp: -1 }).limit(1);

    res.json({
      totalExpenses,
      currentPrice: latestPrice ? latestPrice.price : 'Price not available'
    });
  } catch (error:any) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
