# ⚡ EnergyOS - MVP de Xestión Enerxética para Airbnb

Unha ferramenta mínima viable para que os propietarios de apartamentos turísticos
optimicen o seu consumo enerxético e aforren diñeiro nas facturas de luz.

## 🚀 Comezar

### Requisitos
- Node.js 18+ 
- npm ou yarn

### Instalación

```bash
cd energyos
npm install
npm run dev
```

A app arrinca en [http://localhost:3000](http://localhost:3000)

### Primeira execución
A base de datos SQLite (`energyos.db`) créase automaticamente no directorio raíz do proxecto.
As tarifas do mercado español xa veñen precargadas (Galicia, Madrid, Cataluña, Andalucía, País Vasco).

## 📋 Funcionalidades MVP

| Funcionalidade | Estado |
|---|---|
| Engadir propiedades (nome, ubicación, consumo, ocupación) | ✅ |
| Ver lista de propiedades | ✅ |
| Ver tarifas do mercado español | ✅ |
| Calcular aforro potencial | ✅ |
| Exportar resultados a CSV | ✅ |
| Persistencia local con SQLite | ✅ |

## 🔌 Endpoints da API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/listings` | Lista todas as propiedades |
| POST | `/api/listings` | Crea unha propiedade |
| GET | `/api/tariffs` | Lista todas as tarifas |
| GET | `/api/tariffs?region=Galicia` | Busca tarifa por rexión |
| POST | `/api/savings` | Calcula aforro `{ listingId }` |
| POST | `/api/export/csv` | Descarga CSV con todos os datos |

## 🏗️ Estrutura do proxecto

```
energyos/
├── app/
│   ├── page.tsx              # UI principal
│   ├── layout.tsx            # Layout raíz
│   └── api/
│       ├── listings/route.ts   # CRUD de propiedades
│       ├── tariffs/route.ts    # Tarifas do mercado
│       ├── savings/route.ts     # Cálculo de aforro
│       └── export/csv/route.ts  # Exportación CSV
├── lib/
│   ├── db.ts                # Conexión SQLite + modelos
│   └── calc.ts              # Lóxica de cálculo de aforro
└── package.json
```

## 💡 Lóxica de aforro

O cálculo é sinxelo pero realista:

1. **Custo sen optimizar**: todo o consumo a tarifa base.
2. **Custo optimizado**: desprazar ás horas de baixa demanda (30% do consumo).
3. **Factor de ocupación**: 
   - >80% ocupación → só 30% do aforro é realizable
   - 50-80% ocupación → 65% do aforro é realizable
   - <50% ocupación → 90% do aforro é realizable

## 🔗 Integración con OpenClaw

OpenClaw pode invocar os endpoints directamente:

```bash
# Crear propiedade
curl -X POST http://localhost:3000/api/listings \
  -H "Content-Type: application/json" \
  -d '{"name":"Apartamento 1","location":"Galicia","monthlyKwh":350,"occupancyRate":0.6}'

# Calcular aforro
curl -X POST http://localhost:3000/api/savings \
  -H "Content-Type: application/json" \
  -d '{"listingId":1}'

# Exportar CSV
curl -X POST http://localhost:3000/api/export/csv
```

## 📈 Custo do MVP

| Concepto | Custo |
|---|---|
| Desenvolvemento | 0€ (OpenClaw) |
| Base de datos | 0€ (SQLite local) |
| Hosting demo | 0€ (Vercel plan gratuíto) |
| Dominio | ~10€/ano (opcional) |
| **Total** | **0€ a 10€/ano** |

## 🎯 Próximos pasos (fora do MVP)

- [ ] Conexión con Home Assistant para lectura de contadores reais
- [ ] Integración con APIs de termostatos intelixentes (Tuya/Nest)
- [ ] OCR para importar facturas directamente
- [ ] Dashboard con gráficos de evolución
- [ ] Alertas WhatsApp/Telegram para consumos anómalos
- [ ] Cambio automático de proveedor de luz

---

Construído con Next.js 13 · SQLite · Tailwind CSS · OpenClaw
