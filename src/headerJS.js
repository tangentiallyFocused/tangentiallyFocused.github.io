let header_html = "";
header_html += '<img id="icon">';
header_html += '<div class="spacer"></div>';
header_html += '<div id="my_name">';
    header_html += '<div id="name_ab">';
        header_html += '<div id="name_a" class="name_part"></div>';
        header_html += '<div id="name_b" class="name_part"></div>';
    header_html += '</div>';
    header_html += '<div id="name_cd">';
        header_html += '<div id="name_c" class="name_part"></div>';
        header_html += '<div id="name_d" class="name_part"></div>';
    header_html += '</div>';
header_html += '</div>';
header_html += '<img id="open_menu" class="menu_btn">';

let overlay_html = "";
overlay_html += '<img id="close_menu" class="menu_btn">';

document.getElementById("header_bar").innerHTML += header_html;
document.getElementById("overlay_menu").innerHTML += overlay_html + "\n";


import header from '/src/jsons/header_bar.json' with {type:"json"};

const cycle_ids = ["icon", "name_a", "name_b", "name_c", "name_d", "open_menu", "close_menu"];

for(let idNum = 0; idNum < cycle_ids.length; idNum++) {
    let element_id = cycle_ids[idNum];

    header.forEach((part) => {
        if(element_id == part.name) {
            let element = document.getElementById(element_id);

            if(element.nodeName == "DIV") {
                element.innerText = part.content;
            } else if(element.nodeName == "IMG") {
                element.src = part.image;
                element.alt = part.image_alt;
                element.onclick = function(){window.location.href = part.on_click;}
            }
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
  
document.getElementById("open_menu").addEventListener('click', openNav);
document.getElementById("close_menu").addEventListener('click', closeNav);

// closes menu if user presses 'esc' key
document.addEventListener('keydown', (press) => {
    let closeBtn = document.getElementById("close_menu");

    if((closeBtn && closeBtn.checkVisibility()) && (press.key === 'Escape')) {
        closeNav();
    }
})

let footer_html = "";
footer_html += '<div id="copyright"></div>';
footer_html += '<div class="spacer"></div>';
footer_html += '<div id="footer_socials">';
    footer_html += "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-linkedin' viewBox='0 0 16 16' id='linkedin' onclick='javascript:window.open(\"https://linkedin.com/in/lara-bduquer-434297261/\", \"_blank\");'> <path d='M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z'/> </svg>";
    footer_html += '<span>•</span>';
    footer_html += '<email id="email"></email>';
footer_html += '</div>';
document.getElementById("footer_bar").innerHTML += footer_html;

import footer from '/src/jsons/footer_bar.json' with {type:"json"};

const cycle_fids = ["copyright", "email"];

for(let idNum = 0; idNum < cycle_ids.length; idNum++) {
    let element_id = cycle_fids[idNum];

    footer.forEach((part) => {
        if(element_id == part.name) {
            let element = document.getElementById(element_id);

            if(part.content != undefined) {
                element.innerText = part.content;
            }
        }
    })
};