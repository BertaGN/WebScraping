const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = 'https://reviewpro.shijigroup.com/team#contact';

async function scrapeCustomerSupport() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0); // Desactivar el tiempo de espera predeterminado

  try {
    await page.goto(URL);
  } catch (error) {
    console.error('Error al cargar la página:', error);
    await browser.close();
    return {};
  }

  await page.waitForSelector('#w-node-ca11194c-6591-2629-47d7-20c091395d83-4481d0c6', { timeout: 60000 });

  const customerSupportDetails = await page.evaluate(() => {
    const parentDiv = document.querySelector('#w-node-ca11194c-6591-2629-47d7-20c091395d83-4481d0c6');

    const details = {
      textClasses: [],
      emailLinks: []
    };

    const elements = parentDiv.querySelectorAll('.text-size-regular, a[href^="mailto:"]');

    elements.forEach((element) => {
      if (element.classList.contains('text-size-regular')) {
        details.textClasses.push(element.textContent.trim());
      }

      if (element.tagName.toLowerCase() === 'a' && element.getAttribute('href').startsWith('mailto:')) {
        details.emailLinks.push(element.getAttribute('href').replace('mailto:', ''));
      }
    });

    return details;
  });

  await browser.close();

  return customerSupportDetails;
}

scrapeCustomerSupport().then((customerSupport) => {
  const jsonData = JSON.stringify(customerSupport, null, 2);
  fs.writeFile('customer_support.json', jsonData, (err) => {
    if (err) {
      console.error('an Error occurred:', err);
    } else {
      console.log('Data has been saved at customer_support.json');
    }
  });
});