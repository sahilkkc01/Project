 function updateStatus(itemId, isChecked,Schema,module) {
   
    axios.post(`/${module}/save-status-data`, {
    id: itemId, 
    status: isChecked, 
    schema: Schema 
})
.then(response => {
    console.log('Response from server:', response.data);
})
.catch(error => {
    console.error('Error:', error);
   
});
    
    }
   