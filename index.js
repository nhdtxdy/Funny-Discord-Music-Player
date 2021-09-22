const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/Client');
const {token} = require('./config.json');
const {Player} = require('discord-player');

const {setTextChannel} = require('./helpers/channelHelper.js');

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const {bannedFiles} = require('./config.json');

for (const file of commandFiles) {
  if (bannedFiles.includes(file))
    continue;

  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

console.log(client.commands);

const player = new Player(client);

player.on('error', (queue, error) => {
  console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
});

player.on('connectionError', (queue, error) => {
  console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
});

player.on('trackStart', (queue, track) => {
  const rickList1 = ['never', 'gonna'];
  const rickWord = 'rick';
  const rickList2 = ['roll', 'astley'];
  var lowTitle = track.title.toLowerCase();
  if (
    rickList1.every(kw => lowTitle.includes(kw)) ||
    (lowTitle.includes(rickWord) &&
    rickList2.some(kw => lowTitle.includes(kw)))
  ) {
    queue.metadata.send(`🤡 | POGGERS RICKROLL'D`);
  }
  else {
    queue.metadata.send(`😔 | Rick Astley muốn sa mạc bạn vì đã không bật bài hát của anh ấy`);
  }
  queue.metadata.send(`🎶 | hey b0ss i habe a **${track.title}**`);
});

player.on('trackAdd', (queue, track) => {
  if (queue.playing)
    queue.metadata.send(`🎶 | **${track.title}** NEXT??`);
});

player.on('botDisconnect', queue => {
  queue.metadata.send('🤬 | du ma bố bị kick');
  setTextChannel(undefined);
});

player.on('channelEmpty', queue => {
  queue.metadata.send('❌ | Hết người nhưng đeos out ở lại rickroll tiếp');
  // queue.metadata.send('❌ | Nobody is in the voice channel, leaving...');
  setTextChannel(undefined);
});

player.on('queueEnd', queue => {
  // queue.metadata.send('✅ | CÚT');
});

client.once('ready', async () => {
  client.user.setActivity('Never Gonna Give', {
    // url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'LISTENING', 
  });
  console.log('Ready!');
});

client.once('reconnecting', () => {
  console.log('Reconnecting!');
});

client.once('disconnect', () => {
  console.log('Disconnect!');
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  // if (!client.application?.owner) await client.application?.fetch();

  // if (message.content === "!deploy" && message.author.id === client.application?.owner?.id) {
  if (message.content === "!deploy") {
    await message.guild.commands.set(client.commands).then(() => {
      message.reply("😱 | Rick Astley đã nhảy vào sẻver");
    })
    .catch((err) => {
      message.reply("☎️ | Rick Astley hiện không liên lạc được, xin vui lòng thử lại sau");
      console.error(err)
    });
  }
});

client.on('interactionCreate', async interaction => {
  const command = client.commands.get(interaction.commandName.toLowerCase());

  try {
    // if (interaction.commandName == 'ban' || interaction.commandName == 'userinfo') {
    //   command.execute(interaction, client)
    // }
    // else {
    //   command.execute(interaction, player);
    // }
    if (interaction.commandName == 'ping') {
      await command.execute(interaction, client);
    }
    else {
      await command.execute(interaction, player);
    }
  } catch (error) {
    console.error(error);
    interaction.followUp({
      content: '☎️ | Rick Astley hiện không liên lạc được, xin vui lòng thử lại sau',
    });
  }
}); 

client.login(token);
