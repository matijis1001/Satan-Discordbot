///////////////////////// webpage /////////////////////////////////////
////////////////////////// webpage /////////////////////////////////////
////////////////////////// webpage /////////////////////////////////////

const express = require("express");
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
let ejs = require('ejs')

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static("./"));
app.use(cookieParser())
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
// app.use(express.static("public"));

app.get("/", function(request, response) {
  // response.sendFile(__dirname + "/views/index.html");
      response.render("index",  { main: 'block',authdiv:'none' })
});

app.get("/database", function(request, response) {
  response.sendFile(__dirname + "/dota/dotadatabase.db");
});


app.post("/login", function(req,res){
  if(req.body.pass!=null){
    if(req.body.pass==process.env.PASS){
      res.send("true")
      console.log("true");
    }else{
      res.send("false");
      console.log("false");
    }
  }
});

app.get("/admin", function(request, response) {
  console.log(request.cookies.pass)
  if(request.cookies.pass!=null){
      if(request.cookies.pass==process.env.PASS){
        response.sendFile(__dirname + "/views/admin.html");
      }else{
        response.sendFile(__dirname + "/views/deletecookies.html");
        // response.sendFile()
      }
  }else{
        response.sendFile(__dirname + "/views/index.html");
  }

});

app.get("/styles.css", function(request, response) {
  response.sendFile(__dirname + "/views/style.css");
});

app.get("/admin.js", function(request, response) {
  response.sendFile(__dirname + "/views/admin.js");
});
app.get("/script.js", function(request, response) {
  response.sendFile(__dirname + "/views/script.js");
});

app.get("/bangun", function(req,res){
  res.send("oke");
});

app.post("/test", function(request, response) {
  // console.log("test clicked!")
  // response.send("send to client")
//   const url = 'https://discordapp.com/api/users/@me/connections';
//   var snekfetch = require("snekfetch");
//   snekfetch.get(url,{
//     headers: {
// 		'authorization': 'Bearer HF1aaJlwzPNpNJw098jkWyCcszeXsT'
// 	}
//   }).then(r => 
//       {
//       console.log(r.body);
//       },e=>{
//         console.log(e.body)
//       });
});



const listener = app.listen(process.env.PORT, function() {
});

////////////////////////// webpage /////////////////////////////////////
////////////////////////// webpage /////////////////////////////////////
////////////////////////// webpage /////////////////////////////////////


const linkoauth = 'https://discordapp.com/oauth2/authorize?client_id=638206789682331680&redirect_uri=https%3A%2F%2Fzakkushu-discordbot.glitch.me%2F&response_type=code&scope=identify%20connections';

const YouTube = require('youtube-node');

const getYouTubeID = require('get-youtube-id');

const youTube = new YouTube();
youTube.setKey('AIzaSyCsZeyboWvPOzC4q1pzDtEYugyBAKzRKtA');


const Discord = require('discord.js');
const bot = new Discord.Client();

const ytdl = require("ytdl-core");

const token = 'NjM4MjA2Nzg5NjgyMzMxNjgw.XbvqTg.zW7w6qUqqtTHl4YsL9vEnSMkmh0';

const fs = require("fs");
bot.steamid = require ("./steamid.json");
bot.lepel = require("./lepel.json");

const fetch = require("snekfetch");

var prefix = '-';

var servers = {};

const counter = 7;

var konter = ["bacot tok!", "?", "?", "hahahahahahahaha", "bacot!!", "babi", "bacot babi!", "cam org bodo", "sial kau", "otak kau mane?!", "dasar loliboi", "maen sama pico ja kau sana", "hmmm", "anak haram", "wewwww", "weww", "wew", "sial", "SIALE", "SATAN", "e", "kau kire kau siape?", "sial eeee", "eeeeeee", "e", "aqjfpiqjfkjasfjapijrfpqwa", "~#!%^@&$%~@$&^%(&Y&$E"];
var konterg = ["DULI KE HA??!!", "bacot kau babi!!", "Babi!!!", "bacot jing!", "bangsat", "wat?", "duli ke?", "hahahahahahhaahahahaha", "anak haram", "wewwww", "weww", "wew", "sial", "SIALE", "SATAN", "e", "eeeee", "nape ba", "diam tan", "satan tak tau malu!", "sial", "mati ja kau tan!", "emang sial ni satan!", "woi!!", "sial e", "ape ba mau kau tan", "sial kau", "bacot!!", "kau tu setan", "sial e", "tau malu dak kw", "bacot jing", "bangsat!", "ingat2 jak kw", "?"];
var ja = konter.length;
var jg = konterg.length;


