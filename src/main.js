//const fs = require('fs');
//import fs from 'fs';

import cytoscape from 'cytoscape';
// import cyqtip from 'cytoscape-qtip';

// cyqtip( cytoscape ); // register extension

let searchBar = document.getElementById("search-bar");
// document.getElementById('cy').style.backgroundColor = 'green';


// page nodes
import projects from './projects.json';
import themes from './themes.json';
console.log(projects);
console.log(themes);
const nodes_formatted_for_cytoscape = projects.map((project) => {
  return {
    data: {
      id: project.name,
      type: "project",
      page: project.page
    }
  }
})
nodes_formatted_for_cytoscape.push(...themes.map((theme) => {
  return {
    data: {
      id: theme.name,
      type: "theme",
      page: theme.page
    }
  }
}))

// highlighting nodes
import formats from './formats.json';
import collaborations from './collaborations.json';
import materials from './materials.json';
console.log(formats);
console.log(collaborations);
console.log(materials);
nodes_formatted_for_cytoscape.push(...formats.map((format) => {
  return {
    data: {
      id: format.name,
      type: "format"
    }
  }
}))
nodes_formatted_for_cytoscape.push(...collaborations.map((collaboration) => {
  return {
    data: {
      id: collaboration.name,
      type: "collaboration"
    }
  }
}))
nodes_formatted_for_cytoscape.push(...materials.map((material) => {
  return {
    data: {
      id: material.name,
      type: "material"
    }
  }
}))

// .sort(() => .5 - Math.random());

console.log(nodes_formatted_for_cytoscape);

const edges = projects.flatMap((project) => {
  return [
    { // edge format
      data: { id: `${project.name}-${project.format}`, source: project.name, target: project.format }
    },
    ...project.themes.map((theme) => ({ // edge theme
        data: { id: `${project.name}-${theme}`, source: project.name, target: theme }
      })),
    ...project.materials.map((material) => ({ // edge theme
        data: { id: `${project.name}-${material}`, source: project.name, target: material }
      })),
    { // edge collaboration
      data: { id: `${project.name}-${project.collaboration}`, source: project.name, target: project.collaboration }
    },
  ]
});

console.log(edges);

  // { // dates

var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [ // list of graph elements to start with
    ...nodes_formatted_for_cytoscape, ...edges
  ],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        // 'background-color': '#666',
        // 'background-color': 'rgb(0,0,161)',
        // 'label': 'data(id)'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier'
      }
    },

    //project node
    {
      selector: 'node[type = "project"]',
      style: {
        'background-color': 'magenta',
        'label': 'data(id)'
      }
    },
    //theme node
    {
      selector: 'node[type = "theme"]',
      style: {
        'background-color': 'magenta',
        'label': 'data(id)'
      }
    },
    //format node
    {
      selector: 'node[type = "format"]',
      style: {
        'background-color': 'yellow',
        'width': 15,
        'height': 15,
        'shape': 'round-pentagon',
        'label': 'data(id)'
      }
    },
    //collaboration node
    {
      selector: 'node[type = "collaboration"]',
      style: {
        'background-color': 'yellow',
        'width': 15,
        'height': 15,
        'shape': 'round-pentagon',
        'label': 'data(id)'
      }
    },
    //material node
    {
      selector: 'node[type = "material"]',
      style: {
        'background-color': 'yellow',
        'width': 15,
        'height': 15,
        'shape': 'round-pentagon',
        'label': 'data(id)'
      }
    },
  ],

  layout: {
    name: 'random',
  },
});

// cy.on('click', 'node', (evt) => {
//   var node = evt.target;
//   console.log('clicked ' + node.id());
// });
cy.on('mouseover', 'node', function (evt) {
  var node = evt.target;
  // node.style("")
  node.style("background-color", "blue");

  restore();
  cy.nodes().filter((e) => {
    if (!node.closedNeighborhood().includes(e && e!==node)) {
      console.log(node.closedNeighborhood())
      // removed.push(cy.remove(e))
    }
  })
  console.log("yello", cy.nodes());

  node.connectedEdges().forEach((edge) => {
    edge.style("line-color", "red")
  })
});

