
exports.up = function (knex) {
    return knex.schema.createTable('applications', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('shift_id').unsigned().references('id').inTable('shifts').onUpdate('CASCADE').onDelete('CASCADE');
        table.timestamp('applied_on').defaultTo(knex.fn.now());
        table.string('application_message', 500);
        table.boolean('accepted').defaultTo(false);
        table.boolean('reviewed').defaultTo(false);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('applications');
};
