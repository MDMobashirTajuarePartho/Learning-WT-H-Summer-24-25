document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("jobForm");

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const experience = document.getElementById("experience");
  const salary = document.getElementById("salary");
  const terms = document.getElementById("terms");

  const validateName = () => /^[A-Za-z ]{3,}$/.test(fullName.value.trim());
  const validateEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  const validatePhone = () => /^\d{11}$/.test(phone.value);
  const validatePassword = () => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password.value);
  const validateExperience = () => experience.value !== "";
  const validateSalary = () => parseInt(salary.value) > 0;
  const validateTerms = () => terms.checked;

  const showValidation = (input, isValid) => {
    input.classList.remove("valid", "invalid");
    input.classList.add(isValid ? "valid" : "invalid");
  };

  const validateField = (input, validationFunc) => {
    const isValid = validationFunc();
    showValidation(input, isValid);
    return isValid;
  };


  fullName.addEventListener("input", () => validateField(fullName, validateName));
  email.addEventListener("input", () => validateField(email, validateEmail));
  phone.addEventListener("input", () => validateField(phone, validatePhone));
  password.addEventListener("input", () => validateField(password, validatePassword));
  experience.addEventListener("change", () => validateField(experience, validateExperience));
  salary.addEventListener("input", () => validateField(salary, validateSalary));

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const validations = [
      [fullName, validateName, "Name must be at least 3 letters."],
      [email, validateEmail, "Enter a valid email address."],
      [phone, validatePhone, "Phone must be exactly 11 digits."],
      [password, validatePassword, "Password must have 1 uppercase, 1 lowercase, 1 digit."],
      [experience, validateExperience, "Select an experience level."],
      [salary, validateSalary, "Expected salary must be a positive number."],
    ];

    let allValid = true;

    validations.forEach(([input, validator, message]) => {
      const isValid = validator();
      showValidation(input, isValid);
      if (!isValid) {
        alert(message);
        allValid = false;
      }
    });

    if (!validateTerms()) {
      alert("You must agree to the terms & conditions.");
      allValid = false;
    }

    if (allValid) {
      alert("Application submitted successfully!");
      form.reset();
      document.querySelectorAll("input, select").forEach(el => el.classList.remove("valid", "invalid"));
    }
  });
});
