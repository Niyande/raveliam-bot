const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js')
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('edytuj_postac')
		.setDescription('Edytuj statystyki istniejącej postaci')
        .addSubcommand(subcommand =>
            subcommand
                .setName('zmien_statystyke')
                .setDescription('Zmień statystykę')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('statystyka')
                        .setDescription('Nazwa stytystyki do edycji')
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
                .addNumberOption(option =>
                    option
                        .setName('nowa_wartosc')
                        .setDescription('Nowa wartość statystyki')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('zmien_imie')
                .setDescription('Zmień imię')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Obecne imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('nowe_imie')
                        .setDescription('Nowe imię postaci')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('zmien_range')
                .setDescription('Zmień rangę poostaci')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('nowa_ranga')
                        .setDescription('Nowa ranga postaci')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Rekrut', value: 'rekrut' },
                            { name: 'Młodszy Strażnik', value: 'm-straznik' },
                            { name: 'Strażnik', value: 'straznik' },
                            { name: 'Starszy Strażnik', value: 's-straznik' },
                            { name: 'Czempion', value: 'czempion' },
                            { name: 'Dziecko', value: 'dziecko'},
                        )
                )
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

        var subcommand = interaction.options.getSubcommand();
        switch (subcommand){
            case 'zmien_statystyke':
                var stat = interaction.options.get('statystyka').value;
                var new_value = interaction.options.get('nowa_wartosc').value;

                eval('character[0].' + stat + '=' + 'new_value');

                character[0].max_hp = character[0].wytrzymalosc * 4;
                character[0].hp = Math.min(character[0].max_hp, character[0].hp);
                character[0].max_energy = character[0].wytrzymalosc * 4;
                character[0].energy = Math.min(character[0].max_energy, character[0].energy);
                character[0].max_mana = character[0].inteligencja * 4;
                character[0].mana = Math.min(character[0].max_mana, character[0].mana);

                var message = '```ansi\nEdytowano [1;32m' + character[0].name + '[0m' + 
                '\n[4;2mSiła          [4;37m | ' + character[0].sila.toString().padStart(2, ' ') + '[0m' +
                '\n[4;2mZręczność     [4;37m | ' + character[0].zrecznosc.toString().padStart(2, ' ') + '[0m' +
                '\n[4;2mPrecyzja      [4;37m | ' + character[0].precyzja.toString().padStart(2, ' ') + '[0m' +
                '\n[4;2mWytrzymałość  [4;37m | ' + character[0].wytrzymalosc.toString().padStart(2, ' ') + '[0m' +
                '\n[4;2mWola          [4;37m | ' + character[0].wola.toString().padStart(2, ' ') + '[0m' +
                '\n[4;2mInteligencja  [4;37m | ' + character[0].inteligencja.toString().padStart(2, ' ') + '[0m' +
                '\n[4;2mRetoryka      [4;37m | ' + character[0].retoryka.toString().padStart(2, ' ') + '[0m' +
                '\n[4;2mFortuna       [4;37m | ' + character[0].fortuna.toString().padStart(2, ' ') + '[0m' +
                '\n```'

                break;
            case 'zmien_imie':
                var new_name = interaction.options.get('nowe_imie').value;                
                character[0].name = new_name;

                var message = '```ansi\n[1;37mZmieniono imię [1;32m' + name + '[1;37m na [1;32m' + new_name + '[0m\n```';
                
                break;
            case 'zmien_range':
                var new_rank = interaction.options.get('nowa_ranga').value;
                switch (character[0].rank){
                    case 'rekrut':
                        var old_rank = 'Rekrut';
                        break;
                    case 'm-straznik':
                        var old_rank = 'Młodszy Strażnik';
                        break;
                    case 'straznik':
                        var old_rank = 'Strażnik';
                        break;
                    case 's-straznik':
                        var old_rank = 'Starszy Strażnik';
                        break;
                    case 'czempion':
                        var old_rank = 'Czempion';
                        break;
                    case 'dziecko':
                        var old_rank = 'Dziecko';
                        break;
                }
                switch (new_rank){
                    case 'rekrut':
                        var new_rank_display = 'Rekrut';
                        break;
                    case 'm-straznik':
                        var new_rank_display = 'Młodszy Strażnik';
                        break;
                    case 'straznik':
                        var new_rank_display = 'Strażnik';
                        break;
                    case 's-straznik':
                        var new_rank_display = 'Starszy Strażnik';
                        break;
                    case 'czempion':
                        var new_rank_display = 'Czempion';
                        break;
                    case 'dziecko':
                        var new_rank_display = 'Dziecko';
                        break;
                }
                character[0].rank = new_rank;
                var message = '```ansi\n[1;37mZmieniono rangę [1;32m' + name + '[1;37m z [1;33m' + old_rank + '[1;37m na [1;33m' + new_rank_display + '[0m\n```';
                
                break;
        }

        globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};