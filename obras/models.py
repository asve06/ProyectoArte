from django.db import models

class Obra(models.Model):
    titulo = models.CharField(max_length=255)
    fecha_creacion = models.DateField()
    autor = models.CharField(max_length=255, default='Enrique Tábara')
    dimensiones = models.CharField(max_length=255)
    categoria = models.CharField(max_length=255)
    ubicacion = models.CharField(max_length=255)
    tecnica = models.CharField(max_length=255)
    movimiento = models.CharField(max_length=255)
    estado_conservacion = models.CharField(max_length=255)
    descripcion = models.TextField()
    adicionales = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.titulo
