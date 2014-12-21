(function ($) {
    
    
    $.fn.checkBillingInfoIsComplete = function(billingInfoDic){
        
        
        if (billingInfoDic != 0 ){
            $.gen.isBillingInfo = 1
            $('#billingInfoCompleteDiv').show()
            $('#billingInfoMissingDiv').hide()
        }else{
            $.gen.isBillingInfo = 0
        }
    
    }
    
    $.fn.addSwitchMenuHandler = function(){    
        $('div[class="menu"]').click(function(){
            $('div[class="menu"]').not(this).css('opacity','1.0').css('cursor','pointer')
            $(this).css('opacity','0.4').css('cursor','default')

            var menus = [$('#menuCampaigns'),$('#menuBilling'),$('#menuOver'),$('#menuStat'),$('#menuAddKeyword'),$('#menuAdDescription'),$('#menuBudget'),$('#menuCPCs'),$('#menuBills'),]
            
            for (var k = 1,len = menus.length + 1; k < len; k++){
                if ($(this).attr('value') == 1){
                    if ($.gen.isBillingInfo == 1){
                        $('#billingInfoCompleteDiv').show()
                        $('#billingInfoMissingDiv').hide()
                    }else{
                        $('#billingInfoCompleteDiv').hide()
                        $('#billingInfoMissingDiv').show()
                    }
                }
                
                if ($(this).attr('value') == k){
                    var selector = menus[k-1]
                }
                
                
            }
            
            
            
            selector.show()
            $('div[class="subcontent"]').not(selector).hide()
            
        })
    }


    $.fn.buildHeaders = function(){
        var i = 0
        var addon = []
        addon[i++] = '<div style="border-bottom:1px solid #e5e5e5;border-top:1px solid #e5e5e5;" >'
            addon[i++] = '<table id="outerDiv" cellpadding="0" cellspacing="0" border="0" style=";position:relative;height:35px">'
                
                addon[i++] = '<tr id="mainMenu" class="adMenu">'
                    addon[i++] = '<td style="width:150px">'
                        addon[i++] = '<div id = "myCampaigns" class="menu" style="opacity:0.4;cursor:default" value=1>'
                            addon[i++] = 'Moje kampane'
                        addon[i++] = '</div>'
                    addon[i++] = '</td>'
                    addon[i++] = '<td style="width:160px;">'
                        addon[i++] = '<div id = "billingInfoData" class="menu" value=2 style="">'
                            addon[i++] = 'Fakturačné údaje'
                        addon[i++] = '</div>'
                    addon[i++] = '</td>'
                    addon[i++] = '<td style="width:110px;">'
                        addon[i++] = '<div id = "bills" class="menu" value=9 style="">'
                            addon[i++] = 'Faktúry'
                        addon[i++] = '</div>'
                    addon[i++] = '</td>'
                addon[i++] = '</tr>'
                addon[i++] = $.fn.buildCampaignHeaders(1)
                
            addon[i++] = '</table>'
        addon[i++] = '</div>'
        return addon.join('')


    }

    $.fn.buildAd = function(bills,campaigns,billingInfoDic,billingInfoId){
        console.log('3',billingInfoDic)
        var i = 0
        var addon = []
        addon[i++] = "<div id='' style='border:1px solid red;display:block;width:100%;height:100%;'>"
            addon[i++] = "<div id='topLDiv' style='border:1px solid black;margin:25px;height:25px;line-height:25px'>"
                addon[i++] = "<div id='headerGuide' style='display:none;font-size:18px;border:1px solid red' class='header'>"
                    addon[i++] = "Sprievodca vytvorením reklamy"
                addon[i++] = "</div>"
                addon[i++] = "<div id='topHeaderAd' style='display:block;font-size:18px;border:1px solid red' class='header'>"
                    addon[i++] = "Reklama"
                addon[i++] = "</div>"
                addon[i++] = "<div id='myCampaignHeader' style='display:none;font-size:18px;border:1px solid red' class='header'>"
                addon[i++] = "</div>"
            addon[i++] = "</div>"
            addon[i++] = "<div class='contento' style=';border:1px solid black;background-color:white;display:block;margin-bottom:25px;min-height:500px;position:relative'>"
                    addon[i++] = '<div id="arrows" style="border:1px solid black;height:38px">'
                        addon[i++] = '<img src="/static/imas.jpg" height="38px" class="rotate90" id="backArrow">'
                    addon[i++] = '</div>'
                addon[i++] = "<div id='menu' style='display:block;'>"
                    
                    addon[i++] = $.fn.buildHeaders()

                    
                    addon[i++] = '<div id="subcontent" style="margin-top:25px">'
                        var k = 0
                        var str = []
                        var menuTabs = ['menuAddKeyword','menuStat','menuAdDescription','menuOver','menuBudget','menuCPCs','menuBills','menuCampaigns','menuBilling','menuGuide']
                        
                        for (var j = 0,len=menuTabs.length;j<len;j++){
                            if (j == 7){
                                var add = 'block'
                            }else{
                                var add = 'none'
                            }
                            str[k++] = '<div id = "'+menuTabs[j]+'" style=";display:'+add+';" class="subcontent">'
                            str[k++] = '</div>'
                        }
                        addon[i++] = str.join('')

                        
                        
                        
                    addon[i++] = '</div>'
                addon[i++] = "</div>"
            addon[i++] = "</div>"
        addon[i++] = "</div>"

        $('#maina').append(addon.join(''))
        
        
        
        $.fn.buildBills(bills,0)
        var campaigns = $.parseJSON(campaigns);
        $.fn.buildCampaigns(campaigns)
        $.fn.buildBilling(billingInfoDic,billingInfoId)
        $.fn.buildGuide(campaigns.length)
        $.fn.checkBillingInfoIsComplete(billingInfoDic)
        $.fn.addSwitchMenuHandler()
        $.fn.addBackArrowHandler()         

        
        
               
        


        
    }
})(jQuery);
