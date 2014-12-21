(function ($) {
    $.fn.addHoveringEffectsToCampButs = function(idCampaign){
        var buttons = ['editCampaign','closeBtnCampaign']
        if ($.gen.actionButtonEnabled == 1){
            buttons.push('imgActionButton')
        }
        var nums = ['0.8','0.6','0.6']
        for (var i =0,len = buttons.length;i<len;i++){
            $.fn.addHoveringEffect($('#'+buttons[i]+idCampaign+''),nums[i])
        
        }
    }


    $.fn.addCampaignHandlers = function(idCampaign,name,status){
        $.fn.addDeleteCampaignHandler(idCampaign)
        $.fn.addEditCampaignHandler(idCampaign,name)
        $.fn.setColor(status,idCampaign,'')
        $.fn.addHoveringEffectsToCampButs(idCampaign)
        
    }





    $.fn.getCamp = function(){
        var from = $.gen.fromCamp - 1
        var to = $.gen.toCamp
        $('#campaigns tbody:last tr').remove()
        for (var i = 0,len= $.gen.campaignsList.length;i<len;i++){
            
            if (i >= from && i < to  ){
                var k = 0
                var str = []
                str[k++] = $.fn.buildCampaign($.gen.campaignsList[i].idCampaign,$.gen.campaignsList[i].name,$.gen.campaignsList[i].status,$.gen.campaignsList[i].successRate,$.gen.campaignsList[i].timePeriod)
                $('#campaigns').append(str.join(''))
                $.fn.addCampaignHandlers($.gen.campaignsList[i].idCampaign,$.gen.campaignsList[i].name,$.gen.campaignsList[i].status)
                
            }
            
            
        }
        $.fn.addActionButtonHandler(0);

        
                
    }
              

    $.fn.resetCamp = function(len){
        $.gen.fromCamp = 1
        $.gen.sumCamp = len

            
        $.gen.extentCamp = Math.ceil(($.gen.sumCamp/5))
        $.gen.curCamp = 1
        if ($.gen.extentCamp > 1){
            $.gen.toCamp = 5
        }else{
            $.gen.toCamp = $.gen.sumCamp
        }
         
        $('#totalSumCamp').text($.gen.sumCamp)
        $('#fromCamp').text($.gen.fromCamp)
        $('#toCamp').text($.gen.toCamp)
    } 


    $.fn.addCampNavigationDivHandler = function(){

        $('div[class="campNavigationDiv"]').click(function(){
        

            var value=$(this).attr('value')
            if (value == '1' && $.gen.curCamp == 1){
                return
            }
            if (value == '2' && $.gen.curCamp == $.gen.extentCamp){
                return
            }
            
            if (value == '1'){
                $.gen.curCamp = $.gen.curCamp - 1
                $.gen.fromCamp = $.gen.fromCamp - 5
                var valo = $('#campaigns > tbody:last tr').length
                $.gen.toCamp = $.gen.toCamp - valo 
                
                
                
            }else{
                
                $.gen.curCamp = $.gen.curCamp + 1
                $.gen.fromCamp = $.gen.fromCamp + 5
                if (($.gen.toCamp + 5) > $.gen.sumCamp){
                    $.gen.toCamp = $.gen.sumCamp
                }else{
                    $.gen.toCamp = $.gen.toCamp + 5
                }

            }
            $('#fromCamp').text($.gen.fromCamp)
            $('#toCamp').text($.gen.toCamp)

            $.fn.getCamp()
            $.fn.checkPagesNavigators(0)

            
        })


    }


    $.fn.buildCampaignHeader = function(){
        var i = 0
        var addon = []
        addon[i++] = '<thead>'
            addon[i++] = '<tr>'
                addon[i++] = '<th class="addWord" style="width:240px;text-align:left">'
                    addon[i++] = '<div>'
                        addon[i++] = 'Názov kampane'
                    addon[i++] = '</div>'
                addon[i++] = '</th>'
                addon[i++] = '<th class="addWord" style="width:80px;text-align:left">'
                    addon[i++] = '<div>'
                        addon[i++] = 'Stav'
                    addon[i++] = '</div>'
                addon[i++] = '</th>'
                addon[i++] = '<th class="addWord" style="width:120px">'
                    addon[i++] = '<div>'
                        addon[i++] = 'Úspešnosť (%)'
                    addon[i++] = '</div>'
                addon[i++] = '</th>'
                
                addon[i++] = '<th class="addWord" style="width:165px;text-align:left">'
                    addon[i++] = '<div>'
                        addon[i++] = 'Suma dní trvania kampane'
                    addon[i++] = '</div>'
                addon[i++] = '</th>'
                addon[i++] = '<th class="addWord" style="width:100px;text-align:center">'
                addon[i++] = '<div style="display:inline-block">'
                    addon[i++] = 'Akcia'
                addon[i++] = '</div>'
                addon[i++] = '<span style="" class="topBarInfo" id= "topBarInfo" value="1">'
                    addon[i++] = 'i'
                addon[i++] = '</span>'
                
                addon[i++] = '</th>'
                addon[i++] = '<th class="addWord" style="width:45px;text-align:left">'
                addon[i++] = '</th>'  
            addon[i++] = '</tr>'
        addon[i++] = '</thead>'
        return addon
    }




    $.fn.buildCampaigns = function(campaigns){
        var i = 0
        var addon = []
        addon[i++] = '<div id="billingInfoMissingDiv" style="display:block">'
            addon[i++] = '<div>'
                addon[i++] = 'Ak chcete vytvoriť kampaň, musíte najskôr vyplniť <span id="showMenuBilling" class="tyrkys" style="cursor:pointer">fakturačné údaje</span>'
            addon[i++] = '</div>'
        addon[i++] = '</div>'
        addon[i++] = '<div id="billingInfoCompleteDiv" style="display:none">'
            addon[i++] = '<div id="noCampaigns" style="display:block;margin-top:100px">'
                addon[i++] = "Nie sú vytvorené žiadne kampane"
            addon[i++] = '</div>'
            addon[i++] = "<div  class='block' style='font-size:16px;position:absolute;top:145px'>"
                addon[i++] = '<div id="succesfulCampaignDeletion" style="display:none" class="adNotification">'
                    addon[i++] = 'Kampaň bola úspešne odstránená !'
                addon[i++] = '</div>'
            addon[i++] = "</div>"
            addon[i++] = '<div id="campaignsList" style="display:none;position:relative;margin-top:110px">'
                addon[i++] = '<div id="helper1" class="helper" style="" >'
                    addon[i++] = '<div>'
                        addon[i++] = '<img class="" width=8px height=8px id=""  src="/static/play.jpg" style="opacity:0.6;display:inline-block;margin-bottom:1px;padding-top:3px">'
                        addon[i++] = '<span style="display:inline;font-size:11px;vertical-align:top;margin-left:5px">'
                            addon[i++] = 'Spustenie resp. pokračovanie v kampani' 
                        addon[i++] = '</span>'
                    addon[i++] = '</div>'
                    addon[i++] = '<div style="">'
                        addon[i++] = '<img class="" width=8px height=8px id=""  src="/static/pause.jpg" style="opacity:0.6;display:inline-block;margin-bottom:1px;padding-top:3px">'
                        addon[i++] = '<span style="display:inline;font-size:11px;vertical-align:top;margin-left:5px">'
                            addon[i++] = 'Pozastavenie kampane' 
                        addon[i++] = '</span>'
                    addon[i++] = '</div>'
                addon[i++] = '</div>'
                addon[i++] = '<div id="campaignsDiv" style="">'

                            

                    addon[i++] = '<table id="campaigns" cellpadding="0" cellspacing="0" border="0" style=";position:relative;border: 0px double #ddd;">'
                        addon[i++] = $.fn.buildCampaignHeader().join('') 
                        addon[i++] = '<tbody>'
                            var k = 0
                            var str = []
                            if (campaigns != 0){
                                console.log('campaigns',campaigns)
                                //var m = 0
                                for(var m = 0,len = campaigns.length;m<len;m++){        
                                    console.log('CC',$.gen.campaignsList.length)
                                    $.gen.campaignsList.push(campaigns[m])
                                    if (m < 5){            
                                        str[k++] = $.fn.buildCampaign(campaigns[m].idCampaign,campaigns[m].name,campaigns[m].status,campaigns[m].successRate,campaigns[m].timePeriod)
                                    }
                                    
                                    console.log('mm',m)            
                                }
                                console.log('M',m)
                                addon[i++] = str.join("")
                            }
                        addon[i++] = '</tbody>'    
                    addon[i++] = '</table>'
                    
                addon[i++] = '</div>'
            addon[i++] = '</div>'
            addon[i++] = '<div style="height:30px;border:0px solid black;position:absolute;top:105px;">'
                addon[i++] = '<table id="outerDiv" cellpadding="0" cellspacing="0" border="0" style="">'
                    addon[i++] = '<tr>'
                        addon[i++] = '<td>'
                            addon[i++] = '<input id="createCampaignButton" type="button" class="s" value="Vytvoriť kampaň" style="float:left;width:120px;padding-left:18px;">'
                            
                            addon[i++] = '<img src=/static/plusSign.png style="position:absolute;left:-10;top:-5;opacity:0.4" width="40px" height="40px">'
                        addon[i++] = '</td>'
                        addon[i++] = '<td style="width:430px;padding-bottom:3px">'
                            addon[i++] = $.fn.buildRemark(1)
                        addon[i++] = '</td>'
                        addon[i++] = $.fn.buildNavigationPanel(0)
                    addon[i++] = '</tr>'
                addon[i++] = '</table>'
                
                
            addon[i++] = '</div>'
               

            
        addon[i++] = '</div>'
        
        $('#menuCampaigns').children().remove()
        $('#menuCampaigns').append(addon.join(''))
        
        if (campaigns != 0 ){
            $('#noCampaigns').hide()
            
            $('#campaignsList').show()
            console.log('GG',$.gen.campaignsList.length)
            $.fn.resetCamp($.gen.campaignsList.length)
            
            $.fn.checkNavigationPanelVisibility($.gen.campaignsList.length,'3','Camp') 
            
        }
        
        
        $.fn.addNavigationDivHoveringEffect(0)
        $.fn.addCampNavigationDivHandler()
        $('#remark').css('margin-left','50px')
        
        for(var m = 0,len = campaigns.length;m<len;m++){
            $.fn.addCampaignHandlers(campaigns[m].idCampaign,campaigns[m].name,campaigns[m].status)
        }
        $.fn.addActionButtonHandler(0);
        $.fn.addHelperHandler()
    }


    $.fn.buildCampaign = function(idCampaign,name,status,successRate,timePeriod){
        
        var k = 0
        var str = []
        str[k++] = '<tr id="campaign'+idCampaign+'" >'
            str[k++] = '<td class="addWord style="width:70px;text-align:center">'
            
                str[k++] = '<div id="editCampaign'+idCampaign+'" style="cursor:pointer;opacity:0.8;text-decoration: underline;" class="tyrkys">'
                    str[k++] = name
                str[k++] = '</div>'
            str[k++] = '</td>'
            str[k++] = '<td class="addWord" style="width:80px;" id="tdStatusCampaign'+idCampaign+'">'
                

                var value = status
                var statusText = $.fn.giveMeStatus(value)
                str[k++] = '<div id="statusCampaign'+idCampaign+'" style="cursor:default" value="'+status+'">'
                    str[k++] = statusText
                
                str[k++] = '</div>'
            str[k++] = '</td>'
            str[k++] = '<td class="addWord" style="width:120px;text-align:center">'
                str[k++] = successRate
            str[k++] = '</td>'
            str[k++] = '<td class="addWord" style="width:165px;text-align:center">'
                str[k++] = '<div id="timePeriodCampaign'+idCampaign+'" value="'+timePeriod+'">'
                    str[k++] = timePeriod
                str[k++] = '</div>'
            str[k++] = '</td>'
            str[k++] = '<td class="addWord" style="width:100px;text-align:center">'
                str[k++] = '<div id="actionButton'+idCampaign+'" style="cursor:pointer" class="actionButton" value="'+idCampaign+'">'
                    str[k++] = '<img class="imgActionButton" width=16px height=16px id="imgActionButton'+idCampaign+'"  src="" style="opacity:0.5;display:inline-block;margin-bottom:1px">'
                str[k++] = '</div>'
            
            
            str[k++] = '</td>'
            str[k++] = '<td class="addWord" style="width:45px;text-align:center">'
                str[k++] = '<div class="close-btn6" style="display:block;float:none;opacity:0.6" id="closeBtnCampaign'+idCampaign+'">'
                str[k++] = '</div>'
                
                
                str[k++] = '<form action="'+$.general.prefix+'/deleteCampaign/" method = "post" id="deleteCampaignForm'+idCampaign+'">'
                    str[k++] = '<input style="display:none" name="csrfmiddlewaretoken" value="" id = "deleteCampaignInput'+idCampaign+'">'
                    str[k++] = '<input style="display:none" name="idCampaign" value="'+idCampaign+'" id = "" >'
                str[k++] = '</form>'
                str[k++] = $.fn.buildFillCampaignForm(idCampaign,1)
                str[k++] = '<form action="'+$.general.prefix+'/campaignAction/" method = "post" id="campaignActionForm'+idCampaign+'">'
                    str[k++] = '<input style="display:none" name="csrfmiddlewaretoken" value="" id = "campaignActionInput'+idCampaign+'">'
                    str[k++] = '<input style="display:none" name="idCampaign" value="'+idCampaign+'" id = "" >'
                str[k++] = '</form>'
                
                
                
            str[k++] = '</td>'
            
            
        str[k++] = '</tr>'
        
        
        return str.join('')
    }
})(jQuery);

