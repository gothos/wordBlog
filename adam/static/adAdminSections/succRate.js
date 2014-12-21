(function ($) {
    $.fn.buildSuccRateTh = function(suffix,flag){
        if (flag == 1){
            var names = ['Úspešnosť (%)','od najvyššej','od najnižšej']
        }else{
            var names = ['Success rate (%)','From highest','From lowest']
        }
        var i = 0
        var addon = []
        addon[i++] = '<th id="" class="addWord" style="width:220px;text-align:left">'
            addon[i++] = '<div>'
                addon[i++] = '<div style="display:inline-block">'
                    addon[i++] = names[0]
                addon[i++] = '</div>'
                addon[i++] = '<div style="display:inline-block;padding-left:20px">'
                    addon[i++] = '<select id ="selectSuccRate'+suffix+'" class="selectSuccRate'+suffix+'" style="line-height:11px;font-size:11px;padding:2px;width:90px;padding-right:15px">'
                        addon[i++] = '<option class="optionSuccRate" value="1" selected>'
                            addon[i++] = '--'
                        addon[i++] = '</option>'
                        addon[i++] = '<option class="optionSuccRate" value="2">'
                            addon[i++] = names[1]
                        addon[i++] = '</option>'
                        addon[i++] = '<option class="optionSuccRate" value="3">'
                            addon[i++] = names[2]
                        addon[i++] = '</option>'
                    addon[i++] = '</select>'
                addon[i++] = '</div>'
                
            addon[i++] = '</div>'
        addon[i++] = '</th>'
        return addon.join('')

    }
})(jQuery);


