import { table } from "console";
import { Knex } from "knex";

const TABLE_NAME = "review";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
     return knex.schema.alterTable(TABLE_NAME, (table) => {
          table.float("rating").unsigned().nullable().alter();
     });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
     return knex.schema.alterTable(TABLE_NAME, (table) => {
          table.float("rating").unsigned().notNullable().alter();
     });
}
