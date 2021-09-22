const {QueueRepeatMode} = require('discord-player');
const {checkChannel} = require('../helpers/channelHelper.js');

const modeMapping = 
{
  'off': QueueRepeatMode.OFF,
  'track': QueueRepeatMode.TRACK,
  'queue': QueueRepeatMode.QUEUE,
  'autoplay': QueueRepeatMode.AUTOPLAY,
};
const modeDescription = 
{
  'off': 'Loop',
  'track': 'Loop',
  'queue': 'Queue loop',
  'autoplay': 'Autoplay',
};

module.exports = {
  name: 'loop',
  description: 'Set loop mode',
  options: [
    {
      name: 'mode',
      type: 3, // 'STRING' Type
      description: 'Loop mode',
      choices: 
      [
        {name: 'off', value: 'off'}, 
        {name: 'track', value: 'track'}, 
        {name: 'queue', value: 'queue'}, 
        {name: 'autoplay', value: 'autoplay'},
      ],
      required: true,
    },
  ],
  async execute(interaction, player) {
    await interaction.deferReply();
    if (!(await checkChannel(interaction, player)))
      return;

    const mode = interaction.options.get('mode').value;
    const queue = player.getQueue(interaction.guildId);
    
    var status = queue.setRepeatMode(modeMapping[mode]) ? '' : 'already ';
    if (mode === 'off') status += 'disabled';
    else status += 'enabled';

    return void interaction.followUp({
      content: `🔁 | ${modeDescription[mode]} ${status}!`,
    }); 
  },
};
