const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "queue",
  description: "Show the music queue and now playing.",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue){
      let queueEmbed = new MessageEmbed()
        .setColor("#f9a825")
        .setTitle("Queue")
        .setDescription(`There is nothing playing right now.`)
      
      return message.channel.send(queueEmbed).then((msg) => {
        setTimeout(() => {
          if(msg.deletable){
            msg.delete();
          }
        }, 10000);
      }).catch(console.error);
    }

    let queueEmbed = new MessageEmbed()
    .setColor("#f9a825")
    .setTitle("Queue")
    .setDescription(`${serverQueue.songs.map((song, index) => index + 1 + ". **" + song.title + "**").join("\n")}

Now playing: **${serverQueue.songs[0].title}**`);

    return message
      .channel.send(queueEmbed).then((msg) => {
        setTimeout(() => {
          if(msg.deletable){
            msg.delete();
          }
        }, 10000);
      })
      .catch(console.error);
  }
};
