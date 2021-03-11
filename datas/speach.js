const global = [];

const goodmorning = {
    reply: [
        "Günaydınnnnnnnnnnn!",
        "Yuh aq bu ne uykusu",
        "Sanada good morning."
    ],
    match: 'günaydın|ayılamadım|morning|dia|morgen|gunaydin'
}

const coronavirus = {
        reply:  [
            "Yalvaralım mı abi? Evde kal sende!",
            "Maske önemli. At yemliği gibi ama takıcan yapacak bir şey yok!",
            "Panik yapma aq, korona morona yok bende!",
            "Nerede o ispanyol gribi zamanları..."
        ],
        match: 'corona|covid|virus|korona'
}

const sayhi = {
    reply:  [
        "Sana da selam!",
        "Aleyküm selam müdür.",
        "Geldi yine tipini siktiğim...",
        "Tamam beyler konuyu değiştirin %s geldi",
        "Ooooooooo %s beylerde buradaymış.",
        "Senden naber?"
    ],
    match: 'selam|slm|hi|hello|mobi'
}

const ozele = {
    reply:  [
        "Hayırdır gizliniz ne var?",
        "Böyle bişi yok..."
    ],
    match: 'özele|gelgel|'
}

const howareyou = {
    reply:  [
        "İyiyim abi sen!",
        "Hamdolsun.",
        "Muhteşeeeeeeemmmmmm...",
        "Ne sen sor ne ben söyleyeyim! :(",
        "İyidir %s, sen nasılsın?",
        "Senden naber?"
    ],
    match: 'nasılsın|naber|nasilsin|iyimi|nasil'
}

const abuse = {
    reply: [
        "Bilmukabele",
        "Ben bu %s|ek amına korum... Sen kime küfrediyorsun!",
        "He canım he"
    ],
    match: 'aq|soktuğum|göt|sikik|ibne'
}

const busuo = {
    reply: [
        "Bu dediğin ben miyim?"
    ],
    match: "bu|buna"
}

const bot = {
    reply: [
        "Ne var aq bot bot kıçını yırtıyorsun?",
        "Bot babandır!",
        "Canım ya kıyamam!!",
        "Bana bot deyince kalbimi kırıyorsun.. :("
    ],
    match: 'bot|robot|botu'
}

let speach = global.concat(coronavirus, sayhi, abuse, goodmorning, bot, busuo, howareyou, ozele);


module.exports = {
    speach: {
        global: speach,
        covid: coronavirus
    }
}