const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk1VS1pCbDNXb1IzSWx4c3pFTG5kQ29tWFFTSC9Rc0hpTG1QdVRTQzBrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT3FVWTFkdkZEWms4bWcyUHppbFpnaTBVQmF6WmRSVkw3UTk5NUY1SWdERT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrS1kxUkZVamZjeWY0ZUpjZldtcEtKbUkrMmZDcmpGOVdoNGNuNm9KRUdVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaYlRFYXc2R0JoNXAvWFpBZkhZeTEzS2psa0s2TGtIUFQ1eTZKTjR1RW5jPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFQWW5nZWNsNU1yWXFpa21KYm5ZRWZKVTJJYVdnam1iajExclcwRE5ZazQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikd0Nmd5OUpZM25xd2ZOSjJZdGVYbWJFYks3NTNTdHBlRHk0Zk1uUWZFa2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0wzb08xTC9xVmNkeWxmcm5iUDFnNGdPL0lWTkkrQ3RDSzlVYVovOGcwVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0xCcUlxZ01qM1QvczN5OFV6eW8yczRJdDVBZXlOT01HTnBtZ1FvREExQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhRRnN1UHhmUzFTSjRVK2xFOVc0djRybFdrazBQYXhoT3FjM1h3eHpxbmtaS2h0TWFvZUIrcEt0TllZUVJoR2RYcWlQZlI2T09CbWNDRnJIbnNkemh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjAsImFkdlNlY3JldEtleSI6IndzcmxyM0lLbEUvUHp4NFhLVENxTDdRak9nQnd1UVVqcG9jSS8xeG84alE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjQzODQzMTIwOTM2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijc4NUEyNDY0ODU2QzIyQUNCMUNGREI4MDQxOUYyRjg0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTUwMDIwNzN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI0Mzg0MzEyMDkzNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyMDFCMUU0QTJBRDY4NUJEREM2MUYzMzRGNUY1QzY5MSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU1MDAyMDc2fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJINzlXTFZFUSIsIm1lIjp7ImlkIjoiMjQzODQzMTIwOTM2OjQxQHMud2hhdHNhcHAubmV0IiwibGlkIjoiODMxMTI1NjY0OTc0NDk6NDFAbGlkIiwibmFtZSI6IvCfjLniiZvig53imZXvuI7wnZCR8J2QgPCdkJjinK7ig53imZTvuI7wnZCB8J2Qi/CdkI7wnZCO8J2Qg/CfjLkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pLWnZQd0NFTDdwN01RR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImFCK2pnRHh5MzlqZ1d4NUhuakNRU1NsTVZ2ZFVmK3UrMGN1TldicEpjRm89IiwiYWNjb3VudFNpZ25hdHVyZSI6IlN1M28wbS9CbW81NnVoeUQyVFhmM3ZtektjYlMyTmdnRFdheDJ1NzQvVTlwU2FiUFpxdjJLZHYwK0ZwVitIZzRkQkdFVmtlVlR3Z0xJVWt0LzYyUEFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJCTW9RMVQ5OFBieXdUdDJBMWhvLzM4dTg4VHBFUXkwd0NuRDFNOXRlLys4enlWaDF6Y1RwdGp1QmhRQlA0aFoxMU4zdnEwd1ZWL1JENEYzcFpBeWRnUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI0Mzg0MzEyMDkzNjo0MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXZ2ZvNEE4Y3QvWTRGc2VSNTR3a0VrcFRGYjNWSC9ydnRITGpWbTZTWEJhIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTUwMDIwNTksImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRXFaIn0=',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/QUEEN-DIANA/DIANA-XMD',
    OWNER_NAME : process.env.OWNER_NAME || "🌹≛⃝♕︎𝐑𝐀𝐘✮⃝♔︎𝐁𝐋𝐎𝐎𝐃🌹",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "243843120936",
    DEV : process.env.DEV || "𝗗𝗜𝗔𝗡𝗔 𝗢𝗙𝗙𝗜𝗖𝗜𝗔𝗟",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT : process.env.AUTO_REACTION || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no",
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/v1or1h.jpg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/wh3gx1.jpg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'no',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    GREET : process.env.GREET_MESSAGE || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By DIANA-XMD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    ANTI_BUG : process.env.ANTI_BUG || "no",
    ANTI_MENTION_GROUP : process.env.ANTI_MENTION_GROUP || "on",
    ANTI_TAG : process.env.ANTI_TAG || "on",
    ANTI_BAD : process.env.ANTI_BAD || "on",
    ANTI_SHARE_GROUP : process.env.ANTI_SHARE_GROUP || "on",
    ANTI_LINK_GROUP : process.env.ANTI_LINK_GROUP || "on",
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VbA8bWXKmCPZ2EFhAA0Y",
    WEBSITE :process.env.GURL || "https://queen-diana-pair.onrender.com",
    CAPTION : process.env.CAPTION || "𝐃𝐈𝐀𝐍𝐀 ~ 𝐗𝐌𝐃",
    BOT : process.env.BOT_NAME || '𝐃𝐈𝐀𝐍𝐀 ~ 𝐗𝐌𝐃',
    MODE: process.env.PRIVATE_MODE || "yes",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGES || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
