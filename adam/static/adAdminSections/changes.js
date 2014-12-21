(function ($) {
    $.fn.buildChangesAdmin = function(flag,idUser){
        if (flag == 1){
            console.log('jednicka')
            var prefix = 'changes'
            var numero = 3
            var num = 4
        }else{
            console.log('dvojka')
            var prefix = 'mainChanges'
            var num = 5
            var numero = 4
        }
        var suffix = $.fn.capitaliseFirstLetter(prefix)
        var i = 0
        var addon = []
        
        
        addon[i++] = '<div id="no'+suffix+'" style="display:none">'
            addon[i++] = 'No changes data available'
        addon[i++] = '</div>'
        addon[i++] = '<div id="is'+suffix+'" style="display:block">'
            addon[i++] = $.fn.buildNavigationPanel(num) 
            addon[i++] = $.fn.buildFilterTable(num)
            addon[i++] = '<div id="noResults'+suffix+'" style="margin-top:25px;display:none">'
                addon[i++] = $.general.noResultsEN
            addon[i++] = '</div>'
            addon[i++] = '<div id="isResults'+suffix+'" >'
                addon[i++] = '<table id="'+prefix+'" cellpadding="0" cellspacing="0" border="0" style=";position:relative;margin-top:25px">'
                    addon[i++] = '<tr>'
                        addon[i++] = '<th class="addWord">'
                            addon[i++] = '<div>'
                                addon[i++] = 'Timestamp'
                            addon[i++] = '</div>'
                        addon[i++] = '</th>'
                        addon[i++] = '<th class="addWord">'
                            addon[i++] = '<div>'
                                addon[i++] = 'Operation'
                            addon[i++] = '</div>'
                        addon[i++] = '</th>'
                        addon[i++] = '<th class="addWord">'
                            addon[i++] = '<div>'
                                addon[i++] = 'Original value'
                            addon[i++] = '</div>'
                        addon[i++] = '</th>'
                    addon[i++] = '</tr>'
                    addon[i++] = '<tbody>'
                    addon[i++] = '</tbody>'
                addon[i++] = '</table>'
            addon[i++] = '</div>'
            addon[i++] = '<form method="post" action="'+$.general.prefix+'/'+prefix+'/" id="'+prefix+'Form">'
                addon[i++] = '<input type="hidden" name="csrfmiddlewaretoken" id="'+prefix+'Input">'
                addon[i++] = '<input type="hidden" name="dateFrom" id="'+prefix+'DateFrom">'
                addon[i++] = '<input type="hidden" name="dateTo" id="'+prefix+'DateTo">'
                if (flag == 1){    
                    addon[i++] = '<input type="hidden" name="idCampaign" id="'+prefix+'IdCampaign">'
                }else{
                    addon[i++] = '<input type="hidden" name="userId" value="'+idUser+'" id ="'+prefix+'IdUser">'
                }
            addon[i++] = '</form>'
        addon[i++] = '</div>'
        $('#menu'+suffix+'').children().remove()
        $('#menu'+suffix+'').append(addon.join(''))
        
        $.fn.useDatepicker(numero,$('#'+prefix+'From'),$('#'+prefix+'To'),idUser)
        
        $.fn.addNavigationDivHoveringEffect(num)
        if (flag == 1){
            $.fn.addChangesNavigationDivClickHandler()
        }else{
            $.fn.addMainChangesNavigationDivClickHandler()
        }
    }



    $.fn.buildChangesRecord = function(timestamp,numOfOperation,original,flag){
        console.log(timestamp,numOfOperation,original)
        var k = 0
        var addon = []
        addon[k++] = '<tr>'
            addon[k++] = '<td class="addWord">'
                addon[k++] = '<div class="datem" title="'+timestamp+'">'
                    addon[k++] = timestamp
                addon[k++] = '</div>'
            addon[k++] = '</td>'
            addon[k++] = '<td class="addWord">'
                addon[k++] = '<div>'
                    addon[k++] = $.fn.getActivity(numOfOperation,flag)
                addon[k++] = '</div>'
            addon[k++] = '</td>'
            addon[k++] = '<td class="addWord">'
                addon[k++] = '<div>'
                    addon[k++] = original
                addon[k++] = '</div>'
            addon[k++] = '</td>'
        addon[k++] = '</tr>'
        return addon.join('')
            


    }

    $.fn.buildChangesSet = function(data){
        console.log('launched')
        $('#changes > tbody:last tr').remove()
        $.gen.changesList = []
        console.log('dataaa',data)
        var k = 0
        var addon = []
        for (var i =0,len=data.length;i<len;i++){
             
            if (i < 15){
                console.log('build',data[i].timestamp)        
                addon[k++] = $.fn.buildChangesRecord( data[i].timestamp,data[i].numOfOperation,data[i].original,1)
            }
            var dic = {'timestamp':data[i].timestamp,'numOfOperation':data[i].numOfOperation,'original':data[i].original}
            $.gen.changesList.push(dic)



        }
        $('#changes > tbody:last').append(addon.join(''))
            
    }

    $.fn.resetChanges = function(len){
        
        
        $.gen.fromChanges = 1
        $.gen.sumChanges = len

            
        $.gen.extentChanges = Math.ceil(($.gen.sumChanges/15))
        $.gen.curChanges = 1
        if ($.gen.extentChanges > 1){
            $.gen.toChanges = 15
        }else{
            $.gen.toChanges = $.gen.sumChanges
        }
         
        $('#totalSumChanges').text($.gen.sumChanges)
        $('#fromChanges').text($.gen.fromChanges)
        $('#toChanges').text($.gen.toChanges)

    }

    $.fn.getChanges = function(flag){
        if (flag == 1){
            var from = $.gen.fromChanges - 1
            var to = $.gen.toChanges
            var table = 'changes'
            var L = $.gen.changesList
        }else{
            var from = $.gen.fromMainChanges - 1
            var to = $.gen.toMainChanges
            var table = 'mainChanges'
            var L = $.gen.mainChangesList
        }
        
        
        $('#'+table+' > tbody:last tr').remove()
        var k = 0
        var addon = []
        for (var i = 0,len= L.length;i<len;i++){
            
            if (i >= from && i < to  ){
                addon[k++] = $.fn.buildChangesRecord(L[i].timestamp,L[i].numOfOperation,L[i].original,flag)
                
            }
            
            
        }
        $('#'+table+' > tbody:last').append(addon.join(''))

            
                    
        

    }

    $.fn.addChangesNavigationDivClickHandler = function(){
        $('div[class="changesNavigationDiv"]').click(function(){
        
            var value=$(this).attr('value')
            if (value == '1' && $.gen.curChanges == 1){
                return
            }
            if (value == '2' && $.gen.curChanges == $.gen.extentChanges){
                return
            }
            
            if (value == '1'){
                $.gen.curChanges = $.gen.curChanges - 1
                $.gen.fromChanges = $.gen.fromChanges - 15
                var valo = $('#changes > tbody:last tr').length
                $.gen.toChanges = $.gen.toChanges - valo 
                
                
                
            }else{
                
                $.gen.curChanges = $.gen.curChanges + 1
                $.gen.fromChanges = $.gen.fromChanges + 15
                if (($.gen.toChanges + 15) > $.gen.sumChanges){
                    $.gen.toChanges = $.gen.sumChanges
                }else{
                    $.gen.toChanges = $.gen.toChanges + 15
                }

            }
            $('#fromChanges').text($.gen.fromChanges)
            $('#toChanges').text($.gen.toChanges)
            $.fn.getChanges(1)
            $.fn.checkPagesNavigators(4)

            
        })
    }

    $.fn.buildMainChangesSet = function(data){
        console.log('launched')
        $('#mainChanges > tbody:last tr').remove()
        $.gen.mainChangesList = []
        console.log('dataaa',data)
        var k = 0
        var addon = []
        for (var i =0,len=data.length;i<len;i++){
             
            if (i < 15){
                console.log('build',data[i].timestamp)        
                addon[k++] = $.fn.buildChangesRecord( data[i].timestamp,data[i].numOfOperation,data[i].original,2)
            }
            var dic = {'timestamp':data[i].timestamp,'numOfOperation':data[i].numOfOperation,'original':data[i].original}
            $.gen.mainChangesList.push(dic)



        }
        $('#mainChanges > tbody:last').append(addon.join(''))
            
    }

    $.fn.resetMainChanges = function(len){
        
        
        $.gen.fromMainChanges = 1
        $.gen.sumMainChanges = len

            
        $.gen.extentMainChanges = Math.ceil(($.gen.sumMainChanges/15))
        $.gen.curMainChanges = 1
        if ($.gen.extentMainChanges > 1){
            $.gen.toMainChanges = 15
        }else{
            $.gen.toMainChanges = $.gen.sumMainChanges
        }
         
        $('#totalSumMainChanges').text($.gen.sumMainChanges)
        $('#fromMainChanges').text($.gen.fromMainChanges)
        $('#toMainChanges').text($.gen.toMainChanges)

    }

    $.fn.addMainChangesNavigationDivClickHandler = function(){
        $('div[class="mainChangesNavigationDiv"]').click(function(){
        
            var value=$(this).attr('value')
            if (value == '1' && $.gen.curMainChanges == 1){
                return
            }
            if (value == '2' && $.gen.curMainChanges == $.gen.extentMainChanges){
                return
            }
            
            if (value == '1'){
                $.gen.curMainChanges = $.gen.curMainChanges - 1
                $.gen.fromMainChanges = $.gen.fromMainChanges - 15
                var valo = $('#mainChanges > tbody:last tr').length
                $.gen.toMainChanges = $.gen.toMainChanges - valo 
                
                
                
            }else{
                
                $.gen.curMainChanges = $.gen.curMainChanges + 1
                $.gen.fromMainChanges = $.gen.fromMainChanges + 15
                if (($.gen.toMainChanges + 15) > $.gen.sumMainChanges){
                    $.gen.toMainChanges = $.gen.sumMainChanges
                }else{
                    $.gen.toMainChanges = $.gen.toMainChanges + 15
                }

            }
            $('#fromMainChanges').text($.gen.fromMainChanges)
            $('#toMainChanges').text($.gen.toMainChanges)
            $.fn.getChanges(2)
            $.fn.checkPagesNavigators(5)

            
        })
    }



    $.fn.addAjaxHandlerMainChanges = function(userId){   

            
        $.fn.fillDatepickerForm('mainChanges')
        var frm = $('#mainChangesForm')
        $('#mainChangesIdUser').attr('value',userId)
        
        


        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            cache: false,
            beforeSend: function(){

            
            },
                     
            success: function (msg) {
                console.log('MSG',msg)
                if (msg != 0){
                    $('#isResultsMainChanges').show()
                    $('#noResultsMainChanges').hide()
                    var data = $.parseJSON(msg);
                    
                    
                    $.fn.checkNavigationPanelVisibility(data.length,'2','mainChanges')
                    
                    $.gen.mainChangesSet = data

                    
                    $.fn.resetMainChanges(data.length)    
                    
                    $.fn.buildMainChangesSet(data)
                    $.fn.checkPagesNavigators(5)
                }else{
                    $('#mainChangesNavigationPanel').hide()
                    $('#noResultsMainChanges').show()
                    $('#isResultsMainChanges').hide()
                }                       
            },
            error: function (msg) {
            },
        })

    }



    $.fn.addAjaxHandlerChanges = function(){   

            
        $.fn.fillDatepickerForm('changes')
        var frm = $('#changesForm')
        console.log('awdddd')


        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            cache: false,
            beforeSend: function(){

            
            },
                     
            success: function (msg) {
                console.log('MSG',msg)
                if (msg != 0){
                    $('#isResultsChanges').show()
                    $('#noResultsChanges').hide()
                    var data = $.parseJSON(msg);
                    
                    
                    $.fn.checkNavigationPanelVisibility(data.length,'1','Changes')
                    
                    $.gen.changesSet = data

                    
                    $.fn.resetChanges(data.length)    
                    
                    $.fn.buildChangesSet(data)
                    $.fn.checkPagesNavigators(1)
                }else{
                    $('#changesNavigationPanel').hide()
                    $('#noResultsChanges').show()
                    $('#isResultsChanges').hide()
                }                       
            },
            error: function (msg) {
            },
        })

    }
})(jQuery);  
