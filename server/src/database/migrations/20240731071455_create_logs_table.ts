import { Knex } from "knex";

const TABLE_NAME = "logs";

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
               .unsigned()
               .notNullable()
               .references("id")
               .inTable("user");

          table.bigInteger("film_id")
               .unsigned()
               .notNullable()
               .references("id")
               .inTable("film");

          table.bigInteger("review_id")
               .unsigned()
               .nullable()
               .references("id")
               .inTable("review");

          table.boolean("like_status").notNullable();

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
