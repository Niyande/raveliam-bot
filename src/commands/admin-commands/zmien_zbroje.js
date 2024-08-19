const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('zmien_zbroje')
		.setDescription('Zmień liczbę PT zbroji')
		.addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('czesc')
                .setDescription('Część zbroi do zmiany')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addNumberOption(option =>
            option
                .setName('ilosc')
                .setDescription('Liczba PT do dodania/odjęcia')
                .setRequired(true)
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
        else if(focusedOption.name === 'czesc'){
            var name = interaction.options.get('imie').value;

            var character = database.characters.filter(
                function(data){ return data.name.toLowerCase() == name.toLowerCase() }
            );
            if (character[0] === undefined) {
                var character = database.enemies.filter(
                    function(data){ return data.name.toLowerCase() == name.toLowerCase() }
                );
            }
            choices = character[0].body_parts;
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
        var part = interaction.options.get('czesc').value;
        var amount = interaction.options.get('ilosc').value;

        switch (part){
            case 'glowa':
                var partName = 'głowa';
                break;
            case 'lewa_reka':
                var partName = 'lewa ręka';
                break;
            case 'prawa_reka':
                var partName = 'prawa ręka';
                break;
            case 'korpus':
                var partName = 'korpus';
                break;
            case 'lewa_noga':
                var partName = 'lewa noga';
                break;
            case 'prawa_noga':
                var partName = 'prawa noga';
                break;
        }

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
        eval('character[0].' + part + '+=' + 'amount');
        
        var message = '```ansi\n[1;32m' + name + '[1;37m ma teraz [1;35m'
        eval('message' + '+=' + 'character[0].' + part);
        message += ' PT[1;37m na części [1;35m' + partName + '[0m\n```';

        globals.SaveFile(JSON.stringify(database));
		
		await interaction.editReply(message);
	},
};