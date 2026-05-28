# 👑 CEO Review v4 — EnergyOS: A PROPOSTA DE VALOR CORRECTA

## Data: 2026-05-11
## Modo: SCOPE REDUCTION (ruthless cut ao esencial)

---

## 📋 RESUMO EXECUTIVO

O Mauro plantexa unha cuestión estratéxica fundamental:

> **"Para o nicho de aluguer turístico, a App só software non aporta valor. ¿Non é mellor apostar polo HW como diferenciador?"**

**Veredicto rápido:** Si. E non só para Airbnb — para calquera propiedade onde haxa consumos que o propietario non pode ver en tempo real. O software só compite con unha táboa Excel. O hardware instalado é diferenciación real.

---

## 🔴 PREMISA ERRÓNEA A DESTRUÍR

### O problema con "EnergyOS = Software de xestión"

Mira o que pasa cando EnergyOS se presenta como software:

| Competidor | Que fai | Diferencia con EnergyOS |
|------------|---------|------------------------|
| Tarifas.es | Compara tarifas | 免费, rápido |
| Tuio | Asesoría enerxética | Xente real, personalizado |
| Calculadora Excel | Calcula aforro PVPC | Gratis |

**EnergyOS como software puro é commodity.** Non hai defensibilidade.

### O que realmente molesta ao propietario turístico

Pensa nun propietario de 3-4 apartamentos turísticos en Galicia:

```
ESCENARIO ACTUAL (sen EnergyOS):
- O propietario recibe facturas cada 2 meses
- Non sabe se os hóspedes deixaron o aire acond. conectado
- Non sabe se hai un consumo anómalo (escapamento, xeladeira mal)
- Descobre o problema cando chega a factura
- "¿Por que este mes son 450€ se o anterior eran 180€?"

ESCENARIO IDEAL (con HW):
- O propietario recibe un Telegram: "⚠️ Apartamento San Martiño - Consumo anómalo: 12kWh/hora último)
- Abre a app e ve: consumo en tempo real por apartamento
- Contacta co hóspede: "Hola, creo que deixaches o aire acond. posto..."
- Resolution: 50€ aforrados ese día
```

**Isto é valor real. Isto non se pode copiar cun dashboard e unha táboa Excel.**

---

## ✅ PROPOSTA DE VALOR CORRIXIDA

### ANTES (错误的):
```
EnergyOS - Software de xestión enerxética para inmobiliarias
- Dashboard con gráficos
- AI Advisor
- Comparativa de tarifas
```

### DESPOIS (correcto):
```
EnergyOS - Medidor intelixente para propiedades turísticas
- Instalamos un device no teu imóvel
- Ves o consumo en tempo real 24/7
- Alertas se hai consumo anómalo
- Cando non hai hóspedes, sabías se hai algo encendido
```

**A proposta de valor NON é software. É: "Sa bes a verdade do que pasa nas túas propiedades, sen ter que ir alí."**

---

## 🎯 FOCO: PROPIEDADES TURÍSTICAS (AIRBNB)

### Por que este nicho?

| Factor | Por que importa |
|--------|----------------|
| **Multiple propiedades** | Un propietario ten 3-10 apartamentos. Cada un é un punto de datos. O problema escala. |
| **Hóspedes variables** | Non son os mesmos usuarios cada mes. Non hai costumes establecidos. Un consumo anómalo é fácil de detectar. |
| **Presenza intermitente** | O propietario NON está nos pisos. Non pode ver se algo está mal. |
| **Marges altos** | Propietarios turísticos teñen máis marxe. Poden pagar 50-100€/mes por propiedade. |
| **Problema real** | O gasto enerxético é un dos maiores custos ocultos. Un Airbnb pode pasar de 150€/mes a 300€/mes sen que ninguén se dean conta. |

### Nicho secundario: Comunidades de propietarios

Pero este é mais complexo (votacións, administracións de fincas, etc.). **Máis difícil de vender.**

### Decisión: Comezar por Airbnb/propiedades turísticas. Despoís engadir comunidades como caso 2.

---

## 🔧 O HARDWARE CORRECTO: SHELLY EM

### Por que Shelly e non outro?

| Opción | Prezo | Instalación | API | Veredicto |
|--------|-------|-------------|-----|-----------|
| **Shelly EM** | 35-45€ | Pinzas (non intrusiva) | REST + MQTT + nube | ✅ RECOMENDADO |
| Shelly Pro EM | 70-90€ | Pinzas (non intrusiva) | WiFi + Ethernet | ✅ Alternativa se hai rede不稳 |
| IoTaWatt | 150-200€ | Pinzas | REST local | Demasiado complexo para MVP |
| Emporia Vue | 80-100€ | Pinzas (EUA, 120V) | API USA | ❌ Non compatible 230V |

### Shelly EM: O que fai

