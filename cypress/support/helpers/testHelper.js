const faker = require('faker')

export class TestHelper {
    /**
    * This generates a random string, can be used to generate names too
    * @param {number} options.maxLength - max length of string to generate
    * @returns {string}
    */
    getRandomString( options = {} ) {
        if(options.number) {
            return faker.random.alpha(options.number);
        }
        else{
            return faker.random.alpha(8);    
        }
    }
}
