'use strict';

const superagent = require('superagent');


function fetchPeopleWithPromises(){
  const url = 'https://swapi.co/api/people/';

  return superagent.get(url)
    .then(res => {
      const peopleUrls = res.body.results.map(people => people.url);
      
      const promiseArr = [];
      for(let i = 0; i < peopleUrls.length; i++){
        promiseArr.push(superagent.get(peopleUrls[i]));
      }
    
      return Promise.all(promiseArr)
        .then(res => {
          return res.map( response => {
            return response.body.name;
          })
        });
    });


}

// fetchPeopleWithPromises()
//   .then( res => {
//     console.log(res);
//   });


async function fetchPeopleWithAsync(){
  const url = 'https://swapi.co/api/people/';

  let data = await superagent.get(url);
  let peopleUrls = data.body.results.map(person => {
    return person.url;
  })
  let promises = [];
  for(let i = 0; i < peopleUrls.length; i++){
    promises.push(superagent.get(peopleUrls[i]));
  }
  return Promise.all(promises)
    .then(res => {
      return res.map( person => {
        return person.body.name;
      });
    })
}

fetchPeopleWithAsync()
  .then( finalArray=> {
    console.log({finalArray});
  })
