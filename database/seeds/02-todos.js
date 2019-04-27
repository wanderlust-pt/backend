exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('todos')
		.truncate() // resets id so it can be used again(basically a super delete)
		.then(function() {
			// Inserts seed entries
			return knex('todos').insert([
				{
					id: 1,
					title: 'test todo',
					task: 'more todo test',
					notes: 'extra content',
					completed: true,
					userId: 4
				}
			]);
		});
};
