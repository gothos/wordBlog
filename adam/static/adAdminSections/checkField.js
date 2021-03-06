(function ($) {
    $.fn.addFocusFieldsHandler = function(selector,num,errDiv){

        selector.focus(function(){
            errDiv.text('')
        })
        selector.focusout(function(){
            $.fn.checkField(selector,errDiv,num) 
            
        
        })
    }


    $.fn.checkField = function(selector,errDiv,flag){

        var value = $.trim(selector.val())
        if (value.length == 0){
            errDiv.text($.general.errMsg)
            return 0
        }else{
            if ( flag == 1){ 
                if ($.fn.validateNumber(value) == 0){
                    errDiv.text('Pole môže obsahovať len číslo')
                    return 0
                }
            }
            if ( flag == 2 ){ 
                if ($.fn.validateUrl(value) == 0){
                    errDiv.text('Cieľová URL nie je v správnom formáte (http(s)://www.priklad.sk)')
                    return 0
                }
                var online = navigator.onLine;    // Detecting the internet connection
                if(!online) {
                   alert('Pre overenie platnosti cieľovej adresy musíte byť pripojený k internetu');
                   return 0
                }
                
                $.fn.onlineValidateUrl(value,errDiv)
            }
            
            if (flag == 3){
                if ($.fn.validateName(value) == 0){
                    errDiv.text('Zadaný názov reklamy už existuje')
                    return 0
                }
                
            }
            if (flag == 4){
                if ($.fn.validateZIP(value) == 0){
                    errDiv.text('Zadaná PSČ nie je v správnom formáte')
                    return 0
                }
            }
            if (flag == 5){
                if ($.fn.validatePhoneNumber(value) == 0){
                    errDiv.text('Zadané telefónne číslo nie je v správnom formáte')
                    return 0
                }
            }
            if (flag == 6){
                if ($.fn.addMailCheck(selector,errDiv) == 1){
                    return 0
                }
            }
            if (flag == 7){
                if ($.fn.validateIC(value) == 0){
                    errDiv.text('Zadané IČ nie je v správnom formáte')
                    return 0
                }
            }
            if (flag == 8){
                if ($.fn.validateDIC(value) == 0){
                    errDiv.text('Zadané DIČ nie je v správnom formáte')
                    return 0
                }
            }
            
            
            return 1
            
        }
        
        
    }



    $.fn.validateNumber = function(variable){
        var reg = /^\d*\.?\d*$/
        if (reg.test(variable)){
            return 1
        }else{
            return 0
        }
    }





    $.fn.validatePhoneNumber = function(variable){
        if(/^((00421)|(\+ ?421) ?\d{3})|(0\d{3}) ?\d{3} ?\d{3}$/i.test(variable)){
            return 1
            
        }
        
        
        if( /^((00421)|(\+ ?421))? ?0\d{2} ?\d{3} ?\d{2} ?\d{2}$/i.test(variable)){
            return 1
            
        }
        if( /^((00420)|(\+ ?420))? ?\d{3} ?\d{3} ?\d{3}$/i.test(variable)){
            return 1
            
        }
        return 0
        
        
    }




    $.fn.validateZIP = function(variable){
        if(/^[1-9]{1}[0-9]{2}\s?[0-9]{2}$/i.test(variable)){
            return 1
        }else{
            return 0
        }
    }

    $.fn.validateIC = function(variable){

        if(/^\d{8}$/i.test(variable)){
            return 1
        }else{
            return 0
        }
    }



    $.fn.validateDIC = function(variable){


        if(/^\d{10}$/i.test(variable)){
            return 1
        }else{
            return 0
        }
    }




    $.fn.validateUrl = function(variable){
        if(/^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(variable)){
            return 1
        }else{
            return 0
        }

    }


    $.fn.onlineValidateUrl = function(value,errDiv){
        $('#onlineValidateUrlInput').attr('value',$.cookie('csrftoken'))
        $.gen.flag = 0
        $('#urlInput').attr('value',value)
        var frm = $('#onlineValidateUrlForm')
        return $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            cache: false,
            
            
            beforeSend: function(){
                $('#gifImg').attr('src','/wordBlog/adam/static/loading.gif')
            },   
            success: function (msg) {
                $('#gifImg').attr('src','')
                if (msg > 1){
                    $.gen.flag = 0
                    errDiv.text('Cieľová adresa nie je platná')
                }else{
                     $.gen.flag = 1
                    
                    
                }
            },
            error:function(msg){
            },
        })

        
    }
})(jQuery);


