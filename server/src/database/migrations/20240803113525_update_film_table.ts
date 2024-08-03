import { Knex } from "knex";

const TABLE_NAME = "film";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
     return knex.schema.alterTable(TABLE_NAME, (table) => {
          table.string("poster_url", 200).notNullable().alter();

          table.string("backdrop_url", 200).notNullable().alter();
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
          table.string("poster_url", 50).notNullable().alter();

          table.string("backdrop_url", 50).notNullable().alter();
     });
}
