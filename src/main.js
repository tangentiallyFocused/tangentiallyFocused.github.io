import './constants.css';
import './style.css';

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
// console.log("projects: " + projects);
// console.log("themes: " + themes);
const nodes_formatted_for_cytoscape = projects.map((project, index) => {
  return {
    data: {
      id: project.name,
      type: "project",
      themes: project.themes,
      role: project.role,
      timeline: project.date,
      description: project.description,
      thumbnail: project.thumbnail,
      thumbnail_alt: project.thumbnail_alt,
      // name: project.name
    }
  }
})
nodes_formatted_for_cytoscape.push(...themes.map((theme) => {
  return {
    data: {
      id: theme.name,
      type: "theme",
    }
  }
}))

// highlighting nodes
import formats from './jsons/formats.json';
import skills from './jsons/skills.json';
// console.log("formats: " + formats);
// console.log("skills: " + skills);
nodes_formatted_for_cytoscape.push(...formats.map((format) => {
  return {
    data: {
      id: format.name,
      type: "format"
    }
  }
}))
nodes_formatted_for_cytoscape.push(...skills.map((skill) => {
  return {
    data: {
      id: skill.name,
      type: "skill"
    }
  }
}))

// .sort(() => .5 - Math.random());

// console.log("nodes_formatted_for_cytoscape: " + nodes_formatted_for_cytoscape);

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
    // edge skill : name --> skill
    ...project.skills.flatMap((skill) => [{ // edge theme
        data: { id: `${project.name}-${skill}`, source: project.name, target: skill }
      },
      // edge skill : skill --> name
      {
        data: { id: `${skill}-${project.name}`, source: skill, target: project.name }
      }]),
  ]
});

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
        'font-family': 'Atkinson Hyperlegible, Inter, sans-serif',
        // 'font-feature-settings': "'cv01', 'cv06', 'cv10', 'ss05'"
      }
    },
    // edge components
    { 
      selector: 'edge',
      style: {
        'width': 1.5,
        'line-color': 'rgb(142, 138, 148)', // --md-outline: rgb(142, 138, 148)
        // 'line-color': '#ccc',
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
        'label': 'data(id)',
        'font-size': 28,
        'text-valign': 'center',
        'text-halign': 'center',
        'text-wrap': 'wrap',
        'width': 'label',
        'height': 'label',
        'padding': '5px',
        'text-justification': 'center',
        'shape': 'roundrectangle',
        'text-max-width': '125px',
        // 'text-transform': 'uppercase',
        'font-family': 'Outfit, Inter, sans-serif',
        'font-weight': '600',
        'background-color': 'rgb(34, 30, 40)', //surface-container: rgb(34, 30, 40)
        'border-width': 3,
        'border-color': 'rgb(34, 30, 40)' //surface-container: rgb(34, 30, 40)
      }
    },
    {
      selector: 'node[id = "Interconnectivity"]',
      style: {
        'color': 'rgb(128, 209, 159)'
      }
    },
    {
      selector: 'node[id = "Interaction"]',
      style: {
        'color': 'rgb(142, 58, 89)'
      }
    },
    {
      selector: 'node[id = "Perception"]',
      style: {
        'color': 'rgb(0, 174, 239)'
      }
    },




    //format node
    {
      selector: 'node[type = "format"]',
      style: {
        'background-color': 'rgb(255,244,79)',
        'border-color': 'rgb(0, 174, 239)',
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
        // 'compound-sizing-wrt-labels': 'include',
        'padding': '5px',
        'text-justification': 'center',
        'shape': 'roundrectangle',
        'text-max-width': '125px',
        // 'font-size': '8'
      }
    },
    //skill node
    {
      selector: 'node[type = "skill"]',
      style: {
        'background-color': 'rgb(255,244,79)',
        'border-color': 'rgb(0, 174, 239)',
          // changes & adds border color to prussian/cyan blue on hover
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
        'border-color': 'rgb(0, 174, 239)',
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
        'line-color': 'rgb(0, 174, 239)',
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

// WITH ASSISTANCE FROM CURSOR AI
// Handle tap/click on nodes - show bottom sheet for project nodes on mobile
cy.on('tap', 'node', function(evt) {
    //const node = evt.target;           // The clicked node
    //const nodeId = node.id();          // Get its ID (e.g., 'javascript')
    // const data = nodeData[nodeId];     // Look up detailed data
    
    const node = evt.target;
    const nodeType = node.data('type');
    
    // Only show bottom sheet for project nodes on mobile
    if (nodeType === 'project' && isMobile()) {
      showBottomSheet(node.data());
    }
});

// Also handle click event as fallback
cy.on('click', 'node', function(evt) {
    const node = evt.target;
    const nodeType = node.data('type');

    // Only show bottom sheet for project nodes on mobile
    if (nodeType === 'project' && isMobile()) {
      showBottomSheet(node.data());
    }
});
// END CURSOR AI ASSISTANCE

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

// const nodeSummary = document.getElementById("#node-summary");
const nodeTitleDiv = document.querySelector("#node-title");
const nodeThemeDiv = document.querySelector("#node-theme-container");
const nodeRoleDiv = document.querySelector("#node-role");
const nodeDateDiv = document.querySelector("#node-date");
const nodeDescriptionDiv = document.querySelector("#node-text");
// const nodeSkillsDiv = document.querySelector("#node-skills");
const nodeImageImg = document.querySelector("#node-image");

// nodeDescriptionDiv.textContent = "Ready? Hover over any node to begin!";
nodeImageImg.classList.add("image-invisible");
// const bottomSheetDiv = document.querySelector("#sidebar");

// FOR DESKTOP
cy.on("mouseover", "node", (e) => {
  var sel = e.target;
  cy.elements().difference(sel.outgoers()).not(sel).addClass('semitransp');
  sel.addClass('theFocus').outgoers().addClass('theFocus');

  // section text vars
  const name = sel.data().id;
  // const themes = sel.data().themes;
  const role = sel.data().role;
  const description = sel.data().description;
  const timeline = sel.data().timeline;

  if (description) {
    nodeTitleDiv.textContent = name;
    // nodeThemeDiv.textContent = themes;
    nodeRoleDiv.textContent = role;
    nodeDateDiv.textContent = timeline;
    nodeDescriptionDiv.textContent = description;  
    // ADD ONE FOR SKILLS
    // nodeSummary.classList.remove('centered');
    nodeDescriptionDiv.classList.remove('centered');
    // nodeSummary.classList.remove('centered');
  }

  const thumbnail = sel.data().thumbnail;
  const thumbnail_alt = sel.data().thumbnail_alt;
  if (thumbnail) {
    if('node[type = "project"]') {
      nodeImageImg.src = thumbnail;
      nodeImageImg.alt = thumbnail_alt;
      nodeImageImg.classList.remove("image-invisible");
    } else {
      nodeImageImg.classList.add("image-invisible");
    }
  }

  e.cy.container().style.cursor = "pointer"; // https://stackoverflow.com/questions/19532031/how-do-i-change-cursor-to-pointer-when-mouse-is-over-a-node
  
  // console.log("sel.width() = " + sel.width() + " sel.outerWidth() = " + sel.outerWidth());
  // console.log("sel.height() = " + sel.height() + " sel.outerHeight() = " + sel.outerHeight());
});

cy.on('mouseout', "node", (e) => {
  var sel = e.target;

  cy.elements().removeClass('semitransp');
  sel.removeClass('theFocus').outgoers().removeClass('theFocus');
  e.cy.container().style.cursor = "auto"; // https://stackoverflow.com/questions/19532031/how-do-i-change-cursor-to-pointer-when-mouse-is-over-a-node
  // nodeDescriptionDiv.classList.add("centered");
});

// FOR MOBILE; WITH ASSISTANCE FROM CURSOR AI
// Mobile bottom sheet elements
const mobileProjectCard = document.getElementById('mobile-project-card');
const mobileNodeTitle = document.getElementById('mobile-node-title');
const mobileNodeThemeContainer = document.getElementById('mobile-node-theme-container');
const mobileNodeRole = document.getElementById('mobile-node-role');
const mobileNodeDate = document.getElementById('mobile-node-date');
const mobileNodeText = document.getElementById('mobile-text-content');
const mobileNodeImage = document.getElementById('mobile-node-image');

// Function to show bottom sheet with node data
function showBottomSheet(nodeData) {
  if (!mobileProjectCard) return;
  
  // Only show bottom sheet for project nodes
  const nodeType = nodeData.type;
  if (nodeType !== 'project') {
    return;
  }
  
  const name = nodeData.id;
  const description = nodeData.description;
  const role = nodeData.role;
  const timeline = nodeData.timeline;
  const themes = nodeData.themes;
  const thumbnail = nodeData.thumbnail;
  const thumbnail_alt = nodeData.thumbnail_alt;

  // Populate title
  mobileNodeTitle.textContent = name || '';

  // Populate description
  if (description) {
    mobileNodeText.textContent = description;
  } else {
    mobileNodeText.textContent = '';
  }

  // Populate role
  if (role) {
    mobileNodeRole.textContent = role;
    mobileNodeRole.style.display = 'block';
  } else {
    mobileNodeRole.style.display = 'none';
  }

  // Populate date
  if (timeline) {
    mobileNodeDate.textContent = timeline;
    mobileNodeDate.style.display = 'block';
  } else {
    mobileNodeDate.style.display = 'none';
  }

  // Populate themes
  if (themes && Array.isArray(themes) && themes.length > 0) {
    mobileNodeThemeContainer.innerHTML = '';
    themes.forEach(theme => {
      const themeTag = document.createElement('div');
      themeTag.className = 'mobile-node-tag';
      themeTag.textContent = theme;
      
      // Add theme color classes
      if (theme === 'Interconnectivity') {
        themeTag.classList.add('interconnectivity-theme');
      } else if (theme === 'Interaction') {
        themeTag.classList.add('interaction-theme');
      } else if (theme === 'Perception') {
        themeTag.classList.add('perception-theme');
      }
      
      mobileNodeThemeContainer.appendChild(themeTag);
    });
    mobileNodeThemeContainer.style.display = 'flex';
    mobileNodeThemeContainer.style.flexWrap = 'wrap';
    mobileNodeThemeContainer.style.gap = '0.5rem';
  } else {
    mobileNodeThemeContainer.style.display = 'none';
  }

  // Populate image
  if (thumbnail && nodeType === 'project') {
    mobileNodeImage.src = thumbnail;
    mobileNodeImage.alt = thumbnail_alt || '';
    mobileNodeImage.classList.add('visible');
  } else {
    mobileNodeImage.classList.remove('visible');
  }

  // Show bottom sheet and reset any transform
  mobileProjectCard.style.transform = '';
  mobileProjectCard.classList.remove('dragging');
  mobileProjectCard.classList.add('visible');
}

// Function to hide bottom sheet
function hideBottomSheet() {
  if (!mobileProjectCard) return;
  mobileProjectCard.classList.remove('visible');
  // Reset transform when hiding
  mobileProjectCard.style.transform = '';
}

// Drag handle functionality for bottom sheet
const dragHandle = document.querySelector('.drag-handle');
let isDragging = false;
let startY = 0;
let currentY = 0;
let initialTransform = 0;

function handleDragStart(e) {
  if (!mobileProjectCard || !mobileProjectCard.classList.contains('visible')) return;
  
  isDragging = true;
  startY = e.touches[0].clientY;
  // Get current transform value
  const currentTransform = mobileProjectCard.style.transform;
  if (currentTransform && currentTransform !== 'translateY(0)') {
    const match = currentTransform.match(/translateY\(([^)]+)\)/);
    initialTransform = match ? parseFloat(match[1]) : 0;
  } else {
    initialTransform = 0;
  }
  
  mobileProjectCard.classList.add('dragging');
  e.preventDefault();
}

function handleDragMove(e) {
  if (!isDragging || !mobileProjectCard || !mobileProjectCard.classList.contains('visible')) return;
  
  currentY = e.touches[0].clientY;
  const deltaY = currentY - startY;
  
  // Only allow dragging down (positive deltaY)
  if (deltaY > 0) {
    const newTransform = initialTransform + deltaY;
    mobileProjectCard.style.transform = `translateY(${newTransform}px)`;
  }
  
  e.preventDefault();
}

function handleDragEnd(e) {
  if (!isDragging) return;
  
  isDragging = false;
  mobileProjectCard.classList.remove('dragging');
  
  const deltaY = currentY - startY;
  const threshold = 100; // Pixels to drag before closing
  
  if (deltaY > threshold) {
    // Close the sheet
    hideBottomSheet();
  } else {
    // Snap back to original position
    mobileProjectCard.style.transform = '';
  }
}

if (dragHandle && mobileProjectCard) {
  // Touch events for drag handle
  dragHandle.addEventListener('touchstart', handleDragStart, { passive: false });
  dragHandle.addEventListener('touchmove', handleDragMove, { passive: false });
  dragHandle.addEventListener('touchend', handleDragEnd);
  dragHandle.addEventListener('touchcancel', handleDragEnd);

  // Also allow dragging from the top area of the card (for easier interaction)
  const cardContent = document.querySelector('.card-content');
  if (cardContent) {
    let headerStartY = 0;
    let headerInitialTransform = 0;
    let isHeaderDragging = false;

    cardContent.addEventListener('touchstart', (e) => {
      // Only allow dragging if touch starts near the top of the card (first 80px)
      if (!mobileProjectCard.classList.contains('visible')) return;
      
      const touchY = e.touches[0].clientY;
      const cardRect = mobileProjectCard.getBoundingClientRect();
      const touchRelativeY = touchY - cardRect.top;
      
      // Check if touch is in the top 80px of the card (drag handle area)
      if (touchRelativeY < 80) {
        isHeaderDragging = true;
        headerStartY = touchY;
        const currentTransform = mobileProjectCard.style.transform;
        if (currentTransform && currentTransform !== 'translateY(0)') {
          const match = currentTransform.match(/translateY\(([^)]+)\)/);
          headerInitialTransform = match ? parseFloat(match[1]) : 0;
        } else {
          headerInitialTransform = 0;
        }
        mobileProjectCard.classList.add('dragging');
        e.preventDefault();
      }
    }, { passive: false });

    cardContent.addEventListener('touchmove', (e) => {
      if (!isHeaderDragging || !mobileProjectCard.classList.contains('visible')) return;
      
      const touchY = e.touches[0].clientY;
      const deltaY = touchY - headerStartY;
      
      // Only allow dragging down
      if (deltaY > 0) {
        const newTransform = headerInitialTransform + deltaY;
        mobileProjectCard.style.transform = `translateY(${newTransform}px)`;
      }
      
      e.preventDefault();
    }, { passive: false });

    cardContent.addEventListener('touchend', (e) => {
      if (!isHeaderDragging) return;
      
      isHeaderDragging = false;
      mobileProjectCard.classList.remove('dragging');
      
      const touchY = e.changedTouches[0].clientY;
      const deltaY = touchY - headerStartY;
      const threshold = 100;
      
      if (deltaY > threshold) {
        hideBottomSheet();
      } else {
        mobileProjectCard.style.transform = '';
      }
    });

    cardContent.addEventListener('touchcancel', (e) => {
      if (isHeaderDragging) {
        isHeaderDragging = false;
        mobileProjectCard.classList.remove('dragging');
        mobileProjectCard.style.transform = '';
      }
    });
  }
}

