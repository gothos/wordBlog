(function ($) {
    $.fn.buildEditCampaignBudget = function(idCampaign){
          
        var i = 0
        var addon = []
        addon[i++] = '<div style="position:relative">'
            addon[i++] = '<div>'
                addon[i++] = '<input type="text" id="adBudget">'
            addon[i++] = '</div>'
            addon[i++] = '<span id="adBudgetSpan" class="plac" style="position:absolute;top:4px;left:9px;">'
                addon[i++] = 'Denný rozpočet'
            addon[i++] = '</span>'
            addon[i++] = "<div id ='errBudget' class ='block err' style=''>"
            addon[i++] = "</div>"
            addon[i++] = '<span id="characterAdBudgetSpan" class="plac" style="position:absolute;top:4px;left:130px">'
                addon[i++] = '&#128'
            addon[i++] = '</span>'
            addon[i++] = '<div style="border:1px solid black;height:30px;margin-top:25px">'
                addon[i++] = '<input id="saveBudget" type="button" class="s" style="width:100px;margin-left:480px;cursor:default" value="Uložiť zmeny" disabled>'
            addon[i++] = '</div>'
            addon[i++] = '<form method="post" action="'+$.general.prefix+'/saveBudgetChanges/" id="saveBudgetChangesForm'+idCampaign+'">'
                addon[i++] = '<input style="display:none" name="csrfmiddlewaretoken" value="" id = "saveBudgetChangesInput'+idCampaign+'">'
                addon[i++] = '<input style="display:none" name="budget" value="" id = "budget'+idCampaign+'">'
                addon[i++] = '<input style="display:none" name="idCampaign" value="'+idCampaign+'" id = "" >'
            addon[i++] = '</form>'
            
            
        addon[i++] = '</div>'
        $('#menuBudget').append(addon.join(''))
        $.fn.addFadeOutSpanHandler($('#adBudget'),$('#adBudgetSpan'));
        $.fn.addFocusFieldsHandler($('#adBudget'),1,$('#errBudget'))
        
        $.fn.addSaveBudgetHandler(idCampaign)
     
    }
})(jQuery);
