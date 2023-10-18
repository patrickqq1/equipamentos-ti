import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('equipments', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.date('acquisition_date');
        table.decimal('value', 15, 2).notNullable();
        table.integer('added_by').unsigned();
        table.integer('quantity_total').notNullable().defaultTo(0);
        table.integer('quantity_in_stock').notNullable().defaultTo(0);
        table.foreign('added_by').references('id').inTable('users');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('equipments');
}
