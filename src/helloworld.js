const { downloadFile, parseUrl, consoleFrame } = require('./_core');

const FILE_PATH = `${__dirname}/../files/helloworld/`;
const SITE_HOST = 'https://helloworld.raspberrypi.org';
const ISSUES_COUNT = 20;

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

      const directLink = await parseUrl(
        `${SITE_HOST}/issues/${issueNumber}/pdf`,
        '.c-link',
        1
      );

      consoleFrame([`Direct link is ${directLink}`, 'Downloading file...']);

      await downloadFile(directLink, FILE_PATH, `HelloWorld${issueNumber}.pdf`);

      consoleFrame(`Issue successfully saved as: MagPi${issueNumber}.pdf`, {
        mode: 'underline',
      });
    }

    consoleFrame('Done!');
  } catch (e) {
    console.log(e);
  }
})();
