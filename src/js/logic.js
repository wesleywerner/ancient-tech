var game = window.game = { };


/*
 * Resolve Freeciv techs available for a culture.
 */
game.resolveTechs = function (civilization) {
  
  var giventech = [ ];
  game.techs.forEach(function (tech) {
    
    // valid tech - ignore meta data
    if (tech.name) {
      
      var ownsCurrent = civilization.ownedtech.indexOf(tech.name) > -1;
      var ownsReq1 = (tech.req1 == 'None') || civilization.ownedtech.indexOf(tech.req1) > -1;
      var ownsReq2 = (tech.req2 == 'None') || civilization.ownedtech.indexOf(tech.req2) > -1;

      //// allow if this an ally technology.
      //culture.allies.forEach (function (allyname) {
        //var ally = game.cultures.find(function(n){return n.name == allyname});
        //if (ally.defaultTech.indexOf(techitem.name) > -1) {
          //techcolor = ally.color;
          //hasAccess = true;
        //}
      //});
      
      if (ownsReq1 && ownsReq2 && !ownsCurrent) {
        var copy = JSON.parse(JSON.stringify(tech));
        copy.color = civilization.color;
        giventech.push(copy);
      }
    
    }
    
  });
  
  civilization.availabletech = giventech;
    
}


/*
 * Work out the number of techs required for each tech.
 * This is used to calculate the cost of each tech as
 * (r+2)*sqrt(r+2)*10
 */
game.countTechRequirements = function (tech) {
  var checklist = [ ];
  var ignorelist = [ ];
  var count = 0;
  if (tech.req1 != 'None' && checklist.indexOf(tech.req1) == -1) {
    checklist.push(tech.req1);
  }
  if (tech.req2 != 'None' && checklist.indexOf(tech.req2) == -1) {
    checklist.push(tech.req2);
  }
}


game.determineAllTechRequirements = function () {
  game.techs.forEach( function (tech) {
    tech.reqcount = game.countTechRequirements(tech);
  });
}


/*
 * Finds a tech by name.
 */
game.getTech = function (name) {
  return game.techs.find(function (tech) {
    return tech.name == name;
  });
}


game.resetCivilizations = function () {
  var civs = ['Egyptians','Mesopotamians','Chinese','Greeks','Romans','Mayans'];
  var colors = ['deep-purple','brown','pink','green','deep-orange','teal'];
  game.civilizations = [ ];
  civs.forEach(function (civ) {
    game.civilizations.push({
      'name': civ,
      'color': colors.shift(),
      'ownedtech': [],
      'availabletech': [],
      'researching': [],
      'allies': [],
      'enemies': []
      });
  });
}


game.applyBindings = function () {
  game.binds = new Vue({
    el: '#ancient',
    data: {
      loading: false,
      view: 'research',
      civilizations: game.civilizations,
      tech: game.techs,
      playername: '',
      playerdata: null,      
    },
    methods: {
      giveCivilizationTech: game.debug.giveCivilizationTech
    }
  });
}


game.prepareData = function () {
  game.resetCivilizations();
  game.debug.resolve();
  game.applyBindings();
  game.binds.playerdata = game.civilizations[0];
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
  { object: 'techs', file: 'data/techs.ruleset.json' }
  ];


game.debug = { };
game.debug.listCivilizations = function () {
  console.table(JSON.parse( JSON.stringify(game.civilizations) ))
}
game.debug.giveCivilizationTech = function (e) {
  if (typeof e == "string") {
    game.civilizations[0].ownedtech.push(e);
  }
  else if (typeof e == "number") {
    game.civilizations[0].ownedtech.push(game.civilizations[0].availabletech[e].name);
  }
  setTimeout (game.debug.resolve, 500);
}
game.debug.resolve = function () {
  game.resolveTechs(game.civilizations[0]);
}

game.preload(game.prepareData);
