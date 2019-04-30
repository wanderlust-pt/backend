exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('todos').truncate() // deletes and resets id so it can be used again
	  .then(function () {
		// Inserts seed entries
		return knex('todos').insert([
		  {id: 1, title: 'test todo', task: 'more todo test', notes: 'extra todo content', completed: false, userId: 1},
		  {id: 2, title: 'test todo', task: 'more todo test', notes: 'extra todo content', completed: false, userId: 1},
		  {id: 3, title: 'test todo', task: 'more todo test', notes: 'extra todo content', completed: false, userId: 1}
		]);
	  });
  };