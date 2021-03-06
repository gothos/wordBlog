from django.conf.urls import *

from django.views.generic import TemplateView, RedirectView

urlpatterns = patterns('adam.views',

(r'^$', RedirectView.as_view(url='/adam/ad/')),

url(r'^openTopic/domain/(\d+)/$', 'archive'),
(r'^create/', 'create_adampost'),
(r'^uploadImage/', 'upload_image'),
(r'^saveImage/', 'save_image'),
(r'^finishCropping/', 'finish_cropping'),
(r'^curUser/', 'cur_user'),
(r'^comment/', 'create_comment'),
(r'^removePost/', 'remove_post'),
(r'^removeComment/', 'remove_comment'),
(r'^likePost/', 'like_post'),
(r'^tos/', 'tos'),
url(r"^cbv/", TemplateView.as_view(template_name="cbv.html"),name='cbv'),
(r'^dislikePost/', 'dislike_post'),
(r'^likeComment/', 'like_comment'),
(r'^dislikeComment/', 'dislike_comment'),
(r'^giveMePosts/', 'give_me_posts'),
(r'^showComments/', 'show_comments'),
(r'^updateNumOfComments/', 'update_num_of_comments'),
(r'^checkForNotifs/','check_for_notifs'),
(r'^checkForNumOfNotifs/','check_for_num_of_notifs'),
(r'^delNotifs/','del_notifs'),
(r'^giveMeTheOne/','give_me_the_one'),
(r'^discuss/','discuss'),
(r'^ad/','ad'),
(r'^search/','search'),
(r'^admin/','admin'),
(r'^CPCs/','CPCs_'),
(r'^stat/','stat_'),
(r'^changes/','changes_'),
(r'^mainChanges/','main_changes'),
(r'^giveMeAd/','give_me_ad'),
(r'^userDetail/','user_detail'),
(r'^onlineValidateUrl/','online_validate_url'),
(r'^saveClickInfo/','save_click_info'),
(r'^showStatistics/','show_statistics'),
#(r'^fillKeywords/','fill_keywords'),
(r'^fillCampaignContent/','fill_campaign_content'),

(r'^saveDescriptionChanges/','save_description_changes'),
(r'^saveBudgetChanges/','save_budget_changes'),
(r'^saveKeywordsChanges/','save_keywords_changes'),


(r'^giveMePrice/','give_me_price'),
(r'^campaignAction/','campaign_action'),
(r'^deleteCampaign/','delete_campaign'),
(r'^createCampaign/','create_campaign'),
(r'^saveBillingInfo/','save_billing_info'),
(r'^setDefaultPic/','set_default_pic'),
url(r'^discussTopic/domain/(\d+)/comment/(\d+)/$', 'discuss_archive'),


#PRESMEROVANI PO LOGINU: 
    #zmenit django/conf/global_settings.py
        #LOGIN_REDIRECT_URL = '/adam/main/'
    #zmenit django/contrib/auth/__init__.py
        #REDIRECT_FIELD_NAME = '/adam/main/'

# login template choices.html:
    #change template dir in project settings.py and in django/conf/global_settings.py 
        #TEMPLATE_DIRS = (
        #'/home/gothos/Downloads/wordBlog2/adam/templates/', # Change this to your own directory.
    # change in registration/auth_urls.py name of template
        #urlpatterns = patterns('',
        #                   url(r'^login/$',
        #                       auth_views.login1,
        #                       {'template_name': 'choices.html'},
        #                       name='auth_login'),
    # change in django/contrib/auth/views.py
        #def login(request, template_name='choices.html',
    #change in registration registration/views.py
        #class RegistrationView(_RequestPassingFormView):
        #template_name = 'choices.html'
)






