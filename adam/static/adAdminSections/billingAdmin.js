(function ($) {
    $.fn.buildBillingAdmin = function(data){
        console.log('data')
        var i = 0
        var addon = []
        addon[i++] = '<table id="billingTable" cellpadding="0" cellspacing="0" border="0" style=";position:relative;border: 0px double #ddd;">'
            addon[i++] = '<thead>'
                addon[i++] = '<tr>'
                    addon[i++] = '<th class="addWord">'
                        addon[i++] = 'Item'
                    addon[i++] = '</th>'
                    addon[i++] = '<th class="addWord">'
                        addon[i++] = 'Value'
                    addon[i++] = '</th>'
                addon[i++] = '</tr>'
            addon[i++] = '</thead>'
            addon[i++] = '<tbody>'
                
                var items = [data.companyName,data.companyStreet,data.companyTown,data.companyZIP,data.companyPhone,data.companyEmail,data.companyIC,data.companyDIC]
                var idsCompany = ['Name','Street','Town','ZIP','Phone','Email','IC','DIC']
                for(var z = 0,len=idsCompany.length;z<len;z++){
                    addon[i++] = '<tr>'
                        addon[i++] = '<td class="addWord" style="background-color: #f5f5f5">'
                            addon[i++] = idsCompany[z] + ' : '
                        addon[i++] = '</td>'
                        addon[i++] = '<td class="addWord">'
                            addon[i++] = items[z]
                            
                        addon[i++] = '</td>'
                    addon[i++] = '</tr>'
                }
                
            addon[i++] = '</tbody>'
        addon[i++] = '</table>'
        $('#menuBilling').children().remove()
        $('#menuBilling').append(addon.join(''))
        

    }
})(jQuery);
