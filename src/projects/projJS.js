// import projects from '/src/jsons/projects.json';
import projects from '/src/jsons/projects.json' with { type: "json" };

const url = window.location.href;

// INITIALIZING EMPTY STRINGS
let title, start_month, start_year, end_month, end_year, role, themes, collaborators, materials, des_materials, image, image_alt, iframe, iframe_alt = "";

// ASSIGNING VALUES FOR EACH PROJECT
projects.forEach((project) => {
    // GETTING THE CORRECT PROJECT
    if(url.includes(project.page)) {
        // ASSIGNING THE CORRECT VALUES FOR EACH PROJECT TO THE CORRECT EMPTY STRINGS
        title = project.name;
        start_month = project.start_month;
        start_year = project.start_year;
        end_month = project.end_month;
        end_year = project.end_year;
        role = project.role;
        themes = project.themes;
        collaborators = project.collaborators;
        // materials = project.materials.toString();
        materials = project.materials;
        image = project.image;
        image_alt = project.image_alt;
        iframe = project.iframe;
        iframe_alt = project.iframe_alt;
        des_materials = project.des_materials;
    }
})

// IMPLEMENTING THE CORRECT VALUES TO THE CORRECT HTML ELEMENT
let titleSpots = document.getElementsByClassName("title");
for(let spot = 0; spot < titleSpots.length; spot++) {
    titleSpots[spot].innerText = title;
}

let dates = "";
if((start_month != "-") && (start_year != end_year)) {
    dates += start_month + " " + start_year + " – ";
} else if ((start_month != "-") && (start_month != end_month) && (start_year == end_year)) {
    dates += start_month + " – ";
} else if ((start_month == end_month) && (start_year != end_year)) {
    dates += start_year + " – ";
} else {
    dates;
}

if((end_month != "-")) {
    dates += end_month + " " + end_year;
} else {
    dates += end_year;
}
document.getElementById("dates").innerText = dates;



// if(start_month == "-") {
//     document.getElementById("dates").innerText = start_year  + " – " + end_month + " " + end_year;    
// }


// document.getElementById("dates").innerText = start_month + " " + start_year  + " – " + end_month + " " + end_year;

document.getElementById("role").innerText = role;

if(themes.length > 0) {
    let themes_split = "";
    if(themes.length > 2) {
        for(let spot = 0; spot < themes.length-1; spot++) {
            themes_split += themes[spot].toString() + ", ";
        }
        themes_split += themes[themes.length-1].toString();
    } else if (themes.length == 2) {
        themes_split += themes[0].toString() + " & " + themes[1].toString();
    } else {
        themes_split = themes[0].toString();
    }
    document.getElementById("themes").innerText = themes_split;
}

document.getElementById("collaborators").innerText = collaborators;


if(materials.length > 0) {
    let materials_split = "";
    if(materials.length > 2) {
        for(let spot = 0; spot < materials.length-1; spot++) {
            materials_split += materials[spot].toString() + ", ";
        }
        materials_split += materials[materials.length-1].toString();
    } else if (materials.length == 2) {
        materials_split += materials[0].toString() + " & " + materials[1].toString();
    } else {
        materials_split = materials[0].toString();
    }

    let materialSpots = document.getElementsByClassName("materials");
    if(materialSpots.length > 1) {
        for(let spot = 0; spot < materialSpots.length; spot++) {
            materialSpots[spot].innerText = materials_split;
        }
    } else {
        materialSpots[0].innerText = materials_split;
    }
}

document.getElementById("year").innerText = end_year;

document.getElementById("des_materials").innerText = des_materials[0].toString();

if((image.length > 0)) {
    if((title != "Study Spreadsheet") && (title != "'Snow White' Variants")) {
        document.getElementById("works").innerHTML += "<img id='image1'></img>";
        image1.src = "/public" + image[0].toString();
        image1.alt = image_alt[0].toString();
        // image1.width = 500;
        // image1.style.width = "500px";
    }
}

if(iframe.length > 0 && iframe !== undefined) {
    document.getElementById("works").innerHTML += "<iframe id='iframe1'></iframe>";
    let iframe1 = document.getElementById("iframe1");
    iframe1.src = iframe[0].toString();
    iframe1.alt = iframe_alt[0].toString();
    iframe1.frameborder = 0;

    iframe.width = "100%";

    // iframe1.allowfullscreen = "true";
    
}