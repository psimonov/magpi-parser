const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const https = require("https");

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
            })
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

module.exports = { downloadFile, parseData, parseUrl, readFile, writeFile, removeFile };
