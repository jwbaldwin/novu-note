from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateView, DetailsView, Events, Message_Actions

urlpatterns = {
    path('notes/', CreateView.as_view(), name="create"),
    path('notes/<int:pk>', DetailsView.as_view(), name="details"),
    path('events/', Events.as_view(), name="events"),
    path('message_actions/', Message_Actions.as_view(), name="message_actions"),
}

urlpatterns = format_suffix_patterns(urlpatterns)