	start=1;

	function fxOnload(){

		alert('this is on load');

	}





	function show_recent(direction, total)

	{

		if(direction=="right")

			start = start + 4;

		else if(direction=="left")

			start = start - 4;



		if(start >= 13)

			start = 1;

		else if(start <= 0)

			start = 9;



		if(start == 1 && total>0)

		{

			document.getElementById('recent1').style.display = "block";

			document.getElementById('recent2').style.display = "none";

			document.getElementById('recent3').style.display = "none";

			if(total<4) last = total; else last = 4;

			document.getElementById('recent_total').innerHTML = "[1-"+last+" of "+total+"]";

		}

		if(start == 5 && total>4)

		{

				document.getElementById('recent1').style.display = "none";

				document.getElementById('recent2').style.display = "block";

				document.getElementById('recent3').style.display = "none";

				if(total<8) last = total; else last = 8;

				document.getElementById('recent_total').innerHTML = "[5-"+last+" of "+total+"]";

		}

		if(start == 9 && total>8)

		{

				document.getElementById('recent1').style.display = "none";

				document.getElementById('recent2').style.display = "none";

				document.getElementById('recent3').style.display = "block";

				if(total<12) last = total; else last = 12;

				document.getElementById('recent_total').innerHTML = "[9-"+last+" of "+total+"]";

		}

		return;

}













        function createNewList()

        {

                var name = prompt("Enter a name for a new contact group.", "");

                if(name)

                        document.location.href="friends.php?add_list="+name;

        }

        function doAction(action)

        {

                if(action)

                {



                        document.getElementById('action_name').value = action;

                        document.friendsForm.submit();



                }

        }

        function invite_mem_addall()

        {

                var x=document.getElementById("myfriends");

                var y=document.getElementById("invitefriends");

                var i;

                i= x.options.length;

                if(i!=0)

                {

                        y.options.length=i;

                        for(var j=0;j<i;j++)

                        {

                                y.options[j]=new Option(x.options[j].text,x.options[j].value,x.options[j].selected="1");
								//y.options[j].selected=true;

                        }

                        for(j=0;j<i;j++)

                        {

                                x.remove(0);

                        }

                }



        }

        function invite_mem_add()

        {

                var x=document.getElementById("myfriends");

                var y=document.getElementById("invitefriends");

                var i;

                i = x.selectedIndex;

                if(i>=0)

                {

                        y.options[y.options.length]=new Option(x.options[i].text,x.options[i].value);

                        x.remove(x.selectedIndex);

                }

        }

        function invite_mem_removeall()

        {

                var x=document.getElementById("invitefriends");

                var y=document.getElementById("myfriends");

                var i;

                i= x.options.length;

                if(i!=0)

                {

                        y.options.length=i;

                        for(var j=0;j<i;j++)

                        {

                                y.options[j]=new Option(x.options[j].text,x.options[j].value);



                        }

                        for(j=0;j<i;j++)

                        {

                                x.remove(0);



                        }

                }

        }















        function invite_mem_remove()

        {

                var x=document.getElementById("invitefriends");

                var y=document.getElementById("myfriends");

                var i;

                i = x.selectedIndex;

                if(i>=0)

                {

                        y.options[y.options.length]=new Option(x.options[i].text,x.options[i].value);

                        x.remove(x.selectedIndex);

                }

        }



        function invite_mem_send()

        {
				//alert("AasdsadSA");
                var i,out;

                var x=document.getElementById("invitefriends");
				out ="";
                for(i=0; i<x.options.length; i++)

                {

                        out = out + "<input type=\"hidden\" name=\"flist\" value=\""+x.options[0].text+"\" >";
						
						x.options[i].selected=true;

                }
				//alert(out);
                document.getElementById('friends_div').innerHTML=out;
				
                document.fform.submit();

        }



        function approve_post(id,idHlinkAprove)

        {                

		alert("This posting will approved. Refresh the page.");

		var y="apostform"+id;

		var x = document.getElementById(y);

                return x.submit();





        }

