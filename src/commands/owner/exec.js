module.exports = {
  description: 'Executes in terminal.',
  parameters: [
    {
      name: 'input',
      type: String,
      required: true
    }
  ],
  async execute (client, message, args) {
    const guildConfig = await client.database.properties.findByPk('configuration').then(key => key.value);
    const embedColor = guildConfig.embedSuccessColor;

    const execSync = require('child_process').execSync;

    try {
      return message.channel.send(new client.Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle('Execution Result')
        .setDescription(execSync(args.join(' '), { encoding: 'utf-8' }), { code: 'bash' })
      );
    } catch (error) {
      return message.channel.send(new client.Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle('Execution Error')
        .setDescription(error, { code: 'bash' })
      );
    }
  }
};