const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nowa_druzyna')
		.setDescription('Tworzy nową drużynę')
		.addStringOption(option =>
            option
                .setName('nazwa')
                .setDescription('Nazwa drużyny')
                .setRequired(true)
        )
	,
	async execute(interaction) {
        await interaction.deferReply();
        if (!interaction.member.roles.cache.some(role => role.name === 'Konserwator 🤖')) {
            var imgPath = path.join(__dirname, '..', '..', '..', 'images', 'ken-you-not.png');
            await interaction.editReply({ files: [imgPath] });
            return;
        }
        var database = globals.ReadDatabase();
        var team_name = interaction.options.get('nazwa').value;

        var team = database.teams.filter(
            function(data){ return data.name.toLowerCase() == team_name.toLowerCase() }
        );
        //check if team exists
        if (team[0] === undefined) {
            database.teams.push({name: team_name, turn: 1, members: [], last_action: {}});
            globals.SaveFile(JSON.stringify(database));
            var message = '```ansi\n[1;37mStworzono [1;34m' + team_name + '[0m\n```';
        }
        else{
            var message = '```ansi\n[1;31mDrużyna [1;34m' + team_name + '[1;31m jest już w bazie[0m\n```'
        }
        
		await interaction.editReply(message);
	},
};