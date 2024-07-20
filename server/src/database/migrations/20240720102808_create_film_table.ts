import { Knex } from "knex";

const TABLE_NAME = "film";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
     return knex.schema.createTable(TABLE_NAME, (table) => {
          table.bigIncrements();

          table.bigInteger("film_id").notNullable();
          table.string("title", 100).notNullable();
          table.string("poster_url", 50).notNullable();
          table.string("backdrop_url", 50).notNullable();
          table.date("release_date").notNullable();
          table.bigInteger("rating_count").nullable();
          table.float("rating").nullable();
          table.string("trailer", 50).nullable();
          table.float("popularity").notNullable();
          table.string("overview", 1000).notNullable();

          table.timestamp("created_at")
               .notNullable()
               .defaultTo(knex.raw("now()"));

          table.bigInteger("created_by")
               .unsigned()
               .nullable()
               .references("id")
               .inTable("user");

          table.timestamp("updated_at").nullable();
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
