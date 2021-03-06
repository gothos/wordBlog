(function ($) {
    $.fn.returnToUserDetailPage = function(){

        $('div[class="subcontent"]').not('#menuCampaigns').hide()
        $('#menuCampaigns').show()
        $('tr[class="adMenu"]').hide()
        $('#userMenu').show()
        $('div[class="header"]').hide()
        $('#userHeader').show()
        
        $.fn.addBackToMainAdminPageHandler()
        
        $('#backslash2').remove()
        $('#campaignNameAdminNavigationTd').remove()
        $('#nicknameAdminNavigation').css('cursor','default').css('opacity','0.4')
        
        

    }

    $.fn.buildOverAdmin = function(idCampaign){
        
        var value = parseInt($('#statusCampaign'+idCampaign+'').attr('value'))
        
        var i = 0
        var addon = []
        addon[i++] = $.fn.buildRemark(2)
        addon[i++] = $.fn.buildStatusOverTable(idCampaign,2,value)
        addon[i++] = $.fn.buildNavigationPanel(1)
        addon[i++] = $.fn.buildOverTable(2)
        
        $('#menuOver').append(addon.join(''))
        $('#remark').css('margin-bottom','20px')
        $.fn.addNavigationDivHoveringEffect(2)
        $.fn.addOverNavigationDivClickHandler()
        
        var L = $.fn.giveMeColor(value)
            
            
        var color = L[1]
            
        $('#tdStatusCampaignOver'+idCampaign+'').css('background-color',color)
    }




    $.fn.addNicknameToNavigation = function(name){
        var i = 0
        var addon = []

        addon[i++] = '<td style="padding-left:5px;padding-right:5px" id="backslash2">'
            addon[i++] = '\/' 
        addon[i++] = '</td>'
        addon[i++] = '<td id="campaignNameAdminNavigationTd">'
            addon[i++] = '<div style="cursor:default;opacity:0.4" id="campaignNameAdminNavigation" >'
                addon[i++] = name
            addon[i++] = '</div>' 
        addon[i++] = '</td>'
        
        $('#adminNavigation > tbody >tr:last').append(addon.join(''))
        $('#nicknameAdminNavigation').css('cursor','pointer').css('opacity','1.0')
        $('#nicknameAdminNavigation').click(function(){
            $.fn.returnToUserDetailPage()
            
            
        })
    }


    $.fn.addEditCampaignHandler = function(idCampaign,name){


        $('#editCampaign'+idCampaign+'').click(function(){
            $('div[class="menu"]').not($('#overDetail')).css('opacity',1.0).css('cursor','pointer')
            
            $('#overDetail').css('opacity',0.4).css('cursor','default')
            $('#myCampaignHeader').text('')
            $('div[class="header"]').hide()
            $('#myCampaignHeader').show().text(name)
            
            $('#campaignMenu').show()
            $('tr[class="adMenu"]').not($('#campaignMenu')).hide()
            
            $('#menuOver').show()
            $('#menuCampaigns').hide()
            
            
            $('#backArrow').unbind('click')
            $('#backArrow').click(function(){

                $.fn.returnToUserDetailPage()     
            })
            $.fn.addNicknameToNavigation(name)
            $.fn.fillCampaignContentAdmin(idCampaign)
            

        })

    }
})(jQuery);
