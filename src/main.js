//const fs = require('fs');
//import fs from 'fs';

import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
// import cola from 'cytoscape-cola';
// import elk from 'cytoscape-elk';
 
cytoscape.use(fcose);
// cytoscape.use(elk);
// cytoscape.use(cola);

// import cyqtip from 'cytoscape-qtip';

// cyqtip( cytoscape ); // register extension

// document.getElementById('cy').style.backgroundColor = 'green';

// const url = window.location.href;

// page nodes
import projects from './jsons/projects.json';
import themes from './jsons/themes.json';
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
import formats from './jsons/formats.json';
import materials from './jsons/materials.json';
console.log(formats);
console.log(materials);
nodes_formatted_for_cytoscape.push(...formats.map((format) => {
  return {
    data: {
      id: format.name,
      type: "format"
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
    // edge format : project name --> format
    { 
      data: { id: `${project.name}-${project.format}`, source: project.name, target: project.format }
    },
    // edge format : format --> name
    {
      data: { id: `${project.format}-${project.name}`, source: project.format, target: project.name }
    },
    // edge theme : name --> theme
    ...project.themes.flatMap((theme) => [{
        data: { id: `${project.name}-${theme}`, source: project.name, target: theme }
      },
    // edge theme : theme --> name
      {
        data: { id: `${theme}-${project.name}`, source: theme, target: project.name }
      }]),
    // edge material : name --> material
    ...project.materials.flatMap((material) => [{ // edge theme
        data: { id: `${project.name}-${material}`, source: project.name, target: material }
      },
      // edge material : material --> name
      {
        data: { id: `${material}-${project.name}`, source: material, target: project.name }
      }]),
  ]
});

console.log(edges);


// function materialFilter(jsonFile) {
//   // const materialFile = jsonFile;
//   console.log(jsonFile.length);
//   for(let grouping = 0; grouping < jsonFile.length; grouping++) {
//     let materialObject = jsonFile[grouping];
//     // const materialShort = materialText.split(" ").toLowerCase();
//     let materialShort = materialObject.name;
//     let mobj = materialObject.toString();
//     let mstr = materialShort.toString();
//     let mshrt = materialShort.replaceAll(' ', '').toString().toLowerCase().substring(0,10);
//     let code = "<input type='checkbox' id='" + `${mshrt}` + "Filter' name='" + `${mstr}` + "'>\n<label for=" + mshrt + "Filter> " + mstr + "</label><br>\n";

//     document.getElementById("test").innerHTML = code;
   
//     console.log(code);
//   }
  
// }
// console.log(materialFilter(materials));

  // { // dates

// import constants from '/src/constants.css' with {type:'css'};
// const constants = await import('/src/constants.css', {assert: { type:'css'}});
// document.adoptedStyleSheets[constants.default];

var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [ // list of graph elements to start with
    ...nodes_formatted_for_cytoscape, ...edges
  ],

  style: [ // the stylesheet for the graph
    // 'node' components
    {
      selector: 'node',
      style: {
        'font-family': 'Atkinson Hyperlegible',
        // 'font-feature-settings': "'cv01', 'cv06', 'cv10', 'ss05'"
      }
    },
    // edge components
    { 
      selector: 'edge',
      style: {
        'width': 1.5,
        'line-color': '#ccc',
        // 'target-arrow-color': '#ccc',
        // 'target-arrow-shape': 'triangle',
        'curve-style': 'straight',
        'opacity': '0.5'
      }
    },

    //project node
    {
      selector: 'node[type = "project"]',
      style: {
        'background-color': 'rgb(142,58,89)',
        'color': 'rgb(255, 250, 245)', // --md-on-primary: rgb(255, 250, 245)
        'label': 'data(id)',
        // 'font-size': 13,
        'font-size': 18,

        'text-valign': 'center',
        'text-halign': 'center',
        'text-wrap': 'wrap',
        'width': 'label',
        'width': 'label',
        'height': 'label',
        'padding': '5px',
        // 'padding': '8px',
        // 'padding': '8px',
        'text-justification': 'center',
        'shape': 'roundrectangle',
        'text-max-width': '125px',
        // 'font-size': '8'
        'border-width': '5',
        'border-color': 'rgb(142,58,89)'
      }
    },
    //theme node
    {
      selector: 'node[type = "theme"]',
      style: {
        'border-width': '2',
        'border-color': 'rgb(142,58,89)', // --md-primary: rgb(142,58,89)
        'background-color': 'rgb(255, 253, 250)', // --md-surface-bright: rgb(255, 253, 250)
        // 'border-color': 'var(--theme-interaction, rgb(142,58,89))',
        // 'background-color': 'rgb(142,58,89)',
        'label': 'data(id)',
        'color': 'rgb(0, 49, 83)', // --md-primary: rgb(0, 49, 83)
        // 'font-size': 13,
        'font-size': 24,

        'text-valign': 'center',
        'text-halign': 'center',
        'text-wrap': 'wrap',
        'width': 'label',
        'height': 'label',
        'padding': '5px',
        'text-justification': 'center',
        'shape': 'roundrectangle',
        'text-max-width': '125px',
        // 'font-size': '8'
      }
    },
    //format node
    {
      selector: 'node[type = "format"]',
      style: {
        'background-color': 'rgb(255,244,79)',
        'border-color': 'rgb(0,49,83)',
          // changes & adds border color to prussian blue on hover
        'border-width': '2px',
        'color': 'rgb(40, 30, 0)', // --md-on-secondary: rgb(40, 30, 0)
        'width': 15,
        'height': 15,
        // 'shape': 'round-pentagon',
        'label': 'data(id)',
        'font-size': 14,
        // // 'color': 'darkorange',

        'text-valign': 'center',
        'text-halign': 'center',
        'text-wrap': 'wrap',
        'width': 'label',
        'height': 'label',
        'padding': '5px',
        'text-justification': 'center',
        'shape': 'roundrectangle',
        'text-max-width': '125px',
        // 'font-size': '8'
      }
    },
    //material node
    {
      selector: 'node[type = "material"]',
      style: {
        'background-color': 'rgb(255,244,79)',
        'border-color': 'rgb(0,49,83)',
          // changes & adds border color to prussian blue on hover
        'border-width': '2px',
        'width': 15,
        'height': 15,
        // 'shape': 'round-pentagon',
        'label': 'data(id)',
        'font-size': 14,
        // 'color': 'darkorange',

        'text-valign': 'center',
        'text-halign': 'center',
        'text-wrap': 'wrap',
        'width': 'label',
        'height': 'label',
        'padding': '5px',
        'text-justification': 'center',
        'shape': 'roundrectangle',
        'text-max-width': '125px',
        // 'font-size': '8'
      }
    },

    {
      selector: 'node.theFocus',
      style: {
        // 'background-color': 'rgb(0,49,83)',
        'border-color': 'rgb(0,49,83)',
          // changes & adds border color to prussian blue on hover
        'border-width': '2px',
        'z-index': '2', // brings the nodes forward so as to avoid any additional ndoes hiding/covering it
        'font-weight': '800'
      }
    },
    {
      selector: 'node.semitransp',
      style: {
        // 'opacity': '0.5',
        'opacity': '0.2',
        'color': 'black'
        // 'z-index': '-5'
      }
    },
    {
      selector: 'edge.theFocus',
      style: {
        // 'mid-target-arrow-color': 'orange',
        'line-color': "rgb(0,49,83)",
        // 'target-arrow-color': 'rgb(0,49,83)',
        'z-index': '3',
        'opacity': '1'
      }
    },
    {
      selector: 'edge.semitransp',
      style: {
        'opacity': '0.2',
        // 'z-index': '-5'
      }
    }
  ],

  // node layout
  layout: {
    // name: 'random',

    name: 'fcose',
    randomize: true,
    animationDuration: 50,
    gravity: 0.25,
    nestingFactor: 0.05,
    nestingFactor: 0.5,
    edgeElasticity: edge => 0.05,
    nodeRepulsion: node => 4500,
    idealEdgeLength: edge => 50,
    nodeSeparation: 2000,
    numIter: 2500,
    fit: true,
    packComponents: true,
    samplingType: false,
    nodeDimensionsIncludeLabels: true
  },

  // CRITICAL: Start with zoom and pan DISABLED ** FROM CLAUDE AI
  // userZoomingEnabled: false,
  // userPanningEnabled: false,
  // boxSelectionEnabled: false
});

