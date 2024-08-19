const { SlashCommandBuilder } = require('discord.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Daj komuś warna')
		.addUserOption(option =>
            option
                .setName('user')
                .setDescription('ostrzegany użytkownik')
                .setRequired(true)
        )
	,
	async execute(interaction) {
        await interaction.deferReply();
        if (!interaction.member.roles.cache.some(role => role.name === 'Konserwator 🤖')) {
            var imgPath = path.join(__dirname, '..', '..', '..', 'images', 'ken-you-not.png');
            interaction.editReply({ files: [imgPath] });
            return;
        }
        var user = interaction.options.get('user').value;
        var message = '<@' + user + '>';
        var imgPath = path.join(__dirname, '..', '..', '..', 'images', 'sedan.jpg');
        await interaction.editReply({content: message, files: [imgPath] });
	},
};