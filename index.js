const express = require('express');
const { resolve } = require('path');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
const port = 3010;


app.use("/api", userRoute);


app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Example app listening at http://localhost:${port}`);
});