// Store original positions after layout ** FROM CLAUDE
const originalPositions = {};
cy.nodes().forEach(node => {
    const pos = node.position();
    originalPositions[node.id()] = { x: pos.x, y: pos.y };
});

// Each node gets unique phase offsets for organic movement ** FROM CLAUDE AI
const nodePhases = {};
cy.nodes().forEach(node => {
    nodePhases[node.id()] = {
        xPhase: Math.random() * Math.PI * 2,      // Random starting point
        yPhase: Math.random() * Math.PI * 2,
        xFreq: 0.8 + Math.random() * 0.4,         // Slight frequency variation
        yFreq: 0.8 + Math.random() * 0.4
    };
});

let time = 0;
let jiggleStrength = 2;
let movementSpeed = 0.01;
// let movementSpeed = 0.005;
let animationRunning = true;

// Animation loop
function animate() {
    if (!animationRunning) return;
    
    time += movementSpeed;
    
    cy.nodes().forEach(node => {
        const original = originalPositions[node.id()];
        const phases = nodePhases[node.id()];
        
        // Sine waves create smooth circular/elliptical motion
        const offsetX = Math.sin(time * phases.xFreq + phases.xPhase) * jiggleStrength;
        const offsetY = Math.sin(time * phases.yFreq + phases.yPhase) * jiggleStrength;
        
        node.position({
            x: original.x + offsetX,
            y: original.y + offsetY
        });
    });
    
    requestAnimationFrame(animate);
}

