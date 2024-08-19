const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wyczysc_wrogow')
		.setDescription('Usuń wszystkich wrogów z bazy')
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
			.setLabel('Usuń')
			.setStyle(ButtonStyle.Danger);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Anuluj')
			.setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
			.addComponents(cancel, confirm);

        const response = await interaction.editReply({
			content: '```ansi\n[1;37mCzy na pewno chcesz [1;31musunąć wszystkich wrogów?[0m\n```',
			components: [row],
		});

        const collectorFilter = i => i.user.id === interaction.user.id;
        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

            if (confirmation.customId === 'confirm') {
                var database = globals.ReadDatabase();
                for(enemy of database.enemies){
                    if(Object.hasOwn(enemy, 'team')){
                        for(element of database.teams){
                            if (element.members.includes(enemy.name)){
                                element.members.splice(element.members.indexOf(enemy.name), 1);
                            }
                        }
                    }
                }
                database.enemies = [];
                globals.SaveFile(JSON.stringify(database));
                var message = '```ansi\n[1;37mUsunięto wszystkich wrogów[0m\n```'
                        
                await confirmation.update({ content: message, components: [] });
                
            } else if (confirmation.customId === 'cancel') {

                await confirmation.update({ content: '```ansi\n[1;30mAnulowano[0m\n```', components: [] });
            }
        } catch (e) {
            await interaction.editReply({ content: '```ansi\n[1;30mBrak odpowiedzi przez minutę, anulowano[0m\n```', components: [] });
        }
	},
};