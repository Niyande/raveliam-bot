const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rzut_sporny')
		.setDescription('Rzut sporny na dowolną statystykę')
		.addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('cel')
                .setDescription('Imię/nazwa celu')
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
        .addNumberOption(option =>
            option
                .setName('modyfikator_przeciwnika')
                .setDescription('Modyfikator do progu')
        )
        .addNumberOption(option =>
            option
                .setName('mod_procentowy_przeciwnika')
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
        var target = interaction.options.get('cel').value;

        var character = database.characters.filter(
            function(data){ return data.name.toLowerCase() == name.toLowerCase() }
        );
        if (character[0] === undefined) {
            var character = database.enemies.filter(
                function(data){ return data.name.toLowerCase() == name.toLowerCase() }
            );
            if (character[0] === undefined) {
                var message = '```ansi\n[1;31mBrak postaci [1;32m' + name + '[1;31m w bazie[0m\n```'
                await interaction.editReply(message);
                return
            }
        }

        var enemy = database.enemies.filter(
            function(data){ return data.name.toLowerCase() == target.toLowerCase() }
        );
        if (enemy[0] === undefined) {
            var enemy = database.characters.filter(
                function(data){ return data.name.toLowerCase() == target.toLowerCase() }
            );
            if (enemy[0] === undefined) {
                var message = '```ansi\n[1;31mBrak postaci [1;32m' + name + '[0m[1;31m w bazie[0m\n```'
                await interaction.editReply(message);
                return
            }
        }
        
        switch (character[0].rank){
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
        switch (enemy[0].rank){
            case 'rekrut':
                var enemy_dice = 20;
                break;
            case 'm-straznik':
                var enemy_dice = 30;
                break;
            case 'straznik':
                var enemy_dice = 40;
                break;
            case 's-straznik':
                var enemy_dice = 50;
                break;
            case 'czempion':
                var enemy_dice = 60;
                break;
        }

        
        var stat = interaction.options.get('statystyka').value;
        eval('var stat_value = character[0].' + stat);
        if(Object.hasOwn(character[0],'modifier_' + stat)){
            eval('stat_value += character[0].modifier_' + stat);
        }
        eval('var enemy_stat_value = enemy[0].' + stat);
        if(Object.hasOwn(enemy[0],'modifier_' + stat)){
            eval('enemy_stat_value += enemy[0].modifier_' + stat);
        }

        var message = '```ansi\n[1;32m' + character[0].name + ' [1;37mi [1;32m'+ enemy[0].name +'\n[1;37mRzut sporny na [[1;34m' + stat;

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
            eval('enemy_stat_value += enemy[0].' + stat2);
            if(Object.hasOwn(enemy[0],'modifier_' + stat2)){
                eval('enemy_stat_value += enemy[0].modifier_' + stat2);
            }
            message += ' + ' + stat2;
            if(type === 'sum'){
                dice += 20;
            }
            else if (type === 'divide'){
                stat_value = Math.ceil(stat_value/2);
                enemy_stat_value = Math.ceil(enemy_stat_value/2);
                message += ' / 2'
            }
            else{
                var message = '```ansi\n[1;31mBłędny rodzaj rzutu łączonego (sumowany/dzielony)\n```';
                await interaction.editReply(message);
                return;
            }
        }
        message += '[1;37m]\n\n';
        if(Object.hasOwn(character[0],'kac')){
            stat_value -= character[0].kac;
        }
        if(Object.hasOwn(enemy[0],'kac')){
            enemy_stat_value -= enemy[0].kac;
        }
        if(interaction.options.get('modyfikator')){
            var modifier = interaction.options.get('modyfikator').value;
            stat_value += modifier;
        }
        if(interaction.options.get('modyfikator_procentowy')){
            var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
            stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
        }

        if(interaction.options.get('modyfikator_przeciwnika')){
            var enemy_modifier = interaction.options.get('modyfikator_przeciwnika').value;
            enemy_stat_value += enemy_modifier;
        }
        if(interaction.options.get('mod_procentowy_przeciwnika')){
            var enemy_percentage_modifier = interaction.options.get('modyfikator_procentowy_przeciwnika').value;
            enemy_stat_value = Math.ceil(enemy_stat_value * (1 + enemy_percentage_modifier/100));
        }

        var roll = globals.getRandomInt(dice);
        var enemy_roll = globals.getRandomInt(enemy_dice);

        message += '[1;32m' + character[0].name + '[1;37m Próg: ' + stat_value + ' Wynik rzutu: [[1;34m' + roll + '[1;37m]\n';
        message += '[1;32m' + enemy[0].name + '[1;37m Próg: ' + enemy_stat_value + ' Wynik rzutu: [[1;34m' + enemy_roll + '[1;37m]\n\n';
        if (roll<=stat_value) {
            if (enemy_roll <= enemy_stat_value){
                if(roll === 1){
                    if (enemy_roll === 1){
                        if(stat_value - roll > enemy_stat_value - enemy_roll){
                            message += '[1;32m' + character[0].name + '[1;37m wygrywa!';
                        } else if(stat_value - roll === enemy_stat_value - enemy_roll){
                            message += '[1;33mRzut niezdecydowany';
                        }else{
                            message += '[1;32m' + enemy[0].name + '[1;37m wygrywa!';
                        }
                    }
                    else{
                        message += '[1;32m' + character[0].name + '[1;37m wygrywa!';
                    }
                } else if(enemy_roll === 1){
                    message += '[1;32m' + enemy[0].name + '[1;37m wygrywa!';
                } else{
                    if(stat_value - roll > enemy_stat_value - enemy_roll){
                        message += '[1;32m' + character[0].name + '[1;37m wygrywa!';
                    } else if(stat_value - roll === enemy_stat_value - enemy_roll){
                        message += '[1;33mRzut niezdecydowany';
                    }else{
                        message += '[1;32m' + enemy[0].name + '[1;37m wygrywa!';
                    }
                }
            }
            else{
                message += '[1;32m' + character[0].name + '[1;37m wygrywa!';
            }
        }
        else {
            if (enemy_roll <= enemy_stat_value){
                message += '[1;32m' + enemy[0].name + '[1;37m wygrywa!';
            }
            else{
                message += '[1;33mRzut niezdecydowany';
            }
        }
        message += '[0m\n```'
		
		await interaction.editReply(message);
	},
};