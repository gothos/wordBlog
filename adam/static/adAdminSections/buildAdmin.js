(function ($) {

    $.fn.buildUserForms = function(data){
        var i = 0
        var addon = []
        for (var k = 0,len = data.length;k<len;k++){
            addon[i++] = '<form id="userDetailForm'+data[k].id+'" action= "'+$.general.prefix+'/userDetail/" method="post">'
                addon[i++] = "<input style='display:none' name='csrfmiddlewaretoken' value='' id ='userDetailInput"+data[k].id+"'>"
                addon[i++] = "<input style='display:none' name='userId' value='"+data[k].id+"' id =''>"
            addon[i++] = '</form>'
            
        }
        return addon.join('')
    }




    $.fn.addUserClickHandlers = function(data){
        
        for (var k = 0,len = data.length;k<len;k++){
            
            $.fn.addUserClickHandler(data[k].id,data[k].nickname)
        }
    }



    $.fn.addMenuAdminClickHandler = function(){
        $('div[class="menu"]').click(function(){
            var menus = [$('#menuOver'),$('#menuStat'),$('#menuDetails'),$('#menuCPCs'),$('#menuChanges')]
            var nums = [3,4,5,8,9]
            $('div[class="menu"]').not(this).css('opacity','1.0').css('cursor','pointer')
            $(this).css('opacity','0.4').css('cursor','default')
            var value = parseInt($(this).attr('value'))
            
            for (var k = 0,len = nums.length; k < len; k++){
                
                
                if ( value == nums[k]){
                    var selector = menus[k]
                }
                    
                    
            }
            
            selector.show()
            $('div[class="subcontent"]').not(selector).hide()
            
        })
    }

    $.fn.addUserMenuClickHandler = function(){
        var menus = [$('#menuCampaigns'),$('#menuBills'),$('#menuBilling'),$('#menuMainChanges')]
        $('div[class="userMenu"]').click(function(){
            $('div[class="userMenu"]').not(this).css('opacity','1.0').css('cursor','pointer')
            $(this).css('opacity','0.4').css('cursor','default')
            for (var k = 1,len = 5; k < len; k++){
                
                
                if ($(this).attr('value') == k){
                    var selector = menus[k-1]
                }
                
                
            }
            
            
            
            selector.show()
            $('div[class="subcontent"]').not(selector).hide()
            
        })
    }


    $.fn.addMainPageClickHandler = function(){
        $('#mainPageAdmin').click(function(){
            $.fn.returnToMainPageAdmin() 
        })
    }

    $.fn.returnToMainPageAdmin = function(){
        $('div[class="subcontent"]').not('#menuUsersList').hide()
        $('#menuUsersList').show()
        $('tr[class="adMenu"]').hide()
        $('#usersList').show()
        $('div[class="header"]').hide()
        $('#topHeaderAdmin').show()
        console.log('back')
        $.fn.addBackArrowHandler()
        $('#adminNavigation').hide()
    }


    $.fn.buildUserSet = function(data){
        var i = 0
        var addon = []
        for (var k = 0,len = data.length;k<len;k++){
            addon[i++] = $.fn.buildUserRecord(data[k].id,data[k].nickname,data[k].numOfCampaigns,data[k].numOfActiveCampaigns,data[k].numOfPausedCampaigns)
        }
        return addon
        
    }

    $.fn.buildUserRecord = function(id,nickname,numOfCampaigns,numOfActiveCampaigns,numOfPausedCampaigns){
        var i = 0
        var addon = []
        addon[i++] = '<tr>'
            addon[i++] = '<td class="addWord">'
                addon[i++] = '<div>'
                    addon[i++] = id
                addon[i++] = '</div>'
            addon[i++] = '</td>'
            addon[i++] = '<td class="addWord">'
                addon[i++] = '<div id="user'+id+'" style="cursor:pointer;text-decoration:underline" class="tyrkys">'
                    addon[i++] = nickname
                addon[i++] = '</div>'
            addon[i++] = '</td>'
            addon[i++] = '<td class="addWord">'
                addon[i++] = '<div>'
                    addon[i++] = numOfCampaigns
                addon[i++] = '</div>'
            addon[i++] = '</td>'
            addon[i++] = '<td class="addWord">'
                addon[i++] = '<div>'
                    addon[i++] = numOfActiveCampaigns
                addon[i++] = '</div>'
            addon[i++] = '</td>'
            addon[i++] = '<td class="addWord">'
                addon[i++] = '<div>'
                    addon[i++] = numOfPausedCampaigns 
                addon[i++] = '</div>'
            addon[i++] = '</td>'
        addon[i++] = '</tr>'
        return addon.join('')
    }


    $.fn.buildAdmin = function(data){
        var data = $.parseJSON(data)
        var i = 0
        var addon = []
        addon[i++] = "<div id='' style='border:1px solid red;display:block;width:100%;height:100%;'>"
            addon[i++] = "<div id='topLDiv' style='border:1px solid black;margin:25px;height:25px;line-height:25px'>"
                addon[i++] = "<div id='topHeaderAdmin' style='display:block;font-size:18px;border:1px solid red' class='header'>"
                    addon[i++] = "Admin"
                addon[i++] = "</div>"
                addon[i++] = "<div id='myCampaignHeader' style='display:none;font-size:18px;border:1px solid red' class='header'>"
                addon[i++] = "</div>"
                addon[i++] = "<div id='userHeader' style='display:none;font-size:18px;border:1px solid red' class='header'>"
                addon[i++] = "</div>"
            addon[i++] = "</div>"
            addon[i++] = "<div class='contento' style=';border:1px solid black;background-color:white;display:block;margin-bottom:25px;position:relative;min-height:500px'>"
                addon[i++] = '<table id="topPanel" cellpadding="0" cellspacing="0" border="0" style=";position:relative;">'
                    addon[i++] = '<tr>'
                        addon[i++] = '<td>'
                            addon[i++] = '<div id="arrows" style="height:38px;">'
                                addon[i++] = '<img src="/static/imas.jpg" height="38px" class="rotate90" id="backArrow">'
                            addon[i++] = '</div>'
                        addon[i++] = '</td>'
                        addon[i++] = '<td style="padding-left:25px">'
                            addon[i++] = '<table id = "adminNavigation" cellpadding="0" cellspacing="0" border="0" style=";position:relative;display:inline-block;display:none">'
                                addon[i++] = '<tr>'
                                    addon[i++] = '<td id="mainPageTd">'
                                        addon[i++] = '<div style="cursor:pointer" id="mainPageAdmin">'
                                            addon[i++] = 'Main page'
                                        addon[i++] = '</div>' 
                                    addon[i++] = '</td>'
                                
                                
                                
                                addon[i++] = '</tr>'
                            addon[i++] = '</table>'
                        addon[i++] = '</td>'
                    addon[i++] = '</tr>'
                addon[i++] = '</table>'
                
                
                addon[i++] = '<div id = "menu">'
                    addon[i++] = '<div style="border-bottom:1px solid #e5e5e5;border-top:1px solid #e5e5e5;" >'
                        addon[i++] = '<table id="outerDiv" cellpadding="0" cellspacing="0" border="0" style=";position:relative;line-height:35px">'
                            
                            addon[i++] = '<tr id="usersList" class="adMenu" style="display:block">'
                                addon[i++] = '<td style="width:150px">'
                                    addon[i++] = '<div id = "userListDiv" class="mainMenu" style="opacity:0.4;cursor:default" value=1>'
                                        addon[i++] = 'Briefing'
                                    addon[i++] = '</div>'
                                addon[i++] = '</td>'
                            addon[i++] = '</tr>'
                            addon[i++] = '<tr id="userMenu" class="adMenu" style="display:none">'
                                var ids = ["campaignsList","bills","billingInfo","campLog"]
                                var names = ['Campaigns','Bills','Billing data','Changes']
                                for (var k = 0,len = ids.length;k<len;k++){
                                    if (k == 0){
                                        var cursor = 'default'
                                        var opacity = '0.4'
                                    }else{
                                        var cursor = 'pointer'
                                        var opacity = '1.0'
                                    }
                                    addon[i++] = '<td style="width:150px">'
                                        addon[i++] = '<div id = '+ids[k]+' class="userMenu" style="cursor:'+cursor+';opacity:'+opacity+'" value='+(k+1).toString()+'>'
                                            addon[i++] = names[k]
                                        addon[i++] = '</div>'
                                    addon[i++] = '</td>'
                                    
                                } 
                                
                                
                            
                            
                            addon[i++] = '</tr>'
                            addon[i++] = $.fn.buildCampaignHeaders(2)
                        addon[i++] = '</table>'
                    addon[i++] = '</div>'
                    addon[i++] = '<div id="subcontent" style="margin-top:25px">'
                        addon[i++] = '<div id="menuUsersList" class="subcontent">'
                            addon[i++] = '<table id="users" cellpadding="0" cellspacing="0" border="0" style=";position:relative;">'
                                addon[i++] = '<thead>'
                                    addon[i++] = '<tr>'
                                        addon[i++] = '<th class="addWord">'
                                            addon[i++] = 'ID'
                                        addon[i++] = '</th>'
                                        addon[i++] = '<th class="addWord">'
                                            addon[i++] = 'Nickname'
                                        addon[i++] = '</th>'
                                        addon[i++] = '<th class="addWord">'
                                            addon[i++] = 'Number of campaigns'
                                        addon[i++] = '</th>'
                                        addon[i++] = '<th class="addWord">'
                                            addon[i++] = 'Number of active campaigns'
                                        addon[i++] = '</th>'
                                        addon[i++] = '<th class="addWord">'
                                            addon[i++] = 'Number of paused campaigns'
                                        addon[i++] = '</th>'
                                    addon[i++] = '</tr>'
                                    
                                addon[i++] = '</thead>'
                                addon[i++] = '</tbody>'
                                addon[i++] = $.fn.buildUserSet(data)
                                addon[i++] = '</tbody>'
                            addon[i++] = '</table>'
                            addon[i++] = '<div id="userDetailForms">'
                                addon[i++] = $.fn.buildUserForms(data)
                            addon[i++] = '</div>'
                            
                        
                        
                        addon[i++] = '</div>'
                        
                        var k = 0
                        var str = []
                        var menuTabs = ['menuStat','menuDetails','menuOver','menuCPCs','menuCampaigns','menuBills','menuBilling','menuMainChanges','menuChanges']
                        
                        for (var j = 0,len=menuTabs.length;j<len;j++){
                            str[k++] = '<div id = "'+menuTabs[j]+'" style=";display:none;position:relative" class="subcontent">'
                            str[k++] = '</div>'
                        }
                        addon[i++] = str.join('')
                        
                        
                    addon[i++] = '</div>' 
                addon[i++] = '</div>'                    
                
                
            addon[i++] = "</div>"
        addon[i++] = "</div>"
        $('#maina').append(addon.join(''))
        $.fn.addMainPageClickHandler()
        $.fn.addUserMenuClickHandler()
        $.fn.addMenuAdminClickHandler()
        $.fn.addUserClickHandlers(data)
        $.fn.addBackArrowHandler()

        
    }
})(jQuery);
