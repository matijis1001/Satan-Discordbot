const jarakwaktu = require('./jarakwaktu.js')
const BigNumber = require("big-number");
const fs = require("fs");
var timestamp = require("unix-timestamp");
const sqlite3 = require("sqlite3").verbose();
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
var $ = (jQuery = require("jquery")(window));




module.exports = {
	dota: function (message,prefix) {
    var chat = message.content;
    console.log(chat);
		var command = chat.split(" ");
		if (command.length > 2|| command.length <2) {
			message.channel.send("pake "+prefix+"dota spasi nama woi!");
		} else {
			var name = command[1];
			let db = new sqlite3.Database(__dirname + '/dotadatabase.db', sqlite3.OPEN_READWRITE, (err) => {
				if (err) {
          message.channel.send(err.message);
					return console.error(err.message);
				}
				db.all(`SELECT * FROM steam WHERE LOWER(line) =?`, [name], function (err, rows) {
					if (err) {
            return message.channel.send(err.message);

					}
          console.log(rows);
					if (rows.length > 0) {
						rows.forEach((row) => {
							var steamid32 = BigNumber(row.steamid).minus('76561197960265728')
              console.log("wew" + steamid32);
							var request = require('request');
							var heroid = new Array;
							var matchid = new Array;
							var heroname = new Array;
							var medalpic,starpic;
							var kill = new Array;
							var death = new Array;
							var herolink = new Array;
							var assist = new Array;
							var time = new Array;
							var durasi = new Array;
							var slot = new Array;
							var radiantmenang = new Array;
							var winlose = new Array;
							var i, j, aw;
							var x = 0;
              
							let db = new sqlite3.Database(__dirname + '/dotadatabase.db', sqlite3.OPEN_READWRITE, (err) => {
								if (err) {
								  return message.channel.send(err.message);
								}
								console.log("wew" + steamid32);
								$.get("https://api.opendota.com/api/players/" + steamid32, function (data) {
                  var profile = data.profile;
                  try{
                   var nama = profile.personaname;
                  }catch(e){
                    return message.channel.send("Data tak ade ato Akun tak public woi");
                  }
									var medalnumber = data.rank_tier;
									var pic = profile.avatarmedium;
                    try{
                    var medal = medalnumber.toString();
                    var medalid = medal.substring(0,1);
                    var starid = medal.substring(1,2);
                    }catch(e){ 
                    }
									
									$.get("https://api.opendota.com/api/players/" + steamid32 + "/recentMatches", function (data) {
										for (i = 0; i < 5; i++) {
											heroid[i] = data[i].hero_id;
											matchid[i] = data[i].match_id;
											kill[i] = data[i].kills;
											death[i] = data[i].deaths;
											assist[i] = data[i].assists;
											slot[i] = data[i].player_slot;
											time[i] = data[i].start_time;
											durasi[i] = data[i].duration;
											radiantmenang[i] = data[i].radiant_win;
										}
										for (aw = 0; aw < 5; aw++) {
											if (slot[aw] < 6) {
												if (radiantmenang[aw] == true) {
													winlose[aw] = "Win";
												} else {
													winlose[aw] = "Lose";
												}
											} else {
												if (radiantmenang[aw] == true) {
													winlose[aw] = "Lose";
												} else {
													winlose[aw] = "Win";
												}
											}
										}

										function check() {
											x = x + 1;
											if (x == 5) {
												x = 0;
												gambar();
											}
										}

										function sial(a) {
											db.all(`SELECT * FROM hero WHERE heroid=?`, [heroid[a]], function (err, rows) {
												if (err) {}
												console.log(rows);
												heroname[a] = rows[0].heroname;
												herolink[a] = rows[0].herolink;
												check();
											});
										}
										

										function getmedallink() {
											db.all(`SELECT * FROM medal WHERE id=?`, [medalid], function (err, rows) {
												if (err) {}
												medalpic = rows[0].url;
												
											});
											db.all(`SELECT * FROM star WHERE id=?`, [starid], function (err, rows) {
												if (err) {}
												starpic = rows[0].url;
											
											});
										}
                    if(medal!=null){
                      getmedallink();
                    }
										for (j = 0; j < heroid.length; j++) {
											console.log(j);
											sial(j);
											if (j == 4) {
												console.log("Ini hero : ");
											}
										}

										function gambar() {
											var Canvas = require('canvas'),
												Image = Canvas.Image,
												canvas = new Canvas(300, 376),
												ctx = canvas.getContext('2d');
											var d = new Date();
											var n = d.getDay().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString();
											var x = 56;
											var y = 96;
											var t = 70;
											var w;

											function waktu(a, b) {
												var w1 = timestamp.toDate(a);
												w1 = new Date(w1.getTime() + 1000 * b);
												var m = w1.getMonth() + 1;

												function format(a) {
													var b = ("0" + a).slice(-2);
													return b;
												}
												var jarak = jarakwaktu.jarakwaktu(w1);
												w = jarak + " ago";
												return w.toString();
											}
											ctx.beginPath();
											ctx.fillStyle = "#2c3e50";
											ctx.rect(0, 0, 300, 280 + y);
											ctx.fill();
											ctx.beginPath();
											ctx.rect(0, 70, 300, 26);
											ctx.fillStyle = "#1f2c38";
											ctx.fill();
											ctx.beginPath();
											ctx.rect(0, 0 * x + y, 300, 56);
											ctx.fillStyle = "#37495b";
											ctx.fill();
											ctx.beginPath();
											ctx.rect(0, 2 * x + y, 300, 56);
											ctx.fillStyle = "#37495b";
											ctx.fill();
											ctx.beginPath();
											ctx.rect(0, 4 * x + y, 300, 56);
											ctx.fillStyle = "#37495b";
											ctx.fill();
											ctx.fillStyle = "#ffffff";
											ctx.font = "10px Arial";
											ctx.font = "10px Arial";
											ctx.textAlign = "right";
											ctx.fillText(waktu(time[0], durasi[0]), 290, 78 + t);
											ctx.fillText(waktu(time[1], durasi[1]), 290, x + 78 + t);
											ctx.fillText(waktu(time[2], durasi[2]), 290, 2 * x + 78 + t);
											ctx.fillText(waktu(time[3], durasi[3]), 290, 3 * x + 78 + t);
											ctx.fillText(waktu(time[4], durasi[4]), 290, 4 * x + 78 + t);
											ctx.textAlign = "start";
											ctx.font = "30px Arial";
											ctx.fillText(nama, 70, 63);
											ctx.font = "18px Arial";
											ctx.fillText("Hero", 15, 20 + t);
											ctx.fillText("K", 104, 20 + t);
											ctx.fillText(kill[0], 104, x + t);
											ctx.fillText(kill[1], 104, x * 2 + t);
											ctx.fillText(kill[2], 104, x * 3 + t);
											ctx.fillText(kill[3], 104, x * 4 + t);
											ctx.fillText(kill[4], 104, x * 5 + t);
											ctx.fillText("D", 154, 20 + t);
											ctx.fillText(death[0], 154, x + t);
											ctx.fillText(death[1], 154, x * 2 + t);
											ctx.fillText(death[2], 154, x * 3 + t);
											ctx.fillText(death[3], 154, x * 4 + t);
											ctx.fillText(death[4], 154, x * 5 + t);
											ctx.fillText("A", 204, 20 + t);
											ctx.fillText(assist[0], 204, x + t);
											ctx.fillText(assist[1], 204, x * 2 + t);
											ctx.fillText(assist[2], 204, x * 3 + t);
											ctx.fillText(assist[3], 204, x * 4 + t);
											ctx.fillText(assist[4], 204, x * 5 + t);
											var z;

											function warna(a) {
												if (a == "Win") {
													z = "#66bb5c";
												} else {
													z = "#f24c48";
												}
												return z;
											}

											function huruf(a) {
												if (a == "Win") {
													z = "W";
												} else {
													z = "L";
												}
												return z;
											}
											ctx.fillText("W/L", 248, 20 + t);
											ctx.fillStyle = warna(winlose[0]);
											ctx.fillText(huruf(winlose[0]), 254, x + t);
											ctx.fillStyle = warna(winlose[1]);
											ctx.fillText(huruf(winlose[1]), 254, x * 2 + t);
											ctx.fillStyle = warna(winlose[2]);
											ctx.fillText(huruf(winlose[2]), 254, x * 3 + t);
											ctx.fillStyle = warna(winlose[3]);
											ctx.fillText(huruf(winlose[3]), 254, x * 4 + t);
											ctx.fillStyle = warna(winlose[4]);
											ctx.fillText(huruf(winlose[4]), 254, x * 5 + t);
											/////////////// AMBIL GAMBAR HERO //////////////////////////
											var request = require('request').defaults({
												encoding: null
											});
											var hero = new Array;
											var pics, medalpics, starpics;
											request.get(medalpic, function sial(err, res, body) {
												medalpics = body;
												request.get(starpic, function sial(err, res, body) {
													starpics = body;
													request.get(pic, function sial(err, res, body) {
														pics = body;
														request.get(herolink[0], function sial(err, res, body) {
															hero[0] = body;
															request.get(herolink[1], function sial(err, res, body) {
																hero[1] = body;
																request.get(herolink[2], function sial(err, res, body) {
																	hero[2] = body;
																	request.get(herolink[3], function sial(err, res, body) {
																		hero[3] = body;
																		request.get(herolink[4], function sial(err, res, body) {
																			hero[4] = body;
																			var profpic = new Image;
																			profpic.onload = function () {
																				ctx.drawImage(profpic, 7, 7, 56, 56);
																			}
																			profpic.src = pics;

																			var medalpicss = new Image;
																			medalpicss.onload = function () {
																				ctx.drawImage(medalpicss, 237, 7, 56, 56);
																			}
																			medalpicss.src = medalpics;

																			var starpicss = new Image;
																			starpicss.onload = function () {
																				ctx.drawImage(starpicss, 237, 7, 56, 56);
																			}
																			starpicss.src = starpics;

																			var hero1 = new Image;
																			hero1.onload = function () {
																				ctx.drawImage(hero1, 10, 10 + y, 64, 36);
																			}
																			hero1.src = hero[0];
																			var hero2 = new Image;
																			hero2.onload = function () {
																				ctx.drawImage(hero2, 10, 10 + 56 + y, 64, 36);
																			};
																			hero2.onerror = function (err) {
																				console.log(err);
																			};
																			hero2.src = hero[1];
																			var hero3 = new Image();
																			hero3.onload = function () {
																				ctx.drawImage(hero3, 10, 10 + 2 * 56 + y, 64, 36);
																			}
																			hero3.src = hero[2];
																			var hero4 = new Image();
																			hero4.onload = function () {
																				ctx.drawImage(hero4, 10, 10 + 3 * 56 + y, 64, 36);
																			}
																			hero4.src = hero[3];
																			var hero5 = new Image();
																			hero5.onload = function () {
																				ctx.drawImage(hero5, 10, 10 + 4 * 56 + y, 64, 36);
																			}
																			hero5.src = hero[4];
																			var dataURL = canvas.toDataURL();
																			var base64Data = dataURL.replace(/^data:image\/png;base64,/, "");
																			fs.writeFile("./img/" + n + ".png", base64Data, 'base64', function (err) {
																				if (err) {
																					console.log(err);
																				} else {
                                            message.channel.send("Nah bodo", 
                                            {
                                              files: [
                                               "./img/"+n+".png"
                                              ]
                                            });
                                        }
																			});
																		})
																	})
																})
															})
														})
													})
												})
											})
											///  
											var zz = "https://zakkushu-discordbot.glitch.me/img/" + n + ".png";
											console.log(zz);
                      
                      // message.channel.send("Nah bodo", {
                      // });
                      
											/////////////// AMBIL GAMBAR HERO //////////////////////////
										}
										console.log('Connect ke db coi hehehe');
									});
								});
							});
						});
					}
				});
			});
		}

	}

};