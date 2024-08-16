const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const fg = require('api-dylux')
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter') 
const { DBM } = require('postgres_dbm')

cmd({
    pattern: "attp",
    react: "🏵️",
    alias: ["ttps"],
    desc: "Text to Sticker tool",
    category: "extra",
    use: '.attp',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!q) return reply('🖊️ *Add a text to make a Sticker*')
const res = await fg.ttp(q)
const db_pool = new DBM({
    db: config.DATABASE_URL
})
const data = await db_pool.get("S_PACK_NAME")
const datas = await db_pool.get("S_OWNER_NAME")

let media = await getBuffer(res.result)
const sticker = new Sticker(media , {
    pack: data , // The pack name
    author: datas , // The author name
    type: StickerTypes.FULL, // The sticker type
    categories: ['🤩', '🎉'], // The sticker category
    id: '12345', // The sticker id
    quality: 50, // The quality of the output file
    background: 'transparent' // The sticker background color (only for full stickers)
})

const buffer = await sticker.toBuffer() // convert to buffer


await conn.sendMessage(from, { sticker : buffer  }, { quoted: mek })

    

} catch (e) {
reply('⛔ *Error accurated !!*\n\n'+ e )
l(e)
}
})
