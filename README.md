# Parser of magPi and other magazines from [raspberrypi.com](https://www.raspberrypi.com)

## Introduction

### Available magazines:

* [MagPi](https://magpi.raspberrypi.com/issues)
* [HackSpace](https://hackspace.raspberrypi.com/issues)
* [Hello World](https://helloworld.raspberrypi.org/issues)

## Usage

### Requirements

You must have any modern version of [Node.js](https://nodejs.org) installed.
You can also use [NVM](https://github.com/nvm-sh/nvm) to quickly install the desired version:

```bash
$ nvm install
```

### Installation

Dependencies installation:

```bash
$ npm ci
```

### Parsing

You can use a separate command to download issues of an individual magazine:

```bash
$ npm run magpi
$ npm run hackspace
$ npm run helloworld
```

At the moment, the number of issues to download is not defined automatically
and is described in each script separately by the *ISSUES_COUNT* variable.
This will be fixed in upcoming versions.
