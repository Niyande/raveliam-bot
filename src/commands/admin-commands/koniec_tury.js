const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js')
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('koniec_tury')
		.setDescription('Kończy turę i podsumowuje efekty czasowe')
		.addStringOption(option =>
            option
                .setName('druzyna')
                .setDescription('Nazwa druzyny')
                .setRequired(true)
                .setAutocomplete(true)
        )
	,
    async autocomplete(interaction) {
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
        if (!interaction.member.roles.cache.some(role => role.name === 'Konserwator 🤖')) {
            var imgPath = path.join(__dirname, '..', '..', '..', 'images', 'ken-you-not.png');
            await interaction.editReply({ files: [imgPath] });
            return;
        }
		var database = globals.ReadDatabase();
        var team_name = interaction.options.get('druzyna').value;

        var team = database.teams.filter(
            function(data){ return data.name.toLowerCase() == team_name.toLowerCase() }
        );
        //check if team exists
        if (team[0] === undefined) {
            var message = '```ansi\n[1;31mBrak drużyny [1;34m' + team_name + '[0m[1;31m w bazie[0m\n```'
            await interaction.editReply(message);
            return;
        }
		var message = '```ansi\n[1;37mKoniec tury ' + team[0].turn + ' dla drużyny [1;34m' + team[0].name + '\n';
        for(element of team[0].members){
            character = database.characters.filter(
                function(data){ return data.name.toLowerCase() == element.toLowerCase()}
            );
            if (character[0] === undefined) {
                var character = database.enemies.filter(
                    function(data){ return data.name.toLowerCase() == element.toLowerCase() }
                );
            }
            message += '[1;32m' + character[0].name + ' ';
            if(Object.hasOwn(character[0],'bleeding')){
                message += '[1;31mkrwawienie: -' + character[0].bleeding + ' ';
                character[0].hp -= character[0].bleeding;
            }
            if(Object.hasOwn(character[0],'poison')){
                message += '[1;31mzatrucie: -' + character[0].poison + ' ';
                character[0].hp -= character[0].poison;
            }
            if(Object.hasOwn(character[0],'curse')){
                message += '[1;34mklątwa: -' + character[0].curse + ' ';
                character[0].mana -= character[0].curse;
            }
            if(Object.hasOwn(character[0],'stun')){
                character[0].stun -= 1;
                if(character[0].stun < 1){
                    delete character[0].stun;
                    message += '[1;37mKoniec ogłuszenia '
                }
                else{
                    message += '[1;37mOgłuszenie: ' + character[0].stun;
                    if(character[0].stun === 1) message += ' tura ';
                    else message += ' tury ';
                }
            }
            if(Object.hasOwn(character[0],'root')){
                message += '[1;37mUnieruchomienie';
            }
            if(Object.hasOwn(character[0],'powalenie')){
                character[0].powalenie -= 1;
                if(character[0].powalenie < 1){
                    delete character[0].powalenie;
                }
                else{
                    message += '[1;37mPowalenie ';
                }
            }
            if(Object.hasOwn(character[0],'krok_w_tyl')){
                character[0].krok_w_tyl -= 1;
                if(character[0].krok_w_tyl < 1){
                    delete character[0].krok_w_tyl;
                }
                else{
                    message += '[1;37mkrok w tył aktywny ';
                }
            }
            if(Object.hasOwn(character[0],'riposta')){
                character[0].riposta -= 1;
                if(character[0].riposta < 1){
                    delete character[0].riposta;
                }
                else{
                    message += '[1;37mriposta aktywna ';
                }
            }
            if(Object.hasOwn(character[0],'sokole_oko')){
                message += '[1;37mSokole oko: bonus ' + (character[0].sokole_oko - 1)*100 + '% ';
            }
            character[0].hp = Math.max(0,character[0].hp);
            message += '[1;37m| [1;31mPZ: ' + character[0].hp + '/' + character[0].max_hp +
            '[1;34m Mana: ' + character[0].mana + '/' + character[0].max_mana +
            '[1;36m Kondycja: ' + character[0].energy + '/' + character[0].max_energy + '\n';
        }
        message += '[0m```'
        team[0].turn += 1;
        globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};