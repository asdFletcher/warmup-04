'use strict';

const superagent = require('superagent');

function fetchPeopleWithPromises(){

  let url = "https://swapi.co/api/people/";

  return superagent.get(url)
    .then( res => {
      const urlArr = res.body.results.map( people => {
        return people.url;
      });

      let promises = [];
      for(let i = 0; i < urlArr.length; i++){
        promises.push(superagent.get(urlArr[i]));
      }

      return Promise.all(promises)
        .then( arr => {
          return arr.map( person => {
            return person.body.name;
          });
        });
    })


}

// fetchPeopleWithPromises()
//   .then(res => {
//     console.log(res);
//   });

const fetchPeopleWithAsync = async () => {
  let url = "https://swapi.co/api/people/";

  let data = await superagent.get(url);
  let urlArr = data.body.results.map( person => person.url);

  let promises = [];
  for(let i = 0; i < urlArr.length; i++){
    promises.push(superagent.get(urlArr[i]));
  }

  const dataArr = await Promise.all(promises);
  let result = dataArr.map( person => {
    return person.body.name;
  })
  return result;
}

// fetchPeopleWithAsync()
//   .then( res => {
//     console.log(res);
//   })
