const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('usun_bron')
		.setDescription('Usuń postaci broń')
		.addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('bron')
                .setDescription('broń do usunięcia')
                .setRequired(true)
                .setAutocomplete(true)
        )
	,
    async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
        var database = globals.ReadDatabase();
        var weapons = globals.ReadWeaponDatabase().weapons;
        var choices = [];
        if(focusedOption.name === 'imie'){
            database.characters.forEach((element) => choices.push(element.name));
            database.enemies.forEach((element) => choices.push(element.name));
        } else if(focusedOption.name === 'bron'){
            var name = interaction.options.get('imie').value;
            var character = database.characters.filter(
                function(data){ return data.name.toLowerCase() == name.toLowerCase() }
            );
            if (character[0] === undefined) {
                var character = database.enemies.filter(
                    function(data){ return data.name.toLowerCase() == name.toLowerCase() }
                );
            }
            character[0].weapons.forEach((weapon_name) =>{
                var weapon = weapons.filter(
                    function(data){ return data.name.toLowerCase() == weapon_name.toLowerCase() }
                );
                choices.push(weapon[0].display_name)
            });
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
        var weapons = globals.ReadWeaponDatabase().weapons;
        var name = interaction.options.get('imie').value;
        var weapon_name = interaction.options.get('bron').value;

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
        var weapon = weapons.filter(
            function(data){ return data.display_name.toLowerCase() == weapon_name.toLowerCase() }
        );
        if (weapon[0] === undefined) {
            var message = '```ansi\n[1;31mBrak broni [1;35m' + weapon_name + '[0m[1;31m w bazie[0m\n```'
            await interaction.editReply(message);
            return
        }
        character[0].weapons.splice(character[0].weapons.indexOf(weapon[0].name), 1);
        
        var message = '```ansi\n[1;32m' + character[0].name + '[1;37m - usunięto ' + weapon[0].display_name + '[0m\n```';

        globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};