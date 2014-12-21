#from __future__ import division
from django.shortcuts import render_to_response
from datetime import datetime
from django.template import RequestContext
from adam.models import BlogPost, BlogPostForm,BlogComment,BlogCommentForm, BlogTopic, Like, LikeComment, BlogTopicForm, EditCampaignForm, LikeTopic,ImageUploadForm,isHumanForm,Notifications,Campaign,DeletedCampaigns, CampaignForm,Billing,BillingForm,Words,CampaignWords,Statistics,CampaignPeriods,ClickInfo,Bills,ViewInfo,DeletedCampaignWords,CPCs,CampWordsChangesLog,CampChangesLog,Log
from django.contrib.auth.models import User
from django.http import HttpResponse
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.debug import sensitive_post_parameters
from django.contrib.auth.decorators import login_required
from django.db.models import Sum
import time
from django.contrib.admin.views.decorators import staff_member_required


@login_required()
def user_detail(request):
    if request.method == "POST" and request.is_ajax():
        userId = request.POST.get('userId')
        campaigns = Campaign.objects.filter(idPerson=userId).order_by('-timestamp')
        bills = Bills.objects.filter(idPerson=userId).order_by('-period')
        
        
        
        
        dic = {}
        dicken = {}
        billy = []
        for i in campaigns:
            from datetime import timedelta
            param = 0
            a = CampaignPeriods.objects.filter(idCampaign=i.idCampaign)
            indexLast = len(a) - 1
            if len(a) > 1:
                timeLength = timedelta()
                for k in a:
                    if k.flag == 0:
                        print('car',k.id)
                        first = k.timestamp
                        for index, item in enumerate(a):
                            if item == k:
                                ind = index
                        ind = ind - 1
                        second = a[ind].timestamp
                        timePeriod = first - second
                        timeLength = timeLength + timePeriod
                            
                if a[indexLast].flag == 1:
                    first = datetime.now()
                    second = a[indexLast].timestamp
                    timePeriod = first - second
                    timeLength = timeLength + timePeriod
                timeLength = timeLength.days
            if len(a) == 1:
                second = a[0].timestamp
                first = datetime.now()
                timeLength = (first - second).days
            if len(a) == 0:
                timeLength = '-'
            i.timePeriod = timeLength
            
            dicken[i.idCampaign] = {'name':i.name,'status':i.status,'timePeriod':i.timePeriod,'timestamp':i.timestamp}
        import collections
        dicken = collections.OrderedDict(sorted(dicken.items(), key=lambda t: t[1]['timestamp'],reverse=True))
        for i in dicken.keys():
            del dicken[i]['timestamp'] 
            
            
            
        dic['campaigns'] = dicken
        print('dicken',dicken)
        if len(bills) == 0:
            dic['bills'] = 0
        else:
            for i in bills:
                if i.varSymbol == None:
                    varSymbol = 0
                else:
                    varSymbol = i.varSymbol
                dickey = {'id':i.pk,'status':i.status,'period':i.period,'totalCost':i.totalCost,'varSymbol':varSymbol}
                billy.append(dickey)
            
            dic['bills'] = billy
        
        billingInfo = Billing.objects.filter(idPerson=request.user.id).get()
        d = {'companyName':billingInfo.companyName,'companyStreet':billingInfo.companyStreet,'companyTown':billingInfo.companyTown,'companyZIP':billingInfo.companyZIP,'companyPhone':billingInfo.companyPhone,'companyEmail':billingInfo.companyEmail,'companyIC':billingInfo.companyIC,'companyDIC':billingInfo.companyDIC}
        dic['billingInfo'] = d
        

        M = []        
        
        L = Log.objects.filter(idPerson = userId).order_by('-timestamp')
        if len(L) == 0:
            dic['mainChanges'] = 0
        else:
            newL = L[:15]
            last = (newL[0].timestamp.date())
            yearTo = str(last)[:4]
            monthTo = str(last)[5:7]
            dayTo = str(last)[8:10]   
            first =  newL[len(newL)-1].timestamp.date()
            yearFrom = str(first)[:4]
            monthFrom = str(first)[5:7]
            dayFrom = str(first)[8:10]
            dic['mainChangesPeriodsExtent'] = {'yearTo':yearTo,'monthTo':monthTo,'dayTo':dayTo,'yearFrom':yearFrom,'monthFrom':monthFrom,'dayFrom':dayFrom}
            
            for n in L:
                if n.timestamp.date() >= first and n.timestamp.date() <= last:
                    original = str(n.idCampaign) + ' ( '+str(n.name)+' ) '
                    dicko = {'timestamp':n.timestamp.date(),'numOfOperation':n.numOfOperation,'original':original}
                    
                    M.append(dicko) 
            dic['mainChanges'] = M
        
        return HttpResponse(json.dumps(dic,cls=DjangoJSONEncoder))
        

@staff_member_required
@login_required()
def admin(request):
    L = []
    users = User.objects.all()
    for i in users:
        campaigns = Campaign.objects.filter(idPerson=i)
        if len(campaigns) > 0:
            numOfCampaigns = len(campaigns)
            numOfActiveCampaigns = 0
            numOfPausedCampaigns = 0
            for k in campaigns:
                if k.status == 2:
                    numOfActiveCampaigns = numOfActiveCampaigns + 1    
                if k.status == 3:
                    numOfPausedCampaigns = numOfPausedCampaigns + 1
            numOfActiveCampaigns = numOfActiveCampaigns
            numOfPausedCampaigns = numOfPausedCampaigns
            dicko = {'id':i.id,'nickname':i.nickname,'numOfCampaigns': len(campaigns),'numOfActiveCampaigns':numOfActiveCampaigns,'numOfPausedCampaigns': numOfPausedCampaigns }
            L.append(dicko)
    #for i in L:
        
        
    return render_to_response('admin.html',{'users':L},RequestContext(request))



@login_required()
def save_budget_changes(request):
    if request.method == "POST" and request.is_ajax():
        idCampaign = request.POST.get('idCampaign')
        budget = int(request.POST.get('budget'))
        campaign = Campaign.objects.get(idCampaign=idCampaign)
        timestamp = datetime.now()
        if campaign.budget != budget:
            b = CampChangesLog(idCampaign = campaign,timestamp = timestamp, numOfOperation = 3,originalValue = campaign.budget)
            b.save()
        
        campaign.budget = budget
        campaign.save()
        return HttpResponse(1)
    return HttpResponse(0)



@login_required()
def show_statistics(request):
    if request.method == "POST" and request.is_ajax():
        idWord = request.POST.get('idWord')
        idCampaign = request.POST.get('idCampaign')
        wordObj = Words.objects.get(idWord = idWord)
        campaignObj = Campaign.objects.get(idCampaign = idCampaign)
        
        dic = {}
        
        allObj = Statistics.objects.filter(idWord = wordObj,idCampaign = campaignObj).order_by('-date')
        
        if len(allObj) == 0:
            return HttpResponse(0)
        L = allObj[:15]
        last = L[0]
        yearTo = str(last.date)[:4]
        monthTo = str(last.date)[5:7]
        dayTo = str(last.date)[8:10]
        
        first =  L[len(L)-1]
        yearFrom = str(first.date)[:4]
        monthFrom = str(first.date)[5:7]
        dayFrom = str(first.date)[8:10]

        dic['wordsPeriodsExtent'] = {'yearTo':yearTo,'monthTo':monthTo,'dayTo':dayTo,'yearFrom':yearFrom,'monthFrom':monthFrom,'dayFrom':dayFrom}
        K = []
        for k in allObj:

            b = k.uniqueCountOfClicks
            
            m = {'date':k.date,'views':k.uniqueCountOfViews,'clicks':b}

        
            K.append(m)
            

        

        dic['statistics'] = K


        return HttpResponse(json.dumps(dic,cls=DjangoJSONEncoder))

