const {checkChannel} = require('../helpers/channelHelper.js');

const nothing = '\u200b';

module.exports = {
  name: 'queue',
  description: 'List all songs in the queue!',
  async execute(interaction, player) {
    await interaction.deferReply();
    if (!(await checkChannel(interaction, player)))
      return;

    const queue = player.getQueue(interaction.guildId);

    fields = [];

    fields.push({
      name: nothing, 
      value: '__Now Playing:__',
    });
    fields.push({
      name: nothing,
      value: `[${queue.current.title}](${queue.current.url}) | \`${queue.current.duration}\``,
    });

    if (queue.tracks.length) {
      fields.push({
        name: nothing, 
        value: '\n__Up Next__',
      });
      counter = 0;
      for (const track of queue.tracks) {
        counter++;
        fields.push({
          name: nothing,
          value: `${counter}. [${track.title}](${track.url}) | \`${track.duration}\``,
        });
      }
    }

    footer = {
      text: 'Mẹ m Trung',
    };
    return void interaction.followUp({
      embeds: [
        {
          color: Math.random() * 0xffffff << 0,
          fields: fields,
          footer: footer,
        },
      ],
    });
  },
};
