const { EntitySchema } = require("typeorm");

const Rendezvous = new EntitySchema({
  name: "Rendezvous",
  tableName: "rendezvous",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    patient_id: {
      type: "int",
      name: "patient_id",
    },
    medecin_id: {
      type: "int",
      name: "medecin_id",
    },
    nomPatient: {
      type: "varchar",
      length: 255,
      nullable: true,
      name: "nom_patient",
    },
    numTelephonePatient: {
      type: "varchar",
      length: 15,
      nullable: true,
      name: "num_telephone_patient",
    },
    dateHeure: {
      type: "datetime",
      name: "date_heure",
    },
    motif: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    statut: {
      type: "varchar",
      length: 20,
    },
    patientEmail: {
      type: "varchar",
      length: 255,
      nullable: true,
      name: "patient_email",
    },
  },
  relations: {
    patient: {
      type: "one-to-many",
      target: "Patient", // Assurez-vous que le nom de l'entité est correct
      joinColumn: { name: "patient_id" },
    },
    medecin: {
      type: "one-to-many",
      target: "Medecin", // Assurez-vous que le nom de l'entité est correct
      joinColumn: { name: "medecin_id" },
    },
  },
});

module.exports = Rendezvous;