@login_required()
def CPCs_(request):
    if request.method == "POST" and request.is_ajax():
        dateFrom = int(request.POST.get('dateFrom'))
        dateTo = int(request.POST.get('dateTo'))
        idCampaign = request.POST.get('idCampaign')
        from datetime import datetime
        print('AB',dateFrom,dateTo,idCampaign)
        dateFrom = datetime.fromtimestamp(dateFrom/1000.0)
        dateTo = datetime.fromtimestamp(dateTo/1000.0)
        
        campaignObj = Campaign.objects.get(idCampaign = idCampaign)
        a = CPCs.objects.filter(idCampaign=campaignObj).order_by('-date')
        K = []
        for i in a:
            if i.date >= dateFrom.date() and i.date <= dateTo.date():
                h = Statistics.objects.filter(idCampaign = campaignObj,date=i.date).aggregate(Sum('uniqueCountOfClicks'))
                g = Statistics.objects.filter(idCampaign = campaignObj,date=i.date).aggregate(Sum('uniqueCountOfViews'))
                avgCPC = "{0:.2f}".format(i.avgCPC)       
                m = {'date':i.date,'avgCPC':avgCPC,'clicks':h['uniqueCountOfClicks__sum'],'views':g['uniqueCountOfViews__sum']}
                K.append(m)
        if len(K) == 0:
            return HttpResponse(0)

        return HttpResponse(json.dumps(K,cls=DjangoJSONEncoder))


@login_required()
def stat_(request):
    if request.method == "POST" and request.is_ajax():
        dateFrom = int(request.POST.get('dateFrom'))
        dateTo = int(request.POST.get('dateTo'))
        
        idCampaign = request.POST.get('idCampaign')
        
        idWord = request.POST.get('idWord')
        
        from datetime import datetime
        print('idC',idCampaign)
        dateFrom = datetime.fromtimestamp(dateFrom/1000.0)
        dateTo = datetime.fromtimestamp(dateTo/1000.0)
        wordObj = Words.objects.get(idWord = idWord)
        campaignObj = Campaign.objects.get(idCampaign = idCampaign)
        a = Statistics.objects.filter(idWord = wordObj,idCampaign = campaignObj).order_by('-date')
        K = []
        dickey = {} 
        for i in a:
            if i.date >= dateFrom.date() and i.date <= dateTo.date():
                b = i.uniqueCountOfClicks
                dickey = {'date': i.date,'views':i.uniqueCountOfViews,'clicks':b}
                K.append(dickey)
        if len(K) == 0:
                return HttpResponse(0)
        return HttpResponse(json.dumps(K,cls=DjangoJSONEncoder))


@login_required()
def main_changes(request):
    if request.method == "POST" and request.is_ajax():
        dateFrom = int(request.POST.get('dateFrom'))
        dateTo = int(request.POST.get('dateTo'))
        userId = request.POST.get('userId')
        print('idCampaign',userId,dateFrom,dateTo)
        dateFrom = datetime.fromtimestamp(dateFrom/1000.0)
        dateTo = datetime.fromtimestamp(dateTo/1000.0)
        a = Log.objects.filter(idPerson = userId).order_by('-timestamp')
        if len(a) == 0:
            return HttpResponse(0)
        else:
            M = []
            for n in a:
                if n.timestamp.date() >= dateFrom.date() and n.timestamp.date() <= dateTo.date():
                    original = str(n.idCampaign) + ' ( '+str(n.name)+' ) '
                    dicko = {'timestamp':n.timestamp.date(),'numOfOperation':n.numOfOperation,'original':original}
                    M.append(dicko)
            if len(M) == 0:
                return HttpResponse(0)
            return HttpResponse(json.dumps(M,cls=DjangoJSONEncoder))

@login_required()
def changes_(request):
    if request.method == "POST" and request.is_ajax():
        dateFrom = int(request.POST.get('dateFrom'))
        dateTo = int(request.POST.get('dateTo'))
        
        idCampaign = request.POST.get('idCampaign')
        
        #idWord = request.POST.get('idWord')
        
        from datetime import datetime
        print('idC',idCampaign)
        dateFrom = datetime.fromtimestamp(dateFrom/1000.0)
        dateTo = datetime.fromtimestamp(dateTo/1000.0)
        #wordObj = Words.objects.get(idWord = idWord)
        campaignObj = Campaign.objects.get(idCampaign = idCampaign)
        #a = Statistics.objects.filter(idWord = wordObj,idCampaign = campaignObj).order_by('-date')
        
        a = CampChangesLog.objects.filter(idCampaign = campaignObj)
        b = CampWordsChangesLog.objects.filter(idCampaign = campaignObj)
        if len(a) and len(b) == 0:
            return HttpResponse(0)
        else:
            M = []
            import itertools
            L = itertools.chain(a, b)
            import operator 
            L = sorted(L, key=operator.attrgetter('timestamp'),reverse = True)
            newL = L
            for n in newL:
                if n.timestamp.date() >= dateFrom.date() and n.timestamp.date() <= dateTo.date():
                    dicko = {'timestamp':n.timestamp.date(),'numOfOperation':n.numOfOperation}
                    if hasattr(n,'idWord'):
                        dicko['original'] = n.idWord.name
                    if hasattr(n,'originalValue'):
                        if n.originalValue == '1':
                            dicko['original'] = 'inactive'
                        elif n.originalValue == '2':
                            dicko['original'] = 'running'
                        elif n.originalValue == '3':
                            dicko['original'] = 'stopped'
                        else:
                            dicko['original'] = n.originalValue
                    M.append(dicko)
            if len(M) == 0:
                return HttpResponse(0)
            #dic['changes'] = M

            return HttpResponse(json.dumps(M,cls=DjangoJSONEncoder))






@login_required()
def save_click_info(request):
    
    idCampaign = request.POST.get('idCampaign')
    idWord = request.POST.get('idWord')
    keyword = Words.objects.get(idWord = idWord)
    date = time.strftime("%Y-%m-%d")
    print('idCa',idCampaign)
    
    campaignObj = Campaign.objects.get(idCampaign = idCampaign)
    from ipware.ip import get_ip
    user_ip = get_ip(request)
    try:
        ClickInfo.objects.get(idCampaign = campaignObj,date=date,ip = user_ip)
        model = Statistics.objects.get(idWord=keyword,idCampaign = campaignObj,date=date)
        model.countOfClicks = model.countOfClicks + 1
        model.save()
    except:
        model = ClickInfo(idCampaign = campaignObj,date=date,ip = user_ip)
        model.save()
        model = Statistics.objects.get(idWord=keyword,idCampaign = campaignObj,date=date)
        model.uniqueCountOfClicks = model.uniqueCountOfClicks + 1
        model.countOfClicks = model.countOfClicks + 1
        model.save()

    return HttpResponse('ok')


@login_required()
def search(request):
    return render_to_response('search.html',{},RequestContext(request))


@login_required()
def give_me_ad(request):
    if request.method == "POST" and request.is_ajax():
        searchString = request.POST.get('searchString')
        try:
            keyword = Words.objects.get(name = searchString)
        except:
            return HttpResponse(0)
        #print('keyw',keyword)
        #keyword = keyword[0]
        
        campaigns = CampaignWords.objects.filter(idWord = keyword.idWord)
        dic = {'idWord':keyword.idWord}
        print('lee',len(campaigns))
        L = []
        for camp in campaigns:
            dicken = {}
            try:
                campaignObj = Campaign.objects.get(idCampaign = camp.idCampaign_id,status = 2)
                
                dicken['adType'] = campaignObj.typeOfCampaign
                dicken['idCampaign'] = campaignObj.idCampaign
                dicken['title'] = campaignObj.title
                dicken['description1'] = campaignObj.description1
                dicken['description2'] = campaignObj.description2
                dicken['url1'] = campaignObj.url1
                dicken['url2'] = campaignObj.url2
                date = time.strftime("%Y-%m-%d")
                #'''
                
                from ipware.ip import get_ip
                user_ip = get_ip(request)
                
                
                try:
                #a = ClickInfo.objects.filter(idCampaign = campaignObj,date=date,ip = user_ip)
                    ViewInfo.objects.get(idCampaign = campaignObj,date=date,ip = user_ip)
                    model = Statistics.objects.get(idWord=keyword,idCampaign = campaignObj,date=date)
                    model.countOfViews = model.countOfViews + 1
                    model.save()
                except:
                
                #if len(a) == 0:
                    model = ViewInfo(idCampaign = campaignObj,date=date,ip = user_ip)
                    model.save()
                    
                    
                    try:
                        model = Statistics.objects.get(idWord=keyword,idCampaign = campaignObj,date=date)
                        model.uniqueCountOfViews = model.uniqueCountOfViews + 1
                        model.countOfViews = model.countOfViews + 1
                        model.save()
                    except:
                        model = Statistics(idWord=keyword,idCampaign = campaignObj,date=date,uniqueCountOfViews = 1,uniqueCountOfClicks = 0,countOfClicks = 0,countOfViews = 1)
                        model.save()
                    
                    
                    
                #'''
                
                
                L.append(dicken)            
            except Campaign.DoesNotExist:
                campaignObj = None
            
        if len(L) == 0:
            dic['ads'] = 0
            
        else:
            dic['ads'] = L
        return HttpResponse(json.dumps(dic,cls=DjangoJSONEncoder))



