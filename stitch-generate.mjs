import https from 'https';
import fs from 'fs';

const API_KEY = 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';

const promptV6 = 'Create a PREMIUM energy management dashboard for "EnergyOS" - a B2B platform for property managers in Spain.';

async function callStitch(toolName, args) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args
      }
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
  const projectId = 'projects/3651794536021305878';
  
  console.log('Generating premium dashboard screen with Stitch...');
  
  const screen = await callStitch('generate_screen_from_text', {
    project_id: projectId,
    prompt: promptV6,
    device_type: 'DESKTOP'
  });
  
  console.log('Screen generation response:');
  console.log(JSON.stringify(screen, null, 2).substring(0, 3000));
  
  // Save the response
  fs.writeFileSync('stitch-v6-response.json', JSON.stringify(screen, null, 2));
  console.log('\nResponse saved to stitch-v6-response.json');
}

main().catch(console.error);
