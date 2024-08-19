const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lista_postaci')
		.setDescription('Pokaż listę zapisanych postaci'),
	async execute(interaction) {
        await interaction.deferReply();
        var database = globals.ReadDatabase();
		var message = '```ansi\n';
        var list = [];
        if (database.characters.length === 0) {
            message += '[1;31mBrak postaci w bazie.[0m\n';
        }
        else {
            database.characters.forEach((element) => list.push(element.name));
            list.sort();
            message += '[1;32m'
            if(list.length > 20){
                for(let i = 0; i < 20; i += 1){
                    for(let j = i; j < list.length; j += 20){
                        message += list[j].padEnd(25, ' ') + '| ';
                    }
                    message = message.slice(0,-2);
                    message += '\n';
                }
            }
            else{
                list.forEach((element) => message += element + '\n')
            }
            
            message += '[0m\n';
        }
        message += '```'
        interaction.editReply(message);
	},
};