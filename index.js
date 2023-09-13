const puppeteer = require('puppeteer');
const path = require('path');
const cardScreenshot = require('./utils/cardscreenshot');

const fs = require('fs');

let maxResultsLength = 0;





(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
   // args: ['--headless'],
  })
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(
    "https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=wazsxhnm&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=keyword_unordered&media_type=all"
  );

  await new Promise((resolve) => setTimeout(resolve, 3000));

  // click on the clear button
  const clearButtonXPath = `//div[@aria-label='Clear']//div[@class='xtwfq29']`;
  const clearButton = await page.waitForXPath(clearButtonXPath);

  // click on the clear element
  await clearButton.click();

  // Use XPath to locate the input element
  const searchInputXPath =
    "(//input[@placeholder='Search by keyword or advertiser'])[1]";
  const SearchInput = await page.waitForXPath(searchInputXPath);

  //It will type nike into the input element
  await SearchInput.type("nike");

  await new Promise((resolve) => setTimeout(resolve, 2000));

//   try {
    const advertisersList = await page.waitForXPath(
      "//div[contains(text(),'Advertisers')]"
    );

    await new Promise((resolve) => setTimeout(resolve, 1500));

    //Click on the first brand
    const firstBrand = await page.waitForXPath(`//div[@class='x1lliihq']//button[1]`);
    firstBrand.click();

    await new Promise((resolve) => setTimeout(resolve, 4000));
    
    

    maxResultsLength = (await page.$x(`((//span[contains(text(),'Active')])/parent::div/parent::div/parent::div/parent::div/parent::div)`)).length;
   
    console.log(maxResultsLength);
    if(maxResultsLength > 0)
    {
       let dir = './output';

       if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
       }
    }
     
    let dir = "./";

    let brandNameDiv = await page.waitForXPath(`//div[@class='x8t9es0 x1ldc4aq x1xlr1w8 x1cgboj8 x4hq6eo xq9mrsl x1yc453h x1h4wwuj xeuugli']`);
            
            let brandName = await (await brandNameDiv.getProperty('textContent')).jsonValue();
            dir = `./output/${brandName}`;
            console.log(dir, "   ", brandName);
            
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }

    for (let i = 1; i < maxResultsLength ; i++) {
        // try{

            // maxResultsLength = (await page.$x(`((//span[contains(text(),'Active')])/parent::div/parent::div/parent::div/parent::div/parent::div)`)).length;
             
            // Take screenshot of the card
            let cardXPath = `((//span[contains(text(),'Active')])/parent::div/parent::div/parent::div/parent::div/parent::div)[${i}]`;
            const elementPresent = await page.waitForXPath(cardXPath);
            if(elementPresent)
            {
                console.log(`${i}th element`);
            }
            
            let searchKey = "Divyush" //ddddddddddddd

            
            
            await cardScreenshot(page, searchKey, i, cardXPath, dir);


            
        // }catch(err)
        // {
        //    console.log('No image in card');
        // }
        
        
    }



    
//   } catch (err) {
//     console.log("No results found");
//   } finally {
    await browser.close();
//   }

})();
