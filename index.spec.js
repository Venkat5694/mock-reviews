const ACTIONS = require('./index');

it('--- Test addUser', () => {
    expect(ACTIONS.addUser('Venkat')).resolves.toBe('User Venkat has been succesfully created');
    expect(ACTIONS.addUser('Venkat')).rejects.toBe('User already exists.');
});

it('--- Test addMovie', () => {
    expect.assertions(1);
    expect(ACTIONS.addMovie('', '2006', ['Action', 'Comedy'])).rejects.toBe('Title cannot be empty.');
    expect(ACTIONS.addMovie('Don', '20', ['Action', 'Comedy'])).rejects.toBe('Year must be of the format YYYY.');
    //ACTIONS.addMovie('Don', '20', ['Action', 'Comedy']).then().catch(err => expect(err).toEqual('Year must be of the format YYYY.'));
    expect(ACTIONS.addMovie('Don', '2006', ['Action', 'Comedy'])).resolves.toBe('User Venkat has been succesfully created');
    expect(ACTIONS.addMovie('Don', '2006', ['Action', 'Comedy'])).rejects.toBe('User already exists');
});