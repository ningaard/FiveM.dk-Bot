var tmi = require('tmi.js');
var con = require('./database');
const config = require("./config.json");


var options = {
  options: {
    debug: true
  },

  connection: {
    cluster: "aws",
    reconnect: true
  },

  identity: {
    username: config.twitch,
    password: config.oauth
  },
  channels: config.channel //Brug komma hvis der skal tiføjes flere
}

var channel = config.channel;


var client = new tmi.client(options);

client.connect();

client.on("connected", function(address, port){
  //Vi sender en besked så snart vi er tilsluttet kanalens chat.
  // client.action("lasseaab", "Godaften - Nu er jeg klar!");
});
//
// let commands = ["test"  "test2"];
//
//
// console.log(commands[0]);

client.on("chat", function(channel, user, message){

  con.connect(function(err) {
      con.query("SELECT * FROM commands WHERE active = 1", function (err, result, fields) {
        console.log(result);
        for (var i = 0; i < result.length; i++) {
          if (message == "!" + result[i]['command']) {
            client.say(channel, result[i]['answer'])
          }
        }
      });
    });

  if(message === "!discord"){
    client.say(channel, "Join min discord her: https://discord.gg/WUr2gsu")
  }

  if(message === "!donate"){
    client.say(channel, "Det er frivilligt at donere, og kan gøres her: https://twitch.streamlabs.com/lasseaab - Husk du skal være over 16 for at donere, og at donationer ikke kan trækkes tilbage.")
  }

  if(message === "!sele"){
    client.say(channel, "Oooops i did it again!");
  }

  if(message === "!alder"){
    client.say(channel, "Jeg er 20 år :)");
  }

});


//Event listener for at se om en bruger bliver bannet.
client.on("ban", function (channel, username, reason) {
    client.say(channel, "Brugeren: " + username + " - er blevet bannet.")
});

//Event listener for at se om en bruger bliver bannet.
client.on("timeout", function (channel, username, reason, time) {
    client.say(channel, "Brugeren " + username + " er blevet timeouted i " + time + " sekunder.")
});


// 'use strict'

const request = require('request')
const notifier = require('node-notifier');

const username = 'lasseaab'
const url = 'https://api.twitch.tv/kraken/channels/' + username + '/follows'

let lastFollower

// function getFollowers () {
//   return new Promise((resolve, reject) => {
//     request({ url, json: true }, (err, resp, body) => {
//       if (err) {
//         reject(err)
//       }
//
//       const followers = body.follows.map(follower => {
//         return { id: follower.user._id, name: follower.user.name }
//       })
//
//       resolve(followers)
//     })
//   })
// }

// function notifyNewFollower (name) {
//   console.log('Notifying about: ' + name)
//   notifier.notify({
//     title: 'New Follower',
//     message: name + ' is now following you'
//   })
// }
//
// setInterval(() => {
//   getFollowers()
//   .then(followers => {
//     if (!lastFollower) {
//       lastFollower = followers[0]
//       return
//     }
//
//     if (followers[0].id === lastFollower.id) {
//       console.log('No new followers')
//       return
//     }
//
//     console.log('Should have a new follower')
//
//     let newFollowers = []
//     for (let follower of followers) {
//       if (follower.id === lastFollower.id) {
//         break
//       }
//
//       newFollowers.push(follower)
//     }
//
//     newFollowers.forEach(follower => {
//       notifyNewFollower(follower.name)
//     })
//
//     lastFollower = followers[0]
//   })
//   .catch(err => {
//     console.error(err)
//   })
// }, 1000 * 1)
