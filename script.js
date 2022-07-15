'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = ' ') {
  const { languages } = data;
  const { currencies } = data;
  const html = ` <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${Object.values(languages)}</p>
      <p class="country__row"><span>💰</span>${
        Object.values(currencies)[0].name
      }</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const requestCountry = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   // console.log(this.responseText);

//   request.addEventListener('load', function () {
//     //   console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // console.log(Object.values(languages));
//     // console.log(Object.values(currencies)[0].name);
//     renderCountry(data);
//   });
// };

// const getNieghbourCountry = function (country) {
//   //AJAX call 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   // console.log(this.responseText);

//   request.addEventListener('load', function () {
//     //   console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // console.log(Object.values(languages));
//     // console.log(Object.values(currencies)[0].name);

//     //RENDER 1
//     renderCountry(data);

//     //GET neighbouring countries
//     const [...neighbour] = data.borders;
//     console.log(neighbour);

//     if (!neighbour) return;

//     //AJAX call 2
//     neighbour.forEach(function (s) {
//       const request2 = new XMLHttpRequest();
//       request2.open('GET', `https://restcountries.com/v3.1/alpha/${s}`);
//       request2.send();

//       request2.addEventListener('load', function () {
//         const [data2] = JSON.parse(this.responseText);
//         console.log(data2);
//         renderCountry(data2, 'neighbour');
//       });
//     });
//   });
// };

// getNieghbourCountry('Congo');

// requestCountry('portugal');
// requestCountry('usa');
// requestCountry('Nigeria');
// requestCountry('United Kingdom');

const getJSON = (url, errMes = 'Something went wrong') => {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errMes} (${response.status})`);
    }
    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`);
//       }

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       //   console.log(neighbour);

//       if (!neighbour) return;

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`);
//       }
//       response.json();
//     })
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//       //   console.log(data);
//     })
//     .catch(err => {
//       console.error(`${err}😢😢😢`);
//       renderError(`Something went wrong ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      console.log(data);
      //   const neighbour = data[0].borders[0]
      //     ? data[0].borders[0]
      //     : data[0].borders;
      const neighbour = data[0].borders && data[0].borders[0];
      console.log(neighbour);

      if (!neighbour) throw new Error('No neighbours found');

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
      //   console.log(data);
    })
    .catch(err => {
      //   console.error(`${err}😢😢😢`);
      renderError(`Something went wrong ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', () => {
//   getCountryData('nigeria');
// });

// const whereAmI = function (lat, lon) {
//   fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(
//           `Check your coordinates and try again (${response.status})`
//         );
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You're in ${data.city} ${data.country}`);
//       console.log(data);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//       //   console.log(data);
//     })

//     .catch(err => {
//       console.error(`Location not found: ${err.message}`);
//     });
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(33.933, 18.474);

const lotteryPromise = new Promise((resolve, reject) => {
  console.log('lottery is going on');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You win ✨');
    } else {
      reject(new Error('You lose 😢'));
    }
  }, 2000);
});
lotteryPromise
  .then(res => console.log(res))
  .catch(reject => console.error(`${reject} Try again later!`));

const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited 2 seconds...');
    return wait(1);
  })
  .then(() => {
    console.log('I waited 3 second...');
    return wait(1);
  })
  .then(() => {
    console.log('I waited 4 second...');
    return wait(1);
  })
  .then(() => {
    console.log('I waited 5 second...');
    return wait(1);
  });

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('abc')).catch(x => console.error(x));

const getPositions = () => {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     resolve(position);
    //   },
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPositions().then(positions => {
  console.log(positions);
});

const whereAmI = function () {
  getPositions()
    .then(pos => {
      const { latitude: lat, longitude: lon } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`);
    })

    .then(response => {
      if (!response.ok)
        throw new Error(
          `Check your coordinates and try again (${response.status})`
        );
      return response.json();
    })
    .then(data => {
      console.log(`You're in ${data.city} ${data.country}`);
      console.log(data);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      //   console.log(data);
    })

    .catch(err => {
      console.error(`Location not found: ${err.message}`);
    });
};

btn.addEventListener('click', whereAmI);

const imgContainer = document.querySelector('.images');

const createImage = imgPath => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Image loading failed'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    console.log(img);
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .catch(err => {
    console.error(err);
  });

const whereAmI2 = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);

    if (!res.ok) {
      throw new Error('Problem getting location data');
    }

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    console.log(err);
    renderError(`❌${err.message}`);
  }
};

whereAmI2('Nigeria');
console.log('F I R S T');

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    // console.log([data1.capital, data2.capital, data3.capital].flat(1));
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(city => city[0].capital).flat(1));
  } catch (err) {
    console.log(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');

const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request Timeout'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(7),
])
  .then(res => console.log(res[0]))
  .catch(err => console.log(err));

Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));
