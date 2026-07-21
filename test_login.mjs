import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:5173/');
  await page.evaluate(() => {
    localStorage.setItem('luxora_current_user', JSON.stringify({
      id: 'test',
      email: 'test@test.com',
      orders: [
        { id: '1', items: 2, total: 100, status: 'Pending', date: '2023' }
      ]
    }));
  });
  
  await page.goto('http://localhost:5173/account/orders');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await browser.close();
})();
