// Store your OpenWeatherMap API key.
let weatherApiKey = "";

// Find the HTML element where we display the weather data.
const weatherData = document.querySelector("#weatherdata");

// Run this function when the user clicks the "Fetch data" button.
document.querySelector("#fetchWeather").addEventListener("click", async () => {
  weatherData.textContent = "Loading weather data...";

  // Ask for the API key only if it has not been entered yet.
  if (!weatherApiKey) {
    weatherApiKey = prompt("Enter your OpenWeatherMap API key:")?.trim() || "";
  }

  if (!weatherApiKey) {
    weatherData.textContent = "An API key is required.";
    return;
  }

  // Request Helsinki weather data in XML format.
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Helsinki&units=metric&mode=xml&appid=${encodeURIComponent(weatherApiKey)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // Read the XML response as plain text.
    const xmlText = await response.text();

    // Convert the XML text into an XML document.
    const xmlDoc = new DOMParser().parseFromString(xmlText, "application/xml");

    // Find the temperature element and read its value attribute.
    const temperature = xmlDoc
      .querySelector("temperature")
      .getAttribute("value");
    // Read the humidity and cloud cover values from the XML.
    const humidity = xmlDoc.querySelector("humidity").getAttribute("value");
    const cloudCover = xmlDoc.querySelector("clouds").getAttribute("value");

    console.log("Temperature from XML:", temperature);
    console.log("Humidity from XML:", humidity);
    console.log("Cloud cover from XML:", cloudCover);
    // Display the raw XML in the weather information box.

    // Clear the raw XML and display the parsed weather information.
    weatherData.replaceChildren();

    const weatherInfo = [
      `Temperature: ${temperature} °C`,
      `Humidity: ${humidity}%`,
      `Cloud cover: ${cloudCover}%`,
    ];

    weatherInfo.forEach((info) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = info;
      weatherData.appendChild(paragraph);
    });
  } catch (error) {
    weatherData.textContent = `Error: ${error.message}`;
  }
});

// async allows us to use await inside the function.

// Display a loading message.

// Try to fetch and process the weather data.

// Send a GET request to the weather API and wait for the response.
// q=Helsinki selects the city.
// units=metric gives the temperature in Celsius.
// mode=xml requests the data in XML format.
// ${apiKey} inserts our API key into the URL.

// Check whether the API returned a successful HTTP status.

// Create an error and jump to the catch block.

// Read the response body as text and wait until it is ready.

// Display the XML as plain text on the page.

// Handle errors from the request or the code above.

// Choose an error message in the page's language.

// Display the message and details of the error.
