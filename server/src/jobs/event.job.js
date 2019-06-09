const CronJob = require('cron').CronJob;
const pollRepository = require('../data/poll.data');
const techshotRepository = require('../data/techshot.data');
const surveyRepository = require('../data/survey.data');

const getTechShots = async (surveyId) => {
    return await techshotRepository.find({
        "surveyId": surveyId.toString()
    });
}

const getPolls = async () => {
    return await pollRepository.find(); 
}

const mapPollsToTechShot = (techShots, polls) => {
   return techShots.map ( ts => {
        var pollsFilter = polls.filter(poll => poll.techShotId == ts.id);

        return {
            ts,
            countPolls: pollsFilter.length
        }
    })
}
const techShotOrganize = async () => {
    return await surveys.forEach(async survey => {
        if (Date.parse(survey.surveyEndDate) >= Date.now()) {

            var techShots = await getTechShots (survey._id);

            var polls = await getPolls();

            var techshotPolls = await mapPollsToTechShot(techShots, polls);

            console.log('techshotPolls', techshotPolls)
        }
     });
}

const job = new CronJob('*/5 * * * * *', async () => {
    surveys = await surveyRepository.find();
    await techShotOrganize();
    
}, null, false, 'America/Sao_Paulo');

module.exports = job;
