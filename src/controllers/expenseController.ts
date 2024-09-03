import { Request, Response } from 'express';
import { getTransactionsByAddress } from '../repositories/transactionRepository';
import { getLatestPrice } from '../repositories/priceRepository';

export const getExpenses = async (req: Request, res: Response) => {
  const { address } = req.params;

  try {
    const transactions = await getTransactionsByAddress(address);
    const totalExpenses = transactions.reduce((total, tx) => {
      const gasUsed = parseFloat(tx.gasUsed || '0');
      const gasPrice = parseFloat(tx.gasPrice || '0');
      return total + (gasUsed * gasPrice) / 1e18;
    }, 0);

    const currentPrice = await getLatestPrice();

    res.json({
      totalExpenses,
      currentPrice: currentPrice || 'Price not available',
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
