#! /usr/bin/env python

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

import sys
import json
from configobj import ConfigObj
filename = sys.argv[1]
config = ConfigObj(filename)
# convert to a list
l = []
for n in config.sections:
  if n != 'control':
    item = config.get(n)
    if 'graphic' in item.keys():
      # remove graphic path prefix
      if  item['graphic'].startswith('a.'):
        item['graphic'] = item['graphic'][2:]
      # append image extension
      item['graphic'] += '.jpg'
    l.append(item)
print(json.dumps(l))
