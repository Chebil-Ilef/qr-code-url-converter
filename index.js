/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

// NOTE: you can't mix import and require in the same file either module or commonjs as a type in package.json

import inquirer from 'inquirer';
// to be able to run import you have to add "type": "module" in package.json
// npm install --save inquirer

import qr from 'qr-image';
// npm install qr-image

import fs from 'fs';

inquirer
  .prompt([
    {
        message: "Type in your URL: ",
        name: "URL",
      },
    ])
  .then((answers) => {
    /* to verify the answer node index.js */
    // console.log(answers);   

    /*convert url answer to qr code*/
    const url = answers.URL;
    var qr_code = qr.image(url, { type: 'png' });
    qr_code.pipe(fs.createWriteStream('qr_img.png'));
 
    /*write url in text file*/
    fs.writeFile("URL.txt", url, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
        });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });