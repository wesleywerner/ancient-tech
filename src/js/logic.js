var game = window.game = { };

game.techtree = [ ];
game.cultures = [ ];


game.defineTech = function (cost, wonder, name, depends, blocks, image, description) {
  this.techtree.push({
    cost: cost,
    wonder: wonder,
    name: name,
    depends: depends,
    blocks: blocks,
    image: image,
    description: description
    });
}

game.defineCulture = function (name, color, defaultTech) {
  this.cultures.push({
    name: name,
    color: color,
    defaultTech: defaultTech,
    allowedTech: [ ],
    allies: [ ],
    enemies: [ ]
    });
}

/*
 * Resolve which tech is available to which cultures,
 * considering their own tech and allies.
 */
game.resolveCultureTechnologies = function () {
  var caller = this;
  caller.cultures.forEach (function (culture) {
    
    var newtech = [ ];
    
    // tech owned by this culture
    caller.techtree.forEach (function (techitem) {

      var techcolor = culture.color;
      var hasAccess = false;
      var allyHasAccess = false;

      // include the culture's default tech
      if (culture.defaultTech.indexOf (techitem.name) > -1) {
        hasAccess = true;
      }
      else {
        // allow if this an ally technology.
        culture.allies.forEach (function (allyname) {
          var ally = game.cultures.find(function(n){return n.name == allyname});
          if (ally.defaultTech.indexOf(techitem.name) > -1) {
            techcolor = ally.color;
            hasAccess = true;
          }
        });
      }
      
      // copy tech to culture
      if (hasAccess) {
        var copy = JSON.parse(JSON.stringify(techitem));
        copy.color = techcolor;
        newtech.push(copy);
      }
      
    });
    
    culture.allowedTech = newtech;
      
    });
}

//// define tech
//game.defineTech (0, false,
  //'Construction Ramp',
  //[], [],
  //'images/300px-Chichen_Itza_3.jpg',
  //'');
//game.defineTech (0, true,
  //'Great Pyramid',
  //['Construction Ramp'],
  //'images/300px-Chichen_Itza_3.jpg',
  //'');
//game.defineTech (0, false,
  //'Papyrus', 
  //[], [],
  //'images/300px-Chichen_Itza_3.jpg',
  //'');
//game.defineTech (0, false,
  //'Hyroglyphics',
  //[], [],
  //'images/300px-Chichen_Itza_3.jpg',
  //'');
//game.defineTech (0, false,
  //'Pottery',
  //[], [],
  //'images/300px-Chichen_Itza_3.jpg',
  //'');
//game.defineTech (0, false,
  //'Seafaring',
  //[], [],
  //'images/300px-Chichen_Itza_3.jpg',
  //'');
//game.defineTech (0, false,
  //'Lighthouse',
  //[], [],
  //'images/300px-Chichen_Itza_3.jpg',
  //'');
//game.defineTech (0, false,
  //'Masonry',
  //[], [],
  //'images/300px-Chichen_Itza_3.jpg',
  //'');

//// define cultures
//game.defineCulture ('Egyptians', 'deep-purple',
  //['Construction Ramp', 'Great Pyramid', 'Papyrus', 'Hyroglyphics', 'Pottery', 'Seafaring', 'Lighthouse']);
//game.defineCulture ('Mesopotamians', 'brown', []);
//game.defineCulture ('Chinese', 'pink', []);
//game.defineCulture ('Greek', 'green', []);
//game.defineCulture ('Roman', 'deep-orange', []);
//game.defineCulture ('Mayan', 'teal', ['Masonry', 'Pottery']);



// DEBUG
//game.cultures[0].allies.push('Mayan');

game.applyBindings = function () {
  
  game.binds = new Vue({
    el: '#ancient',
    data: {
      loading: false,
      view: 'research',
      cultures: game.cultures,
      items: game.techtree
    }
  });
  
  game.resolveCultureTechnologies();
  
}

game.preload = function (callback) {
  if (game.preloadList.length > 0) {
    var fileinfo = game.preloadList.pop();
    $.getJSON(fileinfo.file, function (data) {
      game[fileinfo.object] = data;
      return game.preload(callback);
      })
  }
  else if (callback != undefined) {
      callback();
  }
}


// preload these resources
game.preloadList = [
  { object: 'cultures', file: 'js/cultures.json' },
  { object: 'techtree', file: 'js/technologies.json' }
  ];


game.preload(game.applyBindings);
