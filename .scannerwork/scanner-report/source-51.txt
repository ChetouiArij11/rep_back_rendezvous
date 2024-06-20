const express = require('express');
const router = express.Router();
const patientController = require('../controllers/PatientController');

// Routes pour les patients
router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.post('/ajout', patientController.createPatient);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);
router.get('/search/patient/:cin', patientController.rechercherPatientParCIN);

module.exports = router;
