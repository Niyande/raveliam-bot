const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('przygotuj')
		.setDescription('Przygotuj umiejętność')
		.addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('umiejetnosc')
                .setDescription('Nazwa umiejętności')
                .setRequired(true)
                .addChoices(
                    {name: 'przeszywająca strzała', value: 'przeszywajaca_strzala'},
                    {name: 'snajperski strzał', value: 'snajperski_strzal'},
                )
        )
	,
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        var database = globals.ReadDatabase();
        var choices = [];
        database.characters.forEach((element) => choices.push(element.name));
        database.enemies.forEach((element) => choices.push(element.name));
        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase())).slice(0,25);
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction) {
        await interaction.deferReply();
		var database = globals.ReadDatabase();
        var name = interaction.options.get('imie').value;
        var ability = interaction.options.get('umiejetnosc').value;

        var character = database.characters.filter(
            function(data){ return data.name.toLowerCase() == name.toLowerCase() }
        );
        if (character[0] === undefined) {
            var character = database.enemies.filter(
                function(data){ return data.name.toLowerCase() == name.toLowerCase() }
            );
            if (character[0] === undefined) {
                var message = '```ansi\n[1;31mBrak postaci [1;32m' + name + '[1;31m w bazie[0m\n```'
                await interaction.editReply(message);
                return
            }
        }

        var message = '```ansi\n[1;32m' + character[0].name + '[1;37m przygotowuje [1;34m';
        switch(ability){
            case 'przeszywajaca_strzala':
                message += 'Przeszywającą strzałę';
                character[0].ready = {przeszywajaca_strzala: 1};
                break;
            case 'snajperski_strzal':
                message += 'Snajperski strzał '
                if(Object.hasOwn(character[0].ready, 'snajperski_strzal')){
                    if(character[0].ready.snajperski_strzal > 1){
                        var message = '```ansi\n[1;32m' + character[0].name + '[1;31m już ma przygotowany[1;34m Snajperski strzał [0m\n```'
                        await interaction.editReply(message);
                        return
                    }
                    else character[0].ready.snajperski_strzal += 1;
                }
                else character[0].ready = {snajperski_strzal: 1};
                message += character[0].ready.snajperski_strzal + '/2';
                break;
        }
        message += '[0m\n```'
		globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};