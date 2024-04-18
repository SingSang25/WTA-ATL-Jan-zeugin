import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`I'm alive!`);
});

export default router;