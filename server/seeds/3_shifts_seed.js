const shiftsSeeds = require('../seed_data/shifts');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('shifts').del()
    .then(function () {
      // Inserts seed entries
      return knex('shifts').insert(shiftsSeeds);
    });
};
