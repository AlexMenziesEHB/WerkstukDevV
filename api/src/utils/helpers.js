const {v1: uuidv1 } = require('uuid');
const sortObject = require('sort-object-keys');

const Helpers = {
  generateUUID: () => {
     const uuid = uuidv1();
     return uuid;
  },

  checkTitleLength: (title) => {
    if (typeof title !== 'string' || title == null || title.length > 50 || title.length == '' || title[0] !== title[0].toUpperCase()) {
      return false;
    }
    return title;
  },

  checkParameters: (expectedParameters, givenParameters, allowOtherParameters) => {
    if(
      typeof expectedParameters == "object" &&
      typeof givenParameters == "object" &&
      typeof allowOtherParameters == "boolean"
    ) {
      let sortedExpectedParams = sortObject(expectedParameters);
      let sortedGivenParams = sortObject(givenParameters);
      let matchingParameters = 0;
      for(const requiredParam in sortedExpectedParams){
        if(
          requiredParam in sortedGivenParams &&
          typeof sortedGivenParams[requiredParam] == expectedParameters[requiredParam]
        ) {
          matchingParameters++;
        }
      }
      if(Object.keys(sortedGivenParams).length > matchingParameters && allowOtherParameters == false){
        return false;
      } else if(Object.keys(sortedGivenParams).length > matchingParameters && allowOtherParameters == true){
        return true;
      } else if(matchingParameters < Object.keys(sortedExpectedParams).length){
        return false;
      } else if(matchingParameters == Object.keys(sortedExpectedParams).length){
        return true;
      } else{
        return false;
      }
    }
    return 400;
  }
}

module.exports = Helpers