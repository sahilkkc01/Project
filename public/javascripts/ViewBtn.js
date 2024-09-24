function ViewBtn(route, id,module){
axios.get(`/${module}/${route}`, {
    params: {
      id: id 
    }
  })
  .then(response => {
    // console.log('Success:', response.data);
    window.location.href = `/${module}/${route}?id=${id}`; 
   
  })
  .catch(error => {
    console.error('Error:', error);
  });
}