/**
 * EnergyOS — Landing v6: CORRECT Aura colors only
 * Primary: #2C3B31 (dark forest green)
 * Accent: #7A9E7E (sage green)
 */

import { writeFileSync, existsSync, statSync } from 'fs';
import { execFileSync } from 'child_process';
import https from 'https';

const PREFIX = 'stitch-landing-v6';
const PROJECT_ID = '2975961112638901651';

const API_KEY = process.env.STITCH_API_KEY;
if (!API_KEY) { console.error('Missing STITCH_API_KEY'); process.exit(1); }

const LANDING_PROMPT = `Create EnergyOS landing page.

STRICT COLOR PALETTE (MUST USE EXACTLY):
- primary: "#2C3B31" (dark forest green — for CTAs, active elements)
- accent: "#7A9E7E" (sage green — for badges, secondary)
- background: "#fbf9f7" (warm off-white)
- surface: "#FFFFFF" (pure white cards)
- text-primary: "#111827" (near black)
- text-secondary: "#6B7280" (medium gray)

NO orange. NO terracotta. NO rust. ONLY green palette.

STYLE: Restro layout (bento grid, 16px rounded corners, flat design, pill badges, line charts with smooth curves and NO area fill, pill-shaped progress bars).

SECTIONS:
1. Header: EnergyOS logo + nav + "Solicitar piloto" (green pill button)
2. Hero: "Controla el coste energético de tu cartera turística" + badges "Sin hardware" "Ahorra desde el 1er mes" + mockup with pill-shaped bars
3. Proof bar: 4 tiles (120+ propiedades, 24% ahorro, etc)
4. Problema: 3 cards
5. Cómo funciona: 4 steps
6. Características: 6 cards
7. CTA/Piloto: form

All Spanish. Desktop. No orange, no purple, only green tones.`;