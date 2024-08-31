const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('atak_zasiegowy')
		.setDescription('Rzut na atak zasiegowy')
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
                        .setName('bron')
                        .setDescription('broń, którą postać atakuje')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('rodzaj_amunicji')
                        .setDescription('Rodzaj amunicji, używanej do ataku')
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
                        .setName('bron')
                        .setDescription('broń, którą postać atakuje')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('rodzaj_amunicji')
                        .setDescription('Rodzaj amunicji, używanej do ataku')
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
                        .setDescription('Zaatakowana część ciała (tylko z sokolim okiem)')
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
                if(weapon[0].type === 'bow' || weapon[0].type === 'crossbow' || weapon[0].type === 'ranged') choices.push(weapon[0].display_name)
            });
        } else if(focusedOption.name === 'rodzaj_amunicji'){
            var weapon_name = interaction.options.get('bron').value;
            var weapon = weapons.filter(
                function(data){ return data.display_name.toLowerCase() == weapon_name.toLowerCase() }
            );
            switch(weapon[0].ammo_type){
                case 'kusza':
                    choices = ['Bełty','Bełty z liną','Bełty z gwizdkiem','Bełty zatrute','Flary'];
                    break;
                case 'luk':
                    choices = ['Strzały','Strzały zapalające','Strzały dymne','Strzały z zadziorami','Strzały do lin'];
                    break;
                case 'noze':
                    choices = ['Noże do rzucania'];
                    break;
                case 'kamienie':
                    choices = ['Małe kamienie','Duże kamienie'];
                    break;
                case 'proca':
                    choices = ['Małe kamienie','Duże kamienie'];
                    break;
            }
        }
        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedOption.value.toLowerCase())).slice(0,25);
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction) {
        await interaction.deferReply();
		var database = globals.ReadDatabase();
        var weapons = globals.ReadWeaponDatabase().weapons;
        var name = interaction.options.get('imie').value;
        var weapon_name = interaction.options.get('bron').value;
        var ammo_name = interaction.options.get('rodzaj_amunicji').value;
        var subcommand = interaction.options.getSubcommand();

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
        if(weapon[0].name === 'pioro_kruka') var weapon_dmg = globals.getRandomInt(20);
        else var weapon_dmg = weapon[0].damage;

        if(Object.hasOwn(weapon[0],'bleed')) var bleed = weapon[0].bleed;
        else bleed = 0;

        if(subcommand === 'z_celem'){
            var target = interaction.options.get('cel').value;
            var enemy = database.enemies.filter(
                function(data){ return data.name.toLowerCase() == target.toLowerCase() }
            );
            if (enemy[0] === undefined) {
                var enemy = database.characters.filter(
                    function(data){ return data.name.toLowerCase() == target.toLowerCase() }
                );
                if (enemy[0] === undefined) {
                    var message = '```ansi\n[1;31mBrak postaci [1;32m' + target + '[0m[1;31m w bazie[0m\n```'
                    await interaction.editReply(message);
                    return
                }
            }
            if(character[0].team != enemy[0].team){
                var message = '```ansi\n[1;31mPostać i cel muszą być w tej samej drużynie[0m\n```'
                await interaction.editReply(message);
                return
            }
            
            if(Object.hasOwn(character[0],'sokole_oko') && interaction.options.get('czesc')) var body_part = interaction.options.get('czesc').value;
            else var body_part = enemy[0].body_parts[globals.getRandomInt(enemy[0].body_parts.length) - 1];


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
            case 'dziecko':
                var dice = 15;
                break;
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
        switch (ammo_name){
            case 'Strzały':
                var ammo_type = 'arrows';
                break;
            case 'Strzały zapalające':
                var ammo_type = 'fire_arrows';
                break;
            case 'Strzały dymne':
                var ammo_type = 'smoke_arrows';
                break;
            case 'Strzały z zadziorami':
                var ammo_type = 'serrated_arrows';
                break;
            case 'Strzały do lin':
                var ammo_type = 'rope_cutting_arrows';
                break;
            case 'Bełty':
                var ammo_type = 'bolts';
                break;
            case 'Bełty z liną':
                var ammo_type = 'rope_bolts';
                break;
            case 'Bełty z gwizdkiem':
                var ammo_type = 'whistle_bolts';
                break;
            case 'Bełty zatrute':
                var ammo_type = 'poison_bolts';
                break;
            case 'Flary':
                var ammo_type = 'flares';
                break;
            case 'Małe kamienie':
                var ammo_type = 'small_stones';
                break;
            case 'Duże kamienie':
                var ammo_type = 'big_stones';
                break;
            case 'Noże do rzucania':
                var ammo_type = 'throwing_knifes';
                break;
        }

        if(character[0].energy < 2){
            var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
            interaction.editReply(message);
            return
        }


        if(!Object.hasOwn(character[0].ammo[0],ammo_type)){
            var message = '```ansi\n[1;32m' + character[0].name + '[1;31m nie ma [1;37mtej amunicji![0m\n```';
            await interaction.editReply(message);
            return
        }
        character[0].energy -= 2;
        eval('character[0].ammo[0].' + ammo_type + '-= 1');
        if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

        var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Atak zasięgowy\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy +
        ' [1;37m' + ammo_name + ': ' + eval('character[0].ammo[0].' + ammo_type);

        if (eval('character[0].ammo[0].' + ammo_type) < 1){
            eval('delete character[0].ammo[0].' + ammo_type);
        }

        var stat_value = character[0].precyzja;
        if(Object.hasOwn(character[0],'kac')){
            stat_value -= character[0].kac;
        }
        if(Object.hasOwn(character[0],'modifier_precyzja')){
            stat_value += character[0].modifier_precyzja;
        }
        if(Object.hasOwn(character[0],"sokole_oko")){
            stat_value = Math.ceil(stat_value*character[0].sokole_oko);
            delete character[0].sokole_oko;
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
                message += ' krytyczne'
                damage *= 2;
            }
            message += '[1;32m trafienie! [1;37mObrażenia: [1;31m' + damage;

            switch (subcommand){
                case 'bez_celu':
                    break;
                case 'z_celem':
                    
                    message += '\n\n'

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

                    enemy[0].hp -= penetration;
                    enemy[0].hp = Math.max(0, enemy[0].hp);
    
                    damage = Math.max(0, damage);
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
                    break;
            }
        }

        message += '[0m\n```'
		globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};