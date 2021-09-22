module.exports = {
  name: 'ping',
  description: 'Never gonna give yOU uP',
  async execute(interaction, client) {
      await interaction.deferReply();

      return void interaction.followUp({
        content: `🏓Latency is ${Date.now() - interaction.createdTimestamp}ms \
                  \nAPI Latency is ${Math.round(client.ws.ping)}ms`,
      });
  },
};
