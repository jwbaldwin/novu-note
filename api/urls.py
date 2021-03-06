from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateView, DetailsView

urlpatterns = {
    path('notes/', CreateView.as_view(), name="create"),
    path('notes/<int:pk>', DetailsView.as_view(), name="details")
}

urlpatterns = format_suffix_patterns(urlpatterns)