const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info_druzyna')
		.setDescription('Pokaż skład drużyny')
        .addStringOption(option =>
            option
                .setName('nazwa')
                .setDescription('Nazwa drużyny')
                .setRequired(true)
                .setAutocomplete(true)
        )
    ,async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
        var database = globals.ReadDatabase();
        var choices = [];
        database.teams.forEach((element) => choices.push(element.name));
        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase())).slice(0,25);
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction) {
        await interaction.deferReply();
		var database = globals.ReadDatabase();
        var team_name = interaction.options.get('nazwa').value;

        var team = database.teams.filter(
            function(data){ return data.name.toLowerCase() == team_name.toLowerCase() }
        );
        //check if team exists
        if (team[0] === undefined) {
            var message = '```ansi\n[1;31mBrak drużyny [1;34m' + team_name + '[1;31m w bazie[0m\n```'
            await interaction.editReply(message);
            return;
        }
        var message = '```ansi\n[1;34m' + team[0].name + '\n[1;37mTura: ' + team[0].turn + '\n';
        if (team[0].members.length === 0){
            message += '[1;31mdrużyna pusta\n```'
        }
        else{
            let i = 1;
            for(character_name of team[0].members){
                character = database.characters.filter(
                    function(data){ return data.name.toLowerCase() == character_name.toLowerCase()}
                );
                if(character[0] === undefined) {
                    character = database.enemies.filter(
                        function(data){ return data.name.toLowerCase() == character_name.toLowerCase()}
                    );
                }
                message += '[1;37m' + i + '. [1;32m' + character[0].name + '[1;37m | [1;31mPZ: ' + character[0].hp + '/' + character[0].max_hp +
                '[1;34m Mana: ' + character[0].mana + '/' + character[0].max_mana +
                '[1;36m Kondycja: ' + character[0].energy + '/' + character[0].max_energy + '[1;37m |';
                if(Object.hasOwn(character[0],'bleeding')){
                    message += '[1;31m Krwawienie: ' + character[0].bleeding;
                }
                if(Object.hasOwn(character[0],'poison')){
                    message += '[1;31m Trucizna: ' + character[0].poison;
                }
                if(Object.hasOwn(character[0],'curse')){
                    message += '[1;34m Klątwa: ' + character[0].curse;
                }
                if(Object.hasOwn(character[0],'krok_w_tyl')){
                    message += '[1;37m Krok w tył przygotowany ';
                }
                if(Object.hasOwn(character[0],'riposta')){
                    message += '[1;34m Riposta: ' + character[0].riposta;
                }
                if(Object.hasOwn(character[0],'stun')){
                    message += '[1;34m Ogłuszenie: ' + character[0].stun;
                }
                if(Object.hasOwn(character[0],'powalenie')){
                    message += '[1;34m Powalenie '
                }
                if(message.endsWith('|')) message = message.slice(0, -9);
                message += '\n';
                i++;
            }
            message +='[0m\n```'
        }
        await interaction.editReply(message);
        
	},
};