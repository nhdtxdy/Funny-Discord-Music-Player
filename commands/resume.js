const {checkChannel} = require('../helpers/channelHelper.js');

module.exports = {
  name: 'resume',
  description: 'Resume current song!',
  async execute(interaction, player) {
    await interaction.deferReply();
    if (!(await checkChannel(interaction, player)))
      return;

    const queue = player.getQueue(interaction.guildId);

    const success = queue.setPaused(false);
    return void interaction.followUp({
      content: success ? '▶ | Resumed!' : '❌ | Something went wrong!',
    });
  },
};
