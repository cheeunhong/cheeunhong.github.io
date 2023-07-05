# cheeunhong.github.io
# for bibtex
# abbr / abstract / supp / poster / slides / website / altmetric / dimensions
# coauthors 
<!-- https://github.com/alshedivat/al-folio/blob/master/_config.yml -->
changed _layouts/bib.html L16 
 {%- elsif entry.abbr -%} to  {%- if entry.abbr -%} 
 and added {%- endif -%}
 .