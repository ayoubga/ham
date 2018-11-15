const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
const jimp = require('jimp');
const Canvas = require('canvas');

var prefix = "!";
var welc = JSON.parse(fs.readFileSync("welc.json", "utf8"))
client.on('message', message=>{
    if (message.content === "!welcon"){
        if (message.channel.guild) { // if message from the guild , not private 
            if (message.member.hasPermission(8)){ // 8 = Administrator
            fs.writeFile('./welc.json', JSON.stringify(message.guild.id, 'on')) // writing on JSON 
            message.channel.sendMessage('Done') //ON!
        } else {
        message.channel.sendMessage('You CANT EVER DO THAT COMMAND !')
    }
    }else {
            message.channel.sendMessage('you cant use this command here,') 
        }
    }
});
client.on('message',message =>{
    if (message.content==="!welcoff"){ // turn off the img welcome :palm_face:
        if (message.channel.guild) { // if message from the guild , not private 
            if (message.member.hasPermission(8)){ // if member have Administrator permission  , ( 8 = Adminstrator)
                fs.writeFile('welc.json', JSON.stringify(message.guild.id, 'off')) // writing on FS ( JSON ) as off
                message.channel.sendMessage('Done') // OFF!
            }
        } else{
            message.channel.sendMessage('YOU CANT USE THIS COMMAND HERE! :x:') //if someone send this command on private will reply
        }
    }
})
client.on('guildMemberAdd', member => {
var Canvas = require('canvas') //npm i canvas
var jimp = require('jimp') //npm i jimp

const w = ['./img/w1.jpg','./img/w2.jpg','./img/w3.jpg','./img/w4.jpg','./img/w6.jpg','./img/w7.png','./img/w8.png',
'./img/w9.png','./img/w10.png','./img/w11.png','./img/w12.png','./img/w13.png','./img/w14.png','./img/w15.png','./img/w16.png'
,'./img/kk.png','./img/rb.png']; // you need to add Image welcome [ const w = [ './img/w1.jpg','./img/w2.jpg']; ] 

        let Image = Canvas.Image,
            canvas = new Canvas(401, 202),
            ctx = canvas.getContext('2d');
        ctx.patternQuality = 'bilinear';
        ctx.filter = 'bilinear';
        ctx.antialias = 'subpixel';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 401, 202);

})

                let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".png" : member.user.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);

                        //Avatar
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
                        ava.src = buf;
                        ctx.drawImage(ava, 152, 27, 95, 95);

                                                //wl
                        ctx.font = '20px Arial Bold';
                        ctx.fontSize = '25px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(`You are the  ${member.guild.memberCount}th`, 200, 190); //MemberCount

                        //ur name
                        ctx.font = '20px Arial';
                        ctx.fontSize = '28px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(member.user.username, 200, 154); //shows username!

member.guild.channels.find('id', welc[member.guild.id].imgwelc).sendFile(canvas.toBuffer());




})
})

});


client.on('message', message => { // Leaked by [ @Out Our server ]
   if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'bc')) {
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return
const args = message.content.split(" ").slice(1).join(" ")
const BcList = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setAuthor(`محتوى الرساله : ${args}`)
.setDescription(`**برودكاست بـ امبد 📝\nبرودكاست بدون امبد✏ \nلديك دقيقه للأختيار قبل الغاء البرودكاست**`)
if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(BcList).then(msg => {
msg.react('📝')
.then(() => msg.react('✏'))
.then(() =>msg.react('📝'))
 
var EmbedBcFilter = (reaction, user) => reaction.emoji.name === '📝' && user.id === message.author.id;
var NormalBcFilter = (reaction, user) => reaction.emoji.name === '✏' && user.id === message.author.id;
 
var EmbedBc = msg.createReactionCollector(EmbedBcFilter, { time: 60000 });
var NormalBc = msg.createReactionCollector(NormalBcFilter, { time: 60000 });
 
 
EmbedBc.on("collect", r => {
 
message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
var EmbedRep = args.replace('<server>' ,message.guild.name).replace('<user>', m).replace('<by>', `${message.author.username}#${message.author.discriminator}`)
var bc = new
Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(EmbedRep)
.setThumbnail(message.author.avatarURL)
m.send({ embed: bc })
msg.delete();
})
})
NormalBc.on("collect", r => {
  message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
var NormalRep = args.replace('<server>' ,message.guild.name).replace('<user>', m).replace('<by>', `${message.author.username}#${message.author.discriminator}`)
m.send(NormalRep);
msg.delete();
})
})
})
}
});
////////////////////////////////

//////////////////////////////////
  client.on('message', message => {
    if (message.content.startsWith("!link")) {

  message.channel.createInvite({
        thing: true,
        maxUses: 10,
        maxAge: 86400
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
  message.channel.send("**تم ارسال الرابط برسالة خاصة**")

message.author.send(`**مدة الرابط : يـوم
عدد استخدامات الرابط : 5**`)


    }
});


client.on('message', message => {
    if (message.content.startsWith(prefix + 'clear')) {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`ماعندك هذا البرمشن[*MANAGE_MESSAGES*] `).catch(console.error);
  message.delete()
  if(!message.channel.guild) return;
  let args = message.content.split(" ").slice(1);
  
  const messagecount = parseInt(args.join(' '));
  
  message.channel.fetchMessages({
  
  limit: messagecount
  
  }).then(messages => message.channel.bulkDelete(messages));
  message.channel.sendMessage("", {embed: {
    title: "**``تــم مسح الشات ``**",
    color: 0x06DF00,
    footer: {
    
    }
    }}).then(msg => {msg.delete(3000)});
  };
  
  });

  
