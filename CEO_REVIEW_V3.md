# 👑 CEO Review v3 — EnergyOS: Hardware + Software

## Data: 2026-05-06
## Modo: SELECTIVE EXPANSION (Hardware como diferencial estratéxico)

---

## 📋 RESUMO EXECUTIVO

EnergyOS ten unha **oportunidade de diferenciación única** no mercado español: non é só software de xestión, é un **integrador hardware-software** que instala medidores reais, baterías físicas e executa arbitraxe real no mercado OMIE. Esta revisión analiza se o MVP debe incluír hardware, que hardware usar, e como estruturar as fases para minimizar risco mantendo o diferencial.

**Veredicto:** O hardware NON debe estar no MVP inicial, pero debe estar no roadmap como **Fase 2 inmediata**. O MVP valida o software e a demanda; o hardware valida o modelo de negocio real.

---

## 1. ANÁLISE: ¿HARDWARE NO MVP?

### 1.1 Comparativa de modelos

| Dimensión | MVP Só Software | MVP con Hardware |
|-----------|----------------|------------------|
| **Tempo de lanzamento** | 3-4 semanas | 8-12 semanas |
| **Capital inicial** | 0€ (só desenvolvemento) | 5.000-15.000€ (stock + ferramentas) |
| **Validación de mercado** | Indirecta (interese en software) | Directa (pago por instalación) |
| **Risco técnico** | Baixo | Medio-Alto |
| **Risco operativo** | Baixo | Alto (instalacións, soporte, garantías) |
| **LTV por cliente** | 30-50€/mes | 150-300€/mes (HW + SW) |
| **CAC** | Baixo (ads, contido) | Alto (instalación, visita, stock) |
| **Barrera de entrada** | Baixa (calquera pode copiar) | Alta (stock, know-how, instalación) |
| **Payback do cliente** | Inmediato (ahorro simulado) | 2-4 anos (inversión HW) |
| **Escalabilidade** | Infinita (SaaS) | Limitada por equipos de instalación |

### 1.2 Argumentos A FAVOR de incluír hardware no MVP

1. **Diferencial real e defendible.** Sen hardware, EnergyOS compite con docenas de SaaS enerxéticos. Con hardware, é un integrador único no mercado español de xestión inmobiliaria.
2. **Validación máis forte.** Un xestor que paga por unha instalación física demostra compromiso moito maior que un que se rexistra nunha web.
3. **LTV exponencialmente maior.** A subscripción de software é de 30-50€/mes. A subscripción + aluguer de hardware é de 150-300€/mes.
4. **Lock-in real.** O hardware instalado crea unha barreira de saída. Cambiar de software é gratis; cambiar de integrador hardware-software require desinstalación.
5. **Execución de arbitraxe real.** A simulación é interesante; a arbitraxe real con baterías instaladas é transformadora para o negocio do cliente.

### 1.3 Argumentos EN CONTRA de incluír hardware no MVP

1. **Validación secuencial vs. simultánea.** Incluír hardware obriga a validar dúas hipóteses ao mesmo tempo: (a) os xestores queren software de xestión, e (b) os xestores queren/poden instalar hardware. Se falla, non sabes cal fallou.
2. **Capital inicial significativo.** Necesítase stock de medidores, posiblemente baterías, ferramentas, vehículo, e persoal técnico. Isto converte un experimento de 0€ nun investimento de 5.000-15.000€.
3. **Risco regulador non probado.** En España, instalar medidores en comunidades de propietarios require certificacións, autorización da comunidade, e potencialmente boletines eléctricos. O custo legal e de cumprimento é descoñecido.
4. **Complexidade operativa.** Instalar hardware require: diagnóstico eléctrico, instalación física, configuración de rede, soporte post-instalación, garantías, e reposición. Isto é unha empresa de servicios, non un SaaS.
5. **Escalabilidade limitada.** Cada novo cliente require tempo físico de alguén. O crecimento está limitado polo número de instaladores, non pola capacidade de servidores.

