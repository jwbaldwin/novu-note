from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateView, DetailsView, UserCreate

urlpatterns = {
    path('notes/', CreateView.as_view(), name="create"),
    path('notes/<int:pk>', DetailsView.as_view(), name="details"),
    path('login/', UserCreate.as_view(), name='account-create')
}

urlpatterns = format_suffix_patterns(urlpatterns)