from django.views.generic.base import TemplateView
from django.views.generic import ListView

from females.models import Female
from females import utils


class FemaleRandom(TemplateView):

    template_name = 'female_detail.html'

    def get_context_data(self, **kwargs):
        context = super(FemaleRandom, self).get_context_data(**kwargs)
        context['female'] = utils.get_random_female()
        return context


class FemaleList(ListView):
    queryset = Female.objects.all()
    context_object_name = 'female_list'
    template_name = 'female_list.html'
