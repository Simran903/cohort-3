count = 0

function updateCounter(){
    document.querySelector('h4').innerHTML = count++;
}

setInterval(updateCounter, 1000)