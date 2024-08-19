const { SlashCommandBuilder, ShardEvents } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dodaj_tarcze')
		.setDescription('Dodaj postaci tarczę')
		.addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('tarcza')
                .setDescription('tarcza którą otrzyma postać')
                .setRequired(true)
                .setAutocomplete(true)
        )
	,
    async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
        var database = globals.ReadDatabase();
        var shields = globals.ReadWeaponDatabase().shields;
        var choices = [];
        if(focusedOption.name === 'imie'){
            database.characters.forEach((element) => choices.push(element.name));
            database.enemies.forEach((element) => choices.push(element.name));
        } else if(focusedOption.name === 'tarcza'){
            shields.forEach((element) => choices.push(element.display_name));
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
        var shields = globals.ReadWeaponDatabase().shields;
        var name = interaction.options.get('imie').value;
        var shield_name = interaction.options.get('tarcza').value;

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

        var shield = shields.filter(
            function(data){ return data.display_name.toLowerCase() == shield_name.toLowerCase() }
        );
        if (shield[0] === undefined) {
            var message = '```ansi\n[1;31mBrak tarczy [1;35m' + shield_name + '[0m[1;31m w bazie[0m\n```'
            await interaction.editReply(message);
            return
        }


        character[0].shield = { name: shield[0].name, display_name: shield[0].display_name, durability: shield[0].durability};
        var message = '```ansi\n[1;32m' + character[0].name + '[1;37m otrzymuje ' + shield[0].display_name + '[0m\n```';
		globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};