async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const weatherWidget = document.getElementById('weatherWidget');
  weatherWidget.style.display = 'none';


  // 👉 Tasks 1 - 5 go here
  const cityDropdown = document.getElementById('cityDropdown');
  const infoParagraph = document.querySelector('p.info');

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  cityDropdown.addEventListener('change', (event) => {
    const selectedCity = event.target.value;
    console.log(`Selected city: ${selectedCity}`);

    cityDropdown.disabled = true;
    weatherWidget.style.display = 'none';
    infoParagraph.textContent = 'Fetching weather data...';

    fetchWeatherData(selectedCity);
  });

  function fetchWeatherData(city) {
    const apiUrl = `http://localhost:3003/api/weather?city=${encodeURIComponent(city)}`;

    axios.get(apiUrl)
      .then((res) => {
        console.log(res.data);
        handleWeatherDataSuccess(res.data);
      })
      .catch((error) => {
        console.error(error.message);
        infoParagraph.textContent = 'Error fetching weather data. Please try again.';
        cityDropdown.disabled = false;
      });
  }

  function handleWeatherDataSuccess(data) {
    const infoParagraph = document.querySelector('p.info');
    infoParagraph.textContent = '';
    cityDropdown.disabled = false;
    weatherWidget.style.display = 'block';

    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const date = document.getElementById('date');

    cityName.textContent = data.city;
    temperature.textContent = `${data.temperature}°C`;

    const descriptionEmoji = descriptions.find(desc => desc[0] === data.weather_description)[1];
    description.textContent = `${data.weather_description} ${descriptionEmoji}`;

    const dayOfWeek = new Date(data.date).toLocaleString('en-US', { weekday: 'long' });
    date.textContent = dayOfWeek;
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
