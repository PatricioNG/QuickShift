const applicationSeeds = require('../seed_data/applications');
let applicationsCompleted = [];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('applications').del()
    .then(function () {
      // get Shifts ID
      return knex('shifts')
        .pluck('id')
        .then(shiftIDs => {
          return shiftIDs;
        })
    })
    .then(shiftID => {
      applicationsCompleted = applicationSeeds.map(application => {
        application.shift_id = shiftID[Math.floor(Math.random() * shiftID.length)];
        return application;
      })
    })
    .then(() => {
      return knex('users')
        .pluck('id')
        .then(userIDs => {
          return userIDs
        })
    })
    .then(userID => {
      applicationsCompleted = applicationsCompleted.map(application => {
        application.user_id = userID[Math.floor(Math.random() * userID.length)];
        return application;
      })
      return knex('applications').insert(applicationSeeds);
    })
};

