const businessSeeds = require('../seed_data/businesses');
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('businesses').del()
    .then(function () {
      // Inserts seed entries
      return knex('businesses').insert(businessSeeds);
    });
};
