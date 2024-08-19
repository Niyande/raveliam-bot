const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('atak')
		.setDescription('Rzut na atak')
        .addSubcommand(subcommand =>
            subcommand
                .setName('bez_celu')
                .setDescription('rzut na atak bez celu')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci atakującej')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('statystyka')
                        .setDescription('Statystyka wykorzystywana do ataku')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Siła', value: 'sila' },
                            { name: 'Zręczność', value: 'zrecznosc' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('bron')
                        .setDescription('broń, którą postać atakuje')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('modyfikator')
                        .setDescription('Modyfikator do progu')
                )
                .addNumberOption(option =>
                    option
                        .setName('modyfikator_procentowy')
                        .setDescription('Modyfikator procentowy do progu')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('z_celem')
                .setDescription('rzut na atak z celem (zadaje obrażenia)')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci atakującej')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('statystyka')
                        .setDescription('Statystyka wykorzystywana do ataku')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Siła', value: 'sila' },
                            { name: 'Zręczność', value: 'zrecznosc' },
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('bron')
                        .setDescription('broń, którą postać atakuje')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('cel')
                        .setDescription('Imię/nazwa celu ataku')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('czesc')
                        .setDescription('Zaatakowana część ciała')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('modyfikator')
                        .setDescription('Modyfikator do progu')
                )
        )
	,
    async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
        var database = globals.ReadDatabase();
        var weapons = globals.ReadWeaponDatabase().weapons;
        var choices = [];
        if(focusedOption.name === 'imie'){
            database.characters.forEach((element) => choices.push(element.name));
            database.enemies.forEach((element) => choices.push(element.name));
        } else if(focusedOption.name.includes('cel')) {
            var name = interaction.options.get('imie').value;
            var possible_characters = database.enemies.concat(database.characters);
            var character = possible_characters.filter(
                function(data){ return data.name.toLowerCase() == name.toLowerCase() }
            );
            var team = database.teams.filter(
                function(data){ return data.name.toLowerCase() == character[0].team.toLowerCase()}
            );
            team[0].members.forEach((element) =>{
                if(element.toLowerCase() != character[0].name.toLowerCase()) choices.push(element);
            });
        } else if(focusedOption.name === 'czesc'){
            var target = interaction.options.get('cel').value;
            var possible_targets = database.enemies.concat(database.characters);
            var enemy = possible_targets.filter(
                function(data){ return data.name.toLowerCase() == target.toLowerCase() }
            );
            enemy[0].body_parts.forEach((element) => choices.push(element));
        } else if(focusedOption.name === 'bron'){
            var name = interaction.options.get('imie').value;
            var possible_characters = database.enemies.concat(database.characters);
            var character = possible_characters.filter(
                function(data){ return data.name.toLowerCase() == name.toLowerCase() }
            );
            character[0].weapons.forEach((weapon_name) =>{
                var weapon = weapons.filter(
                    function(data){ return data.name.toLowerCase() == weapon_name.toLowerCase() }
                );
                if(weapon[0].type === 'melee') choices.push(weapon[0].display_name)
            });

        }
        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedOption.value.toLowerCase())).slice(0,25);
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction) {
        await interaction.deferReply();
        var subcommand = interaction.options.getSubcommand();
		var database = globals.ReadDatabase();
        var weapons = globals.ReadWeaponDatabase().weapons;
        var name = interaction.options.get('imie').value;
        var weapon_name = interaction.options.get('bron').value;
        var stat = interaction.options.get('statystyka').value;

        var character = database.characters.filter(
            function(data){ return data.name.toLowerCase() == name.toLowerCase() }
        );
        if (character[0] === undefined) {
            var character = database.enemies.filter(
                function(data){ return data.name.toLowerCase() == name.toLowerCase() }
            );
            if (character[0] === undefined) {
                var message = '```ansi\n[1;31mBrak postaci [1;32m' + name + '[0m[1;31m w bazie[0m\n```'
                await interaction.editReply(message);
                return
            }
        }
        var weapon = weapons.filter(
            function(data){ return data.display_name.toLowerCase() == weapon_name.toLowerCase() }
        );
        if (weapon[0] === undefined) {
            var message = '```ansi\n[1;31mBrak broni [1;35m' + weapon_name + '[0m[1;31m w bazie[0m\n```'
            await interaction.editReply(message);
            return
        }
        var weapon_dmg = weapon[0].damage;

        if(Object.hasOwn(weapon[0],'bleed')) var bleed = weapon[0].bleed;
        else var bleed = 0;

        if(subcommand === 'z_celem'){
            var body_part = interaction.options.get('czesc').value;
            var target = interaction.options.get('cel').value;
            var enemy = database.enemies.filter(
                function(data){ return data.name.toLowerCase() == target.toLowerCase() }
            );
            if (enemy[0] === undefined) {
                var enemy = database.characters.filter(
                    function(data){ return data.name.toLowerCase() == target.toLowerCase() }
                );
                if (enemy[0] === undefined) {
                    var message = '```ansi\n[1;31mBrak postaci [1;32m' + name + '[0m[1;31m w bazie[0m\n```'
                    await interaction.editReply(message);
                    return
                }
            }
            if(character[0].team != enemy[0].team){
                var message = '```ansi\n[1;31mPostać i cel muszą być w tej samej drużynie[0m\n```'
                await interaction.editReply(message);
                return
            }
            if(eval('enemy[0].' + body_part + '=== 0')){
                if(Object.hasOwn(weapon[0],'unarmored_damage')) weapon_dmg = weapon[0].unarmored_damage;
                if(Object.hasOwn(weapon[0],'unarmored_bleed')) bleed = weapon[0].unarmored_bleed;
                
            }
        }

        
        if(Object.hasOwn(weapon[0],'penetration')) var penetration = weapon[0].penetration;
        else var penetration = 0;

        if(Object.hasOwn(character[0],'stun')){
            var message = '```ansi\n[1;32m' + character[0].name + '[1;31m jest ogluszony/a!\n```'
            await interaction.editReply(message);
            return
        }

        switch (character[0].rank){
            case 'rekrut':
                var dice = 20;
                break;
            case 'm-straznik':
                var dice = 30;
                break;
            case 'straznik':
                var dice = 40;
                break;
            case 's-straznik':
                var dice = 50;
                break;
            case 'czempion':
                var dice = 60;
                break;
        }

        if(character[0].energy < 2){
            var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
            interaction.editReply(message);
            return
        }
        character[0].energy -= 2;
        if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

        var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Atak wręcz\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy;

        eval('var stat_value = character[0].' + stat);
        if(Object.hasOwn(character[0],'kac')){
            stat_value -= character[0].kac;
        }
        if(Object.hasOwn(character[0],'modifier_' + stat)){
            eval('stat_value += character[0].modifier_' + stat);
        }
        var roll = globals.getRandomInt(dice);
        if(interaction.options.get('modyfikator')){
            var modifier = interaction.options.get('modyfikator').value;
            stat_value += modifier;
        }
        if(interaction.options.get('modyfikator_procentowy')){
            var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
            stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
        }
        
        message += '[1;37m Wynik rzutu: [[1;34m' + roll + '[1;37m] Próg: ' + stat_value;

        if(roll === dice){
            message += '[1;31m Krytyczna porażka!';
        }
        else if(roll > stat_value && roll != 1){
            message += '[1;31m Porażka!';
        }
        else{
            var damage = stat_value - roll + weapon_dmg;
            if (roll === 1){
                message += '[1;31m krytyczne'
                damage *= 2;
            }
            message += '[1;32m trafienie! [1;37mObrażenia: [1;31m' + (damage);

            switch (subcommand){
                case 'bez_celu':
                    break;
                case 'z_celem':
                    
                    message += '\n\n';

                    if(Object.hasOwn(enemy[0],'krok_w_tyl')){
                        message += '[1;32m' + enemy[0].name + '[1;37m unika ataku za pomocą [1;34mkroku w tył[1;37m i może wykonać atak[0m\n```';
                        delete enemy[0].krok_w_tyl;
                        break;
                    }

                    switch(body_part) {
                        case 'glowa':
                            message += '[1;32m' + enemy[0].name + '[1;37m dostaje buzi w [1;35mczółko'
                            break;
                        case 'korpus':
                            message += '[1;32m' + enemy[0].name + '[1;37m otrzymuje cios na [1;35mkorpus'
                            break;
                        case 'lewa_reka':
                            message += '[1;32m' + enemy[0].name + '[1;37m otrzymuje cios na [1;35mlewą rękę'
                            break;
                        case 'prawa_reka':
                            message += '[1;32m' + enemy[0].name + '[1;37m otrzymuje cios na [1;35mprawą rękę'
                            break;
                        case 'lewa_noga':
                            message += '[1;32m' + enemy[0].name + '[1;37m otrzymuje cios na [1;35mlewą nogę'
                            break;
                        case 'prawa_noga':
                            message += '[1;32m' + enemy[0].name + '[1;37m otrzymuje cios na [1;35mprawą nogę'
                            break;
                        default:
                            message += '[1;32m' + enemy[0].name + '[1;37m otrzymuje cios na [1;35m' + body_part;
                            break;
                    }
                    var armor_damage = Math.ceil(damage/15);
    
                    eval('var old_armor_value =  enemy[0].' + body_part)
    
                    for(let i = 0; i < armor_damage; i += 1){
                        if(eval('enemy[0].' + body_part + '> 0')){
                            eval('enemy[0].' + body_part + '-= 1');
                            damage -= 15;
                        }
                        else {
                            enemy[0].hp -= damage;
                            enemy[0].hp = Math.max(0, enemy[0].hp);
                            break;
                        }
                    }
                    damage = Math.max(0, damage);
                    
                    enemy[0].hp -= penetration;
                    enemy[0].hp = Math.max(0, enemy[0].hp);
    
                    message += '[1;35m PT: ' + old_armor_value + '[1;37m => [1;35m';
                    eval('message += enemy[0].' + body_part);
                    message += '\n[1;37mObrazenia na postać: [1;31m' + (damage + penetration);
                    if(bleed > 0){
                        if(Object.hasOwn(enemy[0],'bleeding')){
                            enemy[0].bleeding = Math.max(bleed,enemy[0].bleeding);
                        }else{
                            enemy[0].bleeding = bleed;
                        }
                        message += '[1;31m krwawienie: ' + enemy[0].bleeding;
                    }

                    message += '\nPZ: ' + enemy[0].hp + '/' + enemy[0].max_hp;

                    if(Object.hasOwn(enemy[0],'riposta')){
                        if(enemy[0].riposta < 6){
                            var enemy_weapon_name = enemy[0].weapons[0];
                            if(enemy_weapon_name === undefined){
                                message += '\n\n[1;32m' + enemy[0].name + '[1;37m nie może wykonać [1;34mriposty[1;37m, ponieważ nie ma broni';
                            }
                            else{
                                var riposte_body_part = character[0].body_parts[globals.getRandomInt(character[0].body_parts.length) - 1];
                                var enemy_weapon = weapons.filter(
                                    function(data){ return data.name.toLowerCase() == enemy_weapon_name.toLowerCase() }
                                );
                                if(Object.hasOwn(enemy_weapon[0],'penetration')) var enemy_penetration = enemy_weapon[0].penetration;
                                else var enemy_penetration = 0;
            
                                if(Object.hasOwn(enemy_weapon[0],'bleed')) var enemy_bleed = enemy_weapon[0].bleed;
                                else var enemy_bleed = 0;
            
                                var enemy_weapon_dmg = enemy_weapon[0].damage;
            
                                if(eval('character[0].' + riposte_body_part + '=== 0')){
                                    if(Object.hasOwn(enemy_weapon[0],'unarmored_damage')) enemy_weapon_dmg = enemy_weapon[0].unarmored_damage;
                                    if(Object.hasOwn(enemy_weapon[0],'unarmored_bleed')) enemy_bleed = enemy_weapon[0].unarmored_bleed;
                                }
            
                                message += '\n\n[1;32m' + enemy[0].name + '[1;37m wykonuje [1;34mripostę[1;37m. Obrażenia: [1;31m' + enemy_weapon_dmg + '\n\n';
                                
                                switch(riposte_body_part) {
                                    case 'glowa':
                                        message += '[1;32m' + character[0].name + '[1;37m dostaje buzi w [1;35mczółko'
                                        break;
                                    case 'korpus':
                                        message += '[1;32m' + character[0].name + '[1;37m otrzymuje cios na [1;35mkorpus'
                                        break;
                                    case 'lewa_reka':
                                        message += '[1;32m' + character[0].name + '[1;37m otrzymuje cios na [1;35mlewą rękę'
                                        break;
                                    case 'prawa_reka':
                                        message += '[1;32m' + character[0].name + '[1;37m otrzymuje cios na [1;35mprawą rękę'
                                        break;
                                    case 'lewa_noga':
                                        message += '[1;32m' + character[0].name + '[1;37m otrzymuje cios na [1;35mlewą nogę'
                                        break;
                                    case 'prawa_noga':
                                        message += '[1;32m' + character[0].name + '[1;37m otrzymuje cios na [1;35mprawą nogę'
                                        break;
                                    default:
                                        message += '[1;32m' + character[0].name + '[1;37m otrzymuje cios na [1;35m' + riposte_body_part;
                                        break;
                                }
            
                                var riposte_armor_damage = Math.ceil(enemy_weapon_dmg/15);
            
                                eval('var riposte_old_armor_value =  character[0].' + riposte_body_part)
                
                                for(let i = 0; i < riposte_armor_damage; i += 1){
                                    if(eval('character[0].' + riposte_body_part + '> 0')){
                                        eval('character[0].' + riposte_body_part + '-= 1');
                                        enemy_weapon_dmg -= 15;
                                    }
                                    else {
                                        character[0].hp -= enemy_weapon_dmg;
                                        character[0].hp = Math.max(0, character[0].hp);
                                        break;
                                    }
                                }
                                enemy_weapon_dmg = Math.max(0, enemy_weapon_dmg);
                                
                                character[0].hp -= enemy_penetration;
                                character[0].hp = Math.max(0, character[0].hp);
                
                                message += '[1;35m PT: ' + riposte_old_armor_value + '[1;37m => [1;35m';
                                eval('message += character[0].' + riposte_body_part);
                                message += '\n[1;37mObrazenia na postać: [1;31m' + (enemy_weapon_dmg + enemy_penetration);
                                if(enemy_bleed > 0){
                                    if(Object.hasOwn(character[0],'bleeding')){
                                        character[0].bleeding = Math.max(enemy_bleed, character[0].bleeding);
                                    }else{
                                        character[0].bleeding = enemy_bleed;
                                    }
                                    message += '[1;31m krwawienie: ' + character[0].bleeding;
                                }
            
                                message += '\nPZ: ' + character[0].hp + '/' + character[0].max_hp;
                            }
                        }
                    }
                    break;
            }
        }
        
        message += '[0m\n```'
		globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};