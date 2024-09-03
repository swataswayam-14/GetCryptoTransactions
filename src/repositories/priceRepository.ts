import Price from '../models/Price';

export const savePrice = async (price: number): Promise<void> => {
  await Price.create({ price });
};

export const getLatestPrice = async (): Promise<number | null> => {
  const latestPrice = await Price.findOne().sort({ timestamp: -1 }).limit(1);
  return latestPrice?.price || null;
};
