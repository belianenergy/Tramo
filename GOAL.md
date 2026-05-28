# EnergyOS MVP - GOAL para Codex Dev
## 🎯 OBJETIVO: MVP PRODUCCIÓN-LISTO para demostración a clientes

**Data:** 2026-05-11  
**Contexto:** Entrega final para presentar a potenciais clientes profesionais inmobiliarios

---

## 📋 ESTADO ACTUAL (verificado)

### ✅ Funcionando
- Build completo (0 erros TypeScript)
- Dev server en porto 3001
- Páxinas: /, /fincas, /apartments, /arbitrage, /advisor, /config
- APIs OK: /api/communities, /api/dashboard, /api/listings, /api/alerts, /api/omie-prices

### ❌ PROBLEMAS A ARRANXAR
1. `/api/tariffs` → 500 (cache corrupta Next.js)
2. `/api/savings` → 404 (non existe)
3. `/api/forecasts` → 404 (non existe)
4. **FALTA: Landing page para captar leads** ← CRÍTICO

---

## 🏠 LANDING PAGE (NOVA - CRÍTICO)

### Obxectivo
Captar leads: xestores de propiedades, administradores de fincas, propietarios Airbnb

### Deseño
- **Hero section:** Título impactante + CTA
- **3 beneficios clave:** Con números reais
- **Social proof:** Logos ou testimonials ficticios pero realistas
- **CTA final:** Formulario de contacto

### Contido en galego/español
```
Hero: "EnergyOS - Gestión Energética Inteligente para Inmobiliarias"
Subtitle: "Ahorra hasta 8.500€/año en tus propiedades. Sin complicaciones."

Beneficio 1: "Control total de comunidades"
Beneficio 2: "Alertas inteligentes"  
Beneficio 3: "Asesor IA con Datadis"

CTA: "Solicita acceso early access"
```

### Estrutura da landing
```
/                     → Landing page ( público )
/app                  → Dashboard ( login required )
/app/page.tsx         → Dashboard principal
```

---

## 🔧 TAREFAS A EXECUTAR (ORDEN)

### FASE 1: Arranxar APIs rotas
```bash
# Limpar cache e reconstruír
rm -rf .next
npm run build

# Crear APIs faltantes
# /api/savings/route.ts   - POST cálculo aforros
# /api/forecasts/route.ts - GET historial métricas
# /api/tariffs/route.ts  - Corrixir erro 500
```

### FASE 2: Landing Page
```bash
# Crear landing page pública
app/page.tsx           → Landing (replace current dashboard)
//app/page.tsx         → Dashboard (moved to /app/dashboard/page.tsx)
```

### FASE 3: Validación loops
```bash
# Iteración 1: Build
npm run build

# Iteración 2: APIs
curl http://localhost:3001/api/savings
curl http://localhost:3001/api/forecasts
curl http://localhost:3001/api/tariffs

# Iteración 3: Páxinas
curl http://localhost:3001/
curl http://localhost:3001/fincas
# ... todas
```

### FASE 4: Entrega final
- Screenshot de cada pantalla
- Demo URL
- Lista de checkmarks

---

## 🎨 DISEÑO: Linear.app meets Bloomberg

### Modo CLARO OBRIGATORIO
```
Background: #FAFAFA (GRIS CLARO)
Cards: #FFFFFF
Borders: #E5E5E5
Primary: #10b981 (emerald)
```

### Tipografía
- Títulos: Plus Jakarta Sans Bold
- Corpo: Inter
- Números: JetBrains Mono

---

## 📁 ESTRUCTURA FINAL

```
energyos/
├── app/
│   ├── page.tsx                 # LANDING PAGE (público)
│   ├── layout.tsx               # Layout con nav/sidebar
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard principal
│   ├── fincas/page.tsx
│   ├── apartments/page.tsx
│   ├── arbitrage/page.tsx
│   ├── advisor/page.tsx
│   ├── config/page.tsx
│   └── api/
│       ├── dashboard/route.ts
│       ├── listings/route.ts
│       ├── communities/route.ts
│       ├── tariffs/route.ts     # CORRIXIDO
│       ├── savings/route.ts     # NOVO
│       ├── forecasts/route.ts   # NOVO
│       ├── alerts/route.ts
│       └── omie-prices/route.ts
└── data/
    └── *.json                  # Datos realistas España
```

---

## 🔌 APIS - TODAS REQUIRIDAS

### GET /api/savings
```json
Request body: { "propertyId": "1", "currentTariff": "pvpc", "proposedTariff": "fixed" }
Response: { "savings": 234, "monthly": 19.5, "yearly": 234 }
```

### GET /api/forecasts
```json
Response: {
  "history": [{ "month": "Ene", "kwh": 3200, "cost": 544 }],
  "prediction": [{ "month": "Jun", "kwh": 3500, "cost": 595 }]
}
```

### GET /api/tariffs (CORRIXIDO)
```json
Response: [{
  "id": "1",
  "name": "PVPC Indexada",
  "pricePerKwh": 0.145,
  "type": "variable"
}, ...]
```

---

## ✅ CRITERIOS DE ÉXITO

### Debe pasar TODOS estes checks:
1. `npm run build` → 0 erros
2. `npm run dev` → porto 3001
3. Landing (`/`) → mostra hero + CTA
4. Dashboard (`/dashboard`) → KPIs + gráficos
5. `/api/savings` → 200 + JSON válido
6. `/api/forecasts` → 200 + JSON válido
7. `/api/tariffs` → 200 + JSON válido
8. Todas as páxinas → 200 OK
9. Navegación funcional entre módulos

### Entregable final:
- Screenshot landing page
- Screenshot dashboard
- Screenshot cada módulo
- Lista completa de verificación

---

## 🚨 REGRAS

1. **Non modificar datos .json** - Son datos mostra realistas
2. **Manter modo claro** - Non usar dark mode
3. ** Texto en español/galego** - Non en inglés
4. ** Profesional, non parece IA** - Estilo Linear/Stripe
5. **Validar cada iteración** - Non avanzar se hai erros

---

**GOAL preparado para:** `codex dev --goal`  
**Localización:** `/home/mauro/.openclaw/workspace-local/energyos`  
**Tempo estimado:** 2-3 iteracións de validación