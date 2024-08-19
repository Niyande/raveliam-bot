const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wyczysc_baze')
		.setDescription('Wyczyść bazę postaci do zera')
	,
	async execute(interaction) {
        await interaction.deferReply();
        if (!interaction.member.roles.cache.some(role => role.name === 'Konserwator 🤖')) {
            var imgPath = path.join(__dirname, '..', '..', '..', 'images', 'ken-you-not.png');
            await interaction.editReply({ files: [imgPath] });
            return;
        }
        const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Wyczyść')
			.setStyle(ButtonStyle.Danger);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Anuluj')
			.setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
			.addComponents(cancel, confirm);

        const response = await interaction.editReply({
			content: '```ansi\n[1;37mCzy na pewno chcesz [1;31mwyczyścić bazę do zera?[0m\n```',
			components: [row],
		});

        const collectorFilter = i => i.user.id === interaction.user.id;
        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

            if (confirmation.customId === 'confirm') {
                var database = {characters:[],teams:[],enemies:[]}
                globals.SaveFile(JSON.stringify(database));
                var message = '```ansi\n[1;37mWyczyszczono bazę[0m\n```'
                        
                await confirmation.update({ content: message, components: [] });
                
            } else if (confirmation.customId === 'cancel') {

                await confirmation.update({ content: '```ansi\n[1;30mAnulowano[0m\n```', components: [] });
            }
        } catch (e) {
            await interaction.editReply({ content: '```ansi\n[1;30mBrak odpowiedzi przez minutę, anulowano[0m\n```', components: [] });
        }
	},
};