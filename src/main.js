//const fs = require('fs');
//import fs from 'fs';

import cytoscape from 'cytoscape';
// import cyqtip from 'cytoscape-qtip';

// cyqtip( cytoscape ); // register extension

import projects from './projects.json';
import themes from './themes.json';

console.log(projects);
console.log(themes);

// nodes = dados.map((point) => {{data: {id: point.name}}})


let searchBar = document.getElementById("search-bar");
// document.getElementById('cy').style.backgroundColor = 'green';
const nodes = dados.map((point) => {
  return {data: {id: point.title}}
})

// .sort(() => .5 - Math.random());

console.log(nodes);

    // { // dates
  //   data: {id: 'dates', topic: 'materials'},
  // },


// const nodes = [
//   { // node a
//     data: { id: 'a' },
//   },
//   { // node b
//     data: { id: 'b' },
//   },
//   { // node a
//     data: { id: 'c' },
//   },
//   { // node b
//     data: { id: 'd' },

//   },].sort(() => .5 - Math.random());




var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [ // list of graph elements to start with
    ...nodes,
    // { // edge ab
    //   data: { id: 'ab', source: 'a', target: 'b' }
    // },
    // { // edge ab
    //   data: { id: 'ac', source: 'a', target: 'c' }
    // },
    // { // edge ab
    //   data: { id: 'ad', source: 'a', target: 'd' }
    // }
  ],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        // 'background-color': '#666',
        'background-color': 'rgb(0,0,161)',
        'label': 'data(id)'
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
    }
  ],

  layout: {
    name: 'random',
  }

});
cy.on('click', 'node', (evt) => {
  var node = evt.target;
  console.log('clicked ' + node.id());
});
cy.on('mouseover', 'node', function (evt) {
  var node = evt.target;
  node.style("background-color", "blue");

  node.connectedEdges().forEach((edge) => {
    edge.style("line-color", "red")
  })
});


// cy.userZoomingEnabled(false);
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

searchBar.addEventListener("input", (target) => {
  console.log(target)
  console.log("in graveyard before restore", removed)
  restore()
  console.log("in graveyard after restore", removed)

  if (searchBar.value) {
    cy.nodes().filter(node => {
      console.log(node.data("id"))
      if (!node.data("id").toLowerCase().includes((searchBar.value || "").toLowerCase())) {
        removed.push(cy.remove(node))
      }
    });
  }
  console.log("in graveyard after search", removed)

})

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

let typeFilt = document.getElementById("typeFilter");
let typeKids = document.querySelectorAll(".typeChild");

typeFilt.addEventListener('change', () => {
  typeKids.forEach(checkbox => {
    checkbox.checked = typeFilt.checked;
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