### 1.4 Veredicto: ¿Hardware no MVP?

**❌ NON.** O hardware non debe estar no MVP. Pero debe estar **no roadmap como Fase 2 inmediata** (lanzada 4-6 semanas despois do MVP de software).

**Razón:** O principio de validación secuencial. Primero validamos que os xestores de propiedades en España queren e usan software de xestión enerxética (MVP software). Despois validamos que están dispostos a pagar por hardware instalado (Piloto Hardware). Se o software non funciona ou non hai demanda, evitamos perder 5.000-15.000€ en stock e instalacións.

> **Analogía:** Tesla non vendeu o Model S antes de demostrar que querían coches eléctricos co Roadster. O MVP de EnergyOS é o Roadster (software); o Model S é o hardware.

---

## 2. HARDWARE ESPECÍFICO PARA O MERCADO ESPAÑOL

### 2.1 Medidores de Consumo (IoT)

#### 🟢 RECOMENDADO: Shelly EM / Shelly Pro EM

| Característica | Detalle |
|----------------|---------|
| **Prezo** | ~35-50€ (EM) / ~70-90€ (Pro EM) |
| **Medición** | 2 canais (bifásico) ou 120A total |
| **Comunicación** | WiFi + Bluetooth (EM) / WiFi + Ethernet (Pro) |
| **API** | REST + MQTT local + nube Shelly |
| **Instalación** | Non intrusiva (pinzas amperimétricas) |
| **Certificación** | CE |
| **Popularidade** | Moi alta en España (autoconsumo) |

**Pros:**
- Instalación sinxela (pinzas, non tocar a instalación)
- API aberta e ben documentada
- Ecosistema Shelly moi maduro en España
- Prezo accesible

**Contras:**
- Necesita WiFi na propiedade
- Shelly nube é de EUA (GDPR consideration, aínda que se pode usar só local)

#### 🟡 ALTERNATIVA: IoTaWatt

| Característica | Detalle |
|----------------|---------|
| **Prezo** | ~150-200€ (kit básico) |
| **Medición** | 14 canais |
| **Comunicación** | WiFi |
| **API** | REST local (Emoncms) |
| **Instalación** | Pinzas amperimétricas |
| **Open Source** | Sí (firmware e hardware) |

**Pros:**
- Totalmente aberto e autohospedable
- Múltiples canais (ideal para fincas con zonas separadas)
- Non depende de nube de terceiros

**Contras:**
- Mais caro
- Menos maduro en España
- Requiere máis configuración técnica

#### 🔴 NON RECOMENDADO: Emporia Vue

- Deseñado para EUA (120V)
- Menos compatible con instalacións españolas (230V)
- Soporte técnico en EUA

### 2.2 Baterías para Arbitraxe

#### 🟢 RECOMENDADO: Pylontech US2000C / US3000C

| Característica | US2000C | US3000C |
|----------------|---------|---------|
| **Capacidade** | 2.4 kWh | 3.5 kWh |
| **Prezo** | ~900-1.100€ | ~1.200-1.400€ |
| **Ciclos** | >6.000 | >6.000 |
| **Garantía** | 10 anos | 10 anos |
| **Comunicación** | RS485 / CAN | RS485 / CAN |
| **Compatibilidade** | Victron, SMA, GoodWe, Solis | Victron, SMA, GoodWe, Solis |

**Pros:**
- Estándar en instalacións españolas
- Excelente relación calidade/prezo
- Fácil de escalar (modular, apilable)
- Amplia compatibilidade con inversores

**Contras:**
- Requieren inversor híbrido (coste adicional)
- Peso significativo (instalación profesional)

#### 🟡 ALTERNATIVA: BYD Battery-Box

