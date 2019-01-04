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

fetchPeopleWithPromises();