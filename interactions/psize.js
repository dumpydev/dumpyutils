
/* Importing the SlashCommandBuilder from the @discordjs/builders package. */

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("psize")
        .setDescription("pp size")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("PP SIZE REVEAL?!")
                .setRequired(false)
        ),
    async execute(interaction) {
        // retrieve user
        var pp = generatePP()
        let member = await interaction.options.getUser("user");

        if (member == null) {

            await interaction.reply({
                embeds: [{
                    color: "#00aeff",
                    title: "Your pp size is:",
                    description: `${pp}\nwow such ${pplength(pp)}`,

                }]
            })
        } else {
            await interaction.reply({
                embeds: [{
                    color: "#00aeff",
                    title: `${member.username}'s pp size is:`,
                    description: `${pp}\nwow such ${pplength(pp)}`,

                }]
            })
        }


    },
};
/**
 * It generates a random string of "=" characters.
 * @returns A string of 8=s and a D.
 */

function generatePP() {
    var pp = "8";
    var pp_size = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    for (var i = 0; i < pp_size; i++) {
        pp += "=";
    }
    return pp + "D";
}
/**
 * If the length of the string is greater than 9, return "MASSIVE PP!", if the length of the string is
 * greater than 7, return "BIG PP!", if the length of the string is greater than 5, return "MEDIUM
 * PP!", if the length of the string is greater than 3, return "SMALL PP!".
 * @param length - The length of the string you want to check.
 * @returns the string "MASSIVE PP!"
 */
function pplength(length) {
    if (length.length > 9) {
        return "MASSIVE PP!"
    } else if (length.length > 7) {
        return "BIG PP!"
    } else if (length.length > 5) {
        return "MEDIUM PP!"
    } else if (length.length > 3) {
        return "SMALL PP!"
    }
}