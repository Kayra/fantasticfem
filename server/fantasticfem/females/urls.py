from django.conf.urls import url

from . import views

urlpatterns = [

    url(r'^get-random', views.getRandomFemale, name='get_random_female'),

    url(r'^get', views.getFemale, name='get_female'),

    url(r'^list', views.listFemales, name='list_females'),

    url(r'^create', views.createFemale, name='create_female'),

    url(r'^edit', views.editFemale, name='edit_female'),

    url(r'^delete', views.deleteFemale, name='delete_female'),

]
