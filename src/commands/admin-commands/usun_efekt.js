const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('usun_efekt')
		.setDescription('Usuń efekt')
		.addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('efekt')
                .setDescription('usuwany efekt')
                .setRequired(true)
                .addChoices(
                    { name:'krwawienie', value:'bleeding'},
                    { name:'trucizna', value:'poison'},
                    { name:'klątwa', value:'curse' },
                    { name:'ogłuszenie', value:'stun' },
                    { name:'powalenie', value:'powalenie' },
                    { name:'krok w tył', value:'krok_w_tyl' },
                    { name:'riposta', value:'riposta' },
                    { name:'modyfikator do siły', value:'modifier_sila' },
                    { name:'modyfikator do zręczności', value:'modifier_zrecznosc' },
                    { name:'modyfikator do precyzji', value:'modifier_precyzja' },
                    { name:'modyfikator do wytrzymałości', value:'modifier_wytrzymalosc' },
                    { name:'modyfikator do woli', value:'modifier_wola' },
                    { name:'modyfikator do inteligencji', value:'modifier_inteligencja' },
                    { name:'modyfikator do retoryki', value:'modifier_retoryka' },
                    { name:'modyfikator do fortuny', value:'modifier_fortuna' },
                    { name:'kac', value:'kac' },
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
        var effect = interaction.options.get('efekt').value;

        var character = database.characters.filter(
            function(data){ return data.name.toLowerCase() == name.toLowerCase() }
        );
        if (character[0] === undefined) {
            var character = database.enemies.filter(
                function(data){ return data.name.toLowerCase() == name.toLowerCase() }
            );
    
            if (character[0] === undefined) {
                var message = '```ansi\n[1;31mBrak postaci [1;32m' + name + '[1;31m w bazie[0m\n```'
                interaction.editReply(message);
                return
            }
        }
        switch(effect){
            case 'bleeding':
                var effect_display = 'krwawienie';
                break;
            case 'poison':
                var effect_display = 'truciznę';
                break;
            case 'curse':
                var effect_display = 'klątwę';
                break;
            case 'stun':
                var effect_display = 'ogłuszenie';
                break;
            case 'powalenie':
                var effect_display = 'powalenie';
                break;
            case 'krok_w_tyl':
                var effect_display = 'krok w tył';
                break;
            case 'riposta':
                var effect_display = 'ripostę';
                break;
            case 'modifier_sila':
                var effect_display = 'modyfikator do siły';
                break;
            case 'modifier_zrecznosc':
                var effect_display = 'modyfikator do zręczności';
                break;
            case 'modifier_precyzja':
                var effect_display = 'modyfikator do precyzji';
                break;
            case 'modifier_wytrzymalosc':
                var effect_display = 'modyfikator do wytrzymałości';
                break;
            case 'modifier_wola':
                var effect_display = 'modyfikator do woli';
                break;
            case 'modifier_inteligencja':
                var effect_display = 'modyfikator do inteligencji';
                break;
            case 'modifier_retoryka':
                var effect_display = 'modyfikator do retoryki';
                break;
            case 'modifier_fortuna':
                var effect_display = 'modyfikator do fortuny';
                break;
            case 'kac':
                var effect_display = 'kaca';
                break;
        }
        if(Object.hasOwn(character[0],effect)){
            eval('delete character[0].'+ effect);
            var message = '```ansi\n[1;32m' + character[0].name + '[1;37m - usunięto ' + effect_display + '[0m\n```';
        }
        else{
            var message = '```ansi\n[1;32m' + character[0].name + ' nie ma takiego efektu[0m\n```';
        }
        globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};