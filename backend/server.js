const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

const ordersRouter = require('./routes/orders');
app.use('/api/orders', ordersRouter);

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const branchesRouter = require('./routes/branches');
app.use('/api/branches', branchesRouter);

const reviewsRouter = require('./routes/reviews');
app.use('/api/reviews', reviewsRouter);

const promotionsRouter = require('./routes/promotions');
app.use('/api/promotions', promotionsRouter);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port: ${port}`);
});
