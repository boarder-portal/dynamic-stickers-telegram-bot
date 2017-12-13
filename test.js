const textToImage = require('text-to-image');

async function generate() {
  const url = await textToImage.generate('Lorem ipsum dolor sit amet', {
    maxWidth: 512,
    fontSize: 40,
    lineHeight: 30,
    margin: 5,
    bgColor: "blue",
    textColor: "red"
  });

  console.log(url);
}

generate();
