
export default async function handler(req, res) {
  const { index, requests } = req.query;
    const maxRequestsPerSecond = 50;
    const delay = Math.floor(Math.random() * 1000) + 1;
    const requestsPerSecond = req.headers['x-requests-per-second'];
    console.log(`Requests per second: ${requestsPerSecond}`);

    await new Promise(resolve => setTimeout(resolve, delay));
    if (requestsPerSecond > maxRequestsPerSecond) {
      return res.status(429).json({ error: 'Too many requests' });
    }
  
    res.status(200).json({ index });
  }


