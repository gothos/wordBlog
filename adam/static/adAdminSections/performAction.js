(function ($) {
    $.fn.addActionButtonHandler = function(flag){
        console.log('actionBut-+-+-+-+',flag,$.gen.actionButtonEnabled)
        if ($.gen.actionButtonEnabled == 1){
            
        
            if (flag == 1){
                var add = 'Over'
            }else{
                var add = ''
            }
            
            $('div[class="actionButton'+add+'"]').click(function(){
                console.log('launched')
                var value = $(this).attr('value')
                
                $('#campaignActionInput'+value+'').attr('value',$.cookie('csrftoken'))
                var frm = $('#campaignActionForm'+value+'')
                
                $.ajax({
                    type: frm.attr('method'),
                    url: frm.attr('action'),
                    data: frm.serialize(),
                    cache: false,
                    beforeSend: function(){
                        
                        
                        
                    
                    },
                             
                    success: function (msg) {
                        console.log('adamek',msg)
                        var data = $.parseJSON(msg);
                        if (data.status == 2){
                            var campaignStatus = $.gen.statusActive                                  
                        }else{
                        
                            var campaignStatus = $.gen.statusPaused
                        
                        }
                        $('#timePeriodCampaign'+add+data.idCampaign+'').text(data.timePeriod)
                        $('#statusCampaign'+data.idCampaign+'').attr('value',data.status)
                        
                        $('#statusCampaign'+add+data.idCampaign+'').text(campaignStatus)
                        $.fn.setColor(data.status,data.idCampaign,add)
                        
                        

                    },
                    error:function(msg){
                    },
                })
                
                
            
            })
        }
    }
})(jQuery);