animate(); // END SECTION FROM CLAUDE AI

// cy.nodes().noOverlap({padding: 15});

// cy.on('click', 'node', (evt) => {
//   var node = evt.target;
//   console.log('clicked ' + node.id());
// });

// mouseOVER behaviour on nodes & edges
// cy.on('mouseover', 'node', function (evt) {
//   var node = evt.target;
//   // node.style("")
//   node.style("background-color", "rgb(0,49,83)");

//   restore();

  

//   // cy.nodes().filter((e) => {
//   //   if (!node.closedNeighborhood().includes(e && e!==node)) {
//   //     console.log(node.closedNeighborhood())
//   //     // removed.push(cy.remove(e))
//   //   }
//   // })
//   // console.log("yello", cy.nodes());

//   // node.connectedEdges().forEach((edge) => {
//   //   edge.style("line-color", "red")
//   // })
// });

// FOR DESKTOP
cy.on("mouseover", "node", (e) => {
  var sel = e.target;

  cy.elements().difference(sel.outgoers()).not(sel).addClass('semitransp');
  sel.addClass('theFocus').outgoers().addClass('theFocus');
  e.cy.container().style.cursor = "pointer"; // https://stackoverflow.com/questions/19532031/how-do-i-change-cursor-to-pointer-when-mouse-is-over-a-node
  
  // console.log("sel.width() = " + sel.width() + " sel.outerWidth() = " + sel.outerWidth());
  // console.log("sel.height() = " + sel.height() + " sel.outerHeight() = " + sel.outerHeight());
});
cy.on('mouseout', "node", (e) => {
  var sel = e.target;

  cy.elements().removeClass('semitransp');
  sel.removeClass('theFocus').outgoers().removeClass('theFocus');
  e.cy.container().style.cursor = "auto"; // https://stackoverflow.com/questions/19532031/how-do-i-change-cursor-to-pointer-when-mouse-is-over-a-node
});

// FOR MOBILE
cy.on("touchstart", "node", (e) => {
  var sel = e.target;

  cy.elements().difference(sel.outgoers()).not(sel).addClass('semitransp');
  sel.addClass('theFocus').outgoers().addClass('theFocus');
  e.cy.container().style.cursor = "pointer"; // https://stackoverflow.com/questions/19532031/how-do-i-change-cursor-to-pointer-when-mouse-is-over-a-node
  
  // console.log("sel.width() = " + sel.width() + " sel.outerWidth() = " + sel.outerWidth());
  // console.log("sel.height() = " + sel.height() + " sel.outerHeight() = " + sel.outerHeight());\
});
cy.on('touchend', "node", (e) => {
  var sel = e.target;

  cy.elements().removeClass('semitransp');
  sel.removeClass('theFocus').outgoers().removeClass('theFocus');
  e.cy.container().style.cursor = "auto"; // https://stackoverflow.com/questions/19532031/how-do-i-change-cursor-to-pointer-when-mouse-is-over-a-node
});

/* project page nodes : click opens new PROJECT page */
cy.nodes('node[type="project"]').forEach((node) => {
  node.on('click', (e) => {
    window.location.href = e.target.data("page");
  })
  node.on('tap', (e) => {
    window.location.href = e.target.data("page");
  })
});

