const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wpierdol')
		.setDescription('Atak NPC (losowanie części ciała)')
		.addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci, która dostanie wpierdol')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addNumberOption(option =>
            option
                .setName('ilosc')
                .setDescription('Ilosć wpierdolu (obrażen)')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('przebicie')
                .setDescription('Ilosć wpierdolu bezpośredniego (przebicia)')
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
        if (!interaction.member.roles.cache.some(role => role.name === 'Konserwator 🤖')) {
            var imgPath = path.join(__dirname, '..', '..', '..', 'images', 'ken-you-not.png');
            await interaction.editReply({ files: [imgPath] });
            return;
        }
        var name = interaction.options.get('imie').value;
        var amount = interaction.options.get('ilosc').value;
        var armor_damage = Math.ceil(amount/15);

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
        var body_part = character[0].body_parts[globals.getRandomInt(character[0].body_parts.length)-1]
        switch(body_part) {
            case 'glowa':
                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m dostaje buzi w [1;35mczółko';
                break;
            case 'korpus':
                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m otrzymuje cios na [1;35mkorpus';
                break;
            case 'lewa_reka':
                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m otrzymuje cios na [1;35mlewą rękę';
                break;
            case 'prawa_reka':
                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m otrzymuje cios na [1;35mprawą rękę';
                break;
            case 'lewa_noga':
                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m otrzymuje cios na [1;35mlewą nogę';
                break;
            case 'prawa_noga':
                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m otrzymuje cios na [1;35mprawą nogę';
                break;
            default:
                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m otrzymuje cios na [1;35m' + body_part;
                break;
            
        }
        eval('var old_armor_value =  character[0].' + body_part)

        for(let i = 0; i < armor_damage; i += 1){
            if(eval('character[0].' + body_part + '> 0')){
                eval('character[0].' + body_part + '-= 1');
                amount -= 15;
            }
            else {
                character[0].hp -= amount;
                character[0].hp = Math.max(0, character[0].hp);
                break;
            }
        }
        if (interaction.options.get('przebicie')) {
            var penetration = interaction.options.get('przebicie').value;
            character[0].hp -= penetration;
            character[0].hp = Math.max(0, character[0].hp);
        }
        else{
            var penetration = 0;
        }

        globals.SaveFile(JSON.stringify(database));
        amount = Math.max(0, amount);
        message += '\n[1;37mPT: [1;35m' + old_armor_value + '[1;37m => [1;35m';
        eval('message += character[0].' + body_part);
        message += '\n[1;37mObrazenia na postać: [1;31m' + (amount + penetration) + '\nPZ: ' + character[0].hp + '/' + character[0].max_hp + '[0m\n```';
		
		await interaction.editReply(message);
	},
};