```
Características:
- 2 canais (ideal para bifásico español)
- Pinzas amperimétricas (non require tocar a instalación)
- WiFi integrado
- API REST accesible (mesmo dende fuera)
- MQTT para integracións
- Prezo: 35-45€

Instalación:
1. Apagar ICP (interruptor xeral)
2. Poñer pinzas nos cables de entrada
3. Conectar Shelly ao WiFi
4. Done - funcionando en 15 minutos
```

### Modelo de negocio con Shelly

| Concepto | Prezo | Detalle |
|----------|-------|---------|
| **Device** | 40€ | Shelly EM (custro para EnergyOS) |
| **Instalación** | 80-120€ | Técnico certificado (~1h) |
| **Subscripción mensual** | 35-50€/mes | Acceso a plataforma + alertas + soporte |
| **Total setup** | 120-160€ inicial + 40€/mes | |

**Alternativa de aluguer:**
| Concepto | Prezo |
|----------|-------|
| Device | EnergyOS mantén propiedade |
| Instalación | 80-120€ (un só pago) |
| Aluguer mensual | 15-20€/mes |
| Subscripción | 25-35€/mes |
| **Total mensual** | 40-55€/mes propiedade |

---

## 🚀 MVP CORRIXIDO: 3 PÁXINAS, UNHA PROPOSTA

### O que NON vai no MVP

```
Eliminado do MVP actual:
❌ Dashboard con 5 módulos (fincas, apartments, arbitrage, advisor, config)
❌ Gráficos complexos con Recharts
❌ Simulador de arbitraxe con baterías
❌ AI Advisor con Datadis (polo momento)
❌ Comparativa de tarifas
❌ Upload de facturas CSV
```

### O que SI vai no MVP

```
✅ Landing page simple (1 páxina)
✅ Formulario de contacto / demo request
✅ 3 beneficios claro
✅ Proposta de HW (Shelly) coma diferencial
✅ WhatsApp / Telegram de contacto
```

### Landing page correcta

```
HEADER:
EnergyOS - Medidor intelixente para propiedades turísticas

HERO:
"¿Sabes canto gastan os teus apartamentos cando non hai ninguén?"

SUBTITLE:
"Instálamos un dispositivo que mide o consumo en tempo real.
Se algo está encendido sen que debería, recíbes unha alerta no teu móbil."

BENEFICIOS (3):
1. Alertas de consumo anómalo
   "Chegas da factura e non enténdes por que son 400€ este mes.
   Co noso sistema, sabías o día 3 que había algo raro."

2. Control sen estar alí
   "Tes 4 apartamentos en distintos puntos da cidade.
   Todos os consumos nunha pantalla, sen ter que ir a ningún lado."

3. Sinxelo de instalar
   "Non hai obras. Non hai cables. Só pinzas nun interruptor.
   15 minutos e funcionando."

CTA:
"Solicita unha demo sen compromiso"
[Formulario: Nome, Email, Nº propiedades, Onde están]

FOOTER:
 "¿Queres saber máis?" → Engadir WhatsApp
```

---

## 📊 POR QUE ESTE MVP É DIFERENTE

### Comparativa: Software vs. HW

| Aspecto | MVP Software actual | MVP HW proposta |
|---------|-------------------|-----------------|
| **Proposta de valor** | "Ahorra na factura" | "Sabe o que pasa nos teus pisos" |
| **Diferenciación** | Gráficos + AI Advisor | Device instalado fisicamente |
| **Barrera de entrada competencia** | Baixa (podes copiar cun fin de semana) | Alta (precisas hardware + instalación) |
| **Conversión a pago** | Baixa (hai alternativas gratis) | Alta (hai un device, hai un servizo) |
| **Onboarding** | "Rexístrate e sube facturas" | "Veñen instalar e funciona" |
| **Tiempo ata valor** | 1-2 semanas (subir datos) | 15 minutos (device instalado) |
| **Upsell** | Módulos adicionais | Máis propiedades + alertas custom |

### Por que o propietario turístico paga por HW

Pensa na психología:

```
SEN HW:
- "Bueno, este mes gastei máis... serán os hóspedes que deixaron o aire posto."
- "Non pasa nada, é un custo máis."
- Non hai acción, non hai valor.

CON HW:
- "Amanece 8:30 - Alert: Apartamento A Costa: Consumo 2.1kWh/hora (normal: 0.3kWh)"
- "Mando mensaxe ao hóspede: Hola,Creo que deixaches o aire acond. conectado?"
- "Grazas! Si, xa o apago." → 40€ aforrados ese día
```

**O valor é inmediato e tangible.** Non é "aforrarás 500€ ao ano cun cambio de tarifa." É "acabácheste de poupar 40€ esta mañá."

---

## 🔄 FASES CORRIXIDAS

### Fase 1: Pilot con 5 propiedades (MES 1-2)
**Obxectivo:** Validar que propietarios turísticos pagan por esto.

