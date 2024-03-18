# Contribution Guidelines

When contributing to `SynaxisApp`, whether on GitHub or in other community spaces:

- Be respectful, civil, and open-minded.
- Before opening a new pull request, try searching through the [issue tracker](https://github.com/TheSynaxis/SynaxisApp/issues) for known issues or fixes.
- If you want to make code changes based on your personal opinion(s), make sure you open an issue first describing the changes you want to make, and open a pull request only when your suggestions get approved by maintainers.

## How to Contribute

### Prerequisites

In order to not waste your time implementing a change that has already been declined, or is generally not needed, start by [opening an issue](https://github.com/TheSynaxis/SynaxisApp/issues/new/choose) describing the problem you would like to solve.

### Setup your environment locally

_Some commands will assume you have the Github CLI installed, if you haven't, consider [installing it](https://github.com/cli/cli#installation), but you can always use the Web UI if you prefer that instead._

In order to contribute to this project, you will need to fork the repository:

```bash
gh repo fork TheSynaxis/SynaxisApp
```

then, clone it to your local machine:

```bash
gh repo clone <your-github-name>/SynaxisApp
```

This project uses [pnpm](https://pnpm.io) as its package manager. Install it if you haven't already:

```bash
npm install -g pnpm
```

Then, install the project's dependencies:

```bash
pnpm install
```

### Implement your changes

When making commits, make sure to follow the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) guidelines, i.e. prepending the message with `feat:`, `fix:`, `chore:`, `docs:`, etc... You can use `git status` to double check which files have not yet been staged for commit:

```bash
git add <file> && git commit -m "feat/fix/chore/docs: commit message"
```

Alternatively, you can run `pnpm commit` to run commitizen, which will walk you through making a commit message following the conventional commit guidelines.

Our commonly used scopes are:

- (site): for changes made to the headless WordPress website.
- (apps): for changes made to the browser apps that affect them both, like a sidebar change.
- (calendar): for changes made to the calendar browser app.
- (sayings): for changes made to the quotes browser app.
- (ui): for changes made to ui components used in both the website and browser apps.
- (server): for changes made to the tRPC routes and procedures.
- (db): for changes made to the database schema.
- (auth): for changes related to user auth.
- (styles): for changes related to general styles.

### When you're done

When all that's done, it's time to file a pull request to upstream:

```bash
gh pr create --web
```

and fill out the title and body appropriately. Again, make sure to follow the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) guidelines for your title.

## Credits

This documented was inspired by the contributing guidelines for [t3-oss/create-t3-app](https://github.com/t3-oss/create-t3-app/blob/main/CONTRIBUTING.md).
