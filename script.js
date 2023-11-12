document.addEventListener("DOMContentLoaded", function () {
    // Function to calculate age
    function calculateAge(birthdate) {
        const today = new Date();
        const birthDate = new Date(birthdate);

        if (isNaN(birthDate.getTime()) || birthDate > today) {
            return null; // Invalid date
        }

        let ageYears = today.getFullYear() - birthDate.getFullYear();
        let ageMonths = today.getMonth() - birthDate.getMonth();
        let ageDays = today.getDate() - birthDate.getDate();

        if (ageDays < 0) {
            const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, birthDate.getDate());
            ageMonths = today.getMonth() - lastMonth.getMonth();
            ageDays = today.getDate() - lastMonth.getDate();
        }

        // Correction for negative month differences
        if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
            ageYears--;
            ageMonths = (12 + today.getMonth() - 1) - birthDate.getMonth();
        }

        return { years: ageYears, months: ageMonths, days: ageDays };
    }

    // Function to format age
    function formatAge(age) {

        if (age.years == 0 && age.months == 0 && age.days == 0) {
            return `Happy Birthday !!`;
        }
       

        const yearsString = age.years >= 0 ? `${age.years} years` : "";
        const monthsString = age.months >= 0 ? `${age.months} months` : "";
        const daysString = age.days >= 0 ? `${age.days} days` : "";

        return `${yearsString} ${monthsString} ${daysString}`;
    }

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault();

        const birthdateInput = document.getElementById("birthdate");
        const resultDiv = document.getElementById("resultDiv");
        const finalResult = document.getElementById("finalResult");
        const invalidMessage = document.getElementById("invalid");
        const agePtag = document.getElementById("hiddenAge");
        const Birthday = document.getElementById("bday");

        const birthdate = birthdateInput.value;
        const age = calculateAge(birthdate);

        if (age === null) {
            // Invalid date
            invalidMessage.removeAttribute("hidden");
            agePtag.setAttribute("hidden", true);
            finalResult.innerText = "";
        } else {
            // Valid date
            invalidMessage.setAttribute("hidden", true);
           
            result = formatAge(age);

            if (result != 'Happy Birthday !!') {
                //show
                agePtag.removeAttribute("hidden");
                Birthday.setAttribute("hidden",true);
                finalResult.innerText = result;
               
            } else {
                //hide

                Birthday.removeAttribute("hidden");

            }

        }
    }

    // Add form submission event listener
    const form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);
});
