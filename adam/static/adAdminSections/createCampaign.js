(function ($) {
    $.fn.addFinishCampaignCreationHandler = function(){
        
        $('#finishCampaignCreationButton').click(function(){
            console.log('clicked')
            $('#keywordIDsInput').attr('value',$.gen.keywordIDs)
        
            $('#createCampaignInput').attr('value',$.cookie('csrftoken'))
            var frm = $('#createCampaignForm')
           
            $.ajax({
                type: frm.attr('method'),
                url: frm.attr('action'),
                data: frm.serialize(),
                cache: false,
                beforeSend: function(){
              
                },   
                success: function (msg) {
                    console.log(msg)
                    var data = $.parseJSON(msg);
                    if (data.status == 1){
                        $('#noCampaigns').hide()
                        $('#campaignsList').show()
                        
                        var dic = {'idCampaign':data.idCampaign,'name':data.name,'status':1,'successRate':'-','timePeriod':'-'}
                        $.gen.campaignsList.unshift(dic)
                        $.fn.resetCamp($.gen.campaignsList.length)
                        $.fn.getCamp()
                        $('#succesfulCampaignCreation').fadeIn()
                        setTimeout(function(){ $('#succesfulCampaignCreation').fadeOut() }, 5000)
                        $('#returnFromCampaignCreation').click(function(){
                            $.fn.returnToCampaignList(1)
                        })
                        
                        $.fn.checkNavigationPanelVisibility($.gen.campaignsList.length,'3','Camp')
                        $.fn.checkPagesNavigators(0)
                        $('#finishCampaignCreationButton').css('cursor','default')
                        $('#finishCampaignCreationButton').prop('disabled',true)
                        

                    }
                   
                },
                error: function(msg){
                    alert('error')
                },
            }).done(function(){
               
            })
        
        })
    }
})(jQuery);
