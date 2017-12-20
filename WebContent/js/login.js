function forgotPassword() {
	    	var userName = $('#userName').val();
	        var jsonReq = { "userName" : userName};
	        var token = $("meta[name='_csrf']").attr("content");
	        var header = $("meta[name='_csrf_header']").attr("content");
	        
	        $('#fpresult').html('');
	        
	        if(userName==null || userName.trim()==''){
	        	$('#fpresult').html('Please enter User Name');
	        	return false;
	        }
	        
	           
	        //alert (token);
	        $.ajax({
	            url : 'forgotPassword',
	            data: jsonReq,
	            type: "POST",
	            //contentType: 'application/json',
	            dataType: 'text',
	            beforeSend: function(xhr) {
/* 	            	xhr.setRequestHeader("Accept", "application/json");
	            	xhr.setRequestHeader("Content-Type", "application/json"); */
	                xhr.setRequestHeader(header, token);
	                $('#spinnerDiv').show();
	                $("#loginBtn").prop("disabled",true);
	                $(".forgotPasswordLink").bind("click", false);
	            },
	            complete: function(){
	        	     $('#spinnerDiv').hide();
	        	     $("#loginBtn").prop("disabled",false);
		             $(".forgotPasswordLink").unbind("click", false);
	        	  },
	            success : function(data) {
	                //alert(data);
	            	$('#fpresult').html(data);
	            },
				error : function(xhr, status, error) {
					//alert("Error: "+xhr.responseText);
				}
	        });
	        return false;
	    }