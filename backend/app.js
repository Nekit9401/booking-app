require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const routes = require('./routes');

const port = 3002;
const app = express();

app.use(cors());
// app.use(express.static(path.resolve('..', 'frontend', 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(express.json());

// app.use('/api', routes);

// app.get('/{*path}', (req, res) => {
// 	res.sendFile(path.resolve('..', 'frontend', 'dist', 'index.html'));
// });

app.get('/api/test', (req, res) => {
	res.json({ message: 'Backend is alive!' });
});

mongoose.connect(process.env.MONGODB_URL).then(() => {
	app.listen(port, () => {
		console.log(`Сервер запущен на порту ${port}`);
	});
});
