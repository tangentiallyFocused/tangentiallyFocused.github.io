let header_html = "";
header_html += '<div id="left-content">'
    header_html += '<a id="my_name" href="index.html">';
        header_html += '<h1 id="name_ab">';
            header_html += '<div id="name_a" class="name_part"></div>';
            header_html += '<div id="name_b" class="name_part"></div>';
        header_html += '</h1>';
        header_html += '<h1 id="name_cd">';
            header_html += '<div id="name_c" class="name_part"></div>';
            header_html += '<div id="name_d" class="name_part"></div>';
        header_html += '</h1>';
    header_html += '</a>';
    header_html += '<h4 id="education"></h4>';
header_html += '</div>';

header_html += '<div class="spacer"></div>';

header_html += '<div id="roles">';
header_html += '<h3 id="role_1"></h3>';
header_html += '<h3 id="role_2"></h3>';
header_html += '</div>';

let overlay_html = "";
overlay_html += '<img id="close_menu" class="menu_btn">';

document.getElementById("header_bar").innerHTML += header_html;
document.getElementById("overlay_menu").innerHTML += overlay_html + "\n";


import header from '/src/jsons/header_bar.json' with {type:"json"};

const cycle_ids = ["icon", "name_a", "name_b", "name_c", "name_d", "education", "role_1", "role_2"];

for(let idNum = 0; idNum < cycle_ids.length; idNum++) {
    let element_id = cycle_ids[idNum];

    header.forEach((part) => {
        if(element_id == part.name) {
            let element = document.getElementById(element_id);

            element.innerText = part.content;
        }
    })
};


import menu from '/src/jsons/overlay_menu.json' with {type:"json"};

// let overlay_html = "";
menu.forEach((tab) => {
    overlay_html = '<a id="' + tab.name + '" class="tab_btn" href="' + tab.redirect + '">' + tab.page + '</a>';
    document.getElementById("overlay_menu").innerHTML += overlay_html + "\n";
});

// open menu on click
function openNav() {
    // document.getElementById("projects_link").style.width = "100vw";
    // document.getElementById("about_link").style.width = "100vw";
    // document.getElementById("contact_link").style.width = "100vw";
    document.getElementById("projects_link").style.width = "100%";
    document.getElementById("about_link").style.width = "100%";
    document.getElementById("contact_link").style.width = "100%";
  
    // replace logo with x when nav is open
    let menuBox = document.getElementById("open_menu");
    menuBox.src = "/public/exit_menu.PNG";
    menuBox.style.visibility = "hidden";
    menuBox.style.zIndex = "-2";

    let closeBox = document.getElementById("close_menu");
    closeBox.style.visibility = "visible";
    closeBox.style.zIndex = "15";
    closeBox.alt = "close menu";
}

// close when someone clicks on the "x" symbol inside the overlay
function closeNav() {
    document.getElementById("projects_link").style.width = "0vw";
    document.getElementById("about_link").style.width = "0vw";
    document.getElementById("contact_link").style.width = "0vw";

    // replace logo with + when nav is closed
    let closeBox = document.getElementById("close_menu");
    closeBox.style.visibility = "hidden";


    let menuBox = document.getElementById("open_menu");
    menuBox.src = "/public/open_menu.PNG";
    menuBox.style.visibility = "visible";
    menuBox.style.zIndex = "0";
    menuBox.alt = "open menu";

}