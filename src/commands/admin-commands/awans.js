const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('awans')
		.setDescription('Wpisz postaci awans')
		.addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addNumberOption(option =>
            option
                .setName('sila')
                .setDescription('Dodana wartość siły')
        )
        .addNumberOption(option =>
            option
                .setName('zrecznosc')
                .setDescription('Dodana wartość zręczności')
        )
        .addNumberOption(option =>
            option
                .setName('precyzja')
                .setDescription('Dodana wartość precyzji')
        )
        .addNumberOption(option =>
            option
                .setName('wytrzymalosc')
                .setDescription('Dodana wartość wytrzymałości')
        )
        .addNumberOption(option =>
            option
                .setName('wola')
                .setDescription('Dodana wartość woli')
        )
        .addNumberOption(option =>
            option
                .setName('inteligencja')
                .setDescription('Dodana wartość inteligencji')
        )
        .addNumberOption(option =>
            option
                .setName('retoryka')
                .setDescription('Dodana wartość retoryki')
        )
        .addNumberOption(option =>
            option
                .setName('fortuna')
                .setDescription('Dodana wartość fortuny')
        )
	,
    async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
        var database = globals.ReadDatabase();
        var choices = [];
        database.characters.forEach((element) => choices.push(element.name));
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
            var message = '```ansi\n[1;31mBrak postaci [1;32m' + name + '[1;31m w bazie[0m\n```'
            interaction.editReply(message);
            return
        }
        switch (character[0].rank){
            case 'rekrut':
                var rank_display = 'Młodszy Strażnik';
                character[0].rank = 'm-straznik';
                break;
            case 'm-straznik':
                var rank_display = 'Strażnik';
                character[0].rank = 'straznik';
                break;
            case 'straznik':
                var rank_display = 'Starszy Strażnik';
                character[0].rank = 's-straznik';
                break;
            case 's-straznik':
                var rank_display = 'Czempion';
                character[0].rank = 'czempion';
                break;
            case 'czempion':
                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m jest już [1;33mCzempionem[0m\n```'
                await interaction.editReply(message);
                return;
        }
        var message = '```ansi\n[1;32m' + character[0].name + '\n[1;37mNowa ranga: [1;33m' + rank_display + '[0m'

        if (interaction.options.get('sila')) {
            var sila = interaction.options.get('sila').value;
            message += ('\n[4;2mSiła ' + character[0].sila).padEnd(25, ' ') + '+ ' + sila.toString().padEnd(2, ' ');
            character[0].sila += sila;
            message += '[4;37m[1;37m | ' + character[0].sila.toString().padStart(2, ' ') + '[0m';
        }
        if (interaction.options.get('zrecznosc')) {
            var zrecznosc = interaction.options.get('zrecznosc').value;
            message += ('\n[4;2mZręczność ' + character[0].zrecznosc).padEnd(25, ' ') + '+ ' + zrecznosc.toString().padEnd(2, ' ');
            character[0].zrecznosc += zrecznosc;
            message += '[4;37m[1;37m | ' + character[0].zrecznosc.toString().padStart(2, ' ') + '[0m';
        }
        if (interaction.options.get('precyzja')) {
            var precyzja = interaction.options.get('precyzja').value;
            message += ('\n[4;2mPrecyzja ' + character[0].precyzja).padEnd(25, ' ') + '+ ' + precyzja.toString().padEnd(2, ' ');
            character[0].precyzja += precyzja;
            message += '[4;37m[1;37m | ' + character[0].precyzja.toString().padStart(2, ' ') + '[0m';
        }
        if (interaction.options.get('wytrzymalosc')) {
            var wytrzymalosc = interaction.options.get('wytrzymalosc').value;
            message += ('\n[4;2mWytrzymałość ' + character[0].wytrzymalosc).padEnd(25, ' ') + '+ ' + wytrzymalosc.toString().padEnd(2, ' ');
            character[0].wytrzymalosc += wytrzymalosc;
            message += '[4;37m[1;37m | ' + character[0].wytrzymalosc.toString().padStart(2, ' ') + '[0m';
        }
        if (interaction.options.get('wola')) {
            var wola = interaction.options.get('wola').value;
            message += ('\n[4;2mWola ' + character[0].wola).padEnd(25, ' ') + '+ ' + wola.toString().padEnd(2, ' ');
            character[0].wola += wola;
            message += '[4;37m[1;37m | ' + character[0].wola.toString().padStart(2, ' ') + '[0m';
        }
        if (interaction.options.get('inteligencja')) {
            var inteligencja = interaction.options.get('inteligencja').value;
            message += ('\n[4;2mInteligencja ' + character[0].inteligencja).padEnd(25, ' ') + '+ ' + inteligencja.toString().padEnd(2, ' ');
            character[0].inteligencja += inteligencja;
            message += '[4;37m[1;37m | ' + character[0].inteligencja.toString().padStart(2, ' ') + '[0m';
        }
        if (interaction.options.get('retoryka')) {
            var retoryka = interaction.options.get('retoryka').value;
            message += ('\n[4;2mRetoryka ' + character[0].retoryka).padEnd(25, ' ') + '+ ' + retoryka.toString().padEnd(2, ' ');
            character[0].retoryka += retoryka;
            message += '[4;37m[1;37m | ' + character[0].retoryka.toString().padStart(2, ' ') + '[0m';
        }
        if (interaction.options.get('fortuna')) {
            var fortuna = interaction.options.get('fortuna').value;
            message += ('\n[4;2mFortuna ' + character[0].fortuna).padEnd(25, ' ') + '+ ' + fortuna.toString().padEnd(2, ' ');
            character[0].fortuna += fortuna;
            message += '[4;37m[1;37m | ' + character[0].fortuna.toString().padStart(2, ' ') + '[0m';
        }
        globals.SaveFile(JSON.stringify(database));

        message += '\n```'
		
		await interaction.editReply(message);
	},
};