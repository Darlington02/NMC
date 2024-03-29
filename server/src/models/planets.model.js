const { parse } = require("csv-parse")
const fs = require("fs");
const path = require("path")

const habitablePlanets = []

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11
        && planet["koi_prad"] < 1.6
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        let filepath = path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
        fs.createReadStream(filepath)
        .pipe(parse({
            comment: '#',
            columns: true
        }))
        .on('data', (data) => {
            if(isHabitablePlanet(data)) {
                habitablePlanets.push(data)
            }
        })
        .on('error', (error) => {
            console.log(error)
            reject(err)
        })
        .on('end', () => {
            console.log(`There was ${habitablePlanets.length} habitable planets found`)
        })
        resolve()
    })
}

function getAllPlanets() {
    return habitablePlanets;
}

module.exports = {
    loadPlanetsData,
    getAllPlanets
}