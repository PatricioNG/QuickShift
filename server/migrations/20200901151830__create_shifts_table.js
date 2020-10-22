
exports.up = function (knex) {
    return knex.schema.createTable('shifts', table => {
        table.increments('id').primary();
        table.integer('business_id').unsigned().notNullable().references('id').inTable('businesses').onUpdate('CASCADE').onDelete('CASCADE');
        table.datetime('start_time').notNullable();
        table.datetime('end_time').notNullable();
        table.string('role').notNullable();
        table.decimal('rate').notNullable();
        table.decimal('posting_fee').notNullable().defaultTo(2.99);
        table.boolean('pending').notNullable().defaultTo(true);
    })

};

exports.down = function (knex) {
    return knex.schema.dropTable('shifts');
};
