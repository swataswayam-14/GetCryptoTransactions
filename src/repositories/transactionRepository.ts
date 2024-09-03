import Transaction from '../models/Transaction';

export const saveTransactions = async (transactions: any[]): Promise<void> => {
  await Transaction.insertMany(transactions);
};

export const getTransactionsByAddress = async (address: string) => {
  return await Transaction.find({ address });
};
