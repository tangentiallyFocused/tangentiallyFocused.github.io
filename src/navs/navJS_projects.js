// import projects from '/src/jsons/projects.json';
import projects from '/src/jsons/projects.json' with { type: "json" };

let title, year, key_materials, image, image_alt, page_link, project_card = "";

let projects_html = "";
projects.forEach((project) => {
    title = project.name;
    year = project.end_year;
    key_materials = project.key_materials;
    image = project.image;
    image_alt = project.image_alt;
    page_link = project.page;

    // projects_html += '<div class="proj_card" onclick="location.href=\'' + page_link + '\'";>';
    projects_html += '<div class="proj_card">';
    
    // projects_html += '<img class="pic" src="' + image + '" alt="' + image_alt + '">' + '</img>';
        
        // projects_html += '<span class="card_title">' + title + '</span>';


        projects_html += '<div class="card_info" onclick="location.href=\'' + page_link + '\'";>';
                
            projects_html += '<span class="card_title">' + title + '</span>';
            
            projects_html += '<div class="bottom_info">'
                projects_html += '<div class="info_left">'
                    projects_html += '<span class="year">' + year + '</span>';
                    projects_html += '<span class="key_materials">' + key_materials + '</span>';
                projects_html += '</div>'

                projects_html += '<div id="arrow">&#8594;</div>';
                // projects_html += '<div id="arrow" onclick="location.href=\'' + page_link + '\'";>&#8594;</div>'; //or should this be span?
            projects_html += '</div>';
        projects_html += '</div>'; // end div .card_info
        
        projects_html += '<img class="pic" src="/public' + image + '" alt="' + image_alt + '">' + '</img>';

    projects_html += '</div>'; // end div .proj_card
});
document.getElementById("projects").innerHTML = projects_html;

// let card_counts = document.getElementsByClassName("proj_card");
//     for(let count = 0; count < card_counts.length; count++) {
//         // card_counts[count].innerText = materials_split;
//         card_counts[count].style.backgroundImage = url(project.image);
//         card_counts[count].style.backgroundSize = 'cover';
//     }