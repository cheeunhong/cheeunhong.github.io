'use client';

import { useState } from 'react';

// Bio text from content/about.md. Any <span class="about-more"> in it stays collapsed
// until the visitor clicks the <button class="about-more-toggle"> placed next to it.
export default function AboutCopy({ html, children }) {
  const [expanded, setExpanded] = useState(false);

  const onClick = (event) => {
    const toggle = event.target.closest('.about-more-toggle');
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', String(!expanded));
    setExpanded(!expanded);
  };

  return (
    <div className={`about-copy ${expanded ? 'is-expanded' : ''}`}>
      <div onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
      {children}
    </div>
  );
}
