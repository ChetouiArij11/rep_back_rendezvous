const { EntitySchema } = require("typeorm");

const FicheMedicale = new EntitySchema({
  name: "FicheMedicale",
  tableName: "fichesmedicales",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    patient_id: {
      type: "int",
    },
    medecin_id: {
      type: "int",
    },
    rendezvous_id: {
      type: "int",
    },
    medicaments: {
      type: "text",
      nullable: true,
    },
    recettes: {
      type: "text",
      nullable: true,
    },
    description: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    id_dossier: {
      type: "int",
      nullable: true,
    },
  },
  relations: {
    patient: {
      type: "many-to-one",
      target: "Patient",
      joinColumn: { name: "patient_id" },
    },
    medecin: {
      type: "many-to-one",
      target: "Medecin",
      joinColumn: { name: "medecin_id" },
    },
    dossierMedical: {
      type: "many-to-one",
      target: "DossierMedical",
      joinColumn: { name: "id_dossier" },
    },
  },
});

module.exports = FicheMedicale;
