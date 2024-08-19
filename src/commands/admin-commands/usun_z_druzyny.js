const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('usun_z_druzyny')
		.setDescription('Usuń postać z druyżyny')
		.addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci')
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
        else if(focusedOption.name === 'nazwa') {
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
        //look for character in teams
        var in_team = false;
        var message = '```ansi'
        for(element of database.teams){
            if (element.members.includes(character[0].name)){
                element.members.splice(element.members.indexOf(character[0].name), 1);
                message += '\n[1;37mUsunięto [1;32m' + name + '[1;37m z drużyny [1;34m' + element.name;
                in_team = true;
            }
        }
        message += '[0m\n```';
        delete character[0].team;

        if(!in_team){
            var message = '```ansi\n[1;32m' + name + '[1;37m nie jest w żadnej drużynie[0m\n```'
        }
        
        globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};