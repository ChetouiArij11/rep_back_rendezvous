const { EntitySchema } = require("typeorm");

const DossierMedical = new EntitySchema({
  name: "DossierMedical",
  tableName: "dossier_medical",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    id_patient: {
      type: "int",
    },
    date_creation: {
      type: "date",
      nullable: true,
    },
  },
  relations: {
    patient: {
      type: "many-to-one",
      target: "Patient",
      joinColumn: { name: "id_patient" },
    },
  },
});

module.exports = DossierMedical;
