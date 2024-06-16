const { getRepository } = require("typeorm");
const Patient = require("../models/Patient");

exports.getAllPatients = async (req, res) => {
  try {
    const patientRepository = getRepository(Patient);
    const patients = await patientRepository.find();
    res.status(200).json(patients);
  } catch (err) {
    console.error(
      "Une erreur s'est produite lors de la récupération des patients :",
      err
    );
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la récupération des patients.",
    });
  }
};

exports.getPatientById = async (req, res) => {
  const id = req.params.id;
  try {
    const patientRepository = getRepository(Patient);
    const patient = await patientRepository.findOne({ where: { id } }); // Provide the selection condition for ID
    if (!patient) {
      res.status(404).json({ message: "Patient non trouvé." });
      return;
    }
    res.status(200).json(patient);
  } catch (err) {
    console.error(
      "Une erreur s'est produite lors de la récupération du patient :",
      err
    );
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération du patient.",
    });
  }
};

exports.createPatient = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      date_de_naissance,
      sexe,
      adresse_email,
      numero_de_telephone,
      adresse,
      autres_informations_medicales,
      cin,
    } = req.body;
    const patientRepository = getRepository(Patient);
    const newPatient = patientRepository.create({
      nom,
      prenom,
      date_de_naissance,
      sexe,
      adresse_email,
      numero_de_telephone,
      adresse,
      autres_informations_medicales,
      cin,
    });
    await patientRepository.save(newPatient);
    res
      .status(201)
      .json({ message: "Patient créé avec succès.", patient: newPatient });
  } catch (err) {
    console.error(
      "Une erreur s'est produite lors de la création du patient :",
      err
    );
    res.status(500).json({
      message: "Une erreur s'est produite lors de la création du patient.",
    });
  }
};

exports.updatePatient = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedPatientData = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      date_de_naissance: req.body.date_de_naissance,
      sexe: req.body.sexe,
      adresse_email: req.body.adresse_email,
      numero_de_telephone: req.body.numero_de_telephone,
      adresse: req.body.adresse,
      autres_informations_medicales: req.body.autres_informations_medicales,
      cin: req.body.cin,
    };
    const patientRepository = getRepository(Patient);
    await patientRepository.update(id, updatedPatientData);
    res.status(200).json({ message: "Patient mis à jour avec succès." });
  } catch (err) {
    console.error(
      "Une erreur s'est produite lors de la mise à jour du patient :",
      err
    );
    res.status(500).json({
      message: "Une erreur s'est produite lors de la mise à jour du patient.",
    });
  }
};

exports.deletePatient = async (req, res) => {
  const id = req.params.id;
  try {
    const patientRepository = getRepository(Patient);
    await patientRepository.delete(id);
    res.status(200).json({ message: "Patient supprimé avec succès." });
  } catch (err) {
    console.error(
      "Une erreur s'est produite lors de la suppression du patient :",
      err
    );
    res.status(500).json({
      message: "Une erreur s'est produite lors de la suppression du patient.",
    });
  }
};

exports.rechercherPatientParCIN = async (req, res) => {
  const cin = req.params.cin;
  try {
    const patientRepository = getRepository(Patient);
    const patient = await patientRepository.findOne({ where: { cin } });
    if (!patient) {
      res
        .status(404)
        .json({ message: "Patient non trouvé lors de recherche." });
      return;
    }
    res.json(patient);
  } catch (err) {
    console.error("Erreur lors de la recherche du patient :", err);
    res.status(500).send("Erreur lors de la recherche du patient.");
  }
};
