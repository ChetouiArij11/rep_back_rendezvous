const request = require('supertest');
const app = require('../app'); // Assurez-vous que le chemin vers votre app.js est correct
const connectDatabase = require('../config/db'); // Assurez-vous que le chemin vers votre db.js est correct

let connection;

beforeAll(async () => {
  connection = await connectDatabase(); // Connexion à la base de données avant les tests
}, 10000); // Augmente le timeout à 10 secondes

afterAll(async () => {
  if (connection) {
    await connection.close(); // Fermez la connexion après les tests
  }
});

describe('Rendezvous API', () => {
  let createdRendezvousId;

  it('should get all rendezvous', async () => {
    const res = await request(app).get('/rendezvous');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('length');
  });


});
