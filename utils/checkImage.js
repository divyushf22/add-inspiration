async function checkImage( card ){
      
    const imageElements = await card.$$('img');

    if (imageElements.length >= 2) {
        return true;
    }
    return false;
   
};

module.exports = checkImage;