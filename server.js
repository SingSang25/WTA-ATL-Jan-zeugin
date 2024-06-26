import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authMiddleware from './middleware/authMiddleware.js';
import indexRoutes from './routes/index.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import blogeRoutes from './routes/blogRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const server = express();

server.use(cors())
server.use(bodyParser.json());

server.use('/', indexRoutes);
server.use('/auth', authRoutes);
server.use('/users', authMiddleware.auth, authMiddleware.isAdmin, userRoutes);
server.use('/blogs', blogeRoutes);
server.use('/comments', commentRoutes);

export default server;