import { Request, Response } from 'express';
import { fetchAndSaveTransactions } from '../services/transactionService';

export const getTransactions = async (req: Request, res: Response) => {
  const { address } = req.params;

  try {
    const transactions = await fetchAndSaveTransactions(address);
    res.json(transactions);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
