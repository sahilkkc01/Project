export const charVal = () => {
    $('.only-characters').on('keypress', function(event) {
        const charCode = event.which || event.keyCode;
        const charStr = String.fromCharCode(charCode);

        console.log(`charCode: ${charCode}, charStr: ${charStr}`);

        // Allow only letters and space
        if (!/^[a-zA-Z\s]+$/.test(charStr)) {
            event.preventDefault();
            console.log('Only characters and space allowed');
            return false;
        }

        return true;
    });
}
export const dateVal = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    $('.date-field').on('change', function(event) {
        const enteredDate = event.target.value;

        console.log(`Entered Date: ${enteredDate}, Today's Date: ${today}`);

        // Prevent date less than today
        if (enteredDate < today) {
            event.target.value = ''; // Clear the invalid date
            alert('The date cannot be in the past.');
            console.log('Date less than today is not allowed');
            return false;
        }

        return true;
    });
}
export const dateValMax = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    $('.date-fieldMax').on('change', function(event) {
        const enteredDate = event.target.value;

        console.log(`Entered Date: ${enteredDate}, Today's Date: ${today}`);

        // Prevent date less than today
        if (enteredDate > today) {
            event.target.value = ''; // Clear the invalid date
            alert('The date cannot be in the future.');
            console.log('Date more than today is not allowed');
            return false;
        }

        return true;
    });
}

//
export const validateConDate = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    $('.date-field-con').on('change', function(event) {
        const conDate = event.target.value;
        const vDate = $('#v_date').val();

        console.log(`Entered Con Date: ${conDate}, V Date: ${vDate}, Today's Date: ${today}`);

        if (!vDate) {
            alert('Please enter the visited date first.');
            event.target.value = ''; // Clear the invalid date
            console.log('Verification date is required before entering the confirmation date');
            return false;
        }

        // Prevent con_date less than v_date or more than today
        if (conDate < vDate) {
            event.target.value = ''; // Clear the invalid date
            alert('Booking date cannot be less than Visited date.');
            console.log('Booking date is less than Visited date');
            return false;
        }

        if (conDate > today) {
            event.target.value = ''; // Clear the invalid date
            alert('Booking date cannot be in the future.');
            console.log('Booking date is more than today');
            return false;
        }

        return true;
    });
}


export const marriageYearVal = (wifeAgeCls, husAgeCls, marriageYearCls) => {
    const validateMarriageYear = () => {
        const wifeAge = parseInt($(wifeAgeCls).val(), 10);
        const husAge = parseInt($(husAgeCls).val(), 10);

        // Ensure both ages are valid numbers
        if (isNaN(wifeAge) || isNaN(husAge)) {
            return; // Exit if either age is not a valid number
        }

        const minAge = Math.min(wifeAge, husAge);

        $(marriageYearCls).on('change', function(event) {
            const inputValue = $(this).val().trim();

            // Validate if input is numeric
            if (!/^\d+$/.test(inputValue)) {
                // If input is not numeric, clear the input
                alert('Marriage year should be a valid number');
                $(this).val('');
                return false;
            }

            const marriageYear = parseInt(inputValue, 10);

            // Check if the marriage year is valid
            if (marriageYear >= minAge) {
                // If marriage year is invalid, clear the input and show alert
                alert(`Marriage year should be less than ${minAge}`);
                $(this).val('');
                return false;
            }

            // Allow input as it meets all criteria
            return true;
        });
    };

    // Validate on initial load and when ages are changed
    $(wifeAgeCls).on('change', validateMarriageYear);
    $(husAgeCls).on('change', validateMarriageYear);
    validateMarriageYear();
};




export const numVal = (cls,x)=>{
$(cls).on('keypress', function(event) {
    // Allow only digits and restrict to 10 characters
    const charCode = event.which || event.keyCode;
    const charStr = String.fromCharCode(charCode);

    if (!/^\d$/.test(charStr)) {
        event.preventDefault();
        return false;
    }

    // Limit to 10 digits
    const inputValue = $(this).val();
    if (inputValue.length >= x) {
        event.preventDefault();
        return false;
    }

    return true;
});


}

export const valCheck = (cls, min, max) => {
    $(cls).on('change', function(event) {
        const inputValue = $(this).val().trim();

        // Validate if input is numeric
        if (!/^\d+$/.test(inputValue)) {
            
            // If input is not numeric, prevent further input
            $(this).val('');
            return false;
        }

        const numberValue = parseInt(inputValue, 10);

        // Check if the number is within the specified range
        if (numberValue < min || numberValue > max) {
            // If number is out of range, prevent further input
            alert(`age should not be less then ${min} and more then ${max}`)
            $(this).val('');
            return false;
        }

        // Allow input as it meets all criteria
        return true;
    });
};
