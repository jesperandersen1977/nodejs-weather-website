console.log('client side javascript is loaded');

// client side Javascript

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = '';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/Weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = data.weather.location;
                messageTwo.textContent = data.weather.forecast;
            }
        });
    })

    // console.log(location);
})