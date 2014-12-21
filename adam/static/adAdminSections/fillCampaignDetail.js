(function ($) {
    $.fn.fillCampaignDetail = function(data,sign){
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',data.isStat)
        
        if (data.isStat == 1 ){
            
            
            if (data.keyword[0].statistics != 0){
                $.fn.resetStat(data.keyword[0].statistics.length)
                $.fn.buildStatSet(data.keyword[0].statistics)
                
                $.fn.insertPeriods(1,data.wordsPeriodsExtent)
                
            }else{
                
                $('#isStat').hide()
                $('#noStat').show()
            }
            

        }else{
            console.log('closing')
            $('#isStatData').hide()
            $('#noStatData').show()
        }
        
        

        if (data.cpcs != 0){
            $('#isCPCs').show()
            $('#noCPCs').hide()
            $.fn.resetCPCs(data.cpcs.length)
            $.fn.buildCPCsSet(data.cpcs)

            $.fn.insertPeriods(3,data.cpcsPeriodsExtent)
            
        }else{
            $('#isCPCs').hide()
            $('#noCPCs').show()
            
        }

        if (data.keyword != 0){
            $('#over > tbody:last > tr').remove()
            $.fn.checkNavigationPanelVisibility(data.keyword.length,'3','Over')
            $.fn.resetOver(data.keyword.length,1) 
            
            var k = 0
            var str = []
            $.gen.defListOver = []
            $.gen.succRatesOver = []
            $.gen.dicOver = {}
            
            
            
            for (var i = 0,len=data.keyword.length;i<len;i++){
                if (data.keyword[i].views != 0){
                    var successRate = ((data.keyword[i].clicks/data.keyword[i].views) * 100).toFixed(2)
                    var valo = successRate
                }else{
                    var successRate = 0
                    var valo = '-'
                }
                
                
                if (i < 5){
                    $.fn.buildOverRecord(data.keyword[i].idWord,data.keyword[i].name,data.keyword[i].views,data.keyword[i].clicks,valo)
                }
                
                $.fn.buildKeyword(data.keyword[i].idWord,data.keyword[i].name,data.keyword[i].cpm,data.keyword[i].cpc,2,sign)
                
                var dic = {'idWord':data.keyword[i].idWord,'name':data.keyword[i].name,'clicks':data.keyword[i].clicks,'views':data.keyword[i].views,'succRate':successRate}
                $.gen.defListOver.push(dic)
                if (!(successRate in $.gen.dicOver)){
                    
                    $.gen.dicOver[successRate] = [dic]
                    $.gen.succRatesOver.push(successRate)
                }else{
                   
                    $.gen.dicOver[successRate].push(dic)
                    
                    
                }

                
                str[k++] = '<option id="option_'+data.keyword[i].idWord+'" class="optionKeyword" value="'+data.keyword[i].idWord+'" style="" >'+data.keyword[i].name+'</option>'


                
            }

            
            $('#selectKeyword').append(str.join(''))
            /*
            $('select[class="selectSuccRateOver"]').on('change',function(){
                $.fn.getResults(1)


            })
            */
        }
    }
})(jQuery);



