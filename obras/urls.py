from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.documentation import include_docs_urls
from .views import ObraViewSet

router = DefaultRouter()
router.register(r'obras', ObraViewSet, 'obras')

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('docs/',include_docs_urls(title="Obras API"))
]
