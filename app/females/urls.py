from django.conf.urls import url

from . import views

urlpatterns = [

    url(r'^list/?$', views.FemaleList.as_view(), name='female_list')

]
