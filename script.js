

$.fn.giveMeLastNotifID = function(){

    var L = []
    if ($('.jspPane').length > 0){
        var notifs = $('.jspPane').children()
    }else{
        var notifs = $('#onlyNotifs').children()
    }
    for (var i = 0, len = notifs.length; i < len; i++){
        if (notifs[i].id[0] == 'w'){
            L.push(notifs[i].id.match(/[0-9 ]+/))
            
        }
    }
        
        
    if (L.length > 0){        
        lastNotif = L[L.length-1]
    }else{
        lastNotif = 0
    }
        
    
    $('#fromNotif').attr('value',lastNotif)
    




}



$.fn.reloadAllNotifs = function(flag){
    $('#checkNotifsInput').attr('value',$.cookie('csrftoken'))
    var frm = $('#checkForNotifsForm')         
    var jxhr = $.ajax({
        type: frm.attr('method'),
        url: frm.attr('action'),
        data: frm.serialize(),
        beforeSend: function(){

        },
        cache: false,
                 
        success: function (msg) {
            var data = $.parseJSON(msg);
            
            for (var i = 0, len = data.data.length; i < len; i++){
                var picName = 'default'
                var k = 0
                var addon = []
                
                   
                   
                
                addon[k++] = "<div id='winNotif"+data.data[i].pk+"' style='padding-bottom:15px;border:0px solid red;' class='hov'>"
                    addon[k++] = '<table id="outerDiv" cellpadding="0" cellspacing="0" border="0" style="position:relative">'
                        addon[k++] = '<tr>'
                            addon[k++] = '<td style="background-color:white;width:333px">'
                                addon[k++] = "<div id='notif"+data.data[i].pk+"' style='cursor:pointer;display:inline-block;border:0px solid black;width:333px'>"
                                    
                                    addon[k++] = "<div id='' style='display:inline-block;padding-right:5px;'>"
                                        
                                        
                                    if (data.data[i].isPicture == true){
                                            picName = data.data[i].personUsername
                                        }          
                                        addon[k++] = "<img class='photo' id = 'photoNotif"+data.data[i].pk+"' width='35px' height='35px' src='/pics/"+picName+".jpg?"+Math.random()+"'>"
                                        
                                    addon[k++] = "</div>"
                                    addon[k++] = "<div class='' style='width:290px;border:0px solid black;display:inline-block;vertical-align:top;word-wrap: break-word'>"
                                        addon[k++] = "<div style='width:100%;border:0px solid red;word-wrap: break-word;text-align:justify;font-size:11px'>"
                                            addon[k++] = ""+data.data[i].personNickname+" komentoval tvoj "
                                            if (data.data[i].idParentComment == 0 ){
                                                
                                                var add = "príspevok"
                                            }else{
                                                
                                                var add = "komentár"
                                            }
                                            addon[k++] = ""+add+" k téme "    
                                            addon[k++] = data.data[i].topicName
                                            addon[k++] = " : "
                                            addon[k++] = "\""+data.data[i].text+"...\""
                                        addon[k++] = "</div>"
                                        addon[k++] = "<form id='giveMeTheOneForm"+data.data[i].pk+"' method='post' action='"+$.general.prefix+"/giveMeTheOne/'>"
                                         
                                            addon[k++] = "<input name='csrfmiddlewaretoken' value='' id='csrfNotif"+data.data[i].pk+"' style='display:none'>"
                                            addon[k++] = "<input name='idComment' value='"+data.data[i].idComment+"' id='csrfNotif"+data.data[i].pk+"' style='display:none'>"
                                        addon[k++] = "</form>"
                                        
                                        
                                        addon[k++] = "<form id ='delNotifsForm"+data.data[i].pk+"' action='"+$.general.prefix+"/delNotifs/' method='post'>"
                                            addon[k++] = "<input style='display:none' name='csrfmiddlewaretoken' value='' id ='delNotifsInput"+data.data[i].pk+"'>";
                                            addon[k++] = "<input style='display:none' name='idcko' value='"+data.data[i].pk+"'>";
                                        addon[k++] = "</form>"
                                        addon[k++] = "<div class='date' title="+data.data[i].timestampCom+" style='display:block;padding-left:0px;padding-top:5px'>"+data.data[i].timestampCom+"</div>";
                                        
                                    addon[k++] = "</div>"
                                    
                                addon[k++] = "</div>"
                            addon[k++] = "</td>"
                            addon[k++] = "<td style='vertical-align:top;width:23px'>"
                                addon[k++] = '<div id="closeButNotif'+data.data[i].pk+'" class="close-btn6" style="display:inline-block;font-size:14px;margin-left:15px;margin-right:10px;line-height:11px">'
                                addon[k++] = '</div>'
                            addon[k++] = "</td>"
                        addon[k++] = '</tr>'
                    addon[k++] = '</table>'
                addon[k++] = "</div>"
	            if (flag == 1){
	                var pane = $('.onlyNotifs')
	                pane.jScrollPane({
	                    
			            verticalGutter: 15,
			            contentWidth:'0px',
	                });
	                var api = pane.data('jsp')
	                api.getContentPane().append(addon.join(''))
	                api.reinitialise();
	            }else{
	                $('#onlyNotifs').append(addon.join(''))
	            }
                
               
                jQuery("div.date").timeago();
                handler(data.data[i].pk,data.data[i].idTopic,data.data[i].idPost,data.data[i].idComment,data.data[i].idParentComment)
                
                $.fn.addDelNotifHandler(data.data[i].pk)
                
            }
            $.fn.displayMoreNotifsBut(data.beforeNotif)
              
            
        },
        error: function(msg){
        },
    }).done(function(){
        
        jQuery('#jspVerticalBar').appendTo('#vbar')
        
        
        
    })
}



