(function ($) {
    $.fn.getResults = function(num){
        var froms = [$.gen.fromStat,$.gen.fromOver,$.gen.fromCPCs]
        var tos = [$.gen.toStat,$.gen.toOver,$.gen.toCPCs]
        var tables = ['stat','over','CPCs']
        var succRates = [$.gen.succRatesStat,$.gen.succRatesOver,$.gen.succRatesCPCs]
        var defLists = [$.gen.defListStat,$.gen.defListOver,$.gen.defListCPCs]
        var dics = [$.gen.dicStat,$.gen.dicOver,$.gen.dicCPCs]
        var funcs = [$.fn.buildStatRecord,$.fn.buildOverRecord,$.fn.buildCPCsRecord]
        var suffix = capitaliseFirstLetter(tables[num])
        var from = froms[num] - 1
        var to = tos[num]
        $('#'+tables[num]+' tbody > tr').remove()
        var a = parseInt($('#selectSuccRate'+suffix+' option:selected').val())
        
        if (a == 3){
            var L = succRates[num].sort(function (a, b) { return a - b;});
        }
        
        if (a == 2){
            var L = succRates[num].sort(function (a, b) { return a - b;}).reverse();
        }
        if (a == 1){
        }
        var m = 0
        
        if (a == 1){
            console.log('jedna')
            for (var i = 0,len = defLists[num].length;i<len;i++){
                
                if (m >= from && m < to  ){
                    console.log('dico',defLists[num][i])
                    console.log('awww',defLists[num][i].views)
                    if (defLists[num][i].views != 0){
                        var valo = defLists[num][i].succRate
                        console.log('a')
                    }else{
                        var valo = '-'
                        console.log('b')
                    }
                    if (num == 0){
                        funcs[num](defLists[num][i].date,defLists[num][i].views,defLists[num][i].clicks,valo)
                    }
                    if (num == 1){
                        funcs[num](defLists[num][i].idWord,defLists[num][i].name,defLists[num][i].views,defLists[num][i].clicks,valo)
                    }
                    if (num == 2){
                        funcs[num](defLists[num][i].date,defLists[num][i].avgCPC,defLists[num][i].clicks,defLists[num][i].views,valo)
                    }
                }
                m = m + 1;
                
            
            
            
            }
        }else{
            console.log('dva')

            for (var i = 0,len=L.length;i<len;i++){

               
                    for (var key in dics[num]){
                        
                        if (dics[num].hasOwnProperty(key)){

                            if (L[i] == key){
                                
                                for (var k = 0, leno = dics[num][key].length;k<leno;k++){
                                    if (m >= from && m < to){
                                        
                                        if (dics[num][key][k].views != 0){
                                            var valo = L[i]
                                            
                                        }else{
                                            var valo = '-'
                                            
                                        }
                                        
                                    
                                        if (num == 0){
                                            funcs[num](dics[num][key][k].date,dics[num][key][k].views,dics[num][key][k].clicks,valo)
                                        }
                                        if (num == 1){
                                            funcs[num](dics[num][key][k].idWord,dics[num][key][k].name,dics[num][key][k].views,dics[num][key][k].clicks,valo)
                                        }
                                        if (num == 2){
                                            funcs[num](dics[num][key][k].date,dics[num][key][k].avgCPC,dics[num][key][k].clicks,dics[num][key][k].views,valo)
                                        }
                                    }
                                    m = m + 1;
                                    
                                }
                                
                            }
                        }
                        
                    
                    }
                
                    
            }
        
        
        
        }
        
        
    }
})(jQuery);
