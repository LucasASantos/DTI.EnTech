const CronJob = require('cron').CronJob;
const pollRepository = require('../data/poll.data');
const techshotRepository = require('../data/techshot.data');
const surveyRepository = require('../data/survey.data');

const job = new CronJob('*/5 * * * * *', async () => {
    surveys = await surveyRepository.find();
    await surveys.forEach(async survey => {

    //     if (Date.parse(survey.surveyEndDate) <= Date.now()) {
    //         var techShots = await techshotRepository.find({
    //             surveyId: survey._id
    //         });

    //         var techshotPolls =new Array();

    //         for(let i = 0; i < techShots.length; i++) {
    //             const ts = techShots[i];
    //             var polls = await pollRepository.find({
    //                 techShotId: ts._id,
    //             }); 
    //             console.log(polls);
                
    //             techshotPolls.push({
    //                 techShot,
    //                 polls,
    //                 coountPolls : polls.length
    //             });
    //         }

    //         console.log(techshotPolls);
    //     }
    // });
    console.log('Rodei ');
}, null, false, 'America/Sao_Paulo');

module.exports = job