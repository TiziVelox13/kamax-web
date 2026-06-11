# Design System — KAMAX AL125 Landing

Identidad derivada del banner oficial de Kamax (chica en la AL125, "DISTRIBUIDOR OFICIAL"): fondo claro, rojo Kamax, azul royal, diagonales de velocidad y tramas de puntos halftone. Reemplaza la versión dark racing (decisión de Alejandro/Velox, 11/06/2026).

## Visual Theme

Racing oficial sobre fondo claro. La página se siente como material de concesionaria de marca: blanco dominante, bloques diagonales rojos y azules que cortan las secciones, fotografía de producto sobre fondo limpio, números técnicos grandes. Energía sin oscuridad.

Escena física: un comprador la abre al mediodía en la vereda, sol directo en la pantalla del teléfono — el fondo claro no es gusto, es legibilidad en exteriores.

## Color Palette

Estrategia: **full palette** (3 roles deliberados sobre neutrales). Regla 60-30-10: 60% neutrales claros, 30% navy/azul (estructura y texto), 10% rojo (identidad) + verde reservado a WhatsApp.

| Token | Hex | OKLCH aprox. | Rol |
|---|---|---|---|
| `--paper` | `#F8FAFC` | 98% 0.004 250 | Fondo base (off-white frío, tinte hacia el azul de marca) |
| `--surface` | `#FFFFFF` | 100% 0 0 | Cards y superficies elevadas |
| `--ink` | `#0A1424` | 17% 0.03 262 | Texto principal (navy-negro) |
| `--steel` | `#46505F` | 42% 0.02 258 | Texto secundario (≥4.5:1 sobre paper) |
| `--line` | `#E1E6EE` | 92% 0.008 255 | Hairlines y bordes 1px |
| `--red` | `#EC0606` | 55% 0.23 28 | Rojo Kamax oficial (sampleado del logo). Gráfica, decals, énfasis display |
| `--red-ink` | `#C20309` | 48% 0.20 28 | Rojo para texto sobre claro y hovers (5.8:1) |
| `--blue` | `#0E3580` | 33% 0.14 262 | Azul royal del banner. Campos, sección técnica, estructura |
| `--blue-deep` | `#0A2660` | 26% 0.12 263 | Azul profundo (footer, hovers de blue) |
| `--blue-bright` | `#1455C4` | 45% 0.17 262 | Links y acentos chicos sobre claro |
| `--wa` | `#0F7A42` | 50% 0.13 152 | Verde WhatsApp accesible (botones, texto blanco ≥4.5:1) |
| `--wa-bright` | `#25D366` | — | Verde WhatsApp brillante (solo ícono flotante / detalles, nunca texto) |

Semántica fija: **verde = hablar por WhatsApp** (única acción de conversión), **rojo = identidad Kamax** (display, decals, gráfica), **azul = estructura y datos técnicos**. Nunca se cruzan.

## Typography

Familia única con contraste por eje de ancho: **Saira** (Omnibus-Type, fundición argentina — voz motorsport genuina, tabular figures para specs).

| Rol | Fuente | Peso | Tamaño |
|---|---|---|---|
| Display / H1-H2 | Saira Extra Condensed | 700 | `clamp(2.9rem, 7vw, 6rem)`, caps, line-height .92 |
| Decal chips / labels | Saira Extra Condensed | 600 | 0.95–1.1rem caps, tracking 0.06em |
| Body | Saira | 400/500 | 1rem fijo, line-height 1.65, máx 65ch |
| Datos / precio | Saira | 600/700 | `tabular-nums` |

Escala con ratio ≥1.33. Body nunca menor a 1rem. Sobre `--blue` (texto claro en campo oscuro): line-height +0.05 y letter-spacing 0.01em.

Reemplaza a Anton + Archivo + IBM Plex Mono (Plex Mono está en la reflex-reject list; Anton/Archivo eran la identidad dark anterior).

## Signature Elements (sistema de marca propio)

1. **Decal chip**: paralelogramo `skewX(-12deg)` rojo (o azul) con texto blanco en Saira Extra Condensed caps. Es EL kicker de sección — sistema nombrado y deliberado que reemplaza el eyebrow tracked + numerito 01/02/03 (ambos prohibidos como scaffolding).
2. **Bandas diagonales**: cortes `clip-path: polygon(...)` rojos/azules entre secciones, eco directo de los swooshes del banner oficial.
3. **Trama halftone**: grilla de puntos (radial-gradient) como elemento decorativo puntual — esquina del hero, transiciones. Del banner. Dosis baja: 2–3 apariciones máximo.
4. **Hairlines + superficies blancas**: cards `#FFF` con borde 1px `--line` completo (jamás side-stripe).

## Components

- **Botón WhatsApp** (`.btn-wa`): fondo `--wa`, texto blanco 600, ícono WA, radio 6px, target ≥48px. Única clase de botón de conversión.
- **Botón fantasma** (`.btn-ghost`): borde 1px `--ink`, texto `--ink`; hover invierte.
- **Bloque precio**: cifra `$2.090.000` en Saira 700 tabular grande + leyenda "precio final de venta · contado" + línea de financiación honesta ("¿cuotas? consultá por WhatsApp").
- **Ledger técnico**: sección ficha sobre campo `--blue`, filas `dt/dd` con hairlines `rgba(255,255,255,.18)`, texto blanco.
- **Swatches de colorway**: split diagonal c1/c2, activo con anillo `--ink`.
- **Composer WhatsApp**: card blanca, 1 input + chips de pago + color sincronizado; arma el mensaje wa.me.
- **Decal chip / bandas / halftone**: ver Signature Elements.

## Layout

- Padding fluido `clamp(20px, 5vw, 72px)`; secciones con respiración generosa `clamp(72px, 12vw, 160px)`.
- Asimetría deliberada: hero copy izquierda / moto derecha; ficha 1/3–2/3; collage con tiles de tamaños variados (no grilla idéntica).
- Mobile: una idea por pantalla, barra CTA inferior fija tras el hero.
- Z-scale semántica: ambient(0) → content(1) → sticky/topbar(110) → progress(120) → float(130).

## Motion

- Entrada del hero coreografiada una sola vez (clip-path reveal del título, fade-up del resto, stagger 80ms).
- Reveals on-scroll discretos vía IntersectionObserver, siempre sobre contenido ya visible (sin gatear visibilidad).
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-quint). Sin bounce, sin elastic.
- Ticker de equipamiento: banda roja diagonal con marquee lento.
- `@media (prefers-reduced-motion: reduce)`: todo a crossfade/instantáneo, marquee pausado.

## Imagery

- Recortes de la moto (6 colorways, webp con fondo transparente) sobre el fondo claro con sombra de piso elíptica suave.
- Banner oficial (`banner-distribuidor.jpg`) full-bleed en la franja "Distribuidor oficial" — es la única fotografía con personas; le da cara humana y sello oficial.
- Logo Kamax (rojo, transparente) en topbar y footer. Logo Velox (navy, fondo blanco) SOLO en la franja de distribuidor y footer, tamaño contenido — Kamax protagonista.
- Crops de detalle (óptica, motor, asiento, baulera, USB, escape) en el collage, con borde 1px.

## Data Reality (regla de oro)

Confirmado y publicable: precio $2.090.000 (final, contado) · 6 colorways · ficha técnica completa · WhatsApp 351 370-2828 (wa.me/5493513702828) · Velox Solutions = distribuidor oficial.
NO confirmado (la página no lo afirma): cuotas/planes de financiación, canje, bonificaciones, dirección de showroom, stock por color. Para todo eso: CTA "consultá por WhatsApp".
