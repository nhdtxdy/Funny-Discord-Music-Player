const {checkChannel} = require('../helpers/channelHelper.js');

module.exports = {
  name: 'skip',
  description: 'Skip current song!',
  async execute(interaction, player) {
    await interaction.deferReply();
    if (!(await checkChannel(interaction, player)))
      return;

    const queue = player.getQueue(interaction.guildId);

    const currentTrack = queue.current;
    const success = queue.skip();
    return void interaction.followUp({
      content: success ? `⏩ | Skipped **${currentTrack}**!` : '❌ | Something went wrong!',
    });
  },
};
