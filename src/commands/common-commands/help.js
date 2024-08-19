const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Lista dostępnych komend')
	,
	async execute(interaction) {
        await interaction.deferReply();
        var message = '```ansi\n';
        var message_lines = [];
        var message_list = [];
        message_lines.push('[1;37mLista komend dla administracji: [0m\n');
        for(command of interaction.client.commands) {
            if (command[1].data.name === '8ball'){
                message_lines.push('\n[1;37mLista komend dla graczy: [0m\n');
            }
            message_lines.push('/' + command[1].data.name + ' => ' + command[1].data.description + '\n');
        }
        for(let i = 0; i < message_lines.length; i += 25){
            message = '```ansi\n';
            for(let j = i; j < i + 25 && j < message_lines.length; j++){
                message += message_lines[j];
            }
            message += '[0m\n```';
            message_list.push(message);
        }


        const change_page = new ButtonBuilder()
			.setCustomId('change_page')
			.setLabel('Następna strona')
			.setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
			.addComponents(change_page);

        const response = await interaction.editReply({
			content: message_list[0],
			components: [row],
		});

		var page = 0;
        while(true){
            try {
                const page_changer = await response.awaitMessageComponent();
    
                if (page_changer.customId === 'change_page') {
                    page ++;
                    if(page === message_list.length) page = 0;
                    await page_changer.update({ content: message_list[page], components: [row] });
                }
            } catch (e) {
                break;
            }
        }
	},
};