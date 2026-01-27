

# Pivot Estrategico: Finanet - Calculadora de Costeo para Emprendedores Universitarios

## Objetivo del Pivot
Transformar Finanet de una app de **control financiero (registrar ventas y ver KPIs)** a una **calculadora de costeo de productos** para emprendedores universitarios. Esto cambia completamente la funcionalidad core, haciendo que sea irreconocible respecto al proyecto original.

---

## Diferenciacion Clave

| Aspecto | Proyecto Original | Finanet (Nuevo) |
|---------|-------------------|-----------------|
| **Proposito** | Registrar ventas y gastos | Calcular costos y precios |
| **Datos principales** | Transacciones (ingresos/gastos) | Productos con ingredientes |
| **Dashboard** | Graficas de flujo de caja | Fichas de productos con margenes |
| **KPIs** | Utilidad neta, margen | Costo unitario, precio sugerido |
| **Accion principal** | "Registrar movimiento" | "Crear receta de costeo" |
| **Usuario objetivo** | Emprendedor general | Estudiante que vende productos |

---

## Nuevas Funcionalidades Core

### 1. Catalogo de Productos (reemplaza Transacciones)
En lugar de registrar ventas, el usuario crea **productos/recetas** con:
- Nombre del producto (ej: "Brownies x6")
- Lista de ingredientes con cantidades y costo unitario
- Costos indirectos (empaque, gas, electricidad)
- Precio de venta
- Calculo automatico de: costo total, margen, precio sugerido

### 2. Dashboard de Costeo (reemplaza Dashboard actual)
En lugar de graficas de ingresos vs gastos:
- **Cards de productos** con costo unitario y margen
- **Producto mas rentable / menos rentable**
- **Alerta de productos con margen bajo (<20%)**
- **Resumen**: "Tienes X productos, margen promedio Y%"

### 3. Calculadora de Precio (nueva funcionalidad estrella)
Herramienta donde el usuario ingresa:
- Costo total de produccion
- Margen deseado (ej: 50%)
- Sistema calcula: precio de venta sugerido

### 4. Inventario de Insumos (reemplaza Categorias)
En lugar de categorias de ingreso/gasto:
- Lista de materias primas con precio por unidad
- Ej: "Harina - $25/kg", "Chocolate - $80/kg"
- Al crear una receta, se seleccionan de aqui

### 5. Simulador de Escenarios (reemplaza Proyecciones)
- "Si vendo X unidades a este precio, gano Y"
- "Si el ingrediente sube 20%, mi margen baja a Z%"
- Punto de equilibrio: "Necesitas vender X unidades para recuperar tu inversion"

### 6. Reportes simplificados (adapta Reportes)
- Lista de productos con costos y margenes
- Exportar a PDF para entregar en clase

---

## Cambios en Base de Datos

### Nuevas Tablas
```text
products
- id: uuid
- business_id: uuid
- name: text
- description: text
- sale_price: numeric
- created_at: timestamp

ingredients
- id: uuid  
- business_id: uuid
- name: text
- unit: text (kg, L, pza, etc)
- cost_per_unit: numeric
- created_at: timestamp

product_ingredients (relacion muchos a muchos)
- id: uuid
- product_id: uuid
- ingredient_id: uuid
- quantity: numeric
- created_at: timestamp

indirect_costs (costos indirectos por producto)
- id: uuid
- product_id: uuid
- name: text
- amount: numeric
- created_at: timestamp
```

### Tablas que se mantienen pero cambian de uso
- **businesses**: se mantiene igual (el emprendimiento del estudiante)
- **categories**: se puede eliminar o reutilizar para tipos de producto

### Tablas que se eliminan/ignoran
- **transactions**: ya no se usan (no hay registro de ventas)

---

## Cambios en la Navegacion del Sidebar

| Antes | Despues |
|-------|---------|
| Dashboard | Dashboard (nuevo diseno) |
| Transacciones | Mis Productos |
| Categorias | Insumos |
| Reportes | Reportes de Costeo |
| Indicadores | Calculadora |
| Proyecciones | Simulador |
| Suscripcion | Suscripcion |
| Ajustes | Ajustes |

---

## Cambios en la Landing Page

### Hero
- Titulo: "Calcula el costo real de tus productos"
- Subtitulo: "La herramienta de costeo para emprendedores universitarios. Sabe exactamente cuanto te cuesta producir y cuanto debes cobrar."
- CTA: "Calcular mi primer producto gratis"

### Features
1. **Costeo por receta** - Agrega ingredientes y calcula el costo automaticamente
2. **Precio sugerido** - Te decimos cuanto cobrar para tu margen deseado
3. **Inventario de insumos** - Registra tus materias primas y precios
4. **Simulador** - Prueba escenarios: que pasa si sube un ingrediente?
5. **Exporta reportes** - PDF listo para tus clases o inversionistas
6. **Gratis para estudiantes** - Empieza sin pagar

