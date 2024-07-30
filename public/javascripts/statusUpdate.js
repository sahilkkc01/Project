export function updateStatus(itemId, isChecked,Schema) {
   
    axios.post('/clinic/save-status-data', {
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
   