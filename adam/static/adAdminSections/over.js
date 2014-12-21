(function ($) {
    $.fn.addOverNavigationDivClickHandler = function(){
        $('div[class="overNavigationDiv"]').click(function(){
        
            var value=$(this).attr('value')
            if (value == '1' && $.gen.curOver == 1){
                return
            }
            if (value == '2' && $.gen.curOver == $.gen.extentOver){
                return
            }
            
            if (value == '1'){
                $.gen.curOver = $.gen.curOver - 1
                $.gen.fromOver = $.gen.fromOver - 5
                var valo = $('#over > tbody:last tr').length
                $.gen.toOver = $.gen.toOver - valo 
                
                
                
            }else{
                
                $.gen.curOver = $.gen.curOver + 1
                $.gen.fromOver = $.gen.fromOver + 5
                if (($.gen.toOver + 5) > $.gen.sumOver){
                    $.gen.toOver = $.gen.sumOver
                }else{
                    $.gen.toOver = $.gen.toOver + 5
                }

            }
            $('#fromOver').text($.gen.fromOver)
            $('#toOver').text($.gen.toOver)
            $.fn.getResults(1)
            $.fn.checkPagesNavigators(3)

            
        })
    }


    $.fn.buildEditCampaignOver = function(idCampaign){
        
        
        var value = parseInt($('#statusCampaign'+idCampaign+'').attr('value'))
        
        var i = 0
        var addon = []
        if ($.gen.actionButtonEnabled == 0){
            addon[i++] = '<div id="warningDiv" style="margin-bottom:15px" class="block err">'
                addon[i++] = 'Kampaň budete môcť spusiť až uhradíte posledne Vám vystavenú faktúru'
            addon[i++] = '</div>'
        }
        addon[i++] = $.fn.buildStatusOverTable(idCampaign,1,value)
        addon[i++] = $.fn.buildNavigationPanel(1)
        addon[i++] = $.fn.buildOverTable(1)
        $('#menuOver').children().remove()
        $('#menuOver').append(addon.join(''))
        $.fn.addSelectSuccRateHandler(1)
        $.fn.addActionButtonHandler(1);
        if ($.gen.actionButtonEnabled == 1){
            $.fn.addHoveringEffect($('#imgActionButtonOver'+idCampaign+''),'0.5')
        }
        
        var L = $.fn.giveMeColor(value)
        
        var img = L[0]
        var color = L[1]
        
        $('#tdStatusCampaignOver'+idCampaign+'').css('background-color',color)
        $('#imgActionButtonOver'+idCampaign+'').attr('src','/static/'+img+'.jpg')
        
        
        $.fn.addOverNavigationDivClickHandler()
        

        
        
        $.fn.addNavigationDivHoveringEffect(2)
        
        
    }


    $.fn.buildOverRecord = function(idWord,name,sumOfViews,sumOfClicks,successRate){
        
        var n = 0
        var addon = []
        addon[n++] = '<tr id="keyword_'+idWord+'">'
        
            addon[n++] = '<td class="addWord">'
                addon[n++] = '<div>'
                    addon[n++] = name
                addon[n++] = '</div>'
            addon[n++] = '</td>'
            addon[n++] = '<td class="addWord">'
                addon[n++] = '<div>'
                    if (sumOfClicks == null){
                        sumOfClicks = 0
                    }
                    
                
                    addon[n++] = sumOfClicks
                addon[n++] = '</div>'
            addon[n++] = '</td>'
            addon[n++] = '<td class="addWord">'
                addon[n++] = '<div>'
                    if (sumOfViews == null){
                        sumOfViews = 0
                    }
                    addon[n++] = sumOfViews
                addon[n++] = '</div>'
            addon[n++] = '</td>'
            addon[n++] = '<td class="addWord">'
                addon[n++] = '<div>'
                    addon[n++] = successRate
                addon[n++] = '</div>'
            addon[n++] = '</td>'
            
        addon[n++] = '</tr>'

        $('#over > tbody:last').append(addon.join(''))

    }



    $.fn.resetOver = function(len,flag){
        if (flag == 1){
            $("#selectSuccRateOver option").prop('selected',false)
            $("#selectSuccRateOver option[value='1']").prop('selected',true);
        }
        $.gen.fromOver = 1
        $.gen.sumOver = len

            
        $.gen.extentOver = Math.ceil(($.gen.sumOver/5))
        $.gen.curOver = 1
        if ($.gen.extentOver > 1){
            $.gen.toOver = 5
        }else{
            $.gen.toOver = $.gen.sumOver
        }
         
        $('#totalSumOver').text($.gen.sumOver)
        $('#fromOver').text($.gen.fromOver)
        $('#toOver').text($.gen.toOver)
    }



    $.fn.buildOverTable = function(flag){
        if (flag == 1){
            var names = ['Slovo','Suma kliknutí','Suma zobrazení']
        }else{
            var names = ['Word','Sum of clicks','Sum of views']
        }
        var i = 0
        var addon = []
        addon[i++] = '<table id="over" cellpadding="0" cellspacing="0" border="0" style=";position:relative;border: 0px double #ddd;margin-top:25px">'
            addon[i++] = '<thead>'
                addon[i++] = '<tr id="overHeader">'
                    addon[i++] = '<th class="addWord" style="width:240px;text-align:left">'
                        addon[i++] = '<div style="height:23px;line-height:23px">'
                            addon[i++] = names[0]
                        addon[i++] = '</div>'
                    addon[i++] = '</th>'
                    addon[i++] = '<th class="addWord" style="width:120px;text-align:left">'
                        addon[i++] = '<div style="height:23px;line-height:23px">'
                            addon[i++] = names[1]
                        addon[i++] = '</div>'
                    addon[i++] = '</th>'
                    addon[i++] = '<th class="addWord" style="width:120px;">'
                        addon[i++] = '<div style="height:23px;line-height:23px">'
                            addon[i++] = names[2]
                        addon[i++] = '</div>'
                    addon[i++] = '</th>'
                    addon[i++] = $.fn.buildSuccRateTh('Over',flag)   
                addon[i++] = '</tr>'
            addon[i++] = '</thead>'
            addon[i++] = '<tbody>'
            addon[i++] = '</tbody>'
            addon[i++] = '<tfoot>'
                
            addon[i++] = '</tfoot>'
        addon[i++] = '</table>'
        return addon.join('')
    }



    $.fn.buildStatusOverTable = function(idCampaign,flag,value){
        var i = 0
        var addon = []
        
        var statusText = $.fn.giveMeStatus(value,flag)
        
        var timePeriod = $('#timePeriodCampaign'+idCampaign).attr('value')
        if (flag == 1){
            var names = ['Stav','Suma dní trvania kampane']
        }else{
            var names = ['Status','Sum of days of duration']
        }
        addon[i++] = '<table id="statusOver" cellpadding="0" cellspacing="0" border="0" style=";position:relative">'
            addon[i++] = '<tr>'
                addon[i++] = '<th class="addWord" style="width:80px">'
                    addon[i++] = '<div>'
                        addon[i++] = names[0]
                    addon[i++] = '</div>'
                addon[i++] = '</th>'
                
                addon[i++] = '<th class="addWord" style="width:150px;text-align:left">'
                    addon[i++] = '<div>'
                        addon[i++] = names[1]
                    addon[i++] = '</div>'

                addon[i++] = '</th>'
                
                if (flag == 1){
                    addon[i++] = '<th class="addWord" style="width:100px">'
                        addon[i++] = '<div>'
                            addon[i++] = 'Akcia'
                        addon[i++] = '</div>'
                    addon[i++] = '</th>'
                }
            addon[i++] = '</tr>'
            addon[i++] = '<tr>'
                addon[i++] = '<td class="addWord" id="tdStatusCampaignOver'+idCampaign+'" style="height:34px">'
                    addon[i++] = '<div id="statusCampaignOver'+idCampaign+'" style="cursor:default">'
                        addon[i++] = statusText   
                    addon[i++] = '</div>'
                addon[i++] = '</td>'
                addon[i++] = '<td class="addWord" style="width:165px;text-alig:center">'
                    addon[i++] = '<div id="timePeriodCampaignOver'+idCampaign+'">'
                        addon[i++] = timePeriod
                    addon[i++] = '</div>'
                addon[i++] = '</td>'
                if (flag == 1){
                    addon[i++] = '<td class="addWord" style="text-align:center;height:34px">'
                        addon[i++] = '<div id="actionButtonOver'+idCampaign+'" class="actionButtonOver" value="'+idCampaign+'" style="cursor:pointer">'
                            addon[i++] = '<img id="imgActionButtonOver'+idCampaign+'" height="16px" width="16px"  src="" style="display:inline-block;margin-bottom:1px;opacity:0.5">'
                        addon[i++] = '</div>'
                    addon[i++] = '</td>'
                }
            addon[i++] = '</tr>'
        addon[i++] = '</table>'
        return addon.join('')

    }
})(jQuery);
