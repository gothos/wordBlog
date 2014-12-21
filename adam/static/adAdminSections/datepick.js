(function ($) {
    $.fn.useDatepicker = function(flag,from,to,userId){
        var baseDic = { dayNamesMin: [ "Ne", "Po", "Út", "St", "Št", "Pia", "So" ] ,firstDay:1,monthNames: [ "Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December" ]}
        
        var dickey = baseDic
        dickey['onSelect'] = function(){
            console.log('meeeawAWWWW')
            var b = to.datepicker('getDate');
            to.datepicker('destroy')
            var a = from.datepicker('getDate');
            var dic = baseDic
            dic['minDate'] = a
            dic['maxDate'] = new Date()
            
            to.datepicker(dic);
            console.log('flag1',flag)
            if (a > b){
                to.datepicker('setDate',a)
            }
            if (flag == 1){
                $.fn.addAjaxHandlerStatistics()
            }
            if (flag == 2){
                $.fn.addAjaxHandlerCPCs()
            }
            if (flag == 3){
                $.fn.addAjaxHandlerChanges()
            }
            if (flag == 4){
                $.fn.addAjaxHandlerMainChanges(userId)
            }
            
        }
        dickey['maxDate'] = new Date();
        
        from.datepicker(dickey)
        dickey['onSelect'] = function(){
            console.log('flag2',flag)
            if (flag == 1){
                $.fn.addAjaxHandlerStatistics()
            }
            if (flag == 2){
                $.fn.addAjaxHandlerCPCs()
            }
            if (flag == 3){
                $.fn.addAjaxHandlerChanges()
            }
            if (flag == 4){
                $.fn.addAjaxHandlerMainChanges(userId)
            }
        }
        to.datepicker(dickey)

    }

    $.fn.addAjaxHandlerStatistics = function(){   

            
        $.fn.fillDatepickerForm('stat')
        var frm = $('#statForm')
        
        
        var keyword = $('#selectKeyword option:selected').val()
        $('#idWordStat').attr('value',keyword)
        
        

        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            cache: false,
            beforeSend: function(){

            
            },
                     
            success: function (msg) {
                if (msg != 0){
                    $('#isResultsStat').show()
                    $('#noResultsStat').hide()
                    var data = $.parseJSON(msg);
                    
                    
                    $.fn.checkNavigationPanelVisibility(data.length,'1','Stat')
                    
                    $.gen.statSet = data

                    
                    $.fn.resetStat(data.length)    
                    
                    $.fn.buildStatSet(data)
                    $.fn.checkPagesNavigators(1)
                }else{
                    $('#statNavigationPanel').hide()
                    $('#isResultsStat').hide()
                    $('#noResultsStat').show()
                }                       
            },
            error: function (msg) {
            },
        })

    }



    $.fn.fillDatepickerForm = function(str){
        $('#'+str+'Input').attr('value',$.cookie('csrftoken'))
        
        var dateFrom = $('#'+str+'From').datepicker("getDate").getTime()
        $('#'+str+'DateFrom').attr('value',dateFrom)
        
        var dateTo = $('#'+str+'To').datepicker("getDate").getTime()
        $('#'+str+'DateTo').attr('value',dateTo)

        
        $('#'+str+'IdCampaign').attr('value',$.gen.campaignIdCampaign) 
    }



    $.fn.addAjaxHandlerCPCs = function(){
        
        $.fn.fillDatepickerForm('CPCs')    
          
        var frm = $('#CPCsForm')
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            cache: false,
            beforeSend: function(){
                
                
                
            
            },
                     
            success: function (msg) {
                if (msg != 0){
                    $('#isResultsCPCs').show()
                    $('#noResultsCPCs').hide()
                    var data = $.parseJSON(msg);
                    $.fn.checkNavigationPanelVisibility(data.length,'','CPCs')
                    
                    $.gen.CPCsSet = data
                    $.fn.resetCPCs(data.length)
                    
                    
                    
                    $.fn.buildCPCsSet(data)
                    $.fn.checkPagesNavigators(2)
                }else{
                    $('#CPCsNavigationPanel').hide()
                    $('#isResultsCPCs').hide()
                    $('#noResultsCPCs').show()
                }
            },
            error: function (msg) {
            },
        }) 
    }
})(jQuery);  
