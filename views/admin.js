var test = document.getElementById("test");

test.onclick = function(e) {
  $.ajax({
    method: "POST",
    url: "https://zakkushu-discordbot.glitch.me/test"
  }).done(function(res) {
    console.log(res); // masuk console di browser client
    // window.location.href = res
  });
};

$("#logout").click(function(){
   $.removeCookie('pass');
   window.location.href = "https://zakkushu-discordbot.glitch.me";
});