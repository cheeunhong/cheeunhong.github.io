# cheeunhong.github.io
# for bibtex
# abbr / abstract / supp / poster / slides / website / altmetric / dimensions
# coauthors 
<!-- https://github.com/alshedivat/al-folio/blob/master/_config.yml -->
changed _layouts/bib.html L16 
 {%- elsif entry.abbr -%} to  {%- if entry.abbr -%} 
 and added {%- endif -%}
 .

To change the color, 
go to _base.scss, and set color parameter to var(--global-theme-color);
overall control in _themes.scss 

git add .
git commit -m "update DATE_OF_UPDATE"
git push -u origin main

