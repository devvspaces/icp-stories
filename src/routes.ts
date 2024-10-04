import express from 'express';
import UserRouter from './routes/user';
import BlogRouter from './routes/blog';
import PostRouter from './routes/post';
import SeriesRouter from './routes/series';

const router = express.Router();

router.use('/auth', UserRouter);
router.use('/blogs', BlogRouter);
router.use('/posts', PostRouter);
router.use('/series', SeriesRouter);

export default router;