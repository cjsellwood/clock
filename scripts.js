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
    if (smooth === true) {
        second.style.transform = `rotate(${((d.getSeconds()) + d.getMilliseconds() / 1000) * 6}deg)`;
    } else {
        second.style.transform = `rotate(${((d.getSeconds())) * 6}deg)`;
    }

    // Move minutes hand
    let minute = document.getElementsByClassName("minutes")[0];
    minute.style.transform = `rotate(${(d.getMinutes() + d.getSeconds() / 60) * 6}deg)`;

    // Move hours hand
    let hour = document.getElementsByClassName("hours")[0];
    hour.style.transform = `rotate(${(d.getHours() + d.getMinutes() / 60) % 12 * 30}deg)`;
}

// get first time to avoid pop in time
function getInitialTime() {
    changeTime();
}

// gets and displays time, updates every second
function getTime(speed) {
    intervalId = setInterval(() => {
        changeTime();
    }, speed);
}


// Switch between smooth second hand and ticking hand
function toggleSmooth() {
    if (smooth === false) {
        // increase update speed and restart interval function
        speed = 10;
        smooth = true;
        clearInterval(intervalId);
        getTime(speed);
        console.log(speed)       
    } else {
        // decrease update speed and restart interval function
        speed = 1000;
        smooth = false;
        clearInterval(intervalId);
        getTime(speed);
        console.log(speed)
    }
}

// Set interval time, lower smoother
let intervalId;
let speed = 1000;


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

// Go to rainbow clock
function visitLink(link) {
    window.location = link;
}


// Toggle numbers with button and function
let toggleNumberButton = document.getElementById("toggle-number");
toggleNumberButton.addEventListener('click', () => {
    toggleNumbers();
})

// Toggle smooth second hand with button and function
let toggleSmoothButton = document.getElementById("toggle-smooth");
toggleSmoothButton.addEventListener('click', () => {
    toggleSmooth();
})

let smooth = false;
let numbers = false;

toggleNumbers()
getInitialTime();
getTime(speed);