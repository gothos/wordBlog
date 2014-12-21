(function ($) {
    $.fn.addReturnFromBillingInfoHandler = function(){
        $('#returnFromBillingInfoCompletion').click(function(){
            $('#menuCampaigns').show()
            $('#menuBilling').hide()
            $('#myCampaigns').css('cursor','default').css('opacity','0.4')
            $('#billingInfoData').css('cursor','pointer').css('opacity','1.0')
        })
    }
})(jQuery);
