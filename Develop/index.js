const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
badgeIcon = "";


READMEAsync = util.promisify(fs.writeFile);

function generateBadge(answers) {
    let Mit = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
    let Apache = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    let Gpl = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
    let Bsd = "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"
    if(answers.license == "MIT") {
        badgeIcon = Mit
    }
    if(answers.license == "APACHE 2.0") {
        badgeIcon = Apache
    }
    if(answers.license == "GPL 3.0") {
        badgeIcon = Gpl
    }
    if(answers.license == "BSD 3") {
        badgeIcon = Bsd
    }
    if(answers.license == "None" || "") {
        badgeIcon = ""
    }
    return badgeIcon;
}


const generateREADME = (answers) =>


`
* ${badgeIcon}

# ${answers.title}

## Description
    ${answers.description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributed](#contributed)
* [Testing](#testing)
* [Questions](#questions)

## Installation
    
* To install necessary dependencies, run the following command:

            ${answers.install}

## Usage
    
* To use this repository, you should know:

            ${answers.usage}
        
## License

* Licensing:

            ${answers.license}

    
## Contributed

* This repository was made by: 

            ${answers.contributing}

## Testing

*  To test, make sure you run the following command:

        ${answers.tests}

## Questions

* Please know:

        If you have any further questions about this repository or any edits that you think would improve this repository, you can contact me directly at ${answers.email}. You can find more of my work on my GitHub at ${answers.git}`




const beginQues = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'title',
            message: 'What is the Title of this Project?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please enter a short description of this project:',
        },
        {
            type: 'input',
            name: 'install',
            message: 'What command (or commands) should be run to install necessary dependancies?',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Please enter what users should know about using this repository',
        },
        {
            type: 'list',
            name: 'license',
            message: 'Please select what kind of license you would like this project to have:',
            choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None']
        },
        {
            type: 'input',
            name: 'What should users know who want to contribute to this repository? ',
            message: 'contributing',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Please enter what information is necessary to run tests:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?',
        },
        {
            type: 'input',
            name: 'git',
            message: 'What is your GitHub username?',
        },
    ])
}

    let init = () => {
        beginQues()
        .then((answers) => READMEAsync('README.md', generateREADME(answers)))
        .then(() => console.log("You made a README file!"))
        .catch((err) => console.log(err));
    }

    init();
