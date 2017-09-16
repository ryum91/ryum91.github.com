import 'polyfill';
import 'whatwg-fetch';
import {markdown} from 'markdown';

export default {
  /**
   * Request Markdown file
   * @param The Markdown file path
   * @param The DOM object for which the markdown result is to be printed.
   */
  requestMarkdown(path, resultDom) {
    fetch(path, {
      method: 'GET'
    }).then(res => {
      if( !res.ok ) {
        throw Error(res.statusText);
      } else {
        return res.text();
      }
    }).then(res => {
      resultDom.innerHTML = markdown.toHTML(res);
    });
  }
};
