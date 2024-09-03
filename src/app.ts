import express, { Application, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { getTransactions } from './controllers/transactionController';
import { getExpenses } from './controllers/expenseController';
import { swaggerSetup, swaggerUi } from './swagger';

export const app: Application = express();

app.use('/api-docs', swaggerUi.serve, swaggerSetup);

app.get('/transactions/:address', getTransactions);
app.get('/expenses/:address', getExpenses);

app.use(express.json());

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error' });
};
app.use(errorHandler);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});