$.fn.displayMoreNotifsBut = function(beforeN){

    $.fn.more(beforeN,$('#moreNotifsButton'),2,0)
    
    
}


$.fn.delNotifHandler = function(pk){


    $('#delNotifsInput'+pk+'').attr('value',$.cookie('csrftoken'))
    
    
    var frm = $('#delNotifsForm'+pk+'')         
    xhr = $.ajax({
        type: frm.attr('method'),
        url: frm.attr('action'),
        data: frm.serialize(),
        beforeSend: function(){
            

        },
        cache: false,
                 
        success: function (msg) {
            if (msg == 1){
	            $('#winNotif'+pk+'').remove()
	            var api = $('.onlyNotifs').data('jsp')
                if ($('.jspPane').length > 0){
                    jQuery('#jspVerticalBar').remove()  
                    
                    api.reinitialise();
                }
                
                
                var numOfNotifs = parseInt($('#numOfNotifs').text())
                numOfNotifs = numOfNotifs - 1
                if (numOfNotifs != 0){
                    $('#numOfNotifs').text(numOfNotifs)
                    if (numOfNotifs % 6 == 0){
                        api.destroy()
                    }
                }else{
                    $('#root').children().remove()
                    $('#numOfNotifs').text(0)
                    $('#numOfNotifs').css('color','#000')
                    $('#notifics').css('cursor','default')
                    $('#notifics').unbind()
                }
            }
        },
        error:function(msg){
        
        },
    }).done(function(){
        jQuery('#jspVerticalBar').appendTo('#vbar')
    })


}


$.fn.addDelNotifHandler = function(pk){
    

    var L = [$('#closeButNotif'+pk+''),$('#notif'+pk+'')]
    for (var i = 0, len = L.length; i < len; i++){
        L[i].click(function(){
            $.fn.delNotifHandler(pk)
            
        })
    }

}


$.fn.LoadTopicContent= function(num){

    $('#stuff').children().remove()
    $('#stuff').load(''+$.general.prefix+'/openTopic/domain/'+num+'');
    $('#stuff').attr('value',num)


}



