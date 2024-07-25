 function updatePage(id, url) {
    console.log(id+"uu");
    $.ajax({
        url: url,
        type: 'POST',
        data: { id: id },
        success: function (data) {
            console.log(data);
        },
        error: function (_xhr, _status, error) {
            console.error('Error fetching classification details:', error);
        }
    })

}