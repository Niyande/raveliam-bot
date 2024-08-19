const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ammo')
		.setDescription('dodaj/odejmij amunicję')
		.addStringOption(option =>
            option
                .setName('imie')
                .setDescription('Imię postaci')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option
                .setName('rodzaj')
                .setDescription('Rodzaj amunicji')
                .setRequired(true)
                .addChoices(
                    { name: 'Strzały', value: 'arrows' },
                    { name: 'Strzały zapalające', value: 'fire_arrows' },
                    { name: 'Strzały dymne', value: 'smoke_arrows' },
                    { name: 'Strzały z zadziorami', value: 'serrated_arrows' },
                    { name: 'Strzały do lin', value: 'rope_cutting_arrows' },
                    { name: 'Bełty', value: 'bolts' },
                    { name: 'Bełty z liną', value: 'rope_bolts' },
                    { name: 'Bełty z gwizdkiem', value: 'whistle_bolts' },
                    { name: 'Bełty zatrute', value: 'poison_bolts' },
                    { name: 'Flary', value: 'flares' },
                    { name: 'Małe kamienie', value: 'small_stones' },
                    { name: 'Duże kamienie', value: 'big_stones' },
                    { name: 'Noże do rzucania', value: 'throwing_knifes' }
                )
        )
        .addNumberOption(option =>
            option
                .setName('ilosc')
                .setDescription('ilosc amunicji do dodania/odjęcia')
                .setRequired(true)
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
        if (!interaction.member.roles.cache.some(role => role.name === 'Konserwator 🤖')) {
            var imgPath = path.join(__dirname, '..', '..', '..', 'images', 'ken-you-not.png');
            await interaction.editReply({ files: [imgPath] });
            return;
        }
		var database = globals.ReadDatabase();
        var name = interaction.options.get('imie').value;
        var ammo_type = interaction.options.get('rodzaj').value;
        var amount = interaction.options.get('ilosc').value;

        var character = database.characters.filter(
            function(data){ return data.name.toLowerCase() == name.toLowerCase() }
        );
        if (character[0] === undefined) {
            var character = database.enemies.filter(
                function(data){ return data.name.toLowerCase() == name.toLowerCase() }
            );
            if (character[0] === undefined) {
                var message = '```ansi\n[1;31mBrak postaci [1;32m' + name + '[1;31m w bazie[0m\n```'
                interaction.editReply(message);
                return
            }
        }
        if(Object.hasOwn(character[0].ammo[0], ammo_type)){
            eval('character[0].ammo[0].' + ammo_type + '+= amount');
        }
        else{
            eval('character[0].ammo[0].' + ammo_type + '= amount');
        }
        
        if (eval('character[0].ammo[0].' + ammo_type) < 1){
            eval('delete character[0].ammo[0].' + ammo_type);
        }
        switch(ammo_type){
            case 'arrows':
                if(!Object.hasOwn(character[0].ammo[0],ammo_type)) var ammo_name = 'strzał';
                else{
                    var ammo_amount = eval('character[0].ammo[0].' + ammo_type);
                    if(ammo_amount === 1) var ammo_name = 'strzałę';
                    else if(ammo_amount < 5 ) var ammo_name = 'strzały';
                    else if(ammo_amount < 22) var ammo_name = 'strzał';
                    else if(ammo_amount % 10 > 1 && ammo_amount % 10 < 5) var ammo_name = 'strzały';
                    else var ammo_name = 'strzał';
                }
                break;
            case 'fire_arrows':
                if(!Object.hasOwn(character[0].ammo[0],ammo_type)) var ammo_name = 'strzał zapalających';
                else{
                    var ammo_amount = eval('character[0].ammo[0].' + ammo_type);
                    if(ammo_amount === 1) var ammo_name = 'strzałę zapalającą';
                    else if(ammo_amount < 5 ) var ammo_name = 'strzały zapalające';
                    else if(ammo_amount < 22) var ammo_name = 'strzał zapalających';
                    else if(ammo_amount % 10 > 1 && ammo_amount % 10 < 5) var ammo_name = 'strzały zapalające';
                    else var ammo_name = 'strzał zapalających';
                }
                break;
            case 'smoke_arrows':
                if(!Object.hasOwn(character[0].ammo[0],ammo_type)) var ammo_name = 'strzał dymnych';
                else{
                    var ammo_amount = eval('character[0].ammo[0].' + ammo_type);
                    if(ammo_amount === 1) var ammo_name = 'strzałę dymną';
                    else if(ammo_amount < 5 ) var ammo_name = 'strzały dymne';
                    else if(ammo_amount < 22) var ammo_name = 'strzał dymnych';
                    else if(ammo_amount % 10 > 1 && ammo_amount % 10 < 5) var ammo_name = 'strzały dymne';
                    else var ammo_name = 'strzał dymnych';
                }
                break;
            case 'serrated_arrows':
                if(!Object.hasOwn(character[0].ammo[0],ammo_type)) var ammo_name = 'strzał z zadziorami';
                else{
                    var ammo_amount = eval('character[0].ammo[0].' + ammo_type);
                    if(ammo_amount === 1) var ammo_name = 'strzałę z zadziorami';
                    else if(ammo_amount < 5 ) var ammo_name = 'strzały z zadziorami';
                    else if(ammo_amount < 22) var ammo_name = 'strzał z zadziorami';
                    else if(ammo_amount % 10 > 1 && ammo_amount % 10 < 5) var ammo_name = 'strzały z zadziorami';
                    else var ammo_name = 'strzał z zadziorami';
                }
                break;
            case 'rope_cutting_arrows':
                if(!Object.hasOwn(character[0].ammo[0],ammo_type)) var ammo_name = 'strzał do lin';
                else{
                    var ammo_amount = eval('character[0].ammo[0].' + ammo_type);
                    if(ammo_amount === 1) var ammo_name = 'strzałę do lin';
                    else if(ammo_amount < 5 ) var ammo_name = 'strzały do lin';
                    else if(ammo_amount < 22) var ammo_name = 'strzał do lin';
                    else if(ammo_amount % 10 > 1 && ammo_amount % 10 < 5) var ammo_name = 'strzały do lin';
                    else var ammo_name = 'strzał do lin';
                }
                break;
            case 'bolts':
                if(!Object.hasOwn(character[0].ammo[0],ammo_type)) var ammo_name = 'bełtów';
                else{
                    var ammo_amount = eval('character[0].ammo[0].' + ammo_type);
                    if(ammo_amount === 1) var ammo_name = 'bełt';
                    else if(ammo_amount < 5 ) var ammo_name = 'bełty';
                    else if(ammo_amount < 22) var ammo_name = 'bełtów';
                    else if(ammo_amount % 10 > 1 && ammo_amount % 10 < 5) var ammo_name = 'bełty';
                    else var ammo_name = 'bełtów';
                }
                break;
            case 'rope_bolts':
                if(!Object.hasOwn(character[0].ammo[0],ammo_type)) var ammo_name = 'bełtów z liną';
                else{
                    var ammo_amount = eval('character[0].ammo[0].' + ammo_type);
                    if(ammo_amount === 1) var ammo_name = 'bełt z liną';
                    else if(ammo_amount < 5 ) var ammo_name = 'bełty z liną';
                    else if(ammo_amount < 22) var ammo_name = 'bełtów z liną';
                    else if(ammo_amount % 10 > 1 && ammo_amount % 10 < 5) var ammo_name = 'bełty z liną';
                    else var ammo_name = 'bełtów z liną';
                }
                break;
            case 'whistle_bolts':
                if(!Object.hasOwn(character[0].ammo[0],ammo_type)) var ammo_name = 'bełtów z gwizdkiem';
                else{
                    var ammo_amount = eval('character[0].ammo[0].' + ammo_type);
                    if(ammo_amount === 1) var ammo_name = 'bełt z gwizdkiem';
                    else if(ammo_amount < 5 ) var ammo_name = 'bełty z gwizdkiem';
                    else if(ammo_amount < 22) var ammo_name = 'bełtów z gwizdkiem';
                    else if(ammo_amount % 10 > 1 && ammo_amount % 10 < 5) var ammo_name = 'bełty z gwizdkiem';
                    else var ammo_name = 'bełtów z gwizdkiem';
                }
                break;
            case 'poison_bolts':
                if(!Object.hasOwn(character[0].ammo[0],ammo_type)) var ammo_name = 'zatrutych bełtów';
                else{
                    var ammo_amount = eval('character[0].ammo[0].' + ammo_type);
                    if(ammo_amount === 1) var ammo_name = 'zatruty bełt';
                    else if(ammo_amount < 5 ) var ammo_name = 'zatrute bełty';
                    else if(ammo_amount < 22) var ammo_name = 'zatrutych bełtów';
                    else if(ammo_amount % 10 > 1 && ammo_amount % 10 < 5) var ammo_name = 'zatrute bełty';
                    else var ammo_name = 'zatrutych bełtów';
                }
                break;
            case 'flares':
                if(!Object.hasOwn(character[0].ammo[0],ammo_type)) var ammo_name = 'flar';
                else{
                    var ammo_amount = eval('character[0].ammo[0].' + ammo_type);
                    if(ammo_amount === 1) var ammo_name = 'flarę';
                    else if(ammo_amount < 5 ) var ammo_name = 'flary';
                    else if(ammo_amount < 22) var ammo_name = 'flar';
                    else if(ammo_amount % 10 > 1 && ammo_amount % 10 < 5) var ammo_name = 'flary';
                    else var ammo_name = 'flar';
                }
                break;
            case 'small_stones':
                if(!Object.hasOwn(character[0].ammo[0],ammo_type)) var ammo_name = 'małych kamieni';
                else{
                    var ammo_amount = eval('character[0].ammo[0].' + ammo_type);
                    if(ammo_amount === 1) var ammo_name = 'mały kamień';
                    else if(ammo_amount < 5 ) var ammo_name = 'małe kamienie';
                    else if(ammo_amount < 22) var ammo_name = 'małych kamieni';
                    else if(ammo_amount % 10 > 1 && ammo_amount % 10 < 5) var ammo_name = 'małe kamienie';
                    else var ammo_name = 'małych kamieni';
                }
                break;
            case 'big_stones':
                if(!Object.hasOwn(character[0].ammo[0],ammo_type)) var ammo_name = 'dużych kamieni';
                else{
                    var ammo_amount = eval('character[0].ammo[0].' + ammo_type);
                    if(ammo_amount === 1) var ammo_name = 'duży kamień';
                    else if(ammo_amount < 5 ) var ammo_name = 'duże kamienie';
                    else if(ammo_amount < 22) var ammo_name = 'dużych kamieni';
                    else if(ammo_amount % 10 > 1 && ammo_amount % 10 < 5) var ammo_name = 'duże kamienie';
                    else var ammo_name = 'dużych kamieni';
                }
                break;
            case 'throwing_knifes':
                if(!Object.hasOwn(character[0].ammo[0],ammo_type)) var ammo_name = 'noży do rzucania';
                else{
                    var ammo_amount = eval('character[0].ammo[0].' + ammo_type);
                    if(ammo_amount === 1) var ammo_name = 'nóż do rzucania';
                    else if(ammo_amount < 5 ) var ammo_name = 'noże do rzucania';
                    else if(ammo_amount < 22) var ammo_name = 'noży do rzucania';
                    else if(ammo_amount % 10 > 1 && ammo_amount % 10 < 5) var ammo_name = 'noże do rzucania';
                    else var ammo_name = 'noży do rzucania';
                }
                break;
        }

        if(Object.hasOwn(character[0].ammo[0],ammo_type)){
            var message = '```ansi\n[1;32m' + character[0].name + '[1;37m ma teraz ' + eval('character[0].ammo[0].' + ammo_type) + ' ' + ammo_name + '[0m\n```';
        }
        else{
            var message = '```ansi\n[1;32m' + character[0].name + '[1;37m nie ma teraz ' + ammo_name + '[0m\n```'; 
        }
        
		globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};