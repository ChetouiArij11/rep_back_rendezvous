const { getRepository } = require("typeorm");
const Rendezvous = require("../models/Rendezvous");
const express = require('express');
exports.getAllRendezvous = async (req, res) => {
  try {
    const rendezvousRepository = getRepository(Rendezvous);
    const rendezvous = await rendezvousRepository.find();
    res.status(200).json(rendezvous);
  } catch (err) {
    console.error("Une erreur s'est produite lors de la récupération des rendez-vous :", err);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des rendez-vous." });
  }
};

exports.getRendezvousById = async (req, res) => {
  const id = req.params.id;
  try {
    const rendezvousRepository = getRepository(Rendezvous);
    const rendezvous = await rendezvousRepository.findOne(id);
    if (!rendezvous) {
      res.status(404).json({ message: "Rendezvous non trouvé." });
      return;
    }
    res.status(200).json(rendezvous);
  } catch (err) {
    console.error("Une erreur s'est produite lors de la récupération du rendez-vous :", err);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération du rendez-vous." });
  }
};

exports.createRendezvous = async (req, res) => {
  try {
    const newRendezvousData = req.body;
    const rendezvousRepository = getRepository(Rendezvous);
    const newRendezvous = rendezvousRepository.create(newRendezvousData);
    await rendezvousRepository.save(newRendezvous);
    res.status(201).json({ message: "Rendezvous créé avec succès.", rendezvous: newRendezvous });
  } catch (err) {
    console.error("Une erreur s'est produite lors de la création du rendez-vous :", err);
    res.status(500).json({ message: "Une erreur s'est produite lors de la création du rendez-vous." });
  }
};

exports.updateRendezvous = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedRendezvousData = req.body;
    const rendezvousRepository = getRepository(Rendezvous);
    await rendezvousRepository.update(id, updatedRendezvousData);
    res.status(200).json({ message: "Rendezvous mis à jour avec succès." });
  } catch (err) {
    console.error("Une erreur s'est produite lors de la mise à jour du rendez-vous :", err);
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du rendez-vous." });
  }
};

exports.deleteRendezvous = async (req, res) => {
  const id = req.params.id;
  try {
    const rendezvousRepository = getRepository(Rendezvous);
    await rendezvousRepository.delete(id);
    res.status(200).json({ message: "Rendezvous supprimé avec succès." });
  } catch (err) {
    console.error("Une erreur s'est produite lors de la suppression du rendez-vous :", err);
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du rendez-vous." });
  }
};

exports.getRendezvousByPatientId = async (req, res) => {
  const patientId = req.params.patientId;
  try {
    const rendezvousRepository = getRepository(Rendezvous);
    const rendezvous = await rendezvousRepository.find({ where: { patient_id: patientId } });
    res.status(200).json(rendezvous);
  } catch (err) {
    console.error("Une erreur s'est produite lors de la récupération des rendez-vous du patient :", err);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des rendez-vous du patient." });
  }
};

exports.getRendezvousByMedecinId = async (req, res) => {
  const medecinId = req.params.medecinId;
  try {
    const rendezvousRepository = getRepository(Rendezvous);
    const rendezvous = await rendezvousRepository.find({ where: { medecin_id: medecinId } });
    res.status(200).json(rendezvous);
  } catch (err) {
    console.error("Une erreur s'est produite lors de la récupération des rendez-vous du médecin :", err);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des rendez-vous du médecin." });
  }
};
