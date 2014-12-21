(function ($) {
    $.fn.buildEditCampaignDescription = function(areaDescription,idCampaign){

        var i = 0
        var addon = []

        var itemIDs = ['Title','Description1','Description2','Url1','Url2']
        var itemNames = ['Titulok','Popisok 1.riadku','Popisok 2.riadku','Zobrazovaná adresa URL','Cieľová adresa URL'] 
        
        var nums = [35,70,70,35,1024]
        var numero = itemIDs.length
        if (idCampaign != 0){
            addon[i++] = '<form method="post" action="'+$.general.prefix+'/saveDescriptionChanges/" id="saveDescriptionChangesForm'+idCampaign+'">'
                addon[i++] = '<input style="display:none" name="csrfmiddlewaretoken" value="" id = "saveDescriptionChangesInput'+idCampaign+'">'
                addon[i++] = '<input style="display:none" name="idCampaign" value="'+idCampaign+'" id = "" >'
        }
        for(var z = 0,len=numero;z<len;z++){
            var k = 0
            var str = []
            
            str[k++] = '<div id= "ad'+itemIDs[z]+'Div" style="position:relative;border:0px solid black" class="inpFSpace">'
                
                str[k++] = '<div >'
                    str[k++] = '<input type="text" id="ad'+itemIDs[z]+'" name="'+itemIDs[z].toLowerCase()+'" maxlength="'+nums[z]+'" />'
                str[k++] = '</div>'
                str[k++] = '<span id="ad'+itemIDs[z]+'Span" class="plac" style="position:absolute;top:4px;left:9px">'
                    str[k++] = itemNames[z]
                str[k++] = '</span>'
                str[k++] = "<div id ='err"+itemIDs[z]+"' class ='block err' style=''>"
                str[k++] = "</div>"
                str[k++] = '<span id="countAd'+itemIDs[z]+'Span" class="plac" style="position:absolute;top:4px;left:700px">'
                    str[k++] = nums[z]
                str[k++] = '</span>'
                if (z == 4){
                    str[k++] = '<span id="gifSpan" class="plac" style="position:absolute;top:6px;left:445px">'
                        str[k++] = '<img id="gifImg">'
                    str[k++] = '</span>'    
                }
                
            str[k++] = '</div>'
            addon[i++] = str.join('')   
            
            
        }
        addon[i++] = '<div value="0" id="previewDiv">'
        addon[i++] = '</div>'    
            
        if (idCampaign != 0){
            addon[i++] = '</form>'
            addon[i++] = '<div style="border:1px solid black;height:30px;margin-top:25px">'
                addon[i++] = '<input id="saveDescription" type="button" class="s" style="width:100px;margin-left:400px;cursor:default" value="Uložiť zmeny" disabled>'
            addon[i++] = '</div>'
        }
        
        areaDescription.append(addon.join(''))
        
        $.fn.addFadeOutSpanHandler($('#adTitle'),$('#adTitleSpan'),1,$('#countAdTitleSpan'),1);
        $.fn.addFadeOutSpanHandler($('#adDescription1'),$('#adDescription1Span'),5,$('#countAdDescription1Span'),2);
        $.fn.addFadeOutSpanHandler($('#adDescription2'),$('#adDescription2Span'),5,$('#countAdDescription2Span'),3);
        $.fn.addFadeOutSpanHandler($('#adUrl1'),$('#adUrl1Span'),1,$('#countAdUrl1Span'),4);
        $.fn.addFadeOutSpanHandler($('#adUrl2'),$('#adUrl2Span'),3,$('#countAdUrl2Span'));
        
        
        $.gen.basicFields = [$('#adTitle'),$('#adDescription1'),$('#adDescription2'),$('#adUrl1'),$('#adUrl2')]
        var errFields = [$('#errTitle'),$('#errDescription1'),$('#errDescription2'),$('#errUrl1'),$('#errUrl2')]
        var params = [0,0,0,0,2]
        for(var i = 0,len = $.gen.basicFields.length;i<len;i++){

            $.fn.addFocusFieldsHandler($.gen.basicFields[i],params[i],errFields[i])

        }
        if (idCampaign != 0){
            $.fn.addSaveDescriptionHandler(idCampaign)
        }
        
        
    }
    $.fn.insertDescriptionData = function(dataFields){
        var descriptionFields = ['adTitle','adDescription1','adDescription2','adUrl1','adUrl2','adBudget']
        
        for (var k = 0,len=dataFields.length;k<len;k++){
            $('#'+descriptionFields[k]+'').val(dataFields[k])
            $('#'+descriptionFields[k]+'Span').hide()
            
            if (k < 5){
                var button = $('#saveDescription')
            }
            else{
                var button = $('#saveBudget')
            }
            
            $.fn.enableBut(descriptionFields[k],button)                  
            
        }
    }
})(jQuery);
