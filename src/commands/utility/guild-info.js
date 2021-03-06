module.exports = {
  description: "Show guild information.",
  aliases: ["gi", "guildinfo"],
  async execute (client, message) {
    const guildConfig = global.guildInstance.guildConfig;
    const defaultColor = guildConfig.colors.default;

    const guild = message.guild;

    // Create embed
    const infoEmbed = new global.Discord.MessageEmbed()
      .setColor(defaultColor)
      .setThumbnail(guild.iconURL())
      .setTitle("Guild Information")
      .addField("Name:", guild.name, true)
      .addField("ID:", guild.id, true)
      .addField("Owner:", guild.owner, true)
      .addField("Roles:", guild.roles.cache.size, true)
      .addField("Features:", guild.features.length >= 1 ? guild.features : "None", true)
      .addField("Channels:", guild.channels.cache.size, true)
      .addField("Created:", global.moment(guild.createdAt).format("MM/DD/YYYY"), true)
      .addField("Emojis:", guild.emojis.cache.size, true)
      .addField("Members:", guild.members.cache.size, true)
      .addField("Maximum Members:", guild.maximumMembers || "None", true)
      .addField("Region:", guild.region, true);

    if (guild.description) infoEmbed.setDescription(guild.description);

    return message.channel.send(infoEmbed);
  }
};