const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let currentDate = new Date();

function renderCalendar() {
    const monthYear = document.getElementById("month-year");
    const calendarBody = document.querySelector("#calendar-table tbody");

    // Set the month and year in the header
    monthYear.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    // Clear the previous calendar
    calendarBody.innerHTML = '';

    // Get the first day of the current month
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    // Get the number of days in the current month
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    let dayCount = 1;
    
    // Create the calendar rows
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        // Create each day of the week
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                // Empty cells before the first day
                cell.classList.add('empty');
                row.appendChild(cell);
            } else if (dayCount > daysInMonth) {
                // Stop when we reach the last day of the month
                break;
            } else {
                // Fill in the day number
                cell.textContent = dayCount;

                // Highlight today's date
                if (isToday(dayCount)) {
                    cell.classList.add('today');
                }

                // Mark Sundays with red color
                if (j === 0) {
                    cell.classList.add('sunday');
                }

                row.appendChild(cell);
                dayCount++;
            }
        }

        calendarBody.appendChild(row);
    }
}

// Check if a given day is today's date
function isToday(day) {
    return day === currentDate.getDate() &&
           currentDate.getMonth() === new Date().getMonth() &&
           currentDate.getFullYear() === new Date().getFullYear();
}

// Change to previous month
document.getElementById("prev-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

// Change to next month
document.getElementById("next-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initial render
renderCalendar();
