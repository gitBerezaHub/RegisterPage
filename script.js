let completeBtn = document.getElementById("complete-btn");

let password = document.getElementById("password")
let confirm_password = document.getElementById("confirm-password");

let signUp = document.getElementById("sign-up")

// check if passwords are the same
function validatePassword() {
	if (password.value !== confirm_password.value) {
		confirm_password.style["color"] = "red"
	} else {
		confirm_password.style["color"] = "black"
	}
}
password.onkeyup = validatePassword;
confirm_password.onkeyup = validatePassword;


let client = {
	firstName: '', lastName: '', nationality: '', email: '', dateOfBirth: '', gender: '', password: ''
}

// check validity of fields
function checkVal() {
	let arrOfNames = ['first-name', 'last-name', 'password', 'confirm-password']
	for (let i = 0; i < arrOfNames.length; i++) {
		if (!document.getElementById(arrOfNames[i]).checkValidity()) {
			return false
		}
	}
	return true
}

completeBtn.addEventListener("click", function () {
	if (!checkVal()) {
		shakeBtn()
	} else {
		sendRes()
	}
});

function removeShakeBtn() {
	completeBtn.classList.remove("shake");
}
function shakeBtn(){
	completeBtn.classList.add("shake");
	setTimeout(removeShakeBtn, 500)
}

function clearFields(){
	Array.prototype.slice.call(document.getElementsByName('field')).forEach(function (item) {
		item.value = ''
	})
}

function sendRes() {
	client.firstName = document.getElementById('first-name').value
	client.lastName = document.getElementById('last-name').value
	client.nationality = document.getElementById('nationality').value
	client.email = document.getElementById('email').value
	client.password = document.getElementById('password').value

	// write and add date of birth data to client
	let yearOfBirth = Number(document.getElementById('year-of-birth').value)
	let monthOfBirth = Number(document.getElementById('month-of-birth').value)
	let dayOfBirth = Number(document.getElementById('day-of-birth').value)
	let dateOfBirth = new Date(yearOfBirth, monthOfBirth, dayOfBirth)
	client.dateOfBirth = dateOfBirth.toISOString().split('T')[0]

	// check if client has chosen gender
	if (document.getElementById('male').checked) {
		client.gender = 'male'
	} else if (document.getElementById('female').checked) {
		client.gender = 'female'
	}else {
		shakeBtn()
		return 0
	}

	// here should be logic for pushing data to server

	clearFields()

	successfulLayoutChange()
}



function successfulLayoutChange() {

	signUp.remove()
	completeBtn.remove()

	let p = document.createElement("p")
	let h1 = document.createElement("h1")
	let div = document.createElement("div")
	let main = document.getElementById("sign-up-form")

	div.classList.add("container-thank-you")

	main.insertBefore(div, main.firstElementChild);
	div.appendChild(h1);
	div.appendChild(p);

	main.classList.add("container-thank-you__centered")
	h1.classList.add("thank-you")
	p.classList.add("success-registration")

	p.innerHTML = "you registered!"
	h1.innerHTML = "Thank You!"
}