$.fn.buildFillCampaignForm = function(idCampaign,flag){
    var k = 0
    var str = []
    str[k++] = '<form action="'+$.general.prefix+'/fillCampaignContent/" method = "post" id="fillCampaignContentForm'+idCampaign+'">'
        str[k++] = '<input style="display:none" name="csrfmiddlewaretoken" value="" id = "fillCampaignContentInput'+idCampaign+'">'
        str[k++] = '<input style="display:none" name="idCampaign" value="'+idCampaign+'" id = "" >'
        str[k++] = '<input style="display:none" name="flag" value="'+flag+'" id = "" >'
    str[k++] = '</form>'
    return str.join('')
}
