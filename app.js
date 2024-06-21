const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger/swagger.yaml");

require("dotenv").config();
const connectDatabase = require("./config/db");
const Rendezvous = require("./models/Rendezvous");
const cors = require('cors');


connectDatabase([Rendezvous]);



const client = require('prom-client')



const app = express();

// Enable Prometheus metrics collection
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Create a histogram metric for rendezvous-ms service
const rendezvousRequestDurationMicroseconds = new client.Histogram({
  name: 'rendezvous_request_duration_seconds',
  help: 'Duration of rendezvous-ms service HTTP requests in microseconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

// Register the histogram for rendezvous-ms service
register.registerMetric(rendezvousRequestDurationMicroseconds);

// Middleware to measure request duration for rendezvous-ms service
app.use((req, res, next) => {
  const end = rendezvousRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.url, code: res.statusCode });
  });
  next();
});

// Route to expose Prometheus metrics
app.get('/metrics', async (req, res) => {
  try {
    const metrics = await register.metrics();
    res.set('Content-Type', register.contentType);
    res.end(metrics);
  } catch (error) {
    console.error('Error generating metrics:', error);
    res.status(500).send('Error generating metrics');
  }
});


// Middleware pour analyser le corps des requêtes HTTP
app.use(bodyParser.json());
// Configuration des options CORS
const corsOptions = {
  origin: 'http://localhost:4200', // Remplacez par l'URL de votre application front-end
  methods: 'GET,POST,PUT,DELETE', // Méthodes HTTP autorisées
  allowedHeaders: 'Content-Type, Authorization', // En-têtes autorisés
};
// Middleware pour gérer les requêtes liées aux rendezvouss
app.use(cors(corsOptions));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware to parse request bodies
app.use(bodyParser.json());

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware for handling rendezvous requests
const RendezvousRoutes = require("./Routes/rendezvousRoutes");
app.use("/rendezvous", RendezvousRoutes);

// Server port
const PORT = process.env.PORT || 3003;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
