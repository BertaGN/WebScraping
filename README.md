# WebScraping

# Web Scraping Examples with Puppeteer

This repository contains code examples and information on web scraping using Puppeteer, a powerful Node.js library that provides a high-level API for controlling a headless Chrome or Chromium browser.

## Getting Started

To get started with web scraping using Puppeteer, follow these steps:

1. Clone this repository: `git clone https://github.com/BertaGN/WebScraping.git`
2. Install the dependencies: `npm install`
3. Run the scraping scripts: 
   - For customer support emails: `node scraping.js`
   - For product information: `node scrapeProducts.js`

Make sure you have Node.js and npm installed on your machine.

## Overview

This repository includes the following files:

- `scrapeCustomerSupport.js`: A script that demonstrates how to scrape customer support emails from a webpage. It uses Puppeteer and Cheerio to extract the data. The target webpage is [https://reviewpro.shijigroup.com/team#contact](https://reviewpro.shijigroup.com/team#contact).
- `scrapeProducts.js`: A script that demonstrates how to scrape product information from the webpage [https://reviewpro.shijigroup.com/](https://reviewpro.shijigroup.com/). It retrieves the list of products from the "Products" and "Essentials" sections.

## Usage

### Scrape Customer Support Emails

The `scrapeCustomerSupport.js` script extracts customer support names and emails from the webpage [https://reviewpro.shijigroup.com/team#contact](https://reviewpro.shijigroup.com/team#contact).

To run the script, execute the following command: `node scraping.js`

The script will extract the customer support details and display them in the console.

### Scrape Product Information

The `scrapeProducts.js` script retrieves product information from the webpage [https://reviewpro.shijigroup.com/](https://reviewpro.shijigroup.com/). It collects the list of products from the "Products" and "Essentials" sections.

To run the script, execute the following command: node scrapeProducts.js

The script will extract the product information and display it in the console.

## Contributing

Contributions to this repository are welcome. If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

