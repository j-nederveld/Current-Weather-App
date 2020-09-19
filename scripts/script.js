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
    // console.log(response);
    var avgTempDayOne = [];
    var avgTempDayTwo = [];
    var avgTempDayThree = [];
    var avgTempDayFour = [];
    var avgTempDayFive = [];

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey,
        method: "GET"
      }).then(function(response) {
          console.log(response);
        //loop through each day (day is 0-7, 8-15...to 39)
        for (i = 0; i < 8; i++) {        
            avgTempDayOne.push(response.list[i].main.temp);
        }
        for (i = 8; i < 16; i++) {        
            avgTempDayTwo.push(response.list[i].main.temp);
        }
        for (i = 16; i < 24; i++) {        
            avgTempDayThree.push(response.list[i].main.temp);
        }
        for (i = 24; i < 32; i++) {        
            avgTempDayFour.push(response.list[i].main.temp);
        }
        for (i = 32; i <= 39; i++) {        
            avgTempDayFive.push(response.list[i].main.temp);
        }
        //get the average temp in K for each day
        avgTempDayOne = avgTempDayOne.reduce((a, b) => a + b, 0)/8
        avgTempDayTwo = avgTempDayTwo.reduce((a, b) => a + b, 0)/8
        avgTempDayThree = avgTempDayThree.reduce((a, b) => a + b, 0)/8
        avgTempDayFour = avgTempDayFour.reduce((a, b) => a + b, 0)/8
        avgTempDayFive = avgTempDayFive.reduce((a, b) => a + b, 0)/8

        //convert K to Fahrenheit 
        avgTempDayOne = Math.floor((avgTempDayOne - 273.15) * 9/5 + 32);
        avgTempDayTwo = Math.floor((avgTempDayTwo - 273.15) * 9/5 + 32);
        avgTempDayThree = Math.floor((avgTempDayThree - 273.15) * 9/5 + 32);
        avgTempDayFour = Math.floor((avgTempDayFour - 273.15) * 9/5 + 32);
        avgTempDayFive = Math.floor((avgTempDayFive - 273.15) * 9/5 + 32);

        console.log("Day 1: " + avgTempDayOne);
        console.log("Day 2: " + avgTempDayTwo);
        console.log("Day 3: " + avgTempDayThree);
        console.log("Day 4: " + avgTempDayFour);
        console.log("Day 5: " + avgTempDayFive);
              
});
});  
});
})