const CronJob = require('cron').CronJob;
const pollRepository = require('../data/poll.data');
const techshotRepository = require('../data/techshot.data');
const surveyRepository = require('../data/survey.data');
const eventRepository = require('../data/event.data');


function compare(a, b) {
    if (a.countPolls > b.countPolls) {
        return -1;
    }
    if (a.countPolls < b.countPolls) {
        return 1;
    }
    return 0;
}

const getTechShots = async (surveyId) => {
    return await techshotRepository.find({
        "surveyId": surveyId.toString()
    });
}

const getPolls = async () => {
    return await pollRepository.find();
}

const updateSurvey = async (survey) => {
    return await surveyRepository.updateOne({
        _id: survey.id
    }, survey);
}

const mapPollsToTechShot = (techShots, polls) => {
    return techShots.map(ts => {
        var pollsFilter = polls.filter(poll => poll.techShotId == ts.id);

        return {
            ts,
            countPolls: pollsFilter.length
        }
    })
}
const techShotOrganize = async () => {
    return await surveys.forEach(async survey => {
        if (!survey.process && Date.parse(survey.surveyEndDate) <= Date.now()) {

            var techShots = await getTechShots(survey._id);
            console.log(techShots);
            

            if (techShots[0] && techShots.length > survey.numberWinners) {
                var polls = await getPolls();

                var techshotPolls = await mapPollsToTechShot(techShots, polls);

                techshotPolls = techshotPolls.sort(compare);

                var event = {
                    title: survey.title,
                    date: survey.date,
                    startTime: survey.startTime,
                    endTime: survey.endTime,
                    address: survey.address,
                    city: survey.city,
                    userId: survey.userId,
                    state: survey.state,
                    techshots: [],
                    photoURL: survey.photoURL
                }

                for (let i = 0; i < survey.numberWinners; i++) {
                    event.techshots.push(techshotPolls[i].ts)
                }

                survey.process = true;

                await updateSurvey(survey);

                await eventRepository.create(event);

            }
        }
    });
}

const job = new CronJob('* 0 0 * * *', async () => {
    try {
        console.log("Job start");
        surveys = await surveyRepository.find();
        await techShotOrganize();
        console.log("Job finished ");
    } catch (err) {
        console.log(err);
        
    }


}, null, false, 'America/Sao_Paulo');

module.exports = job;