// cy.nodes().on('click', 'node[type = "project"]', (node) => {
//   console.log("clicked node");
//   console.log(node.target);
//   // window.location.href = node.page;
// });

cy.nodes('node[type="project"]').forEach((node) => {
	node.on('click', (e) => {
    // console.log("bleh", e.target.data("page"));
    window.location.href = e.target.data("page");
  })
});

cy.nodes('node[type="theme"]').forEach((node) => {
	node.on('click', (e) => {
    // console.log("bleh", e.target.data("page"));
    window.location.href = e.target.data("page");
  })
});


cy.maxZoom(2);
cy.minZoom(0.7);
cy.center();

// (evt) is an anon function bc it's a function that nothing else will ever need to call
// => is so that you don't need to write the word function (it's a js shortcut; "syntactic candy")
cy.on('mouseout', 'node', (evt) => {
  var node = evt.target;
  node.style("background-color", "green");
  console.log(node.connectedEdges())
  node.connectedEdges().forEach((edge) => {
    edge.style("line-color", "blue")
  })
});
let removed = []

// searchBar.addEventListener("input", (target) => {
//   console.log(target)
//   console.log("in graveyard before restore", removed)
//   restore()
//   console.log("in graveyard after restore", removed)

//   if (searchBar.value) {
//     cy.nodes().filter(node => {
//       console.log(node.data("id"))
//       if (!node.data("id").toLowerCase().includes((searchBar.value || "").toLowerCase())) {
//         removed.push(cy.remove(node))
//       }
//     });
//   }
//   console.log("in graveyard after search", removed)

// })

function restore() {
  removed.forEach((e) => {
    e.nodes().restore()
  })
  removed.forEach((e) => {
    e.edges().restore()
  })
  removed = []
}


//checkbox filters

let formatFilt = document.getElementById("formatFilter");
let formatKids = document.querySelectorAll(".formatChild");

formatFilt.addEventListener('change', () => {
  formatKids.forEach(checkbox => {
    checkbox.checked = formatFilt.checked;
  });
});







// if id is
//   if id != typeFilter || themeFilter || subjectFilter || collabFilter || materFilter
//     then ignore

//   if id == typeFilter && typeFilter.checked
//     then check typeBoxes

//   if id == themeFilter && themeFilter.checked
//     then check themeBoxes

//   if id == subjectFilter && subjectFilter.checked
//     then check subjectBoxes

//   if id == collabFilter && collabFilter.checked
//     then check collabBoxes

//   if id == materFilter && materFilter.checked
//     then check materBoxes




// function checkTypes() {
//   let typeFilt = document.getElementById("typeFilter");

//   if(typeFilt.chec)
// }

// var empty = [].filter.call(checkbox, (el) => {
//   console.log(!el.checked);
//   return !el.checked
// });

// if (checkbox.length == empty.length) {
//    alert("None filled");
//   //  return false;
// }


// open when someone clicks on the span element
function openNav() {    
  document.getElementById("projectsLink").style.width = "100%";
  document.getElementById("aboutLink").style.width = "100%";
  document.getElementById("contactLink").style.width = "100%";

  // replace logo with x when nav is open
  let logoBox = document.getElementById("icon");
  logoBox.src = "/public/exitMenu.PNG";
  logoBox.class = "closebtn";
  
  // logoBox.onclick = closeNav();
}

// close when someone clicks on the "x" symbol inside the overlay
function closeNav() {
  document.getElementById("projectsLink").style.width = "0%";
  document.getElementById("aboutLink").style.width = "0%";
  document.getElementById("contactLink").style.width = "0%";
}


let logo = document.getElementById("icon").addEventListener('click', openNav);



var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}