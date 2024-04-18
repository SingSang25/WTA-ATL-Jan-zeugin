import express from 'express';
import bodyParser from 'body-parser';
import authMiddleware from './middleware/authMiddleware.js';
import indexRoutes from './routes/index.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import blogeRoutes from './routes/blogRoutes.js';

const server = express();

server.use(bodyParser.json());

server.use('/', indexRoutes);
server.use('/auth', authRoutes);
server.use('/users', authMiddleware, userRoutes);
server.use('/blogs', blogeRoutes);

export default server;