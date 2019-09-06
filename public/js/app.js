const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const myCurrentLocation = document.querySelector('#refresh');

// user browser geolocation feature start
if(!navigator.geolocation) {
    alert('Geolocation is not supported on your browser!');
}
// load wether with current geolocation coordinates
navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // define function for fetching location data
    function sendGeoDataOnLoad() {
        messageOne.textContent = 'Loading current location...';
        messageTwo.textContent = '';

        if(position){
            fetch('/weather?latitude='+latitude+'&longitude='+longitude).then( (res) => {
                if(!res.error) {
                    res.json().then( (data) => {
                        if(!data.error){
                            messageOne.textContent = data.location;
                            messageTwo.textContent = data.forecast;
                            search.value = data.address;
                        }
                        else{
                            messageOne.textContent = data.error;
                        }
                    });
                }
                else{
                    messageOne.textContent = res.error;
                }
            });
        }
        else{
            messageOne.textContent = 'Error: Location not found!(r)';
        }
    }

    // trigger function on page load
    sendGeoDataOnLoad();
    
    // trigger function on click
    myCurrentLocation.addEventListener('click', (e) => {
        e.preventDefault();
        sendGeoDataOnLoad();
    }, false);

});
// user browser geolocation feature end

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    if(location){
        fetch('/weather?address='+location).then( (res) => {
            if(!res.error) {
                res.json().then( (data) => {
                    if(!data.error){
                        messageOne.textContent = data.location;
                        messageTwo.textContent = data.forecast;
                    }
                    else{
                        messageOne.textContent = data.error;
                    }
                });
            }
            else{
                messageOne.textContent = res.error;
            }
        });
    }
    else{
        messageOne.textContent = 'Error: Enter a valid location!';
    }


});