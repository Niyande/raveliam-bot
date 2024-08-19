const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Rzut monetą')
	,
	async execute(interaction) {
        wynik = globals.getRandomInt(2);
        switch(wynik){
            case 1:
                var message = '```ansi\n[1;37mOrzeł[0m\n```'
                var imgPath = path.join(__dirname, '..', '..', '..', 'images', 'orzel.png');
		        await interaction.reply({content: message, files: [imgPath]});
                break;
            case 2:
                var message = '```ansi\n[1;37mReszka[0m\n```'
                await interaction.reply(message);
                break;
        }
	},
};