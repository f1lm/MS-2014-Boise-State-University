 var addthis_config = {
              username: "nsfgov",
              addthis_click: true
        }
 var addthis_localize = {
            share_caption: "National Science Foundation - Share"
             };    
             
function changeDisplayStyle(spanElements, value)
{
  for (var i=0; i<spanElements.length;i++)
  {
    if(spanElements[i].getAttribute("id") != null && 
        spanElements[i].getAttribute("id") == "addthis_display")
    {
      spanElements[i].style.display = value;
    }
  }
}



