import https from 'https';

https.get('https://lottiefiles.com/free-animation/customer-review-fl2q4VklVJ', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const lottieMatches = data.match(/https:\/\/[^"'\s]+\.(json|lottie)/g);
    if (lottieMatches) {
      console.log('Matches:', Array.from(new Set(lottieMatches)));
    } else {
      console.log('No matches found. Checking other URLs...');
      const allUrls = data.match(/https:\/\/[^"'\s]+/g);
      if (allUrls) {
        console.log('All URLs:', Array.from(new Set(allUrls)).filter(u => u.includes('lottie.host')));
      }
    }
  });
}).on('error', err => {
  console.log('Error:', err.message);
});
