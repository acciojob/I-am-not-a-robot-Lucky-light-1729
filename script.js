const imagePaths = [
  'https://via.placeholder.com/100?text=1',
  'https://via.placeholder.com/100?text=2',
  'https://via.placeholder.com/100?text=3',
  'https://via.placeholder.com/100?text=4',
  'https://via.placeholder.com/100?text=5'
];

const container = document.getElementById('image-container');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const message = document.getElementById('para');
const heading = document.getElementById('h');

let selectedImages = [];

function shuffleAndRenderImages() {
  let images = [...imagePaths];
  const duplicate = images[Math.floor(Math.random() * images.length)];
  images.push(duplicate);

  // Shuffle images
  images = images
    .map(src => ({ src, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(obj => obj.src);

  container.innerHTML = '';

  images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.dataset.index = index;
    img.addEventListener('click', () => handleImageClick(img));
    container.appendChild(img);
  });

  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  message.textContent = '';
  heading.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
  selectedImages = [];
}

function handleImageClick(img) {
  if (selectedImages.length === 2 || img.classList.contains('selected')) return;

  img.classList.add('selected');
  selectedImages.push(img);

  if (selectedImages.length === 1) {
    resetBtn.style.display = 'inline-block';
  }

  if (selectedImages.length === 2) {
    verifyBtn.style.display = 'inline-block';
  }
}

resetBtn.addEventListener('click', () => {
  shuffleAndRenderImages();
});

verifyBtn.addEventListener('click', () => {
  verifyBtn.style.display = 'none';

  const [img1, img2] = selectedImages;
  if (img1.src === img2.src) {
    message.textContent = 'You are a human. Congratulations!';
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

window.addEventListener('load', shuffleAndRenderImages);
