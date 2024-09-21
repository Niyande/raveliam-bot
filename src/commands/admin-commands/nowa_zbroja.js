const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nowa_zbroja')
		.setDescription('daje postaci nową zbroję')
		.addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addNumberOption(option =>
            option
                .setName('glowa')
                .setDescription('Ilość PT głowy')
        )
        .addNumberOption(option =>
            option
                .setName('lewa_reka')
                .setDescription('Ilość PT lewej ręki')
        )
        .addNumberOption(option =>
            option
                .setName('prawa_reka')
                .setDescription('Ilość PT prawej ręki')
        )
        .addNumberOption(option =>
            option
                .setName('korpus')
                .setDescription('Ilość PT korpusu')
        )
        .addNumberOption(option =>
            option
                .setName('lewa_noga')
                .setDescription('Ilość PT lewej nogi')
        )
        .addNumberOption(option =>
            option
                .setName('prawa_noga')
                .setDescription('Ilość PT prawej nogi')
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

        if(interaction.options.get('glowa')){
            character[0].max_glowa = interaction.options.get('glowa').value;
            character[0].glowa = interaction.options.get('glowa').value;
        }
        if(interaction.options.get('lewa_reka')){
            character[0].max_lewa_reka = interaction.options.get('lewa_reka').value;
            character[0].lewa_reka = interaction.options.get('lewa_reka').value;
        }
        if(interaction.options.get('prawa_reka')){
            character[0].max_prawa_reka = interaction.options.get('prawa_reka').value;
            character[0].prawa_reka = interaction.options.get('prawa_reka').value;
        }
        if(interaction.options.get('korpus')){
            character[0].max_korpus = interaction.options.get('korpus').value;
            character[0].korpus = interaction.options.get('korpus').value;
        }
        if(interaction.options.get('lewa_noga')){
            character[0].max_lewa_noga = interaction.options.get('lewa_noga').value;
            character[0].lewa_noga = interaction.options.get('lewa_noga').value;
        }
        if(interaction.options.get('prawa_noga')){
            character[0].max_prawa_noga = interaction.options.get('prawa_noga').value;
            character[0].prawa_noga = interaction.options.get('prawa_noga').value;
        }

        var message = '```ansi\n[1;31mNowa zbroja [1;32m' + character[0].name +
        '\n      [1;35m' + character[0].glowa + '[1;37m  !' +
        '\n       [1;35m\\[1;37m.-.' +
        '\n   [1;35m' + character[0].lewa_reka + '[1;37m  __|=|__  [1;35m' + character[0].prawa_reka + '[1;37m' +
        '\n    [1;35m\\[1;37m(_/`-`\\_)[1;35m/[1;37m' +
        '\n     //\\_[1;35m' + character[0].korpus + '[1;37m_/\\\\' +
        '\n     <>/   \\<>' +
        '\n      \\|_._|/' +
        '\n     [1;35m' + character[0].lewa_noga + '[1;37m <_I_> [1;35m' + character[0].prawa_noga + '[1;37m' +
        '\n      [1;35m\\[1;37m ||| [1;35m/[1;37m' +
        '\n       /_|_\\[0m' +
        '\n```'
		
        globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};