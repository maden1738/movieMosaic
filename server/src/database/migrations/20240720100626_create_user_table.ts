import { Knex } from "knex";

const TABLE_NAME = "user";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
     return knex.schema.createTable(TABLE_NAME, (table) => {
          table.bigIncrements();

          table.string("name", 15).notNullable();
          table.string("email", 50).notNullable();
          table.string("password", 100).notNullable();
          table.string("avatar_url", 50).nullable();
          table.string("bio", 50).nullable();

          table.timestamp("created_at")
               .notNullable()
               .defaultTo(knex.raw("now()"));

          table.bigInteger("created_by")
               .unsigned()
               .nullable()
               .references("id")
               .inTable(TABLE_NAME);

          table.timestamp("updated_at").nullable();

          table.bigInteger("updated_by")
               .unsigned()
               .references("id")
               .inTable(TABLE_NAME)
               .nullable();
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
