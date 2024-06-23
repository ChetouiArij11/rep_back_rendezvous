const { EntitySchema } = require("typeorm");

const Patient = new EntitySchema({
  name: "Patient",
  tableName: "patients",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    nom: {
      type: "varchar",
      length: 255,
    },
    prenom: {
      type: "varchar",
      length: 255,
    },
    date_de_naissance: {
      type: "date",
    },
    sexe: {
      type: "varchar",
      length: 10,
    },
    adresse: {
      type: "varchar",
      length: 255,
    },
    numero_de_telephone: {
      type: "varchar",
      length: 15,
    },
    adresse_email: {
      type: "varchar",
      length: 255,
    },
    autres_informations_medicales: {
      type: "text",
      nullable: true,
    },
    cin: {
      type: "varchar",
      length: 8,
    },
  },
});

module.exports = Patient;
