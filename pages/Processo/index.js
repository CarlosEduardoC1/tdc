export const html = `<!DOCTYPE html>
  <html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
  .file {
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
  }
  .file-name {
    position: absolute;
    bottom: -35px;
    left: 10px;
    font-size: 0.85rem;
    color: #555;
  }
  .file-input label {
    display: block;
    position: relative;
    width: '100%';
    height: 50px;
    border-radius: 25px;
    background: purple;
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: transform .2s ease-out;
  }

  </style>
  </head>
  <body>
  <div class="file-input">
  <input id="inptFile" type="file" onchange='getImage()' multiple class="file"/>
  <label for="inptFile">
    Selecione os arquivos
    <p class="file-name"></p>
  </label>
  </div>
  </body>
  <script>
   function getImage() {
    var f = document.getElementById("inptFile").files;

  //  window.ReactNativeWebView.postMessage(f.length);
    
    for(var i = 0; i < f.length; i++){
      var reader = new FileReader();
      window.ReactNativeWebView.postMessage("name"+f[i].name);
      reader.onloadend = function() {
        window.ReactNativeWebView.postMessage(reader.result);
          }
          
      reader.readAsDataURL(f[i]);

    }





      // reader.onloadend = function () {
      //      window.ReactNativeWebView.postMessage(reader.result);
      //   }
    // reader.readAsDataURL(f[0]);
      
    } 

   function returnBase64(obj, i){
    }



  </script>
  </html>`