(function ($) {
    $.fn.fillCampaignContent = function(areaDescription,areaKeyword,idCampaign){
        console.log('******************9999**')
        
        
        $.fn.buildEditCampaignDescription(areaDescription,idCampaign)
        
        $.fn.buildEditCampaignKeyword(areaKeyword,idCampaign)
        
        if (idCampaign != 0){
            $.fn.buildEditCampaignOver(idCampaign) 
            $.fn.buildEditCampaignBudget(idCampaign)
            $.fn.buildEditCampaignStat(idCampaign,1)
            
            $.fn.buildEditCampaignCPCs(idCampaign,1)
            
            $.gen.flag = 1
            
            
            $('#fillCampaignContentInput'+idCampaign+'').attr('value',$.cookie('csrftoken'))
            var frm = $('#fillCampaignContentForm'+idCampaign+'')
            
            
            $.ajax({
                type: frm.attr('method'),
                url: frm.attr('action'),
                data: frm.serialize(),
                cache: false,
                beforeSend: function(){
                    
                    
                    
                
                },
                         
                success: function (msg) {
                    
                    var data = $.parseJSON(msg);
                    var dataFields = [data.description.title,data.description.description1,data.description.description2,data.description.url1,data.description.url2,data.description.budget]
                    $.fn.insertDescriptionData(dataFields)
                    $.fn.makePreview(data.typeOfCampaign,dataFields,1)
                    $.fn.changePreview(data.typeOfCampaign)                    
                    $.fn.fillCampaignDetail(data,1)

                },
                error: function (msg) {
                },
            })
                           
            
            $.fn.addHelperHandler() 
                         
            
        }else{
            console.log('********************')
            $('#previewDiv').append($.fn.buildPreviewTable(1,0,1,1))
            $.fn.changePreview(1)
        }



    }
})(jQuery);




