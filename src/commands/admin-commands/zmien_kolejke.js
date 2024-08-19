const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('zmien_kolejke')
		.setDescription('Zmienia koleność kolejki w drużynie')
		.addStringOption(option =>
            option
                .setName('druzyna')
                .setDescription('Nazwa druzyny')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_1')
                .setDescription('1 postać w kolejce')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_2')
                .setDescription('2 postać w kolejce')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_3')
                .setDescription('3 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_4')
                .setDescription('4 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_5')
                .setDescription('5 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_6')
                .setDescription('6 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_7')
                .setDescription('7 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_8')
                .setDescription('8 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_9')
                .setDescription('9 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_10')
                .setDescription('10 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_11')
                .setDescription('11 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_12')
                .setDescription('12 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_13')
                .setDescription('13 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_14')
                .setDescription('14 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_15')
                .setDescription('15 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_16')
                .setDescription('16 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_17')
                .setDescription('17 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_18')
                .setDescription('18 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_19')
                .setDescription('19 postać w kolejce')
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('postac_20')
                .setDescription('20 postać w kolejce')
                .setAutocomplete(true)
        )
	,
    async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
        var database = globals.ReadDatabase();
        var choices = [];
        if(focusedOption.name.includes('postac')) {
            var team_name = interaction.options.get('druzyna').value;
            var team = database.teams.filter(
                function(data){ return data.name.toLowerCase() == team_name.toLowerCase() }
            );
            choices = team[0].members;
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
        var team_name = interaction.options.get('druzyna').value;

        var team = database.teams.filter(
            function(data){ return data.name.toLowerCase() == team_name.toLowerCase() }
        );
        if (team[0] === undefined) {
            var message = '```ansi\n[1;31mBrak drużyny [1;34m' + team_name + '[1;31m w bazie[0m\n```'
            await interaction.editReply(message);
            return;
        }

        var names = [];
        for (let i = 1; i < 21; i++){
            if(interaction.options.get('postac_' + i)){
                var name = interaction.options.get('postac_' + i).value;

                if (names.includes(name) || !team[0].members.includes(name)){
                    var message = '```ansi\n[1;31mPodaj każdą postać z drużyny jeden raz\n```';
                    await interaction.editReply(message);
                    return;
                }
                names.push(name);
            }
        }
        if(names.length != team[0].members.length){
            var message = '```ansi\n[1;31mPodaj każdą postać z drużyny jeden raz\n```';
            await interaction.editReply(message);
            return;
        }
        
        team[0].members = names;

        var message = '```ansi\n[1;37mNowa kolejność drużyny [1;34m' + team[0].name + ':\n';
        let i = 1;
        for(name of names){
            message += '[1;37m' + i + '. [1;32m' + name + '\n';
            i++;
        }
        message += '```'
		
        globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};