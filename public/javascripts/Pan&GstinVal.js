function validatePANField(inputId) {
    const panInputField = document.getElementById(inputId);

    if (!panInputField) {
        console.error(`Element with ID '${inputId}' not found.`);
        return;
    }

    panInputField.addEventListener('input', function () {
        const panInput = this.value.trim();
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        // Only validate if the length is exactly 10 characters
        if (panInput.length === 10) {
            if (!panRegex.test(panInput)) {
                // Show alert for invalid PAN number
                alert('Invalid PAN format! Please enter a valid PAN number.');

                // Clear the input field if invalid
                this.value = '';
            }
        }
    });
}


// GSTIN Validation and Event Listener Function
function validateGSTINField(inputId) {
    const gstinInputField = document.getElementById(inputId);
      if (!gstinInputField) {
        console.error(`Element with ID '${inputId}' not found.`);
        return;
    }


    gstinInputField.addEventListener('input', function () {
        const gstinInput = this.value.trim();
        const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;

        // Only validate if the length is exactly 15 characters
        if (gstinInput.length === 15) {
            if (!gstinRegex.test(gstinInput)) {
                // Show alert for invalid GSTIN number
                alert('Invalid GSTIN format! Please enter a valid GSTIN number.');
                
                // Clear the input field
                this.value = '';
            }
        }
    });
}