// Check if we're on mobile (sidebar is hidden)
function isMobile() {
  return window.innerWidth <= 990;
}

// END CURSOR AI ASSISTANCE

// FOR MOBILE - touchstart for visual feedback
cy.on("touchstart", "node", (e) => {
  var sel = e.target;

  cy.elements().difference(sel.outgoers()).not(sel).addClass('semitransp');
  sel.addClass('theFocus').outgoers().addClass('theFocus');
  e.cy.container().style.cursor = "pointer"; // https://stackoverflow.com/questions/19532031/how-do-i-change-cursor-to-pointer-when-mouse-is-over-a-node

  const description = sel.data().description;
  if (description) {
    nodeDescriptionDiv.textContent = description;  
  }

  const thumbnail = sel.data().thumbnail;
  const thumbnail_alt = sel.data().thumbnail_alt;
  // const nodeType = sel.data('type');
  // if (thumbnail && 'node[type = "project"]') {
  if (thumbnail) {
    if('node[type = "project"]') {
      nodeImageImg.src = thumbnail;
      nodeImageImg.alt = thumbnail_alt;
      nodeImageImg.classList.remove("image-invisible");
      // bottomSheetDiv.style.transform = 'translateY(0);' /* Visible state */
    } else {
      nodeImageImg.classList.add("image-invisible");
    }
  }
  
  // console.log("sel.width() = " + sel.width() + " sel.outerWidth() = " + sel.outerWidth());
  // console.log("sel.height() = " + sel.height() + " sel.outerHeight() = " + sel.outerHeight());\
});
cy.on('touchend', "node", (e) => {
  var sel = e.target;

  cy.elements().removeClass('semitransp');
  sel.removeClass('theFocus').outgoers().removeClass('theFocus');
  e.cy.container().style.cursor = "auto"; // https://stackoverflow.com/questions/19532031/how-do-i-change-cursor-to-pointer-when-mouse-is-over-a-node
});
   
