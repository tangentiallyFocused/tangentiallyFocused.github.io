import about from '/src/jsons/about.json' with {type:"json"};

let me_image, me_image_alt, me_image_id, resume, resume_alt = "";

// let about_left_html = "";
// about.forEach((element) => {
//     resume = element.resume;
//     resume_alt = element.resume_alt;

//     about_left_html += '<embed id="resume" src="' + resume + '" alt="' + resume_alt + '" type="application/pdf" width="95%" height"500vh">';

// });
// document.getElementById("content_left").innerHTML += about_left_html;

let about_right_html = "";
about.forEach((element) => {
    me_image = element.me_image;
    me_image_alt = element.me_image_alt;
    me_image_id = element.me_image_id;

    let me_image_split, me_alt_split, me_id_split = "";
    if(me_image.length > 1) {
        for(let spot = 0; spot < me_image.length; spot++) {
            me_image_split = me_image[spot].toString();
            me_alt_split = me_image_alt[spot].toString();
            me_id_split = me_image_id[spot].toString();
            about_right_html += '<img id="' + me_id_split + '" class="me_pic" src="/public' + me_image_split + '" alt="' + me_alt_split + '">';
        }
    } else {
        materials_split = materials[0].toString();
    }

});
document.getElementById("me_pics").innerHTML = about_right_html;

let resume_html = "";
about.forEach((element) => {
    resume = element.resume;
    resume_alt = element.resume_alt;

    resume_html += '<embed id="resume" src="/public' + resume + '" alt="' + resume_alt + '" type="application/pdf" width="95%" height"500vh">';

});
document.getElementById("resume_section").innerHTML += resume_html;    

let resume_link = document.getElementById("resume_link");
resume_link.addEventListener("click", () => {
    const resume_section = document.getElementById("resume_section");
    resume_section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
})

let dynamic_link = document.getElementById("dynamic_resume_link");
dynamic_link.addEventListener("click", () => {
    const dynamic_resume_section = document.getElementById("dynamic_resume_section");
    dynamic_resume_section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
})