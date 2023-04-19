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
    
});

italic_btn.addEventListener("click", ()=> {

    if(curr_cell.style.fontStyle == "italic"){
        curr_cell.style.fontStyle = "normal";
    }else{
        curr_cell.style.fontStyle = "italic";
    }
    
});

underline_btn.addEventListener("click", ()=> {

    if(curr_cell.style.textDecoration== "underline"){
        curr_cell.style.textDecoration = null;
    }else{
        curr_cell.style.textDecoration = "underline";
    }
    
});

font_family_btn.addEventListener("change", ()=> {
    curr_cell.style.fontFamily = font_family_btn.value;
});

font_size_btn.addEventListener("change", ()=> {
    
    curr_cell.style.fontSize = font_size_btn.value;
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
});

text_color.addEventListener("change", ()=> {
    curr_cell.style.color = text_color.value;
});

bg_color.addEventListener("change", ()=> {
    curr_cell.style.backgroundColor = bg_color.value;
});

cut_btn.addEventListener("click", ()=> {
    cutValue = {
        style: curr_cell.style.cssText,
        text: curr_cell.innerText
    }

    curr_cell.style.cssText = null;
    curr_cell.innerText = null;
});

copy_btn.addEventListener("click", ()=> {
    cutValue = {
        style: curr_cell.style.cssText,
        text: curr_cell.innerText
    }

    
});

paste_btn.addEventListener("click", ()=> {
    curr_cell.style.cssText = cutValue.style;
    curr_cell.innerText = cutValue.text;
});