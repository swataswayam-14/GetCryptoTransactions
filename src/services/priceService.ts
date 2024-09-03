import axiosClient from '../utils/axiosClient';
import { savePrice } from '../repositories/priceRepository';

export const fetchAndSaveEthereumPrice = async (): Promise<void> => {
  const response = await axiosClient.get('https://api.coingecko.com/api/v3/simple/price', {
    params: { ids: 'ethereum', vs_currencies: 'inr' },
  });

  const price = response.data.ethereum.inr;
  await savePrice(price);
  console.log(`Ethereum price stored: ₹${price}`);
};
