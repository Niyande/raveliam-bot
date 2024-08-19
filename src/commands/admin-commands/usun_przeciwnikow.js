const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');
const { channel } = require('node:diagnostics_channel');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('usun_przeciwnikow')
		.setDescription('Usuń przeciwników z drużyny po walce')
		.addStringOption(option =>
            option
                .setName('druzyna')
                .setDescription('Nazwa drużyny')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('druzyna_przeciwnikow')
                .setDescription('Nazwa drużyny przeciwników')
                .setRequired(true)
                .setAutocomplete(true)
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
        var enemy_team_name = interaction.options.get('druzyna_przeciwnikow').value;

        var team = database.teams.filter(
            function(data){ return data.name.toLowerCase() == team_name.toLowerCase() }
        );
        //check if team exists
        if (team[0] === undefined) {
            var message = '```ansi\n[1;31mBrak drużyny [1;34m' + team_name + '[0m[1;31m w bazie[0m\n```'
            await interaction.editReply(message);
            return;
        }
        var enemy_team = database.teams.filter(
            function(data){ return data.name.toLowerCase() == enemy_team_name.toLowerCase() }
        );
        //check if team exists
        if (enemy_team[0] === undefined) {
            var message = '```ansi\n[1;31mBrak drużyny [1;34m' + team_name + '[0m[1;31m w bazie[0m\n```'
            await interaction.editReply(message);
            return;
        }

        for(element of enemy_team[0].members){
            var enemy = database.enemies.filter(
                function(data){ return data.name.toLowerCase() == element.toLowerCase() }
            );
            if (enemy[0] === undefined) {
                var enemy = database.characters.filter(
                    function(data){ return data.name.toLowerCase() == element.toLowerCase() }
                );
            }
            enemy[0].team = enemy_team[0].name;

            team[0].members.splice(team[0].members.indexOf(element), 1);
        }

        var message = '```ansi\n[1;37mUsunięto przeciwników [1;34m' + enemy_team[0].name + '[1;37m z drużyny [1;34m' + team[0].name + '\n```';
		
        globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};