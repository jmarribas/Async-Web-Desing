const header = document.querySelector('header');
const main = document.querySelector('main');
main.className = 'container';

const logoDiv = document.createElement('div');
const logo = document.createElement('h1');
logo.textContent = 'J';
const buttonInit = document.createElement('button');
buttonInit.textContent = 'Inicio';
const searchForm = document.createElement('form');
const searchInputDiv = document.createElement('div');
searchInputDiv.className = 'inputGroup';
const searchInput = document.createElement('input');
searchInput.placeholder = 'Busca aquí';
const searchButton = document.createElement('button');
searchButton.textContent = 'Buscar';

header.appendChild(logoDiv);
logoDiv.appendChild(logo);
header.appendChild(buttonInit);
header.appendChild(searchForm);
searchForm.appendChild(searchInputDiv);
searchForm.appendChild(searchInput);
searchForm.appendChild(searchButton);

const bigImgDiv = document.createElement('div');
bigImgDiv.className = 'bigImgDiv';
const bigImg = document.createElement('img');

const BigImgFunction = (src, infoDescription) => {
  window.scrollTo(0, 0);
  const closeButtonDiv = document.createElement('div')
  const closeButton = document.createElement('button');
  closeButton.textContent = 'CERRAR';
  const bigImgDiv = document.createElement('div');
  bigImgDiv.className = 'bigImgDiv';
  const bigImg = document.createElement('img');
  bigImg.src = src;
  const description = document.createElement('p');
  description.textContent = infoDescription

  main.appendChild(bigImgDiv);
  bigImgDiv.appendChild(closeButtonDiv);
  closeButtonDiv.appendChild(closeButton);
  bigImgDiv.appendChild(bigImg);
  bigImgDiv.appendChild(description);

  let imgBlock01 = document.querySelector('.container').style.pointerEvents = 'none';
  bigImgDiv.style.pointerEvents = 'auto';

  closeButton.addEventListener('click', () => {
    bigImgDiv.remove();
    let imgBlock02 = document.querySelector('.container').style.pointerEvents = 'auto';
  })
}

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  main.innerHTML = '';
  printImages(searchInput.value);
  searchInput.value = '';
});

buttonInit.addEventListener('click', () => {
  main.innerHTML = '';
  printImages();
});

const printImages = (search = "popular") => {
  let url = `https://api.unsplash.com/search/photos/?query=${search}&per_page=16&page=1&client_id=hmiz7oalBaeiqrjhkRfptINRu0AsWvEtTFpmggueduQ`
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      for (const photography of data.results) {
        const photographyDiv = document.createElement('div');
        const image = document.createElement('img');
        image.className = 'imgGallery';

        image.src = photography.urls.small;
        image.alt = photography.alt_description;

        main.appendChild(photographyDiv);
        photographyDiv.appendChild(image);

        image.addEventListener('click', () => {
          BigImgFunction(photography.urls.regular, photography.alt_description);
        })
      }
    })
    .catch(error => {
      console.error('Error durante la solicitud:', error);
    });
};


printImages();