bot.login(token);


bot.on('ready', () => {
    console.log('botnya online!');
     bot.user.setActivity('Recruiting more satan');
})

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(channel => channel.name === "chatbodo");
    if(!channel) return;
  
    channel.send(`Welcome to satan cult, ${member}`);
})

bot.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find(channel => channel.name === "chatbodo");
    if(!channel) return;
  
    channel.send(`Mampos kw, ${member}`);
})

bot.on('message', message => {
  // var currentUser = message.author;
  // console.log(message.content);
 var args;
    if(message.content.substring(0,prefix.length)==prefix){
       args = message.content.substring(prefix.length).split(" ");
    }else{
      args = []
    }
  
  if(message.author.discriminator == "6720"){
    if(Math.floor(Math.random() * 10) >= counter){
      message.reply(konter[Math.floor(Math.random() * ja)]);
    }
  }
  if(message.author.discriminator == "4324"){
    if(Math.floor(Math.random() * 10) >= counter){
      message.reply(konterg[Math.floor(Math.random() * jg)]);
    }
  }
  
  if(message.author.discriminator && message.author.discriminator != "9620"){
    if(!bot.lepel[message.author.discriminator]){
      console.log("ta de");
      bot.lepel[message.author.discriminator] = {
        xp: 0,
        level: 1,
        tonext: 2,
      }
      fs.writeFile("./lepel.json", JSON.stringify(bot.lepel, null, 4), err=>{
        if(err) throw err;
      }); 
    }
    if(bot.lepel[message.author.discriminator]){
      var level = bot.lepel[message.author.discriminator].level;
      var xp = bot.lepel[message.author.discriminator].xp;
      var tonext = bot.lepel[message.author.discriminator].tonext;
      var ehehe = 665-level;
      xp = xp + 1;
      if(xp >= tonext){
        level = level + 1;
        tonext = tonext * 2;
        const embedding = new Discord.RichEmbed()
          .setTitle("Level Up!")
          .addField(message.author.username + " Just level up!", "Level " + level)
          .addField(ehehe + ' more', ':)')
          .setColor('#ff0000')
          message.channel.sendEmbed(embedding);
          message.channel.send(new Discord.Attachment('https://cdn.glitch.com/93134982-a743-425b-acb5-1d708081397b%2Ffanfare.mp3?v=1572512299480',  'fanfare.mp3'));
      }
      bot.lepel[message.author.discriminator] = {
        xp: xp,
        level: level,
        tonext: tonext,
      }
      fs.writeFile("./lepel.json", JSON.stringify(bot.lepel, null, 4), err=>{
        if(err) throw err;
      }); 
    }
    
  }

    switch(args[0]){
        case 'help':
            message.channel.sendMessage("ndak maok");
            break;
        
      case 'helep':
        const embedd = new Discord.RichEmbed()
                .setTitle('HUAHAHAHHAHAHAHAHAHA')
                .addField('p', 'buat putar musik satan')
                .addField('skip', 'ke lagu satan selanjutnya')
                .addField('stop', '...')
                .addField('whoami', 'kalo kau amnesia pake koman ini')
                // .addFiel/d('daftar', 'masukin stim aidi')
                .addField('doto', 'buat liat profil doto')
                .addField('dota', 'buat liat 5 match terakhir doto')
                .addField('kick', 'yang pake koman ini satan')
                .addField('lepel', 'liat lepel cupu kau')
                message.channel.sendEmbed(embedd);
        break;

        case 'whoami':
            const embed = new Discord.RichEmbed()
            .setThumbnail(message.author.avatarURL)
            .setTitle('Who are you?')
            .addField('Username', message.author.username)
            .addField('ID', '#' + message.author.discriminator);
            message.channel.sendEmbed(embed);
            break;
        
        case 'kick':
            if(!args[1]) {
              message.channel.send('mo kik siape kau satan');
            }

            const user = message.mentions.users.first();
            // console.log(message.member.guild.member(user))
            if(user){
                const member = message.mentions.members.first();;
                if(member){
                    member.kick()
                    .then(() => console.log(`Kicked ${member.displayName}`))
                    .catch(function(e){
                      if(e.code == 50013){
                          message.channel.send("Tak berani kick <@" + member.id+">");
                      }
                    });
                }
              else{
                message.reply("ta de orangnya?");
              }
            }
            break;
        //
        //  case 'wew':
        // message.channel.send(prefix+"wew");
        // break;

        case 'daftar':
                if(!args[1]){
                    message.reply("steam id kau ape");
                    return;
                }
                const masokkan = message.content.substring(8);

                bot.steamid[message.author.discriminator] = {
                    message: masokkan
                  }
                fs.writeFile("./steamid.json", JSON.stringify(bot.steamid, null, 4), err=>{
                    if(err) throw err;
                    message.channel.send("steam dimasokkan");
                });

                message.reply(message.content.substring(7));
            break;

        case 'steamid':
            message.channel.send("Steam ID kau " + bot.steamid[message.author.discriminator].message);
            break;

        case 'doto':
            const profile = "https://api.opendota.com/api/players/" + bot.steamid[message.author.discriminator].message;
            const snekfetch = require("snekfetch");
            snekfetch.get(profile).then(r => {
                let body = r.body.profile.avatarmedium;
                console.log(body);
                const embed = new Discord.RichEmbed()
                .setThumbnail(r.body.profile.avatarmedium)
                .setTitle('DOTO')
                .addField('Username', r.body.profile.personaname)
                .addField("MMR-estimate : ", r.body.mmr_estimate.estimate)
                message.channel.sendEmbed(embed);
            });
            break;
        
      case 'dota':
         let dota = require("./dota/main.js");
          dota.dota(message,prefix);
        // message.reply('doto boso');
        break;
        
      case 'lepel':
        var ehehe = 666 - bot.lepel[message.author.discriminator].level;
         const eembed = new Discord.RichEmbed()
            .setThumbnail(message.author.avatarURL)
            .setTitle(message.author.username)
            .addField('Level', bot.lepel[message.author.discriminator].level)
            .addField('Xp', bot.lepel[message.author.discriminator].xp)
            message.channel.sendEmbed(eembed);
        break;

        case 'p':
            function play(connection, message){
              var server = servers[message.guild.id];
             
              const embed = new Discord.RichEmbed()
              .setColor('#48FF48')
              .setThumbnail(server.queue[0].thumbnails)
              .setTitle('Now Playing')
              .setDescription("["+server.queue[0].title+"]("+server.queue[0].link+")")

              message.channel.send(embed);
            
              
              console.log(server.queue[0].title)
              
              const stream = ytdl(server.queue[0].id, {filter: "audioonly"
                // ,
                // requestOptions: {
                //   transform: (parsed) => {
                //     return {
                //       host: '150.66.2.146',
                //       port: 80,
                //       path: parsed.href,
                //       headers: { Host: parsed.host },
                //     };
                //   },
                // }
              });
              
                server.dispatcher = connection.playStream(stream);

              
                server.dispatcher.on('error', console.error);
              
                server.dispatcher.on("end", function(){
                    server.queue.shift();
                    if(server.queue[0]){
                        play(connection, message);
                    }
                    else{
                        connection.disconnect();
                        message.channel.send('Lagunya da habis... jiji');

                    }
                })
            }

            if(!args[1]){
                message.reply("Play sesuatu boso");
                return;
                break;
            }
            if(!message.member.voiceChannel){
                message.reply("Masok voice channel lo boso");
                return;
            }
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

              var idYoutube = getYouTubeID(args[1])
              if(idYoutube!=null){
                
                 youTube.getById(idYoutube, function(error, result) {
                  if (!error) {
                    
                    function addQueue(){
                      try{
                        var embedQueue = new Discord.RichEmbed();
                        
                          const qArgs = {
                            title:result.items[0].snippet.title,
                            id:result.items[0].id,
                            link:'https://www.youtube.com/watch?v='+result.items[0].id,
                            duration:'',
                            thumbnails:result.items[0].snippet.thumbnails.high.url
                          }
                          
                          embedQueue.setTitle("Queue Added")
                              .setDescription("["+qArgs.title+"]("+qArgs.link+")")
                          message.channel.send(embedQueue);
                          
                          server.queue.push(qArgs);
                           if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                            play(connection, message);
                          })
                      
                        }catch(e){
                          message.channel.send('Videonya tak ade bodo');

                        }
                    }
                    
                    var regionlib = require('./library/regioncheck.js');
                    
                    var regionBlocked = regionlib.check(result.items[0].contentDetails, "US");
                   
                    if(regionBlocked){
                      addQueue();
                    }else{
                      message.channel.send('Videonye tak tersedia bodo');
                    }
                  }
                });
              
                
                 
              }else{
                var ytArgs = {
                  order:['relevance','rating'],
                  type:'video',
                  regionCode:'US'
                }
                
                // ytSearch.search(args[1],function(body){
                //   console.log(body);
                // });
                var query = message.content.substring(3);
                 youTube.search(query, 1, ytArgs, function(error, result) {
                  if (error) {
                    console.log(error);
                  }
                  else {
                    console.log("Title : "+result.items[0].snippet.title)
                    console.log(result.items[0])
                    var embedQueue = new Discord.RichEmbed();
                    
                     const qArgs = {
                      title:result.items[0].snippet.title,
                      id:result.items[0].id.videoId,
                      link:'https://www.youtube.com/watch?v='+result.items[0].id.videoId,
                      duration:'',
                      thumbnails:result.items[0].snippet.thumbnails.high.url
                    }
                     
                    embedQueue.setTitle("Queue Added")
                              .setDescription("["+qArgs.title+"]("+qArgs.link+")")
                    message.channel.send(embedQueue);
                    
                    server.queue.push(qArgs);
                    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                      play(connection, message);
                    })
                    // console.log(JSON.stringify(result, null, 2));
                  }
                });
              }
            break;

        case 'skip':
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
            break;
        
         case 'queue':
                var server = servers[message.guild.id];
                var queue;
                try{
                  queue = server.queue;
                }catch(e){
                  queue=null;
                }
                if(queue!=null){
                  if(queue.length!=0){
                    var embeds = new Discord.RichEmbed().setTitle("List Lagu");

                    for (i = 0; i < queue.length; i++) {
                      var no = i+1;
                      embeds.addField(no+". "+queue[i].title,queue[0].link)
                    }
                    message.channel.send(embeds);
                  }else{
                    message.channel.send("Tak de lagu boso");
                  }
                }else{
                  message.channel.send("Tak de lagu boso");
                }
                break;

        case 'stop':
                var server = servers[message.guild.id];
                if(message.guild.voiceConnection){
                    for(var i = server.queue.length -1; i>=0; i--){
                        server.queue.splice(i, 1);
                    }
                    server.dispatcher.end();
                    message.channel.sendMessage("Ee... nape kau stop");
                }
                if(message.guild.connection) message.guild.voiceConnection.disconnect();
                break;
        
        case 'bersih':
          if(message.author.discriminator == "4746" || message.author.discriminator == "6673"){
            message.channel.bulkDelete(args[1]);
          }
          else{
            message.channel.send("kau ta punye hak");
          }
          
        
       case 'daftaru':
        
       break;
       
    }
  
  
})