| Característica | HVS (5.1-10.2 kWh) | HVM (8.3-22.1 kWh) |
|----------------|-------------------|-------------------|
| **Prezo** | ~3.000-5.000€ | ~5.000-10.000€ |
| **Tensión** | 204-409V | 256-512V |
| **Compatibilidade** | Fronius, SMA, Kostal | Fronius, SMA, Kostal |

**Pros:**
- Marca premium con presenza en España
- Alta densidade de enerxía
- Boa integración con inversores europeos

**Contras:**
- Significativamente más caro
- Orientado a instalacións máis grandes (villas, no apartamentos)

#### 🟡 ALTERNATIVA: Huawei LUNA2000

| Característica | Detalle |
|----------------|---------|
| **Capacidade** | 5-30 kWh (modular) |
| **Prezo** | ~4.000-8.000€ |
| **Comunicación** | Propiertaria (con inversor Huawei) |

**Pros:**
- Integración perfecta con inversores Huawei
- Dixeradamente popular en España
- Boa estética (para exterior)

**Contras:**
- Bloqueado a ecosistema Huawei
- Prezo premium

### 2.3 Inversores Híbridos (para conectar baterías)

#### 🟢 RECOMENDADO: Victron MultiPlus-II

| Característica | Detalle |
|----------------|---------|
| **Prezo** | ~1.500-2.500€ |
| **Potencia** | 3-5 kVA |
| **Baterías** | Pylontech, BYD, Victron (VRLA/Li) |
| **Comunicación** | Modbus, MQTT, VRM |
| **Característica única** | ESS (Energy Storage System) con control intelixente |

**Pros:**
- Sistema ESS permite arbitraxe programable
- API aberta (Modbus TCP)
- Comunidade enorme e documentación excelente
- Made in EU (Países Baixos)

**Contras:**
- Prezo medio-alto
- Requiere máis configuración técnica

#### 🟡 ALTERNATIVA: Huawei SUN2000 (híbrido)

| Característica | Detalle |
|----------------|---------|
| **Prezo** | ~1.000-1.800€ |
| **Potencia** | 3-10 kW |
| **Integración** | LUNA2000 nativa |
| **App** | FusionSolar |

**Pros:**
- Integración plug-and-play con baterías Huawei
- App móbil moi madura
- Soporte en España (Huawei tiene presencia)

**Contras:**
- Ecosistema cerrado
- API menos documentada que Victron

### 2.4 Resumo de configuracións por tipo de cliente

| Tipo de cliente | Medidor | Batería | Inversor | Custo HW |
|-----------------|---------|---------|----------|----------|
| **Airbnb pequeno** (1-2 apartamentos) | Shelly EM (~40€) | — | — | ~40€ |
| **Finca pequena** (5-10 pisos) | Shelly Pro EM (~80€) | — | — | ~80€ |
| **Villa / Chalet** | IoTaWatt (~180€) | Pylontech US3000C (~1.300€) | Victron MultiPlus-II (~2.000€) | ~3.500€ |
| **Comunidade grande** | IoTaWatt (~180€) | BYD HVM (~6.000€) | Victron Quattro (~3.000€) | ~9.000€ |

---

## 3. INTEGRACIÓN CON OMIE: EXECUCIÓN REAL

### 3.1 Contexto regulador en España

En España, o acceso ao mercado eléctrico para executar arbitraxe real require:

1. **Comercializadora de referencia** ou acceso directo ao mercado
2. **Contador intelixente** con telemedida (actualmente obrigatorio en España)
3. **Autoconsumo con baterías** (para evitar impostos ao almacenamento)
4. **Potencia contratada suficiente** para cargar/descargar

### 3.2 Opcións para executar arbitraxe real

#### Opción A: Integración con comercializadora indexada (RECOMENDADA)

**Mecanismo:**
- Cliente contrata tarifa indexada con comercializadora compatible (Octopus Energy, Gana Energía, Repsol Solución indexada)
- EnergyOS lee precios OMIE en tempo real
- EnergyOS decide cando cargar/descargar a batería
- EnergyOS envía comandos ao inversor (Victron/Huawei) vía API local

