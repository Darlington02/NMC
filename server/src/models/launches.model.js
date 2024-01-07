const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration',
    rocket: 'Explorer IS1',
    launchDate: new Date("December 27, 2023"),
    target: 'Kepler-442 b',
    customer: ['ZTM'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

let latestFlightNumber = launch.flightNumber + 1;

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

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

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById
}