export function uploadImg(inp,img,btn,cancel){
    console.log('1')
    $(inp).change(function(event) {
        var file = event.target.files[0];
        if (file) {
          var reader = new FileReader();
          reader.onload = function(e) {
            $(img).attr('src', e.target.result);
            $(cancel).css('display', 'inline-block');
            $(btn).css('display', 'none');
          };
          reader.readAsDataURL(file);
        }
      });
    
      $(cancel).click(function() {
        $(img).attr('src', '');
        $(cancel).css('display', 'none');
        $(btn).css('display', 'inline-block');
        $(inp).val(null); // Clear the file input (optional)
      });
}