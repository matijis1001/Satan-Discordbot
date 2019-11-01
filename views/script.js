

$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
  
  
  
  var terbuka = false;
  
  // $(".login").css("bottom",-$(".logindiv").height);
  
   // $.post("/login",
   //  {
   //    pass: $.cookie('pass')
   //  },
   //  function(data,status){
   //   if(data=="true"){
   //     $('.logindiv').html("<button>Open</button>")
   //   }
   //  });
  
  console.log($.cookie("pass"))
  if($.cookie("pass")!=null){
    $(".logindiv").html("<a class='button' href='/admin'>Open</a>");
    // $(".logindiv").html("<a class='button' href='/admin'>Open</a>");
     // $(".logindiv").animate({
     //      opacity:0,
     //      height:35
     // },300,function(){
     //    $(".logindiv").html("<a class='button' href='/admin'>Open</a>");
     //     $(".logindiv").animate({
     //        opacity:100
     //     },300);
     //    $(".login").animate({
     //      bottom:-$(".logindiv").height()
     //    },300);
     // });
  }
  
 
  
  // $('.login').css("bottom",-$(".logindiv").height())
  
  $(".loginhead").click(function(){
      if(!terbuka){
        terbuka=true;
        $(".login").animate({
          bottom:$(".logindiv").height()
        },300);
      }else{
        terbuka=false;
        $(".login").animate({
          bottom:0
        },300);
      }
  });
  
  
  $(".loginbutton").click(function(){
    $(".loginbutton").css("display", "none");
    $(".loader").css("display", "block");
    checklogin();

  });
  
  $(".logininput").keydown(function(e) {
    var key = e.which;
    if (key == 13) {
      checklogin();
    }
  });
  
  
function checklogin(){
    var password = $(".logininput").val();
    $.post("/login",
    {
      pass: password
    },
    function(data,status){
    
       if(data=="true"){
        //  $.get( "https://zakkushu-discordbot.glitch.me/admin.html", function( data ) {
        //    $('html').html(data);
        // });
         window.location.href = "https://zakkushu-discordbot.glitch.me/admin";
         $.cookie('pass', password, { expires: 3000 });
       }else{
         $(".loginbutton").css("display", "block");
         $(".loader").css("display", "none");
         alert("Password salah!");
       }
   });
}
  
  
  
  
  
  
  
});