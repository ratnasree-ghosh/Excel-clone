var thead_row = document.getElementById("thead-tr");
var tbody = document.getElementById("tbody");
var currrent_cell = document.getElementById("current-cell");
var bold_btn = document.querySelector(".bold-btn"); 
var italic_btn = document.querySelector(".italic-btn"); 
var underline_btn = document.querySelector(".underline-btn");
var font_family_btn = document.querySelector(".font-family-prop");
var font_size_btn = document.getElementsByClassName("font-size-prop")[0];
var left_btn = document.querySelector(".left");
var center_btn = document.querySelector(".center");
var right_btn = document.querySelector(".right");
var text_color = document.querySelector(".font-color-prop");
var bg_color = document.querySelector(".BGcolor-prop");
var copy_btn = document.querySelector(".copy");
var cut_btn = document.querySelector(".cut");
var paste_btn = document.querySelector(".paste");
var down_btn = document.getElementById("downBtn");

var cutValue = {};




var cols = 26;
var rows = 100;
var curr_cell;

for(var col=0; col<cols ; col++){
    var th = document.createElement("th");
    th.innerText = String.fromCharCode(65+col);
    thead_row.appendChild(th);
}


for(var row=0; row<rows; row++){
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.innerText = row+1;
    tr.appendChild(th);


    for(var col=0; col<cols; col++){
        var td = document.createElement("td");
        td.setAttribute("contenteditable", "true");
        td.setAttribute("spellcheck", "false");

        td.setAttribute("id", `${String.fromCharCode(65+col)} ${row+1}`);

        td.addEventListener("focus", (event) => {
            curr_cell = event.target;
            currrent_cell.value = event.target.id;
        });

        td.addEventListener("input", (event) => {
            updateJson(event.target);
        });
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

}

bold_btn.addEventListener("click", ()=> {

    if(curr_cell.style.fontWeight == "bold"){
        curr_cell.style.fontWeight = "normal";
    }else{
        curr_cell.style.fontWeight = "bold";
    }
    
    updateJson(curr_cell);
});

italic_btn.addEventListener("click", ()=> {

    if(curr_cell.style.fontStyle == "italic"){
        curr_cell.style.fontStyle = "normal";
    }else{
        curr_cell.style.fontStyle = "italic";
    }

    updateJson(curr_cell);
    
});

underline_btn.addEventListener("click", ()=> {

    if(curr_cell.style.textDecoration== "underline"){
        curr_cell.style.textDecoration = null;
    }else{
        curr_cell.style.textDecoration = "underline";
    }

    updateJson(curr_cell);
    
});

font_family_btn.addEventListener("change", ()=> {
    curr_cell.style.fontFamily = font_family_btn.value;
    updateJson(curr_cell);
});

font_size_btn.addEventListener("change", ()=> {
    
    curr_cell.style.fontSize = font_size_btn.value;
    updateJson(curr_cell);
});

left_btn.addEventListener("click", ()=> {

    if(center_btn.style.backgroundColor=="rgb(209, 216, 224)"){
        center_btn.style.backgroundColor= "rgb(236, 240, 241)";
    }

    if(right_btn.style.backgroundColor == "rgb(209, 216, 224)"){
        right_btn.style.backgroundColor= "rgb(236, 240, 241)";
    }

    left_btn.style.backgroundColor = "rgb(209, 216, 224)";
    curr_cell.style.textAlign = "left";

    updateJson(curr_cell);
});

center_btn.addEventListener("click", ()=> {

    if(right_btn.style.backgroundColor=="rgb(209, 216, 224)"){
        right_btn.style.backgroundColor= "rgb(236, 240, 241)";
    }

    if(left_btn.style.backgroundColor == "rgb(209, 216, 224)"){
        left_btn.style.backgroundColor= "rgb(236, 240, 241)";
    }

    center_btn.style.backgroundColor = "rgb(209, 216, 224)";
    curr_cell.style.textAlign = "center";

    updateJson(curr_cell);
});

right_btn.addEventListener("click", ()=> {

    if(center_btn.style.backgroundColor=="rgb(209, 216, 224)"){
        center_btn.style.backgroundColor= "rgb(236, 240, 241)";
    }

    if(left_btn.style.backgroundColor == "rgb(209, 216, 224)"){
        left_btn.style.backgroundColor= "rgb(236, 240, 241)";
    }


    right_btn.style.backgroundColor = "rgb(209, 216, 224)";
    curr_cell.style.textAlign = "right";

    updateJson(curr_cell);
});

text_color.addEventListener("input", ()=> {
    curr_cell.style.color = text_color.value;

    updateJson(curr_cell);
});

bg_color.addEventListener("input", ()=> {
    curr_cell.style.backgroundColor = bg_color.value;

    updateJson(curr_cell);
});

cut_btn.addEventListener("click", ()=> {
    cutValue = {
        style: curr_cell.style.cssText,
        text: curr_cell.innerText
    }

    curr_cell.style.cssText = null;
    curr_cell.innerText = null;

    updateJson(curr_cell);
});

copy_btn.addEventListener("click", ()=> {
    cutValue = {
        style: curr_cell.style.cssText,
        text: curr_cell.innerText
    }

    updateJson(curr_cell);
    
});

paste_btn.addEventListener("click", ()=> {
    curr_cell.style.cssText = cutValue.style;
    curr_cell.innerText = cutValue.text;

    updateJson(curr_cell);
});

var matrix = new Array(rows);

for(var i=0; i<rows; i++){
    matrix[i] = new Array(cols);

    for(var j=0; j<cols; j++){
        matrix[i][j] = {};
    }
}

function updateJson(cell){
    var json = {
        id: cell.id,
        text: cell.innerText,
        style: cell.style.cssText
    }

    var id = cell.id.split("");
    var i = id[2]-1;
    var j = id[0].charCodeAt(0)-65;

    matrix[i][j] = json;
}

down_btn.addEventListener("click", ()=> {
    const jsonString = JSON.stringify(matrix);

  // Create a Blob with the JSON data and set its MIME type to application/json
  const blob = new Blob([jsonString], { type: "application/json" });

  // Create an anchor element and set its href attribute to the Blob URL
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json"; // Set the desired file name

  // Append the link to the document, click it to start the download, and remove it afterward
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
})

document.getElementById("jsonFile").addEventListener("change", readJsonFile);

function readJsonFile(event) {
    var file = event.target.files[0];
  
    if (file) {
        var reader = new FileReader();
  
      reader.onload = function (e) {
        var fileContent = e.target.result;
  
        // {id,style,text}
        // Parse the JSON file content and process the data
        try {
          var jsonData = JSON.parse(fileContent);
          console.log("matrix2", jsonData);
          matrix = jsonData;
          jsonData.forEach((row) => {
            row.forEach((cell) => {
              if (cell.id) {
                var myCell = document.getElementById(cell.id);
                myCell.innerText = cell.text;
                myCell.style.cssText = cell.style;
              }
            });
          });
          // Process the JSON data as needed
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      };
  
      reader.readAsText(file);
    }
  }
