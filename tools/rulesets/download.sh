#!/bin/bash

wget -O techs.ruleset http://svn.gna.org/viewcvs/*checkout*/freeciv/trunk/data/classic/techs.ruleset
#wget -O buildings.ruleset http://svn.gna.org/viewcvs/*checkout*/freeciv/trunk/data/classic/buildings.ruleset

# adjust some of the file formatting so it can be parsed by our script
# replace the comment symbol with crunch
sed -i -e 's/;/#/g' *.ruleset
# replace the string open qualifier with triple-quotes
sed -i -e 's/_(/""/g' *.ruleset
# replace the string close qualifier
sed -i -e 's/")/"""/g' *.ruleset
# remove back slashes
sed -i -e 's/\\//g' *.ruleset
# remove multi line seperators
sed -i -e 's/""", """//g' *.ruleset

for f in *.ruleset; do
  python convert.py "$f" | python -m json.tool > "$f.json"
done

# buildings.ruleset has this structure we need to fix
#reqs	=
#    { "type", "name", "range"
#      "Tech", "Radio", "Player"
#    }


#sed -i -e 's/foo/bar/g' techs.ruleset

