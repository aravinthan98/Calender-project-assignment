const date = new Date();

const renderCalendar = () => {
    date.setDate(1);
    const monthDays = document.querySelector(".days");

    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;



    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="days-border previous-days"></div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
        ) {
            days += `<div class="days-border today">${i}</div>`;
        } else {
            days += `<div class="days-border">${i}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="days-border next-days"></div>`;
        monthDays.innerHTML = days;
    }
};

document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
    reloading();
});

document.querySelector(".next").addEventListener("click", () => {
    reloading();
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

renderCalendar();

const userFill = document.getElementById('user-selected-date');


const localStore = JSON.parse(localStorage.getItem('selectedDates')) || [];
const day = document.getElementsByClassName('days')[0];
let dateArray = localStore;
userFill.innerHTML = localStore
day.addEventListener('click', (e)=> {
    let monthValue = months[date.getMonth()];
    let dateValue = new Date().toDateString();
    if (e.target.style.backgroundColor==="blue") {
        e.target.style.backgroundColor="white";
        e.target.style.color="black";
        // e.target.textContent=
        // console.log( e.target)
    } else {
        let splitted = dateValue.split(" ");
        let merged = `${e.target.textContent}-${months.indexOf(monthValue)+1}-${splitted[3]}`
        if (!dateArray.includes(merged)) {
            dateArray.push(merged)
        }
        localStorage.setItem('selectedDates',JSON.stringify(dateArray));
        e.target.style.backgroundColor="blue"
        e.target.style.color="white";
        userFill.innerHTML = localStore
    }
})

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];


function reloading() {
    const localStore = JSON.parse(localStorage.getItem('selectedDates')) || [];
    let monthValue = months[date.getMonth()];
    let dateValue = new Date().toDateString();
    console.log(localStore)
    for (let i of localStore) {
        let temp = i.split("-");
        console.log(temp);
        console.log(dateValue)
        console.log(monthValue)
        let dateSplit = dateValue.split(" ");
        if (months[temp[1]-1] === monthValue && temp[2] === dateSplit[3]) {
            // dateSplit[2]
            // day.forEach(i, ()=> {
            //     if (i === `<div class="days-border">${dateSplit[2]}</div>`) {
            //         console.log("yes")
            //     }

            // })
        }
    }
}