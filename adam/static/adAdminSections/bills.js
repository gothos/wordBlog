(function ($) {
    $.fn.buildBills = function(data,flag){
        console.log('data',flag)
        console.log('bills',data)
        if (flag == 0){
            var fields = ['Číslo faktúry','Stav','Obdobie','Suma']
            var names = ['Blíži sa doba splatnosti poslednej faktúry','Nemáte zaplatenú poslednú faktúru','Posledne vystavená faktúra je po dobe splatnosti']
            
            var warning = "Nie sú k dispozícii údaje o faktúrach"
        }else{
            var fields = ['ID','Status','Period','Sum']
            var names = ['Last bill due date is coming up','Last bill is not paid','Last bill is overdue']
            var warning = "No bills data available"
        }
        
        
        
        var i = 0
        var addon = []
        console.log('data',data)
        if (data == 0){
            addon[i++] = '<div id="noBills" style="display:block;margin-top:10px">'
                addon[i++] = warning
            addon[i++] = '</div>'
            
            $.gen.actionButtonEnabled = 1
            
            
        }else{
            if (flag == 0){
                var data = $.parseJSON(data);
            }
            addon[i++] = '<div id="isBills" style="display:block">'
                addon[i++] = '<table id="billsTable" cellpadding="0" cellspacing="0" border="0" style=";position:relative;border: 0px double #ddd;">'
                    addon[i++] = '<thead>'
                        
                        var k = 0
                        var str = []
                        for(var m = 0,len = fields.length;m<len;m++){
                            str[k++] = '<th class="addWord">'
                                str[k++] = '<div>'
                                    str[k++] = fields[m]
                                str[k++] = '</div>'
                            str[k++] = '</th>'
                        }
                        addon[i++] = str.join('')
                        
                    addon[i++] = '</thead>'
                    addon[i++] = '<tbody>'
                        var numOfBills = data.length
                        console.log('BILLS',lastStatus)
                        if (numOfBills > 0){
                            var g = 0
                            console.log('lenko',data.length)
                            for(var m = 0,len = data.length;m<len;m++){
                                addon[i++] = $.fn.buildBillsRow(data[m].id,data[m].status,data[m].period,data[m].totalCost,flag)
                                
                                if (g == 0){
                                    var lastPeriod = data[m].period
                                    var lastStatus = data[m].status
                                }
                                
                                g = g + 1
                            }
                            
                            
                            if (lastStatus == 1){
                                $.gen.actionButtonEnabled = 1
                                $.gen.remark = '-'
                                $.gen.remarkColor = 'black'
                            }else{
                                
                                lastPeriod = lastPeriod.split("-");
                                console.log('lastPeriod',lastPeriod)
                                billYear = parseInt(lastPeriod[0]) 

                                billMonth = parseInt(lastPeriod[1])
                                console.log(billYear,billMonth)
                                datum = new Date(billYear,billMonth,1)
                                console.log('datum',datum)
                                var date = new Date()
                                
                                var diff = date - datum
                                var days = diff / 1000 / 60 / 60 / 24;
                            
                            
                                                
                                if (days < 31){
                                
                                    $.gen.actionButtonEnabled = 1
                                    if (days > 24){
                                        
                                        $.gen.remark = names[0]
                                    }else{
                            
                                        $.gen.remark = names[1]
                                    }
                                    $.gen.remarkColor = '#d14836'
                                }else{
                                    $.gen.actionButtonEnabled = 0
                                    
                                    $.gen.remark = names[2]
                                    $.gen.remarkColor = '#FA5858'
                                }
                                
                            }
                        }else{
                            $.gen.actionButtonEnabled = 1
                            $.gen.remark = '-'
                            $.gen.remarkColor = 'black'
                        }
                    addon[i++] = '</tbody>'
                addon[i++] = '</table>'
            addon[i++] = '</div>'
            
            
            
            
        }
        console.log('wawdawd',$.gen.actionButtonEnabled)
        $('#menuBills').children().remove()
        $('#menuBills').append(addon.join(''))
        
        
    }



    $.fn.buildBillsRow = function(ids,status,period,total,flag){

        var k = 0
        var str = []
        str[k++] = '<tr>'
                
            str[k++] = '<td class="addWord" style="width:70px;text-align:center">'
                str[k++] = '<div>'
                    str[k++] = ids
                str[k++] = '</div>'
            str[k++] = '</td class="addWord">'
            
            
            if (status == 1){
                if (flag == 0){
                    status = 'Uhradená'
                }else{
                    status = 'Paid'
                }
                var color = 'A9F5A9'
            }else{
                if (flag == 0){
                    status = 'Neuhradená'
                }else{
                    status = 'Unpaid'
                }
                var color = '#F7BE81'
            }
            
            
            str[k++] = '<td class="addWord" style="background-color:'+color+';width:100px;text-align:center">'
                str[k++] = '<div>'
                    str[k++] = status
                str[k++] = '</div>'
            str[k++] = '</td class="addWord">'
            str[k++] = '<td class="addWord" style="width:100px;text-align:center">'
                str[k++] = '<div>'
                    str[k++] = period
                str[k++] = '</div>'
            str[k++] = '</td class="addWord">'
            str[k++] = '<td class="addWord" style="width:60px;text-align:center">'
                str[k++] = '<div>'
                    str[k++] = total
                str[k++] = '</div>'
            str[k++] = '</td class="addWord">'
                
            
        str[k++] = '</tr>'
        return str.join('')

    }
})(jQuery);