cy.maxZoom(2);
cy.minZoom(0.7);
cy.center();

// mouseOUT behaviour on nodes & edges
// (evt) is an anon function bc it's a function that nothing else will ever need to call
// => is so that you don't need to write the word function (it's a js shortcut; "syntactic candy")
cy.on('mouseout', 'node', (evt) => {
  var node = evt.target;
  // node.style("background-color", "green");
  // console.log(node.connectedEdges())
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


// DONE IN CONJUNCTION WITH CURSOR AI
// Overlay toggle functionality for cytoscape graph
const cyOverlay = document.getElementById('cy-overlay');
const cyStatusChip = document.getElementById('cy-status-chip');
const cyStatusText = document.getElementById('cy-status-text');

const cyLegendChip = document.getElementById('cy-legend-chip');
// const cyLegendText = document.getElementById('cy-legend-text');
const cyLegendChevronUp = document.getElementById('chevron-up-icon');
const cyLegendChevronDown = document.getElementById('chevron-down-icon');


// Legend toggle functionality - starts open (not collapsed)
let legendCollapsed = false;

function toggleLegend(e) {
  e.stopPropagation(); // Prevent event from bubbling to overlay

  legendCollapsed = !legendCollapsed;

  if (legendCollapsed) {
    cyLegendChip.classList.add('collapsed');
  } else {
    cyLegendChip.classList.remove('collapsed');
  }
}

// Add click handler to legend chip
cyLegendChip.addEventListener('click', toggleLegend);


let cyActive = false;

function toggleCyActive() {
  cyActive = !cyActive;
  
  if (cyActive) {
    // Enable zoom and pan
    cy.userZoomingEnabled(true);
    cy.userPanningEnabled(true);
    cy.boxSelectionEnabled(true);
    
    // Update UI
    cyOverlay.classList.add('active');
    cyStatusChip.classList.add('active');
    cyStatusText.textContent = 'Graph active';
  } else {
    // Disable zoom and pan
    cy.userZoomingEnabled(false);
    cy.userPanningEnabled(false);
    cy.boxSelectionEnabled(false);
    
    // Update UI
    cyOverlay.classList.remove('active');
    cyStatusChip.classList.remove('active');
    cyStatusText.textContent = 'Click to interact with graph';
  }
}

// Add click handler to overlay
cyOverlay.addEventListener('click', toggleCyActive);

// Also allow clicking the status chip to toggle
cyStatusChip.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent triggering overlay click
  toggleCyActive();
});

