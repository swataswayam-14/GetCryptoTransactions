import express from 'express';
import { getTransactions } from './controllers/transactionController';
import { getExpenses } from './controllers/expenseController';
import { swaggerSetup, swaggerUi } from './swagger';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerSetup);

app.get('/transactions/:address', getTransactions);
app.get('/expenses/:address', getExpenses);

export default app;
