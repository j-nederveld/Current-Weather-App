  // var dateEl = document.querySelector("#showDate");
  var currentDate = moment().format("dddd, MMMM Do" );
  $("#currentDay").text(currentDate);


  //get weather data using openweathermap API 
  var apiKey = "f0ffaacec07f68a395b5f151f257622e"
  var zip = '';
  let longitude;
  let latitude;

  $('body').on('submit', '.weather', function(e) {
  e.preventDefault();
   var zip = $( "input[type=text]" ).val() + ",us";
   var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&q=" + zip + "&appid=" + apiKey;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
     longitude = (response.coord.lon);
     latitude = (response.coord.lat);
        
  $(".city").text("City: " + response.name);
  $(".wind").text("Wind: " + response.wind.speed + " mph");
  $(".humidity").text("Humidity: " + response.main.humidity + "%");
  $(".temp").text("Temperature: " + Math.floor((response.main.temp - 273.15) * 9/5 + 32));

  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey,
    method: "GET"
  }).then(function(response) {
       console.log(response.value);
       $(".uv-index").text("UV Index: " + response.value);

    if (response.value < 3) {
        $(".uv-index").addClass("mild");
    }
    if (response.value > 3 && response.value < 7) {
        $(".uv-index").addClass("mild");
    }
    if (response.value > 7) {
        $(".uv-index").addClass("severe");
    }
    console.log(response);
});  
});
})