**Pros:**
- Non requieren licenza de comercializadora
- O cliente aforra na factura directamente
- Modelo de negocio: EnergyOS cobra % do aforro

**Contras:**
- Depende de comercializadoras con API (poucas en España)
- O aforro está limitado ao termo de enerxía (non peaxes)

#### Opción B: Plataforma de agregación (FUTURO)

**Mecanismo:**
- EnergyOS actúa como agregador (requiere licenza CNMC)
- Xestiona múltiples baterías como unha única unidade
- Oferta/venta no mercado OMIE

**Pros:**
- Maior rendemento da arbitraxe
- Ingresos directos do mercado

**Contras:**
- Requieren licenza de CNMC (complexo, caro)
- Requieren garantías bancarias significativas
- Non viable para MVP ou Fase 2

### 3.3 Integración técnica OMIE

**API OMIE:**
- **Endpoint:** `https://www.omie.es/es/file-access-list`
- **Datos:** Prezos horarios (PVB) e cantidades (PVP) do día seguinte
- **Formato:** CSV publicado diariamente ás ~12:30 para o día seguinte
- **Precisión:** Prezos por hora (€/MWh)

**Arquitectura de integración:**
```
OMIE API (12:30 daily)
    ↓
EnergyOS Backend (descarga e parse CSV)
    ↓
Algoritmo de arbitraxe (decide ciclos carga/descarga)
    ↓
Comando ao inversor (Victron/Huawei vía Modbus/REST)
    ↓
Batería executa carga/descarga
    ↓
Feedback de estado (SOC, potencia, ciclos)
    ↓
Dashboard EnergyOS (monitorización en tempo real)
```

### 3.4 Algoritmo de arbitraxe simple (Fase 2)

```python
def arbitrage_cycle(prices_24h, battery_soc, battery_capacity, max_power):
    """
    prices_24h: list of 24 hourly prices (€/MWh)
    battery_soc: current state of charge (0-100%)
    battery_capacity: kWh
    max_power: kW (charge/discharge)
    """
    min_price_hour = prices_24h.index(min(prices_24h))
    max_price_hour = prices_24h.index(max(prices_24h))
    
    # Cargar nas horas máis baratas (se non está chea)
    if battery_soc < 90% and min_price_hour == current_hour:
        return "CHARGE", max_power
    
    # Descargar nas horas máis caras (se non está baleira)
    if battery_soc > 20% and max_price_hour == current_hour:
        return "DISCHARGE", max_power
    
    return "IDLE", 0
```

**Nota:** Este é un algoritmo simplificado. En produción, considerar:
- Predición de prezos (machine learning)
- Ciclo de vida da batería (non sempre é óptimo ciclar)
- Confort do cliente (evitar descargas cando precisan potencia)
- Peaxes e impostos (o aforro real é menor que o bruto)

---

## 4. RISCOS DO MODELO HW+SW

### 4.1 Riscos críticos (🔴)

| Risco | Probabilidade | Impacto | Mitigación |
|-------|--------------|---------|------------|
| **Fallo de hardware en remoto** | Alto | Alto | Stock de recambios, acordo con instalador local, diagnóstico remoto |
| **Regulación eléctrica cambia** | Medio | Alto | Seguir de cerca CNMC, deseñar para adaptabilidade, non lock-in |
| **Instalador clave abandona** | Medio | Alto | Formar múltiples instaladores, non depender dun só |
| **Batería con defecto de fábrica** | Baixo | Alto | Garantía do fabricante (10 anos), stock de recambios, seguro |
| **Cliente non autoriza acceso eléctrico** | Medio | Medio | Contrato claro, permisos de comunidade, exención de responsabilidade |

### 4.2 Riscos operativos (🟡)

