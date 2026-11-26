import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRouter from './routes/auth.routes.ts';

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not set in .env file');
  process.exit(1);
}

const app = express();

const port = Number(process.env.PORT) || 8082;

const corsConfig = {
  origin: `http://localhost:8081`,
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// middleware
app.use(cors(corsConfig));
app.use(cookieParser());

// routes
app.use('/api/v1/auth', AuthRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'unknown route' });
});

// handler for errors thrown by middleware
app.use(
  (
    error: Error & { status?: number },
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const status = error.status ?? 500;
    if (status >= 500) console.error(error);
    res.status(status).json({
      error: status < 500 ? 'Invalid request' : 'Internal server error',
    });
  },
);

app.listen(port, (error) => {
  if (error) {
    console.error(`Error starting the server: ${error}`);
    process.exit(1);
  }
  console.log(`Server is running on port ${port}`);
});