$.fn.addLoadContentHandler = function(){ 
     $('div[id^="topic"]').click(function(){
        var topicNum = $(this).attr('value')
        var stuffNum = $('#stuff').attr('value')
        if (topicNum != stuffNum){
         
            $.fn.LoadTopicContent(topicNum)
         
            $(this).css('cursor','default');
            $('div[id^="topic"]').not(this).css('cursor','pointer');
            $('div[id^="topic"]').not(this).css('opacity','1.0');
            $(this).css('opacity','0.4')
        }
     })
}

function handler(id,idTopic,idPost,idComment,idParentComment){
    if (idParentComment == 0){
        var add = 'Post'
        var root = idPost
    }else{
        var add = 'Comment'
        var root = idComment
    }
    
    $('#notif'+id+'').click(function(){
        
        
        
        
        var i = 0
        var addon = []
        addon[i++] = '<div id="win" class="" style="border: 1px solid #7A858D;min-width:400px;max-width:622px">'
            addon[i++] = "<div style='border-top-right-radius: 6px;border-top-left-radius: 6px;'>"
                addon[i++] = "<div id='topLDiv' style=';margin:25px;border:0px solid black'>"
                    addon[i++] = "<div style='display:inline-block;font-size:17px'>"
                        addon[i++] = "Oznámenie"
                    addon[i++] = "</div>"
                    addon[i++] = "<div id='close-btn' class='close-btn6' style=''>"
                    addon[i++] = "</div>"
                addon[i++] = "</div>"
            addon[i++] = "</div>"
            addon[i++] = "<div  style='padding-bottom:25px;border-top: 1px solid #e5e5e5;background: #fff;border-bottom-right-radius: 6px;border-bottom-left-radius: 6px;'>"
                addon[i++] = "<div class='contento' style='margin-top:25px'>"
                    addon[i++] = '<div id="winContent" style="border:0px solid red">'
                    addon[i++] = '</div>'
                    addon[i++] = '<div id="winButtonDiv" style="margin-top:25px" class = "inpFSpace">'
                        addon[i++] = '<input id ="winButton" type="button" class="s"  value="OK" style="margin-right:10px">'
                        addon[i++] = '<input id ="discuss" type="button" class="s"  value="Prejst do diskusie" style="width:150px">'
                         
                    addon[i++] = '</div>'
                addon[i++] = '</div>'
            addon[i++] = '</div>'
        addon[i++] = '</div>'
        $.fn.lockBackground()
        $('#authent').append(addon.join(''))
        $('#win').click(function(e){
            e.stopPropagation()
        })
        $('#csrfNotif'+id+'').attr('value',$.cookie('csrftoken'))
        var frm = $('#giveMeTheOneForm'+id+'')
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            cache: false,                   
            success: function (msg) {
                var data = $.parseJSON(msg)
                
                var picName = 'default'
                var i = 0
                var addon = []
                addon[i++] = "<div id='win"+add+root+"' class=''>"
                    
                    addon[i++] = "<table cellpadding='0' cellspacing='0' border='0'>"
                        addon[i++] = "<tr>"
                            addon[i++] = "<td style='vertical-align:top'>"
                                addon[i++] = "<div id='' style='padding-right:5px'>"
                            
                                    if (data.isPicture == true){
                                        picName = data.personUsername
                                    }
                            
                            
                                    addon[i++] = "<img class='photo' id = 'winPhoto"+add+root+"' src='/pics/"+picName+".jpg?"+Math.random()+"'' style='width:48px;height:48px'>"
                                addon[i++] = "</div>"
                            addon[i++] = "</td>"
                            
                            addon[i++] = "<td style='vertical-align:top'>"
                                addon[i++] = "<div style='width:100%;border:0px solid red'>"
                                    addon[i++] = "<div class='' style=''>";
                                        addon[i++] = "<div class='username red' style='display:inline' >" +data.personName + "</div>";
                                        addon[i++] = "<div class='date' title="+data.timestamp+" style='display:inline'>"+data.timestamp+"</div><br>";  
                                    addon[i++] = "</div>";
                                    addon[i++] = "<div class='' style='width:100%;word-break:break-all;margin-top:5px' >"
                                        addon[i++] = data.coreText
                                    addon[i++] = "</div>"
                                addon[i++] = "</div>"
                            addon[i++] = "</td>"
                        addon[i++] = "</tr>"
                    addon[i++] = "</table>"
                    
                    
                    
                    addon[i++] = "<div id = 'winPlaceUnderDiv"+add+root+"' style='padding-left:56px;padding-top:15px' >";
                        
                        addon[i++] = "<table cellpadding='0' cellspacing='0' border='0'>"
                            addon[i++] = "<tr>"
                                addon[i++] = "<td style='vertical-align:top'>"
                                    addon[i++] = "<div id='' style='display:table-cell;padding-right:5px'>"
                                        var picName = 'default'
                                        if (data.comment.isPicture == true){
                                            picName = data.comment.personUsername
                                        }
                                        
                                        
                                        
                                        addon[i++] = "<img id = 'winPhotoComment"+idComment+"' src='/pics/"+picName+".jpg?"+Math.random()+"'' style='width:50px;height:50px'>"
                                    addon[i++] = "</div>"
                                addon[i++] = "</td>"
                                addon[i++] = "<td style='vertical-align:top'>"
                                    addon[i++] = "<div style='display:table-cell;vertical-align:top'>"
                                        addon[i++] = "<div class='' style=''>";
                                            addon[i++] = "<div class='username red' style='display:inline' >" +data.comment.personName + "</div>";
                                            addon[i++] = "<div class='date' title="+data.comment.timestamp+" style='display:inline'>"+data.comment.timestamp+"</div><br>";  
                                        addon[i++] = "</div>";
                                        addon[i++] = "<div class='' style='width:100%;word-break:break-all;margin-top:5px' >"
                                            addon[i++] = data.comment.comment
                                        addon[i++] = "</div>"
                                    addon[i++] = "</div>"
                                addon[i++] = "</td>"
                            addon[i++] = "</tr>"
                        addon[i++] = "</table>"
                        
                    addon[i++] = "</div>"
                        
                        
                        
                        
                        
                    
                addon[i++] = "</div>"
                $('#winContent').prepend(addon.join(''))
                $.fn.centerDiv()
                jQuery("div.date").timeago(); 
                            
            },
            error:function(msg){
            },
        })
        
        $('#discuss').click(function(){
            $.fn.unlockBackground()
            $('#stuff').load(''+$.general.prefix+'/discussTopic/domain/'+idTopic+'/comment/'+idPost+'');
            $('#stuff').attr('value',idTopic)    
                        
            
        })
        $('#winButton').click(function(e){
            $.fn.unlockBackground()
            e.stopPropagation()
            
        })
        $.fn.addCloseButtonHandler();
                     

        
        
    
    })
}




