const { getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById } = require("../../models/launches.model")

async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property',
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if(launch.launchDate.toString() === 'Invalid Date') {
        return res.status(400).json({
            error: 'Invalid Date',
        })
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    const launchId = +req.params.id;
    const existsLaunch = await existsLaunchWithId(launchId)
    if(!existsLaunch){
        return res.status(404).json({
            error: 'Launch not found'
        })
    }
    else {
        const aborted = abortLaunchById(launchId);
        if(!aborted) {
            return res.status(400).json({
                error: 'Launch not aborted',
            });
        }

        return res.status(200).json({
            ok: true,
        })
    }
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
};