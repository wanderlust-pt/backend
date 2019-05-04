exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments(); // user id
        table.string('username', 128)
            .notNullable()
            .unique(); // username, cant be null & has to be unique
        table.string('password')
            .notNullable(); // password, cant be null
        table.timestamps(true, true); // timestamps: created, updated
    })
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
