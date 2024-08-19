const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('zmien_pz')
		.setDescription('Zmień liczbę PZ postaci')
		.addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addNumberOption(option =>
            option
                .setName('ilosc')
                .setDescription('Liczba punktów życia do dodania/odjęcia')
                .setRequired(true)
        )
	,
    async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
        var database = globals.ReadDatabase();
        var choices = [];
        database.characters.forEach((element) => choices.push(element.name));
        database.enemies.forEach((element) => choices.push(element.name));
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
        var amount = interaction.options.get('ilosc').value;

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
        character[0].hp += amount;
        character[0].hp = Math.max(0, character[0].hp)
        character[0].hp = Math.min(character[0].hp, character[0].max_hp)

        var message = '```ansi\n[1;32m' + name + '[1;37m ma teraz [1;31m' + character[0].hp + '/' + character[0].max_hp + ' PŻ[1;37m'
        

        if(character[0].hp === 0) {
            message += '\nPostać traci przytomność'
        }
        message += '[0m\n```'

        globals.SaveFile(JSON.stringify(database));

		
		await interaction.editReply(message);
	},
};