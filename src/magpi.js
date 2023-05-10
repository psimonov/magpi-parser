const {
  downloadFile,
  parseData,
  parseUrl,
  readFile,
  removeFile,
  consoleFrame,
} = require('./_core');

const FILE_PATH = `${__dirname}/../files/magpi/`;
const SITE_HOST = 'https://magpi.raspberrypi.com';
const ISSUES_COUNT = 129;

(async () => {
  consoleFrame(
    [
      'Starting downloading issues...',
      `FILE_PATH: ${FILE_PATH}`,
      `SITE_HOST: ${SITE_HOST}`,
      `ISSUES_COUNT: ${ISSUES_COUNT}`,
    ],
    {
      char: '*',
      mode: 'frame',
    }
  );

  try {
    for (let issueNumber = ISSUES_COUNT; issueNumber > 0; issueNumber--) {
      consoleFrame(`Parsing issue #${issueNumber} url...`);

      const link = await parseUrl(
        `${SITE_HOST}/issues/${issueNumber}/pdf/download`,
        '.c-link'
      );

      consoleFrame(`Issue url is ${link}. Checking redirects...`);

      const fileName = await downloadFile(`${SITE_HOST}${link}`);
      const fileData = await readFile(fileName);
      const directLink = parseData(fileData, 'a');

      await removeFile(fileName);

      consoleFrame([`Direct link is ${directLink}`, 'Downloading file...']);

      await downloadFile(directLink, FILE_PATH, `MagPi${issueNumber}.pdf`);

      consoleFrame(`Issue successfully saved as: MagPi${issueNumber}.pdf`, {
        mode: 'underline',
      });
    }

    consoleFrame('Done!');
  } catch (e) {
    console.log(e);
  }
})();
