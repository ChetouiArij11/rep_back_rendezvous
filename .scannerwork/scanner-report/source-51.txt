const express = require('express');
const router = express.Router();
const rendezvousController = require('../controllers/rendezvousController');

// Route to get all rendezvous
router.get('/', rendezvousController.getAllRendezvous);

// Route to get a rendezvous by its ID
router.get('/:id', rendezvousController.getRendezvousById);

// Route to create a new rendezvous
router.post('/', rendezvousController.createRendezvous);

// Route to update an existing rendezvous
router.put('/:id', rendezvousController.updateRendezvous);

// Route to delete a rendezvous
router.delete('/:id', rendezvousController.deleteRendezvous);

module.exports = router;
