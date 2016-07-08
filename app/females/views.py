from django.views.generic import ListView

from females.models import Female
from females import utility


class FemaleList(ListView):
    queryset = Female.objects.all()
    context_object_name = 'female_list'
    template_name = 'female_list.html'
