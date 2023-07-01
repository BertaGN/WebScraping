const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = 'https://reviewpro.shijigroup.com/';

async function scrapeData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0); // Desactivar el tiempo de espera predeterminado

  try {
    await page.goto(URL, { waitUntil: 'domcontentloaded' });
  } catch (error) {
    console.error('Error al cargar la página:', error);
    await browser.close();
    return {};
  }

  try {
    await page.waitForSelector('.nav_dropdown-block', { timeout: 60000 });
  } catch (error) {
    console.error('Error al esperar el selector .nav_dropdown-block:', error);
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

    const nextNavDropdownIndex = listItems.findIndex((item) => item.text === 'Integrations') + 1;
    const filteredListItems = nextNavDropdownIndex !== 0 ? listItems.slice(0, nextNavDropdownIndex) : listItems;

    return { listItems: filteredListItems };
  });

  await browser.close();

  return data;
}

scrapeData().then((data) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile('productsEssentials.json', jsonData, (err) => {
    if (err) {
      console.error('Error al guardar el archivo JSON:', err);
    } else {
      console.log('Los datos se han guardado correctamente en productsEssentials.json');
    }
  });
});