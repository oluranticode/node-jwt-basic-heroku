require('dotenv').config();
require('express-async-errors');

const express = require('express');
// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const app = express();
const mainRouter = require('./routes/main');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));

// app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.set('trust proxy', 1);
  app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(xss()); 


app.use('/api/v1', mainRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
