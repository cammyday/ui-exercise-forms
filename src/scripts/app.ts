// Create variables and retrieve HTML elements from form using IDs
const pwdRestForm = document.getElementById('passwordReset')
const emailInput = document.getElementById('emailInput')
const errorArea = document.getElementById('errorArea')
const successArea = document.getElementById('successArea')

// Error function, removes hidden class from section and populates with appropriate error message
const setError = (error) => {
    errorArea.querySelector('h2').innerHTML = error.detail
    errorArea.classList.remove('hidden')
}

// Success function, removes hidden class from the success area in form
const setSuccess = () => {
    successArea.classList.remove('hidden')
}

// Function that clears any error or success messages from form
const clearState = () => {
    if (!successArea.classList.contains('hidden')) {
        successArea.classList.add('hidden')
    }
    if (!errorArea.classList.contains('hidden')) {
        errorArea.classList.add('hidden')
    }
}

// Asynchronous function, takes value from email input and posts to /customer/account/resetPassword
const submitHandler = async () => {
    event.preventDefault()
	const userEmail = emailInput.value

    // Declare variables for use in fetch
    const body = JSON.stringify({ email: userEmail })
    const method = "POST"
    const headers = {
		'Content-Type': 'application/json'
	}

    const result = await (await fetch('http://localhost:3005/customer/account/resetPassword', { method, body, headers })).json()

    // If any errors found run serError function, if not run setSuccess function
    if (result.errors.length) {
        setError(result.errors[0])
    } else {
        setSuccess()
    }
}

// Run submitHandler function when form is submitted
pwdRestForm.addEventListener('submit', submitHandler)

// Run clearState function when input value is changed
pwdRestForm.addEventListener('input', clearState)