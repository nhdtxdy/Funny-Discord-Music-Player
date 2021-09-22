const {checkChannel} = require('../helpers/channelHelper.js');

module.exports = {
  name: 'clear',
  description: 'Clear all songs in the queue!',
  async execute(interaction, player) {
    await interaction.deferReply();
    if (!(await checkChannel(interaction, player)))
      return;

    const queue = player.getQueue(interaction.guildId);

    queue.destroy(false);
    return void interaction.followUp({
      content: '💥 | Cleared!',
    });
  },
};
