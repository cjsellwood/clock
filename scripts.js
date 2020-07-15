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
    second.style.transform = `rotate(${(d.getSeconds()) * 6}deg)`;

    // Move minutes hand
    let minute = document.getElementsByClassName("minutes")[0];
    minute.style.transform = `rotate(${(d.getMinutes() + d.getSeconds() / 60) * 6}deg)`;

    // Move hours hand
    let hour = document.getElementsByClassName("hours")[0];
    hour.style.transform = `rotate(${(d.getHours() + d.getMinutes() / 60) % 12 * 30}deg)`;

    let root = document.documentElement;
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

// Add numbers to clock
function toggleNumbers() {
    if (numbers === false) {
        let frame = document.getElementById("frame");

        // Set relative positions for each number
        let left = [46, 57, 62, 57, 46.5, 31.4, 16.5, 5.5, 1.5, 5.5, 16.5, 30.7];
        let top = [5, 16, 30.7, 45.7, 56.5, 61, 56.5, 45.7, 30.7, 16, 5, 1];
        for (let i = 1; i < 13; i++) {
            const number = document.createElement("div");
            number.textContent = i;
            number.classList.toggle('number');
            number.style.left = `min(${left[i - 1]}vw, ${left[i - 1]}vh)`;
            number.style.top = `min(${top[i - 1]}vw, ${top[i - 1]}vh)`;
            frame.appendChild(number);
        }
        numbers = true;
    } else {
        let numberDivs = document.querySelectorAll(".number");
        numberDivs.forEach((div) => {
            div.remove();
        })
        numbers = false;
    }
}

// Set interval time, lower smoother
let speed = 1000;

// Toggle numbers with button and function
let toggleNumberButton = document.getElementById("toggle-number");
toggleNumberButton.addEventListener('click', () => {
    toggleNumbers();
})

let numbers = true;
getInitialTime();
getTime();