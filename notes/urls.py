"""
Define all url configs for the notes app
"""
from django.urls import path
from . import views

app_name = 'notes'
urlpatterns = [
    # ex: /polls/
    path('', views.index, name='index'),
    # ex: /polls/5/
    path('<int:note_id>/', views.detail, name='detail'),
]