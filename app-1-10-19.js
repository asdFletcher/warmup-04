'use strict';

let superagent = require('superagent');
let util = require('util');

function fetchPeopleWithPromises(){
  let url = 'https://swapi.co/api/people/';

  return superagent.get(url)
    .then( (res) => {
      let peopleArr = res.body.results;
      let urls = peopleArr.map( (val) => {
        let url = val.url;
        return url;
      });
      return urls;
    })
    .then( (urls) => {
      const promiseArr = []; 
      for( let i = 0; i < urls.length; i++){
        promiseArr.push(superagent.get(urls[i]));
      }
      return Promise.all(promiseArr);
    })
    .then( (results) => {
      let namesArr = results.map( person => {
        return person.body.name;
      });

      return namesArr;
    })
    .catch( (err) => {throw err});
}

// fetchPeopleWithPromises()
// .then( (namesArray) => {
//   console.log({namesArray});
// });


async function fetchPeopleWithAsync(){
  try {
    let url = 'https://swapi.co/api/people/';

    let result = await superagent.get(url);
  
    let urls = result.body.results.map( (personObj) => personObj.url);
  
    let promises = [];
    for (let i = 0; i < urls.length; i++){
      promises.push(superagent.get(urls[i]));
    }
  
    return Promise.all(promises)
      .then( (resolvedArr) => {
        const names = [];
        for(let i = 0; i < resolvedArr.length; i++){
          names.push(resolvedArr[i].body.name);
        }
        return names;
      })
  } catch (err) {throw err};
  
}

fetchPeopleWithAsync()
.then( (namesArray) => {
  console.log({namesArray});
});