@login_required()
def save_keywords_changes(request):
    if request.method == "POST" and request.is_ajax():
        idCampaign = request.POST.get('idCampaign')
        campaign = Campaign.objects.get(idCampaign=idCampaign)
        listOfIDs = request.POST.get('keywordIDs')
        listOfIDs = map(str, listOfIDs.split(","))
        campaignObj = Campaign.objects.get(pk=campaign.pk)
        timestamp = datetime.now()
        print('listOd',listOfIDs)
        print('lenLL',len(listOfIDs))
        dic = {'new':[],'old':[]}
        if listOfIDs[0] != '':
            for i in listOfIDs:
                
                wordObj = Words.objects.get(idWord = i)
                
                obj = CampaignWords.objects.filter(idCampaign = campaignObj,idWord = wordObj)
                if len(obj) == 1:
                    continue
                if len(obj) == 0:
                    a = CampaignWords(idCampaign = campaignObj,idWord = wordObj)
                    dic['new'].append({'idWord':i,'name':wordObj.name})
                    a.save()
                    b = CampWordsChangesLog(idCampaign = campaignObj,idWord = wordObj,timestamp = timestamp, numOfOperation = 1)
                    b.save()

        K = []
        M = CampaignWords.objects.filter(idCampaign=campaignObj)
        print('M',len(M))
        
        for i in M:
            K.append(i.idWord_id)
        
        timestampOfDeletion = datetime.now()
        
        
        for i in K:
            if i not in listOfIDs:
                wordObj = Words.objects.get(idWord = i)
                newModel = DeletedCampaignWords(idCampaign = campaignObj.idCampaign,idWord = wordObj,timestampOfDeletion=timestampOfDeletion)
                dic['old'].append(i)
                newModel.save()
                b = CampWordsChangesLog(idCampaign = campaignObj,idWord = wordObj,timestamp = timestampOfDeletion, numOfOperation = 2)
                b.save()
                CampaignWords.objects.filter(idCampaign = campaignObj,idWord = wordObj).delete()
        return HttpResponse(json.dumps(dic,cls=DjangoJSONEncoder))
        
        



@login_required()
def save_description_changes(request):
    print('hhuaw')
    if request.method == "POST" and request.is_ajax():
        idCampaign = request.POST.get('idCampaign')
        print('idCampaign',idCampaign)
        campaign = Campaign.objects.get(idCampaign=idCampaign)
        #campaignObj = Campaign.objects.get(pk=campaign.pk)
        timestamp = datetime.now()
        form = EditCampaignForm(request.POST)
        if form.is_valid():
            
                       
            title=form.cleaned_data['title']
            description1=form.cleaned_data['description1']
            description2=form.cleaned_data['description2']
            url1=form.cleaned_data['url1']
            url2=form.cleaned_data['url2']
            print('udaje',title)
            print('pureD1',description1,description1)
            if campaign.title != title:
                b = CampChangesLog(idCampaign = campaign,timestamp = timestamp, numOfOperation = 4,originalValue = campaign.title)
                b.save()
            
            
            campaign.title=title
            print('desc1',campaign.description1)
            print('pureD1',description1)
            if campaign.description1 != description1:
                b = CampChangesLog(idCampaign = campaign,timestamp = timestamp, numOfOperation = 5,originalValue = campaign.description1)
                b.save()
            
            campaign.description1=description1
            if campaign.description2 != description2:
                b = CampChangesLog(idCampaign = campaign,timestamp = timestamp, numOfOperation = 6,originalValue = campaign.description2)
                b.save()
            campaign.description2=description2
            if campaign.url1 != url1:
                b = CampChangesLog(idCampaign = campaign,timestamp = timestamp, numOfOperation = 7,originalValue = campaign.url1)
                b.save()
            campaign.url1=url1
            if campaign.url2 != url2:
                b = CampChangesLog(idCampaign = campaign,timestamp = timestamp, numOfOperation = 8,originalValue = campaign.url2)
                b.save()
            campaign.url2=url2
            campaign.save()
            return HttpResponse('ok')
    return HttpResponse(0)
        



@login_required()
def fill_campaign_content(request):
    if request.method == "POST" and request.is_ajax():
        idCampaign = request.POST.get('idCampaign')
        print('IIIIIIIII',idCampaign)
        flag = int(request.POST.get('flag'))
        campaignObj = Campaign.objects.get(idCampaign=idCampaign)
        dic = {}
        dicken = {'title': campaignObj.title,'description1':campaignObj.description1,'description2':campaignObj.description2,'url1':campaignObj.url1,'url2':campaignObj.url2,'budget':campaignObj.budget}
        dic['description'] = dicken
        dic['typeOfCampaign'] = campaignObj.typeOfCampaign
        allObj = CPCs.objects.filter(idCampaign=campaignObj)
        print('ggg',len(allObj))
        if len(allObj) > 0:
            allObj = CPCs.objects.filter(idCampaign=campaignObj).order_by('-date')[:15]
            last = allObj[0]
            yearTo = str(last.date)[:4]
            monthTo = str(last.date)[5:7]
            dayTo = str(last.date)[8:10]   
            first =  allObj[len(allObj)-1]
            yearFrom = str(first.date)[:4]
            monthFrom = str(first.date)[5:7]
            dayFrom = str(first.date)[8:10]
            dic['cpcsPeriodsExtent'] = {'yearTo':yearTo,'monthTo':monthTo,'dayTo':dayTo,'yearFrom':yearFrom,'monthFrom':monthFrom,'dayFrom':dayFrom}
            L = []
            for i in allObj:
                
                h = Statistics.objects.filter(idCampaign = campaignObj,date=i.date).aggregate(Sum('uniqueCountOfClicks'))
                g = Statistics.objects.filter(idCampaign = campaignObj,date=i.date).aggregate(Sum('uniqueCountOfViews'))
                avgCPC = "{0:.2f}".format(i.avgCPC)
                m = {'date':i.date,'avgCPC':avgCPC,'clicks':h['uniqueCountOfClicks__sum'],'views':g['uniqueCountOfViews__sum']}
                L.append(m)

            dic['cpcs'] = L
        else:
            dic['cpcs'] = 0

        dicP = {}
        obj = CampaignWords.objects.filter(idCampaign=idCampaign)
        flagie = 0
        p = Statistics.objects.filter(idCampaign=idCampaign).count()
        if p > 0:
            flagie = 1
        for t in obj:
            t.name = Words.objects.get(idWord=t.idWord_id).name
        import operator 
        obj = sorted(obj, key=operator.attrgetter('name'))
        dic['isStat'] = flagie
        L = []
        print('len',len(obj))
        if len(obj) > 0:
            for i in obj:
                
                word = Words.objects.get(idWord=i.idWord_id)
                dicken = {}
                dicken['idWord'] = word.idWord
                dicken['name'] = word.name
                dicken['cpm'] = word.CPM
                dicken['cpc'] = word.CPC

                
                a = Statistics.objects.filter(idWord = i.idWord_id,idCampaign = campaignObj)
                c = a.aggregate(Sum('uniqueCountOfViews'))
                
                c = c['uniqueCountOfViews__sum']
                
                print('c',c)
                if c == None:
                    c = 0
                dicken['views'] = c
                
                d =  a.aggregate(Sum('uniqueCountOfClicks'))
                d = d['uniqueCountOfClicks__sum']
                
                if d == None:
                    d = 0
                dicken['clicks'] = d       
                if len(L) == 0 and flagie == 1:
                    allObj = Statistics.objects.filter(idWord = i.idWord_id,idCampaign = campaignObj).order_by('-date')[:15]
                    if len(allObj) > 0:
                        last = allObj[0]
                        #month = str(a.date.month)
                        yearTo = str(last.date)[:4]
                        monthTo = str(last.date)[5:7]
                        dayTo = str(last.date)[8:10]
                        
                        first =  allObj[len(allObj)-1]
                        #month = str(a.date.month)
                        yearFrom = str(first.date)[:4]
                        monthFrom = str(first.date)[5:7]
                        dayFrom = str(first.date)[8:10]

                        dic['wordsPeriodsExtent'] = {'yearTo':yearTo,'monthTo':monthTo,'dayTo':dayTo,'yearFrom':yearFrom,'monthFrom':monthFrom,'dayFrom':dayFrom}
                        K = []
                        for k in allObj:

                            b = k.uniqueCountOfClicks
                            
                            m = {'date':k.date,'views':k.uniqueCountOfViews,'clicks':b}
                            
                            K.append(m)
                            
                        dicken['statistics'] = K
                    else:
                        dicken['statistics'] = 0
                               
                L.append(dicken)
            #L = L.sort(key=lambda x: x.name, reverse=True)
            #import operator
            #L.sort(key=operator.itemgetter('name'))
            dic['keyword'] = L
            print('Lko',L)
        else:
            dic['keyword'] = 0
        if flag == 2:
            a = CampChangesLog.objects.filter(idCampaign = campaignObj)
            b = CampWordsChangesLog.objects.filter(idCampaign = campaignObj)
            if len(a) == 0 and len(b) == 0:
                dic['changes'] = 0
            else:
                M = []
                import itertools
                L = itertools.chain(a, b)
                import operator 
                L = sorted(L, key=operator.attrgetter('timestamp'),reverse = True)
                print('!##!#',len(L))
                newL = L[:15]
                
                
                last = (newL[0].timestamp.date())
                yearTo = str(last)[:4]
                monthTo = str(last)[5:7]
                dayTo = str(last)[8:10]   
                first =  newL[len(newL)-1].timestamp.date()
                yearFrom = str(first)[:4]
                monthFrom = str(first)[5:7]
                dayFrom = str(first)[8:10]
                dic['changesPeriodsExtent'] = {'yearTo':yearTo,'monthTo':monthTo,'dayTo':dayTo,'yearFrom':yearFrom,'monthFrom':monthFrom,'dayFrom':dayFrom}
                
                for n in L:
                    if n.timestamp.date() >= first and n.timestamp.date() <= last:
                        dicko = {'timestamp':n.timestamp.date(),'numOfOperation':n.numOfOperation}
                        if hasattr(n,'idWord'):
                            dicko['original'] = n.idWord.name
                        if hasattr(n,'originalValue'):
                            if n.originalValue == '1':
                                dicko['original'] = 'inactive'
                            elif n.originalValue == '2':
                                dicko['original'] = 'running'
                            elif n.originalValue == '3':
                                dicko['original'] = 'stopped'
                            else:
                                dicko['original'] = n.originalValue
                        M.append(dicko) 
                dic['changes'] = M
        return HttpResponse(json.dumps(dic,cls=DjangoJSONEncoder))


