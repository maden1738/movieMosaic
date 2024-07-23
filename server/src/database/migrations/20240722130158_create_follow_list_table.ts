import { Knex } from "knex";

const TABLE_NAME = "follow_list";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
     return knex.schema.createTable(TABLE_NAME, (table) => {
          table.bigIncrements();

          table.bigInteger("user_id")
               .notNullable()
               .references("id")
               .inTable("user");

          table.bigInteger("following_id")
               .notNullable()
               .references("id")
               .inTable("user");

          table.timestamp("created_at")
               .notNullable()
               .defaultTo(knex.raw("now()"));
     });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
     return knex.schema.dropTable(TABLE_NAME);
}
