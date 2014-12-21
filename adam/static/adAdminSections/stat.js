(function ($) {
    $.fn.addStatNavigationDivHandler = function(){
        $('div[class="statNavigationDiv"]').click(function(){
            var value=$(this).attr('value')
            if (value == '1' && $.gen.curStat == 1){
                return
            }
            if (value == '2' && $.gen.curStat == $.gen.extentStat){
                return
            }
            
            if (value == '1'){
                $.gen.curStat = $.gen.curStat - 1
                $.gen.fromStat = $.gen.fromStat - 15
                var valo = $('#stat > tbody> tr').length
                $.gen.toStat = $.gen.toStat - valo 
                
                
                
            }else{
                
                $.gen.curStat = $.gen.curStat + 1
                $.gen.fromStat = $.gen.fromStat + 15
                if (($.gen.toStat + 15) > $.gen.sumStat){
                    $.gen.toStat = $.gen.sumStat
                }else{
                    $.gen.toStat = $.gen.toStat + 15
                }

            }
            $('#fromStat').text($.gen.fromStat)
            $('#toStat').text($.gen.toStat)

            $.fn.getResults(0)
            $.fn.checkPagesNavigators(1)

        })
    }

    $.fn.buildEditCampaignStat = function(idCampaign,flag){
        if (flag == 1){
            var names = ['Nie sú k dispozícii žiadne štatistické údaje','Pre dané kľúčové slovo nie sú k dispozícii žiadne štatistiky',$.general.noResultsSK,"Deň","Počet zobrazení","Počet klikov"]
        }else{
            var names = ['No statistical data available','No statistical data available for the keyword',$.general.noResultsEN,"Day","Sum of views","Sum of clicks"]
        }
        var i = 0
        var addon = []
        addon[i++] = '<div id="noStatData" style="display:none">'
            addon[i++] = names[0]
        addon[i++] = '</div>'
        addon[i++] = '<div id="isStatData" style="position:relative">'
        
            addon[i++] = '<table id="selectKeywordTable" cellpadding="0" cellspacing="0" border="0" style=";position:relative;">'
                addon[i++] = '<tr>'

                    addon[i++] = '<td id="sel">'
                        addon[i++] = '<select class="selectKeyword" id="selectKeyword">'
                        addon[i++] = '<select>'
                    addon[i++] = '</td>'

                    addon[i++] = '<td id="statNavigationPanelTd">'
                        addon[i++] = $.fn.buildNavigationPanel(3)
                    addon[i++] = '</td>'
                addon[i++] = '</tr>'
            addon[i++] = '</table>'
            addon[i++] = '<div id="noStat" style="position:absolute;top:60px;display:none">'
                addon[i++] = names[1]
            addon[i++] = '</div>'
            addon[i++] = '<div id="isStat" style="margin-top:10px;">'

                addon[i++] = $.fn.buildFilterTable(3)
                addon[i++] = '<div id="noResultsStat" style="margin-top:25px;display:none">'
                    addon[i++] = names[2]
                addon[i++] = '</div>'
                addon[i++] = '<div id="isResultsStat" >' 
                    addon[i++] = '<table id="stat" cellpadding="0" cellspacing="0" border="0" style=";position:relative;margin-top:25px" class="">'
                        addon[i++] = '<thead style="display: table-header-group;vertical-align:middle">'
                            addon[i++] = '<tr id="statHeader" style="display:block">'
                                addon[i++] = '<th class="addWord" style="width:70px">'
                                    addon[i++] = '<div style="height:23px;line-height:23px">'
                                        addon[i++] = names[3]
                                    addon[i++] = '</div>'
                                addon[i++] = '</th>'
                                addon[i++] = '<th class="addWord" style="width:60px">'
                                    addon[i++] = '<div style="height:23px;line-height:23px">'
                                    addon[i++] = '</div>'
                                addon[i++] = '</th>'
                                addon[i++] = '<th class="addWord" style="width:90px">'
                                    addon[i++] = '<div style="height:23px;line-height:23px">'
                                        addon[i++] = names[4]
                                    addon[i++] = '</div>'
                                addon[i++] = '</th>'
                                addon[i++] = '<th class="addWord" style="width:90px">'
                                    addon[i++] = '<div style="height:23px;line-height:23px">'
                                        addon[i++] = names[5]
                                    addon[i++] = '</div>'
                                addon[i++] = '</th>'
                                
                                addon[i++] = $.fn.buildSuccRateTh('Stat',flag)                                   
                            addon[i++] = '</tr>' 
                        addon[i++] = '</thead>'
                        addon[i++] = '<tbody style="overflow:auto;display:block;width:100%">'
                        addon[i++] = '</tbody>'
                        addon[i++] = '<tfoot>'
                        addon[i++] = '</tfoot>'   
                    addon[i++] = '</table>'
                addon[i++] = '</div>'
            addon[i++] = '</div>'
            addon[i++] = '<form method="post" action="'+$.general.prefix+'/showStatistics/" id="showStatForm">'
                addon[i++] = '<input type="hidden" name="csrfmiddlewaretoken" id="showStatInput">'
                addon[i++] = '<input type="hidden" name="idWord" id="showStatIdWord">'
                addon[i++] = '<input type="hidden" name="idCampaign" id="showStatIdCampaign">'
            addon[i++] = '</form>'
            addon[i++] = '<form method="post" action="'+$.general.prefix+'/stat/" id="statForm">'
                addon[i++] = '<input type="hidden" name="csrfmiddlewaretoken" id="statInput">'
                addon[i++] = '<input type="hidden" name="dateFrom" id="statDateFrom">'
                addon[i++] = '<input type="hidden" name="dateTo" id="statDateTo">'
                addon[i++] = '<input type="hidden" name="idWord" id="idWordStat">'
                
                addon[i++] = '<input type="hidden" name="idCampaign" id="statIdCampaign">'
            addon[i++] = '</form>'
        addon[i++] = '</div>'
        $('#menuStat').append(addon.join(''))
        
        $.fn.useDatepicker(1,$('#statFrom'),$('#statTo'))
        
        $.fn.addSelectSuccRateHandler(0)       
        $.fn.addNavigationDivHoveringEffect(1)
        $.fn.addStatNavigationDivHandler()
        $.fn.addSelectKeywordHandler()   
        
    }


    $.fn.resetStat = function(len){
        
        $("#selectSuccRateStat option").prop('selected',false)
        $("#selectSuccRateStat option[value='1']").prop('selected',true);
        
        
        $.gen.fromStat = 1
        $.gen.sumStat = len

            
        $.gen.extentStat = Math.ceil(($.gen.sumStat/15))
        $.gen.curStat = 1
        if ($.gen.extentStat > 1){
            $.gen.toStat = 15
        }else{
            $.gen.toStat = $.gen.sumStat
        }
         
        $('#totalSumStat').text($.gen.sumStat)
        $('#fromStat').text($.gen.fromStat)
        $('#toStat').text($.gen.toStat)

    }



    $.fn.buildStatSet = function(data){

        $('#stat tbody > tr').remove()
        $.gen.defListStat = []
        $.gen.succRatesStat = []
        $.gen.dicStat = {}
        for (var i =0,len=data.length;i<len;i++){
        
            if (data[i].views != 0){
                var successRate = ((data[i].clicks/data[i].views) * 100).toFixed(2)
                var valo = successRate
            }else{
                var successRate = 0
                var valo = '-'
            }      
            if (i < 15){        
                $.fn.buildStatRecord( data[i].date,data[i].views,data[i].clicks,valo)
            }
            var dic = {'date':data[i].date,'clicks':data[i].clicks,'views':data[i].views,'succRate':valo}
            $.gen.defListStat.push(dic)
            if (!(successRate in $.gen.dicStat)){
                            
                $.gen.dicStat[successRate] = [dic]
                $.gen.succRatesStat.push(successRate)
            }else{
               
                $.gen.dicStat[successRate].push(dic)
                
                
            }


        }
            
    }
    $.fn.buildStatRecord = function(date,views,clicks,successRate){
        var n = 0
        var addon = []
        
        var strDate = $.fn.getDayStr(date)
        addon[n++] = '<tr style="display: table-row;vertical-align: inherit;">'
        
            addon[n++] = '<td class="addWord" style="width:70px;display:table-cell">'
                addon[n++] = '<div>'
                    addon[n++] = date
                addon[n++] = '</div>'
            addon[n++] = '</td>'
            addon[n++] = '<td class="addWord" style="width:60px;display:table-cell">'
                addon[n++] = '<div>'
                    addon[n++] = strDate
                addon[n++] = '</div>'
            addon[n++] = '</td>'
            addon[n++] = '<td class="addWord" style="width:90px;display:table-cell">'
                addon[n++] = '<div>'
                    addon[n++] = views
                addon[n++] = '</div>'
            addon[n++] = '</td>'
            addon[n++] = '<td class="addWord" style="width:90px;display:table-cell">'
                addon[n++] = '<div>'
                    addon[n++] = clicks
                addon[n++] = '</div>'
            addon[n++] = '</td>'
            addon[n++] = '<td class="addWord" style="width:220px;display:table-cell">'
                addon[n++] = '<div>'
                    addon[n++] = successRate
                addon[n++] = '<div>'
            addon[n++] = '</td>'      
        addon[n++] = '</tr>'
        

        $('#stat > tbody:last').append(addon.join(''))
        

    }
})(jQuery);
