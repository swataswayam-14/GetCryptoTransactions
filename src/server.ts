import { app } from './app';
import { connectToDatabase } from './config/database';
import { fetchAndSaveEthereumPrice } from './services/priceService';
import cron from 'node-cron';

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    cron.schedule('*/10 * * * *', fetchAndSaveEthereumPrice);
    fetchAndSaveEthereumPrice();
  });
}).catch(err => {
  console.error('Database connection failed:', err);
});