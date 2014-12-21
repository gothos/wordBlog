(function ($) {
    $.fn.addCPCsNavigationDivHandler = function(){
        $('div[class="CPCsNavigationDiv"]').click(function(){
        
        
            var value=$(this).attr('value')
            

            if (value == '1' && $.gen.curCPCs == 1){
                return
            }
            if (value == '2' && $.gen.curCPCs == $.gen.extentCPCs){
                return
            }
            
            if (value == '1'){
                $.gen.curCPCs = $.gen.curCPCs - 1
                $.gen.fromCPCs = $.gen.fromCPCs - 15
                var valo = $('#CPCs > tbody> tr').length
                $.gen.toCPCs = $.gen.toCPCs - valo 
            }else{
                $.gen.curCPCs = $.gen.curCPCs + 1
                $.gen.fromCPCs = $.gen.fromCPCs + 15
                if (($.gen.toCPCs + 15) > $.gen.sumCPCs){
                    $.gen.toCPCs = $.gen.sumCPCs
                }else{
                    $.gen.toCPCs = $.gen.toCPCs + 15
                }
            }
            $('#fromCPCs').text($.gen.fromCPCs)
            $('#toCPCs').text($.gen.toCPCs)
            $.fn.getResults(2)
            $.fn.checkPagesNavigators(2)
            
            
            
            
        })
    }

    $.fn.resetCPCs = function(len){

        $("#selectSuccRateCPCs option").prop('selected',false)
        $("#selectSuccRateCPCs option[value='1']").prop('selected',true);

        $.gen.fromCPCs = 1
        $.gen.sumCPCs = len

            
        $.gen.extentCPCs = Math.ceil(($.gen.sumCPCs/15))
        $.gen.curCPCs = 1
        if ($.gen.extentCPCs > 1){
            $.gen.toCPCs = 15
        }else{
            $.gen.toCPCs = $.gen.sumCPCs
        }
         
        $('#totalSumCPCs').text($.gen.sumCPCs)
        $('#fromCPCs').text($.gen.fromCPCs)
        $('#toCPCs').text($.gen.toCPCs)
    }

    $.fn.buildEditCampaignCPCs = function(idCampaign,flag){
        
        if (flag == 1){
            var names = ['Pre túto kampaň nie sú k dispozícii žiadne štatistiky',$.general.noResultsSK,'Deň','Suma zobrazení','Suma klikov']
        }else{
            var names = ['No statistical data available for the campaign',$.general.noResultsEN,'Day','Sum of viws','Sum of clicks']
        }
        var i = 0
        var addon = []
        console.log('general',$.general.noResultsSK)
        addon[i++] = '<div id="noCPCs" style="display:none">'
            addon[i++] = names[0]
        addon[i++] = '</div>'
        addon[i++] = '<div id="isCPCs" style="display:block">'

            addon[i++] = $.fn.buildNavigationPanel(2)
            addon[i++] = $.fn.buildFilterTable(2)
            
            addon[i++] = '<div id="noResultsCPCs" style="margin-top:25px;display:none">'
                addon[i++] = names[1]
            addon[i++] = '</div>'
            addon[i++] = '<div id="isResultsCPCs" >'     
                addon[i++] = '<table id="CPCs" cellpadding="0" cellspacing="0" border="0" style=";position:relative;border: 0px double #ddd;margin-top:25px">'
                    addon[i++] = '<thead>'
                        addon[i++] = '<tr id="overHeader">'
                            addon[i++] = '<th class="addWord" style="width:50px;text-align:left">'
                                addon[i++] = '<div style="height:23px;line-height:23px">'
                                    addon[i++] = names[2] 
                                addon[i++] = '</div>'
                            addon[i++] = '</th>'
                            addon[i++] = '<th class="addWord" style="width:60px;text-align:left">'
                                addon[i++] = '<div style="height:23px;line-height:23px">'
                                addon[i++] = '</div>'
                            addon[i++] = '</th>'
                            addon[i++] = '<th class="addWord" style="width:60px;text-align:left">'
                                addon[i++] = '<div style="height:23px;line-height:23px">'
                                    addon[i++] = '&#216 CPC'
                                addon[i++] = '</div>'
                            addon[i++] = '</th>'
                            addon[i++] = '<th class="addWord" style="width:90px">'
                                addon[i++] = '<div style="height:23px;line-height:23px">'
                                    addon[i++] = names[3]
                                addon[i++] = '</div>'
                            addon[i++] = '</th>'
                            addon[i++] = '<th class="addWord" style="width:90px">'
                                addon[i++] = '<div style="height:23px;line-height:23px">'
                                    addon[i++] = names[4]
                                addon[i++] = '</div>'
                            addon[i++] = '</th>'
                            addon[i++] = $.fn.buildSuccRateTh('CPCs',flag)
                        addon[i++] = '</tr>'
                    addon[i++] = '</thead>'
                    addon[i++] = '<tbody>'
                    addon[i++] = '</tbody>'
                    addon[i++] = '<tfoot>'
                        
                    addon[i++] = '</tfoot>'
                addon[i++] = '</table>'
            addon[i++] = '</div>'
            addon[i++] = '<form method="post" action="'+$.general.prefix+'/CPCs/" id="CPCsForm">'
                addon[i++] = '<input type="hidden" name="csrfmiddlewaretoken" id="CPCsInput">'
                addon[i++] = '<input type="hidden" name="dateFrom" id="CPCsDateFrom">'
                addon[i++] = '<input type="hidden" name="dateTo" id="CPCsDateTo">'
                addon[i++] = '<input type="hidden" name="idCampaign" id="CPCsIdCampaign">'
            addon[i++] = '</form>'
        addon[i++] = '</div>'
        $('#menuCPCs').append(addon.join(''))
        
        $.fn.useDatepicker(2,$('#CPCsFrom'),$('#CPCsTo'))
        $.fn.addCPCsNavigationDivHandler()
        $.fn.addNavigationDivHoveringEffect(3)
        $.fn.addSelectSuccRateHandler(2)
        
        
        
    }






    $.fn.buildCPCsRecord = function(date,avgCPC,clicks,views,successRate){
        var n = 0
        var addon = []

        var strDate = $.fn.getDayStr(date)

        addon[n++] = '<tr>'

            addon[n++] = '<td class="addWord">'
                addon[n++] = '<div>'
                    addon[n++] = date
                addon[n++] = '</div>'
            addon[n++] = '</td>'
            addon[n++] = '<td class="addWord">'
                addon[n++] = '<div>'
                    addon[n++] = strDate
                addon[n++] = '</div>'
            addon[n++] = '</td>'
            addon[n++] = '<td class="addWord">'
                addon[n++] = '<div>'
                    addon[n++] = avgCPC
                addon[n++] = '</div>'
            addon[n++] = '</td>'
            addon[n++] = '<td class="addWord">'
                addon[n++] = '<div>'
                    if (views == null){
                        views = 0
                    }
                    addon[n++] = views
                addon[n++] = '</div>'
            addon[n++] = '</td>'
            addon[n++] = '<td class="addWord">'
                addon[n++] = '<div>'
                    if (clicks == null){
                        clicks = 0
                    }
                    addon[n++] = clicks
                addon[n++] = '</div>'
            addon[n++] = '</td>'
            addon[n++] = '<td class="addWord">'
                addon[n++] = '<div>'
                    addon[n++] = successRate
                addon[n++] = '</div>'
            addon[n++] = '</td>'
            
        addon[n++] = '</tr>'
        $('#CPCs > tbody:last').append(addon.join(''))
    }




    $.fn.buildCPCsSet = function(data){
        $('#CPCs tbody > tr').remove()
        $.gen.defListCPCs = []
        $.gen.succRatesCPCs = []
        $.gen.dicCPCs = {}
        
        
        for (var i =0,len=data.length;i<len;i++){
        
            if (data[i].views != 0){
                var successRate = ((data[i].clicks/data[i].views) * 100).toFixed(2)
                var valo = successRate
            }else{
                var successRate = 0
                var valo = '-'
            }
            if (i < 15){  
                $.fn.buildCPCsRecord(data[i].date,data[i].avgCPC,data[i].clicks,data[i].views,valo)
            }
            var dic = {'date':data[i].date,'avgCPC':data[i].avgCPC,'views':data[i].views,'clicks':data[i].clicks,'succRate':valo}
            $.gen.defListCPCs.push(dic)
            if (!(successRate in $.gen.dicCPCs)){
                
                $.gen.dicCPCs[successRate] = [dic]
                $.gen.succRatesCPCs.push(successRate)
            }else{
               
                $.gen.dicCPCs[successRate].push(dic)  
            }
            
        }

    }
})(jQuery);