/* theme page nodes : click opens new THEME page */
cy.nodes('node[type="theme"]').forEach((node) => {
  node.on('click', (e) => {
    window.location.href = e.target.data("page");
  })
  node.on('tap', (e) => {
    window.location.href = e.target.data("page");
  })
});

      // cy.filter(edges.semitransp);
      // cy.remove('node.semitransparent' && 'edge.semitransparent');
      // removed.push(cy.remove('node.semitransp'));
      // removed.push(cy.remove('edge.semitransp'));
      // cy.elements('node#`{\'e\'}`, edge[source="`{\'e\'}`"]');
      // cy.elements('node#Wood, edge[source="Wood"]');
      // cy.elements('node#j, edge[source = "j"]');
      // cy.filter('#some\\$funky\\@id');



      // var sel = e.target;

      // cy.elements().difference(sel.outgoers()).not(sel).addClass('highlightFocus');
      // sel.addClass('highlightFocus').outgoers().addClass('highlightFocus');
      // let notHighlight = cy.nodes(':not(.highlightFocus)');

      // cy.nodes().filter(node => {
      //   // console.log("node.data('id'): " + node.data("id"));
      //   // if()

      //   if((node.data("id") != sel) && (node.data() != sel.outgoers())) {
      //     removed.push(cy.remove(node));
      //   }
      // })

      // console.log("removed: " + removed);

      // cy.elements().difference(sel.outgoers()).not(sel).addClass()

      // cy.$('#j').outgoers();
//     })
//   }
// )}

// cy.on("click", "node", (e) => {
//   if('node[type="material"]') {
//     var sel = e.target;

//     cy.elements().difference(sel.outgoers()).not(sel).addClass('highlightFocus');
//     sel.addClass('highlightFocus').outgoers().addClass('highlightFocus');

    
//   }
// });

cy.maxZoom(2);
cy.minZoom(0.7);
cy.center();

// mouseOUT behaviour on nodes & edges
// (evt) is an anon function bc it's a function that nothing else will ever need to call
// => is so that you don't need to write the word function (it's a js shortcut; "syntactic candy")
cy.on('mouseout', 'node', (evt) => {
  var node = evt.target;
  // node.style("background-color", "green");
  console.log(node.connectedEdges())
  // node.connectedEdges().forEach((edge) => {
    // edge.style("line-color", "blue")
  // })
});

//checkbox filters

// let formatFilt = document.getElementById("formatFilter");
// let formatKids = document.querySelectorAll(".formatChild");

// formatFilt.addEventListener('change', () => {
//   formatKids.forEach(checkbox => {
//     checkbox.checked = formatFilt.checked;
//   });
// });







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



// ACCORDION


// var acc = document.getElementsByClassName("accordion");
// var i;

// for (i = 0; i < acc.length; i++) {
//   acc[i].addEventListener("click", function() {
//     /* Toggle between adding and removing the "active" class,
//     to highlight the button that controls the panel */
//     this.classList.toggle("active");

//     /* Toggle between hiding and showing the active panel */
//     var panel = this.nextElementSibling;
//     if (panel.style.display === "block") {
//       panel.style.display = "none";
//     } else {
//       panel.style.display = "block";
//     }
//   });
// }

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}


const worthixScoreModal = document.querySelector('#worthix-score-modal');
const customNailsModal = document.querySelector('#custom-nails-modal');
const worthixCompetitiveModal = document.querySelector('#worthix-competitive-modal');

const openScoreModal = document.querySelector('#worthix-score');
const openNailsModal = document.querySelector('#custom-nails');
const openCompetitiveModal = document.querySelector('#worthix-competitive');

// const closeModal = document.querySelector('.close');
const closeScoreModal = document.querySelector('#close-score');
const closeNailsModal = document.querySelector('#close-nails');
const closeCompetitiveModal = document.querySelector('#close-competitive');

openScoreModal.addEventListener('click', () => {
  worthixScoreModal.showModal();
})

openNailsModal.addEventListener('click', () => {
  customNailsModal.showModal();
})

openCompetitiveModal.addEventListener('click', () => {
  worthixCompetitiveModal.showModal();
})

closeScoreModal.addEventListener('click', () => {
  worthixScoreModal.close();
})

closeNailsModal.addEventListener('click', () => {
  customNailsModal.close();
})

closeCompetitiveModal.addEventListener('click', () => {
  worthixCompetitiveModal.close();
})