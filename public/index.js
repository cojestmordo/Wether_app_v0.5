let request = async () => {
    const response = await fetch('/api');
    const data = await response.json();
    weather = data.current.condition.text
    let hello = document.getElementById('name');
    hello.innerHTML = weather;
    console.log (response)
}
request()