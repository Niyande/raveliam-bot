const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Odpowiedź na pytanie Tak/Nie')
	,
	async execute(interaction) {
        await interaction.deferReply();
        wynik = globals.getRandomInt(12);
        switch(wynik){
            case 1:
                var message = '```ansi\n[1;32mTak[0m\n```'
                break;
            case 2:
                var message = '```ansi\n[1;32mNa pewno[0m\n```'
                break;
            case 3:
                var message = '```ansi\n[1;32mBez wątpienia[0m\n```'
                break;
            case 4:
                var message = '```ansi\n[1;32mRaczej tak[0m\n```'
                break;
            case 5:
                var message = '```ansi\n[1;32mPrawdopodobnie tak[0m\n```'
                break;
            case 6:
                var message = '```ansi\n[1;33mMożliwe[0m\n```'
                break;
            case 7:
                var message = '```ansi\n[1;33mCiężko stwierdzić[0m\n```'
                break;
            case 8:
                var message = '```ansi\n[1;31mNie[0m\n```'
                break;
            case 9:
                var message = '```ansi\n[1;31mNie ma takiej opcji[0m\n```'
                break;
            case 10:
                var message = '```ansi\n[1;31mZdecydowanie nie[0m\n```'
                break;
            case 11:
                var message = '```ansi\n[1;31mRaczej nie[0m\n```'
                break;
            case 12:
                var message = '```ansi\n[1;31mWątpię[0m\n```'
                break;
        }
		
		await interaction.editReply(message);
	},
};