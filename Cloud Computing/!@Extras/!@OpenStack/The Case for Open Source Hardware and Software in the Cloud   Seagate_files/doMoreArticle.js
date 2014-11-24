 $(document).ready(function() {
                if(document.getElementById("videoCountId")!=null && document.getElementById("ALGThumbItem")!=null)
                document.getElementById("ALGThumbItem").id="ALGThumbItem_"+document.getElementById("videoCountId").value;
              if(document.doMoreForm.mediumArrayId!=null && document.doMoreForm.largeArrayId!=null && document.doMoreForm.thumbArrayId!=null)  {

                var mediumArray=new Array();
                if(document.doMoreForm.mediumArrayId.length>0)
                    {
                for(var i=0; i<document.doMoreForm.mediumArrayId.length;i++)
                    {
                        mediumArray[i]=document.doMoreForm.mediumArrayId[i].value;
                    }
                    }
                    else
                        {
                             mediumArray[0]=document.doMoreForm.mediumArrayId.value;
                        }
                   
				var typesArray=new Array();
                if(document.doMoreForm.types.length>0)
                    {
                for(var i=0; i<document.doMoreForm.types.length;i++)
                    {
                        typesArray[i]=document.doMoreForm.types[i].value;
                    }
                    }
                    else
                        {
                             typesArray[0]=document.doMoreForm.types.value;
                        }
  		   var largeArray=new Array();
                   if(document.doMoreForm.largeArrayId.length>0)
                       {
                for(var i=0; i<document.doMoreForm.largeArrayId.length;i++)
                    {
                        largeArray[i]=document.doMoreForm.largeArrayId[i].value;
                    }
                       }
                       else
                        {
                             largeArray[0]=document.doMoreForm.largeArrayId.value;
                        }
                    var thumbArray=new Array();
                    if(document.doMoreForm.largeArrayId.length>0)
                       {
                for(var i=0; i<document.doMoreForm.thumbArrayId.length;i++)
                    {
                        thumbArray[i]=document.doMoreForm.thumbArrayId[i].value;
                    }
                       }
                       else
                           {
                               thumbArray[0]=document.doMoreForm.thumbArrayId.value;
                           }
						 
		var altTextArray=new Array();
                   if(document.doMoreForm.altTextArrayId.length>0)
                       {
                for(var i=0; i<document.doMoreForm.altTextArrayId.length;i++)
                    {
                        altTextArray[i]=document.doMoreForm.altTextArrayId[i].value;
                    }
                       }
                       else
                        {
                             altTextArray[0]=document.doMoreForm.altTextArrayId.value;
                        }              }
		if(thumbArray != undefined){
			  $('#ALGContainer').ALGGallery({
				'elements'     : [{
				    color	   : 'default',
				    medium     : mediumArray,
				    large      : largeArray,
				    thumbnails : thumbArray,
				    types      : typesArray,
				    altText    : altTextArray
				}],
				'defaultColor'  :  'default'
			    });
			    
	    }
     });