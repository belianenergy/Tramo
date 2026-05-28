import https from 'https';
import fs from 'fs';

const API_KEY = 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';

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
  console.log('1. Creating new Stitch project...');
  
  const project = await callStitch('create_project', { 
    title: 'EnergyOS Dashboard'
  });
  
  console.log('Project response:', JSON.stringify(project, null, 2).substring(0, 2000));
  
  if (project.result?.content?.[0]?.text) {
    const projectData = JSON.parse(project.result.content[0].text);
    const projectId = projectData.name;
    console.log('\nProject ID:', projectId);
    
    // Save project ID
    fs.writeFileSync('.stitch_project_id', projectId);
    console.log('Project ID saved to .stitch_project_id');
    
    // Now generate screen
    console.log('\n2. Generating dashboard screen...');
    
    const prompt = `Create a PREMIUM energy management dashboard for "EnergyOS" - a B2B platform for property managers in Spain. 

LIGHT MODE ONLY with white backgrounds (#FFFFFF), light gray borders (#E5E5E5), and emerald green accents (#10B981). Professional Linear/Stripe style. All text in SPANISH.`;
    
    const screen = await callStitch('generate_screen_from_text', {
      project_id: projectId,
      prompt: prompt,
      device_type: 'DESKTOP'
    });
    
    console.log('Screen response:', JSON.stringify(screen, null, 2).substring(0, 3000));
    fs.writeFileSync('stitch-v6-response.json', JSON.stringify(screen, null, 2));
  }
}

main().catch(console.error);
