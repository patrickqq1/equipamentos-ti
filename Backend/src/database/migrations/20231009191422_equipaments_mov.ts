import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('equipment_movements', table => {
        table.increments('id').primary();
        table.integer('equipment_id').unsigned();
        table.integer('user_taken_id').unsigned();
        table.integer('user_placed_id').unsigned();
        table.timestamp('movement_date').defaultTo(knex.fn.now());
        table.enum('movement_type', ['Retirada', 'Devolução', 'Manutenção']).notNullable();

        table.foreign('equipment_id').references('id').inTable('equipments');
        table.foreign('user_taken_id').references('id').inTable('users');
        table.foreign('user_placed_id').references('id').inTable('users');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('equipment_movements');
}
