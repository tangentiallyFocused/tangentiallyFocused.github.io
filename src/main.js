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

let searchBar = document.getElementById("search_bar");
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
import collaborations from './jsons/collaborations.json';
import materials from './jsons/materials.json';
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
    // edge collaboration : name --> collaboration
    {
      data: { id: `${project.collaboration}-${project.name}`, source: project.collaboration, target: project.name }
    },
    // edge collaboration : collaboration --> name
    {
      data: { id: `${project.collaboration}-${project.name}`, source: project.collaboration, target: project.name }
    }
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
        // 'label': 'data(id)'
        // '@import': "'/src/constants.css';",
        // 'font-family': 'Fira Code VF !important',
        // 'font-feature-settings': "'cv01', 'cv06', 'cv10'"
        'font-family': 'monospace',
        'font-feature-settings': "'cv01', 'cv06', 'cv10', 'ss05'"
        // 'font-family': '"Recursive", "Trebuchet MS", "Helvetica", "sans-serif"',
        // 'src': "url('/fonts/Recursive_Web/woff2_variable/Recursive_VF_1.085.woff2') format('woff2-variations')",
        // 'font-weight': '300 1000',
        // 'src': "url('/src/fonts/Recursive_Web/woff2_variable/Recursive_VF_1.085.woff2') format('woff2-variations')",
        // 'font-weight': '300 1000',
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
        'curve-style': 'straight'
      }
    },

    //project node
    {
      selector: 'node[type = "project"]',
      style: {
        'background-color': 'rgb(142,58,89)',
        'label': 'data(id)',
        // 'color': 'pink',
        // 'font-size': 13,
        // 'font-size': 17,

        // 'text-valign': 'center',
        // 'text-halign': 'center',
        // 'text-wrap': 'wrap',
        // 'width': 'label',
        // 'height': 'label',
        // 'padding': '5px',
        // 'text-justification': 'center',
        // 'shape': 'roundrectangle',
        // 'text-max-width': '125px',
        // 'font-size': '8'
        // 'border-width': '5',
        // 'border-color': 'rgb(142,58,89)'
      }
    },
    //theme node
    {
      selector: 'node[type = "theme"]',
      style: {
        'background-color': 'rgb(142,58,89)',
        'label': 'data(id)',
        // 'color': 'pink',
        // 'font-size': 13,
        // 'font-size': 17,

        // 'text-valign': 'center',
        // 'text-halign': 'center',
        // 'text-wrap': 'wrap',
        // 'width': 'label',
        // 'height': 'label',
        // 'padding': '5px',
        // 'text-justification': 'center',
        // 'shape': 'roundrectangle',
        // 'text-max-width': '125px',
        // 'font-size': '8'
      }
    },
    //format node
    {
      selector: 'node[type = "format"]',
      style: {
        'background-color': 'rgb(255,244,79)',
        'width': 15,
        'height': 15,
        'shape': 'round-pentagon',
        'label': 'data(id)',
        // 'font-size': 13,
        // // 'color': 'darkorange',

        // 'text-valign': 'center',
        // 'text-halign': 'center',
        // 'text-wrap': 'wrap',
        // 'width': 'label',
        // 'height': 'label',
        // 'padding': '5px',
        // 'text-justification': 'center',
        // 'shape': 'roundrectangle',
        // 'text-max-width': '125px',
        // 'font-size': '8'
      }
    },
    //collaboration node
    {
      selector: 'node[type = "collaboration"]',
      style: {
        'background-color': 'rgb(255,244,79)',
        'width': 15,
        'height': 15,
        'shape': 'round-pentagon',
        'label': 'data(id)',
        // 'font-size': 13,
        // // 'color': 'redorange',

        // 'text-valign': 'center',
        // 'text-halign': 'center',
        // 'text-wrap': 'wrap',
        // 'width': 'label',
        // 'height': 'label',
        // 'padding': '5px',
        // 'text-justification': 'center',
        // 'shape': 'roundrectangle',
        // 'text-max-width': '125px',
        // 'font-size': '8'
      }
    },
    //material node
    {
      selector: 'node[type = "material"]',
      style: {
        'background-color': 'rgb(255,244,79)',
        'width': 15,
        'height': 15,
        'shape': 'round-pentagon',
        'label': 'data(id)',
        // 'font-size': 13,
        // 'color': 'darkorange',

        // 'text-valign': 'center',
        // 'text-halign': 'center',
        // 'text-wrap': 'wrap',
        // 'width': 'label',
        // 'height': 'label',
        // 'padding': '5px',
        // 'text-justification': 'center',
        // 'shape': 'roundrectangle',
        // 'text-max-width': '125px',
        // 'font-size': '8'
      }
    },

    {
      selector: 'node.theFocus',
      style: {
        'background-color': 'rgb(0,49,83)',
        'border-color': 'rgb(0,49,83)',
        // 'color': 'lightblue',
        // 'color': "white",
        'color': "rgb(0,49,83)",
          //changes font color to prussian blue on hover
        // 'border-width': '6px',
        'border-width': '2px',
        'z-index': '2',
          // brings the nodes forward so as to avoid any additional ndoes hiding/covering it
        // 'font-size': '10'
        // 'font-size': 15,
        // 'font-size': 20,
      }
    },
    {
      selector: 'node.semitransp',
      style: {
        'opacity': '0.5',
        // 'z-index': '-5'
      }
    },
    {
      selector: 'edge.theFocus',
      style: {
        // 'mid-target-arrow-color': 'orange',
        'line-color': "rgb(0,49,83)",
        // 'target-arrow-color': 'rgb(0,49,83)',
        'z-index': '3'
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
});

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

let removed = []





// searchBar.addEventListener("input", (e) => {
//   console.log("e.target: " + e.target);
//   console.log("e: " + e);
//   // console.log("in graveyard BEFORE restore", removed);
//   restore();
//   // console.log("in graveyard AFTER restore", removed);

//   if (searchBar.value) {
//     cy.nodes().filter(node => {
//       console.log(node.data("id"))
//       if (!node.data("id").toLowerCase().includes((searchBar.value || "").toLowerCase())) {
//         removed.push(cy.remove(node))
//       }
//     });
//   }
  // console.log("in graveyard after search", removed)

// })

searchBar.addEventListener("input", (target) => {
  console.log(target)
  // console.log("in graveyard before restore", removed)
  restore()
  // console.log("in graveyard after restore", removed)

  if (searchBar.value) {
    cy.nodes().filter(node => {
      console.log(node.data("id"))
      if (!node.data("id").toLowerCase().includes((searchBar.value || "").toLowerCase())) {
        removed.push(cy.remove(node))
      }
    });
  }
  // console.log("in graveyard after search", removed)

})

// restore removed nodes & edges
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
