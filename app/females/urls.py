from django.conf.urls import url

from females import views

urlpatterns = [

    url(r'^', views.FemaleRandom.as_view(), name='female_random'),
    url(r'^list/?$', views.FemaleList.as_view(), name='female_list'),

]
