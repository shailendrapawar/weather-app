const apiKey = "24c03507748aff120a22e6ce3653c0e6";
let cityName = document.querySelector("#cityName")
let cityDesc = document.querySelector("#cityDesc")
let cityTemp = document.querySelector("#cityTemp")
let bottomCard = document.querySelector("#bottom-body")
let rightCenterCard = document.querySelector("#right-center-card")
let searchBtn = document.querySelector('#search-btn')

let toggleBody=document.querySelector("#toggleBody")



function formatDate(date) {
	let newDate = date.split("-")
	let finalDate = newDate[2];
	switch (newDate[1]) {
		case "01":
			return finalDate + "-jan";
			break;

		case "02":
			return finalDate + "-feb"
			break;

		case "03":
			return finalDate + "-mar"
			break;

		case "04":
			return finalDate + "-apr"
			break;

		case "05":
			return finalDate + "-may"
			break;

		case "06":
			return finalDate + "-jun";
			break;

		case "07":
			return finalDate + "-jul"
			break;

		case "08":
			return finalDate + "-aug"
			break;

		case "09":
			return finalDate + "-sep"
			break;

		case "10":
			return finalDate + "-oct"
			break;

		case "11":
			return finalDate + "-nov"
			break;

		case "12":
			return finalDate + "-dec"
			break;

	}
}


window.addEventListener("load", () => {
	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition((position) => {
			const lat = position.coords.latitude
			const long = position.coords.longitude

			let weather = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`)

			weather.then(res => {
				return res.json()
			}).then(data => {

				cityName.innerHTML = data.name
				cityTemp.innerHTML = Math.round(data.main.temp) + " °C"
				cityDesc.innerHTML = data.weather[0].description


				const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${data.name}&units=metric&days=7`;
				const options = {
					method: 'GET',
					headers: {
						'X-RapidAPI-Key': '3bd54973a0mshd4f4496d456703cp123660jsnc3f12322b690',
						'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
					}
				};

				const response = fetch(url, options);
				response.then(res => res.json()).then(data => {


					// console.log(data)
					let forcast = data.forecast.forecastday
					let finaldata = forcast.map((v, i, arr) => {

						let finalDate = formatDate(v.date)
						let temp = Math.round(v.day.avgtemp_c)
						let src = v.day.condition.icon

						return `
			<div class="center-card">
                    <span>${finalDate}</span>
                    <img src=${src}>
                    <span>${temp}°C</span>
                </div>
			`
					})

					rightCenterCard.innerHTML = finaldata

					let cardData = data.forecast.forecastday[0].hour

					function formatTime(time) {
						let time1 = time
						let final = time1[1].slice(0, 2)

						if (final > 12) {

							return final % 12 + " PM"
						}
						else {
							return final + " AM"
						}

					}

					let finalCardData = cardData.map((v) => {

						let src = v.condition.icon
						let chance = v.chance_of_rain
						let temp = Math.round(v.temp_c)
						let time = formatTime(v.time.split(" "))

						return `
			                <div class="bottom-card">
			                 <span>${time}</span>
			                 <span><img src=${src}><b>${chance}%</b></span>
			                 <span>${temp} °C</span>
		                    </div>
							
							`
					})
					bottomCard.innerHTML = finalCardData
				})

			})

		})

	}
	else {
		alert("navigator not supported by browser..!!")
	}
})


searchBtn.addEventListener("click", () => {

	let inputCity = document.querySelector('#input').value

	if (inputCity == "") {
		alert("city name not entered")
	}

	let p1 = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${apiKey}`);
	p1.then(res => res.json()).then(data => {
		cityName.innerHTML = data.name
		cityTemp.innerHTML = Math.round(data.main.temp) + " °C"
		cityDesc.innerHTML = data.weather[0].description
	}).catch(error => {
		alert(new Error("city not found"))
	})

	const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${inputCity}&units=metric&days=7`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '3bd54973a0mshd4f4496d456703cp123660jsnc3f12322b690',
			'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
		}
	};



	const response = fetch(url, options);
	response.then(res => res.json()).then(data => {

		let forcast = data.forecast.forecastday
		let finaldata = forcast.map((v, i, arr) => {

			let finalDate = formatDate(v.date)
			let temp = Math.round(v.day.avgtemp_c)
			let src = v.day.condition.icon

			return `
			<div class="center-card">
                    <span>${finalDate}</span>
                    <img src=${src}>
                    <span>${temp}°C</span>
                </div>
			`
		})

		rightCenterCard.innerHTML = finaldata

		let cardData = data.forecast.forecastday[0].hour

		function formatTime(time) {
			let time1 = time
			let final = time1[1].slice(0, 2)

			if (final > 12) {

				return final % 12 + " PM"
			}
			else {
				return final + " AM"
			}

		}

		let finalCardData = cardData.map((v) => {

			let src = v.condition.icon
			let chance = v.chance_of_rain
			let temp = Math.round(v.temp_c)
			let time = formatTime(v.time.split(" "))

			return `
			<div class="bottom-card">
		    	<span>${time}</span>
		    	<span><img src=${src}><b>${chance}%</b></span>
		     	<span>${temp} °C</span>
		      </div>
			`
		})

		bottomCard.innerHTML = finalCardData
	})

})


let centerBody=document.querySelector(".center-body")

toggleBody.addEventListener("click",()=>{


	if(toggleBody.classList=="toggle-body"){
		toggleBody.classList.remove("toggle-body")
	    toggleBody.classList.add("dark-mode")
		document.getElementById("mainBody").style.backgroundImage="url(./images/nightMode.jpg)";
		centerBody.style.color="white"
		rightCenterCard.style.color="white"

	}
	else{
		toggleBody.classList.remove("dark-mode")
		toggleBody.classList.add("toggle-body")
		document.getElementById("mainBody").style.backgroundImage="url(./images/dayMode.jpg)";
		centerBody.style.color="black"
		rightCenterCard.style.color="black"
	
	}
})







