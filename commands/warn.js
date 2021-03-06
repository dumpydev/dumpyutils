const { Permissions, MessageEmbed } = require("discord.js");
const db = require("quick.db")
const warns = new db.table("warns")

let wrong = "#F04A47";

module.exports = {
  name: "warn",
  description: "warn command",
  usage: "<user> <reason>",
  aliases: ["none"],
  guildOnly: false, //true if only used in server
  args: true, //true if the command cant run without arguments
  category: "moderation",
  execute: async (message, args, client) => {
    try {
      if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        const embed = new MessageEmbed().setDescription(
          "Missing KICK MEMBERS permission"
        );
        return message.channel.send(embed);
      }

      const target = message.mentions.users.first();
      if (!target) {
        const embed = new MessageEmbed()
          .setDescription("Mention a member please.")
          .setColor(wrong);

        return message.channel.send({
          embeds: [embed],
        });
      }

      if (target.bot) {
        const embed = new MessageEmbed()
          .setDescription("You cannot warn bots")
          .setColor(wrong);
        return message.channel.send({
          embeds: [embed],
        });
      }
      if (target.id === message.author.id) {
        const embed = new MessageEmbed()
          .setDescription("You cannot warn yourself.")
          .setColor(wrong);
        return message.channel.send({
          embeds: [embed],
        });
      }

      if (
        message.member.roles.highest.comparePositionTo(
          message.mentions.members.first().roles.highest
        ) < 1
      ) {
        const embed = new MessageEmbed()
          .setDescription("You cannot warn people higher than you!")
          .setColor(wrong);
        return message.channel.send({
          embeds: [embed],
        });
      }

      let reason = args.slice(1).join(" ");

      if (!reason) {
        const embed = new MessageEmbed()
          .setDescription("Please provide a reason")
          .setColor(wrong);
        return message.channel.send({
          embeds: [embed],
        });
      }
      if(x == undefined || x == null) {
        warns.set(`warns_${message.guild.id}_${target.id}`, 0)
      }
      warns.add(`warns_${message.guild.id}_${target.id}`, 1);
      var x = warns.get(`warns_${message.guild.id}_${target.id}`);
      var threewarn = warns.get(`${message.guild.id}.3warn`);
      if (threewarn === 0 && x >= 3) {
        target.ban()
        return message.channel.send({
          embeds: [
            {
              color: "#F04A47",
              title: "3 Warn",
              description: `${target} has been **banned**`,
            },
          ],
        });

      } else if (threewarn === 1 && x >= 3) {
        target.kick()
        return message.channel.send({
          embeds: [
            {
              color: "#F04A47",
              title: "3 Warn",
              description: `${target} has been **kicked**`,
            },
          ],
        });
      }

      const embed = new MessageEmbed()
        .setDescription(
          `Successfully warned ${target.username} for reason ${reason}, this user now has ${x} warning(s)`
        )
        .setColor(wrong);
      message.channel.send({
        embeds: [embed],
      });

      try {
        const embed = new MessageEmbed()
          .setDescription(
            `You have been warned in ${message.guild.name}, you now have ${x} warning(s)`
          )
          .setFooter(`Reason: ${reason}`)
          .setColor(wrong);
        target.send({
          embeds: [embed],
        });
      } catch (err) {
        const embed = new MessageEmbed()
          .setDescription("Could not DM user.")
          .setColor(wrong);
        message.channel.send({
          embeds: [embed],
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