@login_required()
def give_me_price(request):
    if request.method == "POST" and request.is_ajax():
        value = request.POST.get('string')
        word = Words.objects.filter(name = value)
        if len(word) > 0:
            print('word',word)
            CPM = word[0].CPM
            CPC = word[0].CPC
            idWord = word[0].idWord
            print('aaa',CPM,CPC)
            dicken = {'isWord': 1,'cpm':CPM,'cpc':CPC,'idWord':idWord}
        else:
            dicken = {'isWord':0 }
            firstLetter = value[0]
            dicken['suggestions'] = []
            suggestions = Words.objects.filter(name__startswith = firstLetter)
            print('len',len(suggestions))
            for num in range(len(suggestions)):
                print('num',num)
                #dicken['suggestions'][num] = {}
                dickey = {}
                #L.append(words[num].name)
                dickey['id'] = suggestions[num].idWord
                dickey['name'] = suggestions[num].name
                dickey['cpm'] = suggestions[num].CPM
                dickey['cpc'] = suggestions[num].CPC
                dicken['suggestions'].append(dickey)
            if len(suggestions) > 0:
                dicken['isSuggestion'] = 1
            else:
                dicken['isSuggestion'] = 0
        return HttpResponse(json.dumps(dicken,cls=DjangoJSONEncoder))
                


@login_required()
def set_default_pic(request):
    if request.method == "POST" and request.is_ajax():
        idUser = request.user.id
        m = User.objects.get(pk=idUser)
        if m.isPicture == True:
            m.image.delete()
            m.isPicture = False;
            m.save()
            return HttpResponse(1)

@login_required()
def save_billing_info(request):
    if request.method == "POST" and request.is_ajax():
        print("IDD",(request.POST.get('billingInfoId')))
        billingInfoId = int(request.POST.get('billingInfoId'))
        if billingInfoId == 0:
            form = BillingForm(request.POST)
            
            
            if form.is_valid():
                info = form.save(commit = False)
                info.idPerson = request.user
                info.save()
                return HttpResponse(1)
            else:
                return HttpResponse(0)
        else:
            billingObj = Billing.objects.get(pk=billingInfoId)
            form = BillingForm(request.POST,instance = billingObj)
            if form.is_valid():
                form.save()
                return HttpResponse(1)
            else:
                return HttpResponse(0)

@login_required()
def ad(request):
    
    a = Campaign.objects.filter(idPerson=request.user.id).order_by('-timestamp')
    if len(a) == 0:
        campaign = 0
    else:
        campaign = []
        for i in a:
            dicko = {'idCampaign':i.idCampaign,'name':i.name,'status':i.status}
            campaign.append(dicko)  
        
    bills = Bills.objects.filter(idPerson=request.user.id).order_by('-period')
    billy = []
    if len(bills) == 0:
        billy = 0
    else:
        for i in bills:
            if i.varSymbol == None:
                varSymbol = 0
            else:
                varSymbol = i.varSymbol
            dickey = {'id':i.pk,'status':i.status,'period':i.period,'totalCost':i.totalCost,'varSymbol':varSymbol}
            billy.append(dickey)
    #isBillingInfo = 0
    billingInfo = Billing.objects.filter(idPerson=request.user.id)
    if len(billingInfo) > 0:
        billingInfoDic = {'name':billingInfo[0].companyName,'street':billingInfo[0].companyStreet,'town':billingInfo[0].companyTown,'zip':billingInfo[0].companyZIP,'phone':billingInfo[0].companyPhone,'email':billingInfo[0].companyEmail,'ic':billingInfo[0].companyIC,'dic':billingInfo[0].companyDIC}
        billingInfoId = billingInfo[0].pk
        #isBillingInfo = 1
    else:
        billingInfoId = 0
        billingInfoDic = 0
    if campaign != 0:
        from datetime import timedelta
        for i in campaign:
            param = 0
            a = CampaignPeriods.objects.filter(idCampaign=i['idCampaign'])
            indexLast = len(a) - 1
            if len(a) > 1:
                timeLength = timedelta()
                for k in a:
                    if k.flag == 0:
                        print('car',k.id)
                        first = k.timestamp
                        for index, item in enumerate(a):
                            if item == k:
                                ind = index
                        ind = ind - 1
                        second = a[ind].timestamp
                        timePeriod = first - second
                        timeLength = timeLength + timePeriod
                            
                if a[indexLast].flag == 1:
                    first = datetime.now()
                    second = a[indexLast].timestamp
                    timePeriod = first - second
                    timeLength = timeLength + timePeriod
                timeLength = timeLength.days
            if len(a) == 1:
                second = a[0].timestamp
                first = datetime.now()
                timeLength = (first - second).days
            if len(a) == 0:
                timeLength = '-'
            i['timePeriod'] = timeLength
            a = ViewInfo.objects.filter(idCampaign = i['idCampaign'])
            c = len(a)
            if c == 0:
                successRate = '-'
            else:
                d = ClickInfo.objects.filter(idCampaign = i['idCampaign'])
                d = len(d)
                print('d',d)
                if d == 0:
                    d = 0.00
                print('d/c',d/c)
                successRate = (float(d)/c)*100
                successRate = "{0:.2f}".format(successRate)
            i['successRate'] = successRate
        print('billy',billy)
        print('campaign',len(campaign))
    return render_to_response('ad.html',{'billingInfoId':billingInfoId,'campaign':campaign,'billingInfoDic': billingInfoDic ,'bills':billy},RequestContext(request))

