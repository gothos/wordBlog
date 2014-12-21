# -*- coding: utf-8 -*-
from django.db import models
from django import forms
from django.forms import ModelForm, Textarea, TextInput
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from djangoyearlessdate.models import YearMonthField





class BlogTopic(models.Model):
    topicName = models.TextField()
    timestamp = models.DateTimeField()
    idPerson = models.ForeignKey(User,null=True)
    description = models.TextField()
    class Meta:
        ordering = ('timestamp',)
    def get_absolute_url(self):

        return "/app/adam/openTopic/domain/%i/" % self.id


class BlogTopicForm(forms.ModelForm):
    class Meta:
        model = BlogTopic
        exclude = ('timestamp','idPerson')

class BlogPost(models.Model):
    idPerson = models.ForeignKey(User)
    body = models.TextField()
    timestamp = models.DateTimeField()
    idTopic = models.ForeignKey(BlogTopic)
    valid = models.IntegerField(max_length=1,null=True)
    character = models.IntegerField(max_length=1,null=False)
    
    class Meta:
        ordering = ('-timestamp',)
        
    
class BlogPostForm(forms.ModelForm):
    class Meta:
        model = BlogPost
        exclude = ('idTopic','timestamp','idPerson','valid','character')
        widgets = {
            'body': Textarea(attrs={'class':'tap','maxlength':'500'}),}


class BlogComment(models.Model):
    idPerson = models.ForeignKey(User)
    idPost = models.ForeignKey(BlogPost)
    timestampCom = models.DateTimeField()
    comment = models.TextField()
    idParentComment = models.IntegerField(max_length=150,null=True)
    valid = models.IntegerField(max_length=1,null=True)
    

    class Meta:
        ordering = ('-timestampCom',)

class BlogCommentForm(forms.ModelForm):
    class Meta:
        model = BlogComment
        exclude = ('idParentComment','idPost','timestampCom','idPerson','valid')
        widgets = {
            'comment': Textarea(attrs={'maxlength':'500','class':'tac'}),}


class Like(models.Model):
    idPost = models.ForeignKey(BlogPost,null = True)
    idPerson = models.ForeignKey(User)
    timestamp = models.DateTimeField()
    valid = models.IntegerField(max_length=1,null=True)
    class Meta:
        unique_together=('idPost','idPerson')

class Billing(models.Model):
    idPerson = models.ForeignKey(User)
    companyName = models.CharField(unique=False,null=False,max_length=128,blank=False)
    companyStreet = models.CharField(unique=False,null=True,max_length=128,blank=False)
    companyTown = models.CharField(unique=False,null=True,max_length=128,blank=False)
    companyZIP = models.CharField(unique=False,null=True,max_length=6,blank=True)
    companyPhone = models.CharField(unique=False,null=True,max_length=16,blank=False)
    companyEmail = models.EmailField(max_length=255,null=True,blank=False)
    companyIC = models.IntegerField(max_length=8,null=True,blank=True)
    companyDIC = models.BigIntegerField(max_length=10,null=True,blank=True)

class BillingForm(forms.ModelForm):
    class Meta:
        model = Billing
        exclude = ('idPerson')


    


class Campaign(models.Model):
    name = models.CharField(null = True,unique=True,max_length=35,blank=True)
    status = models.IntegerField(max_length=1,null=True,blank=True)
    typeOfCampaign = models.IntegerField(max_length=1,null=True,blank=True)
    budget = models.FloatField(max_length=6,null=True,blank=True)
    idPerson = models.ForeignKey(User)
    idCampaign = models.CharField(null = True,unique=True,max_length=32,blank=True)
    timestamp = models.DateTimeField()
    title = models.CharField(null = True,max_length=35,blank=True)
    description1 = models.CharField(null = True,max_length=70,blank=True)
    description2 = models.CharField(null = True,max_length=70,blank=True)
    url1 = models.CharField(max_length = 35,blank=True)
    url2 = models.CharField(max_length = 1024,blank=True)

