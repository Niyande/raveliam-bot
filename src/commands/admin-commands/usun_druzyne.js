const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('usun_druzyne')
		.setDescription('Usuń drużynę')
		.addStringOption(option =>
            option
                .setName('nazwa')
                .setDescription('Nazwa drużyny')
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
        var team_name = interaction.options.get('nazwa').value;

        

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
			content: '```ansi\n[1;37mCzy na pewno chcesz [1;31musunąć[1;34m ' + team_name + '[1;37m ?[0m\n```',
			components: [row],
		});

        const collectorFilter = i => i.user.id === interaction.user.id;
        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

            if (confirmation.customId === 'confirm') {
                var team = database.teams.filter(
                    function(data){ return data.name.toLowerCase() == team_name.toLowerCase() }
                );
                //check if team exists
                if (team[0] === undefined) {
                    var message = '```ansi\n[1;31mBrak drużyny [1;34m' + team_name + '[1;31m w bazie[0m\n```'
                } else {
                    for(element of team[0].members){
                        var character = database.enemies.filter(
                            function(data){ return data.name.toLowerCase() == element.toLowerCase() }
                        );
                        if (character[0] === undefined) {
                            var character = database.characters.filter(
                                function(data){ return data.name.toLowerCase() == element.toLowerCase() }
                            );
                        }
                        if(Object.hasOwn(character[0],'team')){
                            if(character[0].team === team[0].name){
                                delete character[0].team;
                            }
                        }
                        
                    }

                    database.teams.splice(database.teams.indexOf(team[0]), 1);
                    globals.SaveFile(JSON.stringify(database));
                    var message = '```ansi\n[1;37mUsunięto [1;34m' + team_name + '[0m\n```';
                }
                await confirmation.update({ content: message, components: [] });
                
            } else if (confirmation.customId === 'cancel') {

                await confirmation.update({ content: '```ansi\n[1;30mAnulowano[0m\n```', components: [] });
            }
        } catch (e) {
            console.log(e);
            await interaction.editReply({ content: '```ansi\n[1;30mBrak odpowiedzi przez minutę, anulowano[0m\n```', components: [] });
        }
	},
};