function updateStatus(id, url) {
    console.log("Sending update request to:", url, "with ID:", id);
    $.ajax({
        url: url,
        type: 'POST',
        data: { id, exp_status: $("#" + id).prop("checked") },
        success: function (data) {
            console.log("Update successful:", data);
        },
        error: function (_xhr, _status, error) {
            console.error('Error updating status:', error);
        }
    });
}
