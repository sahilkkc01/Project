function addFileInput() {
  const container = document.getElementById('additional-file-inputs');
  const inputCount = container.children.length + 1;

  const fileInputContainer = document.createElement('div');
  fileInputContainer.className = 'd-flex align-items-center mb-2 ml-3';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.name = `report${inputCount}`;
  fileInput.style.display = 'none';
  fileInput.id = `fileInput${inputCount}`;

  const imageButton = document.createElement('button');
  imageButton.type = 'button';
  imageButton.className = 'btn btn-primary btn-style btn-change';
  imageButton.onclick = () => document.getElementById(`fileInput${inputCount}`).click();
  imageButton.innerHTML = `<i class="fa-solid fa-image"></i>`;
  imageButton.setAttribute('data-validation', '');
  imageButton.style.marginRight = '5px';

  const remarkInput = document.createElement('input');
  remarkInput.type = 'text';
  remarkInput.name = `remark${inputCount}`;
  remarkInput.id = `remark${inputCount}`;
  remarkInput.className = 'form-control input-style ml-2';
  remarkInput.placeholder = 'Enter Remark';
  remarkInput.style.width = '100px';
  remarkInput.setAttribute('data-validation', '');

  const eyeButton = document.createElement('button');
  eyeButton.type = 'button';
  eyeButton.className = 'btn btn-primary btn-style btn-change ml-2';
  eyeButton.setAttribute('data-bs-toggle', 'modal');
  eyeButton.setAttribute('data-bs-target', '#imageModal');
  eyeButton.setAttribute('data-validation', '');
  eyeButton.innerHTML = `<i class="fa-solid fa-eye"></i>`;

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'btn btn-danger btn-style btn-change ml-2';
  removeButton.onclick = () => removeFileInput(fileInputContainer);
  removeButton.setAttribute('data-validation', '');
  removeButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  fileInputContainer.appendChild(imageButton);
  fileInputContainer.appendChild(remarkInput);
  fileInputContainer.appendChild(eyeButton);
  fileInputContainer.appendChild(removeButton);
  fileInputContainer.appendChild(fileInput);

  container.appendChild(fileInputContainer);

  let fileUrl = '';

  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        fileUrl = e.target.result;
        eyeButton.dataset.fileUrl = fileUrl;
      };
      reader.readAsDataURL(file);
    } else {
      fileUrl = '';
      eyeButton.dataset.fileUrl = '';
    }
  });

  eyeButton.addEventListener('click', function() {
    if (fileUrl) {
      document.getElementById('uploadedImage').src = fileUrl;
      document.getElementById('uploadedImage').style.display = 'block';
      document.getElementById('noImageMessage').style.display = 'none';
    } else {
      document.getElementById('uploadedImage').src = '';
      document.getElementById('uploadedImage').style.display = 'none';
      document.getElementById('noImageMessage').style.display = 'block';
    }
  });
}

function removeFileInput(container) {
  container.remove();
}

document.getElementById('imageInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const fileUrl = e.target.result;
      document.getElementById('uploadedImage').src = fileUrl;
      document.getElementById('uploadedImage').style.display = 'block';
      document.getElementById('noImageMessage').style.display = 'none';
    };
    reader.readAsDataURL(file);
  } else {
    document.getElementById('uploadedImage').src = '';
    document.getElementById('uploadedImage').style.display = 'none';
    document.getElementById('noImageMessage').style.display = 'block';
  }
});

document.getElementById('eyeBtn').addEventListener('click', function() {
  const uploadedImage = document.getElementById('uploadedImage');
  if (!uploadedImage.src) {
    uploadedImage.style.display = 'none';
    document.getElementById('noImageMessage').style.display = 'block';
  }
});