@login_required()
def delete_campaign(request):
    print('juuu')
    #return HttpResponse(1)
    if request.method == "POST" and request.is_ajax():
        idCampaign = request.POST.get('idCampaign')
        print('varS',idCampaign)
        print('or',Campaign.objects.filter(idCampaign=idCampaign))
        
        #originalModel = Campaign.objects.filter(idCampaign=idCampaign)[0]
        campaignObj = Campaign.objects.get(idCampaign = idCampaign)
        
        timestampOfDeletion = datetime.now()
        newModel=DeletedCampaigns(name=campaignObj.name,typeOfCampaign = campaignObj.typeOfCampaign,budget = campaignObj.budget ,idPerson = campaignObj.idPerson, idCampaign = campaignObj.idCampaign,timestampOfCreation= campaignObj.timestamp, timestampOfDeletion = timestampOfDeletion,title= campaignObj.title,description1 = campaignObj.description1,description2= campaignObj.description2,url1 = campaignObj.url1, url2 = campaignObj.url2 )
        newModel.save()
        obj = CampaignWords.objects.filter(idCampaign=campaignObj.idCampaign)
        print('len',len(obj))
        for i in obj:
            newModel = DeletedCampaignWords(idWord= i.idWord,idCampaign = i.idCampaign_id,timestampOfDeletion = timestampOfDeletion)
            newModel.save()
        #value = str(originalModel.idCampaign) + ' ( ' +str(originalModel.name)+ ' ) '
        idPerson = User.objects.get(pk=campaignObj.idPerson.id)
        b = Log(idCampaign = campaignObj.idCampaign,timestamp = timestampOfDeletion, numOfOperation = 2,name = campaignObj.name,idPerson = idPerson)
        b.save()
        obj.delete()
        
        campaignObj.delete()
        
        return HttpResponse(1)
    return HttpResponse(2)
        





@csrf_exempt
def cur_user(request):
    if request.is_ajax():
        if request.user.is_authenticated():
            dicken={'user':request.user.nickname,'isPicture':request.user.isPicture,'username':request.user.username, 'email':request.user.email,'isStaff':request.user.is_staff }
            dicken['isAuthenticated'] = 1
            
        else:
            dicken = {}
            dicken['isAuthenticated'] = 0
         
            
        return HttpResponse(json.dumps(dicken,cls=DjangoJSONEncoder))
        

def tos(request):
    from django.conf import settings
    return render_to_response('tos.html', {},RequestContext(request))

#@login_required()
def discuss_archive(request,num,idPost):
    currentTopic = num
    topicName= BlogTopic.objects.get(pk=currentTopic).topicName
    

                
    return render_to_response('archive.html', {'param':1,'idPost':idPost,'currentTopic': currentTopic,'topicName': topicName,'form': BlogPostForm(),'commentsForm': BlogCommentForm(),},RequestContext(request))




#@csrf_exempt
def archive(request,num):
    currentTopic = num
    topicName= BlogTopic.objects.get(pk=currentTopic).topicName

                
    return render_to_response('archive.html', {'param':0,'currentTopic': currentTopic,'topicName': topicName,'form': BlogPostForm(),'commentsForm': BlogCommentForm(),},RequestContext(request))


@login_required()
def create_adampost(request):
    if request.method == "POST" and request.is_ajax():
        form = BlogPostForm(request.POST)
        currentTopic = request.POST.get('currentTopic')
        if request.POST.get('positive', None):
            character = 1
        if request.POST.get('negative', None):
            character = 2
        if request.POST.get('informative', None):
            character = 3
    if form.is_valid():
        post = form.save(commit=False)
        post.timestamp=datetime.now()
        post.idPerson= User.objects.get(username=request.user.username)
        
        post.idTopic=BlogTopic.objects.get(pk=currentTopic)
        post.valid = 1
        post.character = character
        post.save()
        person = User.objects.get(pk = request.user.id)
        
        
        dicken = {'pk':post.id,'body':post.body,'timestamp':post.timestamp,'personName':person.nickname,'character':character,'personUsername':request.user.username,'isPicture':person.isPicture}
        
        if request.user.id == post.idPerson.id:
            dicken.update({'canRemove':1})
        else:
            dicken.update({'canRemove':0})

        return HttpResponse(json.dumps(dicken,cls=DjangoJSONEncoder))
    return HttpResponse('NOTOK')


#@csrf_exempt
def update_num_of_comments(request):
    if request.method == "POST" and request.is_ajax():
        idParentComment = request.POST.get('idComment')
        if idParentComment == '0':
            idParentComment = None
            idcko = request.POST.get('ids')
            comments = BlogComment.objects.filter(idPost= idcko,idParentComment = idParentComment,valid=1)
        else:
            idcko = BlogComment.objects.get(pk = idParentComment).idPost.id
            comments = BlogComment.objects.filter(idParentComment = idParentComment,valid=1)
        return HttpResponse(len(comments))
        
@login_required()
def create_comment(request):
    if request.method == "POST" and request.is_ajax():
        form = BlogCommentForm(request.POST)
        idParentComment = request.POST.get('idComment')
        if idParentComment == '0':
            idParentComment = None
        idcko = request.POST.get('idPost')
        if form.is_valid():
            post = form.save(commit=False)
            post.timestampCom=datetime.now()
            post.idPerson= User.objects.get(username=request.user.username)
            if idParentComment != None:
                idcko = BlogComment.objects.get(pk = idParentComment).idPost.id
            post.idPost = BlogPost.objects.get(pk=idcko)
            post.idParentComment = idParentComment
            post.valid = 1
            post.save()
            person = User.objects.get(pk = request.user.id)
            
            flag = 0
            if idParentComment == None: 
                per2Id= BlogPost.objects.get(pk=idcko).idPerson
                flag = 1
                
            if idParentComment != None:
                per2Id = BlogComment.objects.get(pk = idParentComment).idPerson
                flag = 1
                
            if flag == 1 and person.id != per2Id.id:
                
                notif = Notifications(idPerson1=person,idPerson2=per2Id,idComment=post)
                notif.save()
                 
                
            dicken = {'pk':post.id,'comment':post.comment,'timestampCom':post.timestampCom,'personName':person.nickname,'idParentComment': idParentComment,'idPost':post.idPost.id,'personUsername':request.user.username,'isPicture':person.isPicture}
            
            
            if request.user.id == post.idPerson.id:
                dicken.update({'canRemove':1})
            else:
                dicken.update({'canRemove':0})
            

            if post.idParentComment != None:
                Re = {}
                superComment = BlogComment.objects.get(pk = idParentComment,valid=1)    
                Re.update({'text': superComment.comment[:16]})
                personName = User.objects.get(pk = superComment.idPerson.id).nickname
                Re.update({'inReplyToName': personName})
                dicken.update({'Re':Re})
            return HttpResponse(json.dumps(dicken,cls=DjangoJSONEncoder))
        return HttpResponse('NOTOK')


@login_required()   
def del_notifs(request):
    if request.method == "POST" and request.is_ajax():
        idcko = int(request.POST.get('idcko'))
        Notifications.objects.filter(pk=idcko).delete()
        return HttpResponse(1)
    return HttpResponse(0)