**Scope:**
- [ ] 5 instalacións de Shelly EM (amigos, familiares, early adopters)
- [ ] Dashboard minimal: consumo actual + histórico 7 días + alertas
- [ ] Alertas por Telegram (gratis, sinxelo)
- [ ] Poxa de 5 propiedades: 3 meses gratis a cambio de feedback

**Hardware necesario:**
- 5x Shelly EM (~200€)
- Tempo técnico: 2-3 horas

**Métricas de éxito:**
- 5/5 instalacións funcionan sen problemas
- 4/5 din que si pagarian 40-50€/mes
- 2/5 xa teñen outras propiedades para instalar

---

### Fase 2: Producto mínimo viable (MES 2-3)
**Obxectivo:** Lanzar oficialmente con 10-20 clientes.

**Scope:**
- [ ] Landing page con proposta clara de HW
- [ ] Formulario de demo request
- [ ] Dashboard para 1-20 propiedades
- [ ] Alertas por Telegram/WhatsApp
- [ ] 1 técnico de instalación (contratado ou freelance)

**Prezo:**
- Instalación: 100€ (un só pago)
- Subscripción: 40€/mes/propiedade
- Ou: 15€/mes só device + 25€/mes servizo

---

### Fase 3: Escala (MES 4-6)
**Obxectivo:** 50 propiedades instaladas.

**Scope:**
- [ ] Rede de 3-5 instaladores
- [ ] App móbil simple (ver propiedades + alertas)
- [ ] Integración con Airbnb (webhook cando hai reserva nova?)
- [ ] Packs: 5 propiedades por X€/mes, 10 propiedades por Y€/mes

---

## ⚠️ RISCOS CRÍTICOS

| Risco | Probabilidade | Impacto | Mitigación |
|-------|--------------|---------|------------|
| **Propietario non quere instalación** | Medio | Alto | Piloto gratis + demostración primeiro |
| **Problema técnico en remoto** | Alto | Medio | Shelly ten API nube + local; fallback |
| **WiFi no imóvel non chega** | Medio | Alto | Shelly Pro EM con Ethernet ou 4G fallback |
| **Técnico non disponible** | Medio | Alto | Formar 2-3 técnicos, non depender de 1 |
| **Competidor copia (Shelly propio)** | Baixo | Medio | Instalación + configuración + soporte é o valor |

---

## ❓ PREGUNTAS PARA MAURO

### Pregunta 1: ¿HW como proposta de valor principal?
**Si/non?** A miña recomendación é SI. Pero necesito que confirmes.

### Pregunta 2: ¿Piloto gratuíto para 5 propiedades?
Para validar, necesitas datos reais. Un piloto de 5 propiedades gratis (ou a custo) permítiche:
- Ver se funciona a técnología
- Ver se os propietarios realmente usan as alertas
- Ter testimonials reais
- Iterar no produto

**Recomendación:** Piloto de 5 propiedades, 3 meses gratis, a cambio de feedback + testimonial.

### Pregunta 3: ¿Instalación propia ou subcontratada?
- **Opción A (Máis control):** Contratar/format un técnico propio. Custo: 1.500-2.000€/mes. Limitado a unha zona.
- **Opción B (Máis escala):** Acordo con electricistas locais. Custo: 80-120€/instalación. Podes expandir rápido.
- **Opción C (Híbrido):** Comezar con B,移行 a A se hai volume suficiente.

### Pregunta 4: ¿Prezo de subscripción?
- 35-50€/mes/propiedade? (Baixo, seguro)
- 60-80€/mes/propiedade? (Medium, mais marxe)
- 100+/mes/propiedade? (Alto, só para clientes premium)

---

## 📋 ACCIÓN INMEDIATA

### Se aceptas o enfoque HW:

**1. Crear landing page minimal** (esta semana)
- Hero: "Sabe o que pasa nos teus apartamentos"
- 3 beneficios con imaxes
- Formulario: Nome, Email, Nº propiedades, Onde
- CTA: "Pide unha demo gratuíta"

**2. Mercar 5x Shelly EM** (~200€)
- Para o piloto
- Testedo en tuas propiedades primeiro

**3. Crear dashboard minimal** (2-3 días)
- Ver consumo actual (ultimo valor)
- Ver histórico 7 días (gráfico sinxelo)
- Configurar alertas (Telegram)

**4. Buscar 5 early adopters** 
- Amigos, familiares, contactos con propiedades Airbnb
- Oferta: 3 meses gratis a cambio de feedback

---

## ✅ RESUMO: O QUE CAMBIA

| Aspecto | Antes (Software) | Despois (HW + SW minimal) |
|---------|-----------------|--------------------------|
| **Proposta de valor** | "Ahorra na factura" | "Sabe o que pasa" |
| **Diferenciación** | Dashboard + AI | Device instalado |
| **MVP** | Landing + 5 módulos | Landing + 3 beneficios + demo |
