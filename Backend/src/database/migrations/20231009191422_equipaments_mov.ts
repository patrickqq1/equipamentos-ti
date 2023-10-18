import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('equipment_movements', table => {
        table.increments('id').primary();
        table.integer('equipment_id').unsigned();
        table.string('reason', 255).notNullable()
        table.timestamp('movement_date').defaultTo(knex.fn.now());
        table.enum('movement_type', ['Retirada', 'Acrescimo']).notNullable();
        table.decimal('quantity_out', 15, 2).notNullable().defaultTo(0); // Nova coluna: Quantidade que saiu
        table.decimal('quantity_in', 15, 2).notNullable().defaultTo(0);  // Nova coluna: Quantidade que entrou
        table.integer("user_id").unsigned()
        table.foreign('equipment_id').references('id').inTable('equipments');
        table.foreign('user_id').references('id').inTable('users');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('equipment_movements');
}
