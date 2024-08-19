const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nowy_wrog_humanoid')
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
        .addNumberOption(option =>
            option
                .setName('glowa')
                .setDescription('Ilość PT głowy')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('lewa_reka')
                .setDescription('Ilość PT lewej ręki')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('prawa_reka')
                .setDescription('Ilość PT prawej ręki')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('korpus')
                .setDescription('Ilość PT korpusu')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('lewa_noga')
                .setDescription('Ilość PT lewej nogi')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('prawa_noga')
                .setDescription('Ilość PT prawej nogi')
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

        var glowa = interaction.options.get('glowa').value;
        var lewa_reka = interaction.options.get('lewa_reka').value;
        var prawa_reka = interaction.options.get('prawa_reka').value;
        var korpus = interaction.options.get('korpus').value;
        var lewa_noga = interaction.options.get('lewa_noga').value;
        var prawa_noga = interaction.options.get('prawa_noga').value;

        var enemy = database.enemies.filter(
            function(data){ return data.name.toLowerCase() == name.toLowerCase() }
        );
        if (enemy[0] === undefined) {
            database.enemies.push({
                name: name,
                rank: rank,

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

                glowa: glowa,
                lewa_reka: lewa_reka,
                prawa_reka: prawa_reka,
                korpus: korpus,
                lewa_noga: lewa_noga,
                prawa_noga: prawa_noga,

                body_parts: ['glowa', 'lewa_reka', 'prawa_reka', 'korpus', 'lewa_noga', 'prawa_noga'],
                weapons: [],
                ammo: [{}]
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
            }
            var message = 'Zapisano:\n```ansi\n[1;2m[1;37m[1;32m' + name + '[0m[1;37m' +
            '\n[1;33m' + rank_display.padEnd(16, ' ') + '[0m[1;37m         [1;35m' + glowa + '[0m[1;37m  !' +
            '\n[0;37m                 [0m[1;37m         [1;35m\\[0m[1;37m.-.' +
            '\n[0;37m                 [0m[1;37m     [1;35m' + lewa_reka + '[0m[1;37m  __|=|__  [1;35m' + prawa_reka + '[0m[1;37m' +
            '\n[0;37m                 [0m[1;37m      [1;35m\\[0m[1;37m(_/`-`\\_)[1;35m/[0m[1;37m' +
            '\n                        //\\_[1;35m' + korpus + '[0m[1;37m_/\\\\' +
            '\n                        <>/   \\<>' +
            '\n                         \\|_._|/' +
            '\n[1;31mPŻ:       ' + hp.toString().padStart(3, ' ') + '/' + hp.toString().padEnd(3, ' ') + '[0m[1;37m' +
            '       [1;35m' + lewa_noga + '[0m[1;37m <_I_> [1;35m' + prawa_noga + '[0m[1;37m' +
            '\n[1;34mMana:     ' + mana.toString().padStart(3, ' ') + '/' + mana.toString().padEnd(3, ' ') + '[0m[1;37m' +
            '        [1;35m\\[0m[1;37m ||| [1;35m/[0m[1;37m' +
            '\n[1;36mKondycja: ' + energy.toString().padStart(3, ' ') + '/' + energy.toString().padEnd(3, ' ') + '[0m[0;37m[0m[1;37m' +
            '         /_|_\\[0m[0m' +
            '\n```'
        }
        else
        {
            var message = '```ansi\n[1;31mWróg [1;32m' + name + '[0m[1;31m jest już w bazie[0m\n```'
        }

       
        await interaction.editReply(message);
	},
};