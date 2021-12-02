const newman = require('newman');

newman.run({
    collection: 'postman/UsersTests.postman_collection.json', 
    enviroment: 'postman/Local.postman_environment.json',
    reporters: ['htmlextra'],
    iterationCount: 1,
    reporter: {
        htmlextra: {
            export: './postman/report.html',
        }
    }
})