const {checkChannel} = require('../helpers/channelHelper.js');

module.exports = {
  name: 'nowplaying',
  description: 'Get the song that is currently playing.',
  async execute(interaction, player) {
    await interaction.deferReply();
    if (!(await checkChannel(interaction, player)))
      return;

    const queue = player.getQueue(interaction.guildId);

    const progress = queue.createProgressBar();
    // const perc = queue.getPlayerTimestamp();

    return void interaction.followUp({
      embeds: [
        {
          // title: '**Now Playing♪**',
          author: {
            name: 'Now Playing♪',
            icon_url: 'https://images-ext-2.discordapp.net/external/GxKfmFYEGTWTEdqsxtc0Ina0CIyTXB3EZZ9nybKPTVI/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889205690068008960/ea8d74771706c5215acc385ca14bf395.webp',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
          thumbnail: {
            url: queue.current.thumbnail,
          },
          color: Math.random() * 0xffffff << 0,
          description: `[${queue.current.title}](${queue.current.url})`,
          fields: [
            {
              name: '\u200b',
              value: progress,
            },
          ],
        },
      ],
    });
  },
};
