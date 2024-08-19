const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('r')
		.setDescription('Podstawowy Rzut')
        .addStringOption(option =>
            option
                .setName('kosc')
                .setDescription('opis kości, np. d6, 2d5, 7d4+3')
                .setRequired(true)
        )
	,
	async execute(interaction) {
        await interaction.deferReply();
        var input = interaction.options.get('kosc').value;
        var input_formated = '';
        if (input.startsWith('d')) input = '1' + input;
        if (input.endsWith('d') || !input.includes('d') || !globals.containsNumbers(input)) {
            await interaction.editReply('```ansi\n[1;2m[1;37mKomenda musi zawierać opis kości w formacie [1;32md20[1;37m. np. [1;32md6, 2d5, 7d4+3.[0m\n```');
            return;
        }
        const parts = input.match(/([+-]?\d+d\d+)|([+-]?\d+)/g);
        for (const part of parts) {
            // Check if the part is a dice roll (e.g., '2d6')
            if (part.includes('d')) {
                input_formated += part;
            } else {
                input_formated += '[1;36m' + part + '[0m[1;37m';
            }
        }
        if (input_formated.startsWith('1')) input_formated = input_formated.slice(1);
        const [sum, dice_log] = globals.DiceRoll(input);
        var message = '```ansi\n[1;30m▶[1;37m Kość: [' + input_formated + '] [1;30m▶[1;37m Rzut: [' + dice_log + '] [1;30m▶[1;37m Wynik: [[1;34m' + sum + '[1;37m][0m\n```';
	
		await interaction.editReply(message);
	},
};