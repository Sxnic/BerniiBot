// -- BerniiBot --
import Eris from 'eris'
import { env } from './env.js'

// -- Config --
const bot = Eris(env.TOKEN, { intents: ['guilds', 'guildMessages'], maxShards: 'auto' })

// -- Event listeners --
// Ready
bot.on('ready', async () => {
    console.log(`
 _____             _ _ _____     _   
| __  |___ ___ ___|_|_| __  |___| |_ 
| __ -| -_|  _|   | | | __ -| . |  _|
|_____|___|_| |_|_|_|_|_____|___|_|\n`)
    console.log('BerniiBot, reporting in!')

    // Set the bot status
    bot.editStatus({ name: 'https://gitub.com/Sxnic/BerniiBot', type: 0 })
})

// Error
bot.on('error', async (err) => {
    console.log('[X] Whoops, an error occured!')
    console.error(err)
})

// On Role Added
bot.on('messageReactionAdd', async (message, emoji, reactor) => {
    if (message.guildID === env.SERVER_ID) {
        if (message.id === env.REACTION_MESSAGE_ID) {
            // 🟥 🟩 🟦
            if (emoji.name === '🟥') {
                await bot.addGuildMemberRole(message.guildID, reactor.id, env.RED_ROLE_ID)
                return
            }

            if (emoji.name === '🟩') {
                await bot.addGuildMemberRole(message.guildID, reactor.id, env.GREEN_ROLE_ID)
                return
            }

            if (emoji.name === '🟦') {
                await bot.addGuildMemberRole(message.guildID, reactor.id, env.BLUE_ROLE_ID)
                return
            }
        }
    }
})

// On Role Removed
bot.on('messageReactionRemove', async (message, emoji, userId) => {
    if (message.guildID === process.env.SERVER_ID!) {
        if (message.id === process.env.REACTION_MESSAGE_ID!) {
            // 🟥 🟩 🟦
            if (emoji.name === '🟥') {
                await bot.removeGuildMemberRole(message.guildID, userId, env.RED_ROLE_ID)
                return
            }

            if (emoji.name === '🟩') {
                await bot.removeGuildMemberRole(message.guildID, userId, env.GREEN_ROLE_ID)
                return
            }

            if (emoji.name === '🟦') {
                await bot.removeGuildMemberRole(message.guildID, userId, env.BLUE_ROLE_ID)
                return
            }
        }
    }
})

// Message created
bot.on('messageCreate', async (message) => {
    if (!message.channel) return // No channel
    if (message.author.bot) return // Don't send a message twice
    if (!message.content.startsWith(env.PREFIX)) return // No prefix? Do nothing

    // [^\s"']+|"([^"]*)"|'([^']*)'
    // const parsed = message.content
    //     .split(/[^\S+"']+|"([^"]*)"|'([^']*)'/gm)
    //     .filter((i) => i !== undefined && i !== '')

    // TODO: Future commands
})

// -- Start the bot --
bot.connect()
