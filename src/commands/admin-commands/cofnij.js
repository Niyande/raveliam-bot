const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cofnij')
		.setDescription('cofa ostatnią akcję')
		.addStringOption(option =>
            option
                .setName('druzyna')
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
        var team_name = interaction.options.get('druzyna').value;

        var team = database.teams.filter(
            function(data){ return data.name.toLowerCase() == team_name.toLowerCase() }
        );
        //check if team exists
        if (team[0] === undefined) {
            var message = '```ansi\n[1;31mBrak drużyny [1;34m' + team_name + '[1;31m w bazie[0m\n```'
            await interaction.editReply(message);
            return;
        }
        if (JSON.stringify(team[0].last_action) == "{}"){
            var message = '```ansi\n[1;31mDrużyna [1;34m' + team_name + '[1;31m nie ma akcji do cofnięcia[0m\n```'
            await interaction.editReply(message);
            return;
        }
        else{
            var character = database.characters.filter(
                function(data){ return data.name.toLowerCase() == team[0].last_action.name.toLowerCase() }
            );
            if (character[0] === undefined) {
                var character = database.enemies.filter(
                    function(data){ return data.name.toLowerCase() == team[0].last_action.name.toLowerCase() }
                );
                if (character[0] === undefined) {
                    var message = '```ansi\n[1;31mBrak postaci [1;32m' + team[0].last_action.name + '[0m[1;31m w bazie[0m\n```'
                    await interaction.editReply(message);
                    return
                }
            }
            character[0].energy += team[0].last_action.energy_cost;

            switch(team[0].last_action.action) {
                case "atak":
                    if(team[0].last_action.success){
                        var enemy = database.characters.filter(
                            function(data){ return data.name.toLowerCase() == team[0].last_action.target.toLowerCase() }
                        );
                        if (enemy[0] === undefined) {
                            var enemy = database.enemies.filter(
                                function(data){ return data.name.toLowerCase() == team[0].last_action.target.toLowerCase() }
                            );
                            if (enemy[0] === undefined) {
                                var message = '```ansi\n[1;31mBrak postaci [1;32m' + team[0].last_action.name + '[1;31m w bazie[0m\n```'
                                await interaction.editReply(message);
                                return
                            }
                        }

                        enemy[0].hp += team[0].last_action.damage;
                        eval('enemy[0].' + team[0].last_action.body_part + ' += ' + team[0].last_action.armor_damage);
                        if(Object.hasOwn(enemy[0],'bleeding')){
                            enemy[0].bleeding -= team[0].last_action.bleed_change;
                        }
                        var message = '```ansi\n[1;37mCofnięto[1;34m atak [1;32m' + character[0].name + '[0m\n```';
                    }
                    break;
                case "atak_zasiegowy":
                    if(Object.hasOwn(character[0].ammo[0],'team[0].last_action.ammo')) eval('character[0].ammo[0].' + team[0].last_action.ammo + '+= 1');
                    else eval('character[0].ammo[0].' + team[0].last_action.ammo + '= 1');

                    if(team[0].last_action.success){
                        var enemy = database.characters.filter(
                            function(data){ return data.name.toLowerCase() == team[0].last_action.target.toLowerCase() }
                        );
                        if (enemy[0] === undefined) {
                            var enemy = database.enemies.filter(
                                function(data){ return data.name.toLowerCase() == team[0].last_action.target.toLowerCase() }
                            );
                            if (enemy[0] === undefined) {
                                var message = '```ansi\n[1;31mBrak postaci [1;32m' + team[0].last_action.name + '[1;31m w bazie[0m\n```'
                                await interaction.editReply(message);
                                return
                            }
                        }

                        enemy[0].hp += team[0].last_action.damage;
                        eval('enemy[0].' + team[0].last_action.body_part + ' += ' + team[0].last_action.armor_damage);
                        if(Object.hasOwn(enemy[0],'bleeding')){
                            enemy[0].bleeding -= team[0].last_action.bleed_change;
                        }
                        if(Object.hasOwn(team[0].last_action,'reload')){
                            eval('character[0].reload.' + team[0].last_action.reload + ' = 1');
                        }
                        var message = '```ansi\n[1;37mCofnięto[1;34m atak zasiegowy [1;32m' + character[0].name + '[0m\n```';
                    }
                    break;
                default:
                    var message = '```ansi\n[1;31mNie cofnięto, nieznana akcja [0m\n```';
                    await interaction.editReply(message);
                    return;
            }
            team[0].last_action = {};
        }
		
		globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};