
exports.up = function (knex) {
    return knex.schema.createTable('businesses', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('type');
        table.string('business_email').unique().notNullable();
        table.string('street_address');
        table.string('postal_code');
        table.string('city');
        table.string('province');
        table.string('country');
        table.string('logo_link');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('businesses');
};
