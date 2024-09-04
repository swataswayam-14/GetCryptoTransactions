import axiosClient from '../utils/axiosClient';
import { saveTransactions } from '../repositories/transactionRepository';

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY as string;

export const fetchAndSaveTransactions = async (address: string) => {
  try {
    const response = await axiosClient.get('https://api.etherscan.io/api', {
      params: {
        module: 'account',
        action: 'txlist',
        address,
        startblock: 0,
        endblock: 99999999,
        sort: 'asc',
        apikey: ETHERSCAN_API_KEY,
      },
    });
    if (response.data.status !== '1') {
      console.error('Error in response:', response.data.message);
      throw new Error('Failed to fetch transactions: ' + response.data.message);
    }

    if (!Array.isArray(response.data.result)) {
      console.error('Unexpected response format:', response.data);
      throw new Error('Failed to fetch transactions: Invalid response format');
    }

    const transactions = response.data.result.map((tx: any) => ({
      address,
      txHash: tx.hash,
      blockNumber: tx.blockNumber,
      timeStamp: tx.timeStamp,
      gasUsed: tx.gasUsed,
      gasPrice: tx.gasPrice,
    }));

    await saveTransactions(transactions);
    return transactions;

  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error; 
  }
};