def discuss(request):
    if request.method == "POST" and request.is_ajax():
        idPost = int(request.POST.get('idcko'))
        idUser = request.user.id
        
        post=BlogPost.objects.get(pk=idPost)
        idTopic = post.idTopic.id
        
        
        dic={}
        posts = BlogPost.objects.filter(idTopic=idTopic)
        
        k=0
        m=0
        
    
        for p in posts:
            if p.id < post.id:
                k = k + 1
            if p.id > post.id:
                m = m + 1
        if k > 6:
            k = 6
        if m > 6:
            m = 6
        dic['pk'] = post.id
        dic['beforePost'] = k
        dic['afterPost'] = m
        dic['coreText'] = post.body
        dic['timestamp'] = post.timestamp
        person = User.objects.get(pk=post.idPerson.id)
        dic['personName'] = person.nickname
        dic['personUsername'] = person.username
        
        
        dic['isPicture'] = person.isPicture
        dic['character'] = post.character
        likeds = Like.objects.filter(idPost = post.id,valid=1)
        likedsIDs = []
        for z in likeds:
            likedsIDs.append(z.idPerson.id)
        if idUser == post.idPerson.id:
            dic.update({'canRemove':1})
        else:
            dic.update({'canRemove':0})
        if idUser in likedsIDs:
            dic.update({'canLike':0})
        else:
            dic.update({'canLike':1})            
        dic.update({'lenLikedsIDs':len(likedsIDs)})
        
        comments = BlogComment.objects.filter(idPost= post.id,idParentComment=None,valid = 1)
        dic.update({'dic':len(comments)})
        comments = comments[:2]
        com = []
        if comments:
            for p in range(len(comments)):
                dicken = {}
                dicken.update({'pk':comments[p].id})
                dicken.update({'comment':comments[p].comment})
                dicken.update({'timestampCom':comments[p].timestampCom})
                person = User.objects.get(pk= comments[p].idPerson.id)
                dicken.update({'personName':person.nickname,'personUsername':person.username,'isPicture':person.isPicture})
                likeds = LikeComment.objects.filter(idComment = comments[p].id,valid=1)
                likedsIDs = []
                for z in likeds:
                    likedsIDs.append(z.idPerson.id)
                
                
                if idUser == comments[p].idPerson.id:
                    dicken.update({'canRemove':1})
                else:
                    dicken.update({'canRemove':0})
                if idUser in likedsIDs:
                    dicken.update({'canLike':0})
                else:
                    dicken.update({'canLike':1})
                dicken.update({'idParentComment': comments[p].idParentComment })
                dicken.update({'idPost': comments[p].idPost.id })    
                dicken.update({'lenLikedsIDs':len(likedsIDs)})        
                subcomments = BlogComment.objects.filter(idPost= comments[p].idPost,idParentComment = comments[p].id,valid = 1)
                dicken.update({'dic':len(subcomments)})
                com.append(dicken)
        
        dic.update({'comments':com})

            
        return HttpResponse(json.dumps(dic,cls=DjangoJSONEncoder))
    return HttpResponse(0)
    
@login_required()
def check_for_num_of_notifs(request):
    notifs=Notifications.objects.filter(idPerson2=request.user.id)
    return HttpResponse(len(notifs))



@login_required()
def check_for_notifs(request):
    fromNotif = int(request.POST.get('fromNotif'))
    results=Notifications.objects.filter(idPerson2=request.user.id)
    results = results[::-1]
    if (fromNotif == 0):
        notifs = results[:6]
    else:
        notifs = []
        for res in results:
            if res.id < fromNotif and len(notifs) < 6:
                notifs.append(res)
    data = serializers.serialize("python", notifs)
    L=[]
    vel={}
    if len(data) != 0:    
        for i in range(len(data)):  
            for k in data[i].keys():
                   
                if k == 'fields':
                    dicken = {}
                    person = User.objects.get(pk=data[i][k]['idPerson1'])
                    dicken['personNickname']= person.nickname
                    dicken['personUsername']= person.username
                    dicken['isPicture'] = person.isPicture 
                    comment = BlogComment.objects.get(pk=data[i][k]['idComment'])
                    dicken['timestampCom'] = comment.timestampCom
                    idPost = comment.idPost.id
                    post = BlogPost.objects.get(pk=idPost)
                    idTopic = post.idTopic.id
                    dicken['topicName'] = BlogTopic.objects.get(pk=idTopic).topicName
                    dicken['idPost'] = idPost
                    dicken['idComment']= data[i][k]['idComment']
                    dicken['pk']= data[i]['pk']
                    dicken['idTopic']= idTopic
                    if BlogComment.objects.get(pk=data[i][k]['idComment']).idParentComment == None:
                        dicken['idParentComment'] = 0
                    else:
                        dicken['idParentComment'] = 1 
                    dicken['text'] = comment.comment[:16]
                    L.append(dicken)
        vel['data'] = L
        
        f = 0
        
        M = []
        for notif in notifs:
            M.append(notif.id)
        
        minx=min(M)
        for c in results:
            if c.id < minx:
                f = f + 1
        if f > 6:
            f = 6
            
        vel['beforeNotif'] = f
        
        
        return HttpResponse(json.dumps(vel,cls=DjangoJSONEncoder))
    else:
        return HttpResponse(0)

 
@login_required()
def upload_image(request):
    form = ImageUploadForm()  
    return render_to_response('upload.html', {'form':form},RequestContext(request))        
            


        
             
def give_me_posts(request):
    print('GIME')
    if request.method == "POST" and request.is_ajax():
        currentTopic = request.POST.get('currentTopic')
        fromPost = int(request.POST.get('from'))
        switch = int(request.POST.get('switch'))
        lift = int(request.POST.get('lift'))
        
        idUser = request.user.id
        posts = []
        print '********'
        print switch,lift,idUser,fromPost,currentTopic
        if switch < 2:
            
            results = BlogPost.objects.filter(idTopic=currentTopic,valid=1)
            print('A',len(results))
        else:
            results = BlogPost.objects.filter(idTopic=currentTopic,character= (switch-1),valid=1)
            print('B',len(results))
        
        vel = {}
        k=0
        m=0
        L=[]
        


            
        if fromPost != 0:
            
            if switch == 0:
                for res in results:
                    if lift == 0:
                        if res.id < fromPost and len(posts) < 6:
                            posts.append(res)
                    else:
                        if res.id > fromPost and len(posts) < 6:
                            posts.append(res)
                        
            if switch != 0:
                if switch > 1:
                    results = list(results)   
                if switch == 1:
                    R = []
                    for res in results:
                        res.numOfLikes = len(Like.objects.filter(idPost = res.id,valid=1))
                    results = list(results)
                    results.sort(key=lambda x: x.numOfLikes, reverse=True)
                    for res in results:
                        R.append(res.id)
                for res in results:
                    if res.id == fromPost:
                        index = results.index(res)
                indexFrom= index + 1
                indexTo = indexFrom + 6
                posts = results[indexFrom:indexTo]
                    
            


        if fromPost == 0:
            if switch == 1:
                R = []
                for res in results:
                    res.numOfLikes = len(Like.objects.filter(idPost = res.id,valid=1))
                results = list(results)
                results.sort(key=lambda x: x.numOfLikes, reverse=True)
                for res in results:
                    R.append(res.id)
            for res in results:
                if len(posts) < 6:
                    posts.append(res)
        
            
        comments = []
        dic = {}
        if posts:
            for p in posts:
                L.append(p.id)
            if switch != 1:
                maxx=max(L)
                minx=min(L)
                for p in results:
                    if p.id < minx:
                        k = k + 1
                        if k == 6:
                            break
                    if p.id > maxx:
                        m = m + 1
                        if m == 6:
                            break
                        
            else:
                index = R.index(L[-1]) + 1
                for r in R[index:]:
                    k = k + 1
                    if k == 6:
                        break
                
                    
                
            
            
                    
            
            vel['beforePost'] = k  
            vel['afterPost'] = m
            
                   

            data = serializers.serialize("python", posts)
            for i in range(len(data)):
                del data[i]['model'] 
                for k in data[i].keys():
                    
                    if k == 'fields':
                        person=User.objects.get(pk= data[i][k]['idPerson'])
                        data[i][k].update({'personName':person.nickname,'personUsername':person.username,'isPicture':person.isPicture})
                        dic[data[i]['pk']] = 0
                        likeds = Like.objects.filter(idPost = data[i]['pk'],valid=1)
                        likedsIDs = []
                        for z in likeds:
                            likedsIDs.append(z.idPerson.id)
                        if idUser == data[i][k]['idPerson']:
                            data[i][k].update({'canRemove':1})
                        else:
                            data[i][k].update({'canRemove':0})
                        if idUser in likedsIDs:
                            data[i][k].update({'canLike':0})
                        else:
                            data[i][k].update({'canLike':1})            
                        data[i][k].update({'lenLikedsIDs':len(likedsIDs)})
                        

                        comments = BlogComment.objects.filter(idPost= data[i]['pk'],idParentComment=None,valid = 1)
                        data[i][k].update({'dic':len(comments)})
                        comments = comments[:2]
                        com = []
                        if comments:
                            for p in range(len(comments)):
                                dicken = {}
                                dicken.update({'pk':comments[p].id})
                                dicken.update({'comment':comments[p].comment})
                                dicken.update({'timestampCom':comments[p].timestampCom})
                                person = User.objects.get(pk= comments[p].idPerson.id)
                                dicken.update({'personName':person.nickname,'personUsername':person.username,'isPicture':person.isPicture})
                                likeds = LikeComment.objects.filter(idComment = comments[p].id,valid=1)
                                likedsIDs = []
                                for z in likeds:
                                    likedsIDs.append(z.idPerson.id)
                                
                                
                                if idUser == comments[p].idPerson.id:
                                    dicken.update({'canRemove':1})
                                else:
                                    dicken.update({'canRemove':0})
                                if idUser in likedsIDs:
                                    dicken.update({'canLike':0})
                                else:
                                    dicken.update({'canLike':1})
                                dicken.update({'idParentComment': comments[p].idParentComment })
                                #if comments[p].idParentComment != None:
                                dicken.update({'idPost': comments[p].idPost.id })    
                                dicken.update({'lenLikedsIDs':len(likedsIDs)})        
                                subcomments = BlogComment.objects.filter(idPost= comments[p].idPost,idParentComment = comments[p].id,valid = 1)
                                dicken.update({'dic':len(subcomments)})
                                com.append(dicken)
                        
                        data[i][k].update({'comments':com})
                        del data[i][k]['idPerson']
                        del data[i][k]['idTopic']
            vel['data'] = data
            #print vel          
            return HttpResponse(json.dumps(vel,cls=DjangoJSONEncoder))
        return HttpResponse("OK") 


