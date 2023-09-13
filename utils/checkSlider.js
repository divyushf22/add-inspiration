async function checkSlider(page, cardXPath){
//   try{
//     console.log(`${cardXPath}//descendant::a[@aria-label='navigate forwards']`);
//     // let sliderElement = await page.waitForXPath(`${cardXPath}//descendant::a[@aria-label='navigate forwards']`)
//     // if(sliderElement)
//         return true;

//   }catch(err)
//  {
//      return false;
//  }     
  try{

    let cardElement = await page.waitForXPath(cardXPath+"//descendant::div[@class='_a2e']");
    return true;

  }catch(err)
  {
    return false;
  }
}

module.exports = checkSlider;