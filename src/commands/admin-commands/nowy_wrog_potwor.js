const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nowy_wrog_potwor')
		.setDescription('Wpisz wroga do bazy danych')
        .addStringOption(option =>
            option
                .setName('nazwa')
                .setDescription('Nazwa wroga')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('ranga')
                .setDescription('Ranga postaci')
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
        .addNumberOption(option =>
            option
                .setName('sila')
                .setDescription('Ilość punktów siły')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('zrecznosc')
                .setDescription('Ilość punktów zręcznosci')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('precyzja')
                .setDescription('Ilość punktów precyzji')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('wytrzymalosc')
                .setDescription('Ilość punktów wytrzymałości')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('wola')
                .setDescription('Ilość punktów woli')
                .setRequired(true)
        ).addNumberOption(option =>
            option
                .setName('inteligencja')
                .setDescription('Ilość punktów inteligencji')
                .setRequired(true)
        ).addNumberOption(option =>
            option
                .setName('retoryka')
                .setDescription('Ilość punktów retoryki')
                .setRequired(true)
        ).addNumberOption(option =>
            option
                .setName('fortuna')
                .setDescription('Ilość punktów fortuny')
                .setRequired(true)
        )
        ,
	async execute(interaction) {
        await interaction.deferReply();
		if (!interaction.member.roles.cache.some(role => role.name === 'Konserwator 🤖')) {
            var imgPath = path.join(__dirname, '..', '..', '..', 'images', 'ken-you-not.png');
            await interaction.editReply({ files: [imgPath] });
            return;
        }
        var database = globals.ReadDatabase();

        var name = interaction.options.get('nazwa').value;
        var rank = interaction.options.get('ranga').value;
        var sila = interaction.options.get('sila').value;
        var zrecznosc = interaction.options.get('zrecznosc').value;
        var precyzja = interaction.options.get('precyzja').value;
        var wytrzymalosc = interaction.options.get('wytrzymalosc').value;
        var wola = interaction.options.get('wola').value;
        var inteligencja = interaction.options.get('inteligencja').value;
        var retoryka = interaction.options.get('retoryka').value;
        var fortuna = interaction.options.get('fortuna').value;

        var hp = wytrzymalosc * 4;
        var energy = wytrzymalosc * 4;
        var mana = inteligencja * 4;

        var enemy = database.enemies.filter(
            function(data){ return data.name.toLowerCase() == name.toLowerCase() }
        );
        if (enemy[0] === undefined) {
            database.enemies.push({
                name: name,
                rank: rank,
                race: "Specjalna",

                sila: sila,
                zrecznosc: zrecznosc,
                precyzja: precyzja,
                wytrzymalosc: wytrzymalosc,
                wola: wola,
                inteligencja: inteligencja,
                retoryka: retoryka,
                fortuna: fortuna,

                hp: hp,
                max_hp: hp,
                energy: energy,
                max_energy: energy,
                mana: mana,
                max_mana: mana,

                body_parts:[],
                weapons: [],
                ammo: [{}],
                ready: {}
            });
            globals.SaveFile(JSON.stringify(database));
            switch (rank){
                case 'rekrut':
                    var rank_display = 'Rekrut';
                    break;
                case 'm-straznik':
                    var rank_display = 'Młodszy Strażnik';
                    break;
                case 'straznik':
                    var rank_display = 'Strażnik';
                    break;
                case 's-straznik':
                    var rank_display = 'Starszy Strażnik';
                    break;
                case 'czempion':
                    var rank_display = 'Czempion';
                    break;
                case 'dziecko':
                    var rank_display = 'Dziecko';
                    break;
            }
            var message = 'Zapisano:\n```ansi\n[1;2m[1;37m[1;32m' + name + '[0m[1;37m' +
            '\n[1;33m' + rank_display.padEnd(16, ' ') + '[0m' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n[1;31mPŻ:       ' + hp.toString().padStart(3, ' ') + '/' + hp.toString().padEnd(3, ' ') + '[0m' +
            '\n[1;34mMana:     ' + mana.toString().padStart(3, ' ') + '/' + mana.toString().padEnd(3, ' ') + '[0m' +
            '\n[1;36mKondycja: ' + energy.toString().padStart(3, ' ') + '/' + energy.toString().padEnd(3, ' ') + '[0m' +
            '\n```'
        }
        else
        {
            var message = '```ansi\n[1;31mWróg [1;32m' + name + '[0m[1;31m jest już w bazie[0m\n```'
        }

       
        await interaction.editReply(message);
	},
};