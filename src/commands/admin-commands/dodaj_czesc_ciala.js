const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dodaj_czesc_ciala')
		.setDescription('dodaje wrogu część ciała')
		.addStringOption(option =>
            option
                .setName('nazwa')
                .setDescription('Nazwa wroga')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('czesc')
                .setDescription('Nazwa części ciała')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('pt')
                .setDescription('PT czesci ciala')
        )
	,
    async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
        var database = globals.ReadDatabase();
        var choices = [];
        database.enemies.forEach((element) => choices.push(element.name));
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
        var name = interaction.options.get('nazwa').value;
        var enemy = database.enemies.filter(
            function(data){ return data.name.toLowerCase() == name.toLowerCase() }
        );
        if (enemy[0] === undefined){
            var message = '```ansi\n[1;31mBrak wroga [1;32m' + name + '[0m[1;31m w bazie[0m\n```'
            await interaction.editReply(message);
            return
        }
        
        var body_part = interaction.options.get('czesc').value.toLowerCase();
        body_part = body_part.replace(' ','_');
        console.log(body_part);
        if(Object.hasOwn(enemy[0],body_part)){
            var message = '```ansi\n[1;32m' + name + '[1;37m ma już część ciała[1;35m' + body_part + '[0m\n```'
            await interaction.editReply(message);
            return
        }

        enemy[0].body_parts.push(body_part);

        if (interaction.options.get('pt')){
            var pt = interaction.options.get('pt').value;
            eval('enemy[0].' + body_part + '= pt');
        }
        else{
            eval('enemy[0].' + body_part + '= 0');
        }
        globals.SaveFile(JSON.stringify(database));

        var message = '```ansi\nDodano [1;35m' + body_part + '[1;37m do [1;32m' + name + '[1;35m PT: ';
        eval('message += enemy[0].' + body_part);
        message += '[0m\n```';
		await interaction.editReply(message);
	},
};