function checkForNotifs(){
   
    $('#checkForNumOfNotifsInput').attr('value',$.cookie('csrftoken'))
    var frm = $('#checkForNumOfNotifsForm')         
    var xhr = $.ajax({
        type: frm.attr('method'),
        url: frm.attr('action'),
        data: frm.serialize(),
        beforeSend: function(){

        },
        cache: false,
                 
        success: function (msg) {
            
            if (msg != 0){
                $('#numOfNotifs').text(msg)
                $('#numOfNotifs').css('color','red')
                $('#notifics').css('cursor','pointer')
                
                
                
                $('#notifics').click(function(e){
                    
                    if ($('#notificationsDiv').length == 1){
                        $('#root').children().remove()
                        $('#fromNotif').attr('value',0)
                        $('#root').css('display','none')
                        
                        
                        
                        
                        
                        
                        $('#checkForNumOfNotifsInput').attr('value',$.cookie('csrftoken'))
                        var frm = $('#checkForNumOfNotifsForm')          
                        var jxhr = $.ajax({
                            type: frm.attr('method'),
                            url: frm.attr('action'),
                            data: frm.serialize(),
                            beforeSend: function(){

                            },
                            cache: false,
                                     
                            success: function (msg) {
                                
                                if (msg != 0){
                                    $('#numOfNotifs').text(msg)
                                    $('#numOfNotifs').css('color','red')
                                    $('#notifics').css('cursor','pointer')
                                }else{
                                    $('#numOfNotifs').text(0)
                                    $('#numOfNotifs').css('color','black')
                                    $('#notifics').css('cursor','default')
                                    $('#notifics').unbind()
                                }
                                
                                
                                
                                
                            },
                            error:function(msg){
                            },
                        })
                        
                        
                        
                        
                        
                        
                        
                    }else{
                        $('#root').css('display','block')
                        
                        var data = $.parseJSON(msg);
                        var k = 0
                        var addon = []
                        addon[k++] = "<div id='notificationsDiv' style='width:408px;font-size:12px;position:absolute;right:0'>";
                            addon[k++] = "<div class='arrow' style='margin-left:303px;'>"
                            addon[k++] = "</div>"
                            addon[k++] = "<div id='notifDiv' class='' style='border-radius:6px;border: 1px solid #cccccc;min-height:50px;padding:13px;padding-bottom:0px;position:relative;width:374px'>"

                                
                                addon[k++] = '<table id="outerDiv" cellpadding="0" cellspacing="0" border="0" style="position:relative">'
                                    addon[k++] = "<tr>"
                                        addon[k++] = "<td style='border:0px solid red;width:366px !important'>"
                                            addon[k++] = "<div id='onlyNotifs' class='onlyNotifs' style='overflow:auto;border:0px solid red;;position:relative'>"
                                            addon[k++] = "</div>"
                                        addon[k++] = "</td>"
                                        addon[k++] = "<td id='vbar' style='border:0px solid black;width:8px'>"
                                        addon[k++] = "</td>"
                                    addon[k++] = "</tr>"
                                addon[k++] = "</table>"
                                addon[k++] = "<div style='height:20px'>"
                                    addon[k++] = "<input id = 'moreNotifsButton' type='button' class='button gray'  value='More' style='line-height:20px;display:none;cursor:pointer;border;margin-left:10px;margin-right:10px;'>"                  
                                addon[k++] = "</div>"
                            addon[k++] = "</div>"
                        addon[k++] = "</div>"
                        $('#root').children().remove()
                        $('#root').append(addon.join(''))
                        
                        $('#notificationsDiv').click(function(e){
                            e.stopPropagation()
                        })
                        
                        
                        
                        $('#moreNotifsButton').click(function(){
                            $.fn.giveMeLastNotifID()
                            $.fn.reloadAllNotifs(1)
                        })
                        $.fn.giveMeLastNotifID()
                        $.fn.reloadAllNotifs(0)
                        
                        
                        
                        
                        
                        
                    }
                    

                    e.stopPropagation()
                    
                })
            }else{
                $('#numOfNotifs').text(0)
                $('#numOfNotifs').css('color','black')
            }

        },

        error: function(msg) {
            alert('error')
        },
        
    })
}
$.fn.buildProfile = function(){
    $('#token').attr('value',$.cookie('csrftoken')) 
    var frm = $('#aut')
    $.ajax({
        type: frm.attr('method'),
        url: frm.attr('action'),
        data: frm.serialize(),
        cache: false,
        beforeSend:function(){
        },                 
        success: function (msg) {
            var data = $.parseJSON(msg)
            var i = 0
            var addon = []

            if (data.isAuthenticated == 1){
                $.fn.buildLoggedUser(data)
                $.pic.isPicture = data.isPicture
            }else{

                $.fn.buildAnonymUser()
                
            }

        },
        error: function(){
            alert('error')
        },
    })
}
$.fn.addEscHandler = function(){
    $(document).keyup(function(e){

        if (e.keyCode == 27) {
         
            $.fn.unlockBackground()
            $('#root').children().remove()
        }
        
        
    })
    
    $(document).click(function(e){
        $('#root').children().remove()
    })
    
}


$( document ).ready(function() {
    
    

    $.pic = new Object();
    $.pic.isPicture = false;
    

  
    $.fn.addEscHandler()
    $.fn.buildProfile()
    $.fn.addLoadContentHandler()

    
})
