document.addEventListener("DOMContentLoaded", function () {
    // Function to calculate age
    function calculateAge(birthdate) {
      const today = new Date();
      const birthDate = new Date(birthdate);
  
      if (birthDate.toDateString() === today.toDateString()) {
        return { years: 0, months: 0, days: 0 };
      }
  
      if (isNaN(birthDate.getTime()) || birthDate > today) {
        return null; // Invalid date
      }
  
      const ageYears = today.getFullYear() - birthDate.getFullYear();
      const ageMonths = today.getMonth() - birthDate.getMonth();
      const ageDays = today.getDate() - birthDate.getDate();
  
      if (ageDays < 0) {
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, birthDate.getDate());
        return {
          years: ageYears,
          months: today.getMonth() - lastMonth.getMonth(),
          days: ageDays + today.getDate() - lastMonth.getDate(),
        };
      }
  
      return { years: ageYears, months: ageMonths, days: ageDays };
    }
  
    // Function to format age
    function formatAge(age) {
      if (age.years === 0 && age.months === 0 && age.days === 0) {
        return `Happy Birthday !!`;
      }
  
      const parts = [];
  
      if (age.years > 0) parts.push(`${age.years} ${age.years === 1 ? "year" : "years"}`);
      if (age.months > 0) parts.push(`${age.months} ${age.months === 1 ? "month" : "months"}`);
      if (age.days > 0) parts.push(`${age.days} ${age.days === 1 ? "day" : "days"}`);
  
      return parts.join(" ");
    }
  
    // Function to handle form submission
    function handleSubmit(event) {
      event.preventDefault();
  
      const birthdateInput = document.getElementById("birthdate");
      const finalResult = document.getElementById("finalResult");
      const invalidMessage = document.getElementById("invalid");
      const ageMessage = document.getElementById("hiddenAge");
      const Birthday = document.getElementById("bday");
  
      const birthdate = new Date(birthdateInput.value);
      const age = calculateAge(birthdate);
  
      if (age === null) {
        // Invalid date
        invalidMessage.removeAttribute("hidden");
        ageMessage.setAttribute("hidden", true);
        Birthday.setAttribute("hidden", true);
        finalResult.innerText = "";
      } else {
        // Valid date
        invalidMessage.setAttribute("hidden", true);
  
        result = formatAge(age);
  
        if (result === "Happy Birthday !!") {
          ageMessage.setAttribute("hidden",true);  
          Birthday.removeAttribute("hidden");
        } else {
          ageMessage.removeAttribute("hidden");
          Birthday.setAttribute("hidden", true);
          finalResult.innerText = result;
        }
      }
    }
  
    // Add form submission event listener
    const form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);
  });
  