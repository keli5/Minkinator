module.exports = {
  description: 'Shows a members inventory.',
  aliases: ['inv'],
  parameters: [
    {
      name: 'member',
      type: String
    }
  ],
  async execute (client, message, args) {
    const guildConfig = await client.database.properties.findByPk('configuration').then(key => key.value);
    const successColor = guildConfig.colors.success;

    const user = message.mentions.users.first() || message.author;
    const member = message.guild.member(user);
    const inventory = (await client.database.members.findByPk(user.id)).inventory;

    const inventoryEmbed = new client.Discord.MessageEmbed()
      .setColor(successColor)
      .setTitle(`Inventory of ${member.displayName}`);

    inventory.map(item => inventoryEmbed.addField(item.name, item.amount, true));

    if (!inventoryEmbed.fields.length) inventoryEmbed.setDescription('No items present.');

    return message.channel.send(inventoryEmbed);
  }
};