### Testimonios
- "Estaba cobrando mis brownies muy baratos, Finanet me mostro que perdia dinero"
- "Use el reporte de costeo para mi proyecto de emprendimiento y saque 10"
- "Por fin se exactamente cuanto me cuesta cada producto"

### Pricing
- **Gratis**: 3 productos, 10 insumos
- **Estudiante** ($79/mes): Productos ilimitados, simulador
- **Pro** ($199/mes): Multiples emprendimientos, exportacion

---

## Archivos a Crear

| Archivo | Descripcion |
|---------|-------------|
| `src/pages/app/Productos.tsx` | Lista de productos con costeo |
| `src/pages/app/Insumos.tsx` | Inventario de materias primas |
| `src/pages/app/Calculadora.tsx` | Calculadora de precio |
| `src/pages/app/Simulador.tsx` | Simulador de escenarios |
| `src/components/app/ProductCard.tsx` | Card de producto con margen |
| `src/components/app/AddProductModal.tsx` | Modal para crear producto |
| `src/components/app/AddIngredientModal.tsx` | Modal para crear insumo |
| `src/hooks/useProducts.ts` | Hook para CRUD de productos |
| `src/hooks/useIngredients.ts` | Hook para CRUD de insumos |
| `src/hooks/useCosteoData.ts` | Hook para calculos de dashboard |

## Archivos a Modificar Significativamente

| Archivo | Cambios |
|---------|---------|
| `src/pages/app/Dashboard.tsx` | Nuevo diseno con cards de productos |
| `src/pages/app/Reportes.tsx` | Reporte de costeo en lugar de P&L |
| `src/components/app/AppLayout.tsx` | Nueva navegacion |
| `src/components/landing/Hero.tsx` | Nuevo copy de costeo |
| `src/components/landing/Features.tsx` | Nuevas features |
| `src/components/landing/Pricing.tsx` | Nuevos planes |
| `src/components/landing/FAQ.tsx` | Nuevas preguntas |
| `src/components/landing/Testimonial.tsx` | Nuevos testimonios |

## Archivos a Eliminar o Dejar Obsoletos

| Archivo | Accion |
|---------|--------|
| `src/pages/app/Transacciones.tsx` | Reemplazar por Productos.tsx |
| `src/pages/app/Categorias.tsx` | Reemplazar por Insumos.tsx |
| `src/pages/app/Indicadores.tsx` | Reemplazar por Calculadora.tsx |
| `src/pages/app/Proyecciones.tsx` | Reemplazar por Simulador.tsx |
| `src/hooks/useTransactions.ts` | Ya no se usa |
| `src/hooks/useDashboardData.ts` | Reemplazar por useCosteoData.ts |
| `src/hooks/useIndicadoresData.ts` | Ya no se usa |
| `src/hooks/useProyeccionesData.ts` | Ya no se usa |

---

## Mockup del Nuevo Dashboard

```text
+--------------------------------------------------+
|  Dashboard de Costeo                              |
|  "Tu emprendimiento: Brownies Ana"               |
+--------------------------------------------------+
|                                                   |
|  [KPI Cards - 4 columnas]                        |
|  +----------+ +----------+ +----------+ +--------+
|  | Productos| | Margen   | | Producto | | Alerta |
|  | 8        | | Promedio | | Estrella | | 2 con  |
|  |          | | 45%      | | Brownie  | | margen |
|  |          | |          | | 52%      | | bajo   |
|  +----------+ +----------+ +----------+ +--------+
|                                                   |
|  [Mis Productos - Grid de cards]                 |
|  +------------------+ +------------------+        |
|  | Brownie x6       | | Galletas x12     |        |
|  | Costo: $45       | | Costo: $38       |        |
|  | Precio: $90      | | Precio: $65      |        |
|  | Margen: 50%      | | Margen: 42%      |        |
|  +------------------+ +------------------+        |
|                                                   |
|  [Acciones rapidas]                              |
|  [+ Nuevo producto] [Calcular precio] [Simular]  |
|                                                   |
+--------------------------------------------------+
```

---

## Resultado Esperado

Cuando tus companeros vean Finanet:
- No veran graficas de ingresos vs gastos
- No veran registro de transacciones
- No veran KPIs de utilidad neta

En su lugar veran:
- Cards de productos con costos y margenes
- Una calculadora de precios
- Un simulador de escenarios
- Enfoque 100% en "cuanto me cuesta producir"

**Conclusion**: Aunque ambos proyectos son "financieros", uno es de CONTROL (registrar lo que paso) y otro es de PLANIFICACION (calcular cuanto deberia costar). Son conceptualmente diferentes y no compiten entre si.

