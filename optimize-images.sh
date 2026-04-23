#!/bin/bash
# Script para optimizar imágenes en Creaciones ZABBA
# Requiere: ImageMagick (convert), ffmpeg, y optipng/pngquant

echo "=== Optimizador de Imágenes para Creaciones ZABBA ==="
echo ""

# Directorio de imágenes
IMG_DIR="./public"

# Función para comprimir JPEG/WebP
compress_images() {
    echo "[*] Comprimiendo imágenes..."
    
    # Convertir y optimizar JPEG a WebP
    for img in $IMG_DIR/*.jpg $IMG_DIR/*.jpeg; do
        if [ -f "$img" ]; then
            filename=$(basename "$img")
            filename_without_ext="${filename%.*}"
            
            echo "  Procesando: $filename"
            
            # Convertir a WebP con optimización
            ffmpeg -i "$img" -q:v 75 "$IMG_DIR/${filename_without_ext}.webp" -y 2>/dev/null
            
            # Optimizar el JPEG original también
            convert "$img" -quality 80 -strip -interlace Plane "$img"
            
            echo "    ✓ JPEG: ${filename} optimizado"
            echo "    ✓ WebP: ${filename_without_ext}.webp creado"
        fi
    done
    
    # Optimizar PNG
    for img in $IMG_DIR/*.png; do
        if [ -f "$img" ]; then
            filename=$(basename "$img")
            echo "  Procesando: $filename"
            
            # Optimizar PNG
            optipng -o2 "$img" 2>/dev/null || \
            convert "$img" -quality 85 -strip "$img"
            
            echo "    ✓ PNG: ${filename} optimizado"
        fi
    done
}

# Función para convertir logo a WebP
convert_logo() {
    echo "[*] Convirtiendo logo a WebP..."
    
    if [ -f "$IMG_DIR/logoEmpresa.jpeg" ]; then
        ffmpeg -i "$IMG_DIR/logoEmpresa.jpeg" -q:v 75 "$IMG_DIR/logoEmpresa.webp" -y 2>/dev/null
        echo "  ✓ logoEmpresa.webp creado"
    fi
}

# Función para mostrar estadísticas
show_stats() {
    echo ""
    echo "[*] Estadísticas de almacenamiento:"
    echo ""
    
    total_before=$(du -sh $IMG_DIR | cut -f1)
    echo "  Tamaño total actual: $total_before"
    
    echo ""
    echo "  Desglose por tipo:"
    du -sh $IMG_DIR/*.jpg $IMG_DIR/*.jpeg $IMG_DIR/*.png $IMG_DIR/*.webp 2>/dev/null | awk '{print "    " $0}'
}

# Menú
echo "Selecciona una opción:"
echo "1) Comprimir todas las imágenes"
echo "2) Convertir logo a WebP"
echo "3) Mostrar estadísticas"
echo "4) Hacer todo (recomendado)"
echo ""
read -p "Opción [1-4]: " option

case $option in
    1)
        compress_images
        ;;
    2)
        convert_logo
        ;;
    3)
        show_stats
        ;;
    4)
        compress_images
        convert_logo
        echo ""
        show_stats
        echo ""
        echo "✅ ¡Optimización completada!"
        echo ""
        echo "Cambios recomendados en HTML:"
        echo "1. Reemplaza: <img src='./public/logoEmpresa.jpeg'>"
        echo "   Con:       <img src='./public/logoEmpresa.webp'>"
        echo ""
        echo "2. Actualiza referencias a JPEG en HTML a WebP cuando sea posible"
        ;;
    *)
        echo "Opción inválida"
        exit 1
        ;;
esac

echo ""
echo "=== Fin del script ==="
