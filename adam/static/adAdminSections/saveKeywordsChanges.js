(function ($) {
    $.fn.deleteFromDefaultList = function(idWord){
        
        for (var i = 0,len = $.gen.defListOver.length; i < len;i++){
        
            if ($.gen.defListOver[i].idWord == idWord){
                $.gen.defListOver.splice( $.inArray($.gen.defListOver[i],$.gen.defListOver), 1 );
                break
            } 
                    
        }
        
        for (var key in $.gen.dicOver){
            if ($.gen.dicOver.hasOwnProperty(key)) {
                for (var i = 0,len = $.gen.dicOver[key].length; i < len;i++){
                    if ($.gen.dicOver[key][i].idWord == idWord){
                        $.gen.dicOver[key].splice( $.inArray($.gen.dicOver[key][i],$.gen.dicOver[key]), 1 );
                        break
                        
                    }
                }
                if ($.gen.dicOver[key].length == 0){
                    
                    $.gen.succRatesOver.remove(key)
                    
                    delete $.gen.dicOver[key]
                    
                            
                }

            }
        }
        

    }



    $.fn.addSaveKeywordsHandler = function(idCampaign){
        $('#saveKeywords').click(function(){

            $('#saveKeywordsChangesIDsInput'+idCampaign+'').attr('value',$.gen.keywordIDs)

            $('#saveKeywordsInput').attr('value',$.cookie('csrftoken'))
            var frm = $("#saveKeywordsChangesForm"+idCampaign+"")
            $.ajax({
                type: frm.attr('method'),
                url: frm.attr('action'),
                data: frm.serialize(),
                cache: false,
                beforeSend: function(){
                    
                    
                
                },
                         
                success: function (msg) {
                    
                    var data = $.parseJSON(msg);
                    var flag = 0;
                    if (data.old.length > 0){
                        
                        
                        
                        for (var i = 0,len = data.old.length;i<len;i++){
                        
                            $('#keyword_'+data.old[i]+'').remove()
                            
                            $.fn.deleteFromDefaultList(data.old[i])
                            
                            $("#option_"+data.old[i]+"").remove()
                            
                            
                        }
                        
                        
                        
                        
                        flag = 1 
                    }
                    
                    if (data.new.length > 0){
                        for (var i = 0,len = data.new.length;i<len;i++){
                            $.fn.buildOverRecord( data.new[i].idWord,data.new[i].name,0,0,'-')
                    
                            $('#selectKeyword').append('<option id="option_'+data.new[i].idWord+'" class="optionKeyword" value="'+data.new[i].idWord+'" style="" >'+data.new[i].name+'</option>')
                            
                            
                            var dic = {'idWord':data.new[i].idWord,'name':data.new[i].name,'clicks':0,'views':0,'succRate':0}
                            
                            
                            $.gen.defListOver.push(dic)
                            var successRate = 0
                            
                            if (!(successRate in $.gen.dicOver)){
                                
                                $.gen.dicOver[successRate] = [dic]
                                $.gen.succRatesOver.push(successRate)
                            }else{
                                
                                $.gen.dicOver[successRate].push(dic)
                            }
                            
                            
                            
                            
                        }
                        
                        $.gen.defListOver = $.gen.defListOver.sort(function(a, b){
                            var a1= a.name, b1= b.name;
                            if(a1== b1) return 0;
                            return a1> b1? 1: -1;
                        });
                        
                        $('.optionKeyword').sortElements(function(a, b){
                            return $(a).text() > $(b).text() ? 1 : -1;
                        });
                        
                        
                        

                        
                        
                        
                        flag = 1;
                    }
                    if (flag == 1){
                        //$('#selectSuccRateOver> option[value="1"]').prop('selected',true)
                        //console.log($('#selectSuccRateOver > option:selected').val())
                        var len = $.gen.defListOver.length
                        $.fn.resetOver(len,1)
                        //$.fn.getOver()
                        $.fn.getResults(1)
                        $.fn.checkNavigationPanelVisibility(len,'3','Over')
                        $.fn.checkPagesNavigators(3)
                    }    

             
                },
                error:function(msg){
                },
        
        
            }).done(function(){
                $('#saveKeywords').prop('disabled',true)
                $('#saveKeywords').css('cursor','default')
            })
        })
    }
})(jQuery); 
