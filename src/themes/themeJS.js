import projects from '/src/jsons/projects.json' with {type:"json"};
import themes from '/src/jsons/themes.json' with {type:"json"};

const url = window.location.href;

let tema, description = "";

themes.forEach((theme) => {
    if(url.includes(theme.page)) {
        tema = theme.name;
        description = theme.description;
    }
});

let titleSpots = document.getElementsByClassName("title");
for(let spot = 0; spot < titleSpots.length; spot++) {
    titleSpots[spot].innerText = tema;
}
document.getElementById("page_description").innerText = description;

let title, year, key_materials, image, image_alt, page_link, primary = "";

let projects_html = "";
let primary_html = "";
projects.forEach((project) => {
    project.themes.forEach((theme) => {
        if(theme == tema) {
            title = project.name;
            year = project.end_year;
            key_materials = project.key_materials;
            image = project.image;
            image_alt = project.image_alt;
            page_link = project.page;

            projects_html += '<div class="proj_card">';
                projects_html += '<div class="card_info" onclick="location.href=\'' + page_link + '\'";>';
                    projects_html += '<span class="card_title">' + title + '</span>';
                
                    projects_html += '<div class="bottom_info">'
                        projects_html += '<div class="info_left">'
                            projects_html += '<span class="year">' + year + '</span>';
                            projects_html += '<span class="key_materials">' + key_materials + '</span>';
                        projects_html += '</div>'

                        projects_html += '<div id="arrow">&#8594;</div>';
                    projects_html += '</div>';
                projects_html += '</div>';

                projects_html += '<img class="pic" src="/public' + image + '" alt="' + image_alt + '">' + '</img>';
                projects_html += '<div id="pic_overlay"></div>';

            projects_html += '</div>';

            if(project.primary == tema) {
                primary_html += project.name;
            }
            // if(project.primary == tema) {
            //     primary_html += '<div class="proj_card">';
            //         primary_html += '<div class="card_info" onclick="location.href=\'' + page_link + '\'";>';
            //             primary_html += '<span class="card_title">' + title + '</span>';
                    
            //             primary_html += '<div class="bottom_info">'
            //                 primary_html += '<div class="info_left">'
            //                     primary_html += '<span class="year">' + year + '</span>';
            //                     primary_html += '<span class="key_materials">' + key_materials + '</span>';
            //                 primary_html += '</div>'

            //                 primary_html += '<div id="arrow">&#8594;</div>';
            //             primary_html += '</div>';
            //         primary_html += '</div>';

            //         primary_html += '<img class="pic" src="/public' + image + '" alt="' + image_alt + '">' + '</img>';
            //         primary_html += '<div id="pic_overlay"></div>';

            //     primary_html += '</div>';
            // }

        }
    })
});
document.getElementById("theme_projects").innerHTML = projects_html;
document.getElementById("primary").innerText = primary_html;

// let projSpots = document.getElementsByClassName("pic");
// for(let pSpot = 0; pSpot < projSpots.length; pSpot++) {
//     let picW = projSpots[pSpot].
// }



// projects.forEach((project) => {
//     project.themes.forEach((theme) => {
//         if(theme == "interconnectivity") {
//             projects.forEach((project) => {
//                 title = project.name;
//                 year = project.end_year;
//                 key_materials = project.key_materials;
//                 image = project.image;
//                 image_alt = project.image_alt;
//                 page_link = project.page;

//                 projects_html += "project name: " + title + " end year: " + year + " key materials: " + key_materials;
//             })
//         }
//     })        
// });
// document.getElementById("theme_projects").innerHTML = projects_html;