const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unik')
		.setDescription('Rzut na unik')
        .addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('ucieczka')
                .setDescription('Czy bierzesz nogi za pas?')
                .addChoices(
                    { name:'Tak', value:'tak'}
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
                var message = '```ansi\n[1;31mBrak postaci [1;32m' + name + '[0m[1;31m w bazie[0m\n```'
                await interaction.editReply(message);
                return
            }
        }
        
        if(Object.hasOwn(character[0],'stun')){
            var message = '```ansi\n[1;32m' + character[0].name + '[1;31m jest ogluszony/a!\n```'
            await interaction.editReply(message);
            return
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

        if(character[0].energy < 2){
            var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
            interaction.editReply(message);
            return
        }
        character[0].energy -= 2;
        if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

        var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Wykonuje[1;34m unik\n';

        var stat_value = character[0].zrecznosc;
        
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
        
        message += '[1;37mWynik rzutu: [[1;34m' + roll + '[1;37m] Próg: ' + stat_value;
        if(roll === dice){
            message += '[1;31m Krytyczna porażka!'
        }
        else if (roll <= stat_value) {
            if (roll === 1){
                message += '[1;31m Krytyczny[1;32m sukces'
            }
            else{
                message += '[1;32m Sukces'
            }

            if(interaction.options.get('ucieczka')){
                if(character[0].energy < 6){
                    message += '\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m na ucieczkę!'
                    
                }
                else{
                    character[0].energy -= 6;
                    message += '\n[1;32m' + character[0].name + '[1;37m ucieka!'
                }
            }

        }
        else {
            message += '[1;31m Porażka!';
            if(interaction.options.get('ucieczka')) message += '\n[1;32m' + character[0].name + '[1;37m nie może uciec' 
        }
        message += '\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy;
        


        message += '[0m\n```'
		globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};