def show_comments(request):
    if request.method == "POST" and request.is_ajax():
        idParentComment = request.POST.get('idComment')
        idUser = request.user.id
        fromNum = request.POST.get('from')
        if idParentComment == '0':
            idParentComment = None
            idPost = request.POST.get('ids')
            if fromNum == '0':
                results = BlogComment.objects.filter(idPost=idPost,idParentComment = idParentComment,valid=1)
                comments= results[:6]
                
            else:
                comments = []
                results = BlogComment.objects.filter(idPost=idPost,idParentComment = idParentComment,valid=1) 
                for res in results:
                    
                    if res.id < int(fromNum) and len(comments) < 6 :
                        comments.append(res)
                    
                        
                           
        else:
            superComment = BlogComment.objects.get(pk = idParentComment,valid=1)
            idPost = superComment.idPost.id
            if fromNum == '0':
                results = BlogComment.objects.filter(idParentComment = idParentComment,valid=1)
                comments = results[:6]
            else:
                comments = []
                results = BlogComment.objects.filter(idParentComment = idParentComment,valid=1) 
                for res in results:
                    
                    if res.id < int(fromNum) and len(comments) < 6:
                        comments.append(res)
                    
                        
        L = []
        k=0
        m=0
        dick = {}
        vel = {}
        if comments:
            
                           
            for com in comments:
                L.append(com.id)
            
            minx=min(L)
            for c in results:
                
                if c.id < minx:
                    k = k + 1
            if k > 6:
                k = 6
            
            vel['beforeComment'] = k
             
        
        
        
            data = serializers.serialize("python", comments)
            
            for i in range(len(data)):
                del data[i]['model'] 
                for k in data[i].keys():
                    if k == 'fields':
                        person = User.objects.get(pk= data[i][k]['idPerson'])
                        data[i][k].update({'personName':person.nickname,'personUsername':person.username,'isPicture':person.isPicture})
                        
                        dick[data[i]['pk']] = 0
                        likeds = LikeComment.objects.filter(idComment = data[i]['pk'],valid = 1)
                        likedsIDs = []
                        for z in likeds:
                            likedsIDs.append(z.idPerson.id)
                        if idUser == data[i][k]['idPerson']:
                            data[i][k].update({'canRemove':1})
                        else:
                            data[i][k].update({'canRemove':0})
                        if idUser in likedsIDs:
                            data[i][k].update({'canLike':0})
                        else:
                            data[i][k].update({'canLike':1})
                        data[i][k].update({'lenLikedsIDs':len(likedsIDs)})
                        subcomments = BlogComment.objects.filter(idPost=idPost,idParentComment = data[i]['pk'],valid=1)
                        data[i][k].update({'dic':len(subcomments)})
                        
                        if data[i][k]['idParentComment'] != None:
                            Re = {}   
                            Re.update({'text': superComment.comment[:16]})
                            personName = User.objects.get(pk = superComment.idPerson.id).nickname
                            Re.update({'inReplyToName': personName})
                            data[i][k].update({'Re':Re})
                        del data[i][k]['idPerson']
            vel['data'] = data
            return HttpResponse(json.dumps(vel,cls=DjangoJSONEncoder))
        return HttpResponse('OK')
        

@login_required()
def remove_post(request):
    if request.method == "POST" and request.is_ajax():
        idcko = request.POST.get('ids')
        timestamp = datetime.now()
        post = BlogPost.objects.get(pk=idcko)
        post.valid = 0
        post.timestamp = timestamp
        post.save()
        likes = Like.objects.filter(idPost=idcko,valid=1)
        for like in likes:
            like.valid = 0
            like.timestamp = timestamp
            like.save()
        
        comments=BlogComment.objects.filter(idPost=idcko,valid=1)
        for comment in comments:
            comment.valid = 0
            comment.timestamp = timestamp
            comment.save()

            likes = LikeComment.objects.filter(idComment=comment.id, valid=1)
            for i in likes:
                i.valid = 0
                i.timestamp = timestamp
                i.save()

        return HttpResponse(status=200)

@login_required()
def remove_comment(request):
    if request.method == 'POST' and request.is_ajax():
        idcko = request.POST.get('ids')
        timestamp = datetime.now()
        idParent = BlogComment.objects.get(pk=idcko).idParentComment
        if idParent == None:
            idPost = BlogComment.objects.get(pk=idcko).idPost.id
            comments = BlogComment.objects.filter(idPost= idPost,idParentComment=idParent,valid=1)
        else:
            comments = BlogComment.objects.filter(idParentComment = idParent,valid=1)

        comment = BlogComment.objects.get(pk=idcko)
        comment.valid = 0
        comment.timestamp = timestamp
        comment.save()
        likes = LikeComment.objects.filter(idComment=idcko,valid=1)
        for like in likes:
            like.valid = 0
            like.timestamp = timestamp
            like.save()
        q = [idcko]
        while q:
            coms = BlogComment.objects.filter(idParentComment=q.pop(0),valid = 1)
            for com in coms:
                com.valid = 0
                com.timestamp = timestamp
                q.append(com.id)
                com.save()
                likes = LikeComment.objects.filter(idComment=com.id,valid=1)
                for i in likes:
                    i.valid = 0
                    i.timestamp = timestamp
                    i.save()

        return HttpResponse(len(comments))
    

@login_required()
def like_post(request):
    if request.method == "POST" and request.is_ajax():
        idcko = request.POST.get('ids')
        idPerson = User.objects.get(username=request.user.username)

        timestamp = datetime.now()
        idPost = BlogPost.objects.get(pk=idcko)
        try:
            model = Like.objects.get(idPost = idPost,idPerson = idPerson)
            model.timestamp=timestamp
        except:
            model = Like(idPost = idPost,idPerson = idPerson,timestamp=timestamp)
        model.valid = 1
        model.save()
      
        return HttpResponse("Ok")
    return HttpResponse("notOk")

@login_required()
def dislike_post(request):
    if request.method == "POST" and request.is_ajax():
        idcko = request.POST.get('ids')
        idPerson = User.objects.get(username=request.user.username)
        timestamp = datetime.now()
        idPost = BlogPost.objects.get(pk=idcko)
        u = Like.objects.get(idPost = idPost,idPerson = idPerson)
        u.timestamp=timestamp
        u.valid = 0
        u.save()        
        return HttpResponse("Ok")
    return HttpResponse("notOk")

@login_required()
def like_comment(request):
    if request.method == "POST" and request.is_ajax():
        idcko = request.POST.get('ids')
        idPerson = User.objects.get(username=request.user.username)
        timestamp = datetime.now()
        idComment = BlogComment.objects.get(pk=idcko)
         
        try:
            model = LikeComment.objects.get(idComment = idComment,idPerson = idPerson)
            model.timestamp=timestamp
        except:
            model = LikeComment(idComment = idComment,idPerson = idPerson,timestamp=timestamp)
        model.valid = 1
        model.save()
        return HttpResponse("Ok")
        
    return HttpResponse("notOk")
        
