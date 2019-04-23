/* paste_image CKEDITOR plugin
 * Copyright(C) 2019 Henry Kroll III, thenerdshow.com
 * Apache 2.0 License
 * Implements local inline image paste/drop/upload from files/image editors
 */
 CKEDITOR.plugins.add( 'paste_image', {
    init: function(editor){
        const maxdata = 10000; // max dataURL size < 32768
        var URLObj = window.URL || window.webkitURL;
        function tooBig(){
alert("Image too large for inline inclusion. Solutions:\n\n"
        +"\t1) Reduce image size using a graphics editor\n"
        +"\t2) Upload the image to the web if it isn't already\n"
        +"\t3) Drag and drop from a web page");
        }
        
        editor.on('instanceReady', function(e){
// All pasted and dropped content is handled in one event - editor#paste
// https://github.com/ckeditor/ckeditor-sdk/blob/master/samples/draganddrop.html
            editor.on('paste', function(e){
                var src, fb;
                if (e.data.dataValue) return; // already handled elsewhere
                for (var i = e.data.dataTransfer.getFilesCount();i--;){
                    if (fb = e.data.dataTransfer.getFile(i)){
                        src = URLObj.createObjectURL(fb);
                        if (fb.size < maxdata){
                            blobtodataURL(src);
                            e.data.dataValue += "<img src='" + src + "'>";
                        } else tooBig();
                    }
                } // on reposition, fb is null; do nothing
            });
        });
        
        function blobtodataURL(src){
            var fr = new FileReader();
            fr.onload = function(e){
                // by the time this runs, blob:url is on page
                var dataURL = e.target.result;
                dataURL = dataURL.replace(/^data:text\/plain/,
                    "data:image/png");
                // find blob image and change to dataURL
                var img = editor.document.find("img[src^=blob]").getItem(0)
                // Use CKEDITOR method of changing img.src
                if (img){
                    img.data("cke-saved-src", dataURL);
                    img.$.src = dataURL;
                }
            }
            // what is blob URL? https://stackoverflow.com/questions/30864573/what-is-a-blob-url-and-why-it-is-used
            // convert blob URL to blob https://stackoverflow.com/questions/40606720/convert-blob-string-url-to-blob-then-to-base64
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (){
                if (this.readyState == 4 && this.status == 200){
                    var blob = this.response;
                    if (blob != undefined){
                        fr.readAsDataURL(blob);
                    }
                }
            }
            xhr.open('GET', src);
            xhr.responseType = 'blob';
            xhr.send();
        }
        
        // implement image upload in image dialog
        var imageLoader = document.createElement('input');
        imageLoader.id  = "imageLoader";
        imageLoader.type = "file";
        imageLoader.title = "upload image";
        editor.on('afterCommandExec', function(e){
            var commandName = e.data.name;
            var counter = 10; // try 10 times
            function addUpload(){
                counter --;
                // add upload button to image dialog
                var foot = document.querySelector(".cke_dialog_footer");
                if (foot){
                    var firstChild = foot.firstChild;
                    foot.insertBefore(imageLoader, firstChild);
                } else if (counter) window.setTimeout(addUpload, 500);
            }
            // wait for user to press image button
            if (commandName == 'image') window.setTimeout(addUpload, 500);
        });
        
        // when user chooses an image to upload from files dialog
        imageLoader.addEventListener('change', function (e){
            if(FileReader){
                var reader = new FileReader();
                reader.onload = function(event){
                    var dialog = document.querySelector(".cke_dialog_body");
                    var inputs = dialog.querySelectorAll("input");
                    var preview = dialog.querySelector(
                        "div.ImagePreviewBox > table > tbody > tr > td > a > img");
                    var src = event.target.result;
                    if (src.length < maxdata){
                        // create temp div with image
                        var div = document.createElement("div");
                        var img = document.createElement("img");
                        img.src = src;
                        div.appendChild(img);
                        inputs[0].value = src;  // put URL into text field
                        inputs[1].value = "dataURL";  // add alt tag
                        preview.src = src;      // put image into image preview
                        preview.style.display = "initial"; // display it
                        imageLoader.value="";
                    } else tooBig();
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        }, false);
    }
});