class ViewInfo(models.Model):

    idCampaign = models.ForeignKey(Campaign,to_field='idCampaign')
    ip = models.IPAddressField(null=True)
    #timestamp = models.DateTimeField()
    date = models.DateField()



class ClickInfo(models.Model):

    idCampaign = models.ForeignKey(Campaign,to_field='idCampaign')
    ip = models.IPAddressField(null=True)
    #timestamp = models.DateTimeField()
    date = models.DateField()
    #firstPrice = models.FloatField(null = False,blank=True)

class Bills(models.Model):
    idPerson = models.ForeignKey(User)
    status = models.IntegerField(max_length=1,null=True,blank=True)
    period = YearMonthField(null=True, blank=True,max_length=10,)
    totalCost = models.FloatField(null=True, blank=True)
    varSymbol = models.CharField(null = True,max_length=10,blank=True)


class DeletedCampaigns(models.Model):
    name = models.CharField(null = False,max_length=35,blank=False)
    typeOfCampaign = models.IntegerField(max_length=1,null=False,blank=False)
    budget = models.FloatField(null=False,blank=False)
    idPerson = models.ForeignKey(User)
    
    idCampaign = models.CharField(null = False,unique=False,max_length=32,blank=True)
    timestampOfCreation = models.DateTimeField(blank=True)
    timestampOfDeletion = models.DateTimeField(blank=True)
    title = models.CharField(null = False,max_length=35,blank=False)
    description1 = models.CharField(null = False,max_length=35,blank=True)
    description2 = models.CharField(null = False,max_length=35,blank=True)
    url1 = models.CharField(max_length = 35,blank=False)
    url2 = models.CharField(max_length = 1024,blank=True)

class CPCs(models.Model):
    idCampaign = models.ForeignKey(Campaign,to_field='idCampaign')
    avgCPC = models.FloatField(null=True,blank=True)
    date = models.DateField()

class CampaignsCosts(models.Model):
    idCampaign = models.ForeignKey(Campaign,to_field='idCampaign')
    totalCost = models.FloatField(null=True,blank=True)
    period = YearMonthField(null=True, blank=True,max_length=10,)

class CampaignPeriods(models.Model):
    idCampaign = models.ForeignKey(Campaign,to_field='idCampaign')
    timestamp = models.DateTimeField()
    flag = models.IntegerField(max_length=1,null=True)

#class EditCampaignForm(forms.Form):


class EditCampaignForm(forms.Form):
    from django import forms
    title = forms.CharField(
        max_length=35,
        widget = forms.TextInput(attrs={'maxlength':'35','id':'adTitle'},)
    )
    description1 = forms.CharField(
        max_length=35,
        widget = forms.TextInput(attrs={'maxlength':'35','id':'adDescription1'},)
    )
    description2 = forms.CharField(
        max_length=35,
        widget = forms.TextInput(attrs={'maxlength':'35','id':'adDescription2'},)
    )
    
    url1 = forms.CharField(
        max_length=35,
        widget = forms.TextInput(attrs={'maxlength':'35','id':'adUrl1'},)
    )
    url2 = forms.CharField(
        max_length=1024,
        widget = forms.TextInput(attrs={'maxlength':'1024','id':'adUrl2'},)
    )

class CampaignForm(forms.ModelForm):
    class Meta:
        model = Campaign
        widgets = {
            'name': TextInput(attrs={'maxlength':'35','id':'adName'}),
            'budget': TextInput(attrs={'maxlength':'6','id':'adBudget'}),
            'title': TextInput(attrs={'maxlength':'35','id':'adTitle'}),
            'description1': TextInput(attrs={'maxlength':'35','id':'adDescription1'}),
            'description2': TextInput(attrs={'maxlength':'35','id':'adDescription2'}),
            'url1': TextInput(attrs={'maxlength':'35','id':'adUrl1'}),
            'url2': TextInput(attrs={'maxlength':'1024','id':'adUrl2'}),
        }
        
        exclude = ('idPerson','timestamp','typeOfCampaign','status','idCampaign')    

