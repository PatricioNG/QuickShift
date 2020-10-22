
exports.up = function (knex) {
    return knex.schema.createTable('messages', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('business_id').unsigned().references('id').inTable('businesses').onUpdate('CASCADE').onDelete('CASCADE');
        table.string('destination').notNullable();
        table.string('message', 2000).notNullable();
        table.timestamp('message_sent').defaultTo(knex.fn.now()).notNullable();
        table.boolean('message_read').notNullable().defaultTo(false);
        table.timestamp('message_read_time')
        table.boolean('is_system_notification').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('messages');
};
