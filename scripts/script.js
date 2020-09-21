  // var dateEl = document.querySelector("#showDate");
  var currentDate = moment().format("dddd, MMMM Do" );
  $("#currentDay").text(currentDate);
  var forecastDay1 = moment().add(1, 'd').format("dddd, MMMM Do" );
  var forecastDay2 = moment().add(2, 'd').format("dddd, MMMM Do" );
  var forecastDay3 = moment().add(3, 'd').format("dddd, MMMM Do" );
  var forecastDay4 = moment().add(4, 'd').format("dddd, MMMM Do" );
  var forecastDay5 = moment().add(5, 'd').format("dddd, MMMM Do" );


  //get weather data using openweathermap API 
  var apiKey = "f0ffaacec07f68a395b5f151f257622e"
  var zip = '';
  let longitude;
  let latitude;

  $('body').on('submit', '.weather', function(e) {
  e.preventDefault();
   var zip = $( "input[type=text]" ).val() + ",us";
   var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" +  zip + "&q=" + zip + "&appid=" + apiKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    //grab lat/lon for the next API call
    longitude = (response.coord.lon);
    latitude = (response.coord.lat);
    //inject the current weather data into the page 
    $(".city").text("City: " + response.name);
    $(".wind").text("Wind: " + response.wind.speed + " mph");
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    $(".temp").text("Temperature: " + Math.floor((response.main.temp - 273.15) * 9/5 + 32) + "\xB0");

  //grab the current UV data
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey,
    method: "GET"
  }).then(function(response) {
       
    $(".uv-index").text("UV Index: " + response.value);

    //sort the UV index and color code the text background accordingly
    if (response.value < 3) {
        $(".uv-index").addClass("mild");
        $(".uv-index").removeClass("moderate");
        $(".uv-index").removeClass("severe");
    }
    if (response.value > 3 && response.value < 7) {
        $(".uv-index").addClass("moderate");
        $(".uv-index").removeClass("mild");
        $(".uv-index").removeClass("severe");
    }
    if (response.value > 7) {
        $(".uv-index").addClass("severe");
        $(".uv-index").removeClass("moderate");
        $(".uv-index").removeClass("mild");
    }
    
    //make the last API call for our 5 day forecast
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly" + "&appid=" + apiKey,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        //add next 5 dates to the forecast h3
        $("#day-1").text(forecastDay1);
        $("#day-2").text(forecastDay2);
        $("#day-3").text(forecastDay3);
        $("#day-4").text(forecastDay4);
        $("#day-5").text(forecastDay5);

        //grab the high/low temp for the next 5 days as well as the weather icon associated with each day
        for (i = 1; i < 6; i++) {
            $(".high-" + i).text("High: " + Math.floor((response.daily[i].temp.max - 273.15) * 9/5 + 32) + "\xB0");
            $(".low-" + i).text("Low: " + Math.floor((response.daily[i].temp.min - 273.15) * 9/5 + 32) + "\xB0");
            $(".icon-" + i).attr("src", "https://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png");
            $(".icon-" + i).removeClass("hide");
            $(".days").removeClass("hide");
            $("#current-icon").attr("src", "https://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png");
            $("#current-icon").removeClass("hide");
            $(".5day").removeClass("hide");
            $(".current-weather").removeClass("hide");
            }           
});
});  
});
})