const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dodaj_do_druzyny')
		.setDescription('Dodaj postać do druyżyny')
		.addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('druzyna')
                .setDescription('Nazwa drużyny')
                .setRequired(true)
                .setAutocomplete(true)
        )
	,
    async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
        var database = globals.ReadDatabase();
        var choices = [];
        if(focusedOption.name === 'imie') {
            database.characters.forEach((element) => choices.push(element.name));
            database.enemies.forEach((element) => choices.push(element.name));
        }
        else if(focusedOption.name === 'druzyna') {
            database.teams.forEach((element) => choices.push(element.name));
        }
        
        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedOption.value.toLowerCase())).slice(0,25);
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
        var name = interaction.options.get('imie').value;
        var team_name = interaction.options.get('druzyna').value;

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
        var team = database.teams.filter(
            function(data){ return data.name.toLowerCase() == team_name.toLowerCase() }
        );
        //check if team exists
        if (team[0] === undefined) {
            var message = '```ansi\n[1;31mBrak drużyny [1;34m' + team_name + '[1;31m w bazie[0m\n```'
            await interaction.editReply(message);
            return;
        }
        //check if character is already in a team
        for(element of database.teams){
            if (element.members.includes(character[0].name)){
                var message = '```ansi\n[1;31mPostać [1;32m' + name + '[1;31m jest już w drużynie [1;34m' + element.name + '[0m\n```';
                interaction.editReply(message);
                return;
            }
        }
        
        team[0].members.push(character[0].name);
        character[0].team = team[0].name;
        
        globals.SaveFile(JSON.stringify(database));
        var message = '```ansi\n[1;37mDodano [1;32m' + name + '[1;37m do [1;34m' + team_name + '[0m\n```';
		await interaction.editReply(message);
	},
};