| Risco | Probabilidade | Impacto | Mitigación |
|-------|--------------|---------|------------|
| **Escalabilidade limitada por instalacións** | Alto | Medio | Modelo híbrido: DIY para usuarios avanzados + pro para estándar |
| **Soporte técnico 24/7** | Medio | Medio | Chatbot + documentación + horario comercial, escalar a call center |
| **Stock obsoleto** | Medio | Medio | Compra bajo demanda inicial, evitar stock grande |
| **Cash flow negativo** | Medio | Medio | Cobrar instalación por adiantado, ou modelo de aluguer mensual |

### 4.3 Riscos de mercado (🟢)

| Risco | Probabilidade | Impacto | Mitigación |
|-------|--------------|---------|------------|
| **Competidor con máis capital** | Medio | Medio | Moverse rápido, lock-in con hardware instalado, comunidade |
| **Prezos de baterías baixan** | Alto | Baixo | Beneficio para clientes, actualizar oferta |
| **Arbitraxe deixa de ser rendible** | Baixo | Alto | Diversificar valor: backup, autoconsumo, flexibilidade de rede |

---

## 5. MODELO DE NEGOCIO HW+SW

### 5.1 Streams de ingresos

| Stream | Descripción | Prezo indicativo | Margen |
|--------|-------------|------------------|--------|
| **Instalación HW** | Medidor + instalación + configuración | 150-300€/propiedade | 30-40% |
| **Subscripción SW** | Acceso á plataforma | 30-50€/mes/propiedade | 80-90% |
| **Aluguer HW** | Aluguer mensual de medidor/batería | 20-50€/mes | 50-60% |
| **Arbitraxe** | % do aforro por arbitraxe automática | 20-30% do aforro | 70-80% |
| **Informes premium** | Informes para propietarios/communities | 10-20€/informe | 90% |

### 5.2 Comparativa de modelos

| Modelo | Ingreso mensual típico (1 propiedade) | Ingreso anual | CAC | LTV (3 anos) |
|--------|--------------------------------------|---------------|-----|--------------|
| **SaaS puro** | 40€ | 480€ | 200€ | 1.200€ |
| **HW + SaaS** | 100€ (aluguer + subscripción) | 1.200€ | 400€ | 3.200€ |
| **HW + SaaS + Arbitraxe** | 150€ (aluguer + subscripción + % aforro) | 1.800€ | 500€ | 4.800€ |

### 5.3 Análise unitaria (Unit Economics)

**Caso: Instalación de medidor Shelly EM en apartamento Airbnb**

| Concepto | Custo | Ingreso | Nota |
|----------|-------|---------|------|
| Shelly EM | 40€ | — | Hardware |
| Instalación (1h técnico) | 50€ | — | Mano de obra |
| Desprazamento | 20€ | — | Transporte |
| **Custo total instalación** | **110€** | **150€** | **Margen: 40€ (27%)** |
| Subscripción mensual | — | 30€/mes | Recorrente |
| Soporte/mantemento | 5€/mes | — | Estimado |
| **Margen mensual** | **5€** | **30€** | **85% de margen** |
| Payback de instalación | — | 3.7 meses | 110€ / 30€ |

**Caso: Instalación de batería Pylontech US3000C + Victron en villa**

| Concepto | Custo | Ingreso | Nota |
|----------|-------|---------|------|
| Pylontech US3000C | 1.300€ | — | Batería |
| Victron MultiPlus-II | 2.000€ | — | Inversor |
| IoTaWatt | 180€ | — | Medidor |
| Instalación (8h técnico) | 400€ | — | Mano de obra |
| Desprazamento | 50€ | — | Transporte |
| **Custo total instalación** | **3.930€** | **5.000€** | **Margen: 1.070€ (21%)** |
| Subscripción mensual | — | 100€/mes | Recorrente |
| Aluguer batería | — | 50€/mes | Opción de aluguer |
| % Arbitraxe | — | 30€/mes (est.) | 20% de 150€/mes aforro |
| Soporte/mantemento | 30€/mes | — | Estimado |
| **Margen mensual** | **30€** | **180€** | **83% de margen** |
| Payback de instalación | — | 22 meses | 3.930€ / 180€ |

