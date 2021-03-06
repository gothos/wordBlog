(function ($) {
    $.fn.addSaveBillingInfoHandler = function(){
        
        $('#saveBillingInfoButton').click(function(){
            $('#saveBillingInfoInput').attr('value',$.cookie('csrftoken'))
            var frm = $('#saveBillingInfoForm')
           
            $.ajax({
                type: frm.attr('method'),
                url: frm.attr('action'),
                data: frm.serialize(),
                cache: false,
                beforeSend: function(){
                    if ($.fn.checkBillingInfo() == 0){
                        $('#saveBillingInfoButton').prop('disabled',true)
                        $('#saveBillingInfoButton').css('cursor','default')
                        return false
                    }

                },   
                success: function (msg) {
                  
                    $.gen.isBillingInfo = 1
                    
                    
                    $('#billingInfoCompleteDiv').show()
                    $('#billingInfoMissingDiv').hide()

                    
                    console.log('fadingIn')
                    $('#succesfulBillingInfoSave').fadeIn()
                     
                    
                    setTimeout(function(){ $('#succesfulBillingInfoSave').fadeOut() }, 5000)
                    console.log('fadingOut')
                    
                    
                    $('#saveBillingInfoButton').prop('disabled',true)
                    $('#saveBillingInfoButton').css('cursor','default')
                },
                error: function(msg){
                    alert('error')
                },
            })
        })
    }

    $.fn.checkBillingInfo = function(){
        var flag = 0
        var params = [0,0,0,4,5,6,7,8]
        
        for(var z = 0,len=$.gen.idsCompany.length;z<len;z++){
            var selector = $('#id_'+$.gen.idsCompany[z]+'')
            
            var capitalizedIDs = capitaliseFirstLetter($.gen.idsCompany[z])
            
            if ($.fn.checkField(selector,$('#err'+capitalizedIDs+''),params[z]) == 0){
                flag = 1
            } 

        }
        
        
        if (flag == 0){
           
            return 1
        }else{
            
            return 0
        }
    }
})(jQuery);
