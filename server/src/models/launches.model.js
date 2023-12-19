const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration',
    rocket: 'Explorer IS1',
    launchData: new Date("December 27, 2030"),
    destination: 'Kepler-442 b',
    customer: ['ZTM'],
    upcoming: true,
    success: true,
};

let latestFlightNumber = launch.flightNumber + 1;

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    launches.set(latestFlightNumber, Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'Nasa'],
        flightNumber: latestFlightNumber,
    }));
}

module.exports = {
    getAllLaunches,
    addNewLaunch
}