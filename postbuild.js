const fs = require('fs');

const src404 = './404.html';
const dest404 = './dist/CinePOS_FrontEnd/404.html';

const srcCname = './CNAME';
const destCname = './dist/CinePOS_FrontEnd/CNAME';

fs.copyFile(src404, dest404, (err) => {
  if (err) {
    console.error('Error while copying 404.html:', err);
  } else {
    console.log('Successfully copied 404.html to /dist/CinePOS_FrontEnd/');
  }
});
fs.copyFile(srcCname, destCname, (err) => {
  if (err) {
    console.error('Error while copying CNAME:', err);
  } else {
    console.log('Successfully copied CNAME to /dist/CinePOS_FrontEnd/');
  }
});