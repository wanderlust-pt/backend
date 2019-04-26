
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', table => {
      table.increments(); // id
      table.string('title', 128) // title limited to 128 characters
        .notNullable(); // title has to be filled
      table.string('task', 256); // task limited to 256 characters
      table.string('notes', 256); // extra notes limited to 256 characters
      table.date('setDate'); // set date reminder
      table.integer('userId')
            .unsigned()
            .references('id')
            .inTable('users'); // user id that the note belongs to
      table.boolean('completed'); // checks if todo is completed with a yes or no
      table.timestamps(true, true); // timestamps
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('todos');
};
