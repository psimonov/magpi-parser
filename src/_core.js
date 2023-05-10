const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const https = require('https');

const instance = axios.create();

const readFile = (filePath, charset = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, charset, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

const removeFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.rm(filePath, {}, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const downloadFile = (url, destination = '', fileNmae = null) => {
  return new Promise((resolve, reject) => {
    const basename = fileNmae || path.basename(url);
    const file = fs.createWriteStream(`${destination}${basename}`);

    https.get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve(basename);
      });

      file.on('error', (err) => {
        reject(err);
      });
    });
  });
};

const parseUrl = async (url, selector, eq = 0) => {
  const { data } = await instance.get(url);
  const $ = cheerio.load(data);

  return $(selector).eq(eq).attr('href');
};

const parseData = (data, selector) => {
  const $ = cheerio.load(data);

  return $(selector).attr('href');
};

const consoleFrame = (message, config) => {
  const defaultConfig = {
    char: '=',
    whiteSpace: ' ',
    mode: 'none', // underline, between, frame, none
  };

  const { char, whiteSpace, mode } = {
    ...defaultConfig,
    ...config,
  };

  const isFrame = Number(mode === 'frame');
  const messages = Array.isArray(message) ? message : [message]; // массив сообщений
  const maxMessageLength = Math.max(...messages.map((m) => m.length)); // максимальная длина строки

  const mainLine =
    char.repeat(isFrame * 2) +
    char.repeat(maxMessageLength) +
    char.repeat(isFrame * 2);

  if (['between', 'frame'].includes(mode)) {
    console.log(mainLine);
  }

  messages.forEach((message) => {
    const messageLine =
      (isFrame ? char + whiteSpace : '') +
      message +
      whiteSpace.repeat(maxMessageLength - message.length + 1);

    console.log(messageLine + mainLine.slice(messageLine.length));
  });

  if (['between', 'frame', 'underline'].includes(mode)) {
    console.log(mainLine);
    console.log();
  }
};

module.exports = {
  downloadFile,
  parseData,
  parseUrl,
  readFile,
  writeFile,
  removeFile,
  consoleFrame,
};