// Scroll detection to hide bottom sheet and mobile skip chip when scrolling past hero section
const heroSection = document.getElementById('hero-section');
const mobileSkipChip = document.getElementById('mobile-skip-chip');
let scrollTimeout;

function handleScroll() {
  if (!isMobile() || !heroSection) return;
  
  // Clear any existing timeout
  clearTimeout(scrollTimeout);
  
  // Use requestAnimationFrame for smoother performance
  requestAnimationFrame(() => {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const heroRect = heroSection.getBoundingClientRect();
    const heroHeight = heroRect.height;
    
    // Calculate hero section's top position relative to document
    const heroTop = scrollPosition + heroRect.top;
    
    // Calculate how far we've scrolled into the hero section
    const scrollIntoHero = scrollPosition - heroTop;
    
    // Calculate scroll progress as a percentage (0 to 1)
    // If scrollIntoHero is negative, we're above the hero section
    let scrollProgress = 0;
    if (scrollIntoHero > 0 && heroHeight > 0) {
      scrollProgress = scrollIntoHero / heroHeight;
    }
    
    // Handle bottom sheet
    const scrollThreshold = 0.5; // 0.5 = 50%, 0.25 = 25%
    if (mobileProjectCard && scrollProgress > scrollThreshold && mobileProjectCard.classList.contains('visible')) {
      hideBottomSheet();
    }
    
    // Handle mobile skip chip - hide when scrolled past 25% of hero section
    if (mobileSkipChip) {
      if (scrollProgress > 0.25) {
        // Hide when past 25%
        if (!mobileSkipChip.classList.contains('hidden')) {
          mobileSkipChip.classList.add('hidden');
        }
      } else {
        // Show when at or above 25%, or before hero section
        if (mobileSkipChip.classList.contains('hidden')) {
          mobileSkipChip.classList.remove('hidden');
        }
      }
    }
  });
}

// Throttled scroll listener for better performance
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Set initial state on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    handleScroll();
  });
} else {
  // DOM is already loaded
  handleScroll();
}
// END CURSOR AI

// click esc disables scroll again
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
      e.stopPropagation();
      toggleCyActive();
  }
});