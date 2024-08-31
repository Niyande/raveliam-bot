const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('Resetuj zasoby postaci lub drużyny do maxa')
		.addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci lub nazwa drużyny')
                .setRequired(true)
                .setAutocomplete(true)
        )
	,
    async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
        var database = globals.ReadDatabase();
        var choices = [];
        database.characters.forEach((element) => choices.push(element.name));
        database.enemies.forEach((element) => choices.push(element.name));
        database.teams.forEach((element) => choices.push(element.name));
        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase())).slice(0,25);
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction) {
        await interaction.deferReply();
		var database = globals.ReadDatabase();
        if (!interaction.member.roles.cache.some(role => role.name === 'Konserwator 🤖')) {
            var imgPath = path.join(__dirname, '..', '..', '..', 'images', 'ken-you-not.png');
            await interaction.editReply({ files: [imgPath] });
            return;
        }
        var name = interaction.options.get('imie').value;
        var character = database.characters.filter(
            function(data){ return data.name.toLowerCase() == name.toLowerCase() }
        );
        if (character[0] === undefined){
            var character = database.enemies.filter(
                function(data){ return data.name.toLowerCase() == name.toLowerCase() }
            );
        }
        var team = database.teams.filter(
            function(data){ return data.name.toLowerCase() == name.toLowerCase() }
        );
        if (character[0] === undefined && team[0] === undefined) {
            var message = '```ansi\n[1;31mBrak postaci lub drużyny [1;32m' + name + '[1;31m w bazie[0m\n```'
            interaction.editReply(message);
            return
        }
        else if(character[0] === undefined){
            var message = '```ansi\n[1;34m' + name + ': ';
            for(element of team[0].members){
                character = database.characters.filter(
                    function(data){ return data.name.toLowerCase() == element.toLowerCase()}
                );
                if (character[0] === undefined){
                    var character = database.enemies.filter(
                        function(data){ return data.name.toLowerCase() == element.toLowerCase() }
                    );
                }
                character[0].hp = character[0].max_hp;
                character[0].mana = character[0].max_mana;
                character[0].energy = character[0].max_energy;
                delete character[0].bleeding;
                delete character[0].poison;
                delete character[0].curse;
                delete character[0].stun;
                delete character[0].powalenie;
                delete character[0].krok_w_tyl;
                delete character[0].riposta;
                delete character[0].kac;
                message += '[1;32m' + character[0].name + '[1;37m, ';
            }
            message = message.slice(0, -2) + ' zresetowani\n```';
        }
        else{
            character[0].hp = character[0].max_hp;
            character[0].mana = character[0].max_mana;
            character[0].energy = character[0].max_energy;
            delete character[0].bleeding;
            delete character[0].poison;
            delete character[0].curse;
            var message = '```ansi\n[1;32m' + name + '[1;37m zresetowanx[0m\n```'
        }
        
        globals.SaveFile(JSON.stringify(database));

        
		
		await interaction.editReply(message);
	},
};