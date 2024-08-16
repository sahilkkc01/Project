 function myAjax(formData,errorDivId,url,loadingDiv){
    // Show loading indicator
$(loadingDiv).show();

$.ajax({
    url: url,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    beforeSend: function() {
        // Show loading spinner or text
        $(loadingDiv).text('Loading...').show();
    },
    success: function(response) {
        // Hide loading indicator on success
        $(loadingDiv).hide();

        
        alert('Form submitted successfully!');
        $(errorDivId).removeClass('alert-danger').addClass('alert-success').text('Form submitted successfully!').show();
        console.log('abc:', response);
        return response;
        
    },
    error: function(xhr, status, error) {
        // Hide loading indicator on error
        $(loadingDiv).hide();
        alert('Error in saving form');
        const response = JSON.parse(xhr.responseText);
        $(errorDivId).removeClass('alert-success').addClass('alert-danger').text(response.msg).show();
        console.error('Error:', error);
    }
});

}