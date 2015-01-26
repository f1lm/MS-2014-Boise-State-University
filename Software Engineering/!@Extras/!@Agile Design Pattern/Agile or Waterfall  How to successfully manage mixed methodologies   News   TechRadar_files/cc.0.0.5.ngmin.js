var Hawk=Hawk||{};Hawk.Filter=function(a){var b={},c="pcc-column-",d=a.table_elem,e=d.getElementsByTagName("tbody")[0],f=function(a){var b=a.getElementsByClassName("component-container");if(b=b[0],!b){var c=document.createElement("div");c.className="component-parent",b=document.createElement("div"),b.setAttribute("class","component-container"),c.appendChild(b),a.appendChild(c)}return b},g=function(a){var b;for(a=a.split("_"),b=0;b<a.length;b++)0!==b&&(a[b]=a[b].charAt(0).toUpperCase()+a[b].slice(1));return a.join("")},h=function(a,b){if(!a)throw new Exception("Hawk.Filter::getRowAttributeValue() no row provided");if(!b)throw new Exception("Hawk.Filter::getRowAttributeValue() no row attribute provided");return a.dataset?(b=g(b),a.dataset[b]?a.dataset[b].toLowerCase():0):a.getAttribute("data-"+b.replace("_","-")).toLowerCase()},i=function(){var a,b=e.getElementsByTagName("tr");for(a=0;a<b.length;a++)b[a].className=b[a].className.replace(" hidden","")},j=function(a){for(var b=e.getElementsByTagName("tr"),c=0;c<b.length;c++)if(void 0!=b[c].className&&"pcc-row"==b[c].className)for(var d in a){var f=h(b[c],d);if(a[d].predicate&&!a[d].predicate(f)){b[c].className=b[c].className+" hidden";break}}},k=function(a,b){var c,d,e=document.querySelectorAll("#pcc-main .pcc-row"),f=document.createElement("table");for(c in e)"pcc-row"===e[c].className&&f.appendChild(e[c]);var g=Array.prototype.slice.call(f.rows);g.sort(function(b,c){return b=h(b,a),c=h(c,a),isNaN(b)&&isNaN(c)?b>c?-1:c>b?1:0:(b=parseFloat(b),c=parseFloat(c),c-b)}),"desc"===b&&g.reverse();var c;for(c in g){d=void 0!=g[c].dataset?g[c].dataset.productPriceCurrencyIso:g[c].getAttribute("data-product-price-currency-iso");var i=document.getElementById("pcc-currency-"+d);i.parentNode.insertBefore(g[c],i.nextSibling)}},l=function(a){var b,c,d=e.getElementsByTagName("tr");for(b=0;b<d.length;b++){var c={};void 0!=d[b].dataset?c=d[b].dataset:(c.productPriceCurrencyIso=d[b].getAttribute("data-product-price-currency-iso"),c.priceValue=d[b].getAttribute("data-price-value")),c.hasOwnProperty("productPriceCurrencyIso")&&a.hasOwnProperty(c.productPriceCurrencyIso)&&c.hasOwnProperty("priceValue")&&(c.priceValue<a[c.productPriceCurrencyIso].min||c.priceValue>a[c.productPriceCurrencyIso].max)&&(d[b].className=d[b].className+" hidden")}},m=function(a){var c;for(c in b)b.hasOwnProperty(c)&&c!==a&&b[c].clearSort()},n=function(){var a=document.getElementsByClassName("pcc-heading");for(p in a)a.hasOwnProperty(p)&&a[p].hasOwnProperty("className")&&(a[p].className=a[p].className.replace(" asc",""),a[p].className=a[p].className.replace(" desc",""),a[p].className=a[p].className.replace(" filter",""))},o=function(){n(),i();for(var a in b)document.getElementsByName(b[a].name)[0].disabled=!1,document.querySelectorAll(".pcc-filter-component-"+b[a].name)[0].className=document.querySelectorAll(".pcc-filter-component-"+b[a].name)[0].className.replace(" disabled","");var a,c={};for(a in b)if(b.hasOwnProperty(a))if("range"!=b[a].type)if("string"!=b[a].type){if("filter_boolean"===b[a].type){var d=b[a].getState();if(d){if(b[a].hasOwnProperty("disables")&&b[a].disables.length>0)for(var f in b[a].disables){var g=document.querySelectorAll(".pcc-filter-component-"+b[a].disables[f])[0];g.className=g.className+" disabled",document.getElementsByName(b[a].disables[f])[0].disabled=!0}var h=document.getElementById("pcc-column-"+b[a].column);h.className=h.className+" filter",c[b[a].parameter]={predicate:b[a].predicate,val:d}}}}else{var a,m,o=document.getElementsByName(b[a].name)[0].value.split(" "),p=e.getElementsByTagName("tr");if(o.length>0)for(a=0;a<p.length;a++)if(p[a].className.search("hidden")<0&&null!=p[a].getAttribute("data-product-name"))for(m=o.length-1;m>=0;m--)p[a].getAttribute("data-product-name").toLowerCase().search(o[m].toLowerCase())<0&&(p[a].className=p[a].className+" hidden")}else{var q="{",r=$(".pcc-filter-component-"+b[a].name+" .range");for(m in r)currencies_list.indexOf(r[m].name)>-1&&(q+='"'+r[m].name+'": '+r[m].value+",");q=q.substring(0,q.length-1)+"}",l(JSON.parse(q))}j(c);for(var a in b)if(b.hasOwnProperty(a)&&"sort"===b[a].type){var d=b[a].getState();if(d){var h=document.getElementById("pcc-column-"+b[a].column);h.className=h.className+" "+d,k(b[a].parameter,d);break}}};this.addComponent=function(a){var d;if(void 0===a)throw new Error("no obj specified when adding a filter component");if(!a.column)throw new Error("Filter::addComponent() -> no column specified");if(d=document.getElementById(c+a.column)){var e=document.createElement("div"),g=document.createElement("a"),h=document.createTextNode("toggle");g.appendChild(h),g.className="column-filter-toggle",e.appendChild(g),d.appendChild(e),g.parentNode.parentNode.onclick=function(){if($(this).hasClass("active"))return void(this.className=this.className.replace(" active",""));var a=document.querySelectorAll(".pcc-heading");for(var b in a)"undefined"!=typeof a[b].className&&(a[b].className=a[b].className.replace(" active",""));this.className=this.className+" active"},b[a.name]=a,f(d).appendChild(a.getObj()),a.postInjectionSetup()}},this.run=o;for(var p in a.components)a.components.hasOwnProperty(p)&&this.addComponent(new Hawk.FilterComponent(a.components[p]));document.addEventListener("component_updated",function(a){var b;-1!=/^pcc-filter-component-/.exec(a.target.className).index&&(b=a.target.className.replace("pcc-filter-component-",""),m(b),o())})};var Hawk=Hawk||{};Hawk.FilterComponent=function(a){if(!a)throw new Error("FilterComponent -> no params passed");for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);var c,d,e="pcc-filter-component-",f=this,g={sort:[{tag:"input",type:"radio",value:"asc"},{tag:"input",type:"radio",value:"desc"}],range:[{tag:"div","class":"slider",type:"slider"}],filter_boolean:[{tag:"input",type:"checkbox",value:"yes"}],string:[{tag:"input",type:"text",value:""}]},h=function(b,c){switch(c.tag){case"input":var d=document.createElement(c.tag);break;case"div":var d=document.createElement("div"),e=document.createElement("ul");d.appendChild(e);var f=!0;for(var h in currencies_list){var j=document.createElement("li");j.innerHTML=currencies_list[h],!0===f&&(j.className=" active"),j.onclick=function(a){var b=this.parentNode.getElementsByTagName("li");for(var c in b)b[c].className="";this.className=" active";var d=document.querySelectorAll(".component_price_filter_currency");for(var e in d)d[e].className="component_price_filter_currency hidden";var f=document.getElementById("component_price_filter_"+this.innerHTML);f.className="component_price_filter_currency",a.stopPropagation()},e.appendChild(j);var k=document.createElement("div");k.setAttribute("class","component_price_filter_currency"),k.setAttribute("id","component_price_filter_"+currencies_list[h]),!0===f?f=!1:k.setAttribute("class","hidden"),k.innerHTML+='<div class="range-field"><label for="'+currencies_list[h]+'"></label><input type="hidden" name="'+currencies_list[h]+'" class="range"><div class="slider-range"></div><div class="slider-output">From: <span class="from-value"></span> to <span class="to-value"></span></div></div>',d.appendChild(k)}}if(a.labels)var l=document.createElement("label"),m=document.createTextNode("text"==c.type?a.labels["default"]:a.labels[c.value]);for(var n in g[a.type][0])g[a.type][0].hasOwnProperty(n)&&c.hasOwnProperty(n)&&"tag"!==n&&d.setAttribute(n,c[n]);switch(b&&d.setAttribute("name",b),c.type){case"text":d.onclick=function(a){a.stopPropagation()},d.onchange=function(){i()};break;case"radio":d.onchange=function(){i()};break;case"checkbox":d.onclick=function(){i()}}return a.labels&&"div"!=c.tag?("text"==c.type?(l.appendChild(m),l.appendChild(d)):(l.appendChild(d),l.appendChild(m)),l):d},i=function(){return document.createEvent?f.getObj().dispatchEvent(d):void 0};this.getObj=function(){if(c)return c;c=document.createElement("div"),c.setAttribute("class",e+this.name);for(var b in g[a.type])if(g.hasOwnProperty(a.type)){var d=h(a.name,g[a.type][b]);c.appendChild(d)}return c},this.getState=function(){var a,b,d=c.getElementsByTagName("input");for(b=0;b<d.length;b++)if(d[b].checked){a=d[b].value;break}return a},this.clearSort=function(){var b,d;if("sort"===a.type)for(d=c.getElementsByTagName("input"),b=0;b<d.length;b++)d[b].checked=!1},this.postInjectionSetup=function(){if("range"===a.type)for(var b in currencies_list){var c,d=99999,e=0,f=$("#component_price_filter_"+currencies_list[b]+' input[name="'+currencies_list[b]+'"]'),g=$("#component_price_filter_"+currencies_list[b]+" .slider-range"),h=$(".pcc-row[data-product-price-currency-iso='"+currencies_list[b]+"']");if(h.length>0){for(var c=h.length-1;c>=0;c--)$(h[c]).data&&$(h[c]).data("price-value")&&($(h[c]).data("price-value")<d&&(d=Math.floor($(h[c]).data("price-value"))),$(h[c]).data("price-value")>e&&(e=Math.ceil($(h[c]).data("price-value"))));g.slider({range:!0,min:d,max:e,values:[d,e],stop:function(a,b){var c=$(this).parent().parent().children(".range-field").children("input");c.val('{"min":'+b.values[0]+', "max":'+b.values[1]+"}"),i()},slide:function(a,b){var c=$(this).parent().parent().children(".range-field"),d=c.children("label").attr("for");c.children(".slider-output").children(".from-value").html(b.values[0]+" "+d),c.children(".slider-output").children(".to-value").html(b.values[1]+" "+d)}}),f.val('{"min":'+g.slider("values",0)+', "max":'+g.slider("values",1)+"}"),f.siblings(".slider-output").children(".from-value").html(g.slider("values",0)+" "+currencies_list[b]),f.siblings(".slider-output").children(".to-value").html(g.slider("values",1)+" "+currencies_list[b])}}},document.createEvent&&(d=document.createEvent("Event"),d.initEvent("component_updated",!0,!0))},hawk_product_data=null,num_merchants=0,function(a,b){a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)}}(window,"affclick"),Hawk.Price_comparison_table={getUrlParameters:function(){var a={};if(-1!==window.location.hash.indexOf("#")){for(var b=window.location.hash.split("#")[1].split("|"),c=0;c<b.length;c++){var d=b[c].split("=");a[d[0]]=d[1]}if(!a.hasOwnProperty("preview"))return{}}return a},init:function(){if(!$("#pcc-main").length){var a=/.*-(\d+)\/price-comparison/.exec(document.URL);if(a&&a[1]){var b=a[1],c=Hawk.Price_comparison_table.getUrlParameters(),d={site:"TRD",trd_product_id:b,group:"currency"};for(param in c)d[param]=c[param];Hawk.Widgets.get(-1===document.URL.indexOf("/phones/")?"comparison":"phones-comparison",d,function(a){Hawk.Price_comparison_table.removeGapAfterFeatureImage(),$(".pcc-container").append(a),$("#pcc-table-body-full tr.pcc-row").each(function(){var a=$(this);a.find(".btn-view-offer").on("click",function(){Hawk.get_vouchers(a.data("merchantId"),a.data("label"))})}),filter=new Hawk.Filter({table_elem:document.getElementById("pcc-main"),components:Hawk.Price_comparison_table.Filter}),affclick("appeared",{action:"CC",label:$(".pcc-container").find("h2").data("label"),count:$(".pcc-container .num-matches").text()}),$("#pcc-table-body-full tr a.fie-image-wrapper, #pcc-table-body-full tr a.btn-external").each(function(){affclick(this,{product:$(this).data("id"),merchant:$(this).data("merchant"),label:$(this).data("label"),action:"Click from CC",position:$(this).data("position"),price:$(this).data("price")})})},function(a){return hawk_product_data=a.deals,currencies_list=Object.keys(a.deals),single_currency=a.deals.length<=1?currencies_list:"",a})}}},removeGapAfterFeatureImage:function(){var a=$("body");$(".spinning-preloader").remove(),a.hasClass("lang-en-gb")&&a.hasClass("GB")||hawk_product_data||$(".expert-verdict").length||$(".review-gallery-points-wrapper").css({"border-bottom":"none","margin-bottom":0})}};var Hawk=Hawk||{};Hawk.Price_comparison_table=Hawk.Price_comparison_table||{},Hawk.Price_comparison_table.Filter=[{column:"merchant_name",name:"merchant_name_sort",type:"sort",parameter:"merchant_name",labels:{asc:"Sort A-Z",desc:"Sort Z-A"}},{column:"product_name",name:"product_name_sort",type:"sort",parameter:"product_name",labels:{asc:"Sort A-Z",desc:"Sort Z-A"}},{column:"product_name",name:"product_name_filter",type:"string",parameter:"product_name",labels:{"default":"Search: "}},{column:"product_price_amount",name:"product_price_sort",type:"sort",parameter:"price",labels:{asc:"Low to High",desc:"High to Low"}},{column:"product_price_amount",name:"product_price_range",type:"range",parameter:"price_value",labels:{"default":"Price Range"},min:null,max:null},{column:"merchant_shipping_min_shipping_cost",name:"merchant_shipping_min_shipping_cost_sort",type:"sort",parameter:"shipping_cost",labels:{asc:"Low to High",desc:"High to Low"}},{column:"merchant_shipping_min_shipping_time",name:"merchant_shipping_min_shipping_time_sort",type:"sort",parameter:"shipping_time",labels:{asc:"Min to Max",desc:"Max to Min"}},{column:"has_offers",name:"num_offers_sort",type:"sort",parameter:"num_offers",labels:{asc:"Low to High",desc:"High to Low"}},{column:"has_offers",name:"has_offers_show",type:"filter_boolean",parameter:"num_offers",labels:{yes:"Only show offers"},predicate:function(a){return a>0}},{column:"merchant_shipping_min_shipping_cost",name:"has_free_show",type:"filter_boolean",parameter:"shipping_cost",labels:{yes:"Only show free"},predicate:function(a){return 0==a}},{column:"merchant_shipping_min_shipping_time",name:"has_sameday_show",type:"filter_boolean",parameter:"shipping_time",labels:{yes:"Show Same Day"},disables:["has_nextday_show"],predicate:function(a){return 0==a}},{column:"merchant_shipping_min_shipping_time",name:"has_nextday_show",type:"filter_boolean",parameter:"shipping_time",labels:{yes:"Show Next Day"},disables:["has_sameday_show"],predicate:function(a){return 1==a}}];