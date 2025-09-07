require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const port = 3002;
const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use(express.static(path.resolve('..', 'frontend', 'dist')));
app.use(express.static(path.resolve(__dirname, '..', 'frontend', 'dist')));

app.use('/api', routes);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

// app.get('/{*path}', (req, res) => {
// 	res.sendFile(path.resolve('..', 'frontend', 'dist', 'index.html'));
// });
app.get('/{*path}', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => console.log('MongoDB подключен успешно!'))
	.then(() => {
		app.listen(port, () => {
			console.log(`Сервер запущен на порту ${port}`);
		});
	});
