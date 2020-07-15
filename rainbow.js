function changeTime() {
    // Display digital time
    let d = new Date();
    let time = document.getElementById("time");
    let h = d.getHours().toString().padStart(2, '0');
    let m = d.getMinutes().toString().padStart(2, '0');
    let s = d.getSeconds().toString().padStart(2, '0')
    time.textContent = `${h} : ${m} : ${s}`

    // Move seconds hand
    let second = document.getElementsByClassName("seconds")[0];
    second.style.transform = `rotate(${(d.getSeconds() + d.getMilliseconds() / 1000) * 6}deg)`;

    // Move minutes hand
    let minute = document.getElementsByClassName("minutes")[0];
    minute.style.transform = `rotate(${(d.getMinutes() + d.getSeconds() / 60) * 6}deg)`;

    // Move hours hand
    let hour = document.getElementsByClassName("hours")[0];
    hour.style.transform = `rotate(${(d.getHours() + d.getMinutes() / 60) % 12 * 30}deg)`;
    
    // Change background gradient
    let all = document.getElementById("all");
    let hue = (d.getSeconds() + d.getMilliseconds() / 1000) * 6;
    // all.style.backgroundColor = `hsl(${hue.toString()}, 100%, 50%)`;
    let inverseHue = (hue + 180) % 360;
    let root = document.documentElement;
    root.style.setProperty('--color1', `hsl(${hue}, 100%, 50%)`);
    root.style.setProperty('--color2', `hsl(${(hue) - 45}, 100%, 50%)`);
    root.style.setProperty('--color3', `hsl(${(hue) - 90}, 100%, 50%)`);
    root.style.setProperty('--color4', `hsl(${(hue) - 135}, 100%, 50%)`);
    root.style.setProperty('--color5', `hsl(${(hue) - 180}, 100%, 50%)`);
    root.style.setProperty('--color6', `hsl(${(hue) - 225}, 100%, 50%)`);
    root.style.setProperty('--color7', `hsl(${(hue) - 270}, 100%, 50%)`);
    root.style.setProperty('--color8', `hsl(${(hue) - 315}, 100%, 50%)`);
    
}

function changeBackground() {

}

// get first time to avoid pop in time
function getInitialTime() {
    changeTime();
}

// gets and displays time, updates every second
function getTime() {
    setInterval(() => {
        changeTime();
}, speed);
}

// set interval time, lower smoother
let speed = 10;

getInitialTime();
getTime();