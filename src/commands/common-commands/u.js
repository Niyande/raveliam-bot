const { SlashCommandBuilder } = require('discord.js');
const globals = require('../../globals.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('u')
		.setDescription('Użyj umiejętności')
        //Wojownik
		.addSubcommand(subcommand =>
            subcommand
                .setName('ogluszenie')
                .setDescription('dyskwalifikuje przeciwnika z walki')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('poziom')
                        .setDescription('poziom umiejętności')
                        .setRequired(true)
                        .addChoices(
                            { name:'lvl 1', value: 1},
                            { name:'lvl 2', value: 2},
                            { name:'lvl 3', value: 3},
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('cel')
                        .setDescription('Nazwa/imię celu')
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
                .setName('krok_w_tyl')
                .setDescription('Przygotuj unik i kontratak')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('atak_z_zamachu')
                .setDescription('Zaatakuj kilku wrogów naraz')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
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
                        .setName('cel_1')
                        .setDescription('Nazwa/imię celu')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('cel_2')
                        .setDescription('Nazwa/imię celu')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('cel_3')
                        .setDescription('Nazwa/imię celu')
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('cel_4')
                        .setDescription('Nazwa/imię celu')
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('cel_5')
                        .setDescription('Nazwa/imię celu')
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('cel_6')
                        .setDescription('Nazwa/imię celu')
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
                .setName('potezny_atak')
                .setDescription('Bij mocno')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('poziom')
                        .setDescription('poziom umiejętności')
                        .setRequired(true)
                        .addChoices(
                            { name:'lvl 1', value: 1},
                            { name:'lvl 2', value: 2},
                            { name:'lvl 3', value: 3},
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
                        .setName('cel')
                        .setDescription('Nazwa/imię celu')
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
                .addNumberOption(option =>
                    option
                        .setName('modyfikator_procentowy')
                        .setDescription('Modyfikator procentowy do progu')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('seria')
                .setDescription('Wyprowadź kilka ciosów')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('poziom')
                        .setDescription('poziom umiejętności')
                        .setRequired(true)
                        .addChoices(
                            { name:'lvl 1', value: 1},
                            { name:'lvl 2', value: 2},
                            { name:'lvl 3', value: 3},
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
                        .setName('cel')
                        .setDescription('Nazwa/imię celu')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('czesc1')
                        .setDescription('Zaatakowana część ciała - 1 cios')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('czesc2')
                        .setDescription('Zaatakowana część ciała - 2 cios')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('czesc3')
                        .setDescription('Zaatakowana część ciała - 3 cios')
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('czesc4')
                        .setDescription('Zaatakowana część ciała - 4 cios')
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
        //Barbarzyńca
        .addSubcommand(subcommand =>
            subcommand
                .setName('okrzyk_bitewny')
                .setDescription('Darcie mordy')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('poziom')
                        .setDescription('poziom umiejętności')
                        .setRequired(true)
                        .addChoices(
                            { name:'lvl 1', value: 1},
                            { name:'lvl 2', value: 2},
                            { name:'lvl 3', value: 3},
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('cel')
                        .setDescription('Nazwa/imię celu')
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
                .setName('szarza')
                .setDescription('Zaszarżuj w coś lub kogoś')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('poziom')
                        .setDescription('poziom umiejętności')
                        .setRequired(true)
                        .addChoices(
                            { name:'lvl 1', value: 1},
                            { name:'lvl 2', value: 2},
                            { name:'lvl 3', value: 3},
                        )
                )
                .addStringOption(option =>
                    option
                        .setName('cel')
                        .setDescription('Nazwa/imię celu')
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
                .setName('atak_z_wyskoku')
                .setDescription('Bij mocniej z góry')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('poziom')
                        .setDescription('poziom umiejętności')
                        .setRequired(true)
                        .addChoices(
                            { name:'lvl 1', value: 1},
                            { name:'lvl 2', value: 2},
                            { name:'lvl 3', value: 3},
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
                        .setName('cel')
                        .setDescription('Nazwa/imię celu')
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
                .addNumberOption(option =>
                    option
                        .setName('modyfikator_procentowy')
                        .setDescription('Modyfikator procentowy do progu')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('szal')
                .setDescription('Napierdalanie na oślep')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('poziom')
                        .setDescription('poziom umiejętności')
                        .setRequired(true)
                        .addChoices(
                            { name:'lvl 1', value: 1},
                            { name:'lvl 2', value: 2},
                            { name:'lvl 3', value: 3},
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
                        .setName('cel')
                        .setDescription('Nazwa/imię celu')
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
        //Nożownik
        .addSubcommand(subcommand =>
            subcommand
                .setName('riposta')
                .setDescription('Ja ci dam "nie ma oddawania"')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('nieczysta_gra')
                .setDescription('Honor to scam')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('poziom')
                        .setDescription('poziom umiejętności')
                        .setRequired(true)
                        .addChoices(
                            { name:'lvl 1', value: 1},
                            { name:'lvl 2', value: 2},
                            { name:'lvl 3', value: 3},
                        )
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
                .setName('cios_w_plecy')
                .setDescription('Nic osobistego')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('poziom')
                        .setDescription('poziom umiejętności')
                        .setRequired(true)
                        .addChoices(
                            { name:'lvl 1', value: 1},
                            { name:'lvl 2', value: 2},
                            { name:'lvl 3', value: 3},
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
                        .setDescription('Nazwa/imię celu')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('z_ukrycia')
                        .setDescription('Czy atak jest wykonywany z ukrycia?')
                        .addChoices(
                            { name:'Tak', value:'tak'}
                        )
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
                .setName('ciche_stopki')
                .setDescription('W kolorze węgla')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('poziom')
                        .setDescription('poziom umiejętności')
                        .setRequired(true)
                        .addChoices(
                            { name:'lvl 1', value: 1},
                            { name:'lvl 2', value: 2},
                            { name:'lvl 3', value: 3},
                        )
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
        //Łucznik
        .addSubcommand(subcommand =>
            subcommand
                .setName('szybkostrzelnosc')
                .setDescription('Strzela szybko')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('poziom')
                        .setDescription('poziom umiejętności')
                        .setRequired(true)
                        .addChoices(
                            { name:'lvl 1', value: 1},
                            { name:'lvl 2', value: 2},
                            { name:'lvl 3', value: 3},
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
                        .setDescription('Nazwa/imię celu')
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
                .addNumberOption(option =>
                    option
                        .setName('modyfikator_procentowy')
                        .setDescription('Modyfikator procentowy do progu')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('sokole_oko')
                .setDescription('wytrzeszczasz gały')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('poziom')
                        .setDescription('poziom umiejętności')
                        .setRequired(true)
                        .addChoices(
                            { name:'lvl 1', value: 1},
                            { name:'lvl 2', value: 2},
                            { name:'lvl 3', value: 3},
                        )
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
                .setName('przeszywajaca_strzala')
                .setDescription('przebija pancerze')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('poziom')
                        .setDescription('poziom umiejętności')
                        .setRequired(true)
                        .addChoices(
                            { name:'lvl 1', value: 1},
                            { name:'lvl 2', value: 2},
                            { name:'lvl 3', value: 3},
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
                        .setDescription('Nazwa/imię celu')
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
                .addNumberOption(option =>
                    option
                        .setName('modyfikator_procentowy')
                        .setDescription('Modyfikator procentowy do progu')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('uderzenie_lukiem')
                .setDescription('Kiedy kończą ci się strzały')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
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
                        .setName('cel')
                        .setDescription('Nazwa/imię celu')
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
                .addNumberOption(option =>
                    option
                        .setName('modyfikator_procentowy')
                        .setDescription('Modyfikator procentowy do progu')
                )
        )
        //Kusznik
        .addSubcommand(subcommand =>
            subcommand
                .setName('snajperski_strzal')
                .setDescription('możesz trafić w pieprzyk na tyłku')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addNumberOption(option =>
                    option
                        .setName('poziom')
                        .setDescription('poziom umiejętności')
                        .setRequired(true)
                        .addChoices(
                            { name:'lvl 1', value: 1},
                            { name:'lvl 2', value: 2},
                            { name:'lvl 3', value: 3},
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
                        .setDescription('Nazwa/imię celu')
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
                .addNumberOption(option =>
                    option
                        .setName('modyfikator_procentowy')
                        .setDescription('Modyfikator procentowy do progu')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('przyszpilajacy_strzal')
                .setDescription('przybij przeciwnika do ściany jak ogłoszenie matrymonialne')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
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
                        .setName('cel')
                        .setDescription('Nazwa/imię celu')
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
                .setName('bagnet')
                .setDescription('powal przeciwnika dziugaczem na kuszy')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('cel')
                        .setDescription('Nazwa/imię celu')
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
        //Miotacz
        //Bard
        .addSubcommand(subcommand =>
            subcommand
                .setName('drwina')
                .setDescription('wyzwij im ojca, matkę i rodziców')
                .addStringOption(option =>
                    option
                        .setName('imie')
                        .setDescription('Imię postaci')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('cel')
                        .setDescription('Nazwa/imię celu')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addStringOption(option =>
                    option
                        .setName('statystyka')
                        .setDescription('Statystyka wykorzystywana do ataku')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Retoryka', value: 'retoryka' },
                            { name: 'Perswazja (Retoryka + Inteligencja)', value: 'perswazja' },
                            { name: 'Zastraszanie (Retoryka + Siła)', value: 'zastraszanie' },
                        )
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
        //Inne
	,
    async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
        var database = globals.ReadDatabase();
        var subcommand = interaction.options.getSubcommand();
        switch(subcommand){
            case 'atak_z_zamachu': case 'potezny_atak': case 'seria': case 'atak_z_wyskoku': case 'szal': case 'cios_w_plecy':
                var weapon_type = 'melee';
                break;
            case 'szybkostrzelnosc': case 'przeszywajaca_strzala': case 'uderzenie_lukiem':
                var weapon_type = 'bow';
                break;
            case 'snajperski_strzal': case 'przyszpilajacy_strzal': case 'bagnet':
                var weapon_type = 'crossbow';
                break;
            default:
                var weapon_type = 'none';
                break;
        }
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
            if(Object.hasOwn(character[0], 'team')){
                var team = database.teams.filter(
                    function(data){ return data.name.toLowerCase() == character[0].team.toLowerCase()}
                );
                team[0].members.forEach((element) =>{
                    if(element.toLowerCase() != character[0].name.toLowerCase()) choices.push(element);
                });
            }
        } else if(focusedOption.name.includes('czesc')){
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
                if(weapon[0].type === weapon_type) choices.push(weapon[0].display_name)
            });

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
        if(Object.hasOwn(character[0],'stun')){
            var message = '```ansi\n[1;32m' + character[0].name + '[1;31m jest ogluszony/a!\n```'
            await interaction.editReply(message);
            return
        }
        
        var subcommand = interaction.options.getSubcommand();
        switch (subcommand){
            //Wojownik
            case 'ogluszenie':
                var level = interaction.options.get('poziom').value;
                var stat = interaction.options.get('statystyka').value;
                var target = interaction.options.get('cel').value;
                var enemy = database.characters.filter(
                    function(data){ return data.name.toLowerCase() == target.toLowerCase() }
                );
                if (enemy[0] === undefined) {
                    var enemy = database.enemies.filter(
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

                eval('var stat_value = character[0].' + stat);
                if(Object.hasOwn(character[0],'kac')){
                    stat_value -= character[0].kac;
                }
                if(Object.hasOwn(character[0],'modifier_' + stat)){
                    eval('stat_value += character[0].modifier_' + stat);
                }
                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }
                if(interaction.options.get('modyfikator_procentowy')){
                    var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                    stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                }

                
                switch(level){
                    case 1:
                        var energy_cost = 6;
                        break;
                    case 2:
                        var energy_cost = 8;
                        stat_value = Math.ceil(stat_value*1.25);
                        break;
                    case 3:
                        var energy_cost = 10;
                        stat_value = Math.ceil(stat_value*1.5);
                        break;
                }

                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                character[0].energy -= energy_cost;
                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Ogłuszenie lvl ' + level + '\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy;

                switch (character[0].rank){
                    case 'dziecko':
                        var dice = 15;
                        var rank = 0;
                        break;
                    case 'rekrut':
                        var dice = 20;
                        var rank = 1;
                        break;
                    case 'm-straznik':
                        var dice = 30;
                        var rank = 2;
                        break;
                    case 'straznik':
                        var dice = 40;
                        var rank = 3;
                        break;
                    case 's-straznik':
                        var dice = 50;
                        var rank = 4;
                        break;
                    case 'czempion':
                        var dice = 60;
                        var rank = 5;
                        break;
                }
                switch (enemy[0].rank){
                    case 'dziecko':
                        var enemy_dice = 15;
                        var enemy_rank = 0;
                        break;
                    case 'rekrut':
                        var enemy_dice = 20;
                        var enemy_rank = 1;
                        break;
                    case 'm-straznik':
                        var enemy_dice = 30;
                        var enemy_rank = 2;
                        break;
                    case 'straznik':
                        var enemy_dice = 40;
                        var enemy_rank = 3;
                        break;
                    case 's-straznik':
                        var enemy_dice = 50;
                        var enemy_rank = 4;
                        break;
                    case 'czempion':
                        var enemy_dice = 60;
                        var enemy_rank = 5;
                        break;
                }

                
                var roll = globals.getRandomInt(dice);
                message += '[1;37m Wynik rzutu: [[1;34m' + roll + '[1;37m] Próg: ' + stat_value;
                if(roll === dice){
                    message += '[1;31m Krytyczna porażka!'
                }
                else if(roll > stat_value && roll != 1){
                    message += '[1;31m Porażka!';
                }
                else {
                    if(enemy_rank >= rank){
                        var enemy_roll = globals.getRandomInt(enemy_dice);
                        eval('var enemy_stat_value = enemy[0].' + stat);
                        if(Object.hasOwn(enemy[0],'modifier_' + stat)){
                            eval('enemy_stat_value += enemy[0].modifier_' + stat);
                        }
                        var enemy_diff = enemy_stat_value - enemy_roll;
                        var character_diff = stat_value - roll;
                        if(roll === 1 && enemy_roll != 1){
                            message += '[1;37m Rzut sporny [1;32mwygrany';
                        }
                        else if(enemy_diff >= character_diff){
                            message += ' Rzut sporny [1;31mprzegrany\n```';
                            break;
                        }
                        else{
                            message += '[1;37m Rzut sporny [1;32mwygrany';
                        }
                    }
                    else{
                        message += '[1;37m Cel jest niższy rangą';
                    }

                    if(roll === 1){
                        message += ' [1;34mTrafienie krytyczne';
                        level += 1;
                    }
                    
                    if(Object.hasOwn(enemy[0],'krok_w_tyl')){
                        message += '[1;32m' + enemy[0].name + '[1;37m unika ataku za pomocą [1;34mkroku w tył[1;37m i może wykonać atak[0m\n```';
                        delete enemy[0].krok_w_tyl;
                        break;
                    }

                    var turns = level;

                    var team = database.teams.filter(
                        function(data){ return data.name.toLowerCase() == character[0].team.toLowerCase() }
                    );
                    if(team[0].members.indexOf(character[0].name) > team[0].members.indexOf(enemy[0].name)){
                        level += 1;
                    }

                    if(level > enemy[0].stun || !Object.hasOwn(enemy[0],'stun')){
                        enemy[0].stun = level;
                    }
                    delete enemy[0].riposta;

                    message += '\n\n[1;32m'+ enemy[0].name + '[1;37m jest [1;34mogłuszony/a [1;37mna [1;34m' + turns;
                    if(enemy[0].stun === 1) message += ' turę';
                    else message += ' tury';
                }
                message += '\n```';

                break;
            case 'krok_w_tyl':
                if(Object.hasOwn(character[0],'riposta')){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma już aktywną [1;34mripostę[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                var energy_cost = 8;
                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                character[0].energy -= energy_cost;

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Krok w tył\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy + '\n```';

                character[0].krok_w_tyl = 2;
                break;
            case 'atak_z_zamachu':
                var weapon_name = interaction.options.get('bron').value;
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

                if(Object.hasOwn(weapon[0],'penetration')) var penetration = weapon[0].penetration;
                else var penetration = 0;
        

                var targets = [];
                targets.push(interaction.options.get('cel_1').value.toLowerCase());
                targets.push(interaction.options.get('cel_2').value.toLowerCase());
                if(interaction.options.get('cel_3')){
                    targets.push(interaction.options.get('cel_3').value.toLowerCase());
                }
                if(interaction.options.get('cel_4')){
                    targets.push(interaction.options.get('cel_4').value.toLowerCase());
                }
                if(interaction.options.get('cel_5')){
                    targets.push(interaction.options.get('cel_5').value.toLowerCase());
                }
                if(interaction.options.get('cel_6')){
                    targets.push(interaction.options.get('cel_6').value.toLowerCase());
                }
                var possible_targets = database.enemies.concat(database.characters)
                enemies = possible_targets.filter((element) => targets.includes(element.name.toLowerCase()));
                if (enemies.length < targets.length){
                    var message = '```ansi\n[1;31mJeden lub więcej z celów nie istnieje w bazie[0m\n```'
                    await interaction.editReply(message);
                    return
                }

                var energy_cost = 10*enemies.length;
                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                character[0].energy -= energy_cost;

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

                var stat_value = character[0].wytrzymalosc + character[0].sila;
                if(Object.hasOwn(character[0],'modifier_wytrzymalosc')){
                    stat_value += character[0].modifier_wytrzymalosc;
                }
                if(Object.hasOwn(character[0],'modifier_sila')){
                    stat_value += character[0].modifier_sila;
                }
                stat_value = Math.ceil(stat_value/2);
                
                if(Object.hasOwn(character[0],'kac')){
                    stat_value -= character[0].kac;
                }

                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }
                if(interaction.options.get('modyfikator_procentowy')){
                    var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                    stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                }

                var roll = globals.getRandomInt(dice);

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Atak z zamachu\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy + 
                '[1;37m Wynik rzutu: [[1;34m' + roll + '[1;37m] Próg: ' + stat_value;

                if(roll === dice){
                    message += '[1;31m Krytyczna porażka!'
                }
                else if(roll <= stat_value){
                    var damage = stat_value - roll + weapon_dmg;
                    if (roll === 1){
                        message += ' krytyczne'
                        damage *= 2;
                    }
                    message += '[1;32m trafienie! [1;37mObrażenia: [1;31m' + damage;

                    for(enemy of enemies){
                        if(character[0].team != enemy.team){
                            var message = '```ansi\n[1;31mPostać i cel muszą być w tej samej drużynie[0m\n```'
                            await interaction.editReply(message);
                            return
                        }
                        message += '\n\n'

                        if(Object.hasOwn(enemy,'krok_w_tyl')){
                            message += '[1;32m' + enemy.name + '[1;37m unika ataku za pomocą [1;34mkroku w tył[1;37m i może wykonać atak';
                            delete enemy[0].krok_w_tyl;
                        }
                        else{
                            var body_part = enemy.body_parts[globals.getRandomInt(enemy.body_parts.length) - 1];

                            if(eval('enemy.' + body_part + '=== 0')){
                                if(Object.hasOwn(weapon[0],'unarmored_damage')) damage = stat_value - roll + weapon[0].unarmored_damage;
                                if(Object.hasOwn(weapon[0],'unarmored_bleed')) bleed = weapon[0].unarmored_bleed;
                            }
                            else{
                                damage = stat_value - roll + weapon_dmg;
                                if(Object.hasOwn(weapon[0],'bleed')) bleed = weapon[0].bleed;
                            }

                            switch(body_part) {
                                case 'glowa':
                                    message += '[1;32m' + enemy.name + '[1;37m dostaje buzi w [1;35mczółko'
                                    break;
                                case 'korpus':
                                    message += '[1;32m' + enemy.name + '[1;37m otrzymuje cios na [1;35mkorpus'
                                    break;
                                case 'lewa_reka':
                                    message += '[1;32m' + enemy.name + '[1;37m otrzymuje cios na [1;35mlewą rękę'
                                    break;
                                case 'prawa_reka':
                                    message += '[1;32m' + enemy.name + '[1;37m otrzymuje cios na [1;35mprawą rękę'
                                    break;
                                case 'lewa_noga':
                                    message += '[1;32m' + enemy.name + '[1;37m otrzymuje cios na [1;35mlewą nogę'
                                    break;
                                case 'prawa_noga':
                                    message += '[1;32m' + enemy.name + '[1;37m otrzymuje cios na [1;35mprawą nogę'
                                    break;
                                default:
                                    message += '[1;32m' + enemy.name + '[1;37m otrzymuje cios na [1;35m' + body_part;
                                    break;
                            }
                            var armor_damage = Math.ceil(damage/15);
                            eval('var old_armor_value =  enemy.' + body_part)

                            for(let i = 0; i < armor_damage; i += 1){
                                if(eval('enemy.' + body_part + '> 0')){
                                    eval('enemy.' + body_part + '-= 1');
                                    damage -= 15;
                                }
                                else {
                                    enemy.hp -= damage;
                                    enemy.hp = Math.max(0, enemy.hp);
                                    break;
                                }
                            }
        
                            enemy.hp -= penetration;
                            enemy.hp = Math.max(0, enemy.hp);
            
                            damage = Math.max(0, damage);
                            message += '[1;35m PT: ' + old_armor_value + '[1;37m => [1;35m';
                            eval('message += enemy.' + body_part);
                            message += '\n[1;37mObrazenia na postać: [1;31m' + (damage + penetration);
                            if(bleed > 0){
                                if(Object.hasOwn(enemy,'bleeding')){
                                    enemy.bleeding = Math.max(bleed,enemy.bleeding);
                                }else{
                                    enemy.bleeding = bleed;
                                }
                                message += '[1;31m krwawienie:' + enemy.bleeding;
                            }
        
                            message += '\nPZ: ' + enemy.hp + '/' + enemy.max_hp;
                            if(Object.hasOwn(enemy,'riposta')){
                                if(enemy.riposta < 6){
                                    var enemy_weapon_name = enemy.weapons[0];
                                    if(enemy_weapon_name === undefined){
                                        message += '\n\n[1;32m' + enemy.name + '[1;37m nie może wykonać [1;34mriposty[1;37m, ponieważ nie ma broni';
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
                    
                                        message += '\n\n[1;32m' + enemy.name + '[1;37m wykonuje [1;34mripostę[1;37m. Obrażenia: [1;31m' + enemy_weapon_dmg + '\n\n';
                                        
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
                        }
    
                    }
    

                } else{
                    message += '[1;31m Porażka!';
                }
                message += '[0m\n```'
                break;
            case 'potezny_atak':
                var level = interaction.options.get('poziom').value;
                var stat = interaction.options.get('statystyka').value;
                var target = interaction.options.get('cel').value;
                var body_part = interaction.options.get('czesc').value;
                var weapon_name = interaction.options.get('bron').value;

                var enemy = database.characters.filter(
                    function(data){ return data.name.toLowerCase() == target.toLowerCase() }
                );
                if (enemy[0] === undefined) {
                    var enemy = database.enemies.filter(
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

                if(eval('enemy[0].' + body_part + '=== 0')){
                    if(Object.hasOwn(weapon[0],'unarmored_damage')) weapon_dmg = weapon[0].unarmored_damage;
                    if(Object.hasOwn(weapon[0],'unarmored_bleed')) bleed = weapon[0].unarmored_bleed;   
                }

                if(Object.hasOwn(weapon[0],'penetration')) var penetration = weapon[0].penetration;
                else var penetration = 0;

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

                eval('var stat_value = character[0].' + stat);
                if(Object.hasOwn(character[0],'kac')){
                    stat_value -= character[0].kac;
                }
                if(Object.hasOwn(character[0],'modifier_' + stat)){
                    eval('stat_value += character[0].modifier_' + stat);
                }

                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }
                if(interaction.options.get('modyfikator_procentowy')){
                    var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                    stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                }

                var roll = globals.getRandomInt(dice);

                var damage = stat_value - roll + weapon_dmg;

                switch(level){
                    case 1:
                        var energy_cost = 8;
                        damage = Math.ceil(damage*1.25);
                        break;
                    case 2:
                        var energy_cost = 10;
                        damage = Math.ceil(damage*1.5);
                        break;
                    case 3:
                        var energy_cost = 12;
                        damage = Math.ceil(damage*1.75);
                        break;
                }

                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                character[0].energy -= energy_cost;
                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Potężny atak lvl ' + level + '\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy +
                '[1;37m Wynik rzutu: [[1;34m' + roll + '[1;37m] Próg: ' + stat_value;

                if(roll === dice){
                    message += '[1;31m Krytyczna porażka!';
                }
                else if(roll > stat_value && roll != 1){
                        message += '[1;31m Porażka!';
                }
                else {
                    if (roll === 1){
                        message += ' krytyczne'
                        damage *= 2;
                    }
                    message += '[1;32m trafienie! [1;37mObrażenia: [1;31m' + (damage) +'\n\n';

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
                }
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
                message += '[0m\n```';
                break;
            case 'seria':
                var level = interaction.options.get('poziom').value;
                var stat = interaction.options.get('statystyka').value;
                var target = interaction.options.get('cel').value;
                var weapon_name = interaction.options.get('bron').value;
                var body_part_list = [];

                body_part_list.push(interaction.options.get('czesc1').value);
                body_part_list.push(interaction.options.get('czesc2').value);
                if(interaction.options.get('czesc3')) body_part_list.push(interaction.options.get('czesc3').value);
                if(interaction.options.get('czesc4')) body_part_list.push(interaction.options.get('czesc4').value);

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

                var weapon = weapons.filter(
                    function(data){ return data.display_name.toLowerCase() == weapon_name.toLowerCase() }
                );
                if (weapon[0] === undefined) {
                    var message = '```ansi\n[1;31mBrak broni [1;35m' + weapon_name + '[0m[1;31m w bazie[0m\n```'
                    await interaction.editReply(message);
                    return
                }

                if(Object.hasOwn(weapon[0],'bleed')) var bleed = weapon[0].bleed;
                else var bleed = 0;
                
                if(Object.hasOwn(weapon[0],'penetration')) var penetration = weapon[0].penetration;
                else var penetration = 0;

                switch(level){
                    case 1:
                        var energy_cost = 12;
                        break;
                    case 2:
                        var energy_cost = 14;
                        if(body_part_list.length<3){
                            var message = '```ansi\n[1;31mPodano za mało części ciała![0m\n```'
                            interaction.editReply(message);
                            return
                        }
                        break;
                    case 3:
                        var energy_cost = 20;
                        if(body_part_list.length<4){
                            var message = '```ansi\n[1;31mPodano za mało części ciała![0m\n```'
                            interaction.editReply(message);
                            return
                        }
                        break;
                }

                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                character[0].energy -= energy_cost;
                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

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


                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Seria lvl ' + level + '\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy + '\n\n';
                
                if(Object.hasOwn(enemy[0],'krok_w_tyl')){
                    message += '[1;32m' + enemy[0].name + '[1;37m unika ataku za pomocą [1;34mkroku w tył[1;37m i może wykonać atak[0m\n```';
                    delete enemy[0].krok_w_tyl;
                    break;
                }

                for(let i = 0; i <= level; i++){
                    var body_part = body_part_list[i];

                    eval('var stat_value = character[0].' + stat);
                    if(Object.hasOwn(character[0],'modifier_' + stat)){
                        eval('stat_value += character[0].modifier_' + stat);
                    }
                    if(interaction.options.get('modyfikator')){
                        var modifier = interaction.options.get('modyfikator').value;
                        stat_value += modifier;
                    }
                    if(interaction.options.get('modyfikator_procentowy')){
                        var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                        stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                    }

                    stat_value = Math.ceil(stat_value * (1 + 0.25*i));

                    if(Object.hasOwn(character[0],'kac')){
                        stat_value -= character[0].kac;
                    }
                    var roll = globals.getRandomInt(dice);

                    if(eval('enemy[0].' + body_part + '=== 0')){
                        if(Object.hasOwn(weapon[0],'unarmored_damage')) var damage = stat_value - roll + weapon[0].unarmored_damage;
                        if(Object.hasOwn(weapon[0],'unarmored_bleed')) bleed = weapon[0].unarmored_bleed;
                    }
                    else{
                        var damage = stat_value - roll + weapon[0].damage;
                        if(Object.hasOwn(weapon[0],'bleed')) bleed = weapon[0].bleed;
                    }

                    damage = Math.ceil(damage * (1 - 0.25*i));

                    if(roll === dice){
                        message += '[1;31m Krytyczna porażka!\n';
                        break;
                    }
                    else if(roll > stat_value && roll != 1){
                        message += '[1;31mPorażka!\n\n';
                    }
                    else {
                        if (roll === 1){
                            message += 'Krytyczne [1;32mtrafienie!\n'
                            damage *= 2;
                        }
                        else{
                            message += '[1;32mTrafienie!\n';
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

                        message += '\nPZ: ' + enemy[0].hp + '/' + enemy[0].max_hp + '\n\n';
                    }

                }
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
                message += '```'

                break;
            //Barbarzyńca
            case 'okrzyk_bitewny':
                var level = interaction.options.get('poziom').value;
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
                var stat_value = character[0].retoryka + character[0].sila;
                if(Object.hasOwn(character[0],'modifier_retoryka')){
                    stat_value += character[0].modifier_retoryka;
                }
                if(Object.hasOwn(character[0],'modifier_sila')){
                    stat_value += character[0].modifier_sila;
                }
                stat_value = Math.ceil(stat_value/2);

                if(Object.hasOwn(character[0],'kac')){
                    stat_value -= character[0].kac;
                }

                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }
                if(interaction.options.get('modyfikator_procentowy')){
                    var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                    stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                }

                switch (character[0].rank){
                    case 'dziecko':
                        var dice = 15;
                        var rank = 0;
                        break;
                    case 'rekrut':
                        var dice = 20;
                        var rank = 1;
                        break;
                    case 'm-straznik':
                        var dice = 30;
                        var rank = 2;
                        break;
                    case 'straznik':
                        var dice = 40;
                        var rank = 3;
                        break;
                    case 's-straznik':
                        var dice = 50;
                        var rank = 4;
                        break;
                    case 'czempion':
                        var dice = 60;
                        var rank = 5;
                        break;
                }
                switch (enemy[0].rank){
                    case 'dziecko':
                        var enemy_dice = 15;
                        var enemy_rank = 0;
                        break;
                    case 'rekrut':
                        var enemy_dice = 20;
                        var enemy_rank = 1;
                        break;
                    case 'm-straznik':
                        var enemy_dice = 30;
                        var enemy_rank = 2;
                        break;
                    case 'straznik':
                        var enemy_dice = 40;
                        var enemy_rank = 3;
                        break;
                    case 's-straznik':
                        var enemy_dice = 50;
                        var enemy_rank = 4;
                        break;
                    case 'czempion':
                        var enemy_dice = 60;
                        var enemy_rank = 5;
                        break;
                }

                switch(level){
                    case 1:
                        var energy_cost = 4;
                        break;
                    case 2:
                        var energy_cost = 6;
                        stat_value = Math.ceil(stat_value*1.25);
                        break;
                    case 3:
                        var energy_cost = 8;
                        stat_value = Math.ceil(stat_value*1.5);
                        break;
                }

                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                character[0].energy -= energy_cost;
                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

                
                var roll = globals.getRandomInt(dice);

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Okrzyk Bitewny lvl ' + level + '\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy +
                '[1;37m Wynik rzutu: [[1;34m' + roll + '[1;37m] Próg: ' + stat_value;

                if(roll === dice){
                    message += '[1;31m Krytyczna porażka!';
                }
                else if(roll <= stat_value){
                    if(enemy_rank >= rank){
                        var enemy_roll = globals.getRandomInt(enemy_dice);
                        var enemy_stat_value = enemy[0].retoryka + enemy[0].sila;
                        if(Object.hasOwn(enemy[0],'modifier_retoryka')){
                            enemy_stat_value += enemy[0].modifier_retoryka;
                        }
                        if(Object.hasOwn(enemy[0],'modifier_sila')){
                            enemy_stat_value += enemy[0].modifier_sila;
                        }
                        enemy_stat_value = Math.ceil(stat_value/2);
                        
                        
                        var enemy_diff = enemy_stat_value - enemy_roll;
                        var character_diff = stat_value - roll;
                        if(roll === 1 && enemy_roll != 1){
                            message += '[1;37m Rzut sporny [1;32mwygrany [1;34m Krytyczny sukces';
                        }
                        else if(enemy_diff >= character_diff){
                            message += ' Rzut sporny [1;31mprzegrany\n```';
                            break;
                        }
                        else{
                            message += '[1;37m Rzut sporny [1;32mwygrany';
                        }
                    }
                    else{
                        message += '[1;37m Cel jest niższy rangą';
                    }
                    message += '\n\n[1;32m' + enemy[0].name + '[1;37m jest [1;34mprzestraszony/a!\n```' 
                }
                else{
                    message += '[1;31m Porażka!\n```';
                }

                break;
            case 'szarza':
                var level = interaction.options.get('poziom').value;

                var stat_value = character[0].wytrzymalosc + character[0].sila;
                if(Object.hasOwn(character[0],'modifier_wytrzymalosc')){
                    stat_value += character[0].modifier_wytrzymalosc;
                }
                if(Object.hasOwn(character[0],'modifier_sila')){
                    stat_value += character[0].modifier_sila;
                }
                stat_value = Math.ceil(stat_value/2);
                
                if(Object.hasOwn(character[0],'kac')){
                    stat_value -= character[0].kac;
                }

                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }
                if(interaction.options.get('modyfikator_procentowy')){
                    var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                    stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
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

                switch(level){
                    case 1:
                        var energy_cost = 10;
                        stat_value = Math.ceil(stat_value*1.25);
                        break;
                    case 2:
                        var energy_cost = 12;
                        stat_value = Math.ceil(stat_value*1.5);
                        break;
                    case 3:
                        var energy_cost = 14;
                        stat_value = Math.ceil(stat_value*1.75);
                        break;
                }

                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                character[0].energy -= energy_cost;
                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

                
                var roll = globals.getRandomInt(dice);

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Szarża lvl ' + level + '\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy +
                '[1;37m Wynik rzutu: [[1;34m' + roll + '[1;37m] Próg: ' + stat_value;

                if(roll === dice){
                    message += '[1;31m Krytyczna porażka!';
                }
                else if(roll <= stat_value){
                    var damage = stat_value - roll;
                    if(roll === 1){
                        message += '[1;32m Krytyczny sukces!'
                        damage *= 2;
                    }
                    else{
                        message += '[1;32m Sukces!'
                    }
                    message += ' [1;37mObrażenia: [1;31m' + damage +'\n\n';

                    if(interaction.options.get('cel')){
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

                        message += '[1;32m' + enemy[0].name + '[1;37m otrzymuje cios na [1;35mkorpus';
                            
                        var armor_damage = Math.ceil(damage/15);
        
                        var old_armor_value =  enemy[0].korpus;
        
                        for(let i = 0; i < armor_damage; i += 1){
                            if(enemy[0].korpus > 0){
                                eval(enemy[0].korpus -= 1);
                                damage -= 15;
                            }
                            else {
                                enemy[0].hp -= damage;
                                enemy[0].hp = Math.max(0, enemy[0].hp);
                                break;
                            }
                        }
                        damage = Math.max(0, damage);
        
                        message += '[1;35m PT: ' + old_armor_value + '[1;37m => [1;35m';
                        message += enemy[0].korpus;
                        message += '\n[1;37mObrazenia na postać: [1;31m' + damage + '\nPZ: ' + enemy[0].hp + '/' + enemy[0].max_hp;

                        if(roll <= stat_value/2){
                            if(globals.getRandomInt(100) > 50){
                                message += '\n[1;32m' + enemy[0].name + '[1;37m jest[1;34m powalony/a!';

                                var turns = 1;
                                var team = database.teams.filter(
                                    function(data){ return data.name.toLowerCase() == character[0].team.toLowerCase() }
                                );
                                if(team[0].members.indexOf(character[0].name) > team[0].members.indexOf(enemy[0].name)){
                                    turns += 1;
                                }
                                enemy[0].powalenie = turns;
                                delete enemy[0].riposta;
                                delete enemy[0].krok_w_tyl;
                            }
                        }
                    }
                }
                else{
                    message += '[1;31m Porażka!';
                }
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
                message += '[0m\n```';

                break;
            case 'atak_z_wyskoku':
                var level = interaction.options.get('poziom').value;
                var stat = interaction.options.get('statystyka').value;
                var target = interaction.options.get('cel').value;
                var body_part = interaction.options.get('czesc').value;
                var weapon_name = interaction.options.get('bron').value;

                eval('var stat_value = character[0].' + stat);
                if(Object.hasOwn(character[0],'kac')){
                    stat_value -= character[0].kac;
                }
                if(Object.hasOwn(character[0],'modifier_' + stat)){
                    eval('stat_value += character[0].modifier_' + stat);
                }
                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }
                if(interaction.options.get('modyfikator_procentowy')){
                    var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                    stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                }

                var enemy = database.characters.filter(
                    function(data){ return data.name.toLowerCase() == target.toLowerCase() }
                );
                if (enemy[0] === undefined) {
                    var enemy = database.enemies.filter(
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

                if(eval('enemy[0].' + body_part + '=== 0')){
                    if(Object.hasOwn(weapon[0],'unarmored_damage')) weapon_dmg = weapon[0].unarmored_damage;
                    if(Object.hasOwn(weapon[0],'unarmored_bleed')) bleed = weapon[0].unarmored_bleed;   
                }

                if(Object.hasOwn(weapon[0],'penetration')) var penetration = weapon[0].penetration;
                else var penetration = 0;

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

                eval('var stat_value = character[0].' + stat);
                if(Object.hasOwn(character[0],'modifier_' + stat)){
                    eval('stat_value += character[0].modifier_' + stat);
                }
                var roll = globals.getRandomInt(dice);

                switch(level){
                    case 1:
                        var energy_cost = 14;
                        stat_value = Math.ceil(stat_value*1.25);
                        break;
                    case 2:
                        var energy_cost = 18;
                        stat_value = Math.ceil(stat_value*1.5);
                        break;
                    case 3:
                        var energy_cost = 24;
                        stat_value = Math.ceil(stat_value*1.75);
                        break;
                }

                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                character[0].energy -= energy_cost;
                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

                var damage = stat_value - roll + weapon_dmg;

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Atak z wyskoku lvl ' + level + '\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy +
                '[1;37m Wynik rzutu: [[1;34m' + roll + '[1;37m] Próg: ' + stat_value;

                if(roll === dice){
                    message += '[1;31m Krytyczna porażka!';
                }
                else if(roll > stat_value && roll != 1){
                    message += '[1;31m Porażka!';
                }
                else {
                    if (roll === 1){
                        message += ' krytyczne'
                        damage *= 2;
                    }
                    message += '[1;32m trafienie! [1;37mObrażenia: [1;31m' + (damage) +'\n\n';

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

                    if(body_part === 'glowa' && level === 3 && roll === 1){
                        message += ' [1;31m DEKAPITACJA!\n```'
                        enemy[0].hp = 0;
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
                    if(roll <= stat_value/2){
                        if(globals.getRandomInt(100) > 75){
                            message += '\n[1;32m' + enemy[0].name + '[1;37m jest[1;34m powalony/a!';

                            var turns = 1;
                            var team = database.teams.filter(
                                function(data){ return data.name.toLowerCase() == character[0].team.toLowerCase() }
                            );
                            if(team[0].members.indexOf(character[0].name) > team[0].members.indexOf(enemy[0].name)){
                                turns += 1;
                            }
                            enemy[0].powalenie = turns;
                            delete enemy[0].riposta;
                        }
                    }
                    
                }
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
                message += '[0m\n```'
                break;
            case 'szal':
                var level = interaction.options.get('poziom').value;
                var stat = interaction.options.get('statystyka').value;
                var target = interaction.options.get('cel').value;
                var weapon_name = interaction.options.get('bron').value;

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

                var weapon = weapons.filter(
                    function(data){ return data.display_name.toLowerCase() == weapon_name.toLowerCase() }
                );
                if (weapon[0] === undefined) {
                    var message = '```ansi\n[1;31mBrak broni [1;35m' + weapon_name + '[0m[1;31m w bazie[0m\n```'
                    await interaction.editReply(message);
                    return
                }

                if(Object.hasOwn(weapon[0],'bleed')) var bleed = weapon[0].bleed;
                else var bleed = 0;
                
                if(Object.hasOwn(weapon[0],'penetration')) var penetration = weapon[0].penetration;
                else var penetration = 0;

                switch(level){
                    case 1:
                        var energy_cost = 12;
                        break;
                    case 2:
                        var energy_cost = 14;
                        break;
                    case 3:
                        var energy_cost = 20;
                        break;
                }

                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                character[0].energy -= energy_cost;
                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

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


                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Szał lvl ' + level + '\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy + '\n\n';
                
                if(Object.hasOwn(enemy[0],'krok_w_tyl')){
                    message += '[1;32m' + enemy[0].name + '[1;37m unika ataku za pomocą [1;34mkroku w tył[1;37m i może wykonać atak[0m\n```';
                    delete enemy[0].krok_w_tyl;
                    break;
                }

                for(let i = 0; i <= level; i++){
                    eval('var stat_value = character[0].' + stat);
                    if(Object.hasOwn(character[0],'modifier_' + stat)){
                        eval('stat_value += character[0].modifier_' + stat);
                    }
                    if(interaction.options.get('modyfikator')){
                        var modifier = interaction.options.get('modyfikator').value;
                        stat_value += modifier;
                    }
                    if(interaction.options.get('modyfikator_procentowy')){
                        var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                        stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                    }

                    stat_value = Math.ceil(stat_value * (1 - 0.25*i));
                    
                    if(Object.hasOwn(character[0],'kac')){
                        stat_value -= character[0].kac;
                    }

                    var roll = globals.getRandomInt(dice);
                    var body_part = enemy[0].body_parts[globals.getRandomInt(enemy[0].body_parts.length) - 1];

                    if(eval('enemy[0].' + body_part + '=== 0')){
                        if(Object.hasOwn(weapon[0],'unarmored_damage')) var damage = stat_value - roll + weapon[0].unarmored_damage;
                        if(Object.hasOwn(weapon[0],'unarmored_bleed')) bleed = weapon[0].unarmored_bleed;
                    }
                    else{
                        var damage = stat_value - roll + weapon[0].damage;
                        if(Object.hasOwn(weapon[0],'bleed')) bleed = weapon[0].bleed;
                    }

                    if( i > 0) damage = Math.ceil(damage * (1 + 0.25 + 0.25*i));

                    if(roll === dice){
                        message += '[1;31mKrytyczna porażka!\n';
                        break;
                    }
                    else if(roll > stat_value && roll != 1){
                        message += '[1;31mPorażka!\n\n';
                    }
                    else {
                        if (roll === 1){
                            message += 'Krytyczne [1;32mtrafienie!\n'
                            damage *= 2;
                        }
                        else{
                            message += '[1;32mTrafienie!\n';
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

                        message += '\nPZ: ' + enemy[0].hp + '/' + enemy[0].max_hp + '\n\n';
                    }

                }
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
                message += '```'

                break;
            //Nożownik
            case 'riposta':
                if(Object.hasOwn(character[0],'krok_w_tyl')){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma już aktywny [1;34mkrok w tył[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                
                var energy_cost = 4;
                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                character[0].energy -= energy_cost;

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Riposta\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy + '\n```';

                character[0].riposta = 6;
                break;
            case 'nieczysta_gra':
                var level = interaction.options.get('poziom').value;

                var stat_value = character[0].zrecznosc + character[0].precyzja;
                if(Object.hasOwn(character[0],'modifier_zrecznosc')){
                    stat_value += character[0].modifier_zrecznosc;
                }
                if(Object.hasOwn(character[0],'modifier_precyzja')){
                    stat_value += character[0].modifier_precyzja;
                }
                stat_value = Math.ceil(stat_value/2);
                
                if(Object.hasOwn(character[0],'kac')){
                    stat_value -= character[0].kac;
                }

                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }
                if(interaction.options.get('modyfikator_procentowy')){
                    var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                    stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                }

                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

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

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Nieczysta gra lvl ' + level + '\n\n';
                
                var roll = globals.getRandomInt(dice);

                if(roll === dice){
                    message += '[1;31m Krytyczna porażka!';
                }
                else if(roll>stat_value){
                    message += '[1;31mPorażka!';
                }
                else{
                    if(roll === 1){
                        message += '[1;31mKrytyczny [1;32msukces!'
                    }
                    else{
                        message += '[1;32mSukces!'
                    }

                    message += '\n[1;32m' + character[0].name + '[1;37m może dostrzec:\n[1;34m - korzystne sytuacje otoczenia';
                    if(level>1) message += '\n - słabe punkty wroga';
                    if(level>2) message += '\n - sposoby na niekonwencjonalne wykluczenie wroga z walki';
                }

                message += '\n```'
                break;
            case 'cios_w_plecy':
                var level = interaction.options.get('poziom').value;
                var weapon_name = interaction.options.get('bron').value;
                var target = interaction.options.get('cel').value;

                var stat_value = character[0].zrecznosc;
                if(Object.hasOwn(character[0],'kac')){
                    stat_value -= character[0].kac;
                }
                if(Object.hasOwn(character[0],'modifier_zrecznosc')){
                    stat_value += character[0].modifier_zrecznosc;
                }

                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }
                if(interaction.options.get('modyfikator_procentowy')){
                    var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                    stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                }

                var enemy = database.characters.filter(
                    function(data){ return data.name.toLowerCase() == target.toLowerCase() }
                );
                if (enemy[0] === undefined) {
                    var enemy = database.enemies.filter(
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

                if(enemy[0].korpus === 0){
                    if(Object.hasOwn(weapon[0],'unarmored_damage')) weapon_dmg = weapon[0].unarmored_damage;
                    if(Object.hasOwn(weapon[0],'unarmored_bleed')) bleed = weapon[0].unarmored_bleed;   
                }

                if(Object.hasOwn(weapon[0],'penetration')) var penetration = weapon[0].penetration;
                else var penetration = 0;

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

                var roll = globals.getRandomInt(dice);

                switch(level){
                    case 1:
                        var energy_cost = 4;
                        break;
                    case 2:
                        var energy_cost = 6;
                        if(interaction.options.get('z_ukrycia')) stat_value = Math.ceil(stat_value*1.25);
                        break;
                    case 3:
                        var energy_cost = 8;
                        if(interaction.options.get('z_ukrycia')) stat_value = Math.ceil(stat_value*1.5);
                        break;
                }

                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                character[0].energy -= energy_cost;
                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

                var damage = Math.ceil((stat_value - roll + weapon_dmg)*1.25);

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Cios w plecy lvl ' + level;

                if(interaction.options.get('z_ukrycia')){
                    message += '[1;31m z ukrycia'
                }

                message += '\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy + '[1;37m Wynik rzutu: [[1;34m' + roll + '[1;37m] Próg: ' + stat_value;

                if(roll === dice){
                    message += '[1;31m Krytyczna porażka!';
                }
                else if(roll > stat_value && roll != 1){
                    message += '[1;31m Porażka!';
                }
                else {
                    if (roll === 1){
                        message += '[1;31m krytyczne'
                        damage *= 2;
                    }
                    message += '[1;32m trafienie! [1;37mObrażenia: [1;31m' + (damage) +'\n\n';

                    delete enemy[0].krok_w_tyl;

                    message += '[1;32m' + enemy[0].name + '[1;37m otrzymuje cios w [1;35mplecy'

                    var armor_damage = Math.ceil(damage/15);
    
                    var old_armor_value =  enemy[0].korpus
    
                    for(let i = 0; i < armor_damage; i += 1){
                        if(enemy[0].korpus > 0){
                            enemy[0].korpus -= 1;
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
                    message += enemy[0].korpus;
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
                }
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
                message += '[0m\n```'
                break;
            case 'ciche_stopki':
                var level = interaction.options.get('poziom').value;
                var stat_value = character[0].zrecznosc;
                if(Object.hasOwn(character[0],'kac')){
                    stat_value -= character[0].kac;
                }
                if(Object.hasOwn(character[0],'modifier_zrecznosc')){
                    stat_value += character[0].modifier_zrecznosc;
                }

                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }
                if(interaction.options.get('modyfikator_procentowy')){
                    var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                    stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
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

                var roll = globals.getRandomInt(dice);

                switch(level){
                    case 1:
                        var energy_cost = 2;
                        stat_value = Math.ceil(stat_value*1.25);
                        break;
                    case 2:
                        var energy_cost = 4;
                        stat_value = Math.ceil(stat_value*1.5);
                        break;
                    case 3:
                        var energy_cost = 6;
                        stat_value = Math.ceil(stat_value*1.75);
                        break;
                }

                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                character[0].energy -= energy_cost;
                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Ciche stópki lvl ' + level +
                '\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy + '[1;37m Wynik rzutu: [[1;34m' + roll + '[1;37m] Próg: ' + stat_value;

                if(roll === dice){
                    message += '[1;31m Krytyczna porażka!';
                }
                else if(roll > stat_value && roll != 1){
                    message += '[1;31m Porażka!';
                }
                else{
                    if(roll === 1){
                        message += '[1;31m Krytyczny[1;32m sukces!'
                    }
                    else{
                        message += '[1;32m Sukces!'
                    }
                }
                message += '[0m\n```'
                break;
            //Łucznik
            case 'szybkostrzelnosc':
                var level = interaction.options.get('poziom').value;
                var weapon_name = interaction.options.get('bron').value;
                var target = interaction.options.get('cel').value;

                var enemy = database.characters.filter(
                    function(data){ return data.name.toLowerCase() == target.toLowerCase() }
                );
                if (enemy[0] === undefined) {
                    var enemy = database.enemies.filter(
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

                var weapon = weapons.filter(
                    function(data){ return data.display_name.toLowerCase() == weapon_name.toLowerCase() }
                );
                if (weapon[0] === undefined) {
                    var message = '```ansi\n[1;31mBrak broni [1;35m' + weapon_name + '[0m[1;31m w bazie[0m\n```'
                    await interaction.editReply(message);
                    return
                }

                if(weapon[0].name === 'pioro_kruka') var weapon_dmg = globals.getRandomInt(10);
                else var weapon_dmg = weapon[0].damage;

                if(Object.hasOwn(weapon[0],'bleed')) var bleed = weapon[0].bleed;
                else var bleed = 0;
                
                if(Object.hasOwn(weapon[0],'penetration')) var penetration = weapon[0].penetration;
                else var penetration = 0;

                switch(level){
                    case 1:
                        var energy_cost = 4;
                        break;
                    case 2:
                        var energy_cost = 8;
                        break;
                    case 3:
                        var energy_cost = 12;
                        break;
                }

                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                if(!Object.hasOwn(character[0].ammo[0],'arrows')){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m nie ma [1;37mtej amunicji![0m\n```';
                    await interaction.editReply(message);
                    return;
                }
                character[0].energy -= energy_cost;
                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

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


                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Szybkostrzelność lvl ' + level + '\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy + '\n\n';

                for(let i = 0; i <= level; i++){
                    if(!Object.hasOwn(character[0].ammo[0],'arrows')){
                        var message = '```ansi\n[1;32m' + character[0].name + '[1;31m nie ma [1;37mtej amunicji![0m\n```';
                        break;
                    }
                    character[0].ammo[0].arrows -= 1;
                    if (character[0].ammo[0].arrows < 1){
                        delete character[0].ammo[0].arrows;
                    }

                    var stat_value = character[0].precyzja;
                    if(Object.hasOwn(character[0],'modifier_precyzja')){
                        stat_value += character[0].modifier_precyzja;
                    }
                    if(Object.hasOwn(character[0],"sokole_oko")){
                        stat_value = Math.ceil(stat_value*character[0].sokole_oko);
                    }

                    if(interaction.options.get('modyfikator')){
                        var modifier = interaction.options.get('modyfikator').value;
                        stat_value += modifier;
                    }
                    if(interaction.options.get('modyfikator_procentowy')){
                        var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                        stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                    }
                    if(i > 1) stat_value = Math.ceil(stat_value * (1 - 0.25*(i-1)));
                    
                    if(Object.hasOwn(character[0],'kac')){
                        stat_value -= character[0].kac;
                    }
                    
                    var roll = globals.getRandomInt(dice);
                    if(Object.hasOwn(character[0],'sokole_oko') && interaction.options.get('czesc') && i === 0){
                        var body_part = interaction.options.get('czesc').value;
                        delete character[0].sokole_oko;
                    }
                    else var body_part = enemy[0].body_parts[globals.getRandomInt(enemy[0].body_parts.length) - 1];

                    if(weapon[0].name === 'pioro_kruka') var weapon_dmg = globals.getRandomInt(20);
                    else var weapon_dmg = weapon[0].damage;
                    var damage = stat_value - roll + weapon_dmg;
                    if(Object.hasOwn(weapon[0],'bleed')) bleed = weapon[0].bleed;
                    else bleed = 0;
                    if(eval('enemy[0].' + body_part + '=== 0')){
                        if(Object.hasOwn(weapon[0],'unarmored_damage')) var damage = stat_value - roll + weapon[0].unarmored_damage;
                        if(Object.hasOwn(weapon[0],'unarmored_bleed')) bleed = weapon[0].unarmored_bleed;
                    }
                    if(Object.hasOwn(weapon[0],'penetration')) var penetration = weapon[0].penetration;
                    else var penetration = 0;

                    if( i > 0) damage = Math.ceil(damage * (1 + 0.25 + 0.25*i));

                    if(roll === dice){
                        message += '[1;31mKrytyczna porażka!\n';
                        break;
                    }
                    else if(roll > stat_value && roll != 1){
                        message += '[1;31mPorażka!\n\n';
                    }
                    else {
                        if (roll === 1){
                            message += '[1;31mKrytyczne [1;32mtrafienie!\n'
                            damage *= 2;
                        }
                        else{
                            message += '[1;32mTrafienie!\n';
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

                        message += '\nPZ: ' + enemy[0].hp + '/' + enemy[0].max_hp + '\n\n';
                    }
                }
                if(Object.hasOwn(character[0].ammo[0],'arrows')) message += '[1;37mStrzały: ' + character[0].ammo[0].arrows;
                else message += '[1;37mKoniec strzał';
                message += '\n```';
                break;
            case 'sokole_oko':
                if(Object.hasOwn(character[0],'sokole_oko')){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma już aktywne [1;34mSokole oko[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }

                var level = interaction.options.get('poziom').value;
                var stat_value = character[0].precyzja;
                if(Object.hasOwn(character[0],'kac')){
                    stat_value -= character[0].kac;
                }
                if(Object.hasOwn(character[0],'modifier_precyzja')){
                    stat_value += character[0].modifier_precyzja;
                }
                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }
                if(interaction.options.get('modyfikator_procentowy')){
                    var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                    stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                }

                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

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

                var roll = globals.getRandomInt(dice);

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Sokole oko lvl ' + level +
                '\n[1;37mWynik rzutu: [[1;34m' + roll + '[1;37m] Próg: ' + stat_value;

                if(roll === dice){
                    message += '[1;31m Krytyczna porażka!\n';
                    break;
                }
                else if(roll > stat_value && roll != 1){
                    message += '[1;31m Porażka!\n\n';
                }
                else {
                    if (roll === 1){
                        message += '[1;31m Krytyczny [1;32mSukces!\n';
                    }
                    else{
                        message += '[1;32m Sukces!\n';
                    }

                    switch(level){
                        case 1:
                            character[0].sokole_oko = 1.25;
                            break;
                        case 2:
                            character[0].sokole_oko = 1.5;
                            break;
                        case 3:
                            character[0].sokole_oko = 1.75;
                            break;
                    }
                }
                message += '\n```';
                break;
            case 'przeszywajaca_strzala':
                if(!Object.hasOwn(character[0].ready,'przeszywajaca_strzala')){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m nie ma przygotowanej tej umiejętności[0m\n```'
                    await interaction.editReply(message);
                    return
                }
                delete character[0].ready.przeszywajaca_strzala;

                var level = interaction.options.get('poziom').value;
                var stat_value = character[0].precyzja;
                if(Object.hasOwn(character[0],'modifier_precyzja')){
                    stat_value += character[0].modifier_precyzja;
                }
                if(Object.hasOwn(character[0],"sokole_oko")){
                    stat_value = Math.ceil(stat_value*character[0].sokole_oko);
                }
                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }
                if(interaction.options.get('modyfikator_procentowy')){
                    var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                    stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                }
                if(Object.hasOwn(character[0],'kac')){
                    stat_value -= character[0].kac;
                }
                
                var weapon_name = interaction.options.get('bron').value;
                var target = interaction.options.get('cel').value;

                var enemy = database.characters.filter(
                    function(data){ return data.name.toLowerCase() == target.toLowerCase() }
                );
                if (enemy[0] === undefined) {
                    var enemy = database.enemies.filter(
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

                if(Object.hasOwn(character[0],'sokole_oko') && interaction.options.get('czesc')){
                    var body_part = interaction.options.get('czesc').value;
                    delete character[0].sokole_oko;
                }
                else var body_part = enemy[0].body_parts[globals.getRandomInt(enemy[0].body_parts.length) - 1];

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
                if(Object.hasOwn(weapon[0],'bleed')) bleed = weapon[0].bleed;
                else bleed = 0;
                if(eval('enemy[0].' + body_part + '=== 0')){
                    if(Object.hasOwn(weapon[0],'unarmored_damage')) var damage = stat_value - roll + weapon[0].unarmored_damage;
                    if(Object.hasOwn(weapon[0],'unarmored_bleed')) bleed = weapon[0].unarmored_bleed;
                }
                if(Object.hasOwn(weapon[0],'penetration')) var penetration = weapon[0].penetration;
                else var penetration = 0;

                switch(level){
                    case 1:
                        var energy_cost = 6;
                        var armor_ignore = 2;
                        break;
                    case 2:
                        var energy_cost = 10;
                        var armor_ignore = 4;
                        break;
                    case 3:
                        var energy_cost = 14;
                        var armor_ignore = 6;
                        break;
                }

                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                if(!Object.hasOwn(character[0].ammo[0],'arrows')){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m nie ma [1;37mtej amunicji![0m\n```';
                    await interaction.editReply(message);
                    return;
                }
                character[0].energy -= energy_cost;
                character[0].ammo[0].arrows -= 1;
                if (character[0].ammo[0].arrows < 1){
                    delete character[0].ammo[0].arrows;
                }
                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

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
                var roll = globals.getRandomInt(dice);

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Przeszywająca strzała lvl ' + level + '\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy +
                '[1;37m Wynik rzutu: [[1;34m' + roll + '[1;37m] Próg: ' + stat_value;

                if(roll === dice){
                    message += '[1;31m Krytyczna porażka!';
                }
                else if(roll > stat_value && roll != 1){
                    message += '[1;31m Porażka!';
                }
                else{
                    var damage = stat_value - roll + weapon_dmg;
                    if (roll === 1){
                        message += '[1;31m Krytyczne[1;32m trafienie!'
                        damage *= 2;
                    }
                    else{
                        message += '[1;32m Trafienie!';
                    }
                    message += ' [1;37mObrażenia: [1;31m' + damage + '\n\n';

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
                    
                    if (eval('enemy[0].' + body_part + ' <= armor_ignore')){
                        enemy[0].hp -= damage;
                        message += '[1;37m pancerz zignorowany'
                    }
                    else{
                        var armor_damage = Math.ceil(damage/15);
        
                        eval('var old_armor_value =  enemy[0].' + body_part)
        
                        for(let i = 0; i < armor_damage; i += 1){
                            if(eval('enemy[0].' + body_part + '> 0')){
                                eval('enemy[0].' + body_part + '-= 1');
                                damage -= 15;
                            }
                            else {
                                enemy[0].hp -= damage;
                                break;
                            }
                        }
                        message += '[1;35m PT: ' + old_armor_value + '[1;37m => [1;35m';
                        eval('message += enemy[0].' + body_part);
                    }
                    
                    damage = Math.max(0, damage);
                    
                    enemy[0].hp -= penetration;
                    enemy[0].hp = Math.max(0, enemy[0].hp);
    
                    
                    message += '\n[1;37mObrazenia na postać: [1;31m' + (damage + penetration);
                    if(bleed > 0){
                        if(Object.hasOwn(enemy[0],'bleeding')){
                            enemy[0].bleeding = Math.max(bleed,enemy[0].bleeding);
                        }else{
                            enemy[0].bleeding = bleed;
                        }
                        message += '[1;31m krwawienie: ' + enemy[0].bleeding;
                    }

                    message += '\nPZ: ' + enemy[0].hp + '/' + enemy[0].max_hp + '\n\n';
                }
                
                if(Object.hasOwn(character[0].ammo[0],'arrows')) message += '[1;37mStrzały: ' + character[0].ammo[0].arrows;
                else message += '[1;37mKoniec strzał';
                message += '\n```';

                break;
            case 'uderzenie_lukiem':
                var target = interaction.options.get('cel').value;
                var body_part = interaction.options.get('czesc').value;
                var weapon_name = interaction.options.get('bron').value;
                
                var stat_value = character[0].zrecznosc + character[0].precyzja;
                if(Object.hasOwn(character[0],'modifier_zrecznosc')){
                    stat_value += character[0].modifier_zrecznosc;
                }
                if(Object.hasOwn(character[0],'modifier_precyzja')){
                    stat_value += character[0].modifier_precyzja;
                }
                stat_value = Math.ceil(stat_value/2);

                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }
                if(interaction.options.get('modyfikator_procentowy')){
                    var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                    stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                }
                if(Object.hasOwn(character[0],'kac')){
                    stat_value -= character[0].kac;
                }

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

                var weapon = weapons.filter(
                    function(data){ return data.display_name.toLowerCase() == weapon_name.toLowerCase() }
                );
                if (weapon[0] === undefined) {
                    var message = '```ansi\n[1;31mBrak broni [1;35m' + weapon_name + '[0m[1;31m w bazie[0m\n```'
                    await interaction.editReply(message);
                    return
                }

                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }

                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

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

                var roll = globals.getRandomInt(dice);

                if(character[0].energy < 2){
                    var message = '```ansi\n[1;32m' + name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                character[0].energy -= 2;

                if(weapon[0].name === 'pioro_kruka') var weapon_dmg = globals.getRandomInt(10);
                else var weapon_dmg = weapon[0].damage/2;
                var damage = stat_value - roll + weapon_dmg;
                if(Object.hasOwn(weapon[0],'bleed')) bleed = weapon[0].bleed/2;
                else bleed = 0;
                if(eval('enemy[0].' + body_part + '=== 0')){
                    if(Object.hasOwn(weapon[0],'unarmored_damage')) var damage = stat_value - roll + weapon[0].unarmored_damage/2;
                    if(Object.hasOwn(weapon[0],'unarmored_bleed')) bleed = weapon[0].unarmored_bleed/2;
                }

                if(Object.hasOwn(weapon[0],'penetration')) var penetration = Math.ceil(weapon[0].penetration/2);
                else var penetration = 0;

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Uderzenie łukiem\n[1;36mKondycja ' + character[0].energy + '/' + character[0].max_energy +
                '[1;37m Wynik rzutu: [[1;34m' + roll + '[1;37m] Próg: ' + stat_value;

                if(roll === dice){
                    message += '[1;31m Krytyczna porażka!';
                }
                else if(roll > stat_value && roll != 1){
                    message += '[1;31m Porażka!';
                }
                else{
                    var damage = stat_value - roll + weapon_dmg;
                    if (roll === 1){
                        message += '[1;31m Krytyczne[1;32m trafienie!'
                        damage *= 2;
                    }
                    else{
                        message += '[1;32m Trafienie!';
                    }
                    message += ' [1;37mObrażenia: [1;31m' + damage + '\n\n';

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

                }
                message += '\n```'
                break;
            //Kusznik
            case 'snajperski_strzal':
                if(!Object.hasOwn(character[0].ready,'snajperski_strzal')){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m nie ma przygotowanej tej umiejętności[0m\n```'
                    await interaction.editReply(message);
                    return
                }
                else if (character[0].ready.snajperski_strzal < 2){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m nie ma przygotowanej tej umiejętności[0m\n```'
                    await interaction.editReply(message);
                    return
                }
                delete character[0].ready.snajperski_strzal;
                
                var level = interaction.options.get('poziom').value;
                var target = interaction.options.get('cel').value;
                var body_part = interaction.options.get('czesc').value;
                var weapon_name = interaction.options.get('bron').value;

                var enemy = database.characters.filter(
                    function(data){ return data.name.toLowerCase() == target.toLowerCase() }
                );
                if (enemy[0] === undefined) {
                    var enemy = database.enemies.filter(
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

                if(eval('enemy[0].' + body_part + '=== 0')){
                    if(Object.hasOwn(weapon[0],'unarmored_damage')) weapon_dmg = weapon[0].unarmored_damage;
                    if(Object.hasOwn(weapon[0],'unarmored_bleed')) bleed = weapon[0].unarmored_bleed;   
                }

                if(Object.hasOwn(weapon[0],'penetration')) var penetration = weapon[0].penetration;
                else var penetration = 0;
                
                var stat_value = character[0].precyzja;
                if(Object.hasOwn(character[0],'modifier_precyzja')){
                    stat_value += character[0].modifier_precyzja;
                }
                if(Object.hasOwn(character[0],'kac')){
                    stat_value -= character[0].kac;
                }
                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }
                if(interaction.options.get('modyfikator_procentowy')){
                    var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                    stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                }

                switch(level){
                    case 1:
                        var energy_cost = 10;
                        break;
                    case 2:
                        var energy_cost = 14;
                        break;
                    case 3:
                        var energy_cost = 18;
                        break;
                }

                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                
                if(eval('character[0].reload.' + weapon[0].name + ' < 1')){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m nie ma przeładowanej broni[1;37m ' + weapon[0].display_name + '![0m\n```'
                    interaction.editReply(message);
                    return
                }
                eval('character[0].reload.' + weapon[0].name + '= 0');

                if(!Object.hasOwn(character[0].ammo[0],'bolts')){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m nie ma [1;37mtej amunicji![0m\n```';
                    await interaction.editReply(message);
                    return;
                }
                character[0].energy -= energy_cost;

                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

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

                var roll = globals.getRandomInt(dice);
                var damage = stat_value - roll + weapon_dmg;
                damage = Math.ceil(damage*(1.25 + 0.25*level));

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Snajperski strzał lvl ' + level +
                '\n[1;37mWynik rzutu: [[1;34m' + roll + '[1;37m] Próg: ' + stat_value;

                if(roll === dice){
                    message += '[1;31m Krytyczna porażka!';
                }
                else if(roll > stat_value && roll != 1){
                    message += '[1;31m Porażka!';
                }
                else{
                    var damage = stat_value - roll + weapon_dmg;
                    if (roll === 1){
                        message += '[1;31m Krytyczne[1;32m trafienie!'
                        damage *= 2;
                    }
                    else{
                        message += '[1;32m Trafienie!';
                    }
                    message += ' [1;37mObrażenia: [1;31m' + damage + '\n\n';

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

                        message += '\nPZ: ' + enemy[0].hp + '/' + enemy[0].max_hp + '\n\n';

                    if(Object.hasOwn(character[0].ammo[0],'bolts')) message += '[1;37mBełty: ' + character[0].ammo[0].bolts;
                    else message += '[1;37mKoniec bełtów';
                }
                message += '\n```';

                break;
            case 'przyszpilajacy_strzal':
                var target = interaction.options.get('cel').value;
                var weapon_name = interaction.options.get('bron').value;

                var enemy = database.characters.filter(
                    function(data){ return data.name.toLowerCase() == target.toLowerCase() }
                );
                if (enemy[0] === undefined) {
                    var enemy = database.enemies.filter(
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
                var body_part = enemy[0].body_parts[globals.getRandomInt(enemy[0].body_parts.length) - 1];

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

                if(eval('enemy[0].' + body_part + '=== 0')){
                    if(Object.hasOwn(weapon[0],'unarmored_damage')) weapon_dmg = weapon[0].unarmored_damage;
                    if(Object.hasOwn(weapon[0],'unarmored_bleed')) bleed = weapon[0].unarmored_bleed;   
                }

                if(Object.hasOwn(weapon[0],'penetration')) var penetration = weapon[0].penetration;
                else var penetration = 0;
                
                var stat_value = character[0].precyzja;
                if(Object.hasOwn(character[0],'modifier_precyzja')){
                    stat_value += character[0].modifier_precyzja;
                }
                if(Object.hasOwn(character[0],'kac')){
                    stat_value -= character[0].kac;
                }
                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }
                if(interaction.options.get('modyfikator_procentowy')){
                    var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                    stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                }

                var energy_cost = 10;

                if(character[0].energy < energy_cost){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m ma za mało [1;36mkondycji[1;37m![0m\n```'
                    interaction.editReply(message);
                    return
                }
                if(!Object.hasOwn(character[0].ammo[0],'bolts')){
                    var message = '```ansi\n[1;32m' + character[0].name + '[1;31m nie ma [1;37mtej amunicji![0m\n```';
                    await interaction.editReply(message);
                    return;
                }
                character[0].energy -= energy_cost;
                character[0].ammo[0].bolts -= 1;
                if (character[0].ammo[0].bolts < 1){
                    delete character[0].ammo[0].bolts;
                }
                if(Object.hasOwn(character[0],'krok_w_tyl')) delete character[0].krok_w_tyl;

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

                var roll = globals.getRandomInt(dice);
                var damage = stat_value - roll + weapon_dmg;

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Przyszpilający strzał'+
                '\n[1;37mWynik rzutu: [[1;34m' + roll + '[1;37m] Próg: ' + stat_value;

                if(roll === dice){
                    message += '[1;31m Krytyczna porażka!';
                }
                else if(roll > stat_value && roll != 1){
                    message += '[1;31m Porażka!';
                }
                else{
                    var damage = stat_value - roll + weapon_dmg;
                    if (roll === 1){
                        message += '[1;31m Krytyczne[1;32m trafienie!'
                        damage *= 2;
                    }
                    else{
                        message += '[1;32m Trafienie!';
                    }
                    message += ' [1;37mObrażenia: [1;31m' + damage + '\n\n';

                    enemy[0].root = 1;

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

                        message += '\nPZ: ' + enemy[0].hp + '/' + enemy[0].max_hp + '\n[1;32m' + enemy[0].name + '[1;37m jest[1;34m unieruchomiony/a\n\n';

                    if(Object.hasOwn(character[0].ammo[0],'bolts')) message += '[1;37mBełty: ' + character[0].ammo[0].bolts;
                    else message += '[1;37mKoniec bełtów';

                }
                message += '\n```';
                
                break;
            //Miotacz
            //Bard
            /*TODO*/case 'drwina':
                var level = interaction.options.get('poziom').value;
                var stat = interaction.options.get('statystyka').value;
                var target = interaction.options.get('cel').value;

                var enemy = database.characters.filter(
                    function(data){ return data.name.toLowerCase() == target.toLowerCase() }
                );
                if (enemy[0] === undefined) {
                    var enemy = database.enemies.filter(
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

                switch(stat){
                    case 'retoryka':
                        var stat_value = character[0].retoryka;
                        break;
                    case 'perswazja':
                        var stat_value = (character[0].retoryka + character[0].inteligencja);
                        if(Object.hasOwn(character[0],'modifier_inteligencja')){
                            stat_value += character[0].modifier_inteligencja;
                        }
                        dice += 20;
                        break;
                    case 'zastraszanie':
                        var stat_value = (character[0].retoryka + character[0].sila);
                        if(Object.hasOwn(character[0],'modifier_sila')){
                            stat_value += character[0].modifier_sila;
                        }
                        dice += 20;
                        break;
                }
                if(Object.hasOwn(character[0],'modifier_retoryka')){
                    stat_value += character[0].modifier_retoryka;
                }
                if(interaction.options.get('modyfikator')){
                    var modifier = interaction.options.get('modyfikator').value;
                    stat_value += modifier;
                }
                if(interaction.options.get('modyfikator_procentowy')){
                    var percentage_modifier = interaction.options.get('modyfikator_procentowy').value;
                    stat_value = Math.ceil(stat_value * (1 + percentage_modifier/100));
                }
                if(Object.hasOwn(character[0],'kac')){
                    stat_value -= character[0].kac;
                }

                var message = '```ansi\n[1;32m' + character[0].name + '[1;37m Drwina lvl ' + level + '\n\n';
                
                var roll = globals.getRandomInt(dice);

                if(roll === dice){
                    message += '[1;31m Krytyczna porażka!';
                }
                else if(roll>stat_value){
                    message += '[1;31mPorażka!';
                }
                else{
                    if(roll === 1){
                        message += '[1;31mKrytyczny [1;32msukces!';
                    }
                    else{
                        message += '[1;32mSukces!';
                    }

                    if(!Object.hasOwn(character[0],'drwina_targets')) character[0].drwina_targets = [];
                    character[0].drwina_targets.push(enemy[0].name);

                    enemy[0].zadrwiony_przez = character[0].name;

                    message += '\n [1;32m' + enemy[0].name + '[1;37m skupia się na ' + character[0].name;
                    
                }

                message += '\n```';
                break;
            //Inne
            }
        globals.SaveFile(JSON.stringify(database));
		await interaction.editReply(message);
	},
};