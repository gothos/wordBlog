(function ($) {
    $.fn.deleteSteps = function(){
        for(var i = 1,len=5;i<len;i++){
            $('#step'+i+'').children().remove()
            
        }
    }


    $.fn.returnToCampaignList = function(flag){
        
        $('#topHeaderAd').show()
        
        if (flag == 1){
            $('#menuCampaigns').show()
            $('#headerGuide').hide()
            
            $('#menuGuide').hide()
            $.fn.deleteSteps()
        }else{
            
            $('#myCampaignHeader').hide()
            $('tr[class="adMenu"]').not($('#mainMenu')).hide()
            $('#mainMenu').show()
            $('div[class="subcontent"]').not($('#menuCampaigns')).hide()
            $('#menuCampaigns').show()
            $.fn.deleteMenus()
            
            
            
        }
        $('#myCampaigns').css('opacity','0.4').css('cursor','default')
        $('#backArrow').unbind('click')
        $.fn.addBackArrowHandler()
    }


    $.fn.addReturnFromGuideHandler = function(){    
        $('#returnToMenuButton').click(function(){
            $.fn.returnToCampaignList(1)
        })
    }

    $.fn.insertInputFieldValues = function(){
        var divs = ['adNameFinish','adTypeFinish','adBudgetFinish','#adTitleFinish','#adDescription1Finish','adDescription2Finish','adUrl1Finish','#adUrl2Finish']
        var itemNames = ['Názov reklamy','Typ reklamy', 'Denný rozpočet','Titulok','Popisok 1.riadku','Popisok 2.riadku','Zobrazovaná adresa URL','Cieľová adresa URL']
        var basicFields = [$('#adName'),'' ,$('#adBudget'),$('#adTitle'),$('#adDescription1'),$('#adDescription2'),$('#adUrl1'),$('#adUrl2')]
        $('#finish tr').not('#headerFinish').remove() 
        for(var i = 0,len = basicFields.length;i<len;i++){
            if (i != 1){
                var value = basicFields[i].val()
            }else{
                var a = $('input[name="adType"]:checked').val()
                if (a < 3){
                    var value = $.gen.headers[0]
                    if (a == 1){
                        value = value + ' (Reklama v hornej časti)'
                    }else{
                        value = value + ' (Reklama v spodnej časti)'
                    }
                }else{
                    var value = $.gen.headers[1] + ' (Reklama v panely)'
                }
            }
            var k = 0
            var str = []
            
            str[k++] = '<tr>'
                str[k++] = '<td class="addWord">'
                    str[k++] = '<span>'
                        str[k++] = itemNames[i]
                    str[k++] = '</span>'
                str[k++] = '</td>'
                str[k++] = '<td class="addWord">'
                    str[k++] = '<div id="'+divs[i]+'">'
                        str[k++] = value
                    str[k++] = '</div>'
                str[k++] = '</td>'
            str[k++] = '</tr>'
            $('#finish').append(str.join(''))

        }
        $('#adBudgetFinish').append(' <span>&#128</span>')
        $('#chosenWordsFinish tr').not('#headerWordsFinish').remove()
        var k = 0
        var addon = []
        var table = document.getElementById("chosenWords");
        for (var i = 1, row; row = table.rows[i]; i++) {
            var m = 0;
            var str = []
            str[m++] = '<tr>'
                str[m++] =  '<td class="addWord">'
                    str[m++] = '<div>'
                        str[m++] = row.cells[1].firstChild.innerHTML
                    str[m++] = '</div>'
                str[m++] =  '</td>'
                str[m++] =  '<td class="addWord">'
                    str[m++] = '<div>'
                        str[m++] = row.cells[2].firstChild.innerHTML
                    str[m++] = '</div>'
                str[m++] =  '</td>'
                str[m++] =  '<td class="addWord">'
                    str[m++] = '<div>'
                        str[m++] = row.cells[3].firstChild.innerHTML
                    str[m++] = '</div>'
                str[m++] =  '</td>'
            str[m++] = '</tr>'
            addon[k++] = str.join('')
            
        }
        $('#chosenWordsFinish > tbody:last').append(addon.join('')) 
        
        
        
    }


    $.fn.buildStep4 = function(){
        var i = 0
        var addon = []
        addon[i++] = '<div style="margin-top:15px;font-size:16px">'
            addon[i++] = 'Zhrnutie'
        addon[i++] = '</div>'
        addon[i++] = "<div id='' class='err block' style='font-size:16px;margin-top:25px;margin-bottom:25px;padding-left:0px'>"
            addon[i++] = '<div id="succesfulCampaignCreation" style="display:none" class="adNotif">'
                addon[i++] = 'Kampaň bola úspešne vytvorená !'
                addon[i++] = '<span style="color:#444">'
                    addon[i++] = ' Prejsť na <span class="tyrkys" id ="returnFromCampaignCreation" style="color:blue;cursor:pointer;text-decoration: underline;">zoznam kampaní</span>'
                addon[i++] = '</span>'
            addon[i++] = '</div>'
        addon[i++] = "</div>"
        addon[i++] = '<table id="finish" cellpadding="0" cellspacing="0" border="0" style=";position:relative;margin-top:15px">'
            addon[i++] = '<tr id="headerFinish">'
                addon[i++] = '<th style="width:150px" class="addWord">'
                    addon[i++] = 'Položka'
                addon[i++] = '</th>'
                addon[i++] = '<th style="width:550px" class="addWord">'
                    addon[i++] = 'Vyplnený údaj'
                addon[i++] = '</th>'
            addon[i++] = '</tr>'
        addon[i++] = '</table>'
        
        
        
        addon[i++] = '<div id="helper4" class="helper" style="height:70px;top:240px;left:300px" >'
            addon[i++] = $.gen.cpc
        addon[i++] = '</div>'
        addon[i++] = '<div id="helper5" class="helper" style="height:30px;top:280px;" >'
            addon[i++] = $.gen.cpm   
        addon[i++] = '</div>'
        
        
        addon[i++] = '<table id="chosenWordsFinish" cellpadding="0" cellspacing="0" border="0" style=";position:relative;margin-top:25px;">'
            addon[i++] = '<tr id="headerWordsFinish">'
                addon[i++] = '<th class="addWord" style="width:350px;text-align:left" class="addWord">'
                    addon[i++] = 'Kľúčové slovo'
                addon[i++] = '</th>'
                addon[i++] = '<th class="addWord" style="width:90px;text-align:left" class="addWord">'
                    addon[i++] = '<span>CPC</span><span> (&#128)</span><span class="topBarInfo" style="height:10px;margin-left:8px" value="4">i</span>'
                addon[i++] = '</th>'
                addon[i++] = '<th class="addWord" style="width:140px;text-align:left" class="addWord">'
                    addon[i++] = '<span>CPM</span><span> (&#128)</span><span class="topBarInfo" style="height:10px;margin-left:8px" value="5">i</span>'
                addon[i++] = '</th>'
            addon[i++] = '</tr>'
        addon[i++] = '</table>' 

        $('#step4').append(addon.join(''))
            
    }


    $.fn.buildStep1 = function(sumOfCampaigns){
        var i = 0
        var addon = []
        addon[i++] = '<div style="position:relative;border:0px solid black" class="">'
            addon[i++] = '<div>'
                addon[i++] = '<input type="text" id="adName" name="name" maxlength="35" />'
            addon[i++] = '</div>'
            addon[i++] = '<span id="adNameSpan" class="plac" style="position:absolute;top:4px;left:8px">'
                addon[i++] = 'Názov reklamy'
            addon[i++] = '</span>'
            addon[i++] = "<div id ='errName' class ='block err' style=''>"
            addon[i++] = "</div>"
            addon[i++] = '<span id="countAdNameSpan" class="plac" style="position:absolute;top:4px;left:400px">'
                addon[i++] = 35
            addon[i++] = '</span>'
        addon[i++] = '</div>'
        addon[i++] = '<div style="margin-top:0px;border:0px solid red">'
            
            $.gen.headers = ['Reklama ako súčasť výsledkov','Reklama v postrannom panely']
            var content = ['Reklamný text je umiestnený v panely napravo od výsledkov vyhľadávania','Reklamný text je umiestnený v panely s výsledkami, a to buď v hornej alebo dolnej často podľa nastavenia v x.tom kroku.']
            var ids = ['adResults','adSidePanel']
            var numero = 2
            for(var z = 0,len=numero;z<len;z++){
                var k = 0
                var str = []
                str[k++] = '<div id="'+ids[z]+'" style="margin-top:25px">'
                    str[k++] =  '<div style="font-size:16px">'
                        str[k++] = $.gen.headers[z]
                    str[k++] = '</div>'
                    str[k++] = '<table id="" cellpadding="0" cellspacing="0" border="0" style=";font-size:12px;margin-top:15px;">'
                        str[k++] = '<tr style="width:200px">'
                            str[k++] = '<td style="vertical-align:top">'
                                str[k++] = '<div style="word-wrap: break-word;width:400px;text-align:justify;line-height:18px">'
                                    str[k++] = content[z]
                                    str[k++] = '<br>'
                                    str[k++] = 'Viac informácií.'
                                str[k++] = '</div>'
                                str[k++] = '<table id="" cellpadding="0" cellspacing="0" border="0" style=";font-size:12px;vertical-align:top;margin-left:15px;margin-top:5px">'
                                    if (z == 0){
                                        str[k++] = '<tr>'
                                            str[k++] = '<td style="">'
                                                str[k++] = '<input type="radio" name="adType" value="1" style="" checked>'
                                            str[k++] = '</td>'
                                            str[k++] = '<td style="padding-top:4px">'
                                                str[k++] = 'Reklama v hornej časti'
                                            str[k++] = '</td>'
                                        str[k++] = '</tr>'
                                        
                                        str[k++] = '<tr>'
                                            str[k++] = '<td >'
                                                str[k++] = '<input type="radio" name="adType" value="2" style="">'
                                            str[k++] = '</td>'
                                            str[k++] = '<td style="padding-top:4px">'
                                                str[k++] = 'Reklama v spodnej časti'
                                            str[k++] = '</td>'
                                        str[k++] = '</tr>'
                                    }
                                    if (z == 1){
                                        str[k++] = '<tr>'
                                            str[k++] = '<td style="">'
                                                str[k++] = '<input type="radio" name="adType" value="3" style="">'
                                            str[k++] = '</td>'
                                            str[k++] = '<td style="padding-top:4px">'
                                                str[k++] = 'Reklama v panely'
                                            str[k++] = '</td>'
                                        str[k++] = '</tr>'
                                    }
                                    
                                    
                                str[k++] = '</table>'
                            str[k++] = '</td>'
                            str[k++] = '<td>'
                                str[k++] = '<div style="border:1px solid #cccccc;height:80px;width:80px;margin-left:35px;">'
                                str[k++] = '</div>'
                            str[k++] = '</td>'
                        str[k++] = '</tr>'
                    str[k++] = '</table>'
                str[k++] = '</div>'
                addon[i++] = str.join('')
                
            }
            

        addon[i++] = '</div>'
        addon[i++] = '<div style="position:relative;margin-top:30px">'
            addon[i++] = '<div>'
                addon[i++] = '<input type="text" id="adBudget" name="budget" maxlength="6" />'
            addon[i++] = '</div>'
            addon[i++] = '<span id="adBudgetSpan" class="plac" style="position:absolute;top:4px;left:9px">'
                addon[i++] = 'Denný rozpočet'
            addon[i++] = '</span>'
            addon[i++] = "<div id ='errBudget' class ='block err' style=''>"
            addon[i++] = "</div>"
            addon[i++] = '<span id="characterAdBudgetSpan" class="plac" style="position:absolute;top:4px;left:130px">'
                addon[i++] = '&#128'
            addon[i++] = '</span>'
                                                
        addon[i++] = '</div>'
        $('#step1').append(addon.join(''))
        $.fn.addFadeOutSpanHandler($('#adName'),$('#adNameSpan'),1,$('#countAdNameSpan'));
        $.fn.addFadeOutSpanHandler($('#adBudget'),$('#adBudgetSpan'))
        
        var fields = [$('#adName'),$('#adBudget')]
        var errFields = [$('#errName'),$('#errBudget')]
        var params = [3,1]
        for(var i = 0,len = fields.length;i<len;i++){

            $.fn.addFocusFieldsHandler(fields[i],params[i],errFields[i])

        }
        $('input[name="adType"]').click(function(){
            var value = $(this).val()
            
            $.fn.changePreview(value)

        })
        
        var numo = sumOfCampaigns + 1
        var str = 'Kampaň č.'+numo+''
        $('#adName').attr('value',str)
        $('#adNameSpan').hide()
        
        
    }

    $.fn.addStartCampaignCreationHandler = function(sumOfCampaigns){
        $('#createCampaignButton').click(function(){
            $.fn.deleteSteps()
            $.gen.curPage = 1
            $.fn.checkNavButtons()
            $.fn.changeOpacityOnSelected($('#stepButton1'))
            $('#finishCampaignCreationButton').css('cursor','pointer')
            $('#finishCampaignCreationButton').prop('disabled',false)
            
            $('div[class="stepContent"]').not('#step1').hide()
            
            $('#step1').show()
            $('#topHeaderAd').hide()
            $('#headerGuide').show()
            //$('#menu').hide()
            $('div[class="subcontent"]').hide()
            $('#menuGuide').show()
            $('#backArrow').unbind('click')
            $('#backArrow').click(function(){
                $.fn.returnToCampaignList(1)
            })
            $.fn.buildStep1(sumOfCampaigns)
            $.fn.fillCampaignContent($('#step2'),$('#step3'),0)
            
            $.fn.buildStep4()
        })
    }




    $.fn.checkStepDistance = function(a,b){
        var c = a-b
        if (c == 1){
            return 1
        }else{
            return 0
        }
    }

    $.fn.checkNavButtons = function(){
        if ($.gen.curPage < $.gen.pages){
            $('#nextStep').css('display','inline-block')
            $('#finishCampaignCreationButton').hide()
        }
        if ($.gen.curPage == $.gen.pages){
            $('#nextStep').hide()
            $('#finishCampaignCreationButton').show()
        }
        if ($.gen.curPage == 1){
            $('#returnToMenuButton').show()
            $('#prevStep').hide()
        }
        if ($.gen.curPage > 1){
            $('#returnToMenuButton').hide()
            $('#prevStep').css('display','inline-block')
        }
        

    }



    $.fn.changeOpacityOnSelected = function(selector){
        selector.css('color','#444')
        selector.css('cursor','default')
        
        $("div[class='steps']").not(selector).css('cursor','pointer')
        $("div[class='steps']").css('opacity','1.0')

        var value1 = $.gen.curPage + 2
        $('#stepButton'+value1+'').css('opacity','0.6').css('cursor','default')
        
        var value2 = $.gen.curPage + 3
        $('#stepButton'+value2+'').css('opacity','0.6').css('cursor','default')
        $("div[class='steps']").not(selector).css('color','')

    }

    $.fn.addTopNavigation = function(){
        
        $("div[class='steps']").click(function(){
            var value = $(this).attr('value')
            if ((value < $.gen.curPage) || (value > $.gen.curPage && $.fn.checkStepDistance(value,$.gen.curPage) == 1 && $.fn.checkStep() == 1)){
                
                
                $("div[class='stepContent']").hide()
                $.gen.curPage = parseInt(value)
                $('#step'+value+'').show()
                
                $.fn.changeOpacityOnSelected($(this))
                                    
                $.fn.checkNavButtons()
                if ($.gen.curPage == 4){
                    $.fn.insertInputFieldValues()
                }
            }
        })
    }



    $.fn.checkStep = function(){
        if ($.gen.curPage == 1){
            return 1
            $.checked.AdName = 0
            
            if ($.fn.checkField($('#adName'),$('#errName'),3) == 1){
                $.checked.adName = 1
            }
            
            $.checked.adBudget = 0
            if ($.fn.checkField($('#adBudget'),$('#errBudget'),1) == 1){
                $.checked.adBudget = 1
            }
            if ($.checked.adName == 1 && $.checked.adBudget == 1){
            
            return 1
            
            }else{

                return 0
            }
                 
                      
            
        }
        if ($.gen.curPage == 2){
            return 1
            $.checked.adTitle = 0
            $.checked.adDescription1 = 0
            $.checked.adDescription2 = 0
            $.checked.adUrl1 = 0
            var checkFields = [$.checked.adTitle,$.checked.adDescription1,$.checked.adDescription2,$.checked.adUrl1]
            
            
            var inputFields = [$('#adTitle'),$('#adDescription1'),$('#adDescription2'),$('#adUrl1')]
            var errFields = [$('#errTitle'),$('#errDescription1'),$('#errDescription2'),$('#errUrl1')]
            
            var k = 0
            for (var i = 0,len = checkFields.length;i<len;i++){
                
                if ($.fn.checkField(inputFields[i],errFields[i],0) == 1){
                    checkFields[i] = 1;
                    k = k + 1
                    
                }
                
                
            }
            if ($.gen.flag == 1){
                k = k + 1
            }
            if (k == (checkFields.length + 1)){
                return 1
            }else{
                return 0
            }
        
        
        
        }
        
        if ($.gen.curPage == 3){
            return 1
            var value = $('#chosenWords tr').length;
            
            if (value > 1){
                $('#errKeyword').text('')
                return 1
            }else{
                $('#errKeyword').text('Je potrebné pridať aspoň 1 kľúčové slovo')
                return 0
            } 
            
        }
        if ($.gen.curPage == 4){
            return 1;
        }
        
    }





    $.fn.addPreviousStepHandler = function(){
        $('#prevStep').click(function(){
            if ($.gen.curPage > 1){
                $.gen.curPage = $.gen.curPage - 1
                $('div[class="stepContent"').hide()
                $('#step'+$.gen.curPage+'').show()
                $.fn.checkNavButtons()
                $.fn.checkStepButtons()
                
            }
            
            
        })
    }

    $.fn.checkStepButtons = function(){
       
        var value = $.gen.curPage
        
        var selector = $('#stepButton'+value+'')
        
        $.fn.changeOpacityOnSelected(selector)
        


    } 



    $.fn.addNextStepHandler = function(){
        $('#nextStep').click(function(){
            
            if ($.fn.checkStep() == 1){
        
                if ($.gen.curPage < $.gen.pages){
                    $.gen.curPage = $.gen.curPage + 1
                    $('div[class="stepContent"').hide()
                    $('#step'+$.gen.curPage+'').show()
                    
                    $.fn.checkNavButtons()
                    $.fn.checkStepButtons()
                    
                    if ($.gen.curPage == 4){
                        $.fn.insertInputFieldValues()
                    }

                }
                
            }
            
        })
    }



    $.fn.buildGuide =function(sumOfCampaigns){
        var i = 0
        var addon = []
        addon[i++] = '<table id="outerDiv" cellpadding="5" cellspacing="" border="0" style=";position:relative;">'
            addon[i++] = '<tr>'
                var numero = $.gen.pages + 1
                for(var z = 1,len=numero;z<len;z++){
                    if (z == 1){
                        var color = '#444'
                        var cursor = 'default'
                    }else{
                        var color = ''
                    }
                    if (z == 2){
                        var cursor = 'pointer'
                    }
                    if (z > 2){
                        var opacity = '0.6'
                        var cursor = 'default'
                    }else{
                        var opacity = '1.0'
                        
                    }
                    var k = 0
                    var str = []
                
                
                    str[k++] = '<td style="" >'
                        str[k++] = '<div id="stepButton'+z+'" class="steps" value="'+z+'" style="opacity:'+opacity+';color:'+color+';cursor:'+cursor+'">'
                            str[k++]  = ''+z+'.krok'
                        str[k++]  = '</div>'
                    str[k++] = '</td>'
                    if (z != $.gen.pages ){
                        str[k++] = '<td style="horizontal-align:left ">'
                            str[k++] = '<img  src="/static/ChevronOverlay.png" style="border:0px solid black">'  
                        str[k++] = '</td>'
                    }
                    addon[i++] = str.join('')
                
                }                                
                

            addon[i++] = '</tr>'
        addon[i++] = '</table>'
        addon[i++] = '<div style="min-height:100px;border: 0px solid red;margin-top:15px;">'
            
            addon[i++] = '<form id="createCampaignForm" action= "'+$.general.prefix+'/createCampaign/" method="post">'
                addon[i++] = "<input style='display:none' name='keywordIDs' value='' id ='keywordIDsInput'>"
                addon[i++] = "<input style='display:none' name='csrfmiddlewaretoken' value='' id ='createCampaignInput'>"
                for (var k = 1,len= 5;k < len;k++){
                    if (k == 1){
                        var display = 'block'
                    }else{
                        var display = 'none'
                    }
                    addon[i++] = '<div id="step'+k+'" style="border:0px solid black;min-height:100px;display:'+display+'" class="stepContent">'
                    addon[i++] = '</div>'    
                }
            addon[i++] = '</div>'
        addon[i++] = '</form>'
        addon[i++] = '<form id="onlineValidateUrlForm" action= "'+$.general.prefix+'/onlineValidateUrl/" method="post">'
            addon[i++] = "<input style='display:none' name='csrfmiddlewaretoken' value='' id ='onlineValidateUrlInput'>"
            addon[i++] = "<input style='display:none' name='url' value='' id ='urlInput'>"
        addon[i++] = '</form>'    
        addon[i++] = '<div id="butPanelo" style="width:766px;border:1px solid black;height:30px;width:100%;margin-top:25px">'
            addon[i++] = '<input id="returnToMenuButton" type="button" class="s" value="Návrat do menu" style="float:left;width:120px">'
            addon[i++] = '<input id="prevStep" type="button" class="s" value="Predchádzajúci krok" style="display:none;float:left;width:140px">'
            addon[i++] = '<input id="nextStep" type="button" class="s" value="Ďalší krok" style="position:absolute;right:0;width:90px">'
            addon[i++] = '<input id="finishCampaignCreationButton" type="button" class="s" value="Dokončiť vytváranie" style="display:none;position:absolute;right:0;;width:135px">'
        addon[i++] = '</div>'
        $('#menuGuide').append(addon.join(''))
        
        $.fn.addNextStepHandler()
        $.fn.addPreviousStepHandler()
        $.fn.addTopNavigation()
        $.fn.addStartCampaignCreationHandler(sumOfCampaigns)
        $.fn.addFinishCampaignCreationHandler()
        $.fn.addReturnFromGuideHandler()
      
    }
})(jQuery);





