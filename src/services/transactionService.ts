import axiosClient from '../utils/axiosClient';
import { saveTransactions } from '../repositories/transactionRepository';

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY as string;

export const fetchAndSaveTransactions = async (address: string) => {
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
};
