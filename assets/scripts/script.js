
let foreCastContainer = $(".foreCastContainer");

let searchedCitiesContainer = $(".searchedCitiesContainer");
let searchedCitiesList = $(".searchedCitiesList");

let searchButton = $(".searchButton");
let clearButton = $(".clearButton");

let citiesArray = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];

init();

function init() {
    generateCityList();
}

$(function () {
    $("#majorCities").autocomplete({
        source: citiesArray
    });
});

function pressEnter(event) {
    if (event.key == "Enter") {
        findCurrentWeatherInfo();
        $(".cityInput").val("");     
    }
}

$(searchButton).click(function () {
    findCurrentWeatherInfo();
    $(".cityInput").val("");
});

$(clearButton).click(function () {
    localStorage.clear();
    $(searchedCitiesList).empty();
})


async function findCurrentWeatherInfo() {
    let cityInput = $(".cityInput").val();
    let requestCityWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&appid=2f86475148abed664b43332f701d4d90";
    let response = await fetch(requestCityWeather);
    if (response.status !== 200) {
        alert("No city found.")
    }
    let weatherData = await response.json();

    generateTodayForecast(weatherData);
    generateFiveForecasts(weatherData);
}


function generateTodayForecast(weatherData) {
    $(".cityWeatherInfo").empty();
    let currentCity = weatherData.city.name;
    let currentTime = dayjs.unix(weatherData.list[0].dt).format('(dddd, MMMM DD, YYYY)');
    let currentIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherData.list[0].weather[0].icon + "@2x.png");
    let cityTimeDisplay = $("<h2>").text(currentCity + " " + currentTime).append(currentIcon);
    $(cityTimeDisplay).addClass("cityTimeDisplay");

    let currentTemp = $("<h3>").text("Temp: " + weatherData.list[0].main.temp + " \u2109");
    let currentWind = $("<h3>").text("Wind: " + weatherData.list[0].wind.speed + " MPH");
    let currentHumidity = $("<h3>").text("Humidity: " + weatherData.list[0].main.humidity + "%");
    $(".cityWeatherInfo").append(cityTimeDisplay, currentTemp, currentWind, currentHumidity);

    storeSearchedCities(weatherData);
}

function generateFiveForecasts(weatherData) {
    $(foreCastContainer).empty();
    for (var i = 7; i < weatherData.list.length; i += 8) {
        let eachTime = dayjs.unix(weatherData.list[i].dt).format('(ddd M/D/YY)');
        let eachIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherData.list[i].weather[0].icon + "@2x.png");
        let eachTimeDisplay = $("<h3>").text(eachTime).append(eachIcon);
        let eachCast = $("<div>").addClass("eachDailyCast");
        let eachTemp = $("<p>").text("Temp: " + weatherData.list[i].main.temp + " \u2109");
        let eachWind = $("<p>").text("Wind: " + weatherData.list[i].wind.speed + " MPH");
        let eachHumid = $("<p>").text("Humidity: " + weatherData.list[i].main.humidity + "%");
        $(foreCastContainer).append(eachCast.append(eachTimeDisplay, eachTemp, eachWind, eachHumid));
    }
}

var storedCitiesArray = [];

function storeSearchedCities(weatherData) {
    let storedCity = weatherData.city.name;
    storedCitiesArray.push(storedCity);
    localStorage.setItem("storedCities", JSON.stringify(storedCitiesArray));

    let storedLat = weatherData.city.coord.lat;
    let storedLon = weatherData.city.coord.lon;
    let keyLatLon = `${storedLat}&${storedLon}`;
    localStorage.setItem(storedCity, keyLatLon);

    generateCityList();
}

function generateCityList() {
    $(searchedCitiesList).empty();

    let retrievedCitiesArray = JSON.parse(localStorage.getItem("storedCities"));
    if (retrievedCitiesArray === null) {
        return;
    } else {
        function filterDuplicates(value, index, self) {
            return self.indexOf(value) === index;
        }
        let filteredCitiesArray = retrievedCitiesArray.filter(filterDuplicates);

        for (var i = 0; i < filteredCitiesArray.length; i++) {
            let eachListedCity = $("<li>").text(filteredCitiesArray[i]);
            eachListedCity.addClass("listedCity");
            $(searchedCitiesList).append(eachListedCity);
        }
    }
}

$(searchedCitiesList).on("click", ".listedCity", function () {
    let cityInput = $(this).text();
    let retrievedCoord = localStorage.getItem(cityInput);
    renewCurrentWeatherInfo(retrievedCoord);
})

async function renewCurrentWeatherInfo(retrievedCoord) {
    let retrievedLat = retrievedCoord.split("&")[0];
    let retrievedLon = retrievedCoord.split("&")[1];
    let requestCityWeather = "https://api.openweathermap.org/data/2.5/forecast?lat=" + retrievedLat + "&lon=" + retrievedLon + "&units=imperial&appid=2f86475148abed664b43332f701d4d90";
    let response = await fetch(requestCityWeather);
    if (response.status !== 200) {
        alert("No city found.")
    }
    let weatherData = await response.json();

    generateTodayForecast(weatherData);
    generateFiveForecasts(weatherData);
}
