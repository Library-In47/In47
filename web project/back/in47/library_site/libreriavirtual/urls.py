#URLS APP

from django.urls import path, include
from .views import LoginView, LogoutView, SignupView, ProfileView, ComprarView, DetallePedidoView, PagosView
from rest_framework import routers
from libreriavirtual import views

# Api router
router = routers.DefaultRouter()

router.register(r'customuser', views.CustomUserViewSet, basename='customuser')
router.register(r'direccion', views.DireccionViewSet, basename='direccion')
router.register(r'provincia', views.ProvinciaViewSet, basename='provincia')
router.register(r'localidad', views.LocalidadViewSet, basename='localidad')
router.register(r'carrito', views.CarritoViewSet, basename='carrito')
router.register(r'elementoscarrito', views.ElementosCarritoViewSet, basename='elementoscarrito')
router.register(r'libro', views.LibroViewSet, basename='libro')
router.register(r'idioma', views.IdiomaViewSet, basename='idioma')
router.register(r'categoria', views.CategoriaViewSet, basename='categoria')
router.register(r'editorial', views.EditorialViewSet, basename='editorial')
router.register(r'formato', views.FormatoViewSet, basename='formato')
router.register(r'autor', views.AutorViewSet, basename='autor')
# router.register(r'detallepedido', views.DetallePedidoViewSet, basename='detallepedido') 
router.register(r'pedido', views.PedidoViewSet, basename='pedido')
router.register(r'orden', views.OrdenViewSet, basename='orden')
router.register(r'estado', views.EstadoViewSet, basename='estado')
router.register(r'pago', views.PagoViewSet, basename='pago')
router.register(r'admin_provincia', views.ProvinciaAdmin, basename='admin_provincia')
router.register(r'admin_direccion', views.DireccionAdmin, basename='admin_direccion')
router.register(r'admin_localidad', views.LocalidadAdmin, basename='admin_localidad')
router.register(r'admin_libro', views.LibroAdmin, basename='admin_libro')
router.register(r'admin_idioma', views.IdiomaAdmin, basename='admin_idioma')
router.register(r'admin_categoria', views.CategoriaAdmin, basename='admin_categoria')
router.register(r'admin_editorial', views.EditorialAdmin, basename='admin_editorial')
router.register(r'admin_formato', views.FormatoAdmin, basename='admin_formato')
router.register(r'admin_autor', views.AutorAdmin, basename='admin_autor')
router.register(r'admin_detalle', views.DetallePedidoAdmin, basename='admin_detalle')
router.register(r'admin_pedido', views.PedidoAdmin, basename='admin_pedido')
router.register(r'admin_orden', views.OrdenAdmin, basename='admin_orden')
router.register(r'admin_estado', views.EstadoAdmin, basename='admin_estado')
router.register(r'admin_pago', views.PagoAdmin, basename='admin_pago')
router.register(r'admin_carrito', views.CarritoAdmin, basename='admin_carrito')
router.register(r'admin_elementoscarrito', views.ElementosCarritoAdmin, basename='admin_elementoscarrito')
#router.register(r'comprar',views.ComprarView, basename='comprar')


urlpatterns = [
    
     path('', include(router.urls)),

    # views
     path('auth/login/',
         LoginView.as_view(), name='auth_login'),

     path('auth/logout/',
         LogoutView.as_view(), name='auth_logout'),
     
     path('auth/signup/',
          SignupView.as_view(), name='auth_signup'),
     
     path('profile/',
         ProfileView.as_view(), name='user_profile'),
    
     path('comprar/',
         ComprarView.as_view(), name='comprar'),

     path('detalle_pedido/',
         DetallePedidoView.as_view(), name='detalle_pedido'),
         
     path('pagos/',
         PagosView.as_view(), name='pagos'),
        
]

