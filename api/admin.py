from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Note, State, Profile

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'

class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline, )
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'get_slack_id')
    list_select_related = ('profile', )

    def get_slack_id(self, instance):
        return instance.profile.slack_id
    get_slack_id.short_description = 'slack_id'

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)

class NoteAdmin(admin.ModelAdmin):
    fields = ['text', 'category_tags', 'user']
    list_display = ('text', 'category_tags', 'user', 'date_created')
    list_filter = ['date_created']
    search_fields = ['text']


# Register your models here.
admin.site.register(State)
admin.site.register(Note, NoteAdmin)
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)