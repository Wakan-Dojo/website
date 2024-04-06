# Wakan Dōjō

This repository holds the code for the Wakan Dōjō website. Here's a brief
summary of the stack from front to back:
- fontsource, heroicons, simple-icons
- Leaflet
- Tailwind CSS & PostCSS
- Gatsby & React, Gatsby handles image processing
- DecapCMS editing yaml files & markdown files
- Deployed with Cloudflare Pages

The website is a single-page html containing multiple scrollable sections.
Each section is described as a markdown file with frontmatter. A section
may the "the blog", and contain small articles (another collection
of markdown files with frontmatter). A section can hold a map with a marker.
A section can be the gallery and contain photos.
There are additional yaml & markdown files describing the site metadata,
the map details, the content of the gallery, the footer.

## What might be missing?

- It could be fun to play with custom preview components in DecapCMS
- The site has absolutely zero tracking. This is by design.
- There is no contact form, just an email address.