---

## 6. FASES DO ROADMAP CON HARDWARE

### Fase 1: MVP Software (Semanas 1-4)
**Obxectivo:** Validar que os xestores queren software de xestión enerxética.

**Scope:**
- [ ] Dashboard con métricas de consumo
- [ ] Xestión de propiedades (CUPS, tipos, datos básicos)
- [ ] AI Advisor (cálculo completo de tarifas con impostos)
- [ ] Arbitraxe (simulador con datos OMIE reais)
- [ ] Upload CSV de facturas
- [ ] Alertas básicas (email/telegram)

**Hardware:** Ningún. Só software.

**Validación:**
- 50 usuarios rexistrados
- 10 xestores activos (suben facturas)
- 3-5 xestores pagan subscripción

---

### Fase 2: Piloto Hardware Limitado (Semanas 5-10)
**Obxectivo:** Validar que os xestores queren/pagan por hardware instalado.

**Scope:**
- [ ] Integración con Shelly EM (lectura vía API REST/MQTT)
- [ ] Dashboard en tempo real (datos reais de consumo)
- [ ] 10 instalacións piloto (gratis ou a coste)
- [ ] Soporte técnico básico
- [ ] Documentación de instalación
- [ ] Formación de 1-2 instaladores/tecnicos

**Hardware:**
- 20x Shelly EM (stock para 10 instalacións + recambios)
- 5x Shelly Pro EM (para fincas)
- Total stock: ~1.500€

**Criterios de éxito do piloto:**
- 8/10 instalacións funcionan sen problemas graves
- 5/10 clientes expresan interese en pagar por mantemento
- 2/10 clientes piden baterías (demanda de arbitraxe real)

---

### Fase 3: Producto Hardware+Software (Semanas 11-20)
**Obxectivo:** Lanzar oficialmente o produto HW+SW con medidores.

**Scope:**
- [ ] Venda/Aluguer de medidores Shelly EM/Pro EM
- [ ] Instalación estándar (protocolo documentado)
- [ ] Monitorización en tempo real (todas as propiedades)
- [ ] Alertas avanzadas (consumo anómalo, prezo alto)
- [ ] Comparativa de facturas antes/despois
- [ ] Rede de 3-5 instaladores colaboradores

**Modelo de negocio:**
- Instalación: 150-300€ (único)
- Aluguer medidor: 15-25€/mes
- Subscripción SW: 30-50€/mes
- **Total mensual por cliente: 45-75€**

**Hardware:**
- Stock rotativo de 50 medidores (~2.000€)
- Acordo con distribuidor Shelly (desconto por volume)

---

### Fase 4: Arbitraxe con Baterías (Semanas 21-35)
**Obxectivo:** Engadir baterías para arbitraxe real no mercado OMIE.

**Scope:**
- [ ] Integración con inversores Victron/Huawei
- [ ] Algoritmo de arbitraxe (decisión automática carga/descarga)
- [ ] Integración OMIE (datos en tempo real)
- [ ] Simulador vs. real (comparativa de aforro)
- [ ] Configuración de baterías (capacidade, potencia, límites)
- [ ] 5 instalacións piloto con baterías

**Hardware:**
- 10x Pylontech US3000C (~13.000€)
- 5x Victron MultiPlus-II (~10.000€)
- 5x IoTaWatt (~900€)
- Total stock: ~24.000€

**Modelo de negocio:**
- Instalación completa: 5.000-8.000€ (único)
- Aluguer batería: 50-80€/mes
- % de aforro por arbitraxe: 20-30%
- Subscripción SW premium: 80-120€/mes
- **Total mensual por cliente: 130-200€**