class Words(models.Model):
    idWord = models.CharField(null = False,unique=True,max_length=40,blank=False)
    name = models.CharField(null = False,unique=True,max_length=255,blank=False)
    CPM = models.FloatField(null = False,blank=True)
    CPC = models.FloatField(null = False,blank=True)
    class Meta:
        unique_together=('idWord','name')
    


class CampaignWords(models.Model):
    idCampaign = models.ForeignKey(Campaign,to_field='idCampaign')
    idWord = models.ForeignKey(Words,to_field='idWord')
    class Meta:
        unique_together=('idWord','idCampaign')

class DeletedCampaignWords(models.Model):
    #idCampaign = models.ForeignKey(Campaign,to_field='idCampaign')
    idCampaign = models.CharField(unique=False,null=True,max_length=32,blank=True)
    idWord = models.ForeignKey(Words,to_field='idWord')
    timestampOfDeletion = models.DateTimeField(blank=True)




class Statistics(models.Model):
    idWord = models.ForeignKey(Words,to_field='idWord')
    idCampaign = models.ForeignKey(Campaign,to_field='idCampaign')
    date = models.DateField()
    countOfClicks = models.IntegerField(max_length=40,null=True,blank=False)
    countOfViews = models.IntegerField(max_length=40,null=True,blank=False)
    uniqueCountOfClicks = models.IntegerField(max_length=40,null=True,blank=False)
    uniqueCountOfViews = models.IntegerField(max_length=40,null=True,blank=False)
    #class Meta:
    #    unique_together=('idWord','idCampaign','date')

class PriceCalculation(models.Model):
    idCampaign = models.ForeignKey(Campaign,to_field='idCampaign')
    Sum = models.FloatField(null = False,blank=True)
    BillingPeriod = models.CharField(null = False,max_length=6,blank=True)

class LikeTopic(models.Model):
    idTopic = models.ForeignKey(BlogTopic,null = True)
    idPerson = models.ForeignKey(User)
    timestamp = models.DateTimeField()
    class Meta:
        unique_together=('idTopic','idPerson')
        
class LikeComment(models.Model):
    idComment = models.ForeignKey(BlogComment,null = True)
    idPerson = models.ForeignKey(User)
    timestamp = models.DateTimeField()
    valid = models.IntegerField(max_length=1,null=True)
    class Meta:
        unique_together=('idComment','idPerson','valid')



class ImageUploadForm(forms.Form):
    """Image upload form."""
    picture = forms.ImageField(widget=forms.FileInput())


class isHumanForm(forms.Form):
    isHuman = forms.CharField(max_length=1,widget=forms.TextInput({'maxlength':1}),required = False)


class Notifications(models.Model):
    idPerson1 = models.ForeignKey(User,related_name='person1')
    idPerson2 = models.ForeignKey(User,related_name='person2')
    idComment = models.ForeignKey(BlogComment,null = True)


class CampChangesLog(models.Model):
    idCampaign = models.ForeignKey(Campaign,to_field='idCampaign')
    numOfOperation = models.IntegerField(max_length=1,null=True)
    originalValue = models.CharField(unique=False,null=True,max_length=255,blank=True)
    timestamp = models.DateTimeField()

class Log(models.Model):
    idPerson = models.ForeignKey(User,null=True)
    idCampaign = models.CharField(unique=False,null=True,max_length=32,blank=True)
    #idCampaign = models.ForeignKey(Campaign,to_field='idCampaign')
    numOfOperation = models.IntegerField(max_length=1,null=True)
    name = models.CharField(unique=False,null=True,max_length=35,blank=True)
    timestamp = models.DateTimeField()

class CampWordsChangesLog(models.Model):
    idCampaign = models.ForeignKey(Campaign,to_field='idCampaign')
    numOfOperation = models.IntegerField(max_length=2,null=True)
    idWord = models.ForeignKey(Words,to_field='idWord')
    timestamp = models.DateTimeField()

