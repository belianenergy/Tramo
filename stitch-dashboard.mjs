import https from 'https';

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
  console.log('1. Creating Stitch project...');
  const project = await callStitch('create_project', { title: 'EnergyOS Dashboard' });
  console.log('Project created:', JSON.stringify(project, null, 2).substring(0, 500));
  
  if (project.result?.project?.id || project.result?.projectId) {
    const projectId = project.result.project.id || project.result.projectId;
    console.log('\n2. Generating dashboard screen...');
    const screen = await callStitch('generate_screen_from_text', {
      project_id: projectId,
      prompt: prompt,
      device_type: 'DESKTOP'
    });
    console.log('Screen generation:', JSON.stringify(screen, null, 2).substring(0, 1000));
    
    if (screen.result?.screen?.id || screen.result?.screenId) {
      const screenId = screen.result.screen.id || screen.result.screenId;
      console.log('\n3. Fetching screen HTML...');
      const html = await callStitch('get_screen', { 
        project_id: projectId,
        screen_id: screenId
      });
      console.log('Screen HTML:', JSON.stringify(html, null, 2).substring(0, 2000));
    }
  }
}

main().catch(console.error);
