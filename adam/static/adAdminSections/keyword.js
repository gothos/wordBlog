(function ($) {
    $.fn.enDisAddKeywordBut = function(){
        $('#adKeyword').on('input change keyup paste',function(){
            if ($.trim($('#adKeyword').val()).length > 0){
                $('#addWordBut').prop('disabled',false)
                $('#addWordBut').css('cursor','pointer')
            }else{
                $('#addWordBut').prop('disabled',true)
                $('#addWordBut').css('cursor','default')
            }
        })
    }

    $.fn.buildEditCampaignKeyword = function(areaKeyword,idCampaign){
        
        var i = 0
        var addon = []
        if (idCampaign != 0){
            addon[i++] = '<form id="saveKeywordsChangesForm'+idCampaign+'" action= "'+$.general.prefix+'/saveKeywordsChanges/" method="post">'
                addon[i++] = "<input style='display:none' name='keywordIDs' value='' id ='saveKeywordsChangesIDsInput"+idCampaign+"'>"
                addon[i++] = '<input style="display:none" name="idCampaign" value="'+idCampaign+'" id = "" >'
                addon[i++] = "<input style='display:none' name='csrfmiddlewaretoken' value='' id ='saveKeywordsInput'>"
        }
                addon[i++] = '<div style="position:relative;border:0px solid black">'
                    addon[i++] = '<div>'
                        addon[i++] = '<input type="text" id="adKeyword" maxlength="35" style="padding-right:255px" >'
                    addon[i++] = '</div>'
                    addon[i++] = '<span id="adKeywordSpan" class="plac" style="position:absolute;top:4px;left:9px">'
                        addon[i++] = 'Kľúčové slovo alebo fráza'
                    addon[i++] = '</span>'
                    addon[i++] = '<span id="countAdKeywordSpan" class="plac" style="position:absolute;top:4px;left:400px">'
                        addon[i++] = 35
                    addon[i++] = '</span>'
                    addon[i++] = '<div id="butPanel" style="width:200px;border:1px solid black;height:28px;position:absolute;top:0px;left:450px">'
                        addon[i++] = '<input id="addWordBut" type="button" class = "s" value="Pridať slovo" style="width:110px;height:28px;cursor:default" disabled>'
                    addon[i++] = '</div>'
                    
                   
                addon[i++] = '</div>'
                
                
                addon[i++] = '<div id="errKeyword" class="block err" style="border:1px solid red">'
                addon[i++] = '</div>'
                addon[i++] = '<div>'
                    addon[i++] = '<div>'
                        addon[i++] = 'Podobné slová'
                    addon[i++] = '</div>'
                    addon[i++] = '<div id="possibleSuggestions" style="height:64px;width:100%;border:1px solid black;">'
                    addon[i++] = '</div>'
                addon[i++] = '</div>'
                
                
                
                addon[i++] = '<div id="keywordContent" style="position:relative;width:766px;min-height:280px;border:1px solid red;padding-top:0px;padding-bottom:0px;margin-top:15px;font-size:13px">'

                    addon[i++] = '<div id="helper2" class="helper" style="height:70px;top:-88px;left:490px" >'
                        addon[i++] = $.gen.cpc
                    addon[i++] = '</div>'
                    addon[i++] = '<div id="helper3" class="helper" style="height:30px;top:-45px;right:10px" >'
                        addon[i++] = $.gen.cpm   
                    addon[i++] = '</div>'
                    
                    
                    
                    addon[i++] = '<table id="chosenWords" cellpadding="0" cellspacing="0" border="0" style="position:relative;font-size:12px;border: 1px double #ddd;">'
                        
                        addon[i++] = '<tr >'
                        
                            addon[i++] = '<th class="addWord" style="width:60px;text-align:left;">'
                            addon[i++] = '</th>'
                            addon[i++] = $.fn.buildChosenWordsTableCore(1)
                            addon[i++] = '<th class="addWord" style="width:45px;text-align:left">'
                            addon[i++] = '</th>'
                        addon[i++] = '</tr>'
                    addon[i++] = '</table>'
                addon[i++] = '</div>'
        if (idCampaign != 0){
            addon[i++] = '</form>'
            addon[i++] = '<div style="border:1px solid black;height:30px;margin-top:25px">'
                addon[i++] = '<input id="saveKeywords" type="button" class="s" style="width:100px;margin-left:480px;cursor:default" value="Uložiť zmeny" disabled>'
            addon[i++] = '</div>'
        }
        addon[i++] = '<form id="pricingForm" method="post" action="'+$.general.prefix+'/giveMePrice/">'
            addon[i++] = '<input style="display:none" name="csrfmiddlewaretoken" value="" id = "pricingInput">'
            addon[i++] = '<input style="display:none" name="string" value="" id = "wordForPricing">'
        addon[i++] = '</form>'
        areaKeyword.append(addon.join(''))
        
        $.gen.keywordIDs = []
        $.fn.addHelperHandler()
        $.fn.addFadeOutSpanHandler($('#adKeyword'),$('#adKeywordSpan'),1,$('#countAdKeywordSpan'));
        $.fn.enDisAddKeywordBut()
        $.fn.addWordButHandler()
        if (idCampaign != 0){
            $.fn.addSaveKeywordsHandler(idCampaign) 
        }   


    }


    $.fn.buildKeyword = function(id,name,cpm,cpc,flag,sign){

        var i = 0
        var addon = []
        addon[i++] = '<tr id="keyw_'+id+'" class="keyw" style="margin-top:0px">'
            if (sign == 1){
                addon[i++] = '<td class="addWord" style="width:60px;text-align:center">'
                    addon[i++] = "<div style=';position:relative'>"
                        addon[i++] = '<input type="checkbox">'
                    addon[i++] = "</div>"
                addon[i++] = '</td>'
            }
            addon[i++] = '<td class="addWord" style="width:350px;text-align:left">'
                addon[i++] = '<div id="keyword_'+id+'" class="keywName">'
                    addon[i++] = name
                addon[i++] = '</div>'
            addon[i++] = '</td>'
            addon[i++] = '<td class="addWord" style="padding-left:0px;width:90px;text-align:center">'
                addon[i++] = '<div>'
                    addon[i++] = cpc
                addon[i++] = '</div>'
            addon[i++] = '</td>'
            addon[i++] = '<td class="addWord" style="padding-left:0px;width:140px;text-align:center">'
                addon[i++] = '<div>'
                    addon[i++] = cpm
                addon[i++] = '</div>'
            addon[i++] = '</td>'
            if (sign == 1){
                addon[i++] = '<td class="addWord" style="padding-left:0px;width:45px;text-align:center">'
                    addon[i++] = '<div class="close-btn6" style="font-size:16px;float:none" id="closeBtnKeyword_'+id+'">'
                    addon[i++] = '</div>'
                addon[i++] = '</td>'
            }
        addon[i++] = '</tr>'
        
        $('#chosenWords > tbody:last').append(addon.join(''))
        
        if (sign == 1){
        
            $('#closeBtnKeyword_'+id+'').click(function(){
                $('#keyw_'+id+'').remove()
                $.gen.keywordIDs.splice( $.inArray(id, $.gen.keywordIDs), 1 );

                if (flag == 2){

                    $('#saveKeywords').prop('disabled',false)
                    $('#saveKeywords').css('cursor','pointer')
                }
            })
            
            $.gen.keywordIDs.push(id)
        }
        
    }
})(jQuery);

