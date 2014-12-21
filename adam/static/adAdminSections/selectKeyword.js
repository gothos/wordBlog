(function ($) {
    $.fn.addSelectKeywordHandler = function(){
        $('#selectKeyword').on('change',function(){
            var value = $(this).val()
            
            $('#showStatInput').attr('value',$.cookie('csrftoken'))
            $('#showStatIdWord').attr('value',value)
            $('#showStatIdCampaign').attr('value',$.gen.campaignIdCampaign)
            var frm = $('#showStatForm')
            $.ajax({
                type: frm.attr('method'),
                url: frm.attr('action'),
                data: frm.serialize(),
                cache: false,
                beforeSend: function(){
                    
                    
                    
                
                },
                         
                success: function (msg) {
                    $('#stat tr').not($('#statHeader')).remove()

                    $('#statNavigationPanel').hide()
                    if (msg != 0){
                    
                        $('#isStat').show()
                        $('#noStat').hide()
                        var data = $.parseJSON(msg);
                        $.fn.resetStat(data.statistics.length)
                        $.fn.buildStatSet(data.statistics)
                        $.fn.insertPeriods(1,data.wordsPeriodsExtent)
                    }else{
                        $('#isStat').hide()
                        $('#noStat').show()

                    }
                },
                error: function (msg) {
                },
            })
        })
    }
})(jQuery);
