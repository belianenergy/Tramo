import https from 'https';
import fs from 'fs';

const API_KEY = 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';

const prompt = `Energy dashboard with emerald green metrics, dark slate background (#0f172a), consumption charts, property cards with status indicators. Include:
- Header with "EnergyOS" title and navigation
- 4 metric cards: Total Consumption (kWh), Monthly Savings (€), Active Properties, Alerts
- Line chart showing weekly/monthly consumption
- Property cards with name, location, status badge, and consumption
- Period selector (Week/Month/Year)
- Dark theme with emerald green (#059669) accents
- Inter font family
- Responsive grid layout`;

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
          const parsed = JSON.parse(data);
          resolve(parsed);
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
  console.log('1. Creating Stitch project...');
  const project = await callStitch('create_project', { title: 'EnergyOS Dashboard' });
  fs.writeFileSync('stitch-response-1.json', JSON.stringify(project, null, 2));
  
  console.log('Full response saved to stitch-response-1.json');
  
  // Extract project ID from various response formats
  let projectId = null;
  if (project.result?.structuredContent?.name) {
    projectId = project.result.structuredContent.name;
  } else if (project.result?.project?.id) {
    projectId = project.result.project.id;
  } else if (project.result?.projectId) {
    projectId = project.result.projectId;
  } else if (project.result?.name) {
    projectId = project.result.name;
  }
  
  // Extract numeric ID if it has 'projects/' prefix
  const numericProjectId = projectId.replace('projects/', '');
  console.log('Project ID:', projectId);
  console.log('Numeric Project ID:', numericProjectId);
  
  if (!projectId) {
    console.error('Could not extract project ID. Check stitch-response-1.json');
    return;
  }

  console.log('\n2. Generating dashboard screen...');
  const screen = await callStitch('generate_screen_from_text', {
    project_id: numericProjectId,
    prompt: prompt,
    device_type: 'DESKTOP'
  });
  fs.writeFileSync('stitch-response-2.json', JSON.stringify(screen, null, 2));
  console.log('Screen response saved to stitch-response-2.json');

  let screenId = null;
  if (screen.result?.structuredContent?.name) {
    screenId = screen.result.structuredContent.name;
  } else if (screen.result?.screen?.id) {
    screenId = screen.result.screen.id;
  } else if (screen.result?.screenId) {
    screenId = screen.result.screenId;
  } else if (screen.result?.name) {
    screenId = screen.result.name;
  }
  
  console.log('Screen ID:', screenId);

  if (!screenId) {
    console.error('Could not extract screen ID. Check stitch-response-2.json');
    return;
  }

  console.log('\n3. Fetching screen HTML...');
  const html = await callStitch('get_screen', { 
    project_id: numericProjectId,
    screen_id: screenId
  });
  fs.writeFileSync('stitch-response-3.json', JSON.stringify(html, null, 2));
  console.log('HTML response saved to stitch-response-3.json');
  
  // Try to extract and save the actual HTML
  if (html.result?.content) {
    for (const item of html.result.content) {
      if (item.type === 'text' && item.text) {
        fs.writeFileSync('stitch-dashboard.html', item.text);
        console.log('HTML saved to stitch-dashboard.html');
      }
    }
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
