const {GuildMember} = require('discord.js');

var textChannel = undefined;
function setTextChannel(value) {
  textChannel = value;
}

async function checkVoiceChannel(interaction, player) {
  if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
    await interaction.followUp({
      content: '❌ | You are not in a voice channel!',
    });
    return false;
  }
  
  if (
    interaction.guild.members.me.voice.channelId &&
    interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
  ) {
    await interaction.followUp({
      content: '❌ | You are not in my voice channel!',
    });
    return false;
  }

  return true;
}

async function checkTextChannel(interaction, player) {
  if (
    interaction.guild.members.me.voice.channelId &&
    textChannel !== undefined &&
    interaction.channelId !== textChannel
  ) {
    await interaction.followUp({
      content: `❌ | I'm currently bound to <#${textChannel}>!`,
    });
    return false;
  }

  if (interaction.commandName !== 'play') {
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) {
      await interaction.followUp({
        content: '❌ | No music is being played!'
      });
      return false;
    }
  }
  else {
    if (interaction.channelId !== textChannel) {
      setTextChannel(interaction.channelId);
      await interaction.followUp({
        content: `✅ | Bound to channel <#${textChannel}>!`,
      });
    }
  }

  return true;
}

async function checkChannel(interaction, player) {
  return (
    await checkVoiceChannel(interaction, player) && 
    await checkTextChannel(interaction, player)
  );
}

module.exports = { setTextChannel, checkChannel };