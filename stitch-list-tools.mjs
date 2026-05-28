import https from 'https';

const API_KEY = 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';

async function callStitch(method, params = {}) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: method,
      params: params
    });

    const options = {
      hostname: 'stitch.googleapis.com',
      port: 443,
      path: '/mcp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'X-Goog-Api-Key': API_KEY
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Failed to parse response: ' + data));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('Listing available tools...');
  
  // List tools
  const tools = await callStitch('tools/list');
  console.log('Tools:', JSON.stringify(tools, null, 2));
}

main().catch(console.error);
