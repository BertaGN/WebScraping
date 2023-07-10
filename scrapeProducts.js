const puppeteer = require('puppeteer');
const fs = require('fs');


const URL = 'https://reviewpro.shijigroup.com/';

async function scrapeData() { 
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  try {
    await page.goto(URL, { waitUntil: 'domcontentloaded' });
  } catch (error) {
    console.error('Error loading page:', error);
    await browser.close();
    return {};
  } 

  try {
    await page.waitForSelector('.nav_dropdown-block', { timeout: 60000 });
  } catch (error) {
    console.error('Error waiting selector .nav_dropdown-block:', error);
    await browser.close();
    return {};
  } 

 
  const data = await page.evaluate(() => {
    const listItems = Array.from(document.querySelectorAll('[role="list"] [role="listitem"]')).map((item) => {
      const linkElement = item.querySelector('a');
      const link = linkElement ? linkElement.href : null;
      const text = item.textContent.trim();
      return { link, text };
    }); 

    
    const integrationsIndex = listItems.findIndex((item) => item.text === 'Integrations');
    const filteredListItems = integrationsIndex !== -1 ? listItems.slice(0, integrationsIndex + 1) : listItems;

    
    const finalListItems = filteredListItems.filter((item) =>
      !/\/education\//.test(item.link)
    );

    return { listItems: finalListItems };
  });

  await browser.close();

  return data;
}

scrapeData().then((data) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile('products_essentials.json', jsonData, (err) => {
    if (err) {
      console.error('Can not save JSON document:', err);
    } else {
      console.log('Data has been saved at products_essentials.json');
    }
  });
});