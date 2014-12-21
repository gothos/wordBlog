(function ($) {
    $.fn.addEditCampaignHandler = function(idCampaign,name){

        $('#editCampaign'+idCampaign+'').click(function(){
            
            $('div[class="menu"]').not($('#overDetail')).css('opacity',1.0).css('cursor','pointer')
            $('#overDetail').css('opacity',0.4).css('cursor','default')
            $.gen.campaignIdCampaign = idCampaign
            $('#myCampaignHeader').text('')
            $('#myCampaignHeader').show().append(name)
            $('div[class = "header"]').not($('#myCampaignHeader')).hide()
            
            $('#campaignMenu').show()
            $('tr[class="adMenu"]').not($('#campaignMenu')).hide()
            
            $('#menuOver').show()
            $('#menuCampaigns').hide()
                                       
            $.fn.fillCampaignContent($('#menuAdDescription'),$('#menuAddKeyword'),idCampaign)
            
            $('#backArrow').unbind('click')
            $('#backArrow').click(function(){
                $.fn.returnToCampaignList(2)
            })
            
                          
            
        })
    }
})(jQuery);






