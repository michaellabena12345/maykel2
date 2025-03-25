const calendarContainer = document.querySelector(".calendar");
const headerContainer = document.querySelector(".header");
const calendarBody = document.createElement("calendarBody");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const currDay = document.createElement("span");

let currDate = dayjs();

const RenderDaysWeek = () => {
  const startDate = dayjs().startOf("week");

  // Create a container div for the week
  const calendarHeader = document.createElement("div");
  //Add class name on it
  calendarHeader.className =
    "Calendarrow text-uppercase fw-bold text-white fs-6 py-2 bg-success";

  // Loop through the days of the week and create each day
  for (let i = 0; i < 7; i++) {
    //create div for each week
    const day = document.createElement("div");
    day.className = "Calendarcol";
    // get and set the name of the days
    day.textContent = dayjs(startDate).add(i, "day").format("ddd");
    calendarHeader.appendChild(day);
  }

  // put this element inside of calendar div
  calendarContainer.appendChild(calendarHeader);
};

const RenderCells = (currDate) => {
  //clear the previews calendar
  calendarBody.innerHTML = "";
  calendarBody.className = "Calendarbody";
  const monthStart = dayjs(currDate).startOf("month");
  const monthEnd = dayjs(currDate).endOf("month");
  const startDate = dayjs(monthStart).startOf("week");
  const endDate = dayjs(monthEnd).endOf("week");

  const rows = [];
  let date = startDate;

  while (date.isBefore(endDate) || date.isSame(endDate, "day")) {
    const arr = [];

    for (let i = 0; i < 7; i++) {
      const day = date.format("D");
      const isDisabled = !date.isSame(dayjs(currDate), "month");

      const isToday = date.isSame(dayjs(), "day");

      const cell = document.createElement("div");
      cell.className = `Calendarcol Calendarcell position-relative border-end border-light-subtle overflow-hidden  ${
        isDisabled ? "text-body-tertiary pointer-events-none" : ""
      }
                             ${isToday ? "bg-success-subtle" : ""} 
                   `;
      cell.style.cursor = !isDisabled ? "pointer" : "default";
      cell.style.position = "relative";

      const dayNumber = document.createElement("span");
      dayNumber.className = "Calendarnumber position-absolute lh-1 fw-bolder";
      dayNumber.textContent = day;
      cell.appendChild(dayNumber);

      arr.push(cell);

      // Add one day to the `date` object
      date = date.add(1, "day");
    }

    const row = document.createElement("div");
    row.className = "Calendarrow";
    arr.forEach((cell) => row.appendChild(cell));
    rows.push(row);
  }

  //   calendarContainer.innerHTML = "";
  rows.forEach((row) => calendarBody.appendChild(row));

  calendarContainer.appendChild(calendarBody);
};

const RenderCurrDate = (currDate) => {
  currDay.textContent = currDate.format("MMMM YYYY");
  headerContainer.appendChild(currDay);
};

leftArrow.addEventListener("click", function () {
  currDate = currDate.subtract(1, "month");
  RenderCurrDate(currDate);
  RenderCells(currDate);
});

rightArrow.addEventListener("click", function () {
  currDate = currDate.add(1, "month");
  RenderCurrDate(currDate);
  RenderCells(currDate);
});

RenderCurrDate(currDate);
RenderDaysWeek();
RenderCells(currDate);
