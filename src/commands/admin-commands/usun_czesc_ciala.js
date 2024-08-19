const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('usun_czesc_ciala')
		.setDescription('usuwa wrogu część ciała')
		.addStringOption(option =>
            option
                .setName('nazwa')
                .setDescription('Nazwa wroga')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('czesc')
                .setDescription('Nazwa części ciała')
                .setRequired(true)
                .setAutocomplete(true)
        )
    ,
    async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
        var database = globals.ReadDatabase();
        var choices = [];
        if(focusedOption.name === 'nazwa'){
            database.enemies.forEach((element) => choices.push(element.name));
        } else if(focusedOption.name === 'czesc'){
            var target = interaction.options.get('nazwa').value;
            var enemy = database.enemies.filter(
                function(data){ return data.name.toLowerCase() == target.toLowerCase() }
            );
            enemy[0].body_parts.forEach((element) => choices.push(element));
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
        var body_part = interaction.options.get('czesc').value;
        var target = interaction.options.get('nazwa').value;

        var enemy = database.enemies.filter(
            function(data){ return data.name.toLowerCase() == target.toLowerCase() }
        );
        if (enemy[0] === undefined) {
            var message = '```ansi\n[1;31mBrak wroga [1;32m' + target + '[0m[1;31m w bazie[0m\n```'
            await interaction.editReply(message);
            return
        }

        eval('delete enemy[0].' + body_part)
        enemy[0].body_parts.splice(enemy[0].body_parts.indexOf(body_part), 1);

        var message = '```ansi\n[1;32m' + enemy[0].name + '[1;37m traci ' + body_part + '\n```';

		globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};