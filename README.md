# Astro Minimal Starter

A minimal starter template for building an Astro site with [CloudCannon](https://cloudcannon.com/) using **Editable Regions** for visual editing.

See a [demo site](https://tiny-jackal.cloudvent.net/).

## Features

- Visual editing with [Editable Regions](https://cloudcannon.com/documentation/developer-guides/set-up-visual-editing/an-overview-of-editable-regions/) (text, image, array, source, and component regions)
- Page building with reusable components
- Blog with pagination and tags
- [Tailwind CSS v4](https://tailwindcss.com/) with CSS-first configuration
- SEO controls
- Pagefind search

## Getting Started

Click `Use this template` to make your own copy of the repository.

### Prerequisites

Node.js 24 is recommended — the [CloudCannon CLI](https://cloudcannon.com/documentation/developer-reference/cli/) requires it.

### Local Development

1. Clone the repository to your local machine.

2. Start the development server.

```bash
npm install
npm run dev
```

Your site is available at [localhost:4321](http://localhost:4321).

### Editing Locally with CloudCannon

Run CloudCannon against your local files with the [CloudCannon CLI](https://cloudcannon.com/documentation/developer-reference/cli/)
dev server. This is the fastest way to iterate on `cloudcannon.config.yml`, inputs, structures, and editable
regions — you see the editing experience without committing and pushing first.

1. Install the CLI and log in (requires Node.js 24+):

   ```bash
   npm install --global @cloudcannon/cli
   cloudcannon login
   ```

2. Build the site, so the dev server has output to serve:

   ```bash
   npm run build
   ```

3. Start CloudCannon locally, pointing it at the build output:

   ```bash
   cloudcannon dev dist
   ```

The dev server runs on port `10101` by default and opens CloudCannon in your browser, pointed at the
files in this repo. Content edits sync to disk as you make them; re-run `npm run build` after changing
components or templates to refresh the preview.

Before you commit configuration changes, validate them:

```bash
cloudcannon validate
```

The dev server is a development tool only — editors never access it. See
[Build your editing experience locally](https://cloudcannon.com/blog/build-your-editing-experience-locally-with-the-cloudcannon-dev-server/)
for the full workflow.

### AI Agent Skills

If you build with an AI coding agent (Claude Code, Cursor, Copilot, and others), install
[CloudCannon's agent skills](https://github.com/CloudCannon/agent-skills). They teach your agent how CloudCannon
configuration, editable regions, and snippets actually work, so it stops guessing.

```bash
npx skills add cloudcannon/agent-skills --all
```

To see what's on offer before installing anything, or to install a subset:

```bash
npx skills add cloudcannon/agent-skills --list
npx skills add cloudcannon/agent-skills --skill <names>
```

Other useful flags and commands:

| Command                           | What it does                                                  |
| --------------------------------- | ------------------------------------------------------------- |
| `--all`                           | Install every skill for every detected agent, without prompts |
| `-l`, `--list`                    | List the skills in the repository without installing          |
| `-g`, `--global`                  | Install for your user account instead of just this project    |
| `npx skills ls`                   | List the skills you have installed, project and global        |
| `npx skills update`               | Update installed skills to their latest versions              |
| `npx skills remove`               | Remove installed skills                                       |
| `npx skills experimental_install` | Restore the exact skills recorded in `skills-lock.json`       |

Skills install to `.agents/skills/`, with agent-specific directories such as `.claude/skills/` and `agent/skills/`
pointing at them. Those directories are gitignored, but `skills-lock.json` is committed — so a teammate can restore
the same set and versions you used.

In Claude Code you can install them as a plugin instead:

```
/plugin marketplace add CloudCannon/agent-skills
/plugin install agent-skills@cloudcannon
```

## CloudCannon Setup

This site is pre-configured for CloudCannon. Connect your repository and CloudCannon will detect the configuration in `.cloudcannon/initial-site-settings.json` and build your site automatically. The editing experience is defined in `cloudcannon.config.yml`, which you can modify to control your editors' experience.

### Editable Regions

This starter demonstrates several types of Editable Region:

- **Text** (`data-editable="text"`) for editing front matter text values inline
- **Image** (`data-editable="image"`) for editing front matter image values
- **Array** (`data-editable="array"`) for page-building with reorderable content blocks
- **Source** (`data-editable="source"`) for making standalone `.astro` pages editable
- **Component** (`<editable-component>`) for live re-rendering of Astro components

Components that need live re-rendering are registered in `src/scripts/register-components.ts` and loaded conditionally when the site is open in CloudCannon's Visual Editor.

#### Source Editables

The About page (`src/content/pages/about.astro`) demonstrates **source editables** — a pattern where content lives directly in an Astro template rather than in Markdown front matter. Source editable regions use `data-editable="source"`, `data-path="path/to/file.astro"`, and `data-key` attributes. CloudCannon writes changes straight back to the `.astro` file.

This is useful for standalone pages (like About or Contact) where a developer wants full control over the markup while still giving editors visual editing access — **and where page building with components is *not* desired**. No accompanying Markdown file or front matter schema is needed. A thin routing wrapper in `src/pages/about.astro` handles Astro's file-based routing.

### Components

Three page-building components are included:

- **Hero** — heading, subheading, image, and optional button
- **LeftRight** — side-by-side text and image, with optional flip and button
- **TextBlock** — heading and rich text content

### Content

- **Pages** are in `src/content/pages/` as Markdown with structured front matter, and support a component-based page-building workflow. Developers can also add standalone pages paired with a routing file in `src/pages/` (like `src/content/pages/about.astro`), and decide which parts of those pages are editable in CloudCannon.
- **Blog posts** are in `src/content/blog/` as MDX files
- **Data** files (site settings, navigation) are in `data/`

## Project Structure

```
├── .cloudcannon/          # CloudCannon schemas and postbuild
├── cloudcannon.config.yml # CloudCannon configuration
├── data/                  # Site-wide data files
├── public/                # Static assets
└── src/
    ├── components/        # Astro components
    ├── content/           # Content collections (pages, blog)
    ├── layouts/           # Page layouts
    ├── pages/             # Astro page routes
    ├── scripts/           # Component registration for visual editing
    └── styles/            # Global CSS (Tailwind v4)
```

## Learn More

- [CloudCannon documentation](https://cloudcannon.com/documentation/) — configuration, editing, and build reference
- [CloudCannon CLI reference](https://cloudcannon.com/documentation/developer-reference/cli/) — `cloudcannon dev`, `validate`, and more
- [CloudCannon agent skills](https://github.com/CloudCannon/agent-skills) — skills for working on CloudCannon sites with AI agents
