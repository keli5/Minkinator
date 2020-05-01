/* eslint-disable no-eval */
module.exports = {
  description: 'Evaluates Javascript code.',
  aliases: ['evaluate'],
  parameters: [
    {
      name: 'input',
      required: true
    }
  ],
  async execute (client, message, args) {
    const guildConfig = await client.database.properties.findByPk('configuration').then(key => key.value);
    const embedColor = guildConfig.embedSuccessColor;

    try {
      return message.channel.send(new client.Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle('JS Result')
        .setDescription(await eval(`(async() => {${args.join(' ')}})()`), { code: 'js' })
      );
    } catch (error) {
      return message.channel.send(new client.Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle('JS Error')
        .setDescription(error, { code: 'js' })
      );
    }
  }
};