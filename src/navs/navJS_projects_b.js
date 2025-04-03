import projects from '/src/jsons/projects.json';

let title, year, key_materials, image, image_alt, page_link, project_card = "";

let projects_html = "";
projects.forEach((project) => {
    title = project.name;
    year = project.end_year;
    key_materials = project.key_materials;
    image = project.image;
    image_alt = project.image_alt;
    page_link = project.page;

    projects_html += '<div class="proj_card" onclick="location.href=\'' + page_link + '\'";>';
        projects_html += '<img class="image" src="' + image + '" alt="' + image_alt + '">' + '</img>';
        
        projects_html += '<span class="title">' + title + '</span>';

        projects_html += '<div class="card_info">';
            
            projects_html += '<span class="year">' + year + '</span>';
            projects_html += '<span class="key_materials">' + key_materials + '</span>';
        projects_html += '</div>';


    projects_html += '</div>';
});
document.getElementById("projects").innerHTML = projects_html;