const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const infoButton = document.getElementById("info");
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const daysInMonth = new Date(year, month + 1, 0).getDate();
const calendarDiv = document.getElementById("calendar");
const dayButton = document.createElement("button");
let selectedDay = null;
let selectedDayButton = null;
const hearts = document.querySelector(".hearts");

for (let i = 0; i < 20; i++) {
    const heart = document.createElement("img");

    heart.src = "static/pngs/hrt.png";
    heart.classList.add("heart");

    heart.style.left = Math.random() * 100 + "%";
    heart.style.top = Math.random() * 100 + "%";

    hearts.appendChild(heart);
}

for (let day = 1; day <= daysInMonth; day++) {

    const dayButton = document.createElement("button");

    dayButton.textContent = day;

    dayButton.classList.add("day");

    calendarDiv.appendChild(dayButton);

    dayButton.addEventListener("click", function() {
        selectedDay = day;
        if (selectedDayButton) {
            selectedDayButton.classList.remove("selected");
        }
        dayButton.classList.add("selected");
        selectedDayButton = dayButton;
    });
}
noButton.addEventListener("mouseover", function() {
    const randomX = Math.random() * 500;
    const randomY = Math.random()*500;
    noButton.style.position = "fixed";
    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";
});
const afterYesDiv = document.getElementById("after_yes");
yesButton.addEventListener('click', function() {
    document.getElementById("invitation").style.display = "none";
    afterYesDiv.style.display = "block";
    calendarDiv.style.display = "block";

});
const afterInfoDiv = document.getElementById("after_info");
infoButton.addEventListener('click',function(){
    document.getElementById('after_yes').style.display = 'none';
    afterInfoDiv.style.display = 'block';
});


infoButton.addEventListener('click',function(){
    const time = document.getElementById("time-input").value;
    const place = document.getElementById("place-input").value;
    fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selectedDay, time: time, place: place })
    })
});