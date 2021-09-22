const {checkChannel} = require('../helpers/channelHelper.js');

module.exports = {
  name: 'pause',
  description: 'Pause current song!',
  async execute(interaction, player) {
    await interaction.deferReply();
    if (!(await checkChannel(interaction, player)))
      return;

    const queue = player.getQueue(interaction.guildId);

    const success = queue.setPaused(true);
    return void interaction.followUp({
      content: success ? '⏸ | Paused!' : '❌ | Gặp bug cmnr!',
    });
  },
};