**Nota:** Esta fase require capital significativo. Recomendase:
- Opción A: Modelo de aluguer (EnergyOS mantén propiedade da batería)
- Opción B: Financiación do cliente (EnergyOS instala, cliente paga a prazos)
- Opción C: Sociedade con instalador solar existente (comparten stock e risco)

---

### Fase 5: Escala e Automatización (Semanas 36+)
**Obxectivo:** Escalar o modelo sen que o crecemento estea limitado por instalacións.

**Scope:**
- [ ] Modelo DIY ("Instálao ti mesmo") con guía detallada
- [ ] Verificación remota da instalación (fotos + test)
- [ ] Rede de 20+ instaladores certificados
- [ ] Automatización de pedidos de stock
- [ ] App móbil para instaladores (checklist, fotos, firmas)
- [ ] Integración con máis fabricantes (BYD, Huawei, etc.)
- [ ] Opción de financiación para clientes (BNPL)

**Expansións posibles:**
- Portugal (mesmo regulador, OMIE compartido)
- Italia (mercado similar)
- Francia (regulador diferente, mais mercado grande)

---

## 7. ANÁLISE COMPETITIVA: HW+SW

### 7.1 Competidores actuais (Software só)

| Competidor | Que fan | Por que EnergyOS é mellor con HW |
|------------|---------|----------------------------------|
| **Enpal** | Software + instalación solar | EnergyOS é agnóstico (non vende paneles, só xestión) |
| **Energia.robin** | Asesoría enerxética dixital | EnergyOS executa, non só aconseña |
| **Tarifas.es / Komparable** | Comparador de tarifas | EnergyOS optimiza en tempo real, non só unha vez |
| **Gana Energía / Octopus** | Tarifa indexada | EnergyOS é a capa de software que xestiona múltiples propiedades |

### 7.2 Competidores potenciais (HW+SW)

| Competidor | Risco | Defensa de EnergyOS |
|------------|-------|---------------------|
| **Solar tradicional (instaladores)** | Medio | EnergyOS é agnóstico e xestiona múltiples fornecedores |
| **Plataformas de agregación** | Baixo | EnergyOS vai ao cliente final, non ao mercado mayorista |
| **Grandes utilities (Iberdrola, Endesa)** | Alto | EnergyOS é independiente e multi-fornecedor |
| **Tesla Energy (Powerwall)** | Medio | EnergyOS é agnóstico de marca e máis barato |

---

## 8. ACCIÓN INMEDIATA RECOMENDADA

### Antes de lanzar o MVP (Fase 1):

1. **✅ Aprobar modelo de negocio** (Mauro): ¿Está cómodo co modelo HW+SW a medio prazo?
2. **📋 Crear conta de distribuidor** con Shelly (ou distribuidor español como Electrónica Embajadores)
3. **📋 Investigar regulación** CNMC para instalación de medidores non intrusivos (¿require boletín?)
4. **📋 Contactar 2-3 instaladores** eléctricos locais para posible colaboración
5. **📋 Investigar comercializadoras** con API: Octopus Energy España, Gana Energía
6. **🔄 Definir modelo de aluguer vs. venda** para hardware

### Durante o MVP (Fase 1):

1. **📊 Medir interese en hardware** — encuesta a usuarios: "¿Pagarías por un medidor de consumo en tempo real instalado?"
2. **📊 Identificar early adopters** — usuarios que expresen interese activo en hardware
3. **🔄 Desenvolver integración Shelly** en paralelo (lectura API)
4. **🔄 Preparar documentación** de instalación (guía visual, vídeo)

### Para o Piloto (Fase 2):

1. **📦 Comprar stock** de 20 Shelly EM + 5 Pro EM (~1.500€)
2. **🔧 Formar técnico** ou acordo con instalador local
3. **📋 Crear protocolo** de instalación (checklist, fotos, test)
4. **📋 Definir contrato** de aluguer/instalación
5. **📋 Configurar seguro** de responsabilidade civil para instalacións

