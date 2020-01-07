# Macro Generator for FFBE

An memu macro generator for playing FFBE. Support both MEmu and Nox.
Website can be found [here](https://hkmikemak.github.io/ffbe-macro-generator/).

## Available Actions

- Click an corrdinate
- Click an unit slot
- Click multiple unit slot at the same time
- Open user's skill panel
- Select skills
- Wait for specific seconds

## Project Structure

| Folder | Description |
| ------ | ----------- |
| ./src/memuMacro | Basic MEMU macro operations (e,g. click, drag wait, etc) |
| &nbsp;&nbsp;./src/ffbeMacro | MEMU macro operations for FFBE (e.g. click unit slots, select skills, etc) |
| &nbsp;&nbsp;&nbsp;&nbsp;./src/macroBuilder | UI library for builing macro |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;./src/web | main website |

## Build and run your own

```
npm install
npm run gulp
```
