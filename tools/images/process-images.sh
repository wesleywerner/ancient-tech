#!/bin/bash
#  This program is free software: you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation, either version 3 of the License, or
#  any later version.
#  
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#  
#  You should have received a copy of the GNU General Public License
#  along with this program. If not, see http://www.gnu.org/licenses/.

# Download the freeciv graphics resource freeciv-graphics-materials-*.tar.bz2 from
# https://sourceforge.net/projects/freeciv/

IM=`which convert`
if [ -z $IM ]
then
  echo "I require ImageMagick to run. Please install it and try again."
  exit 1;
fi

mkdir -p processed/tech
cd ./freeciv-*/data/graphics/tech/
for f in *.svg; do convert "$f" -resize 100x100 "../../../../processed/tech/${f%%.svg}.jpg"; done
for f in *.png; do convert "$f" -resize 100x100 "../../../../processed/tech/${f%%.png}.jpg"; done
for f in *.jpg; do convert "$f" -resize 100x100 "../../../../processed/tech/$f"; done

cd ../../../../processed/tech/
echo "Changing to processed directory"
echo "Convert complete"
