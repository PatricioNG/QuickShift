
exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('first_name', 50).notNullable();
        table.string('last_name', 50).notNullable();
        table.string('email').unique().notNullable();
        table.timestamp('registration_date').defaultTo(knex.fn.now());
        table.string('profile_image_link');
        table.boolean('new_user').notNullable().defaultTo(true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
