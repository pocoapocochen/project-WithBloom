var tempinfo, tempscale, random;

$(document).ready(function(){

  //event handler: detect the scroll behaviour and show the go to top btn
  $(window).scroll(function() {
    if($(this).scrollTop() >= 200) {
        $("#top").fadeIn();    
    } else {
        $("#top").fadeOut();
    }
  });

  //event handler: click the go to top btn and smooth scrolling
  $("#top").click(function(e) {
    e.preventDefault();
    $("html, body").animate({
      scrollTop: 0
    },500);
  });   

  //event handler: click the nav btn and smooth scrolling
  $('.smooth').click(function(e) {
    e.preventDefault();
    var sectionTo = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(sectionTo).offset().top
    }, 1000);
  });

  // show random pic
  random = Math.floor(Math.random() * 7) + 1;
  $("#todayFlower").attr("src","img/today/day"+ random +".png");

  //ready for detect geolocation 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
        
    var lat = "lat=" + position.coords.latitude;
    var lon = "lon=" + position.coords.longitude;

    getInfo(lat, lon);
      
    }); 

  } else {
    $("#locationinfo").html("Sorry, failed to detect location...").css("font-size", "1rem");
  }  //end if else

  // event handler: cover temp scale
  $("#tempscale").click(function(){
    tempConvert(tempinfo, tempscale);
  });
  
}); // end document ready


//getJSON and show infos
function getInfo (lat, lon) {
  var api = "https://fcc-weather-api.glitch.me/api/current?";  
  var url = api + lat + "&" + lon;
  
  // get current time
  var montharr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var month = montharr[new Date().getMonth()];
  var date = new Date().getDate();
  var weekdayarr = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  var weekday = weekdayarr[new Date().getDay()];
  // show current time
  $("#timeinfo").html(weekday + ", " + month + " " + date); 
  
  // convert original wearther icon to weather-icons
    function getWIcon(val){
      var wicon;
      var hour = new Date().getHours();
     switch (val) {
        case "Thunderstorm":
        wicon = "wi wi-thunderstorm";
        break;
        case "Drizzle":
        wicon = "wi wi-showers";
        break;
        case "Rain":
        wicon = "wi wi-rain";
        break;
        case "Snow":
        wicon = "wi wi-snow";
        break;
        case "Atmosphere":
        wicon = "wi wi-fog";
        break;
        case "Clear":
        wicon = "wi wi-day-sunny";
        break;
        case "Clouds":
        wicon = "wi wi-cloudy";
        break;
        default: 
        wicon = "wi wi-na";
       } // end switch 
        
        if (wicon == "wi wi-day-sunny" && ( hour <= 4 || hour >= 18 )) 
        {wicon = "wi wi-night-clear";} 
      
      return wicon; 
    } // end getWIcon()
  
  //get weather info
  $.getJSON(url, function(json){
                
    // get current weather, location, temp
    var icon, main, des, city, country, temp;
    main = json.weather[0].main;
    des = json.weather[0].description;
    city = json.name.toUpperCase();
    country = json.sys.country;
    temp = json.main.temp;
    
     // show current weather, location, temp
    $("#weatherwrap").attr("class", getWIcon(main));
    $("#weatherwrap").attr("title", des);
    $("#locationinfo").html(city + ", " + country);
    $("#tempinfo").html(Math.round(temp));
    $("#tempscale").html("&#xB0;C");
    
    // set temp value to global var
    tempinfo = Math.round(temp);
    tempscale = "&#xB0;C";
  
  });// end getJSON
} // end getInfo()


// temperature conversion
function tempConvert (info, scale) {
  if ( scale === "&#xB0;C") {
    info = Math.round(info*(9/5)+32);
    scale = "&#xB0;F";

  } else if ( scale === "&#xB0;F") {
    info = Math.round((info-32)*5/9);
    scale = "&#xB0;C";
  } // end if else
  
    tempinfo = info;
    tempscale = scale;
  
    $("#tempinfo").html(info);
    $("#tempscale").html(scale);
  
} //end tempConvert()