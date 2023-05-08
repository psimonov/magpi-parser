const { downloadFile, parseUrl } = require("./_core");

const FILE_PATH = `${__dirname}/../files/helloworld/`;
const SITE_HOST = 'https://helloworld.raspberrypi.org';
const ISSUES_COUNT = 20;

(async () => {
    try {
        for (let issueNumber = ISSUES_COUNT; issueNumber > 0; issueNumber--) {
            console.log('===================');

            const directLink = await parseUrl(`${SITE_HOST}/issues/${issueNumber}/pdf`, '.c-link', 1);

            console.log(`Direct link (#${issueNumber}): ${directLink}`);

            await downloadFile(directLink, FILE_PATH, `HelloWorld${issueNumber}.pdf`);
        }
    } catch (e) {
        console.log(e);
    }
})();
