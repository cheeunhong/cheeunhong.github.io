---
layout: page
permalink: /publications/
title: Publications
description: 
years: [2023, 2022, 2021, 2020]
nav: true
nav_order: 1
# importance: 2
# <!-- {% bibliography -f {{ site.scholar.bibliography }} -q @*[year={{y}}]* %} -->
# {% bibliography -f papers -q @*[year={{y}}]* %}
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
