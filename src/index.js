const path = require('path')
const { clientId, guildId, token } = require('./config.json');
const { Client, Collection, IntentsBitField, channelLink, EmbedBuilder, ActivityType, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const { channel } = require('diagnostics_channel');
const globals = require('./globals.js')

require('./deploy-commands');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    if (folder === 'utility') continue;
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// // Accepted activity types
// ActivityType.Playing
// ActivityType.Listening
// ActivityType.Watching
// ActivityType.Competing
// ActivityType.Streaming // Lets you use url parameter. This can be a YouTube or Twitch link.
// ActivityType.Custom // Unsupported in discord.js. Will be added at some point.

// // Accepted statusses
// "online"
// "offline"
// "idle"
// "dnd"
function change_status(){
    status_num = globals.getRandomInt(4);
    switch (status_num){
        case 1:
            client.user.setPresence({ 
                activities: [{ 
                    name: 'jak Konrad obiera ziemniaki', 
                    type: ActivityType.Watching,  
                }], 
                status: 'online' 
            });
            break;
        case 2:
            client.user.setPresence({ 
                activities: [{ 
                    name: 'plotek w twierdzy', 
                    type: ActivityType.Listening,  
                }], 
                status: 'online' 
            });
            break;
        case 3:
            client.user.setPresence({ 
                activities: [{ 
                    name: 'murarza', 
                    type: ActivityType.Competing,
                    state: 'test',
                }], 
                status: 'online' 
            });
            break;
         case 4:
            client.user.setPresence({ 
                activities: [{ 
                    name: 'raporty z misji', 
                    type: ActivityType.Watching,  
                }], 
                status: 'online' 
            });
            break;
    }
}

client.on('ready', (c) => {
    change_status();
    var minutes = 5, the_interval = minutes * 60 * 1000;
    setInterval(function() {
        change_status();
    }, the_interval);
    

    console.log(`✅ ${c.user.tag} is online`);
    

});

client.on('interactionCreate', async interaction =>{
    if (interaction.isChatInputCommand()){
        const command = interaction.client.commands.get(interaction.commandName);
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: '``There was an error while executing this command!``', ephemeral: true });
            } else {
                await interaction.reply({ content: '``There was an error while executing this command!``', ephemeral: true });
            }
        }
    } else if (interaction.isAutocomplete()) {
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
			await command.autocomplete(interaction);
		} catch (error) {
			console.error(error);
		}

    }

});

client.on('messageCreate', (message) =>{
    if (message.author.bot){
        return;
    }
    //blokada na kanały rp
    if (message.channel.parentId === '1019449376604692581' || message.channel.parentId === '1234648000920424540' || message.channel.parentId === '1257377843105763358' || message.channel.parentId === '1019449572235411496') {
        return
    }


    if (message.content.toLowerCase().endsWith(' owo') || message.content.toLowerCase() === 'owo' || message.content.toLowerCase().startsWith('owo ') || message.content.toLowerCase().includes(' owo ')) {
        message.reply('UwU');
    }

    if (message.content.toLowerCase().endsWith(' uwu') || message.content.toLowerCase() === 'uwu' || message.content.toLowerCase().startsWith('uwu ') || message.content.toLowerCase().includes(' uwu ')) {
        message.reply('OwO');
    }
    if (message.content.toLowerCase().includes('good boy') || message.content.toLowerCase().includes('good boi') || message.content.toLowerCase().includes('gud boi') || message.content.toLowerCase().includes('gud boy')) {
        message.reply('O///O');
    }
    if (message.content.toLowerCase().includes('sralis pierdzialis')) {
        message.reply('amadeus ductus');
    }

    if (message.content.toLowerCase().includes('czy mozna') || message.content.toLowerCase().includes('czy można') ) {
        var imgPath = path.join(__dirname, '..', 'images', 'jeszcze-jak-papiez.gif');
        message.reply({ files: [imgPath] });
    }
    if (message.content.toLowerCase().includes('seksowniak') || message.content.toLowerCase().includes('seksiak') || message.content.toLowerCase().includes('popitaśny') || message.content.toLowerCase().includes('popitasny') ) {
        var imgPath = path.join(__dirname, '..', 'images', 'pitbul-dale.png');
        message.reply({ files: [imgPath] });
    }
    if (message.content.toLowerCase().includes('zostaw mnie')) {
        var imgPath = path.join(__dirname, '..', 'images', 'gru-no.png');
        message.reply({ files: [imgPath] });
    }
    if (message.content.toLowerCase().includes('żołd')) {
        var imgPath = path.join(__dirname, '..', 'images', 'one-more-day.gif');
        message.reply({ files: [imgPath] });
    }
    if (message.content.toLowerCase().includes('studni')) {
        var imgPath = path.join(__dirname, '..', 'images', 'yors.gif');
        message.reply({ files: [imgPath] });
    }
    if (message.content.toLowerCase().includes('essa')) {
        var imgPath = path.join(__dirname, '..', 'images', 'essa.png');
        message.reply({ files: [imgPath] });
    }
});

client.login(token);