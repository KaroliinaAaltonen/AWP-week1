
if (document.readyState !== "loading") {
  generateWiki();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    generateWiki();
  });
}

async function generateWiki() {
  for (let i = 0; i < 5; i++) {
    generateItem(i);
    await generateDog(i);
    await generateText(i);
  }
}

function generateItem() {

  //create div with class wiki-item
  var wikiItem = document.createElement("div");
  wikiItem.classList.add("wiki-item");

  //create h1 with class wiki-header
  var h1Tag = document.createElement("H1");
  h1Tag.classList.add("wiki-header");

  //append title to wiki-item div
  wikiItem.appendChild(h1Tag);

  //create div with class wiki-content
  var wikiContent = document.createElement("div");
  wikiContent.classList.add("wiki-content");
  //add container to wiki-item
  wikiItem.appendChild(wikiContent);
  
  //create paragraph with class wiki-text
  var wikiText = document.createElement("p");
  wikiText.classList.add("wiki-text");
  wikiContent.appendChild(wikiText);

  //create div with class img-container
  var imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  //append img-container to wiki-content
  wikiContent.appendChild(imgContainer);

  //create img with class wiki-img
  var wikiImg = document.createElement("img");
  wikiImg.classList.add("wiki-img");

  //append wiki-img to img-container
  imgContainer.appendChild(wikiImg);

  //append wiki-item to the head div
  document.getElementsByClassName("container")[0].appendChild(wikiItem);

}

async function generateText(i) {
  var breed = document.getElementsByClassName("wiki-header")[i].innerHTML
  var url = "https://en.wikipedia.org/api/rest_v1/page/summary/";
  url += breed;
  const response = await fetch(url);
  const data = await response.json();
  var text = data.extract;
  var wikiText = document.getElementsByClassName("wiki-text")[i]
  wikiText.innerHTML = text
}

async function generateDog(i) {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const dog = await response.json();
  var URL = dog.message;
  var wikiImg = document.getElementsByClassName("wiki-img")[i]
  wikiImg.src = URL
  
  var h1Tag = document.getElementsByClassName("wiki-header")[i]
  var breed = URL.split("/", 6);
  breed = breed[4];
  breed = breed[0].toUpperCase() + breed.slice(1);
  h1Tag.innerHTML = breed;
  
}
