module.exports = {
  description: "Blurs an image.",
  parameters: [
    {
      name: "url",
      type: String
    }
  ],
  async execute (client, message, [ imageURL ]) {
    if (!(imageURL || message.attachments.size)) return message.channel.send("No URL or attachment provided.");
    const image = await global.canvas.loadImage(imageURL).catch(() => { return message.channel.send("Invalid URL provided."); });

    const canvas = global.canvas.createCanvas(image.width, image.height);
    const context = canvas.getContext("2d");

    context.blur(30);
    context.drawImage(image, 0, 0);

    const attachment = new global.Discord.MessageAttachment(canvas.toBuffer());

    return message.channel.send(attachment);
  }
};
