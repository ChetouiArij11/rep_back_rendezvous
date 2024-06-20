const { EntitySchema } = require("typeorm");

const Medecin = new EntitySchema({
  name: "Medecin",
  tableName: "medecins",
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
    specialite: {
      type: "varchar",
      length: 255,
    },
    email: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    adresse_cabinet: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    num_telephone: {
      type: "varchar",
      length: 15,
      nullable: true,
    },
    num_fixe_cabinet: {
      type: "varchar",
      length: 15,
      nullable: true,
    },
    password: {
      type: "varchar",
      length: 255,
    },
    cin: {
      type: "varchar",
      length: 8,
    },
  },
});

module.exports = Medecin;
