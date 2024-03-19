$(document).ready(function() {
    $('#customActivityForm').submit(function(event) {
        event.preventDefault();
        var pokemonName = $('#pokemonName').val();
        execute(pokemonName);
    });
});

function execute(pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const pokemonId = data.id;
            const pokemonName = data.name;
            addToJourneyData(pokemonName, pokemonId);
            alert('Pokemon data retrieved and stored successfully!');
        })
        .catch(error => {
            console.error('Error fetching data from PokeApi:', error);
            alert('Failed to retrieve Pokemon data. Please make sure the Pokemon name is correct and try again.');
        });
}

function addToJourneyData(name, id) {
    var eventData = {
        'PokemonName': name,
        'PokemonID': id
    };
    injectEventData(eventData);
}

function injectEventData(eventData) {
    payload = {};
    payload['arguments'] = payload['arguments'] || {};
    payload['arguments'].execute = payload['arguments'].execute || {};
    payload['arguments'].execute['inArguments'] = [eventData];
    payload['metaData'] = {};
    payload['metaData'].isConfigured = false;

    connection.trigger('updateActivity', payload);
}
