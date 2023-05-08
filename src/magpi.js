const { downloadFile, parseData, parseUrl, readFile, removeFile} = require("./_core");

const FILE_PATH = `${__dirname}/../files/magpi/`;
const SITE_HOST = 'https://magpi.raspberrypi.com';
const ISSUES_COUNT = 129;

(async () => {
    try {
        for (let issueNumber = ISSUES_COUNT; issueNumber > 0; issueNumber--) {
            console.log('===================');

            const link = await parseUrl(`${SITE_HOST}/issues/${issueNumber}/pdf/download`, '.c-link');
            const fileName = await downloadFile(`${SITE_HOST}${link}`);
            const fileData = await readFile(fileName);
            const directLink = parseData(fileData, 'a');

            await removeFile(fileName);

            console.log(`Direct link (#${issueNumber}): ${directLink}`);

            await downloadFile(directLink, FILE_PATH, `MagPi${issueNumber}.pdf`);
        }
    } catch (e) {
        console.log(e);
    }
})();
