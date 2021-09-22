const {AudioFilters} = require('discord-player')
const {checkChannel} = require('../helpers/channelHelper.js');

const allowedFilters = [
  'bassboost_low',
  'bassboost',
  'bassboost_high',
  // '8D', // Unusable
  'vaporwave',
  'nightcore',
  'phaser',
  'tremolo',
  'vibrato',
  'reverse',
  'treble',
  'normalizer',
  'normalizer2',
  'surrounding',
  'pulsator',
  'subboost',
  'karaoke',
  'flanger',
  'gate',
  // 'haas',
  // 'mcompand',
  // 'mono',
  // 'mstlr',
  // 'mstrr',
  // 'compressor',
  // 'expander',
  // 'softlimiter',
  'chorus',
  'chorus2d',
  'chorus3d',
  // 'fadein',
  // 'dim',
  'earrape',
  'show',
  'clear',
];
const nothing = '\u200b';
var choices = [];
for (const filter of allowedFilters)
  choices.push({name: filter, value: filter});

module.exports = {
  name: 'effect',
  description: 'Set sound effects',
  options: [
    {
      name: 'mode',
      type: 3, // 'STRING' Type
      description: 'Sound profile',
      choices: choices,
      required: true,
    },
  ],
  
  async execute(interaction, player) {
    await interaction.deferReply();
    if (!(await checkChannel(interaction, player)))
      return;

    const mode = interaction.options.get('mode').value.toLowerCase();
    const queue = player.getQueue(interaction.guildId);

    const enabledFilters = queue.getFiltersEnabled();

    if (mode == 'show') {
      fields = [];
      for (f of enabledFilters)
        fields.push({name: nothing, value: `\`${f}\``});
      if (fields.length == 0) 
        fields.push({name: nothing, value: '\`No enabled effects\`'});

      interaction.followUp({
        embeds: [
          {
            title: 'Currently enabled effects',
            color: Math.random() * 0xffffff << 0,
            fields: fields,
          },
        ],
      });
    }
    else if (mode == 'clear') {
      filterToSet = undefined; 
      queue.setFilters(filterToSet);
      interaction.followUp({
        content: `⚙️ | Cleared all effects!`,
      });
    }
    else {
      filterToSet = new Map();

      for (f of enabledFilters)
        filterToSet[f] = true;
      
      filterToSet[mode] = !(mode in filterToSet);
      var status = filterToSet[mode] ? 'enabled' : 'disabled';

      queue.setFilters(filterToSet);
      
      interaction.followUp({
        content: `💦 | \`${mode}\` ${status}!`
      }); 
    }

    return;
  },
};
