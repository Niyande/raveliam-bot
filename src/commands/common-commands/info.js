const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js')
const path = require('path')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Pokaż status postaci')
        .addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci / nazwa wroga')
                .setRequired(true)
                .setAutocomplete(true)
        )
    ,
    async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
        var database = globals.ReadDatabase();
        var choices = [];
        database.characters.forEach((element) => choices.push(element.name));
        database.enemies.forEach((element) => choices.push(element.name));
        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase())).slice(0,25);
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction) {
        await interaction.deferReply();
		var database = globals.ReadDatabase();
        var weapons = globals.ReadWeaponDatabase().weapons;
        var name = interaction.options.get('imie').value;

        var character = database.characters.filter(
            function(data){ return data.name.toLowerCase() == name.toLowerCase() }
        );
        var enemy = database.enemies.filter(
            function(data){ return data.name.toLowerCase() == name.toLowerCase() }
        );

        if (character[0] === undefined && enemy[0] === undefined) {
            var message = '```ansi\n[1;31mBrak postaci [1;32m' + name + '[1;31m w bazie[0m\n```'
            interaction.editReply(message);
            return
        } else if (character[0] === undefined){
            if (!interaction.member.roles.cache.some(role => role.name === 'Konserwator 🤖')) {
                var imgPath = path.join(__dirname, '..', '..', '..', 'images', 'ken-you-not.png');
                await interaction.editReply({ files: [imgPath] });
                return;
            }
            switch (enemy[0].rank){
                case 'dziecko':
                    var rank_display = 'Dziecko';
                    break;
                case 'rekrut':
                    var rank_display = 'Rekrut';
                    break;
                case 'm-straznik':
                    var rank_display = 'Młodszy Strażnik';
                    break;
                case 'straznik':
                    var rank_display = 'Strażnik';
                    break;
                case 's-straznik':
                    var rank_display = 'Starszy Strażnik';
                    break;
                case 'czempion':
                    var rank_display = 'Czempion';
                    break;
            }

            var message1 = '```ansi\n[1;32m' + enemy[0].name +
            '\n[1;33m' + rank_display.padEnd(16, ' ');
            if(enemy[0].body_parts.length < 6){
                for(body_part of enemy[0].body_parts){
                    message1 += '\n                    [1;35m' + body_part.padStart(15, ' ') + '[1;37m | [1;35mPT: ';
                    eval('message1 += enemy[0].' + body_part);
    
                }
                for(let i = 0; i < 6 - enemy[0].body_parts.length; i++){
                    message1 += '\n'
                }
            }
            else{
                for(let i = 0; i < 6; i += 1){
                    message1 += '\n                    '
                    for(let j = i; j < enemy[0].body_parts.length; j += 6){
                        body_part = enemy[0].body_parts[j];
                        switch (body_part){
                            case 'glowa':
                                var partName = 'głowa';
                                break;
                            case 'lewa_reka':
                                var partName = 'lewa ręka';
                                break;
                            case 'prawa_reka':
                                var partName = 'prawa ręka';
                                break;
                            case 'korpus':
                                var partName = 'korpus';
                                break;
                            case 'lewa_noga':
                                var partName = 'lewa noga';
                                break;
                            case 'prawa_noga':
                                var partName = 'prawa noga';
                                break;
                            default:
                                var partName = body_part.replace('_',' ');
                        }
                        message1 += '[1;35m' + partName.padStart(15, ' ') + '[1;37m | [1;35mPT: ';
                        eval('message1 += enemy[0].' + body_part);
                        message1 += '[1;37m | '
                    }
                }
            }
            
            message1 += '\n[1;31mPŻ:       ' + enemy[0].hp.toString().padStart(3, ' ') + '/' + enemy[0].max_hp.toString().padEnd(3, ' ') + '[1;37m' +
            '\n[1;34mMana:     ' + enemy[0].mana.toString().padStart(3, ' ') + '/' + enemy[0].max_mana.toString().padEnd(3, ' ') + '[1;37m' +
            '\n[1;36mKondycja: ' + enemy[0].energy.toString().padStart(3, ' ') + '/' + enemy[0].max_energy.toString().padEnd(3, ' ') + '[1;37m' +
            '\n```';

            var message2_lines = ['[1;32m' + enemy[0].name.padEnd(26, ' '),'','','','','','','','','','']
            for(weapon_name of enemy[0].weapons){
                weapon = weapons.filter(
                    function(data){ return data.name.toLowerCase() == weapon_name.toLowerCase() }
                );
                message2_lines[1] += '[1;37m' + weapon[0].display_name.padEnd(29, ' ');
                message2_lines[2] += '[0m[2;37mObrażenia: [1;37m' + weapon[0].damage.toString().padEnd(18, ' ');
                var j = 3;
                if(Object.hasOwn(weapon[0],'penetration')){
                    message2_lines[j] += '[0m[2;37mPrzebicie: [1;37m' + weapon[0].penetration.toString().padEnd(18, ' ');
                    j++;
                }
                if(Object.hasOwn(weapon[0],'unarmored_damage')){
                    message2_lines[j] += '[0m[2;37mObrażenia bez pancerza: [1;37m' + weapon[0].unarmored_damage.toString().padEnd(5, ' ');
                    j++;
                }
                if(weapon[0].type === 'crossbow'){
                    message2_lines[j] += '[0m[2;37mPrzeładowana: [1;37m';
                    if(eval('enemy[0].reload.' + weapon[0].name + ' < 1')) {
                        message2_lines[j] += 'Nie            ';
                    } else {
                        message2_lines[j] += 'Tak            ';
                    }
                    j++;
                }

                if(weapon[0].type === 'ranged' || weapon[0].type === 'proca' || weapon[0].type === 'noze' || weapon[0].type === 'bow' || weapon[0].type === 'crossbow'){
                    message2_lines[j] += '[0m[2;37mAmunicja:                 ';
                    j++
                    switch(weapon[0].ammo_type){
                        case 'kamienie':
                            if(Object.hasOwn(enemy[0].ammo[0], 'small_stones')){
                                message2_lines[j] += '[0m[2;37m Małe kamienie: [1;37m' + enemy[0].ammo[0].small_stones.toString().padEnd(19, ' ');
                                j++;
                            }
                            if(Object.hasOwn(enemy[0].ammo[0], 'big_stones')){
                                message2_lines[j] += '[0m[2;37m Duże kamienie: [1;37m' + enemy[0].ammo[0].big_stones.toString().padEnd(19, ' ');
                                j++;
                            }
                            break;
                        case 'proca':
                            if(Object.hasOwn(enemy[0].ammo[0], 'small_stones')){
                                message2_lines[j] += '[0m[2;37m Małe kamienie: [1;37m' + enemy[0].ammo[0].small_stones.toString().padEnd(19, ' ');
                                j++;
                            }
                            if(Object.hasOwn(enemy[0].ammo[0], 'big_stones')){
                                message2_lines[j] += '[0m[2;37m Duże kamienie: [1;37m' + enemy[0].ammo[0].big_stones.toString().padEnd(19, ' ');
                                j++;
                            }
                            break;
                        case 'noze':
                            if(Object.hasOwn(enemy[0].ammo[0], 'throwing_knifes')){
                                message2_lines[j] += '[0m[2;37m Noże: [1;37m' + enemy[0].ammo[0].throwing_knifes.toString().padEnd(19, ' ');
                                j++;
                            }
                            break;
                        case 'luk':
                            if(Object.hasOwn(enemy[0].ammo[0], 'arrows')){
                                message2_lines[j] += '[0m[2;37m Strzały: [1;37m' + enemy[0].ammo[0].arrows.toString().padEnd(19, ' ');
                                j++;
                            }
                            if(Object.hasOwn(enemy[0].ammo[0], 'fire_arrows')){
                                message2_lines[j] += '[0m[2;37m Strzały zapalające: [1;37m' + enemy[0].ammo[0].fire_arrows.toString().padEnd(8, ' ');
                                j++;
                            }
                            if(Object.hasOwn(enemy[0].ammo[0], 'smoke_arrows')){
                                message2_lines[j] += '[0m[2;37m Strzały dymne: [1;37m' + enemy[0].ammo[0].smoke_arrows.toString().padEnd(13, ' ');
                                j++;
                            }
                            if(Object.hasOwn(enemy[0].ammo[0], 'serrated_arrows')){
                                message2_lines[j] += '[0m[2;37m Strzały z zadziorami: [1;37m' + enemy[0].ammo[0].serrated_arrows.toString().padEnd(6, ' ');
                                j++;
                            }
                            if(Object.hasOwn(enemy[0].ammo[0], 'rope_cutting_arrows')){
                                message2_lines[j] += '[0m[2;37m Strzały do lin: [1;37m' + enemy[0].ammo[0].rope_cutting_arrows.toString().padEnd(12, ' ');
                                j++;
                            }
                            break;
                        case 'kusza':
                            if(Object.hasOwn(enemy[0].ammo[0], 'bolts')){
                                message2_lines[j] += '[0m[2;37m Bełty: [1;37m' + enemy[0].ammo[0].bolts.toString().padEnd(21, ' ');
                                j++;
                            }
                            if(Object.hasOwn(enemy[0].ammo[0], 'rope_bolts')){
                                message2_lines[j] += '[0m[2;37m Bełty z liną: [1;37m' + enemy[0].ammo[0].rope_bolts.toString().padEnd(14, ' ');
                                j++;
                            }
                            if(Object.hasOwn(enemy[0].ammo[0], 'whistle_bolts')){
                                message2_lines[j] += '[0m[2;37m Bełty z gwizdkiem: [1;37m' + enemy[0].ammo[0].whistle_bolts.toString().padEnd(9, ' ');
                                j++;
                            }
                            if(Object.hasOwn(enemy[0].ammo[0], 'poison_bolts')){
                                message2_lines[j] += '[0m[2;37m Bełty zatrute: [1;37m' + enemy[0].ammo[0].poison_bolts.toString().padEnd(13, ' ');
                                j++;
                            }
                            if(Object.hasOwn(enemy[0].ammo[0], 'flares')){
                                message2_lines[j] += '[0m[2;37m Flary: [1;37m' + enemy[0].ammo[0].flares.toString().padEnd(21, ' ');
                                j++;
                            }
                            break;
                    }
                }
                for(let i = j; i < 11; i++){
                    message2_lines[i] += '                             ';
                }
            }
            if(enemy[0].weapons.length === 0){
                message2_lines[2] = '[1;37mBrak broni'
            }
            var message2 = '```ansi\n'
            for(let i = 0; i < 11; i++){
                message2 += message2_lines[i] + '\n'
            }
            message2 += '[0m```';
            
            var message3 = '```ansi\n[1;32m' + enemy[0].name +
            '\n[1;33m' + enemy[0].race +
            '\n\n[0m[4;2mSiła          [1;37m | ' + enemy[0].sila.toString().padStart(2, ' ');
            if(Object.hasOwn(enemy[0],'modifier_sila')){
                message3 += '[1;34m ';
                if(enemy[0].modifier_sila > 0) message3 += '+';
                message3 += enemy[0].modifier_sila;
            }
            message3 += '\n[0m[4;2mZręczność     [1;37m | ' + enemy[0].zrecznosc.toString().padStart(2, ' ');
            if(Object.hasOwn(enemy[0],'modifier_zrecznosc')){
                message3 += '[1;34m ';
                if(enemy[0].modifier_zrecznosc > 0) message3 += '+';
                message3 += enemy[0].modifier_zrecznosc;
            }
            message3 += '\n[0m[4;2mPrecyzja      [1;37m | ' + enemy[0].precyzja.toString().padStart(2, ' ');
            if(Object.hasOwn(enemy[0],'modifier_precyzja')){
                message3 += '[1;34m ';
                if(enemy[0].modifier_precyzja > 0) message3 += '+';
                message3 += enemy[0].modifier_precyzja;
            }
            message3 += '\n[0m[4;2mWytrzymałość  [1;37m | ' + enemy[0].wytrzymalosc.toString().padStart(2, ' ');
            if(Object.hasOwn(enemy[0],'modifier_wytrzymalosc')){
                message3 += '[1;34m ';
                if(enemy[0].modifier_wytrzymalosc > 0) message3 += '+';
                message3 += enemy[0].modifier_wytrzymalosc;
            }
            message3 += '\n[0m[4;2mWola          [1;37m | ' + enemy[0].wola.toString().padStart(2, ' ');
            if(Object.hasOwn(enemy[0],'modifier_wola')){
                message3 += '[1;34m ';
                if(enemy[0].modifier_wola > 0) message3 += '+';
                message3 += enemy[0].modifier_wola;
            }
            message3 += '\n[0m[4;2mInteligencja  [1;37m | ' + enemy[0].inteligencja.toString().padStart(2, ' ');
            if(Object.hasOwn(enemy[0],'modifier_inteligencja')){
                message3 += '[1;34m ';
                if(enemy[0].modifier_inteligencja > 0) message3 += '+';
                message3 += enemy[0].modifier_inteligencja;
            }
            message3 += '\n[0m[4;2mRetoryka      [1;37m | ' + enemy[0].retoryka.toString().padStart(2, ' ');
            if(Object.hasOwn(enemy[0],'modifier_retoryka')){
                message3 += '[1;34m ';
                if(enemy[0].modifier_retoryka > 0) message3 += '+';
                message3 += enemy[0].modifier_retoryka;
            }
            message3 += '\n[0m[4;2mFortuna       [1;37m | ' + enemy[0].fortuna.toString().padStart(2, ' ');
            if(Object.hasOwn(enemy[0],'modifier_fortuna')){
                message3 += '[1;34m ';
                if(enemy[0].modifier_fortuna > 0) message3 += '+';
                message3 += enemy[0].modifier_fortuna;
            }
            message3 += '\n[0m```';

            var has_effects = 0;
            var message4 = '```ansi\n[1;32m' + enemy[0].name + '[0m' + '\n\n';
            if(Object.hasOwn(enemy[0],'bleeding')){
                message4 += '[1;31mKrwawienie: ' + enemy[0].bleeding + '\n';
                has_effects += 1;
            }
            if(Object.hasOwn(enemy[0],'poison')){
                message4 += '[1;31mTrucizna: ' + enemy[0].poison + '\n';
                has_effects += 1;
            }
            if(Object.hasOwn(enemy[0],'curse')){
                message4 += '[1;34mKlątwa: ' + enemy[0].curse + '\n';
                has_effects += 1;
            }
            if(Object.hasOwn(enemy[0],'stun')){
                message4 += '[1;37mOgłuszenie: ' + enemy[0].stun;
                if(enemy[0].stun === 1) message4 += ' tura\n';
                else if(enemy[0].stun < 5) message4 += ' tury\n';
                else message4 += ' tur\n';
                has_effects += 1;
            }
            if(Object.hasOwn(enemy[0],'root')){
                message4 += '[1;37mUnieruchomienie\n'
                has_effects += 1;
            }
            if(Object.hasOwn(enemy[0],'powalenie')){
                message4 += '[1;37mPowalenie\n'
                has_effects += 1;
            }
            if(Object.hasOwn(enemy[0],'krok_w_tyl')){
                message4 += '[1;37mKrok w tył aktywny\n';
                has_effects += 1;
            }
            if(Object.hasOwn(enemy[0],'riposta')){
                message4 += '[1;37mRiposta:' + enemy[0].riposta;
                if(enemy[0].riposta === 1) message4 += ' tura\n';
                else if(enemy[0].riposta < 5) message4 += ' tury\n';
                else message4 += ' tur\n';
                has_effects += 1;
            }
            if(Object.hasOwn(enemy[0],'sokole_oko')){
                message4 += '[1;37mSokole oko: bonus ' + (enemy[0].sokole_oko - 1)*100 + '% ';
                has_effects += 1;
            }
            if(Object.hasOwn(enemy[0],'kac')){
                message4 += '[1;37mKac: ' + enemy[0].kac;
                has_effects += 1;
            }
    
            if (has_effects === 0){
                message4 += '[1;37mBrak efektów\n\n\n\n\n\n\n\n'
            }
            else{
                for(let i = 0; i < 8 - has_effects; i += 1){
                    message4 += '\n'
                }
            }
    
            message4 += ' \n```';

        } else {
            switch (character[0].rank){
                case 'dziecko':
                    var rank_display = 'Dziecko';
                    break;
                case 'rekrut':
                    var rank_display = 'Rekrut';
                    break;
                case 'm-straznik':
                    var rank_display = 'Młodszy Strażnik';
                    break;
                case 'straznik':
                    var rank_display = 'Strażnik';
                    break;
                case 's-straznik':
                    var rank_display = 'Starszy Strażnik';
                    break;
                case 'czempion':
                    var rank_display = 'Czempion';
                    break;
            }
            var message1_lines1 = [
            ('[1;32m' + character[0].name.padEnd(20, ' ')),
            ('[1;33m' + rank_display.padEnd(20, ' ')),
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            ('[1;31mPŻ:       ' + character[0].hp.toString().padStart(3, ' ') + '/' + character[0].max_hp.toString().padEnd(3, ' ') + '   '),
            ('[1;34mMana:     ' + character[0].mana.toString().padStart(3, ' ') + '/' + character[0].max_mana.toString().padEnd(3, ' ') + '   '),
            ('[1;36mKondycja: ' + character[0].energy.toString().padStart(3, ' ') + '/' + character[0].max_energy.toString().padEnd(3, ' ') + '   ')
            ];
            var message1_lines2 = [
            '                    ',
            '   [1;35m' + character[0].glowa + '  [1;37m!             ',
            '    [1;35m\\[1;37m.-.            ',
            '[1;35m' + character[0].lewa_reka + '  [1;37m__|=|__  [1;35m' + character[0].prawa_reka + '       ',
            ' [1;35m\\[1;37m(_/`-`\\_)[1;35m/        ',
            '  [1;37m//\\_[1;35m' + character[0].korpus + '[1;37m_/\\\\         ',
            '  <>/   \\<>         ',
            '   \\|_._|/          ',
            '  [1;35m' + character[0].lewa_noga + '[1;37m <_I_> [1;35m' + character[0].prawa_noga + '         ',
            '   [1;35m\\[1;37m ||| [1;35m/          ',
            '    [1;37m/_|_\\           '
            ];
            if(Object.hasOwn(character[0],'shield')){
                var message1_lines3 = ['[1;37m' + character[0].shield.display_name,'[1;35mPT: ' + character[0].shield.durability,'','','','','','','','','']
            }
            else var message1_lines3 = [];

            var message1 = '```ansi\n'
            var message1_lines = [];
            for(let i = 0; i < 11; i++){
                message1_lines[i] = message1_lines1[i] + message1_lines2[i]
                if (message1_lines3.length != 0) message1_lines[i] += message1_lines3[i]
            }
            for(let i = 0; i < 11; i++){
                message1 += message1_lines[i] + '\n'
            }
            message1 += '```';

            var message2_lines = ['[1;32m' + character[0].name.padEnd(26, ' '),'','','','','','','','','','']
            for(weapon_name of character[0].weapons){
                weapon = weapons.filter(
                    function(data){ return data.name.toLowerCase() == weapon_name.toLowerCase() }
                );
                message2_lines[1] += '[1;37m' + weapon[0].display_name.padEnd(29, ' ');
                message2_lines[2] += '[0m[2;37mObrażenia: [1;37m' + weapon[0].damage.toString().padEnd(18, ' ');
                var j = 3;
                if(Object.hasOwn(weapon[0],'penetration')){
                    message2_lines[j] += '[0m[2;37mPrzebicie: [1;37m' + weapon[0].penetration.toString().padEnd(18, ' ');
                    j++;
                }
                if(Object.hasOwn(weapon[0],'unarmored_damage')){
                    message2_lines[j] += '[0m[2;37mObrażenia bez pancerza: [1;37m' + weapon[0].unarmored_damage.toString().padEnd(5, ' ');
                    j++;
                }
                if(weapon[0].type === 'crossbow'){
                    message2_lines[j] += '[0m[2;37mPrzeładowana: [1;37m';
                    if(eval('character[0].reload.' + weapon[0].name + ' < 1')) {
                        message2_lines[j] += 'Nie            ';
                    } else {
                        message2_lines[j] += 'Tak            ';
                    }
                    j++;
                }
                if(weapon[0].type === 'ranged' || weapon[0].type === 'proca' || weapon[0].type === 'noze' || weapon[0].type === 'bow' || weapon[0].type === 'crossbow'){
                    message2_lines[j] += '[0m[2;37mAmunicja:                 ';
                    j++
                    switch(weapon[0].ammo_type){
                        case 'kamienie':
                            if(Object.hasOwn(character[0].ammo[0], 'small_stones')){
                                message2_lines[j] += '[0m[2;37m Małe kamienie: [1;37m' + character[0].ammo[0].small_stones.toString().padEnd(19, ' ');
                                j++;
                            }
                            if(Object.hasOwn(character[0].ammo[0], 'big_stones')){
                                message2_lines[j] += '[0m[2;37m Duże kamienie: [1;37m' + character[0].ammo[0].big_stones.toString().padEnd(19, ' ');
                                j++;
                            }
                            break;
                        case 'proca':
                            if(Object.hasOwn(character[0].ammo[0], 'small_stones')){
                                message2_lines[j] += '[0m[2;37m Małe kamienie: [1;37m' + character[0].ammo[0].small_stones.toString().padEnd(19, ' ');
                                j++;
                            }
                            if(Object.hasOwn(character[0].ammo[0], 'big_stones')){
                                message2_lines[j] += '[0m[2;37m Duże kamienie: [1;37m' + character[0].ammo[0].big_stones.toString().padEnd(19, ' ');
                                j++;
                            }
                            break;
                        case 'noze':
                            if(Object.hasOwn(character[0].ammo[0], 'throwing_knifes')){
                                message2_lines[j] += '[0m[2;37m Noże: [1;37m' + character[0].ammo[0].throwing_knifes.toString().padEnd(19, ' ');
                                j++;
                            }
                            break;
                        case 'luk':
                            if(Object.hasOwn(character[0].ammo[0], 'arrows')){
                                message2_lines[j] += '[0m[2;37m Strzały: [1;37m' + character[0].ammo[0].arrows.toString().padEnd(19, ' ');
                                j++;
                            }
                            if(Object.hasOwn(character[0].ammo[0], 'fire_arrows')){
                                message2_lines[j] += '[0m[2;37m Strzały zapalające: [1;37m' + character[0].ammo[0].fire_arrows.toString().padEnd(8, ' ');
                                j++;
                            }
                            if(Object.hasOwn(character[0].ammo[0], 'smoke_arrows')){
                                message2_lines[j] += '[0m[2;37m Strzały dymne: [1;37m' + character[0].ammo[0].smoke_arrows.toString().padEnd(13, ' ');
                                j++;
                            }
                            if(Object.hasOwn(character[0].ammo[0], 'serrated_arrows')){
                                message2_lines[j] += '[0m[2;37m Strzały z zadziorami: [1;37m' + character[0].ammo[0].serrated_arrows.toString().padEnd(6, ' ');
                                j++;
                            }
                            if(Object.hasOwn(character[0].ammo[0], 'rope_cutting_arrows')){
                                message2_lines[j] += '[0m[2;37m Strzały do lin: [1;37m' + character[0].ammo[0].rope_cutting_arrows.toString().padEnd(12, ' ');
                                j++;
                            }
                            break;
                        case 'kusza':
                            if(Object.hasOwn(character[0].ammo[0], 'bolts')){
                                message2_lines[j] += '[0m[2;37m Bełty: [1;37m' + character[0].ammo[0].bolts.toString().padEnd(21, ' ');
                                j++;
                            }
                            if(Object.hasOwn(character[0].ammo[0], 'rope_bolts')){
                                message2_lines[j] += '[0m[2;37m Bełty z liną: [1;37m' + character[0].ammo[0].rope_bolts.toString().padEnd(14, ' ');
                                j++;
                            }
                            if(Object.hasOwn(character[0].ammo[0], 'whistle_bolts')){
                                message2_lines[j] += '[0m[2;37m Bełty z gwizdkiem: [1;37m' + character[0].ammo[0].whistle_bolts.toString().padEnd(9, ' ');
                                j++;
                            }
                            if(Object.hasOwn(character[0].ammo[0], 'poison_bolts')){
                                message2_lines[j] += '[0m[2;37m Bełty zatrute: [1;37m' + character[0].ammo[0].poison_bolts.toString().padEnd(13, ' ');
                                j++;
                            }
                            if(Object.hasOwn(character[0].ammo[0], 'flares')){
                                message2_lines[j] += '[0m[2;37m Flary: [1;37m' + character[0].ammo[0].flares.toString().padEnd(21, ' ');
                                j++;
                            }
                            break;
                    }
                }
                for(let i = j; i < 11; i++){
                    message2_lines[i] += '                             ';
                }
            }
            if(character[0].weapons.length === 0){
                message2_lines[2] = '[1;37mBrak broni'
            }
            var message2 = '```ansi\n'
            for(let i = 0; i < 11; i++){
                message2 += message2_lines[i] + '\n'
            }
            message2 += '[0m```';
    
            var message3 = '```ansi\n[1;32m' + character[0].name +
            '\n[1;33m' + character[0].race +
            '\n\n[0m[4;2mSiła          [1;37m | ' + character[0].sila.toString().padStart(2, ' ');
            if(Object.hasOwn(character[0],'modifier_sila')){
                message3 += '[1;34m ';
                if(character[0].modifier_sila > 0) message3 += '+';
                message3 += character[0].modifier_sila;
            }
            message3 += '\n[0m[4;2mZręczność     [1;37m | ' + character[0].zrecznosc.toString().padStart(2, ' ');
            if(Object.hasOwn(character[0],'modifier_zrecznosc')){
                message3 += '[1;34m ';
                if(character[0].modifier_zrecznosc > 0) message3 += '+';
                message3 += character[0].modifier_zrecznosc;
            }
            message3 += '\n[0m[4;2mPrecyzja      [1;37m | ' + character[0].precyzja.toString().padStart(2, ' ');
            if(Object.hasOwn(character[0],'modifier_precyzja')){
                message3 += '[1;34m ';
                if(character[0].modifier_precyzja > 0) message3 += '+';
                message3 += character[0].modifier_precyzja;
            }
            message3 += '\n[0m[4;2mWytrzymałość  [1;37m | ' + character[0].wytrzymalosc.toString().padStart(2, ' ');
            if(Object.hasOwn(character[0],'modifier_wytrzymalosc')){
                message3 += '[1;34m ';
                if(character[0].modifier_wytrzymalosc > 0) message3 += '+';
                message3 += character[0].modifier_wytrzymalosc;
            }
            message3 += '\n[0m[4;2mWola          [1;37m | ' + character[0].wola.toString().padStart(2, ' ');
            if(Object.hasOwn(character[0],'modifier_wola')){
                message3 += '[1;34m ';
                if(character[0].modifier_wola > 0) message3 += '+';
                message3 += character[0].modifier_wola;
            }
            message3 += '\n[0m[4;2mInteligencja  [1;37m | ' + character[0].inteligencja.toString().padStart(2, ' ');
            if(Object.hasOwn(character[0],'modifier_inteligencja')){
                message3 += '[1;34m ';
                if(character[0].modifier_inteligencja > 0) message3 += '+';
                message3 += character[0].modifier_inteligencja;
            }
            message3 += '\n[0m[4;2mRetoryka      [1;37m | ' + character[0].retoryka.toString().padStart(2, ' ');
            if(Object.hasOwn(character[0],'modifier_retoryka')){
                message3 += '[1;34m ';
                if(character[0].modifier_retoryka > 0) message3 += '+';
                message3 += character[0].modifier_retoryka;
            }
            message3 += '\n[0m[4;2mFortuna       [1;37m | ' + character[0].fortuna.toString().padStart(2, ' ');
            if(Object.hasOwn(character[0],'modifier_fortuna')){
                message3 += '[1;34m ';
                if(character[0].modifier_fortuna > 0) message3 += '+';
                message3 += character[0].modifier_fortuna;
            }
            message3 += '\n[0m```';
    
            var has_effects = 0;
            var message4 = '```ansi\n[1;32m' + character[0].name + '[0m' + '\n\n';
            if(Object.hasOwn(character[0],'bleeding')){
                message4 += '[1;31mKrwawienie: ' + character[0].bleeding + '\n';
                has_effects += 1;
            }
            if(Object.hasOwn(character[0],'poison')){
                message4 += '[1;31mTrucizna: ' + character[0].poison + '\n';
                has_effects += 1;
            }
            if(Object.hasOwn(character[0],'curse')){
                message4 += '[1;34mKlątwa: ' + character[0].curse + '\n';
                has_effects += 1;
            }
            if(Object.hasOwn(character[0],'stun')){
                message4 += '[1;37mOgłuszenie: ' + character[0].stun;
                if(character[0].stun === 1) message4 += ' tura\n';
                else if(character[0].stun < 5) message4 += ' tury\n';
                else message4 += ' tur\n';
                has_effects += 1;
            }
            if(Object.hasOwn(character[0],'root')){
                message4 += '[1;37mUnieruchomienie\n'
                has_effects += 1;
            }
            if(Object.hasOwn(character[0],'powalenie')){
                message4 += '[1;37mPowalenie\n'
                has_effects += 1;
            }
            if(Object.hasOwn(character[0],'krok_w_tyl')){
                message4 += '[1;37mKrok w tył aktywny\n';
                has_effects += 1;
            }
            if(Object.hasOwn(character[0],'riposta')){
                message4 += '[1;37mRiposta: ' + character[0].riposta;
                if(character[0].riposta === 1) message4 += ' tura\n';
                else if(character[0].riposta < 5) message4 += ' tury\n';
                else message4 += ' tur\n';
                has_effects += 1;
            }
            if(Object.hasOwn(character[0],'sokole_oko')){
                message4 += '[1;37mSokole oko: bonus ' + (character[0].sokole_oko - 1)*100 + '% ';
                has_effects += 1;
            }
            if(Object.hasOwn(character[0],'kac')){
                message4 += '[1;37mKac: ' + character[0].kac;
                has_effects += 1;
            }
    
            if (has_effects === 0){
                message4 += '[1;37mBrak efektów\n\n\n\n\n\n\n\n'
            }
            else{
                for(let i = 0; i < 8 - has_effects; i += 1){
                    message4 += '\n'
                }
            }
    
            message4 += ' \n```';
        }
        

        const change_page = new ButtonBuilder()
			.setCustomId('change_page')
			.setLabel('Następna strona')
			.setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
			.addComponents(change_page);

        const response = await interaction.editReply({
			content: message1,
			components: [row],
		});
        var page = 1;
        while(true){
            try {
                const page_changer = await response.awaitMessageComponent();
    
                if (page_changer.customId === 'change_page') {
                    if (page === 1) {
                        page = 2
                        await page_changer.update({ content: message2, components: [row] });
                        continue;
                    }
                    else if (page === 2) {
                        page = 3
                        await page_changer.update({ content: message3, components: [row] });
                        continue;
                    }
                    else if (page === 3) {
                        page = 4
                        await page_changer.update({ content: message4, components: [row] });
                        continue;
                    }
                    else if (page === 4) {
                        page = 1
                        await page_changer.update({ content: message1, components: [row] });
                        continue;
                    }
                }
            } catch (e) {
                break;
            }
        }
        
	},
};