from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

from django.contrib import admin
from adam import models
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('timestamp',)

admin.site.register(models.BlogPost,BlogPostAdmin)
#admin.site.register(models.BlogPost)

class UserAdmin(UserAdmin):
    list_display = ['id', 'nickname','email','ip','is_active','date_joined','last_login','is_staff','is_superuser',]
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
