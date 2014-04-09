This is a javascript module for doing substitutions on HTML templates.

My founding objective was to fetch JSON data via AJAX and then update
the HTML page.  By doing substitutions on a template embedded in the
HTML document it is easier to maintain than a bunch of custom
javascript that constructs the HTML nodes.


If you wanted to apply this to your own HTML pages this example should
help you get started:

```javascript
function updateTemplate1() {
    var data1 = getJSONData1()
    se1.substituteForData(data1)
}

window.onload = function() {
    var template = document.getElementById("template1")
    se1 = new SubstitutionEngine(template)
    updateTemplate1()
}
```

The HTML template could look like this: 

```html
<table id="template1" border=1>
<tr><th substitutionPath="col1"> col 1</th> <th substitutionPath="col2"> col 2</th></tr>
<tbody substitutionArrayPath="monkeys">
<tr><td substitutionPath="col1"></td><td substitutionPath="col2"></td></tr>
</tbody>
</table>
```

You can find a more detailed example in src/test/html/example1.html

License:

    This is free software: you can redistribute it and/or modify it
    under the terms of the GNU Lesser General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU Lesser General Public
    License along with this program.  If not, see
    <http://www.gnu.org/licenses/>.


project founder:
Robert Forsman
<github@thoth.purplefrog.com>
