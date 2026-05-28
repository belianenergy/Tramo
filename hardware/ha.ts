/**
 * Hardware Integration Layer — Home Assistant
 *
 * Este módulo proporciona conectores para ler datos de dispositivos
 * intelixentes a través da API REST de Home Assistant.
 *
 * Uso futuro:
 *   import { getHADevices, setThermostat } from './hardware/ha'
 *   const devices = await getHADevices('http://ha.local:8123', 'YOUR_TOKEN')
 */

/**
 * Obtén a lista de dispositivos conectados a Home Assistant.
 */
export async function getHADevices(haUrl: string, token: string) {
  const res = await fetch(`${haUrl}/api/states`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) throw new Error(`Home Assistant error: ${res.status}`)
  return res.json()
}

/**
 * Obtén o estado actual dun dispositivo polo seu entity_id.
 * Exemplo: 'climate.nest', 'sensor.shelly_power'
 */
export async function getHAEntityState(haUrl: string, token: string, entityId: string) {
  const res = await fetch(`${haUrl}/api/states/${entityId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) throw new Error(`Home Assistant error: ${res.status}`)
  return res.json()
}

/**
 * Activa un servizo en Home Assistant (ex: cambiar temperatura).
 * Ejemplo: chamar a 'climate.set_temperature' nun termostato.
 */
export async function callHAService(
  haUrl: string,
  token: string,
  domain: string,
  service: string,
  data: Record<string, any>
) {
  const res = await fetch(`${haUrl}/api/services/${domain}/${service}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Home Assistant error: ${res.status}`)
  return res.json()
}

/**
 * Exemplos de integración con dispositivos comúns:
 *
 * 1. Ler consumo eléctrico (Shelly plug):
 *    const state = await getHAEntityState(url, token, 'sensor.shelly_pm_1_power')
 *    console.log('Potencia actual:', state.state, 'W')
 *
 * 2. Poner temperatura do termostato (Nest):
 *    await callHAService(url, token, 'climate', 'set_temperature', {
 *      entity_id: 'climate.nest',
 *      temperature: 21.5,
 *    })
 *
 * 3. Ler sensores de temperatura:
 *    const temps = await getHADevices(url, token)
 *    const tempSensors = temps.filter(s => s.entity_id.startsWith('sensor.temperature'))
 */

/**
 * Implementación simple de mock para desenvolvemento sen Home Assistant real.
 */
export function getMockDeviceData() {
  return {
    thermostat: {
      currentTemp: 21.5,
      targetTemp: 22,
      mode: 'heat',
      humidity: 45,
    },
    energyMeter: {
      currentPower: 1250,   // W
      totalKwh: 342.7,     // kWh neste período
    },
    occupancy: {
      detected: true,
      since: new Date(Date.now() - 3600000).toISOString(), // hai 1 hora
    },
  }
}
