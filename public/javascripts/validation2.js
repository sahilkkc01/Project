function validateForm(formId) {
   
               
    console.log("Form submission prevented");
    let isValid = true;
    let errorMessage = '';

    // Reset previous validation states
    $(formId).find('.is-invalid').removeClass('is-invalid');

    const inputs = $(formId).find('input, select,textarea').toArray().reverse();
    let formData = {};

    inputs.forEach(function(input) {
      const $input = $(input);
      const validationRules = $input.data('validation');
      const customErrorMessage = $input.data('error-message') || 'This field is required.';

      if (validationRules) {
        const rules = validationRules.split(' ');

        rules.forEach(rule => {
          switch (rule) {
            case 'required':
              if (!$input.val()) {
                isValid = false;
                errorMessage = customErrorMessage;
                $input.addClass('is-invalid');
                // console.log(`Validation failed: ${customErrorMessage}`);
              }
              break;
            case 'email':
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test($input.val())) {
                isValid = false;
                errorMessage = customErrorMessage;
                $input.addClass('is-invalid');
              }
              break;
              case 'onlyChar': // Custom rule for only characters allowed
              const charRegex = /^[A-Za-z\s]+$/; // Regex to allow only letters (upper and lower case) and spaces
              if (!charRegex.test($input.val())) {
                  isValid = false;
                  errorMessage = 'Only Characters and Spaces Allowed';
                  $input.addClass('is-invalid');
              }
              break;
          
              case 'onlyNum': // Custom rule for only numbers allowed
              const numberRegex = /^[0-9]+$/; // Regex to allow only numbers (digits)
             if (!numberRegex.test($input.val())) {
             isValid = false;
            errorMessage = customErrorMessage;
            $input.addClass('is-invalid');
          }
             break;
             case 'mobileNum':
              // Regex for a typical mobile number format starting with 6, 7, 8, or 9 and having 10 digits
              const mobileRegex = /^[6-9]\d{9}$/;
              if (!mobileRegex.test($input.val())) {
                  isValid = false;
                  errorMessage = 'Please enter a valid number';
                  $input.addClass('is-invalid');
              }
              break;
          
            
          }
        });
      }

      formData[$input.attr('name')] = $input.val();
      
    });
       
    return {isValid,errorMessage,formData}


}