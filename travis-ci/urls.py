from django.conf.urls import patterns, include, url
from django.contrib import admin
from scout import urls as scout_urls

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'project.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^', include(scout_urls, 'scout', scout_urls.app_name)),
)
