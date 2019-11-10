import { config } from 'dotenv';
import express from 'express';
import path from 'path';
import router from './controllers/UserController';
import connectDB from './db/db';
import { errorMiddleware } from './middleware/errorHandler';

config({ path: path.resolve(__dirname, '../', 'config', 'config.env') });
connectDB();
const app = express();
app.use(express.json());

app.use('/users', router);
app.use(errorMiddleware);
const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

process.on('unhandledRejection', (error, promise) => {
  console.error(`Error: ${error}`);
  server.close(() => process.exit(1));
});
