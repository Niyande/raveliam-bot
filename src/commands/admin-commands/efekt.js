const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('efekt')
		.setDescription('Dodaj lub zmień efekt')
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
                .setDescription('dodawany efekt')
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
        .addNumberOption(option =>
            option
                .setName('ilosc')
                .setDescription('ilość')
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
        if (!interaction.member.roles.cache.some(role => role.name === 'Konserwator 🤖')) {
            var imgPath = path.join(__dirname, '..', '..', '..', 'images', 'ken-you-not.png');
            await interaction.editReply({ files: [imgPath] });
            return;
        }
		var database = globals.ReadDatabase();
        var name = interaction.options.get('imie').value;
        var effect = interaction.options.get('efekt').value;
        var amount = interaction.options.get('ilosc').value;

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
        if(Object.hasOwn(character[0],effect)){
            eval('character[0].' + effect + '+= amount');
        }
        else{
            eval('character[0].' + effect + '= amount');
        }
        if(effect.includes('modifier')){
            if(eval('character[0].' + effect + '=== 0')){
                eval('delete character[0].'+ effect);
            }
        }
        else if(eval('character[0].' + effect + '< 1')){
            eval('delete character[0].'+ effect);
        }
        globals.SaveFile(JSON.stringify(database));

        var message = '```ansi\n[1;32m' + character[0].name;
        switch(effect){
            case 'bleeding':
                message += '[1;31m krwawienie ';
                break;
            case 'poison':
                message += '[1;31m trucizna ';
                break;
            case 'curse':
                message += '[1;34m klątwa ';
                break;
            case 'stun':
                message += '[1;34m ogłuszenie ';
                break;
            case 'powalenie':
                message += '[1;34m powalenie ';
                break;
            case 'krok_w_tyl':
                message += '[1;34m krok w tył ';
                break;
            case 'riposta':
                message += '[1;34m riposta ';
                break;
            case 'modifier_sila':
                message += '[1;37m modyfikator do siły ';
                break;
            case 'modifier_zrecznosc':
                message += '[1;37m modyfikator do zręczności ';
                break;
            case 'modifier_precyzja':
                message += '[1;37m modyfikator do precyzji ';
                break;
            case 'modifier_wytrzymalosc':
                message += '[1;37m modyfikator do wytrzymałości ';
                break;
            case 'modifier_wola':
                message += '[1;37m modyfikator do woli ';
                break;
            case 'modifier_inteligencja':
                message += '[1;37m modyfikator do inteligencji ';
                break;
            case 'modifier_retoryka':
                message += '[1;37m modyfikator do retoryki ';
                break;
            case 'modifier_fortuna':
                message += '[1;37m modyfikator do fortuny ';
                break;
            case 'kac':
                message += '[1;37m kac ';
                break;
        }
        if(amount>0) message += '+';
        message += amount + '[0m\n```';
		await interaction.editReply(message);
	},
};