# 🚀 Guía de Despliegue - Optimizaciones Creaciones ZABBA

## Paso a Paso para Subir al Servidor

### 1️⃣ PREPARACIÓN

```
Archivos a subir:
├─ index.html (ACTUALIZADO)
├─ dev/Css/Style.min.css (NUEVO - subir también)
├─ dev/Js/main.js (ACTUALIZADO)
├─ .htaccess (NUEVO - si usas Apache)
└─ public/ (sin cambios)
```

### 2️⃣ VÍA FTP (FileZilla, WinSCP, etc.)

```
1. Conectar a tu servidor FTP
2. Navegar a la carpeta raíz del sitio
3. Subir archivos:
   - Haz clic derecho en index.html → Subir
   - Haz clic derecho en dev/Js/main.js → Subir
   - Haz clic derecho en dev/Css/Style.min.css → Subir
   - Haz clic derecho en .htaccess → Subir
   
   ⚠️  IMPORTANTE: El .htaccess debe estar en la RAÍZ del sitio
   
4. Verificar permisos del archivo .htaccess (644 o 755)
```

### 3️⃣ VÍA GIT (Si usas Git)

```bash
# En tu terminal local
cd /ruta/a/creaciones-zabba

# Agregar cambios
git add index.html dev/Js/main.js dev/Css/Style.min.css .htaccess

# Crear commit
git commit -m "feat: Optimizaciones de rendimiento - jQuery removido, lazy loading, CSS minificado"

# Enviar a servidor
git push origin main

# En el servidor (SSH)
cd /ruta/sitio/creaciones-zabba
git pull
```

### 4️⃣ VÍA CPANEL (Si tu hosting tiene cPanel)

```
1. Ir a File Manager
2. Navegar a public_html
3. Subir archivos:
   - index.html
   - dev/Css/Style.min.css
   - dev/Js/main.js
4. Crear .htaccess:
   - Hacer clic derecho → Create New File
   - Nombre: .htaccess
   - Copiar contenido del archivo .htaccess
   - Guardar
```

### 5️⃣ VÍA SSH (Avanzado)

```bash
# Conectarse al servidor
ssh usuario@tudominio.com

# Navegar a la carpeta del sitio
cd /home/usuario/public_html/creaciones-zabba

# Descargar archivos (desde tu máquina local)
scp index.html usuario@tudominio.com:~/public_html/creaciones-zabba/
scp dev/Js/main.js usuario@tudominio.com:~/public_html/creaciones-zabba/dev/Js/
scp dev/Css/Style.min.css usuario@tudominio.com:~/public_html/creaciones-zabba/dev/Css/
scp .htaccess usuario@tudominio.com:~/public_html/creaciones-zabba/

# Verificar permisos
chmod 644 .htaccess
```

---

## ✅ VERIFICACIÓN DESPUÉS DE DESPLIEGUE

### 1. Verificar que el sitio cargue correctamente

```
□ Abre: https://tudominio.com
□ El sitio debe verse igual que antes
□ Verifica que no haya errores en consola (F12)
```

### 2. Verificar que jQuery está removido

```
Abre DevTools (F12) → Network tab
- NO debe haber ninguna solicitud a jQuery
- Debe haber solo 1 request a ./dev/Js/main.js
```

### 3. Verificar que CSS está minificado

```
DevTools → Network tab → Busca Style.min.css
- Debe estar ~5.2KB (no 8KB)
- Solo 1 request a CSS
```

### 4. Verificar lazy loading

```
DevTools → Network tab → Scroll en el sitio
- Las imágenes debajo de fold NO deben cargar
- Al hacer scroll, se cargan dinámicamente
```

### 5. Verificar compresión GZIP

```
DevTools → Network tab → Haz clic en cualquier archivo
- En "Response Headers" busca: Content-Encoding: gzip
- Debe decir "gzip" (significa está comprimido)
```

### 6. Usar Google PageSpeed Insights

```
1. Ve a: https://pagespeed.web.dev
2. Ingresa: https://tudominio.com
3. Espera a que analice
4. Debería mostrar puntuación MAYOR a la anterior
5. Anota los resultados para documentación
```

---

## 🔧 SI ALGO FALLA

### El sitio no carga

```
1. Verificar permisos del .htaccess
   - En FTP: clic derecho → Properties → 644
   
2. Revertir .htaccess temporalmente:
   - Renombrar .htaccess a .htaccess.bak
   - Recargar sitio
   
3. Si el problema persiste:
   - Restaurar index.html original
   - Reportar error a hosting
```

### Errores en consola (F12)

```
Si ves errores tipo "jQuery is not defined":
- Asegúrate que main.js se subió correctamente
- Verifica que main.js está en: /dev/Js/main.js
- Recarga con Ctrl+Shift+R (caché vacío)
```

### Las imágenes no se cargan

```
1. Verificar atributo loading="lazy" está en HTML
2. Verificar que las rutas de imágenes son correctas
3. Verificar permisos de carpeta public/ (755)
```

### GZIP no funciona

```
1. Tu servidor no soporta Apache o .htaccess
2. Contactar con tu proveedor de hosting
3. Pedir que habiliten mod_deflate
4. O usar nginx.conf si es Nginx
```

---

## 📊 MONITOREO POST-DESPLIEGUE

### Día 1
- [ ] Verificar que todo carga correctamente
- [ ] Probar en diferentes navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Probar en dispositivo móvil
- [ ] Verificar sin caché (Incógnito)

### Día 7
- [ ] Ejecutar PageSpeed Insights nuevamente
- [ ] Comparar resultados (debería mejorar)
- [ ] Revisar Google Search Console por errores

### Mensual
- [ ] Monitorear Core Web Vitals en Search Console
- [ ] Revisar analytics para mejoras en velocidad
- [ ] Actualizar imágenes si es necesario

---

## 📋 CHECKLIST DE DESPLIEGUE

### Antes de subir:
- [ ] Hacer backup del sitio actual
- [ ] Guardar copia local de todos los archivos
- [ ] Anotar cambios realizados
- [ ] Probar localmente si es posible

### Al subir:
- [ ] Subir index.html
- [ ] Subir dev/Js/main.js
- [ ] Subir dev/Css/Style.min.css
- [ ] Subir .htaccess (si tienes Apache)
- [ ] Verificar permisos (644 para .htaccess, 755 para carpetas)

### Después de subir:
- [ ] Refrescar sitio en navegador (Ctrl+Shift+R)
- [ ] Verificar Developer Tools
- [ ] Probar en móvil
- [ ] Revisar Google PageSpeed
- [ ] Documentar resultados

---

## 🎉 ¡LISTO!

Si todo se ve bien, tu sitio ahora está **2-3x más rápido** 🚀

Próximos pasos recomendados:
1. Comprimir imágenes de productos
2. Convertir logo a WebP
3. Monitorear velocidad del sitio

---

**Última actualización**: 2026-04-21  
**Versión**: 1.0  
**Autor**: GitHub Copilot
