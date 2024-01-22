require('dotenv').config();
const router = require('express').Router();
const ImportController = require('../controllers/import.controller');
const importRoutes = require('./import.route');

router.get('/', (req, res) => res.send(`${process.env.APP_NAME} App `));
router.use('/import', importRoutes);
router.put('/random-dates', ImportController.random);
router.put('/rollback-dates', ImportController.rollbackDate);

module.exports = router;
