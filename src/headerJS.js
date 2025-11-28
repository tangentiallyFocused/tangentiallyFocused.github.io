let header_html = "";
header_html += '<div id="left-content">'
    header_html += '<a id="my_name" href="#hero-section">';
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
header_html += '<h3 id="role_1" class="role"></h3>';
header_html += '<h3 id="role_2" class="role"></h3>';
header_html += '</div>';

let overlay_html = "";
overlay_html += '<img id="close_menu" class="menu_btn">';

document.getElementById("header_bar").innerHTML += header_html;

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