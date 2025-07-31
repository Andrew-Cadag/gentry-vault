const express = require('express');
const router = express.Router();
const watchController = require('../controllers/watch.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware); 

router.get('/', watchController.getAllWatches);
router.post('/', watchController.createWatch);
router.put('/:id', watchController.updateWatch);
router.delete('/:id', watchController.deleteWatch);

module.exports = router;