'use strict';

const superagent = require('superagent');


function fetchPeopleWithPromises(){
  let url = 'https://swapi.co/api/people/';

  superagent.get(url)
    .then( (starwarsDataResponse)=> {
      // console.log(starwarsDataResponse.body);
      // console.log(starwarsDataResponse.body.results[0].url);
      let urlArray = [];
      for (let i = 0; i < starwarsDataResponse.body.results.length; i ++){
        urlArray.push(starwarsDataResponse.body.results[i].url);
      }
      console.log(urlArray);

      let promiseArr = [];
      for (let i = 0; i < urlArray.length; i++){
        let singlePromise = superagent.get(urlArray[i]);
        promiseArr.push(singlePromise);
      }
      Promise.all(promiseArr)
      .then( (result)=> {
        for (let i = 0; i < result.length; i++){
          console.log(result[i].body.name);
        }
      })
      .catch( (err) => {
        throw new Error(err);
      });

    })
    .catch();

}

// fetchPeopleWithPromises();

async function fetchpeopleWithAsync(){

  try {

    let url = 'https://swapi.co/api/people/';
    let peopleSet = await superagent.get(url);

    let people = peopleSet.body && peopleSet.body.results || [];

    let peopleRequests = people.map( person => {
      return superagent.get(person.url);
    });
    let swapiNames = await Promise.all(peopleRequests)
      .then( people => {
        let names = [];
        for(let data of people) {
          names.push(data.body.name);
        }
        return names;
      });
    return swapiNames;
  }
  catch (e) {console.error(e);}
}

fetchpeopleWithAsync()
  .then( (names) => {
    console.log(names);
  })
  .catch( err => {throw new Error(err);});