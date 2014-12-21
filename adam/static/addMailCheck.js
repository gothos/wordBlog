(function ($) {
    $.fn.addMailCheck = function(input,errDiv){
        var flag = 0
        
        
        errDiv.text('')
        
        input.removeClass('errBorder')
        input.mailcheck({
            domains: $.dom.domains,                      
            topLevelDomains: $.dom.topLevelDomains,
            suggested: function(element, suggestion) {
                val = (unescape(suggestion.address)).replace(/\s+/g,"")
                
                var i = 0
                var addon = []
                addon[i++] = 'Mali ste na mysli '
                addon[i++] = '<span id = "fullAddr" style="cursor:pointer;">'
                    addon[i++] = '<u>'
                        addon[i++] = val+'@';
                        addon[i++] = '<span id="sugDom" style="font-weight:bold">';
                            addon[i++] = suggestion.domain
                        addon[i++] = '</span>'
                    addon[i++] = '</u>'
                addon[i++] = '</span>'
                addon[i++] = '?'
                
                
                errDiv.append(addon.join(''))
                    
                $('#fullAddr').click(function(){
                    
                    input.val($("#fullAddr").text());
                    input.removeClass('errBorder')
                    errDiv.text('')
                })
                        
                        
            
                input.addClass('errBorder')

                flag = 1
            },
            empty: function(element) {
                value = $.trim(input.val())
                input.removeClass('errBorder')
                if (value.length === 0){
                    errDiv.append('Toto pole nesmie zostať prázdne.')
                     
                    
                    
                    input.addClass('errBorder')
                    flag = 1
                    
                }else{
                
                    if ( /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value) == false){
                           
                        errDiv.append('Zadaný email je v nesprávnom formáte')
                            
                        
                        
                        input.addClass('errBorder')
                        flag = 1

                                     
                    
                    }
                        
                    
                    
                }

            }
            
        
        });
        return flag

    }
})(jQuery);
