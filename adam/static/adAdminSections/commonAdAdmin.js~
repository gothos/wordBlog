(function ($) {
    Array.prototype.remove = function(x) { 
        var i;
        for(i in this){
            if(this[i].toString() == x.toString()){
                this.splice(i,1)
            }
        }
    }

    $.fn.setColor = function(variable,idCampaign,add){
        var L = $.fn.giveMeColor(variable)
        var img = L[0]
        var color = L[1]
        

        $('#tdStatusCampaign'+add+idCampaign+'').css('background-color',color)
        $('#imgActionButton'+add+idCampaign+'').attr('src','/static/'+img+'.jpg')
        
    }



    $.fn.getDayStr = function(date){

        var month = parseInt(date.slice(5,7)) - 1
        if (month == -1){
            month = 0
        }
        var a = new Date(parseInt(date.slice(0,4)),month,parseInt(date.slice(8,10)))


        var L = ['Ne','Po','Út','St','Št','Pia','So']
        for (var i = 0,len=L.length;i<len;i++){
            if (i == a.getDay()){
                return L[i] 
            }
        }
        
        
    }





    $.fn.addBackArrowHandler = function(){
        $('#backArrow').unbind('click')
        $('#backArrow').click(function(){
            window.location.replace("http://localhost/py/hello.py");
        })
    }

    $.fn.giveMeStatus = function(value,flag){
        if (flag == 1){
            var names = ['Neaktívna','Aktívna','Pozastavená']
        }else{
            var names = ['Inactive','Active','Paused']
        }
        if (value == 1 ){
            var status = names[0]
            
        }
        if (value == 2 ){
            var status = names[1]
        }
        if (value == 3 ){
            var status = names[2]
            
        }
        return status
    }

    $.fn.capitaliseFirstLetter = function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    $.fn.getActivity = function(num,flag){
        if (flag == 1){ 
            var strings = ['adding word','removing word','change of budget','change of title','change of description 1','change of description 2','change of displayed url','change of destination url','starting campaign','stopping campaign']
        }else{
            var strings = ['creating campaign','deleting campaign']
        }
        
        for (var i = 1,len=strings.length + 1;i<len;i++){
            if (num == i){
                return strings[i-1]
            }
        }
    }

    $.fn.deleteMenus = function(){
        var menus = [$('#menuOver'),$('#menuStat'),$('#menuAddKeyword'),$('#menuAdDescription'),$('#menuBudget'),$('#menuCPCs')]
        for(var i = 0,len=menus.length;i<len;i++){
            menus[i].children().remove()
            
        }
    }

    $.fn.buildChosenWordsTableCore = function(flag){
        if (flag == 1){
            var name = 'Kľúčové slovo'
        }else{
            var name = 'Keyword'
        }
        var i = 0
        var addon = []
        addon[i++] = '<th class="keyw addWord" style="width:350px;text-align:left;padding-bottom:10px;">'
            addon[i++] = name
        addon[i++] = '</th>'
        addon[i++] = '<th class="keyw addWord" style="width:90px;text-align:left;padding-bottom:10px;text-align:center">'
            addon[i++] = '<span>CPC </span>'
            addon[i++] = '<span>(&#128)</span>'
            if (flag == 1){
                addon[i++] = '<span class="topBarInfo" style="height:10px;margin-left:8px" value="2">i</span>'
            }
        addon[i++] = '</th>'
        addon[i++] = '<th class="keyw addWord" style="width:160px;text-align:left;padding-bottom:10px;text-align:center">'
            addon[i++] = '<span>CPM </span>'
            addon[i++] = '<span>(&#128)</span>'
            if (flag == 1){
                addon[i++] = '<span class="topBarInfo" style="height:10px;margin-left:8px" value="3">i</span>'
            }
        addon[i++] = '</th>'
        return addon.join('')
    }

    $.fn.giveMeColor = function(variable){
        if (variable == 2){
            
            var color = '#A9F5A9'
            var img = 'pause'
            
        }
        if (variable == 1){
            
            var img = 'play'
            var color = '#D8D8D8'
        }
        if (variable == 3){
            
            var img = 'play'
            var color = '#F7BE81'
        }
        return [img,color]


    }

    $.fn.addBackToMainAdminPageHandler = function(){
        $('#backArrow').unbind('click')
        $('#backArrow').click(function(){
            $.fn.returnToMainPageAdmin()
        })
    }

    $.fn.addHoveringEffect = function(selector,num){
        selector.hover(function(){
            $(this).css('opacity','1.0')},function(){
            $(this).css('opacity',num)
            }
        )
    }
    $.fn.checkKeywordDuplicity = function(value){
        var table = document.getElementById("chosenWords");
        L=[]
        for (var i = 1, row; row = table.rows[i]; i++) {
            
            L.push(row.cells[1].firstChild.innerHTML)    
        }
        if ($.inArray(value,L) == - 1){
            return 1
        }else{
            return 0
        }

        
        
    }


    $.fn.addHelperHandler = function(){
        $('span[class="topBarInfo"]').hover(function(){
            var value = $(this).attr('value')
            
            $('#helper'+value+'').show()
            },function(){
                var value = $(this).attr('value')
                $('#helper'+value+'').hide()
            }
        )
    }
    $.fn.enableBut = function(string,button){
        $('#'+string+'').on('change keyup paste',function(){
            button.css('cursor','pointer')
            button.prop('disabled',false)
                            
                            
        }) 
    }
})(jQuery); 
