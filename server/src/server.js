const http = require("http");
const mongoose = require("mongoose");
require('dotenv').config();

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model")

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

mongoose.connection.once('open', () => {
    console.log('Mongo is ready');
});

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function startServer() {
    await mongoose.connect(process.env.MONGO_DB);
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();
