require('dotenv').config();
const router = require('express').Router();
const importRoutes = require('./import.route');

router.get('/', (req, res) => res.send(`${process.env.APP_NAME} App `));
router.use('/import', importRoutes);

module.exports = router;
