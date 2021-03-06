(function ($) {
    $.fn.buildCampaignHeaders = function(flag){
        var i = 0
        var addon = []
        if (flag == 1){
            var names = ['Prehľad','Štatistika podľa slov','Štatistika podľa dní']
        }else{
            var names = ['Overview','Statistics by words','Statistics by days']
        }
        addon[i++] = '<tr id="campaignMenu" class="adMenu" style="display:none">'
            addon[i++] = '<td style="width:100px;" style="border:1px solid black">'
                addon[i++] = '<div id="overDetail" class="menu" value=3 style="border:0px solid black;opacity:0.4;cursor:default">'
                    addon[i++] = names[0]
                addon[i++] = '</div>'
            addon[i++] = '</td>'
            addon[i++] = '<td style="width:200px;" style="border:1px solid black">'
                addon[i++] = '<div class="menu" value=4 style=";border:0px solid black">'
                    addon[i++] = names[1]
                addon[i++] = '</div>'
            addon[i++] = '</td>'
            if (flag == 1){
                addon[i++] = '<td style="width:145px;" style="border:1px solid black">'
                    addon[i++] = '<div class="menu" value=5 style="border:0px solid black">'
                        addon[i++] = 'Kľúčové slová'
                    addon[i++] = '</div>'
                addon[i++] = '</td>'
                addon[i++] = '<td style="width:170px;" style="border:1px solid black">'
                    addon[i++] = '<div class="menu" value=6 style="border:0px solid black">'
                        addon[i++] = 'Reklamný popisok'
                    addon[i++] = '</div>'
                addon[i++] = '</td>'
                addon[i++] = '<td style="width:170px;" style="border:1px solid black">'
                    addon[i++] = '<div class="menu" value=7 style="border:0px solid black">'
                        addon[i++] = 'Denný rozpočet'
                    addon[i++] = '</div>'
                addon[i++] = '</td>'
            }else{
                addon[i++] = '<td style="width:145px;" style="border:1px solid black">'
                    addon[i++] = '<div class="menu" value=5 style="border:0px solid black">'
                        addon[i++] = 'Details'
                    addon[i++] = '</div>'
                addon[i++] = '</td>'
            }
            addon[i++] = '<td style="width:200px;" style="border:1px solid black">'
                addon[i++] = '<div class="menu" value=8 style=";border:0px solid black">'
                    addon[i++] = names[2]
                addon[i++] = '</div>'
            addon[i++] = '</td>'
            if (flag == 2){
                addon[i++] = '<td style="width:145px;" style="border:1px solid black">'
                    addon[i++] = '<div class="menu" value=9 style="border:0px solid black">'
                        addon[i++] = 'Changes'
                    addon[i++] = '</div>'
                addon[i++] = '</td>'
            }
        addon[i++] = '</tr>'
        return addon.join('')
    }
})(jQuery); 
