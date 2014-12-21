(function ($) {
    $.fn.buildFilterTable = function(num){

        var names = ['camp','over','CPCs','stat','changes','mainChanges']
        var suffix = $.fn.capitaliseFirstLetter(names[num])
        var i = 0
        var addon = []
        addon[i++] = '<table id="filterTable'+suffix+'" cellpadding="0" cellspacing="0" border="0" style=";position:relative;margin-top:25px">'
            addon[i++] = '<tr>'
                addon[i++] = '<td>'
                    addon[i++] = '<div>'
                        addon[i++] = 'od:'
                    addon[i++] = '</div>'
                addon[i++] = '</td>'
                addon[i++] = '<td style="padding-left:15px">'
                    addon[i++] = '<input id="'+names[num]+'From" type="text" class="blog" style="width:110px">'
                addon[i++] = '</td>'
                addon[i++] = '<td style="padding-left:25px">'
                    addon[i++] = '<div>'
                        addon[i++] = 'do:'
                    addon[i++] = '</div>'
                addon[i++] = '</td>'
                addon[i++] = '<td style="padding-left:15px">'
                    addon[i++] = '<input id="'+names[num]+'To" type="text" class="blog" style="display:block;width:110px">'
                addon[i++] = '</td>'
            addon[i++] = '</tr>'
        addon[i++] = '</table>'
        
        
        return addon.join('')
    }


    $.fn.insertPeriods = function(flag,extent){
        console.log('inserting',flag)
        if (flag == 1){
            var from = $('#statFrom')
            var to = $('#statTo')
        }
        if (flag == 2){
            var from = $('#changesFrom')
            var to = $('#changesTo')
        }
        if (flag == 3){
            var from = $('#CPCsFrom')
            var to = $('#CPCsTo')
        }
        if (flag == 4){
            var from = $('#mainChangesFrom')
            var to = $('#mainChangesTo')
        }
        month = extent.monthFrom - 1
        from.datepicker("setDate",new Date(extent.yearFrom,month,extent.dayFrom))
        month = extent.monthTo - 1
        to.datepicker("setDate",new Date(extent.yearTo,month,extent.dayTo))
        
    }
})(jQuery);
