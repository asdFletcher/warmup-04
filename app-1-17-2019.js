'use strict';

const superagent = require('superagent');


function fetchPeopleWithPromises() {
  const url = 'https://swapi.co/api/people/';
  
  let peopleURLs;
  
  superagent.get(url)
    .then( (result) => {
      // console.log(result.body);
      peopleURLs = result.body.results.map( (person) => {
        return person.url;
      });
      // console.log(peopleURLs);
      const promiseArr = [];
      for(let i = 0; i < peopleURLs.length; i++){
        promiseArr.push(superagent.get(peopleURLs[i]));
      }
      // let result = [];
      Promise.all(promiseArr)
        .then( (result) => {
          for(let i = 0; i < result.length; i++){
            console.log(result[i].body.name);
          }
        })
    });
}

// fetchPeopleWithPromises();

async function fetchPeopleWithAsync(){
  const url = 'https://swapi.co/api/people/';
  
  let response = await superagent.get(url);

  let peopleURLs = response.body.results.map( person =>  person.url );
  
  const promiseArr = [];
  for(let i = 0; i < peopleURLs.length; i++){
    promiseArr.push(superagent.get(peopleURLs[i]));
  }
  
  const names = [];
  return Promise.all(promiseArr)
  .then( (resolvedArray) => {
    for (let i = 0; i < resolvedArray.length; i++){
      names.push(resolvedArray[i].body.name);
    }
    return names
  });

}

fetchPeopleWithAsync()
  .then ( names => {
    console.log({names});
  })
