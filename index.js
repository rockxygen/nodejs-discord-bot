const Discord = require('discord.js');
const Log = require('./datas/log');
const { speach } = require('./datas/speach');
const Vocable = require('./datas/vocable');
const ytdl = require('ytdl-core');
const axios = require('axios');
const { validateURL } = require('ytdl-core');
require('dotenv').config();

const { TOKEN, PREFIX } = process.env;

/* İyelik Eki */
const suffix = new Vocable();

/* Const */

const servers   = {};
let server      = null;

const play = async (connection, m) => {
    const server = servers[m.guild.id];
    // const stream = ytdl(server.queue[0], {
    //     filter: 'audioonly',
    //     quality: 'highestaudio'
    // });

    console.log('queue', server.queue);

    server.dispatcher = connection.play(stream);

    // connection.play(await ytdl(s.queue[0]));

    // s.dispatcher = connection.play(stream);

    let song = (await ytdl.getInfo(server.queue[0])).videoDetails.title;

    // server.dispatcher.on

    server.dispatcher.on('finish', () => {
        server.queue.shift();
        if(!server.queue[0]) {
            m.channel.send('Şarkı çalınıyor : ' + song);
            play(connection, m);
        } else {
            connection.disconnect();
        }
    });
}

const client = new Discord.Client();

client.login(TOKEN);

client.on('ready', (m) => {
    console.log(`BOT Giriş yaptı : ${client.user.tag}`);
});

client.on('typingStart', (channel, user) => {
    // console.log(`${user} started typing in ${channel}`);
});

client.on('message', async (m) => {

    Log.write("mesajlar", `${m.author.username}: "${m.content}"`)
    Log.write("mesajlar", `-------------------------------------`)

    let data = m.content.toLowerCase();

    const parsedMessage = data.split(' ');

    if(!data.startsWith(PREFIX)) {
        if(m.author.bot) return;
        let username = m.author.username;
        speach.global.forEach(speak => {
            let regEx = '\\b(' + speak.match + ')\\b';
            if(data.match(new RegExp(regEx, 'g'))) {
                let length = speak.reply.length;
                let answer = speak.reply[Math.floor(Math.random() * length)]
                    .replace('%s|ek', suffix.word(username).get())
                    .replace('%s', username);
                m.channel.send(answer);
            }
        });
    }else{
        if (!m.guild) return;
        switch(parsedMessage[0]) {
            case "!covid":
                if(!parsedMessage[1]) {
                    m.channel.send('Lütfen ülke yazınız!');
                    return;
                }
                m.delete();
                let selectCountry = [];
                let now = new Date();
                let today = (now.getMonth() + 1) + "-" + (now.getDate() - 1) + "-" + now.getFullYear();
                await axios.get(`https://covid19.mathdro.id/api/countries/${parsedMessage[1]}`)
                .then(resp => {
    
                    let data = resp.data;
                    let country = parsedMessage[1].toUpperCase();
    
                    const embed = new Discord.MessageEmbed()
                    .setColor(0x7289DA)
                    .addField(`Ülke : ${country}`,`Kayıtlı : **${data.confirmed.value}**\nİyileşen : **${data.recovered.value}**\nÖlen : **${data.deaths.value}**`)
                    .setTimestamp();
    
                    m.channel.send(embed);
    
                });
            break;
            case "!temizle":
                m.delete();
                if(!parsedMessage[1]) {
                    m.channel.send('Lütfen silinecek mesaj sayısını yazınız!');
                    return;
                }
                if(!m.member.hasPermission("MANAGE_MESSAGES") || !m.member.hasPermission("ADMINISTRATOR")) {
                    m.channel.send("Yetkiniz bulunmuyor.");
                    return;
                }
                m.channel.bulkDelete(Math.ceil(parsedMessage[1]));
                Log.write("bulkDelete", `${m.author.username}, ${m.channel.name} kanalından ${parsedMessage[1]} mesaj sildi.`);
            break;
            case "!random":
                const randNumber = Math.random();
                m.channel.send(randNumber.toString());
            break;
            case "!join":
                console.log(m.guild);
                if (!m.guild) return;
                if (m.member.voice.channel) {
                    const connection = await m.member.voice.channel.join();
                } else {
                    m.reply('Ses kanalına girmelisiniz!');
                }
            break;
            case "!avatar":
                m.delete();
                m.reply(m.author.displayAvatarURL());
                break;
            case "!bot":
                m.channel.send('efendim');
            break;
            case '!oynat':
    
                m.delete();

                if(!m.guild) {
                    return;
                }
    
                if(!parsedMessage[1]) {
                    m.channel.send('Youtube linki girmelisin!');
                    return;
                }
    
                if(!m.member.voice.channel) {
                    m.channel.send('Ses kanalı açmalısınız.');
                    return;
                }
    
                server = servers[m.guild.id];
                
                if(!server) {
                    servers[m.guild.id] = {
                        queue: []
                    }
                }
    
                server.queue.push(parsedMessage[1]);

                console.log(server.queue);
    
                if(server.queue.length <= 1) {
                    try {
                        m.member.voice.channel.join().then(connection => {
                            play(connection, m);
                        });
                    } catch (error) {
                        console.log('Hata : ' + error);
                    }
                }
            break;
        }
    }

});