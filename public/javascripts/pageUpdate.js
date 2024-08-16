
 
 
 
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


export function ViewBtn(route, id,module){
   const encryptedId = encryptDataForUrl(`${id}`)
   
   axios.get(`/${module}/${route}`, {
       params: {
           id: encryptedId 
       }
     })
     .then(response => {
       // console.log('Success:', response.data);
       window.location.href =` /${module}/${route}?id=${encryptedId}`; 
      
     })
     .catch(error => {
       console.error('Error:', error);
     });}