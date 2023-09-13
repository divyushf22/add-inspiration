const fs = require('fs');
const path = require('path');
const checkSlider = require('./checkSlider');


async function videoCheck(page, cardXpath) {
    try{

        console.log(cardXpath+'//descendant::video');
        const imageElement = await page.waitForXPath(`//*[@id="content"]/div/div/div/div/div[6]/div[2]/div[3]/div[3]/div[1]/div[3]/div/div[3]/div/div/div[1]/div/div/div/div`)
        if(imageElement)
           return true;
    }
    catch(err)
    {
        return false;
    }
  }


async function getID(page, elementXpath, index) {
    const IdElement = await page.waitForXPath(`${elementXpath}/descendant::span[contains(text(),'ID:')]`);

    const id_name= await (await IdElement.getProperty('textContent')).jsonValue()
 
    let ID = id_name.match(/\d+/g);
    ID !== null && ID.length > 0 ? ID[0] : null;
    return ID[0];
  }

  async function cardScreenshot(page, searchKey, index, cardXPath, dir )
  {
      const elementPresent = await page.waitForXPath(cardXPath);
      
      let uniqueID = await getID(page, cardXPath, index);
      dir = `${dir}/${uniqueID}`;

      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }

      //takes the screenshot of the card
      await elementPresent.screenshot({ path: `${dir}/${index}_image.png` });
      console.log(uniqueID);

      // In the card it checks whether it's a slider or a video or it's an image

    //   if(await checkSlider(page,cardXPath))
    //   {
    //       console.log("It is a slider");
    //   }
    //   else
    //   {
    //     console.log("It's not a slider");
    //   }

    if(await videoCheck(page,cardXPath))
    {
        console.log("there is a video");
    }
    else console.log("there is no video");



      

  
  }
  

module.exports = cardScreenshot;