---

## 9. MÉTRICAS DE ÉXITO POR FASE

| Fase | Métrica | Obxectivo |
|------|---------|-----------|
| **MVP (Fase 1)** | Usuarios activos | 50 rexistrados, 10 activos |
| **MVP (Fase 1)** | Conversión a pago | 10% (5 de 50) |
| **MVP (Fase 1)** | NPS software | > 7/10 |
| **Piloto (Fase 2)** | Instalacións exitosas | 8/10 (80%) |
| **Piloto (Fase 2)** | Interese en pagar HW | 50% (5 de 10) |
| **Piloto (Fase 2)** | Fallos graves | < 2 |
| **Producto (Fase 3)** | Clientes HW+SW | 20 clientes pagando |
| **Producto (Fase 3)** | Churn mensual | < 5% |
| **Producto (Fase 3)** | Margen bruto HW | > 25% |
| **Arbitraxe (Fase 4)** | Instalacións batería | 5 piloto |
| **Arbitraxe (Fase 4)** | Aforro medio mensual | > 100€/mes |
| **Arbitraxe (Fase 4)** | ROI para cliente | < 4 anos |

---

## 10. DECISIÓNS PENDENTES (Requieren OK de Mauro)

### Decisión 1: ¿Incluír hardware no MVP?
**Recomendación:** NON. Validar software primeiro.

### Decisión 2: ¿Modelo de aluguer ou venda de hardware?
**Recomendación:** Aluguer (EnergyOS mantén propiedade, maior recorrente, menor barreira para cliente).

### Decisión 3: ¿Fabricante principal de baterías?
**Recomendación:** Pylontech (mellor relación calidade/prezo, maduro en España).

### Decisión 4: ¿Inversor principal?
**Recomendación:** Victron (API aberta, ESS programable, comunidade).

### Decisión 5: ¿Comercializadora para arbitraxe?
**Recomendación:** Octopus Energy España (tarifa indexada, API, presencia en España).

### Decisión 6: ¿Capital inicial para stock?
**Recomendación:** 1.500€ para piloto de medidores, non adiantar stock de baterías ata validar demanda.

### Decisión 7: ¿Integración con Datadis para datos de CUPS?
**Recomendación:** SI, no MVP. Datadis ofrece datos horarios de consumo por CUPS vía API.

**Fluxo automatizado:**
1. Usuario engade propiedade co CUPS no formulario
2. Sistema mostra autorización electrónica para Datadis
3. Usuario firma digitalmente (firma electrónica)
4. Sistema solicita datos a Datadis automaticamente
5. Datos históricos (até 2 anos) dispoñibles inmediatamente

**Implementación:**
- Formulario de autorización electrónica na web
- Firma digital (pode ser sinxela: click + confirmación email/SMS)
- Integración API Datadis (REST)
- Almacenamento seguro de tokens de autorización

**Ventaxas:**
- Datos históricos sen instalar hardware
- Detección de anomalías dende o día 1
- Cálculo de tarifas con datos reais
- Sen custo de hardware para o cliente

### Decisión 8: ¿Simulación de baterías no MVP?
**Recomendación:** SI, no MVP. Funciona como lead generation para a venda de hardware.

**Fluxo:**
1. Usuario introduce datos da propiedade (consumo, CUPS, zona)
2. Simulador mostra: "Se instalas unha batería de 10kWh, aforrarías X€/ano con arbitraxe OMIE"
3. Mostra o ROI (cántos meses ata recuperar a inversión)
4. CTA: "Solicita orzamento sen compromiso"

**APIs necesarias:**
- OMIE — prezos horarios do mercado (xa contemplado)
- Datos climáticos — Open-Meteo (predición solar se metes placas)

---

*Documento creado por: CEO Review Mode v3*
*Data: 2026-05-06*
*Versión: 3.1 (Datadis + Simulación Baterías engadido)*
