let request = async () => {
    const response = await fetch('/api');
    const data = await response.json();
    weather = data.current.condition.text
    let hello = document.getElementById('weatherStatus');
    hello.innerHTML = weather;
    console.log (response)
}
request()
button = document.getElementById('button');
input = document.getElementById('mail')
function sendEmail (){
    console.log(input.value);
}
button.addEventListener('click',sendEmail);


