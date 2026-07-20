import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Intercept network requests
  await page.setRequestInterception(true);
  
  let lottieUrl = null;
  
  page.on('request', request => {
    const url = request.url();
    if (url.endsWith('.json') || url.endsWith('.lottie')) {
      console.log('Found Lottie URL:', url);
      lottieUrl = url;
    }
    request.continue();
  });
  
  try {
    await page.goto('https://lottiefiles.com/free-animation/customer-review-fl2q4VklVJ', { waitUntil: 'networkidle2' });
  } catch (err) {
    console.error('Error navigating:', err);
  }
  
  await browser.close();
})();
