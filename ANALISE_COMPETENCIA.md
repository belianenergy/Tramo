# Análise de Competencia — EnergyOS Dashboard v2

## Data: 2026-05-06
## Obxectivo: Identificar os mellores patróns de UI/UX para rexenerar o dashboard de EnergyOS

---

## 1. PLATAFORMAS DE XESTIÓN ENERGÉTICA

### 1.1 Enpal (enpal.de)
**Estilo:** Clean, moderno, orientado a B2C/B2B híbrido
- **Cores:** Verde menta (#00C896) sobre fondos claros (#F8FAFC). Alto contraste.
- **Layout:** Hero con métricas grandes → gráficos → táboas de datos
- **Sidebar:** Non usan sidebar. Navegación superior horizontal con dropdowns.
- **Tipografía:** Inter ou similar sans-serif. Números grandes (48px+) para métricas principais.
- **UX:** Enfoque en "ahorro" — sempre mostran canto se aforra. CTAs prominentes en verde.

**Aprendizaxes:**
- ✅ As métricas de aforro deben ser INMEDIATAMENTE visibles
- ✅ Cores claras con acento verde funcionan mellor para enerxía
- ✅ Non sobrecargar con sidebar se o producto é simple

### 1.2 EnergyHub (energyhub.com)
**Estilo:** Enterprise, denso en datos, analítico
- **Cores:** Azul corporativo (#0066CC) sobre gris claro. Moi profesional.
- **Layout:** Dashboard con múltiples paneles. Grid de 3 columnas para métricas.
- **Sidebar:** Collapsible, iconas + texto, agrupación lóxica por función.
- **Tipografía:** Monospace para datos, sans-serif para etiquetas.
- **UX:** Drill-down profundo. Cada gráfico é clickable. Filtros sempre visibles.

**Aprendizaxes:**
- ✅ Sidebar ben organizado acelera a navegación
- ✅ Datos en monospace dan sensación de precisión
- ✅ Filtros sticky son esenciais para moitos datos

### 1.3 Sense (sense.com)
**Estilo:** Consumer-friendly, visual, colorido
- **Cores:** Degradados de laranxa/vermello para "power", verde para "efficiency"
- **Layout:** Circular/bubble charts para consumo. Timeline horizontal.
- **Sidebar:** Mínima. Navegación por iconas na parte inferior.
- **Tipografía:** Redonda, amigable. Nada de monospace.
- **UX:** Gamificación leve — " descubrir dispositivos", alertas amigables.

**Aprendizaxes:**
- ✅ Visualización non tradicional (burbullas) pode funcionar para consumo
- ✅ Tono amigable reduce a ansiedade sobre facturas
- ❌ Demasiado consumer para B2B

### 1.4 Emporia Vue (emporiaenergy.com)
**Estilo:** Técnico, directo, tabular
- **Cores:** Azul escuro (#1a237e) con acentos cian. Fondo branco puro.
- **Layout:** Táboas dominantes. Gráficos secundarios.
- **Sidebar:** Non ten. Tabs horizontais por dispositivo/propiedade.
- **Tipografía:** Arial/Helvetica-like. Nada especial.
- **UX:** Orientado a "monitorizar todo". Lista de dispositivos con consumo en tempo real.

**Aprendizaxes:**
- ✅ Táboas densas son efectivas para moitos dispositivos
- ✅ Datos en tempo real necesitan actualización visual
- ❌ Demasiado técnico para xestores inmobiliarios

### 1.5 Arcadia / OhmConnect / Renew Home
**Estilo:** App-first, notificacións-driven, simplificado
- **Cores:** Verdes variados, brancos, algúns con modo escuro opcional
- **Layout:** Tarxetas grandes, scroll vertical, pouca densidade
- **Sidebar:** Non aplicable (mobile-first)
- **Tipografía:** Grandes, legibles, sistemas de deseño propios
- **UX:** Eventos "OhmHours", recompensas, notificacións push

**Aprendizaxes:**
- ✅ Notificacións e alertas deben ser prominentes
- ✅ Tarxetas grandes funcionan ben en móbil
- ❌ Demasiado simplificado para operadores profesionais

---

## 2. PLATAFORMAS DE XESTIÓN INMOBILIARIA

### 2.1 Guesty (guesty.com)
**Estilo:** SaaS moderno, colaborativo, multi-canal
- **Cores:** Roxo (#6366F1) como primario. Fondo #F9FAFB (gris moi claro).
- **Layout:** Sidebar fixo á esquerda (240px). Contido central con padding xeneroso.
- **Sidebar:** Iconas outlined (Phosphor/Lucide), etiquetas curtas, seccións con separadores.
- **Tipografía:** Inter, pesos 400-600. Números en 24-32px para KPIs.
- **UX:** Multi-calendar view, inbox integrado, automatizacións visibles.

**Aprendizaxes:**
- ✅ Sidebar con iconas outlined + texto é estándar SaaS
- ✅ Roxo/violeta funciona moi ben para diferenciación
- ✅ Espaciado xeneroso mellora a lexibilidade
- ✅ Estado "online" ou "sincronizado" visible no sidebar

### 2.2 Hostaway (hostaway.com)
**Estilo:** Enterprise, denso, funcional
- **Cores:** Azul (#2563EB) sobre branco. Moi convencional.
- **Layout:** Sidebar + header + contido. Tablas dominantes.
- **Sidebar:** Similar a Guesty pero máis compacto.
- **Tipografía:** System fonts. Eficiente pero non memorable.
- **UX:** Moitos datos, moitos filtros, orientado a operadores experimentados.

**Aprendizaxes:**
- ✅ Tablas con filtros avanzados son esenciais
- ✅ Exportar datos debe ser de fácil acceso
- ❌ Demasiado denso para usuarios novos

### 2.3 Lodgify (lodgify.com)
**Estilo:** Builder-friendly, visual, arrastrar-soltar
- **Cores:** Verde (#10B981) e laranxa. Moderno e fresco.
- **Layout:** Canvas central con toolbar lateral. Non é típico dashboard.
- **Sidebar:** Contextual — cambia segundo o que se está a editar.
- **Tipografía:** Redonda, amigable.
- **UX:** Orientado a crear páxinas web, non a xestionar operacións.

**Aprendizaxes:**
- ✅ Verde esmeralda asóciase a "crecer/éxito"
- ✅ Interaccións visuais son importantes para engagement

### 2.4 Buildium / AppFolio / Propertyware / RentManager
**Estilo:** Legacy enterprise, funcional, denso
- **Cores:** Azul marino, grises, pouco uso de cores de acento
- **Layout:** Datagrid-heavy, formularios extensos, moitos campos
- **Sidebar:** Tree-menu profundo, moitos niveis de anidación
- **Tipografía:** Arial, Verdana. Sistema legacy.
- **UX:** Orientado a contables e xestores con formación técnica.

**Aprendizaxes:**
- ✅ Tree-menus son necesarios para xerarquías complexas
- ❌ Deseño antiga = oportunidade de diferenciación
- ❌ Demasiado complexo para o MVP de EnergyOS

---

## 3. DASHBOARDS DE REFERENCIA UI/UX

### 3.1 Linear.app
**Estilo:** Minimalista, escuro premium, velocidade
- **Cores:** Fondo #0E1116 (case negro azulado). Acentos sutís.
- **Layout:** Sidebar estreita (200px) + lista + detalle. Tres paneis.
- **Sidebar:** Iconas pequenas (16px), sen texto se colapsa, con texto se expande.
- **Tipografía:** Inter, moi limpa. Pesos 400-500. Nada de negrita agresiva.
- **UX:** Teclado-first, atallos everywhere, sensación de velocidade.

**Aprendizaxes:**
- ✅ Modo escuro ben feito ≠ negro puro. #0E1116 é máis suave.
- ✅ Bordes sutís (#21262D) melloran a estratificación
- ✅ Menos é máis — cada elemento debe ter propósito
- ✅ Hover states elegantes: ligero cambio de fondo, non transformacións agresivas

### 3.2 Vercel Dashboard
**Estilo:** Técnico premium, escuro, data-dense
- **Cores:** Fondo #000000 puro. Acentos brancos/grises. Moi contrastado.
- **Layout:** Sidebar + header minimalista + contido con cards.
- **Sidebar:** Simple, iconas + texto, estados activos con fondo diferenciado.
- **Tipografía:** Geist (propia), números en monospace para datos técnicos.
- **UX:** Deployments, logs, analytics — todo moi denso pero organizado.

**Aprendizaxes:**
- ✅ Cards con bordes 1px (#333) e border-radius 8px funcionan ben en escuro
- ✅ Separadores claros entre seccións
- ❌ Negro puro pode ser demasiado duro para longas sesións

### 3.3 Stripe Dashboard
**Estilo:** Financiero, confiable, escuro opcional
- **Cores:** #FFFFFF por defecto, modo escuro con grises suaves.
- **Layout:** Sidebar + header + contido. Gráficos prominentes.
- **Sidebar:** Estructura clara: Home, Payments, Customers, Reports, etc.
- **Tipografía:** Inter/Helvetica. Números grandes para balance.
- **UX:** "Aha moments" — gráficos que explican tendencias automaticamente.

**Aprendizaxes:**
- ✅ Gráficos con anotacións automáticas son moi útiles
- ✅ Balance/ingresos sempre visibles no header
- ✅ "Empty states" ben deseñados guían ao usuario

### 3.4 Notion
**Estilo:** Flexible, colaborativo, familiar
- **Cores:** Branco por defecto, escuro suave (#191919).
- **Layout:** Sidebar tree + contido flexible.
- **Sidebar:** Tree con páxinas anidadas, iconas emoji, favoritos.
- **Tipografía:** Serif para títulos (único!), sans-serif para corpo.
- **UX:** Slash commands, databases con múltiples vistas.

**Aprendizaxes:**
- ✅ Flexibilidade de vistas (tabla/board/calendar) é poderosa
- ✅ Iconas emoji/personalizadas engaden personalidade
- ❌ Demasiado flexible pode confundir se non se guía

### 3.5 Figma
**Estilo:** Creativo, colaborativo, layer-based
- **Cores:** #2C2C2C (gris escuro). Moi neutro.
- **Layout:** Toolbar superior + sidebar esquerda (layers) + sidebar dereita (props).
- **Sidebar:** Profunda anidación, drag-to-reorder, visibilidade toggle.
- **Tipografía:** Inter propia. Moi limpa.
- **UX:** Multi-cursor, comments, version history.

**Aprendizaxes:**
- ✅ Multi-panel é efectivo para complexidade
- ✅ Layers/props organizados aceleran o workflow

---

## 4. CONCLUSIÓNS E RECOMENDACIÓNS

### 4.1 Paleta de Cores Recomendada

**PROBLEMA:** O dashboard actual usa #0E141A (case negro) con pouco contraste entre elementos.

**SOLUCIÓN:**
```
Fondo principal:      #0F1117 (azulado moi escuro, máis suave que negro puro)
Fondo tarxetas:       #161922 (ligeiramente máis claro para estratificación)
Fondo sidebar:        #13161F (diferenciado pero coherente)
Bordes:               #252A3A (visibles pero non agresivos)
Texto principal:      #E8ECF2 (branco suave, non #FFFFFF puro)
Texto secundario:     #8B94A5 (gris azulado lexible)
Primario (enerxía):   #10B981 (esmeralda, mantémolo)
Acento Fincas:        #3B82F6 (azul)
Acento Apartamentos:  #F59E0B (ámbar)
Acento Arbitraxe:     #8B5CF6 (violeta)
Éxito:                #34D399 (verde claro)
Alerta:               #FBBF24 (ámarao)
Erro:                 #F87171 (vermello suave)
```

### 4.2 Layout Recomendado

**Header:**
- Logo + "EnergyOS" á esquerda
- Navegación de módulos: Fincas | Apartamentos | Arbitraxe | Asesor
- Search global + Notificacións + Avatar á dereita
- Altura: 56px ( máis compacto que 64px)

**Sidebar (260px):**
```
📊 Panel (activo por defecto)
🏢 Fincas
   ├── Panel
   ├── Comunidades
   ├── Reparto de Gastos
   └── Informes
🏠 Apartamentos
   ├── Panel
   ├── Propiedades
   ├── Inquilinos
   └── Alertas
⚡ Arbitraxe
🤖 Asesor
───
⚙️ Configuración
❓ Axuda
🚪 Pechar sesión
```

**Contido:**
- Padding: 24px
- Grid: 12 columnas
- Gap: 16px
- Máximo ancho: 1440px (centrado)

### 4.3 Tipografía Recomendada

- **Principal:** Inter (Google Fonts) — pesos 400, 500, 600, 700
- **Monospace:** JetBrains Mono — só para números, prezos, métricas
- **Tamaños:**
  - Display/Hero: 32px, weight 700
  - H1: 24px, weight 600
  - H2: 18px, weight 600
  - Body: 14px, weight 400
  - Caption: 12px, weight 500, uppercase, letter-spacing 0.05em
  - Métrica grande: 36px, weight 700, JetBrains Mono
  - Métrica pequena: 20px, weight 600

### 4.4 Patróns de Navegación

1. **Sidebar sempre visible** en desktop (>1024px)
2. **Sidebar colapsable** a iconas só (72px) con hover tooltip
3. **Módulo activo** resaltado con cor de acento + indicador lateral (3px)
4. **Sub-elementos** con indentación + icona pequena
5. **Breadcrumbs** no header do contido (non no header global)
6. **Tabs secundarias** dentro do contido para vistas alternativas

### 4.5 Melloras de UX vs Versión Actual

| Aspecto | Actual | Recomendado |
|---------|--------|-------------|
| Fondo | #0E141A (moi escuro) | #0F1117 (máis suave) |
| Contraste | Baixo entre cards | Alto, bordes visibles |
| Sidebar | En inglés | Todo en español/galego |
| Tipografía | Pesada, agresiva | Lixeira, profesional |
| Espaciado | Compacto | Xeneroso (24px padding) |
| Hover states | Translate-x (agresivo) | Fondo sutil + cor |
| Métricas | 28px | 36px, monospace |
| Gráficos | Placeholder básico | Área chart con gradiente |
| Tablas | Dense | Con hover, accións visibles |
| Mobile | Bottom nav cutre | Sheet/drawer pattern |

### 4.6 Interaccións Clave

1. **Carga:** Cards entran con fade + slideUp (stagger 50ms)
2. **Métricas:** Contador animado (countUp) ao cargar
3. **Hover cards:** Border glow suave, translateY(-1px)
4. **Hover filas tabla:** Fondo #1E2230, transición 150ms
5. **Cambio módulo:** Crossfade 200ms
6. **Loading:** Skeleton pulse, non spinner
7. **Notificacións:** Toast slide-in dende arriba-dereita
8. **Modal:** Backdrop blur + scale-in

---

## 5. RESUMO EXECUTIVO

### O que funciona na competencia:
- **Guesty/Linear:** Sidebar limpo con iconas + texto, espaciado xeneroso
- **Stripe:** Gráficos con contexto, métricas financeiras prominentes
- **Enpal:** Cor verde para "ahorro", ton positivo
- **EnergyHub:** Datos densos ben organizados, filtros sticky

### O que NON funciona na competencia:
- **Buildium/AppFolio:** Deseño legacy, sobrecarga de información
- **Emporia:** Demasiado técnico para xestores
- **Vercel:** Negro puro cansa na lectura prolongada

### Recomendación para EnergyOS v2:
1. **Mantener modo escuro** pero suavizar os tons (non negro puro)
2. **Sidebar en español** con estrutura clara e iconas
3. **Cards con bordes visibles** e estratificación de fondos
4. **Métricas grandes en monospace** para sensación financeira
5. **Gráficos con gradientes** e tooltips informativos
6. **Táboas con hover states** e accións contextuais
7. **Mobile-first responsive** con drawer navigation
8. **Micro-interaccións sutís** que non distraen

---

## Referencias Visuais

- Linear.app → minimalismo escuro
- Guesty → SaaS inmobiliario moderno
- Stripe → dashboard financeiro confiable
- Enpal → enerxía con ton positivo
- Notion → flexibilidade e personalización
