exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', function(tbl) {
      tbl.increments();  // id
      tbl.string('title', 128)
          .notNullable(); // title
      tbl.string('task', 256); // task
      tbl.string('notes', 256); // extra notes
      tbl.date('setDate'); // set date reminder
      tbl.integer('userId')
          .unsigned()
          .references('id')
          .inTable('users'); // user id that the note belongs to
      tbl.boolean('completed'); // completed y/n
      tbl.timestamps(true, true); // timestamps
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('todos');
};