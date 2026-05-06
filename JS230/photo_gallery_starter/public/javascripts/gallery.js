import templates from './templates.js';

let photos;

async function fetchPhotos() {
  let response = await fetch('/photos');
  return response.json();
}

function renderPhotos() {
  let slides = document.getElementById('slides');
  slides.innerHTML = templates.photos(photos);
}

function renderPhotoInformation(idx) {
  let photo = photos.find(item => item.id === idx);
  let header = document.getElementById('information');
  header.innerHTML = templates.photoInformation(photo);
}

async function main() {
  photos = await fetchPhotos();
  let activePhotoId = photos[0].id;
  renderPhotos();
  renderPhotoInformation(activePhotoId);
}

document.addEventListener('DOMContentLoaded', main);