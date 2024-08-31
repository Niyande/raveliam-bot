const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rzut_na')
		.setDescription('Rzuć postacią na dowolną statystykę')
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
                .setDescription('Statystyka do rzutu')
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
        .addStringOption(option =>
            option
                .setName('druga_statystyka')
                .setDescription('Opcjonalna druga statystyka')
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
        .addStringOption(option =>
            option
                .setName('rodzaj_rzutu')
                .setDescription('czy suma statystyk ma być dzielona przez 2 czy sumowana')
                .addChoices(
                    { name: 'Sumowany', value: 'sum' },
                    { name: 'Dzielony', value: 'divide' },
                )
        )
        .addNumberOption(option =>
            option
                .setName('modyfikator')
                .setDescription('Modyfikator do progu')
        )
        .addNumberOption(option =>
            option
                .setName('modyfikator_procentowy')
                .setDescription('Modyfikator procentowy do progu')
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
        var name = interaction.options.get('imie').value;

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
        switch (character[0].rank){
            case 'dziecko':
                var dice = 15;
                break;
            case 'rekrut':
                var dice = 20;
                break;
            case 'm-straznik':
                var dice = 30;
                break;
            case 'straznik':
                var dice = 40;
                break;
            case 's-straznik':
                var dice = 50;
                break;
            case 'czempion':
                var dice = 60;
                break;
        }

        
        var stat = interaction.options.get('statystyka').value;
        eval('var stat_value = character[0].' + stat);
        if(Object.hasOwn(character[0],'modifier_' + stat)){
            eval('stat_value += character[0].modifier_' + stat);
        }

        var message = '```ansi\n[1;32m' + name + '[1;37m Rzut na [[1;34m' + stat;

        if(interaction.options.get('druga_statystyka')){
            if(!interaction.options.get('rodzaj_rzutu')){
                var message = '```ansi\n[1;31mPodaj rodzaj rzutu łączonego (sumowany/dzielony)\n```';
                await interaction.editReply(message);
                return;
            }
            var type = interaction.options.get('rodzaj_rzutu').value;
            var stat2 = interaction.options.get('druga_statystyka').value;
            eval('stat_value += character[0].' + stat2);
            if(Object.hasOwn(character[0],'modifier_' + stat2)){
                eval('stat_value += character[0].modifier_' + stat2);
            }
            message += ' + ' + stat2;
            if(type === 'sum'){
                dice += 20;
            }
            else if (type === 'divide'){
                stat_value = Math.ceil(stat_value/2);
                message += ' / 2'
            }
            else{
                var message = '```ansi\n[1;31mBłędny rodzaj rzutu łączonego (sumowany/dzielony)\n```';
                await interaction.editReply(message);
                return;
            }
            
        }
        if(Object.hasOwn(character[0],'kac')){
            stat_value -= character[0].kac;
        }

        var roll = globals.getRandomInt(dice);

        if(interaction.options.get('modyfikator')){
            var modifier = interaction.options.get('modyfikator').value;
            stat_value += modifier;
        }
        if(interaction.options.get('modyfikator_procentowy')){
            var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
            stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
        }
        
        if(Object.hasOwn(character[0],"sokole_oko") && stat === 'precyzja' && !interaction.options.get('druga_statystyka')){
            stat_value = Math.ceil(stat_value*character[0].sokole_oko);
            delete character[0].sokole_oko;
        }

        
        
        message += '[1;37m] Próg: ' + stat_value + ' Wynik rzutu: [[1;34m' + roll + '[1;37m]';
        if(roll === dice){
            message += '[1;31m Krytyczna porażka';
        }
        else if (roll<=stat_value) {
            if(roll === 1){
                message += '[1;31m Krytyczny[1;32m sukces';
            }
            else{
                message += '[1;32m Sukces';
            }
            
        }
        else {
            message += '[1;31m Porażka';
        }
        message += '[0m\n```';
		
		await interaction.editReply(message);
	},
};