@login_required()
def dislike_comment(request):
    if request.method == "POST" and request.is_ajax():
        timestamp = datetime.now()
        idcko = request.POST.get('ids')
        idPerson = User.objects.get(username=request.user.username)
        timestamp = datetime.now()
        idComment = BlogComment.objects.get(pk=idcko)
        u = LikeComment.objects.get(idComment = idComment,idPerson = idPerson)
        u.valid = 0
        u.timestamp=timestamp
        u.save()
        return HttpResponse("Ok")
    return HttpResponse("notOk")



@login_required()
def save_image(request):
    
    if request.method == 'POST' and request.is_ajax():
        from django.conf import settings
        #b = request.FILES.get('picture')
        idUser = request.user.id  
        form = ImageUploadForm(data=request.POST,files=request.FILES)
        if form.is_valid():
            photo = form.cleaned_data['picture']
            
            import imghdr

            image_type = imghdr.what(photo)
            if image_type == 'jpeg':
                image_type = 'jpg'
            photo.name = request.user.username + ".jpg"
            
            m = User.objects.get(pk=idUser)
            if m.isPicture == True:
                m.image.delete()
            m.image = photo
            m.isPicture = True
            m.save()
            if image_type not in ['jpg','jpeg']:
                from PIL import Image
                im = Image.open(settings.MEDIA_ROOT +'pics/'+request.user.username+'.jpg')
                im.convert('RGB').save(settings.MEDIA_ROOT +'pics/'+request.user.username+'.jpg', 'JPEG')
            from PIL import Image
            im = Image.open(settings.MEDIA_ROOT +'pics/'+request.user.username+'.jpg')
            
            w, h = im.size
            if w == 70 and h == 70:
                return HttpResponse(2) 
            return HttpResponse(1)
        return HttpResponse(0)
    return HttpResponse('notPostorAjax')

@login_required()
def finish_cropping(request):
    
    if request.method == 'POST' and request.is_ajax():
        from django.conf import settings
        dic = request.POST.get('dic')
        dic = eval(dic)
        dic['border-top-width'] = int(dic['border-top-width'])
        dic['border-right-width'] = int(dic['border-right-width'])
        dic['border-bottom-width'] = int(dic['border-bottom-width'])
        dic['border-left-width'] = int(dic['border-left-width'])
        import PIL
        import Image
        im = Image.open(settings.MEDIA_ROOT +'pics/'+request.user.username+'.jpg')
        w, h = im.size
        tmp = im.crop((dic['border-left-width'],dic['border-top-width'],w-dic['border-right-width'],h-dic['border-bottom-width'])) #(from L,from T, from R, from B)
        if tmp.size[0] > 48 or tmp.size[1] > 48:
            tmp = tmp.resize((48,48), Image.ANTIALIAS)
        tmp.save(settings.MEDIA_ROOT +'pics/'+request.user.username+'.jpg','JPEG')
        #tmp.save(im,'JPEG')
        return HttpResponse('OK')

def give_me_the_one(request):
    
    print('ONE')
    if request.method == 'POST' and request.is_ajax():
        idComment = int(request.POST.get('idComment'))
        comment=BlogComment.objects.get(pk=idComment)
        author = User.objects.get(pk=comment.idPerson.id)
        
        
        dic = {}
        
        if comment.idParentComment == None:
            post=BlogPost.objects.get(pk=comment.idPost.id)
            dic['coreText'] = post.body
            dic['timestamp'] = post.timestamp
            person = User.objects.get(pk=post.idPerson.id)
        else:
            parent=BlogComment.objects.get(pk=comment.idParentComment)
            dic['coreText']= parent.comment
            dic['timestamp'] = parent.timestampCom
            person = User.objects.get(pk=parent.idPerson.id)
        dic['personName'] = person.nickname
        dic['personUsername'] = person.username
        dic['comment'] = {'comment':comment.comment,'personName':author.nickname,'personUsername':author.username,'timestamp':comment.timestampCom}
        return HttpResponse(json.dumps(dic,cls=DjangoJSONEncoder))



@login_required()
def online_validate_url(request):
    import urllib2
    from socket import error as SocketError
    url = request.POST.get('url')
    
    try:
        r = urllib2.urlopen(url)
        if r.code in (200, 401):
            print '[{}]: '.format(url), "Up!"
            print('CODE',r.code)
            return HttpResponse(1)
    except urllib2.HTTPError, e:
        print('httpError')
        print e.code
        return HttpResponse(2)
    except urllib2.URLError, e:
        print('urlError')
        print e.args
        return HttpResponse(3)
    except SocketError as e:
        return HttpResponse(4)
@login_required()
def create_campaign(request):
    if request.method == 'POST' and request.is_ajax():
        form = CampaignForm(request.POST)
        listOfIDs = request.POST.get('keywordIDs')
        listOfIDs = map(str, listOfIDs.split(","))
    if form.is_valid():
        campaign = form.save(commit = False)
        
        
        campaign.idPerson = request.user
        campaign.timestamp=datetime.now()
        campaign.status = 1
        typeOfCampaign = int(request.POST.get('adType', None))
        campaign.typeOfCampaign = typeOfCampaign
        campaign.save()  
        obj = Campaign.objects.get(pk = campaign.pk)
        
        import hashlib
        value = str(campaign.timestamp) + str(campaign.pk)
        obj.idCampaign = hashlib.md5(value).hexdigest() 
        obj.save()
        #value = str(obj.idCampaign) + ' ( ' +str(obj.name)+ ' ) '
        b = Log(idCampaign = obj.idCampaign,timestamp = obj.timestamp, numOfOperation = 1,name = obj.name,idPerson = obj.idPerson)
        b.save()
        for i in listOfIDs:
            wordObj = Words.objects.get(idWord = i)
            campaignObj = Campaign.objects.get(pk=campaign.pk)
            campWordsObj = CampaignWords(idCampaign = campaignObj,idWord = wordObj)
            campWordsObj.save()
        
        
        dicken = {'status':1,'name':campaign.name,'idCampaign': obj.idCampaign}
    else:
        dicken = {'status':0}
    
    return HttpResponse(json.dumps(dicken,cls=DjangoJSONEncoder))


@login_required()
def campaign_action(request):
    if request.method == 'POST' and request.is_ajax():
        idCampaign = request.POST.get('idCampaign')
        campaign = Campaign.objects.get(idCampaign=idCampaign)
        timestamp = datetime.now()
        
        
        
        if campaign.status in [1,3]:
            
            
            b = CampChangesLog(idCampaign = campaign,timestamp = timestamp, numOfOperation = 9,originalValue = campaign.status)
            b.save()
            campaign.status = 2
            flag = 1
            
            
            #sign = 1
        else:
            
            b = CampChangesLog(idCampaign = campaign,timestamp = timestamp, numOfOperation = 10,originalValue = campaign.status)
            b.save()
            campaign.status = 3
            #sign = 0
            flag = 0
        campaign.save()
        a = CampaignPeriods(idCampaign = campaign,timestamp=timestamp,flag = flag)
        a.save()
        dicken = {'status':campaign.status,'idCampaign': campaign.idCampaign}
        from datetime import timedelta
        a = CampaignPeriods.objects.filter(idCampaign=idCampaign)
        indexLast = len(a) - 1
        if len(a) > 1:
            timeLength = timedelta()
            for k in a:
                if k.flag == 0:
                    print('car',k.id)
                    first = k.timestamp
                    for index, item in enumerate(a):
                        if item == k:
                            ind = index
                    ind = ind - 1
                    second = a[ind].timestamp
                    timePeriod = first - second
                    timeLength = timeLength + timePeriod
                        
            if a[indexLast].flag == 1:
                first = datetime.now()
                second = a[indexLast].timestamp
                timePeriod = first - second
                timeLength = timeLength + timePeriod
            timeLength = timeLength.days
        if len(a) == 1:
            second = a[0].timestamp
            first = datetime.now()
            timeLength = (first - second).days
        if len(a) == 0:
            timeLength = '-'
        timePeriod = timeLength
        
        
        
        
        
        dicken['timePeriod'] = timePeriod   
        return HttpResponse(json.dumps(dicken,cls=DjangoJSONEncoder))
            
        
    
