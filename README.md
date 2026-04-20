# UMO Global Dossier

Frontend inmersivo y backend serverless para el proyecto de internacionalizacion empresarial de UMO hacia Estados Unidos.

La arquitectura separa la portada corporativa de UMO del archivo de entregas:

- `/`: portada editorial de UMO con contexto empresarial, trayectoria, lineas de negocio y marco de internacionalizacion.
- `/entregas`: workspace del dossier con menu lateral izquierdo.
- `/entregas/:id`: carpeta de entrega con modulos internos, contenido reinterpretado y botones a fuentes originales.

## Desarrollo local

```bash
npm install
npm run dev
```

El servidor queda en `http://127.0.0.1:5173/`. En desarrollo, Vite tambien sirve las rutas `/api/*` con los mismos handlers usados por Vercel.

## Backend

Endpoints disponibles:

- `GET /api/health`: estado del backend.
- `GET /api/project`: resumen del proyecto, diagnostico y totales.
- `GET /api/deliveries`: listado de entregas. Acepta `?id=diagnostico` o `?tag=market`.
- `GET /api/search?q=canvas&locale=es`: busqueda sobre entregas y documentos.
- `POST /api/contact`: valida un mensaje y, si existe `CONTACT_WEBHOOK_URL`, lo reenvia a ese webhook.

## Deploy en Vercel

```bash
npm run build
vercel
```

Para produccion:

```bash
vercel --prod
```

No se necesita servidor separado. Vercel publica `dist/` como frontend estatico y despliega los archivos `api/*.ts` como Functions.
