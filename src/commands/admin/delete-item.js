module.exports = {
  description: "Delete an item from the guild shop.",
  aliases: ["remove-item", "del-item"],
  parameters: [
    {
      name: "name",
      type: String,
      required: true
    }
  ],
  async execute (client, message, [ itemName ]) {
    const shopItem = await global.sequelize.models.shopItem.findByPk(itemName);

    // Make sure item exists
    if (!shopItem) return message.channel.send(`Item: \`${itemName}\`, does not exist in the guild shop.`);

    await global.guildInstance.removeShopItem(shopItem);

    return message.channel.send(`Successfully deleted: \`${itemName}\`, from the guild shop.`);
  }
};