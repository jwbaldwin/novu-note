"""
Define all url configs for the notes app
"""
from django.urls import path
from . import views

app_name = 'notes'
urlpatterns = [
    # ex: /notes/
    path('', views.IndexView.as_view(), name='index'),
    # ex: /notes/5/
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
]