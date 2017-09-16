import Common from 'common';

const contents = document.getElementById('contents');

Common.requestMarkdown('/data/test.md', contents);
