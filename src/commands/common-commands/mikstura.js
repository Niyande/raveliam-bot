const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mikstura')
		.setDescription('Użyj mikstury')
		.addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('mikstura')
                .setDescription('Rodzaj mikstury')
                .setRequired(true)
                .addChoices(
                    {name:'Słaba mikstura lecząca', value:'weak_heal'},
                    {name:'Silna mikstura lecząca', value:'strong_heal'},
                    {name:'Słaba mikstura wzmacniająca', value:'weak_energy'},
                    {name:'Silna mikstura wzmacniająca', value:'strong_energy'},
                    {name:'Antidotum', value:'antidote'},
                )
        )
	,
    async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
        var database = globals.ReadDatabase();
        var choices = [];
        database.characters.forEach((element) => choices.push(element.name));
        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase())).slice(0,25);
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction) {
        await interaction.deferReply();
		var database = globals.ReadDatabase();
        var name = interaction.options.get('imie').value;
        var potion = interaction.options.get('mikstura').value;

        var character = database.characters.filter(
            function(data){ return data.name.toLowerCase() == name.toLowerCase() }
        );
        if (character[0] === undefined) {
            var character = database.enemies.filter(
                function(data){ return data.name.toLowerCase() == name.toLowerCase() }
            );
            if (character[0] === undefined) {
                var message = '```ansi\n[1;31mBrak postaci [1;32m' + name + '[0m[1;31m w bazie[0m\n```'
                await interaction.editReply(message);
                return
            }
        }

        switch(potion){
            case 'weak_heal':
                var heal = globals.getRandomInt(6);
                character[0].hp += heal;
                character[0].hp = Math.min(character[0].hp, character[0].max_hp);
                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m otrzymuje [1;31m' + heal + ' PZ\nPZ: ' + character[0].hp + '/' + character[0].max_hp + '[0m\n```';
                break;
            case 'strong_heal':
                var heal = globals.getRandomInt(12);
                character[0].hp += heal;
                character[0].hp = Math.min(character[0].hp, character[0].max_hp);
                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m otrzymuje [1;31m' + heal + ' PZ\nPZ: ' + character[0].hp + '/' + character[0].max_hp + '[0m\n```';
                break;
            case 'weak_energy':
                var energy = globals.getRandomInt(6);
                character[0].energy += energy;
                character[0].energy = Math.min(character[0].energy, character[0].max_energy);
                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m otrzymuje [1;36m' + energy + ' Kondycji\nKondycja: ' + character[0].energy + '/' + character[0].max_energy + '[0m\n```';
                break;
            case 'strong_energy':
                var energy = globals.getRandomInt(12);
                character[0].energy += energy;
                character[0].energy = Math.min(character[0].energy, character[0].max_energy);
                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m otrzymuje [1;36m' + energy + ' Kondycji\nKondycja: ' + character[0].energy + '/' + character[0].max_energy + '[0m\n```';
                break;
            case 'antidote':
                delete character[0].poison;
                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m pozbywa się[1;31m trucizny [0m\n```';
                break;
        }

		globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};