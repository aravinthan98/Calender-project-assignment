const date = new Date();
const userFill = document.getElementById('user-selected-date');
const monthDays = document.querySelector(".days");
const renderCalendar = () => {   
    date.setDate(1);
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

    for (let x = 0; x< firstDayIndex; x++) {
        days += `<div class="days-border "></div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        let merged = `${i}-${date.getMonth()+1}-${date.getFullYear()}`
        if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
        ) {
            
            days += `<div class="days-border today" id=${merged}>${i}</div>`;
        } else {
            days += `<div class="days-border" id=${merged}>${i}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="days-border"></div>`;
        monthDays.innerHTML = days;
    }
};

document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
    reloading();
});

document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
    reloading();
});

renderCalendar();



const localStore = JSON.parse(localStorage.getItem('selectedDates')) || [];
const day = document.getElementsByClassName('days')[0];
let dateArray = localStore;
userFill.innerHTML = "[ "+localStore+" ]"
day.addEventListener('click', (e)=> {

    console.log("id",e.target.id);
    let merged = e.target.id;

    if (!dateArray.includes(merged) && e.target.textContent !== "") {
        dateArray.push(merged)
        e.target.style.backgroundColor="blue"
        e.target.style.color="white";
    } else if ((dateArray.includes(merged) && e.target.textContent !== "")) {
        dateArray = dateArray.filter((item)=>item!==merged);
        e.target.style.backgroundColor="white";
        e.target.style.color="black";
    }
      
    localStorage.setItem('selectedDates',JSON.stringify(dateArray));
    userFill.innerHTML = "[ "+dateArray+" ]";
})

reloading()
function reloading() {
    const daysSelector = document.querySelectorAll('.days-border');
    const localStore = JSON.parse(localStorage.getItem('selectedDates')) || [];

    for (let i of localStore) {    
        daysSelector.forEach((item)=> {
            if(item.id === i) {
                item.style.backgroundColor = "blue";
                item.style.color = "white";
            }
        })
        
    }
}