# Katherine Yang Portfolio

React + Vite portfolio with a shared navigation and footer, four main pages,
and reusable project detail pages. Existing case studies stay in their original
components; personal content lives in `src/data/profile.js`.

## Local Development

```sh
npm install # only for a fresh checkout; no new dependencies were added
npm run dev
npm run build
npm run preview
npm run lint
npm test
```

## Pages and Routing

The small router in `src/lib/useRoute.js` uses the browser's native hash history:

| Page | URL suffix |
| --- | --- |
| Home | `#/` |
| Work | `#/work` |
| About | `#/about` |
| Playground | `#/playground` |
| CloudSky | `#/projects/cloudsky` |
| Sidequest | `#/projects/sidequest` |
| HONOR | `#/projects/honor` |

Native links support keyboard navigation, opening in a new tab, and browser
Back/Forward. Navigation updates the document title, scrolls to the top, and
focuses the new page's h1. Old `?view=cloudsky` (and other project) links redirect
to their page routes without adding a history entry. Unknown routes show a
not-found page with a link to Work.

## GitHub Pages

Build with `npm run build` and publish the contents of `dist/` using the existing
deployment process. `vite.config.js` uses `base: './'`, so built JS, CSS, and the
favicon work at either a domain root or a repository subdirectory.
`src/lib/assets.js` gives photos, project thumbnails, and the resume the same
base-aware paths.

Since routes are after `#`, GitHub Pages only receives a request for the site's
index page. Refreshing a project URL does not need a custom 404 page or rewrite
rules. A repository deployment might use:
`https://ky453.github.io/katherine-yang/#/projects/cloudsky`.

The existing resume link expects `public/resume.pdf`; that file is not currently
in this repository. Add the actual PDF there when available.

## Adding Duolingo

1. Add `"duolingo"` to `PROJECT_ORDER` in `src/data/projects.js`.
2. Add a `duolingo` entry to `PROJECTS` with `id`, `number`, `title`, `eyebrow`,
   `question`, `summary`, `tags`, and `sections`. Each section has `heading` and
   `body`. Optional `placeholder: true` marks draft content.
3. Set `thumbnail` to a path in `public/`, for example
   `"/assets/photos/duolingo-project/hi-fi.png"`. Existing Duolingo images are
   already in that folder. Alternatively, add an `art` scene to `ProjectArt.jsx`.
4. For a custom case-study layout, create `src/components/DuolingoCaseStudy.jsx`
   and register it in `CASE_STUDIES` in `src/components/ProjectContent.jsx`.
   Otherwise the reusable section renderer displays `sections` automatically.
5. Optionally update `FEATURED_PROJECTS` to feature Duolingo on Home. Keep this
   separate list at two or three projects.

Work, `#/projects/duolingo`, project counts, and Previous/Next navigation will
update automatically. No additional route declaration is needed.
