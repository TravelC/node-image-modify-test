const gm          = require('gm');
const imageMagick = gm.subClass({imageMagick: true});

//garvity: NorthWest, North, NorthEast, West, Center, East, SouthWest, South, or SouthEast
function addTextToImage(image, text, x, y, garvity, fontFamily, fontSize, color) {
  return imageMagick(image)
    .font(fontFamily || 'Arial')
    .fontSize(fontSize || 70)
    .fill(color || 'red')
    .drawText(x || 0, y || 0, text || '', garvity || 'NorthWest');
}

function createGif(images, interval) {
  const im = imageMagick();
  for (let i = 0; i < images.length; i++) {
    im.in(images[i]);
  }
  return im.delay(interval || 100);
}

addTextToImage('input.jpg', 'first line\nsecond line', 1, 1, null, null, 30, 'green').write('gif/1.jpg', function(err) {
  if (err) {
    console.log(err)
  } else {
    addTextToImage('input.jpg', 'test custom \nfont and color', 20, 100, null, './Merriweather-Italic.ttf', 33, 'orange').write('gif/2.jpg', function(err) {
      if (err) {
        console.log(err)
      } else {
        createGif(['gif/1.jpg', 'gif/2.jpg'], 200).write("gif/animated.gif", function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("It's working!");
          }
        });
      }
    });
  }
});
