import './main.scss';
import 'polyfill';
import 'whatwg-fetch';
import Common from 'common';

const contents = document.getElementById('contents');

Common.requestMarkdown('/data/test.md', contents);

fetch('https://api.github.com/repos/ryum91/ryum91.github.com/contents/data', {
  method: 'GET'
}).then(res => {
  if( res.ok ) {
    return res.json();
  } else {
    throw Error(res.statusText);
  }
}).then(res => {
  console.log(res);
});
