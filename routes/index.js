require('dotenv').config();
const router = require('express').Router();
const movieRoutes = require('./movie.routes');

router.get('/', (req, res) => res.send(`${process.env.APP_NAME} App `));
router.use('/movies', movieRoutes);

module.exports = router;
