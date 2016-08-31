# Ludum Dare 36 Game Entry

Theme: Ancient technology

# Ideas

A technology research and progression game, data driven, where the player uses resources to fund a technology line.


# Freeciv resources

Rulesets:

    http://svn.gna.org/viewcvs/freeciv/trunk/data/classic/

With r the total number of required techs for a given technology, the number of bulbs that will be needed for researching this technology is:  
  
    (r+2)*sqrt(r+2)*10

---------


# Research

* https://en.wikipedia.org/wiki/Ancient_technology

## Maybes

### tech progression
* a technology dependency tree
** one path opens new options, while others become unavailable
* age based provisioning
** tech becomes available after time passes
*** this can end up flooding the player with options in late game
*** less we make tech unavailable after a certain age

### n computer players
* who compete in the research.

### graphical representation of progress
* web canvas
* draw researched technologies and artifacts
* bird's eye view over the land

### resource driven
* clicker type game
** avoid this perhaps? it does seem popular among some folk.
** resource growth should be steady, not exponential
* time based resource gain

### relations between cultures
* each culture has access to various tech
* player chooses one culture to play
* make treaties with other cultures to gain their tech trees
* cultures can dispute or be at war with another
* you should not really ally with a culture who is at war with one of your allies
** if you do it might upset your allies
** they can break the treaty and the tech tree they provide
* if at least 3 cultures gain the same technology it becomes open to everybody for research

### unique wonders
* technologies marked as unique can only be researched by one culture
* world wonders and firsts



## Unlikeleys

### multiplayer
* node based multiplayer layer



## Cultures


### Egyptians

construction ramp
  * Pyramid Wonder
papyrus
hyroglyphics
pottery
ships
lighthouse

### Mesopotamians

metalworking
glassmaking
textiles
flood control
Archimedes' screw pump
  * Irrigation
    * Hanging Gardens Wonder
writing
  * Code of Hammurabi Wonder
  * Epic of Gilgamesh Wonder
astronomy
  * calendar
wheel
  * chariots
  

### Chinese

compass
gunpowder
  * rockets
hot air balloon
paper
  * printing
sea faring

### Greeks

steam engine
watermill
Gears
  * Antikythera mechanism Wonder
Golden Ratio
  * Geometry
  * Architecture


### Romans

agriculture
roads
aqueducts
harbours
books
glass blowing
concrete


### Mayans

aqueducts
masonry
roads
irrigation
agriculture
writing
astrology
