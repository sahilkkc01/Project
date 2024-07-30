export function loadDocCat (a){
    
    fetch('/clinic/loadDocCat')
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById(a);
            data.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.doc_cat_master_desc;
                option.textContent = cat.doc_cat_master_desc;
                dropdown.appendChild(option);
                
            });
        })
        .catch(error => console.error('Error fetching states:', error));
    }


export function loadSpec(a){
    
   
      fetch('/clinic/loadSpec')
          .then(response => response.json())
          .then(data => {
              const dropdown = document.getElementById(a);
              data.forEach(doc => {
                  const option = document.createElement('option');
                  option.value = doc.spec_desc;
                  option.textContent = doc.spec_desc;
                  dropdown.appendChild(option);
                  
              });
            //   function setDropdownValue(id,data) {
            //     const dropdownValue = data;
            //     document.getElementById(id).value = dropdownValue;
            // }
          })
          .catch(error => console.error('Error fetching states:', error));
      }

     
      export function loadSubSpec(a, selectedSpec) {
        fetch(`/clinic/loadSubSpec?spec=${encodeURIComponent(selectedSpec)}`)
            .then(response => response.json())
            .then(data => {
                const dropdown = document.getElementById(a);
                dropdown.innerHTML = ''; // Clear previous options
                data.forEach(doc => {
                    const option = document.createElement('option');
                    option.value = doc;
                    option.textContent = doc;
                    dropdown.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching sub-specializations:', error));
    }
    
export function loadRack(a){
    
        fetch('/clinic/loadRack')
            .then(response => response.json())
            .then(data => {
                const dropdown = document.getElementById(a);
                data.forEach(doc => {
                    const option = document.createElement('option');
                    option.value = doc.sub_spec_desc;
                    option.textContent = doc.sub_spec_desc;
                    dropdown.appendChild(option);
                    
                });
            })
            .catch(error => console.error('Error fetching states:', error));
        }  
            
    
   
     export function loadDepttbl(a,b){
            const checkedOptions = b.split(',');
          
          
        fetch('/clinic/loadDept')
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                const doctorDetails = data; // Assuming the response is the array of doctor details
            const tableBody = $(a);
            tableBody.empty();

            doctorDetails.forEach((item) => {
                const row = `<tr>
                    <td><input class="form-check-input mt-0 sub_spec" type="checkbox"  name="dept_desc" value="${item.dept_desc}" ${checkedOptions.includes(`${item.dept_desc}`) ? 'checked' : '' }></td>
                    <td>${item.dept_desc}</td>
                   
                </tr>`;
                tableBody.append(row);
            });
            })
            .catch(error => console.error('Error fetching states:', error));
        }       
  
     
        // tble sub spec
        export function loadSubSpectbl(a,b){
            const checkedOptions = b.split(',');
          
        fetch('/clinic/loadSubSpec')
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                const doctorDetails = data; // Assuming the response is the array of doctor details
            const tableBody = $(a);
            tableBody.empty();

            doctorDetails.forEach((item) => {
                const row = `<tr>
                    <td><input class="form-check-input mt-0 sub_spec" type="checkbox"  name="dept_sub_spec" value="${item.sub_spec_desc}" ${checkedOptions.includes(`${item.sub_spec_desc}`) ? 'checked' : '' }></td>
                    <td>${item.sub_spec_desc}</td>
                   
                </tr>`;
                tableBody.append(row);
            });
            })
            .catch(error => console.error('Error fetching states:', error));
        }   


   

export  function loadState(a){
      fetch('/clinic/reloadState')
          .then(response => response.json())
          .then(data => {
              const dropdown = document.getElementById(a);
              data.forEach(state => {
                  const option = document.createElement('option');
                  option.value = state.stateCode;
                  option.textContent = state.stateName;
                  dropdown.appendChild(option);
                  
              });
          })
          .catch(error => console.error('Error fetching states:', error));
      }


export function loadCity(a) {
        $.ajax({
          url: '/clinic/cities', // Endpoint to fetch all cities
          type: 'GET',
          success: function(data) {
            // console.log(data);
            
            let selectOptions = '<option value="">Select city</option>'; // Initial select option
            
            // Filter cities based on selected stateCode
            const filteredCities = data.filter(city => city.stateCode === a.value);
            
            filteredCities.forEach(function(city) {
              selectOptions += `
                <option value="${city.cityName}">${city.cityName}</option>
              `;
            });
            
            $('#clinic_city').html(selectOptions); // Populate select options
          },
          error: function(xhr, status, error) {
            console.error('Error fetching cities:', error);
          }
        });
      }