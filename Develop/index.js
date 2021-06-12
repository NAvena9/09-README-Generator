
const inquirer = require('inquirer');
const fs = require('fs');
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
var badge;

//Function with inquired in it to call the questions when called.
function questions() {
    return inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the title of the project?',
                name: 'title',
            },
            {
                type: 'input',
                message: 'What is the Project Description?',
                name: 'description',
            },
            {
                type: 'input',
                message: 'What are the installation requirements( any dependencies or packages)?',
                name: 'installation',
            },
            {
                type: 'input',
                message: 'Whats is the usage/utility of the project?',
                name: 'usage',
            },
            {
                type: 'input',
                message: 'Do you need torun tests on the project?',
                name: 'tests',
            },
            {
                type: 'input',
                message: 'Who are the contributors for this project?',
                name: 'contributors',
            },
            {
                type: 'list',
                message: 'What license does the project has?',
                name: 'license',
                choices: ["MIT", "APACHE2.0", "MOZILLA2.0", "None"]
            },
            {
                type: 'input',
                message: 'Enter your Github User Name:',
                name: 'github',
            },
            {
                type: 'input',
                message: 'Enter your Github profile link:',
                name: 'githubLink',
            },
            {
                type: 'input',
                message: 'Please enter your email:',
                name: 'mail',
            },
        ])
};

//this function renders the badges of the license depending on user selection
function renderLicenseBadge(data) {
    if (data.license === 'MIT') {
        badge = '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)'
    } else if (data.license === 'APACHE2.0') {
        badge = '![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)'
    } else if (data.license === 'MOZILLA2.0') {
        badge = '![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)'
    } else if (data.license === 'None') {
        return 'No license used in this project';
    }
};

//Function to generate the file with all the data comming from the user input. For making this easier I have added/wrote parts of the markup here (the same as the html exercise).
function generateFile(data) {
    return `
  # ${data.title}
  ${badge}
  
  ## Description
  ${data.description}
  
  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Tests](#tests)
  * [License](#license)
  * [Contributors](#contributors)
  * [Github Info](#Github)
   
   
   
  ## Installation
  ${data.installation}

  ## Usage
  ${data.usage}

  ## Tests
  ${data.tests}

  ## Contributors
  ${data.contributors}
  
  ## Questions
  If you have any further questions, feel free to contact me:
      * Username: ${data.github}
      * Link to Github Profile: ${data.githubLink}
      * eMail: [${data.mail}](mailto:${data.mail})
    
    `
};


questions()
    .then((data) => {
        renderLicenseBadge(data)
        const markDownfile = generateFile(data);
        return writeFileAsync("README.md", markDownfile);
    })
    .then(() => {
        console.log("The README.md file has been successfully generated!");
    })
    .catch((err) => {
        console.log(err);
    });


