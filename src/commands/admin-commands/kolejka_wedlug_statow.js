const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kolejka_wedlug_statow')
		.setDescription('Ustaw kolejkę według statów')
		.addStringOption(option =>
            option
                .setName('druzyna')
                .setDescription('Nazwa druzyny')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('statystyka')
                .setDescription('Nazwa stytystyki')
                .setRequired(true)
                .addChoices(
                    { name: 'Siła', value: 'sila' },
                    { name: 'Zręczność', value: 'zrecznosc' },
                    { name: 'Precyzja', value: 'precyzja' },
                    { name: 'Wytrzymałość', value: 'wytrzymalosc' },
                    { name: 'Wola', value: 'wola' },
                    { name: 'Inteligencja', value: 'inteligencja' },
                    { name: 'Retoryka', value: 'retoryka' },
                    { name: 'Fortuna', value: 'fortuna' },
                )
        )
	,
    async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
        var database = globals.ReadDatabase();
        var choices = [];
        if(focusedOption.name === 'druzyna') {
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
        var team_name = interaction.options.get('druzyna').value;
        var stat = interaction.options.get('statystyka').value;

        var team = database.teams.filter(
            function(data){ return data.name.toLowerCase() == team_name.toLowerCase() }
        );
        if (team[0] === undefined) {
            var message = '```ansi\n[1;31mBrak drużyny [1;34m' + team_name + '[1;31m w bazie[0m\n```'
            await interaction.editReply(message);
            return;
        }
        
        team[0].members.sort((name_a, name_b) =>{
            var character_a = database.characters.filter(
                function(data){ return data.name.toLowerCase() == name_a.toLowerCase() }
            );
            if (character_a[0] === undefined) {
                var character_a = database.enemies.filter(
                    function(data){ return data.name.toLowerCase() == name_a.toLowerCase() }
                );
            }
            var character_b = database.characters.filter(
                function(data){ return data.name.toLowerCase() == name_b.toLowerCase() }
            );
            if (character_b[0] === undefined) {
                var character_b = database.enemies.filter(
                    function(data){ return data.name.toLowerCase() == name_b.toLowerCase() }
                );
            }

            return eval('character_b[0].' + stat + '-' + 'character_a[0].' + stat);
        })


        var message = '```ansi\n[1;37mNowa kolejność drużyny [1;34m' + team[0].name + ':\n';
        let i = 1;
        for(character_name of team[0].members){
            message += '[1;37m' + i + '. [1;32m' + character_name + '\n';
            i++;
        }
        message += '```'
		
        globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};