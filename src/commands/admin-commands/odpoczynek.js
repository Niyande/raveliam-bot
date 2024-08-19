const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');
const { channel } = require('node:diagnostics_channel');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('odpoczynek')
		.setDescription('Dodaj drużynie kondycję')
		.addStringOption(option =>
            option
                .setName('druzyna')
                .setDescription('Nazwa druzyny')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addNumberOption(option =>
            option
                .setName('kondycja')
                .setDescription('Ilość dodanej kondycji')
                .setRequired(true)
        )
	,
    async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
        var database = globals.ReadDatabase();
        var choices = [];
        database.teams.forEach((element) => choices.push(element.name));
        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase())).slice(0,25);
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction) {
        await interaction.deferReply();
        if (!interaction.member.roles.cache.some(role => role.name === 'Konserwator 🤖')) {
            var imgPath = path.join(__dirname, '..', '..', '..', 'images', 'ken-you-not.png');
            await interaction.editReply({ files: [imgPath] });
            return;
        }
		var database = globals.ReadDatabase();
        var team_name = interaction.options.get('druzyna').value;
        var energy = interaction.options.get('kondycja').value;

        var team = database.teams.filter(
            function(data){ return data.name.toLowerCase() == team_name.toLowerCase() }
        );
        //check if team exists
        if (team[0] === undefined) {
            var message = '```ansi\n[1;31mBrak drużyny [1;34m' + team_name + '[0m[1;31m w bazie[0m\n```'
            await interaction.editReply(message);
            return;
        }
        var message = '```ansi\n[1;37mOdpoczynek drużyny [1;34m' + team[0].name + '[1;37m. Dodano [1;36m' + energy + ' kondycji\n\n';
        for(element of team[0].members){
            character = database.characters.filter(
                function(data){ return data.name.toLowerCase() == element.toLowerCase()}
            );
            character[0].energy += energy;
            character[0].energy = Math.min(character[0].energy, character[0].max_energy);

            message += '[1;32m' + character[0].name + ' [1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy + '\n';
            
        }
        message += '```'
		
        globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};