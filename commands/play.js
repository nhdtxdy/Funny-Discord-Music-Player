const {checkChannel} = require('../helpers/channelHelper.js');
const {GuildMember, ApplicationCommandOptionType } = require('discord.js');
const {QueryType} = require('discord-player');
module.exports = {
  name: 'play',
  description: 'Play a song in your channel!',
  options: [
    {
      name: 'query',
      type: ApplicationCommandOptionType.String,
      description: 'Pleiku',
      required: true,
    },
  ],
  async execute(interaction, player) {
    try {
      await interaction.deferReply();
      if (!(await checkChannel(interaction)))
        return;

      const query = interaction.options.get('query').value;

      console.log(`query then: ${query}`);


      await interaction.followUp({
        content: `🔎 | Searching \`${query}\`...`,
      });
      // console.time('funvcl');

      const searchResult = await player
        .search(query, {
          requestedBy: interaction.user,
          searchEngine: QueryType.AUTO,
        })
        .catch(() => {});
      // console.timeEnd('funvcl');
      // console.time('funvcl2');
      if (!searchResult || !searchResult.tracks.length)
        // return void interaction.followUp({content: `❌ | No results for \`${query}\` were found!`});
        return void interaction.followUp({content: `❌ | \`${query}\` là clg??`});
      // console.timeEnd('funvcl2');
      // console.time('funvcl3');
      const queue = await player.createQueue(interaction.guild, {
        ytdlOptions: {
				quality: "highest",
				filter: "audioonly",
				highWaterMark: 1 << 30,
				dlChunkSize: 0,
			},
        metadata: interaction.channel,
      });
      // console.timeEnd('funvcl3');
      // console.time('funvcl4');
      try {
        if (!queue.connection) {
          // console.log('No queue connection!');
          await queue.connect(interaction.member.voice.channel);
        }
      } catch {
        void player.deleteQueue(interaction.guildId);
        return void interaction.followUp({
          content: '❌ | ima head out boys',
        });
      } 
      // console.timeEnd('funvcl4');
      // console.time('funvcl5');

      // await interaction.followUp({
      //   content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...`,
      // });
      await interaction.followUp({
        content: 'Im almost there',
      });

      searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);

      // console.log(`query now: ${query}`);
      // console.log(`track title: ${searchResult.tracks[0].title}`);

      // console.timeEnd('funvcl5');
      // console.time('funvcl6');
      if (!queue.playing) {
        // console.log(`queue not playing when ${query}`);
        queue.playing = true;
        await queue.play(); // cái này chạy riêng hay chung? có tính vào thời gian ko
        // console.log(`here first ${searchResult.tracks[0].title}`);
      }
      // console.timeEnd('funvcl6');
    } catch (error) {
      console.log(error);
      interaction.followUp({
        content: '❌ | i cant work without being rickrolled: ' + error.message,
      });
    }
  },
};