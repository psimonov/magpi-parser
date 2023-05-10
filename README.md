
# MagPi parser

Parser of magPi and other magazines from [raspberrypi.com](https://www.raspberrypi.com)

![MagPi iPad covers](cover.jpg)

## Badges

![GitHub](https://img.shields.io/github/license/psimonov/magpi-parser?style=for-the-badge)

![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/psimonov/magpi-parser?label=latest%20version&style=for-the-badge)

![GitHub last commit](https://img.shields.io/github/last-commit/psimonov/magpi-parser?style=for-the-badge)


## Available magazines

- [MagPi](https://magpi.raspberrypi.com/issues)
- [HackSpace](https://hackspace.raspberrypi.com/issues)
- [Hello World](https://helloworld.raspberrypi.org/issues)


## Installation

You must have any modern version of [Node.js](https://nodejs.org) installed.
You can also use [NVM](https://github.com/nvm-sh/nvm) to quickly install the desired version:

```bash
$ nvm install
```

Install dependencies:

```bash
$ npm ci
```
## Usage

You can use a separate command to download issues of an individual magazine:

```bash
$ npm run magpi
$ npm run hackspace
$ npm run helloworld
```


## Roadmap

- ~~Automatically retrieve the last issue number~~

- Continue working from the last downloaded issue

- Displaying download progress


## Contributing

You can email or create a pull request adding downloads of new subject magazines or fixing the parsing of the layout of current sites


## Feedback

If you have any feedback, please reach out to us at psimonov.web@gmail.com
