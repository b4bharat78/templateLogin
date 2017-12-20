$( document ).ready(
	    		function() {
	    			
	    			var data={ "pageName" : "dashboard"};
	    			loadPage("loadDashboard",data);
	    			
	    			loadQueues();
	    			
	    			$(".nav li a[id=Dashboard]").click(function funcName() {
																			data={ "pageName" : "dashboard"}; 
																			loadPage("loadDashboard",data);
																			//loadChart();
																		});
	    			
	    			$(".nav li a[id=CreateProject]").click(function funcName() {
	    																	data={ "pageName" : "createProject"}; 
	    																	loadPage("loadCreateProject",data); 
	    																});
	    			
	    			$(".nav li a[id=SearchProject]").click(function funcName() { 
														    				data={ "pageName" : "searchProject"}; 
																			loadPage("loadSearchProject",data); 
	    																});
	    			$(".nav li a[id=UploadProject]").click(function funcName() { 
														    				data={ "pageName" : "uploadProject"}; 
																			loadPage("loadUploadProject",data); 	    																	
	    																});
	    			$(".nav li a[id=CreateUser]").click(function funcName() { 
                    	                                                    data={ "pageName" : "createUser"}; 
                                                                            loadPage("loadCreateUser",data); 
                	});
	    			
	    			$(".nav li a[id=EditUser]").click(function funcName() { 
                                                                            data={ "pageName" : "editUser"}; 
                                                                            loadPage("loadEditUser",data); 
                    });
	    			$(".nav li a[id=CreateVendor]").click(function funcName() { 
                                                                         data={ "pageName" : "createVendor"}; 
                                                                         loadPage("loadCreateVendor",data); 
                  });

                   $(".nav li a[id=EditVendor]").click(function funcName() { 
                                                                        data={ "pageName" : "editVendor"}; 
                                                                        loadPage("loadEditVendor",data); 
                 });
                   
                   $(".nav li a[id=Report]").click(function funcName() {                                             
                	    data={ "pageName" : "reportMain"}; 
                	    loadPage("loadReport",data); 
                	});
                   $(".nav li a[id=feedUpload]").click(function funcName() {
                	   data={ "pageName" : "feedUpload"};
                	   loadPage("loadFeedUploadPage",data);
                   });
                   $(".nav li a[id=feedExport]").click(function funcName() {
                	   data={ "pageName" : "feedExport"};
                	   loadPage("loadFeedDownloadPage",data);
                   });
                   $(".nav li a[id=confirmDocs]").click(function funcName() {
                	   data={ "pageName" : "confirmDocs"};
                	   loadPage("loadConfirmDocsPage",data);
                   });
	         });


function checkPasswordFormat(str)
{
  // at least one number, one lowercase and one uppercase letter
  // at least six characters
  var re = /(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,32}/;
  return re.test(str);
}

function changePassword() {
	var oldpassword = $('#oldpassword').val();
	var newpassword = $('#newpassword').val();
	var newpassword2 = $('#newpassword2').val();
	var userName = $('#userName').val();
	var jsonReq = { 
					"userName" : userName,
					"newPassword":newpassword,
					"oldPassword":oldpassword
					};
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    
    $('#messageDiv').html('');
    
    if(!checkPasswordFormat(newpassword)){
    	$('#messageDiv').html('Invalid password format.');
    	return false;
    }
    
    if(newpassword.trim()=='' || newpassword2.trim()=='' || oldpassword.trim()==''){
    	$('#messageDiv').html('Please fill all the fields.');
    	return false;
    }
    
    if(newpassword!=newpassword2){
    	$('#messageDiv').html('The passwords you entered did not match.');
    	return false;
    }
    	           
    //alert (token);
    $.ajax({
        url : 'changePassword',
        data: jsonReq,
        type: "POST",
        dataType: 'text',
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
            $('#spinnerDiv').show();
        },
        complete: function(){
    	     $('#spinnerDiv').hide();
    	  },
        success : function(data) {
            //alert(data);
        	$('#messageDiv').html(data);
        },
		error : function(xhr, status, error) {
			//alert("Error: "+xhr.responseText);
		}
    });
    return false;
}

function hideSearchResultDiv() {
	$("#searchResult").html('');
	$("#errorMsg").html('');
	$('#poNumber').val('');
	$('#vendorId').val('');
	$('#poStatus').val('');
	$('#projectId').val('');
	$('#projectDescription').val('');
	$('#poLineStatus').val('');
	$('#buyerName').val('');
	$('#poDateFrom').val('');
	$('#poDateTo').val('');
	$('#invoiceNumber').val('');
	$('#poNumberForInv').val('');
	$('#vendorIdForInv').val('');
	$('#invoiceDateFrom').val('');
	$('#invoiceDateTo').val('');
	$('#paymentDateFrom').val('');
	$('#paymentDateTo').val('');
	$('#receiptNumber').val('');
	$('#recDateFrom').val('');
	$('#recDateTo').val('');
	$('#voucherId').val('');
}

function showSearchFields(){
	$("#searchResult").empty();
	$("#errorMsg").empty();
	var searchCriteria = $('#searchCriteria option:selected').text();
	$("#searchButton").show();
	$("#searchBox").show();
	if(searchCriteria=="Purchase Order"){
		$("#poSearch").show();
		$("#invoiceSearch").hide();
		$("#receiptSearch").hide();
		$("#voucherSearch").hide();
	}
	else if(searchCriteria=="Invoice"){
		$("#invoiceSearch").show();
		$("#poSearch").hide();
		$("#receiptSearch").hide();
		$("#voucherSearch").hide();
	}
	else if(searchCriteria=="Receipt"){
		$("#receiptSearch").show();
		$("#poSearch").hide();
		$("#invoiceSearch").hide();
		$("#voucherSearch").hide();
	}
	else if(searchCriteria=="Voucher"){
		$("#voucherSearch").show();
		$("#poSearch").hide();
		$("#invoiceSearch").hide();
		$("#receiptSearch").hide();
	}
}

function searchProject(){
	$("#errorMsg").empty();
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    if(searchProjectValidation()){
    $.ajax({
        type: "POST",
        url: 'loadSearchProjectResult',
        data: $("#searchProjectForm").serialize(),
        beforeSend: function(xhr) {
        	enableDisableButtons('#searchProjectForm', 'disable');
            xhr.setRequestHeader(header, token);
            $("#responseSpinner").show();
        },
        complete: function(){
     	     $('#responseSpinner').hide();
     	    enableDisableButtons('#searchProjectForm', 'enable');
     	},
        success: function(response) {
        	 $("#searchResult").html( response );
        },
		error: function(xhr, status, error) {
			$("#errorMsg").html(error);
		}
    });
    }
    return false;
}

function searchProjectValidation(){
	var regionName = $('#regionName').val();
	var locationName = $('#locationName').val();
	var candidateName = $('#candidateName').val();
	var operationName = $('#operationName').val();
	var siteName = $('#siteName').val();
	var rfPlanner = $('#rfPlanner').val();
	var negPlanner = $('#negPlanner').val();
	var bpcPlanner = $('#bpcPlanner').val();
	var sparkPM = $('#sparkPM').val();
	var sparkSE = $('#sparkSE').val();
	var sacPlanner = $('#sacPlanner').val();
	var hazardUser = $('#hazardUser').val();
	
	if (regionName.trim() == '' &&  locationName.trim() == '' &&  candidateName.trim() == '' &&  operationName.trim() == '' &&  siteName.trim() == ''
		&&  rfPlanner.trim() == '' && negPlanner.trim() == ''  && sparkPM.trim() == ''  && sparkSE.trim() == ''  && sacPlanner.trim() == ''  
			&& bpcPlanner.trim() == '' && hazardUser.trim() == '') {
	    $('#errorMsg').html("Please provide value to search");
 	    return false;
	}
	
	/*if(projectStartDate.trim()!='' && projectStartDate!=null){
		if(projectEndDate.trim()==''){
			$('#errorMsg').html("Please enter both From and To dates");
			return false;
		}
		else{
			if(new Date(projectStartDate)>new Date(projectEndDate)){
				$('#errorMsg').html("From date should be less than To date");
				return false;
			}
		}
	}
	else if(projectEndDate.trim()!='' && projectEndDate!=null){
		if(projectStartDate.trim()==''){
			$('#errorMsg').html("Please enter both From and To dates");
			return false;
		}
		else{
			if(new Date(projectStartDate)>new Date(projectEndDate)){
				$('#errorMsg').html("From date should be less than To date");
				return false;
			}
		}
	}*/
	return true;
}

function clearSearchProject(){
	$('#searchResult').empty();
	$("#errorMsg").empty();	
	$('#regionName').selectpicker('deselectAll');
	$('#locationName').val("");
	$('#candidateName').val("");
	$('#operationName').val("");
	$('#siteName').val("");
	$('#projectId').val("");
	$('#rfPlanner').selectpicker('deselectAll');
	$('#negPlanner').selectpicker('deselectAll');
	$('#sparkPM').selectpicker('deselectAll');
	$('#sparkSE').selectpicker('deselectAll');
	$('#sacPlanner').selectpicker('deselectAll');
	$('#bpcPlanner').selectpicker('deselectAll');
	$('#hazardUser').selectpicker('deselectAll');
	
}

function loadPage(url, data) {
	enablePageWrapperDiv();
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
	$.ajax({
        type: "POST",
        url: url,
        data: data,
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);   
            $.blockUI();
        },
        success: function(response) {
            $("#page-wrapper").html( response );
            $.unblockUI();
        }
    });
}

function loadQueues() {
	var data = { "pageName" : "queuesList"};
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $.ajax({
        type: "POST",
        url: 'loadQueues',
        data: data,
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);            
        },
        success: function(response) {
           $("#queues-list").html( response );
        }
    });
    
    setTimeout('loadQueues()', 5000);
}

function loadChart(){
	Morris.Bar({
	  element: 'poBarChart',
	  data: [
	    { y: 'Total POs', a: '${totalPO}'},
	    { y: 'Open POs', a: '${openPOCount}'},
	    { y: 'PO Awaiting Invoices', a: '${pendingInvoiceCount}'},
	    { y: 'PO Awaiting Receipt', a: '${pendingReceiptCount}'},
	    { y: 'PO Awaiting Voucher', a: '${pendingVoucherCount}'}
	  ],
	  xkey: 'y',
	  ykeys: ['a'],
	  labels: ['Count']
	});
}


//create project validation
function createProjectValidation()
{
	
	return true;
} 



function saveCreateProject() {

	$("#successMsg").empty();
	$("#errorMsg").empty();
	
	if(createProjectValidation()){

	var createProjectFormData = new FormData($('#createProjectForm')[0]); 
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

	$.ajax({
           type: "POST",
           url: "createProject",
           data: createProjectFormData,
           dataType: 'text',
           processData: false,
           contentType: false,
           cache : false,
           beforeSend: function(xhr) {
        	   enableDisableButtons('#createProjectForm', 'disable');
               xhr.setRequestHeader(header, token);
               $("#responseSpinner").show();
           },
           complete: function(){
        	   $('#responseSpinner').hide();
        	   enableDisableButtons('#createProjectForm', 'enable');
      	   },
           success: function(data)
           {
        	   //alert("Success:::"+data);
        	   if(data.search("ERROR")>=0){
        		   $("#errorMsg").html(data);
        	   }
        	   else{
        		   $("#successMsg").html(data);
        		   //$("#sendToVendorBtn").show();
        	   }
           },
		   error : function(xhr, status, error) {
				//alert("Error:::"+xhr.responseText);
				$("#errorMsg").html(error);
		   }
         });
	}
    return false; // avoid to execute the actual submit of the form.
}



/*
 * This function will upload Feed Dump into the system.
 * 
 */
function uploadFeedDump(){

	//alert("inside uploadFeedDump");
	$("#errorFileFormat").empty();
	//$("#errorMsg").empty();

	var fileName=$("#dumpFile").val();
	var fileExtension = fileName.substr((fileName.lastIndexOf('.') + 1));

	if(fileExtension.trim() != 'csv' && fileExtension.trim() != 'CSV'){
		$("#errorFileFormat").html("Please upload .csv file.");	
		return false;
	}

	var jsonReq = new FormData($('#validateFeedForm')[0]); 
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	$.ajax({
		url : "uploadFeed",
		type : "post",
		data : jsonReq,
		processData: false,
		contentType: false,
		cache : false,
		beforeSend : function(xhr) {
			enableDisableButtons('#validateFeedForm', 'disable');
			xhr.setRequestHeader(header, token);
			$("#responseSpinner").show();
		},
		complete : function() {
			$('#responseSpinner').hide();
			enableDisableButtons('#validateFeedForm', 'enable');
		},
		success : function(response) {
			$('#responseSpinner').hide();
			$("#displayFeedDumpFile").html(response);
		},
		error : function(xhr, status, error) {
			$('#responseSpinner').hide();
			$("#errorFileFormat").html(error);
		}
	});

	return false;
}









function downloadDocument(poNo, docType){

	var xhr = new XMLHttpRequest();
	var url = "downloadDocument?poNo="+poNo+"&docType="+docType;

	xhr.open('GET', url, true);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function () {
		if (this.status === 200) {
			var filename = "";
			var disposition = xhr.getResponseHeader('Content-Disposition');
			if (disposition && disposition.indexOf('attachment') !== -1) {
				var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
				var matches = filenameRegex.exec(disposition);
				if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
			}
			if(filename.trim()==''){
				var options = {
						message: 'No file found for download',
						title: 'Error!',
						size: 'sm',
						useBin: true
				};
				eModal.alert(options);
				return false;
			}
			var type = xhr.getResponseHeader('Content-Type');

			var blob = new Blob([this.response], { type: type });
			if (typeof window.navigator.msSaveBlob !== 'undefined') {
				// IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
				window.navigator.msSaveBlob(blob, filename);
			} else {
				var URL = window.URL || window.webkitURL;
				var downloadUrl = URL.createObjectURL(blob);

				if (filename) {
                    // use HTML5 a[download] attribute to specify filename
                    var a = document.createElement("a");
                    // safari doesn't support this yet
                    if (typeof a.download === 'undefined') {
                        window.location = downloadUrl;
                    } else {
                        a.href = downloadUrl;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                    }
                } else {
					window.location = downloadUrl;
				}

				setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
			}
		}
	};
	xhr.send(null);

	return false;
}

function numberValidator(fieldValue){
	var number=/^[0-9]+$/;
	if(!number.test(fieldValue)){
		return false;		
	}
	else{
		return true;
	}
}
function floatNumberValidator(fieldValue){
	var number=/^[0-9\.]+$/;
	if(!number.test(fieldValue)){
		return false;		
	}
	else{
		return true;
	}
}
function  emailValidation(email){
	
	var emailPattern=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	
	if (emailPattern.test(email)) {
		 return true;
   }
    else {
	   return false;
   } 
   
	
}



function nullValidator(fieldValue){

	if(fieldValue==""){
		return true;		
	}
	else{
		return false;
	}
}




function  searchUserValidation(){

	users = $('#users');
	if (users.length == 0 || $(users).val() == "")
	{
		//alert("Please select anyone");
		$('#searchUserErrorMsg').html("Please select anyone");
		return false;
	}
	return true;
}



//Validation of Create User
function  createUserValidation(){

//	var emailPattern=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;


	userTypeValue = $('#userType');
	var vendorTypeValue = $('#vendorType').val();
	var userId = $('#userId').val();
	var email = $('#email').val();
	var userType=$('#userType').val();
	var breakout=false;
	var flag=true;
	var flag1=true;
	// var userIdList= $('#userIdList').val();
	//alert("user id is:"+userId);

	$('input[name="usersList"]').each(function() {

		// alert("vendor is: "+$(this).val());

		if(($(this).val()==userId)){
			breakout = true;
		} 
	});

	if(breakout){
		$('#errorMsg').html("User Id already exists.");
		return false;
	} 

	/*if(userType=='VENDOR'){
	 //alert("userType is "+userType);

	$('input[name="vendorMasterListId"]').each(function() {
	//	alert("vendor is: "+$(this).val());

	    if(($(this).val()==userId)){
	 	    	flag = false;
		} 
	});

	if(flag){
		$('#errorMsg').html("Vendor does not exists. Please create vendor before creating the user.");
		return false;
	}




	//alert("Email is: "+email);
	$('input[name="vendorMasterListEmail"]').each(function() {
		//	alert("Email is: "+$(this).val());

		    if(($(this).val()==email)){
		  //  	alert("Email is mached: "+$(this).val());
		 	    	flag1 = false;
			} 
		});

		if(flag1){
			$('#errorMsg').html("Email address does not match");
			return false;
		}
	}*/
	if($("#lastName").val().trim()==""){
		$('#errorMsg').html("Please enter Last Name.");
		return false;
	}


	if (!emailValidation(email)) {
		$('#errorMsg').html("Please enter valid email address ");
		return false;
	}




	if (userTypeValue.length == 0 || $(userTypeValue).val() == "")
	{
		//alert("Please select anyone");

		$('#errorMsg').html("Please select User Type.");

		//  $('#errorMsg').html("Please select a ");

		return false;
	}

	var isTempUserChecked = $("input[name='tempUser']:checked").length;
	if(isTempUserChecked != 0){
		var tempUserTime = $('#tempUserTime').val();
		if(!numberValidator(tempUserTime)){
			$('#errorMsg').html("Please enter valid Number");
			$('#tempUserTime').focus();
			return false;
		}
	}

	if(userType=='VENDOR'){
		if (vendorTypeValue.length == 0 || $(vendorTypeValue).val() == "")
		{
			$('#errorMsg').html("Please select Vendor Type.");
			$('#vendorsDiv').focus;

			return false;
		}
	}



	// Check roles
	/*if(userType!='VENDOR'){
		if($('input[type=checkbox]:checked').length == 0){

			//alert("user roles is not selected:" );
			 $('#errorMsg').html("Please select atleast one role.");
			   return false;
		    }
		if($("#lastName").val().trim()==""){
			$('#errorMsg').html("Please enter Last Name.");
			   return false;
		}
	}*/

	/*if($('input[name=userModules]:checked').length == 0){

		//alert("user roles is not selected:" );
		$('#errorMsg').html("Please select atleast one module.");
		return false;
	}*/

	if(userType=='USER'){
		if($('input[name=userRoles]:checked').length == 0){

			//alert("user roles is not selected:" );
			$('#errorMsg').html("Please select atleast one role.");
			return false;
		}
		if($('input[name=userGroups]:checked').length == 0){

			//alert("user roles is not selected:" );
			$('#errorMsg').html("Please select atleast one queue.");
			return false;
		}
		
		var phoneNum = $('#phoneNum').val();
		var phoneNumAlt = $('#phoneNumAlt').val();
		var phoneNumEmg = $('#phoneNumEmg').val();
		if(phoneNum.trim() == ''){
			$('#errorMsg').html("Please enter 10 digit Phone Number");
			$('#phoneNum').focus();
			return false;
		}
		if(!numberValidator(phoneNum) || phoneNum.length != 10){
			$('#errorMsg').html("Please enter 10 digit valid Phone Number");
			$('#phoneNum').focus();
			return false;
		}

		if(phoneNumAlt.trim() == ''){
			$('#errorMsg').html("Please enter 10 digit Alternate Number");
			$('#phoneNumAlt').focus();
			return false;
		}
		if(!numberValidator(phoneNumAlt) || phoneNumAlt.length != 10){
			$('#errorMsg').html("Please enter 10 digit valid Alternate Number");
			$('#phoneNumAlt').focus();
			return false;
		}

		if(phoneNumEmg.trim() == ''){
			$('#errorMsg').html("Please enter 10 digit Emergency Number");
			$('#phoneNumEmg').focus();
			return false;
		}
		if(!numberValidator(phoneNumEmg) || phoneNumEmg.length != 10){
			$('#errorMsg').html("Please enter 10 digit valid Emergency Number");
			$('#phoneNumEmg').focus();
			return false;
		}	


	}

	return true;

}


//function create users
function  createUsers(){
	var options = { message: "Are you sure?", title: 'Confirm Submit', size: 'sm', };
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	if(createUserValidation()) {
		$("#errorMsg").empty();
		eModal.confirm(options).then(function(){
			$.ajax({
				type: "POST",
				url: 'createUser',
				data: $("#createUsersForm").serialize(),
				dataType: 'text',
				beforeSend: function(xhr) {
					enableDisableButtons('#createUsersForm', 'disable');
					xhr.setRequestHeader(header, token);
					$("#responseSpinner").show();
					$("#createButton").prop("disabled",true);
					$("#resetButton").prop("disabled",true);
				},
				complete: function(){
					$('#responseSpinner').hide();
					enableDisableButtons('#createUsersForm', 'enable');
				},

				success: function(data) {
					if(data.trim()=='SUCCESS'){
						$("#successMsg").html(' User created successfully');           
						// searchPO();      
					}
					else{
						$("#errorMsg").html(data);
						$("#createButton").prop("disabled",false);
						$("#resetButton").prop("disabled",false);
					}        	
					// $("#successMsg").html( data );
				},
				error: function(xhr, status, error) {
					$("#errorMsg").html(error);
					$("#createButton").prop("disabled",false);
					$("#resetButton").prop("disabled",false);
				}
			});
		});

	}
	return false;

}

function userTypeHide(){

	var userType = $('#userType').val();


	//  alert("userType value is   :"+userType );

	if(userType=='USER'){		 
		$("#rolesDiv").show();	
		$("#phoneNumDiv").show();
		$("#phoneAltDiv").show();
		$("#phoneEmgDiv").show();
		$("#vendorsDiv").hide();

	}
	else if(userType=='VENDOR'){

		$("#rolesDiv").hide();
		$("#hideDepartment").hide();
		$("#userType").val('VENDOR');
		$("#phoneNumDiv").hide();
		$("#phoneAltDiv").hide();
		$("#phoneEmgDiv").hide();
		$("#vendorsDiv").show();
		//  $("#hideDepartment").focus();
	}
	else if(userType=='CONTRACTOR'){
		$("#rolesDiv").hide();
		$("#userType").val('CONTRACTOR');
		$("#phoneNumDiv").hide();
		$("#phoneAltDiv").hide();
		$("#phoneEmgDiv").hide();
		$("#vendorsDiv").hide();
		//  $("#hideDepartment").focus();
	}
	else{
		$("#rolesDiv").hide();
		/* $("#modulesDiv").hide();*/
		$("#hideDepartment").hide();
		$("#phoneNumDiv").hide();
		$("#phoneAltDiv").hide();
		$("#phoneEmgDiv").hide();
		$("#vendorsDiv").hide();
		//		 alert("if userType value is   :"+userType );

	}
}

function changeTempUser(){
	var length = $("input[name=tempUser]:checked").length;
	if(length != 0){
		$("#tempUserTimeDiv").show();	
	}
	else{
		$("#tempUserTimeDiv").hide();	
	}

}

function vendorTypeHide(){

}

function clearUserCreateReq(){

	data={ "pageName" : "createUser"}; 
	loadPage("loadCreateUser",data); 

}

//search function for Manager Users
function searchUser() {

	if(searchUserValidation()){
		$("#searchUserErrorMsg").empty();
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");

		$.ajax({
			type: "POST",
			url: 'searchUser',
			data: $("#editUsersForm").serialize(),
			beforeSend: function(xhr) {
				enableDisableButtons('#editUsersForm', 'disable');
				xhr.setRequestHeader(header, token);
				$("#searchSpinner").show();
			},
			complete: function(){
				$('#searchSpinner').hide();
				$("#userSearchResult").show();
				enableDisableButtons('#editUsersForm', 'enable');
			},
			success: function(response) {

				$("#userSearchResult").html( response );        	 
			},

			error: function(xhr, status, error) {
				//alert(error);
				$("#searchUserErrorMsg").html(error);
			}
		});
	}	 
	return false;		
}



//update function for Manager Users
function  updateUser(){
	var options = { message: "Are you sure?", title: 'Confirm Submit', size: 'sm', };
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$("#errorMsg").empty();
	$("#successMsg").empty();

	if(updateUserValidation()){

		eModal.confirm(options).then(function(){

			$.ajax({
				type: "POST",
				url: 'updateUser',
				data: $("#userResultSearchForm").serialize(),
				dataType: 'text',
				beforeSend: function(xhr) {
					enableDisableButtons('#userResultSearchForm', 'disable');
					xhr.setRequestHeader(header, token);
					$("#responseSpinner").show();
					$("#updateButton").prop("disabled",true);
					$("#cancelButton").prop("disabled",true);
				},
				complete: function(){
					$('#responseSpinner').hide();
					enableDisableButtons('#userResultSearchForm', 'enable');
				},

				success: function(data) {

					if(data.trim()=='SUCCESS'){
						$("#successMsg").html(' User updated successfully');
						$("#updateButton").prop("disabled",false);
						$("#cancelButton").prop("disabled",false);
					}
					else{
						$("#errorMsg").html('Error while saving record: '+data);
						$("#updateButton").prop("disabled",false);
						$("#cancelButton").prop("disabled",false);
					}        	

				},

				error: function(xhr, status, error) {
					$("#errorMsg").html(error);
					$("#updateButton").prop("disabled",false);
					$("#cancelButton").prop("disabled",false);
				}
			});
		});
	}
	return false;	


}

function  updateUserValidation(){
	var email = $('#email').val();

	var phoneNum = $('#phoneNum').val();
	var phoneNumAlt = $('#phoneNumAlt').val();
	var phoneNumEmg = $('#phoneNumEmg').val();

	userTypeValue = $('#userType');
	var userType=$('#userType').val();


	if(email.trim() == ''){
		$('#errorMsg').html("Please enter email address");
		$('#email').focus();
		return false;
	}

	if(!emailValidation(email) ){   //|| !email.endsWith('.com')
		$('#errorMsg').html("Please enter valid email address");
		$('#email').focus();
		return false;
	}

	/*	if (!isEmailValid(email)) {
		$('#errorMsg').html("Please enter the valid email address ");
		return false;
   }*/

	if (userTypeValue.length == 0 || $(userTypeValue).val() == ""){
		$('#errorMsg').html("Please select User Type.");
		return false;
	}


	// Check roles
	/*if(userType!='VENDOR'){
		if($('input[type=checkbox]:checked').length == 0){

			//alert("user roles is not selected:" );
			 $('#errorMsg').html("Please select atleast one role.");
			   return false;
		    }
		if($("#lastName").val().trim()==""){
			$('#errorMsg').html("Please enter Last Name.");
			   return false;
		}
	}*/

	if(userType=='USER'){
		if($('input[name=userRole]:checked').length == 0){

			//alert("user roles is not selected:" );
			$('#errorMsg').html("Please select atleast one role.");
			return false;
		}
		if($('input[name=userGroup]:checked').length == 0){

			//alert("user roles is not selected:" );
			$('#errorMsg').html("Please select atleast one queue.");
			return false;
		}
		if($("#lastName").val().trim()==""){
			$('#errorMsg').html("Please enter Last Name.");
			return false;
		}
		if(phoneNum.trim() == ''){
			$('#errorMsg').html("Please enter 10 digit Phone Number");
			$('#phoneNum').focus();
			return false;
		}
		if(!numberValidator(phoneNum) || phoneNum.length != 10){
			$('#errorMsg').html("Please enter 10 digit valid Phone Number");
			$('#phoneNum').focus();
			return false;
		}

		if(phoneNumAlt.trim() == ''){
			$('#errorMsg').html("Please enter 10 digit Alternate Number");
			$('#phoneNumAlt').focus();
			return false;
		}
		if(!numberValidator(phoneNumAlt) || phoneNumAlt.length != 10){
			$('#errorMsg').html("Please enter 10 digit valid Alternate Number");
			$('#phoneNumAlt').focus();
			return false;
		}

		if(phoneNumEmg.trim() == ''){
			$('#errorMsg').html("Please enter 10 digit Emergency Number");
			$('#phoneNumEmg').focus();
			return false;
		}
		if(!numberValidator(phoneNumEmg) || phoneNumEmg.length != 10){
			$('#errorMsg').html("Please enter 10 digit valid Emergency Number");
			$('#phoneNumEmg').focus();
			return false;
		}	
	}


	return true;


}



//function create Vendor
function  createVendor(){

	var options = {
			message: "Are you sure want to create ?",
			title: 'Confirm Submit',
			size: 'sm',
	};
	$("#errorMsg").empty();
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	eModal.confirm(options).then(function(){

		$.ajax({
			type: "POST",
			url: 'createVendor',
			data: $("#createVendorsForm").serialize(),
			dataType: 'text',
			beforeSend: function(xhr) {
				xhr.setRequestHeader(header, token);
				$("#responseSpinner").show();
			},
			complete: function(){
				$('#responseSpinner').hide();
			},

			success: function(data) {

				if(data.trim()=='SUCCESS'){
					$("#successMsg").html(' Vendor Create successfully');

				}
				else{
					$("#errorMsg").html('Error while saving record: '+data);
				}        	

			},
			error: function(xhr, status, error) {
				$("#errorMsg").html(error);
			}
		});
	});

	return false;	

}



//search function for Manage Vendor
function searchVendor() {

	$("#errorMsg").empty();
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	$.ajax({
		type: "POST",
		url: 'searchUser',
		data: $("#editUsersForm").serialize(),
		beforeSend: function(xhr) {
			xhr.setRequestHeader(header, token);
			$("#searchSpinner").show();
		},
		complete: function(){
			$('#searchSpinner').hide();

		},
		success: function(response) {

			$("#userSearchResult").html( response );        	 
		},

		error: function(xhr, status, error) {
			//alert(error);
			$("#errorMsg").html(error);
		}
	});

	return false;		
}



//update function for Manage Vendor
function  updateVendor(){

	var options = {
			message: "Are you sure want to update ?",
			title: 'Confirm Submit',
			size: 'sm',
	};

	$("#errorMsg").empty();

	//var userId = $('#userId').val();
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	eModal.confirm(options).then(function(){

		$.ajax({
			type: "POST",
			url: 'updateUser',
			data: $("#userResultSearchForm").serialize(),
			dataType: 'text',
			beforeSend: function(xhr) {
				xhr.setRequestHeader(header, token);
				$("#responseSpinner").show();
			},
			complete: function(){
				$('#responseSpinner').hide();
			},

			success: function(data) {

				if(data.trim()=='SUCCESS'){
					$("#successMsg").html(' User Update successfully');
				}
				else{
					$("#errorMsg").html('Error while saving record: '+data);
				}        	

			},

			error: function(xhr, status, error) {
				$("#errorMsg").html(error);
			}
		});
	});
	return false;	


}

function showQueueDetails(queueId, queueName) {
	enablePageWrapperDiv();
	var data={ "pageName" : "queueDetails" , "queueId" : queueId, "queueName" : queueName};
	loadPage("loadQueueDetails", data);
}


function loadTaskDetailsModal(taskId, taskName, taskDefinitionKey, processDefinitionId, queueId, queueName, processInstanceId, siteId, operationId, orderId){

	var requestData={"pageName" : "taskDetails" , "taskId" : taskId, "taskName" : taskName, "taskDefinitionKey" : taskDefinitionKey, "processDefinitionId" : processDefinitionId, "queueId" : queueId, "queueName" : queueName, "processInstanceId" : processInstanceId, "operationId" : operationId, "orderId" : orderId};
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	$.ajax({

		url : "loadTaskDetails",
		type : "POST",
		data : requestData,

		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},

		complete : function() {
			loadTaskDetailsPage(taskId, taskName, taskDefinitionKey, processDefinitionId, queueId, queueName, processInstanceId, siteId, operationId, orderId);
		},

		success : function(response) {
			//$('#taskDetailsModal').find('.modal-content').html(response);
			//$('#taskDetailsModal').modal({ backdrop: 'static', keyboard: false, show : true });
			$("#page-wrapper").html( response );
		},

		error : function(xhr, status, error) {
			alert(error);
		}
	});
	return false;
}

function loadTaskDetailsPage(taskId, taskName, taskDefinitionKey, processDefinitionId, queueId, queueName, processInstanceId, siteId, operationId, orderId){

	var requestData={"taskId" : taskId, "taskName" : taskName, "taskDefinitionKey" : taskDefinitionKey, "processDefinitionId" : processDefinitionId, "queueId" : queueId, "queueName" : queueName, "processInstanceId" : processInstanceId,  "siteId" : siteId, "operationId" : operationId, "orderId" : orderId};
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	$.ajax({

		url : "loadTaskDetailsPage",
		type : "POST",
		data : requestData,

		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
			$("#taskDetailsTabSpinner").show();
		},

		complete : function() {

		},

		success : function(response) {
			$("#taskDetailsTabSpinner").hide();
			$('#taskDetailsTab').html(response);
		},

		error : function(xhr, status, error) {
			alert(error);
		}
	});
	return false;
}

function forwardTaskDetailsModal(){
	var requestData= {"pageName" : "forwardTaskPage" };
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	$.ajax({

		url : "forwardTaskDetails",
		type : "POST",
		data : requestData,

		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},

//		complete : function() {
//		loadTaskDetailsPage(taskId, taskName, taskDefinitionKey, processDefinitionId, queueId, queueName, processInstanceId);
//		},

		success : function(response) {
			$('#taskForwardModal').find('.modal-content').html(response);
			$('#taskForwardModal').modal({ backdrop: 'static', keyboard: false, show : true });
		},

		error : function(xhr, status, error) {
			alert(error);
		}
	});
	return false;
}


function submitTaskDetails(){
	$("#taskDetailsUpdateSuccessMsg").empty();
	$("#taskDetailsUpdateErrorMsg").empty();

	var taskDetailsForm = new FormData($('#taskDetailsForm')[0]);
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	var queueId = $("#queueId").val();
	var queueName = $("#queueName").val();

	var options = {
			message: "Are you sure?",
			title: 'Confirm Submit',
			size: 'sm',
	};

	eModal.confirm(options).then(function(){
		$.ajax({
			type: "POST",
			url: "submitTaskDetails",
			data: taskDetailsForm,
			dataType: 'text',
			processData: false,
			contentType: false,
			cache : false,
			beforeSend: function(xhr) {
				enableDisableButtons('#taskDetailsForm','disable');
				xhr.setRequestHeader(header, token);
				$("#taskDetailsUpdateSpinner").show();
			},
			complete: function(){
				$('#taskDetailsUpdateSpinner').hide();
				enableDisableButtons('#taskDetailsForm','enable');
				
			},
			success: function(data)
			{
				if(data.trim()=='SUCCESS') {
					$('#taskDetailsModal').find('.modal-content').html('');
					$('#taskDetailsModal').modal('hide');
					showQueueDetails(queueId, queueName);
				} else if(data.trim().startsWith('FILE ERROR :')){
					$("#taskDetailsUpdateErrorMsg").html(data.trim().substr(12));
				} else {
					$("#taskDetailsUpdateErrorMsg").html('Error while saving record');
				}
			},
			error : function(xhr, status, error) {
				$("#taskDetailsUpdateErrorMsg").html(error);
			}
		});
	});

	return false; // avoid to execute the actual submit of the form.
}

function submitCustomTaskDetails(jsonData) {
	$("#taskDetailsUpdateSuccessMsg").empty();
	$("#taskDetailsUpdateErrorMsg").empty();

	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	var queueId = $("#queueId").val();
	var queueName = $("#queueName").val();

	var options = {
			message: "Are you sure?",
			title: 'Confirm Submit',
			size: 'sm',
	};

	eModal.confirm(options).then(function(){
		$.ajax({
			type : 'POST',
			url: "submitCustomTaskDetails",
			data : JSON.stringify(jsonData),
			contentType : 'application/json',
			beforeSend: function(xhr) {
				xhr.setRequestHeader(header, token);
				$("#taskDetailsUpdateSpinner").show();
				enableDisableButtons('#taskDetailsForm','disable');
			},
			complete: function(){
				$('#taskDetailsUpdateSpinner').hide();
				showQueueDetails(queueId, queueName);
				enableDisableButtons('#taskDetailsForm','enable');
			},
			success: function(data)
			{
				if(data.trim()=='SUCCESS') {
					$('#taskDetailsModal').find('.modal-content').html('');
					$('#taskDetailsModal').modal('hide');
				}
				else{
					$("#taskDetailsUpdateErrorMsg").html('Error while saving record');
				}

			},
			error : function(xhr, status, error) {
				$("#taskDetailsUpdateErrorMsg").html("error: " + xhr + " status: " + status + " er:" + error);
			}
		});
	});

	return false; // avoid to execute the actual submit of the form.
}

function saveSendEP(){
	var EP_FL_APPR_AUTH=$('input[name="EP_FL_APPR_AUTH"]:checked').val();
	var RSN_REJN_EP_FL = $("#RSN_REJN_EP_FL option:selected").text();
	var EP_NTC_PUBL=$('input[name="EP_NTC_PUBL"]:checked').val();
	var UP_MTX_EP_PUBL=$('input[name="UP_MTX_EP_PUBL"]:checked').val();
	
	if(EP_NTC_PUBL == "YES"){
		$('#EP_NTC_PUBL_HIDDEN').attr('checked', false);
	}
	if(UP_MTX_EP_PUBL == "YES"){
		$('#UP_MTX_EP_PUBL_HIDDEN').attr('checked', false);
	}
	if(EP_COMPL == "YES"){
		$('#EP_COMPL_HIDDEN').attr('checked', false);
	}
	
	keepTaskDetails();
}

function keepTaskDetails(){
	$("#taskDetailsUpdateSuccessMsg").empty();
	$("#taskDetailsUpdateErrorMsg").empty();

	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	var queueId = $("#queueId").val();
	var queueName = $("#queueName").val();

	/*var options = {
        message: "Are you sure?",
        title: 'Confirm Submit',
        size: 'sm',	        
    };*/

	//eModal.confirm(options).then(function(){
	$.ajax({
		type: "POST",
		url: "keepTaskDetails",
		data: $("#taskDetailsForm").serialize(),
		beforeSend: function(xhr) {
			enableDisableButtons('#taskDetailsForm','disable');
			xhr.setRequestHeader(header, token);
			$("#taskDetailsUpdateSpinner").show();
		},
		complete: function(){
			$('#taskDetailsUpdateSpinner').hide();
			showQueueDetails(queueId, queueName);
			enableDisableButtons('#taskDetailsForm','enable');
		},
		success: function(data)
		{
			if(data.trim()=='SUCCESS') {
				$('#taskDetailsModal').find('.modal-content').html('');
				$('#taskDetailsModal').modal('hide');
			}
			else{
				$("#taskDetailsUpdateErrorMsg").html('Error while saving record');
			}

		},
		error : function(xhr, status, error) {
			$("#taskDetailsUpdateErrorMsg").html(error);
		}
	});
	//});

	return false; // avoid to execute the actual submit of the form.
}



function clearMessage() {
	$("#successMsg").html('');
	$("#errorMsg").html('');
}

function loadProjectDetailsModal(projectId, projectName, projectType){

	var requestData={"pageName" : "projectDetails" , "projectId" : projectId, "projectName" : projectName, "projectType" : projectType};	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajax({
		url : "loadProjectDetails",
		type : "POST",
		data : requestData,
		async: false,
		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},

		complete : function() {

		},

		success : function(response) {
			//		alert("div--" + document.getElementById("projectDetailsModal"))
			/*
			$('#projectDetailsModal').find('.modal-content').html(response);
			$('#projectDetailsModal').modal({ backdrop: 'static', keyboard: false, show : true });
			$('#projectDetailsModal').modal('show');
			 */

			$("#projectDetailsModal").html(response);
		},

		error : function(xhr, status, error) {
			alert(error);
		}
	});
	return false;
}

/*function loadProjectDetailsPage(projectId, projectName, projectType, operationId){

	var data={"pageName" : "projectDetails" , "projectId" : projectId, "projectName" : projectName, "projectType" : projectType, "operationId" :operationId};

	loadPage("loadProjectDetails",data); 
}*/

function searchPageWrapperLoadPage(url, data) {
    var token = $("meta[name='_csrf']").attr("content");
 var header = $("meta[name='_csrf_header']").attr("content");
    $.ajax({
     type: "POST",
     url: url,
     data: data,
     beforeSend: function(xhr) {
         xhr.setRequestHeader(header, token);            
     },
     success: function(response) {
         $("#search-page-wrapper").html( response );
     }
 });
}

function enablePageWrapperDiv(){
	$("#search-page-wrapper").html("");
	$("#page-wrapper").show();
}

function gotoSearchScreen(){      
    $("#search-page-wrapper").html("");
    $("#page-wrapper").show();
}


function loadProjectDetailsPage(projectId, projectName, projectType, operationId){
    var data={"pageName" : "projectDetails" , "projectId" : projectId, "projectName" : projectName, "projectType" : projectType, "operationId" :operationId};
    $("#page-wrapper").hide();
    //loadPage("loadProjectDetails",data);
    searchPageWrapperLoadPage("loadProjectDetails",data); 
}


function uploadDocForProjectId() {

	$("#successMsg").empty();
	$("#errorMsg").empty();

	//alert(validateUploadDocument());
	if(true){

		var uploadDocFormData = new FormData($('#uploadDocForm')[0]); 
		var projectId = $('#uploadDocForm').find('input[name="projectIdTask"]').val();;
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");

		$.ajax({
			type: "POST",
			url: "uploadDocForProjectId",
			data: uploadDocFormData,
			dataType: 'text',
			processData: false,
			contentType: false,
			cache : false,
			beforeSend: function(xhr) {
				enableDisableButtons('#uploadDocForm', 'disable');
				xhr.setRequestHeader(header, token);
				$("#responseSpinner").show();
				$("#submitUploadDocBtn").prop("disabled",true);
			},
			complete: function(){
				$('#responseSpinner').hide();
				$("#submitUploadDocBtn").prop("disabled",false);
				$('#uploadDocForm')[0].reset();
				loadAttachmentDocList(projectId);
				enableDisableButtons('#uploadDocForm', 'enable');
			},
			success: function(data)
			{
				if(data.trim()=='SUCCESS'){
					$("#successMsg").html('Document uploaded successfully');
				}
				else{
					$("#errorMsg").html('Error while saving record: '+data);
				}        	           	   
			},
			error : function(xhr, status, error) {
				$("#errorMsg").html('Error while uploading document: '+error);
			}
		});
	}
	return false; // avoid to execute the actual submit of the form.
}

function validateUploadDocument() {
	var docTitleIndx = $('.docTitle').length;
	if(docTitleIndx > 0){
		return true;
	}else{
		return false;
	}
}

function downloadDocumentWithID(docId){
	
	var xhr = new XMLHttpRequest();
    var url = "downloadDocumentWithId?docId="+docId;
    
        
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        if (this.status === 200) {
            var filename = "";
            var disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
            }
            if(filename.trim()==''){
            	var options = {
            	        message: 'No file found for download',
            	        title: 'Error!',
            	        size: 'sm',
            	        useBin: true            	        
            	    };
            	eModal.alert(options);
            	return false;
            }
            var type = xhr.getResponseHeader('Content-Type');

            var blob = new Blob([this.response], { type: type });
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                window.navigator.msSaveBlob(blob, filename);
            } else {
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);

                if (filename) {
                    // use HTML5 a[download] attribute to specify filename
                    var a = document.createElement("a");
                    // safari doesn't support this yet
                    if (typeof a.download === 'undefined') {
                        window.location = downloadUrl;
                    } else {
                        a.href = downloadUrl;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                    }
                } else {
                    window.location = downloadUrl;
                }

                setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
            }
        }
    };
    xhr.send(null);
    
  return false;
	
}

var docCount=1;
function addNewDocument(){
	var newRow = '<tr class="odd gradeX">' +
	'<td>Attachment'	+
	'<input type="hidden" id="docTitle" name="docTitle" value="Attachment" />' +
	'<input type="hidden" id="documentId" name="documentId" value="OTHER" />' +
    '</td>' +
	'<td><input type="file" id="docFile" name="docFile" data-placeholder="No file" required></td>' +
	'<td align="center" valign="center">' +
	'<button type="button" id="deleteDocBtn" name="deleteDocBtn" title="Remove Document Placeholder" class="btn btn-danger btn-xs removeDocClass"><i class="fa fa-remove"></i></button>' +
	'</td>' +
	'</tr>';
	$('#attchmentDocumentsAddTableBody').append(newRow);
	$(".removeDocClass").bind("click", deleteNewDocument);
	docCount++;  
}

function deleteNewDocument() {
	$(this).parent().parent().remove();
}

function loadAttachmentDocList(projectId) {
	var requestData={"pageName" : "documentList" , "projectId" : projectId};
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	$.ajax({

		url : "loadAttachmentDocList",
		type : "POST",
		data : requestData,

		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},

		complete : function() {

		},

		success : function(response) {
			$('#attchmentDocumentsTabTableBody').html(response);
		},

		error : function(xhr, status, error) {
			alert(error);
		}
	});
	return false;
}

function loadDocumentList(projectId) {
	var requestData={"pageName" : "documentList" , "projectId" : projectId};
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	$.ajax({

		url : "loadDocumentList",
		type : "POST",
		data : requestData,

		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},

		complete : function() {

		},

		success : function(response) {
			$('#documentsTabTableBody').html(response);
		},

		error : function(xhr, status, error) {
			alert(error);
		}
	});
	return false;
}

function loadGanttChart() {

	//alert("Inside LodaGantChart");

	$('#ganttChart').show();

}

function displayDetailsOnForwardTsk(){
	var radioButton = $('input[name="selectUser"]:checked').val(); 

	if(radioButton == 'Group') {
		$("#userForwardList").hide();
		$("#groupForwardList").show();
	} else {
		$("#userForwardList").show();
		$("#groupForwardList").hide();
	}

	return false;
}

function forwardTask(){
	var radioButton = $('input[name="selectUser"]:checked').val(); 
	var selectId = '';
	var queueId = $("#queueId").val();
	var queueName = $("#queueName").val();

	if(radioButton == 'Group') {
		selectId = $("#groupForwardList option:selected" ).val();
	} else {
		selectId = $("#userForwardList option:selected" ).val();
	}

	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	var jsonObj = new Object();
	jsonObj['taskId'] =  $("#taskId").val();
	jsonObj['selectId'] = selectId;
	jsonObj['selectUser'] = radioButton;

	$.ajax({
		type : 'POST',
		url: "forwardTask",
		data : JSON.stringify(jsonObj),
		contentType : 'application/json',
		beforeSend: function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		complete: function(){
			showQueueDetails(queueId, queueName);
		},
		success: function(data)
		{
			if(data.trim()=='SUCCESS') {
				$('#taskForwardModal').find('.modal-content').html('');
				$('#taskForwardModal').modal('hide');
				$('#taskDetailsModal').find('.modal-content').html('');
				$('#taskDetailsModal').modal('hide');
			}
			/* else{
    		   $("#taskDetailsUpdateErrorMsg").html('Error while saving record');
    	   }*/
		},
		error : function(xhr, status, error) {
			//$("#taskDetailsUpdateErrorMsg").html("error: " + xhr + " status: " + status + " er:" + error);
		}
	});
}

function forwardMultipleTasks(){
	//alert('forward Task()');
	$("#taskForwardErrorMsg").empty();
	
	var formDataObj = new FormData($('#queueDetailsForm')[0]); 
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	var queueId = $("#queueId").val();
	var queueName = $("#queueName").val();
	
	var checked = $('input[name=isFwdTask]:checked').length;
	if(checked == 0){
		$("#taskForwardErrorMsg").html('Please select atleast one task.');
		return false;
	}
	
	if($('#userForwardList').val() == ""){
		$("#taskForwardErrorMsg").html('Please select a user.');
		return false;
	}
	
	$.ajax({
		type : 'POST',
		url: "forwardMultipleTasks",
		data : formDataObj,
		processData: false,
		contentType: false,
		cache : false,
		beforeSend: function(xhr) {
			enableDisableButtons('#queueDetailsForm', 'disable');
			$("#taskForwardSpinner").show();
			xhr.setRequestHeader(header, token);
		},
		complete: function(){
			$("#taskForwardSpinner").hide();
			enableDisableButtons('#queueDetailsForm', 'enable');
			//showQueueDetails(queueId, queueName);
			//alert("complete");
		},
		success: function(data)
		{
			if(data.trim()=='SUCCESS') {
				//alert("success");
				showQueueDetails(queueId, queueName);
			}
			 else{
				 //alert("error");
    		   $("#taskForwardErrorMsg").html('Error while forward. Please contact support.');
    	   }
			
			$("#taskForwardSpinner").hide();
		},
		error : function(xhr, status, error) {
			$("#taskForwardErrorMsg").html('Error while forward: ' + error);
			//$("#taskDetailsUpdateErrorMsg").html("error: " + xhr + " status: " + status + " er:" + error);
			//alert("http error");
		}
	});
	
	return true;
}

//03-Mar-2016 : Chandni Goel - DACL Document - Start 
function daclDocumentFormModal(projectId,processDefinitionId,taskDefinitionKey,siteId){
	var requestData= {"pageName" : "DACLScreenDesign", "projectId" : projectId, "processDefinitionId" : processDefinitionId, "taskDefinitionKey" : taskDefinitionKey, "siteId" : siteId};
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajax({

		url : "DACLscreen",
		type : "POST",
		data : requestData,

		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},

		success : function(response) {
			$('#DACLScreenModal').find('.modal-content').html(response);
			$('#DACLScreenModal').modal({ backdrop: 'static', keyboard: false, show : true });
		},

		error : function(xhr, status, error) {
			alert(error);
		}
	});
	return false;
}

function displayDetailsOnDACL(){
	var numberOfCandidate = parseInt($("#candidateList option:selected" ).val(), 10); 
	for(var i=1;i<=numberOfCandidate;i++){
		var radioButton = $('input[name=MOP_mob'+i+']:checked').val(); 
		if(radioButton == 'YES') {
			$("#mobister_detail"+i).show();
		} else {
			$("#mobister_detail"+i).hide();
			$('#Mob_site_code'+i).val("");
		}
	}
	return false;
}
function displayHVDetailsOnDACL(){
	var numberOfCandidate = parseInt($("#candidateList option:selected" ).val(), 10); 
	for(var i=1;i<=numberOfCandidate;i++){
		var radioButton = $('input[name=HV_pylon'+i+']:checked').val(); 

		if(radioButton == 'YES') {


			$("#pylon_detail"+i).show();
		} else {
			$("#pylon_detail"+i).hide();
			$('#pylon_num'+i).val("");
		}
	}
	return false;
}

function displayproxDetailsOnDACL(){

	var numberOfCandidate = parseInt($("#candidateList option:selected" ).val(), 10); 
	for(var i=1;i<=numberOfCandidate;i++){
		var radioButton = $('input[name=MOP_prox'+i+']:checked').val(); 

		if(radioButton == 'YES') {


			$("#proximus_detail"+i).show();
		} else {


			$("#proximus_detail"+i).hide();
			$('#prox_site_code'+i).val("");
		}
	}
	return false;
}

function displaylightDetailsOnDACL(){
	var numberOfCandidate = parseInt($("#candidateList option:selected" ).val(), 10); 
	for(var i=1;i<=numberOfCandidate;i++){
		var radioButton = $('input[name=light_pole'+i+']:checked').val(); 

		if(radioButton == 'YES') {
			$("#light_detail"+i).show();
		} else {
			$("#light_detail"+i).hide();
			$('#light_pole_num'+i).val("");
		}
	}
	return false;
}

function numberOfCandidate(){
	var numberOfCandidate = parseInt($("#candidateList option:selected" ).val(), 10);
	var i;
	for (i = 1; i <= numberOfCandidate; i++) {
		$("#candidatelist" + i).show();
	}
	for (i = numberOfCandidate + 1; i <= 10; i++) {
		$("#candidatelist" + i).hide();
		$('#name'+i).val("");
		$('#address'+i).val("");
		$('#zip_code'+i).val("");
		$('#commune'+i).val("");
		$('#cad_zone_type'+i).val("");
		$('#x_co_ordinate'+i).val("");
		$('#y_co_ordinate'+i).val("");
		$('#SiteList'+i).val("");
		$('#desc_site'+i).val("");
		$('#MOP_mob'+i).prop('checked', false);
		$('#HV_pylon'+i).prop('checked', false);
		$('#MOP_prox'+i).prop('checked', false);
		$('#light_pole'+i).prop('checked', false);
		$('#light_pole_num'+i).val("");
		$('#prox_site_code'+i).val("");
		$('#pylon_num'+i).val("");
		$('#Mob_site_code'+i).val("");
		$('#avl_height'+i).val("");
		$('#achv_height'+i).val("");
	}
	return false;
}


function validateDaclDetails(){
	
	var numberOfCandidate = parseInt($("#candidateList option:selected" ).val(), 10);
	var i;
	for(i = 1;i<= numberOfCandidate;i++)
		{   
		
		var name=$("#name"+i).val();
		var address=$("#address"+i).val();
		var zip_code=$("#zip_code"+i).val();
		var commune=$("#commune"+i).val();
		var cad_zone_type=$("#cad_zone_type"+i).val();
		var x_co_ordinate=$("#x_co_ordinate"+i).val();
		var y_co_ordinate=$("#y_co_ordinate"+i).val();
		var SiteList=$("#SiteList"+i).val();
		var desc_site=$("#desc_site"+i).val();
		var MOP_mob = $("input[name='MOP_mob"+i+"']:checked").val();
		var HV_pylon = $("input[name='HV_pylon"+i+"']:checked").val();
		var MOP_prox = $("input[name='MOP_prox"+i+"']:checked").val();
		var light_pole = $("input[name='light_pole"+i+"']:checked").val();
		var docFile=$("#docFile"+i).val();
		var Mob_site_code=$("#Mob_site_code"+i).val();
		var pylon_num=$("#pylon_num"+i).val();
		var prox_site_code=$("#prox_site_code"+i).val();
		var light_pole_num=$("#light_pole_num"+i).val();
		var AVL_HIGHT = $("#avl_height"+i).val();
		var ACHV_HIGHT = $("#achv_height"+i).val();
		
		if(nullValidator(name))
		{
			$("#daclScreenErrorMsg").html('Please enter name');
			$('#name'+i).focus();

		return false;
		}
		else if(nullValidator(address))
		{
			$("#daclScreenErrorMsg").html('Please enter address');
			$('#address'+i).focus();

			return false;
		}		
		else if(nullValidator(zip_code))
		{
			$("#daclScreenErrorMsg").html('Please enter zip code');
			$('#zip_code'+i).focus();

			return false;
		}
		else if(nullValidator(commune))
		{
			$("#daclScreenErrorMsg").html('Please enter commune');
			$('#commune'+i).focus();

			return false;
		}		
		else if(nullValidator(cad_zone_type))
		{
			$("#daclScreenErrorMsg").html('Please enter Cadets zoning type');
			$('#cad_zone_type'+i).focus();

			return false;
		}
		else if(nullValidator(x_co_ordinate))
		{
			$("#daclScreenErrorMsg").html('Please enter LAMBERT X CO-ORDINATES');
			$('#x_co_ordinate'+i).focus();

			return false;
		}
		
		else if(nullValidator(y_co_ordinate))
		{
			$("#daclScreenErrorMsg").html('Please enter LAMBERT Y CO-ORDINATES');
			$('#y_co_ordinate'+i).focus();

			return false;
		}
		else if(!numberValidator(AVL_HIGHT))
		{
			$("#daclScreenErrorMsg").html('Please enter Numeric value for Available Height');
			$('#avl_height'+i).focus();

			return false;
		}
		else if(!numberValidator(ACHV_HIGHT))
		{
			$("#daclScreenErrorMsg").html('Please enter Numeric value for Achievable Height');
			$('#achv_height'+i).focus();
			return false;
		}
		else if(nullValidator(SiteList))
		{
			$("#daclScreenErrorMsg").html('Please select Type Of Site');
			$('#SiteList'+i).focus();

			return false;
		}
		else if(nullValidator(desc_site))
		{
			$("#daclScreenErrorMsg").html('Please enter Description Of Site');
			$('#desc_site'+i).focus();

			return false;
		}
		else if(!MOP_mob)
		{
			$("#daclScreenErrorMsg").html('Please choose one of the option for MOP Mobister');
			$('#MOP_mob'+i).focus();

			return false;
		}
		else if(!HV_pylon)
		{
			$("#daclScreenErrorMsg").html('Please choose one of the option for HV pylon');
			$('#HV_pylon'+i).focus();

			return false;
		}
		
		else if(!MOP_prox)
	      {
			$("#daclScreenErrorMsg").html('Please choose one of the option for MOP proximus');
			$('#MOP_prox'+i).focus();

		return false;
		}
		
		else if(!light_pole)
	      {
			$("#daclScreenErrorMsg").html('Please choose one of the option for Light pole');
			$('#light_pole'+i).focus();

		return false;
		}	
		else if(nullValidator(docFile))
	      {
			$("#daclScreenErrorMsg").html('Please choose a file to upload');
			$('#docFile'+i).focus();

		return false;
		}		
		else if(!numberValidator(zip_code))
				{
					$("#daclScreenErrorMsg").html('Please enter Numeric value for zip code');
					$('#zip_code'+i).focus();

					return false;
				}
			else if(!numberValidator(x_co_ordinate))
			{
				$("#daclScreenErrorMsg").html('Please enter Numeric value for LAMBERT x co-ordinate');
				$('#x_co_ordinate'+i).focus();

				return false;
			}
			else if(!numberValidator(y_co_ordinate))
			{
				$("#daclScreenErrorMsg").html('Please enter Numeric value for LAMBERT y co-ordinate');
				$('#y_co_ordinate'+i).focus();

				return false;
			}
		
			 if(MOP_mob == "YES")
			  {
			          if(nullValidator(Mob_site_code))
		                {
				           $("#daclScreenErrorMsg").html('Please enter Mobister Site Code');
				            $('#Mob_site_code'+i).focus();
				            return false;
			             }	
			         
			  }
			 if(HV_pylon == "YES")
			  {
			          if(nullValidator(pylon_num))
		                {
				           $("#daclScreenErrorMsg").html('Please enter Pylon number');
				            $('#pylon_num'+i).focus();
				            return false;
			             }	
			          
			  }
			 if(MOP_prox == "YES")
			  {
			          if(nullValidator(prox_site_code))
		                {
				           $("#daclScreenErrorMsg").html('Please enter Proximus site code');
				            $('#prox_site_code'+i).focus();
				            return false;
			             }	
			          
			  }
			
			 if(light_pole == "YES")
			  {
			          if(nullValidator(light_pole_num))
		                {
				           $("#daclScreenErrorMsg").html('Please enter Light pole');
				            $('#light_pole_num'+i).focus();
				            return false;
			             }	
			          
			  }
			
			
		}
	return true;
}

function clearDACLUploadMsg(){
	$("#errorDACLMsg").html("");
}

function submitDaclDetails(){
	$("#daclScreenSuccessMsg").empty();
	$("#daclScreenErrorMsg").empty();
	var projectId = $("#projectId").val();
	
	var options = {
	         message: "Are you sure want to submit ?",
	         title: 'Confirm Submit',
	         size: 'sm',          
	     };

	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
	if(validateDaclDetails()){
		$("#daclScreenErrorMsg").hide();
    eModal.confirm(options).then(function(){
	$.ajax({
        
		url : "DACLsubmit",
        type : "POST",
        data : $("#daclScreenForm").serialize(),
        
        beforeSend : function(xhr) {
        	enableDisableButtons('#daclScreenForm', 'disable');
			xhr.setRequestHeader(header, token);
			$("#daclScreenSpinner").show();
		},
		complete: function(){
			$("#daclScreenSpinner").hide();
			$('#DACLScreenModal').modal('hide');
			loadDocumentList(projectId);
			enableDisableButtons('#daclScreenForm', 'enable');
   	   	},
        success: function(data)
        {
     	   if(data.trim()=='SUCCESS'){
     		   $("#daclScreenSuccessMsg").html('Document uploaded successfully');
     	   } else {
     		   $("#daclScreenErrorMsg").html('Error while saving record: '+data);
     	   }        	           	   
        },
 	    error : function(xhr, status, error) {
			$("#daclScreenErrorMsg").html(error);
		}
    });  
	
    });
	}
  return false;
}

function saveDACLDetails(){
	$("#taskDetailsUpdateSuccessMsg").empty();
	$("#taskDetailsUpdateErrorMsg").empty();

	
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
		$.ajax({
	           	type: "POST",
	           	url: "DACLSave",
	           	data: $("#daclScreenForm").serialize(),
	           	beforeSend: function(xhr) {
	           		enableDisableButtons('#daclScreenForm', 'disable');
	           	   xhr.setRequestHeader(header, token);
	               $("#daclScreenSpinner").show();
	           	},
	           	complete: function(){
	           		$('#DACLScreenModal').modal('hide');
	           		enableDisableButtons('#daclScreenForm', 'enable');
	      	  	},
	      	  	success: function(data)
	      	  	{
	      	  	 if(data.trim()=='SUCCESS'){
	       		   $("#daclScreenSuccessMsg").html('Document uploaded successfully');
	       	   } else {
	       		   $("#daclScreenErrorMsg").html('Error while saving record: '+data);
	       	   }        	           	   
	     
	           },
				error : function(xhr, status, error) {
					$("#taskDetailsUpdateErrorMsg").html(error);
				}
	         });
	
        	
    return false; // avoid to execute the actual submit of the form.
}



//15-Mar-2016 : Chandni Goel - SSR Document - Start

function uploadSSrDocument(projectId, processDefinitionId, taskDefinitionKey, candidateId){
	
	var requestData= {"pageName" : "SSRScreenDesign", "projectId" : projectId, "processDefinitionId" : processDefinitionId, "taskDefinitionKey" : taskDefinitionKey, "candidateId" : candidateId};
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
		
	$.ajax({
        
		url : "SSRscreen",
        type : "POST",
        data : requestData,
        
        beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		
		success : function(response) {
			$('#CommonScreenModal').find('.modal-content').html(response);
			$('#CommonScreenModal').modal({ backdrop: 'static', keyboard: false, show : true });
		},
		
		error : function(xhr, status, error) {
			alert(error);
		}
    });  
  return false;
}

function validateSiteSurveyReport(){
	
	//basic info fields 
	var CAND_NAME = $("#CAND_NAME").val();
	var CAND_ADRS = $("#CAND_ADRS").val();
	var ZIP_CODE1 = $("#ZIP_CODE").val();
	var COMMUNE = $("#COMMUNE").val();
	var CADET_ZONE_TYPE = $("#CADET_ZONE_TYPE").val();
	var LMBRT_CO_X = $("#LMBRT_CO_X").val();
	var LMBRT_CO_Y = $("#LMBRT_CO_Y").val();
	var AVL_HIGHT = $("#AVL_HIGHT").val();
	var ACHV_HIGHT = $("#ACHV_HIGHT").val();
	var LOC_CAND_NAME = $("#LOC_CAND_NAME").val();
	var CMPNY = $("input[name='CMPNY']:checked").val();
	var LOC_CAND_ADRS = $("#LOC_CAND_ADRS").val();
	var LOC_ZIP_CODE = $("#LOC_ZIP_CODE").val();
	var LOC_COMMUNE = $("#LOC_COMMUNE").val();
	var MOBILE = $("#MOBILE").val();
	var FAX = $("#FAX").val();
	var PHONE = $("#PHONE").val();
	var ACC_NO = $("#ACC_NO").val();
	var E_MAIL = $("#E_MAIL").val();
	var LOC_CMMNTS = $("#LOC_CMMNTS").val();
	//LEASE NEGOTIATION fields
	var leaseProb =$("#leaseProb option:selected" ).val();
	var LEASE_CMMNTS = $("#LEASE_CMMNTS").val();
	var ISSUE = $("#ISSUE").val();
	var REASON = $("#REASON").val();
	var LEAS_AMT = $("#LEAS_AMT").val();
	var EUR_LEASE_AMT = $("input[name='EUR_LEASE_AMT']:checked").val();
	var PRINC_AGRMNT = $("input[name='PRINC_AGRMNT']:checked").val();
	var SIGN_DATE = $("#SIGN_DATE").val();
	//Type Of Site fields
	var SITE_DESC = $("#SITE_DESC").val();
	var MOP_mob = $("input[name='MOP_MOB']:checked").val();
	var HV_PYLON = $("input[name='HV_PYLON']:checked").val();
	var MOP_PROXIMUS = $("input[name='MOP_PROXIMUS']:checked").val();
	var LIGHT_POL = $("input[name='LIGHT_POL']:checked").val();
	var MOBSTR_SIT_COD = $("#MOBSTR_SIT_COD").val();
	var PYLON_NO = $("#PYLON_NO").val();
	var PROXIMUS_SIT_COD = $("#PROXIMUS_SIT_COD").val();
	var LIGHT_POL_NO = $("#LIGHT_POL_NO").val();
	//Location Access  fields
	var ACCESS_PERSON = $("#ACCESS_PERSON").val();
	var PH_NO= $("#PH_NO").val();
	var GSM = $("#GSM").val();
	var AccessSecurityCompany = $("#AccessSecurityCompany").val();
	var LOC_ACCESS_NAME = $("#LOC_ACCESS_NAME").val();
	var LOC_ACCESS_PHONE = $("#LOC_ACCESS_PHONE").val();
	var LOC_ACCESS_CONTACT = $("#LOC_ACCESS_CONTACT").val();
	var ACS_PRCDR_APPLCBLE = $("#ACS_PRCDR_APPLCBLE").val();
	var ROAD_ACCESS = $("#ROAD_ACCESS").val();
	var ROAD_ACCESS_ESTIMATION = $("input[name='ROAD_ACCESS_ESTIMATION']:checked").val();
	var access = $("#24TH_access").val();
	var SPC_CNDTN = $("#SPC_CNDTN").val();
	var key_box = $("#key_box").val();
	var LOCATION = $("#LOCATION").val();
	var LOCATION_OTHER = $("#LOCATION_OTHER").val();
	//Location Detail  fields
	var site_info = $("#site_info").val();
	var SPECIFIC_RESTRCTN = $("#SPECIFIC_RESTRCTN").val();
	var draw_avail = $("#draw_avail").val();
	var draw_correct = $("#draw_correct").val();
	var room_avail = $("#room_avail").val();
	var INDOOR_X_CO_ORDINATE = $("#INDOOR_X_CO_ORDINATE").val();
	var INDOOR_Y_CO_ORDINATE = $("#INDOOR_Y_CO_ORDINATE").val();
	var INDOOR_Z_CO_ORDINATE = $("#INDOOR_Z_CO_ORDINATE").val();
	var outdoor_space_avail = $("#outdoor_space_avail").val();
	var OUTDOOR_X_CO_ORDINATE = $("#OUTDOOR_X_CO_ORDINATE").val();
	var OUTDOOR_Y_CO_ORDINATE = $("#OUTDOOR_Y_CO_ORDINATE").val();
	var OUTDOOR_Z_CO_ORDINATE = $("#OUTDOOR_Z_CO_ORDINATE").val();
	var roof_material =$("#roof_material option:selected" ).val();
	var ROOF_MATERIAL_OTHERS = $("#ROOF_MATERIAL_OTHERS").val();
	var roof_cond =$("#roof_cond option:selected" ).val();
	var ROOF_COND_COMMENT = $("#ROOF_COND_COMMENT").val();
	var wall_material =$("#wall_material option:selected" ).val();
	var WALL_MATERIAL_OTHER = $("#WALL_MATERIAL_OTHER").val();
	var wall_cond =$("#wall_cond option:selected" ).val();
	var WALL_COND_COMMENT = $("#WALL_COND_COMMENT").val();
	var power_avail = $("#power_avail").val();
	var voltage_info = $("#voltage_info").val();
	var DIS_ELE_POINT = $("#DIS_ELE_POINT").val();
	var fiber_avail = $("#fiber_avail").val();
	var DIS_FIBER_POINT = $("#DIS_FIBER_POINT").val();
	var other_operator = $("#other_operator").val();
	var operator_plan = $("#operator_plan").val();
	var operator_present = $("#operator_present").val();
	var PLAN_DATE = $("#PLAN_DATE").val();
	var SITE_CODE_PROXIMUS = $("#SITE_CODE_PROXIMUS").val();
	var SITE_CODE_MOBESTAR = $("#SITE_CODE_MOBESTAR").val();
	var SITE_CODE_ASTRID = $("#SITE_CODE_ASTRID").val();
	var SITE_CODE_NMBS_SNCB = $("#SITE_CODE_NMBS_SNCB").val();
	var SITE_CODE_OTHER = $("#SITE_CODE_OTHER").val();
	//Attachements  fields
	var exist_draw = $("#exist_draw").val();
	var docFile1 = $("#docFile1").val();
	var pic_site = $("#pic_site").val();
	var docFile2 = $("#docFile2").val();
	var drawing_other_operator = $("#drawing_other_operator").val();
	var docFile3 = $("#docFile3").val();
	var lease_agreement = $("#lease_agreement").val();
	var docFile4 = $("#docFile4").val();
	var panoramic_pic = $("#panoramic_pic").val();
	var other_pic = $("#other_pic").val();
	var extra_docFile = $("#extra_docFile").val();
	// Validation fields
	var NAME_NEG = $("#NAME_NEG").val();
	var PHONE_NEG = $("#PHONE_NEG").val();
	var SIGNATURE_NEG = $("#SIGNATURE_NEG").val();
	var NAME_RADIO = $("#NAME_RADIO").val();
	var PHONE_RADIO = $("#PHONE_RADIO").val();
	var SIGNATURE_RADIO = $("#SIGNATURE_RADIO").val();
	
	//basic info null validation 
	if(CAND_NAME.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Name in Basic Location Tab");
		$('#CAND_NAME').focus();
		return false;
	}
	if(CAND_ADRS.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Address in Basic Location Tab");
		$('#CAND_ADRS').focus();
		return false;
	}
	if(ZIP_CODE1.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Zip code in Basic Location Tab");
		$('#ZIP_CODE').focus();
		return false;
	}
	if(COMMUNE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Commune in Basic Location Tab");
		$('#COMMUNE').focus();
		return false;
	}
	if(CADET_ZONE_TYPE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Zone type in Basic Location Tab");
		$('#CADET_ZONE_TYPE').focus();
		return false;
	}
	if(LMBRT_CO_X.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter X co-ordinate in Basic Location Tab");
		$('#LMBRT_CO_X').focus();
		return false;
	}
	if(LMBRT_CO_Y.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Y co-ordinate in Basic Location Tab");
		$('#LMBRT_CO_Y').focus();
		return false;
	}
	if(AVL_HIGHT.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Available height in Basic Location Tab");
		$('#AVL_HIGHT').focus();
		return false;
	}
	if(ACHV_HIGHT.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Achievable height in Basic Location Tab");
		$('#ACHV_HIGHT').focus();
		return false;
	}
	if(LOC_CAND_NAME.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Name in Basic Location Tab");
		$('#LOC_CAND_NAME').focus();
		return false;
	}
	if(!CMPNY){
		$('#ssrScreenErrorMsg').html("Please select Company in Basic Location Tab");
		$('#CMPNY').focus();
		return false;
	}
	if(LOC_CAND_ADRS.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Address in Basic Location Tab");
		$('#LOC_CAND_ADRS').focus();
		return false;
	}
	if(LOC_ZIP_CODE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Zip code in Basic Location Tab");
		$('#LOC_ZIP_CODE').focus();
		return false;
	}
	if(LOC_COMMUNE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Commune in Basic Location Tab");
		$('#LOC_COMMUNE').focus();
		return false;
	}
	if(MOBILE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Mobile in Basic Location Tab");
		$('#MOBILE').focus();
		return false;
	}
	if(FAX.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Fax in Basic Location Tab");
		$('#FAX').focus();
		return false;
	}
	if(PHONE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Phone in Basic Location Tab");
		$('#PHONE').focus();
		return false;
	}
	if(ACC_NO.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Account no in Basic Location Tab");
		$('#ACC_NO').focus();
		return false;
	}
	if(E_MAIL.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Email in Basic Location Tab");
		$('#E_MAIL').focus();
		return false;
	}
	if(LOC_CMMNTS.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Comment in Basic Location Tab");
		$('#LOC_CMMNTS').focus();
		return false;
	}
	
	//LEASE NEGOTIATION null validation
	if(leaseProb.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Lease probability in Lease Negotiation Tab");
		$('#leaseProb').focus();
		return false;
	}
	if(leaseProb=="Positive")
	{    
		if(LEASE_CMMNTS.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please enter Comment in Lease Negotiation Tab');
		$('#LEASE_CMMNTS').focus();
		return false;
		}
		
	}
	if(leaseProb=="Negative")
	{    
		if(REASON.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please enter Reason in Lease Negotiation Tab');
		$('#REASON').focus();
		return false;
		}
	}
	
	if(leaseProb=="Not clear")
	{   
		if(nullValidator(ISSUE)){
		$("#ssrScreenErrorMsg").html('Please enter Issue in Lease Negotiation Tab');
		$('#ISSUE').focus();
		return false;
	       }
	}
	if(LEAS_AMT.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Lease amount in Lease Negotiation Tab");
		$('#LEAS_AMT').focus();
		return false;
	}
	if(!EUR_LEASE_AMT){
		$('#ssrScreenErrorMsg').html("Please select per month/per year option in Lease Negotiation Tab");
		$('#EUR_LEASE_AMT').focus();
		return false;
	}
	if(!PRINC_AGRMNT){
		$('#ssrScreenErrorMsg').html("Please select Principle agreement in Lease Negotiation Tab");
		$('#PRINC_AGRMNT').focus();
		return false;
	}
	if(SIGN_DATE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Signature date in Lease Negotiation Tab");
		$('#SIGN_DATE').focus();
		return false;
	}
	if(!numberValidator(AVL_HIGHT))
	{
		$("#ssrScreenErrorMsg").html('Please enter Numeric value for Available Height in Basic Location Tab');
		$('#AVL_HIGHT').focus();

		return false;
	}
	if(!numberValidator(ACHV_HIGHT))
	{
		$("#ssrScreenErrorMsg").html('Please enter Numeric value for Achievable Height in Basic Location Tab');
		$('#ACHV_HIGHT').focus();
		return false;
	}
	if(!numberValidator(LOC_ZIP_CODE))
	{
		$("#ssrScreenErrorMsg").html('Please enter Numeric value for zip code in Basic Location Tab');
		$('#LOC_ZIP_CODE').focus();
		return false;
	}
	if(MOBILE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter 10 digit Mobile Number in Basic Location Tab");
		$('#MOBILE').focus();
		return false;
	}
	if(!numberValidator(MOBILE) || MOBILE.length != 10){
		$('#ssrScreenErrorMsg').html("Please enter 10 digit valid Mobile Number in Basic Location Tab");
		$('#MOBILE').focus();
		return false;
	}
	else if(!emailValidation(E_MAIL))
	{
		$("#ssrScreenErrorMsg").html('Please enter valid email address in Basic Location Tab');
		$('#E_MAIL').focus();
	
		return false;
	}
     if(!numberValidator(PHONE) || PHONE.length != 10){
		$('#ssrScreenErrorMsg').html("Please enter 10 digit valid Phone Number in Basic Location Tab");
		$('#PHONE').focus();
		return false;
	}
	//Type Of Site null validation
	if(SITE_DESC.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Description of site in Type of Site Tab");
		$('#SITE_DESC').focus();
		return false;
	}
	if(MOP_mob.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select MOP mobestar in Type of Site Tab");
		$('#MOP_mob').focus();
		return false;
	}
	if(MOP_mob=="YES")
	{   
		if(MOBSTR_SIT_COD.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please enter Mobestar/Orange site code in Type of Site Tab');
		$('#MOBSTR_SIT_COD').focus();
		return false;
	       }
	}
	if(HV_PYLON.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select HV pylon in Type of Site Tab");
		$('#HV_PYLON').focus();
		return false;
	}
	if(HV_PYLON=="YES")
	{   
		if(PYLON_NO.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please enter Pylon no in Type of Site Tab');
		$('#PYLON_NO').focus();
		return false;
	       }
	}
	if(MOP_PROXIMUS.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select MOP proximous in Type of Site Tab");
		$('#MOP_PROXIMUS').focus();
		return false;
	}
	if(MOP_PROXIMUS=="YES")
	{   
		if(PROXIMUS_SIT_COD.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please enter Proximus code in Type of Site Tab');
		$('#PROXIMUS_SIT_COD').focus();
		return false;
	       }
	}
	if(LIGHT_POL.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select light pole in Type of Site Tab");
		$('#LIGHT_POL').focus();
		return false;
	}
	if(LIGHT_POL=="YES")
	{   
		if(LIGHT_POL_NO.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please enter Pole no. in Type of Site Tab');
		$('#LIGHT_POL_NO').focus();
		return false;
	       }
	}
	//Location Access null validation
	if(ACCESS_PERSON.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Access person in Location Access Tab");
		$('#ACCESS_PERSON').focus();
		return false;
	}
	
	if(PH_NO.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Phone in Location Access Tab");
		$('#PH_NO').focus();
		return false;
	}
	if(GSM.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter GSM in Location Access Tab");
		$('#GSM').focus();
		return false;
	}
	if(AccessSecurityCompany.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Access through security company in Location Access Tab");
		$('#AccessSecurityCompany').focus();
		return false;
	}
   if(AccessSecurityCompany == "YES"){
		
		if(LOC_ACCESS_NAME.trim() == ''){
			$('#ssrScreenErrorMsg').html("Please enter Name in Location Access Tab");
			$('#LOC_ACCESS_NAME').focus();
			return false;
		}
		if(!numberValidator(LOC_ACCESS_CONTACT) || LOC_ACCESS_CONTACT.length != 10){
			$('#ssrScreenErrorMsg').html("Please enter 10 digit valid Phone Number in Location Access Tab");
			$('#LOC_ACCESS_CONTACT').focus();
			return false;
		}
		if(!numberValidator(LOC_ACCESS_PHONE) || LOC_ACCESS_PHONE.trim() == ''){
			$('#ssrScreenErrorMsg').html("Please enter valid Phone number in Location Access Tab");
			$('#LOC_ACCESS_PHONE').focus();
			return false;
		}
			}
	if(ACS_PRCDR_APPLCBLE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Access procedure in Location Access Tab");
		$('#ACS_PRCDR_APPLCBLE').focus();
		return false;
	}
	
	if(ROAD_ACCESS.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Road access in Location Access Tab");
		$('#ROAD_ACCESS').focus();
		return false;
	}
	
	if(!ROAD_ACCESS_ESTIMATION){
		$('#ssrScreenErrorMsg').html("Please select one option for Road access estimation in Location Access Tab ");
		$('#ROAD_ACCESS_ESTIMATION').focus();
		return false;
	}
	if(access.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter 24th access in Location Access Tab");
		$('#24TH_access').focus();
		return false;
	}
	if(SPC_CNDTN.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Specific condition in Location Access Tab");
		$('#SPC_CNDTN').focus();
		return false;
	}
	if(key_box.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Key box in Location Access Tab");
		$('#key_box').focus();
		return false;
	}
	if(LOCATION.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Location in Location Access Tab");
		$('#LOCATION').focus();
		return false;
	}
	if(LOCATION_OTHER.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Other in Location Access Tab");
		$('#LOCATION_OTHER').focus();
		return false;
	}
	 if( !numberValidator(PH_NO) || PH_NO.length != 10){
	 	$('#ssrScreenErrorMsg').html("Please enter 10 digit valid Phone Number in Location Access Tab");
	 	$('#PH_NO').focus();
	 	return false;
	 	}
	//Location Detail null validation
	if(site_info.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Is the Site a protected monument in Location Details Tab");
		$('#site_info').focus();
		return false;
	}
	if(SPECIFIC_RESTRCTN.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Specific restrictions in Location Details Tab");
		$('#SPECIFIC_RESTRCTN').focus();
		return false;
	}
	if(draw_avail.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Drawing of the existing situation or the building available in Location Details Tab");
		$('#draw_avail').focus();
		return false;
	}
	if(draw_correct.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Drawing Correct in Location Details Tab");
		$('#draw_correct').focus();
		return false;
	}
	if(room_avail.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Space for indoor room available in Location Details Tab");
		$('#room_avail').focus();
		return false;
	}
	if(INDOOR_X_CO_ORDINATE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter  Maximum space available x co-ordinate in Location Details Tab");
		$('#INDOOR_X_CO_ORDINATE').focus();
		return false;
	}
	if(INDOOR_Y_CO_ORDINATE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Maximum space available y co-ordinate in Location Details Tab");
		$('#INDOOR_Y_CO_ORDINATE').focus();
		return false;
	}
	if(INDOOR_Z_CO_ORDINATE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Maximum space available z co-ordinate in Location Details Tab");
		$('#INDOOR_Z_CO_ORDINATE').focus();
		return false;
	}
	if(outdoor_space_avail.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Outdoor space available for outdoor RBS cabinets in Location Details Tab");
		$('#outdoor_space_avail').focus();
		return false;
	}
	if(OUTDOOR_X_CO_ORDINATE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Outdoor Maximum space available x co-ordinate in Location Details Tab");
		$('#OUTDOOR_X_CO_ORDINATE').focus();
		return false;
	}
	if(OUTDOOR_Y_CO_ORDINATE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enterOutdoor  Maximum space available y co-ordinate in Location Details Tab");
		$('#OUTDOOR_Y_CO_ORDINATE').focus();
		return false;
	}
	if(OUTDOOR_Z_CO_ORDINATE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Outdoor Maximum space available z co-ordinate in Location Details Tab");
		$('#OUTDOOR_Z_CO_ORDINATE').focus();
		return false;
	}
	if(roof_material.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Roof material in Location Details Tab");
		$('#roof_material').focus();
		return false;
	}
	if(roof_material=="OTHER")
	{   
		if(ROOF_MATERIAL_OTHERS.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please enter Information of other in Location Details Tab');
		$('#ROOF_MATERIAL_OTHERS').focus();
		return false;
	       }
	}
	if(roof_cond.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Roof condition in Location Details Tab");
		$('#roof_cond').focus();
		return false;
	}
	if(roof_cond=="NA")
	{   
		if(ROOF_COND_COMMENT.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please enter Comment in Location Details Tab');
		$('#ROOF_COND_COMMENT').focus();
		return false;
	       }
	}
	if(wall_material.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Wall material in Location Details Tab");
		$('#wall_material').focus();
		return false;
	}
	if(wall_material=="Other")
	{   
		if(WALL_MATERIAL_OTHER.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please enter Information of other in Location Details Tab');
		$('#WALL_MATERIAL_OTHER').focus();
		return false;
	       }
	}
	if(wall_cond.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Wall condition in Location Details Tab");
		$('#wall_cond').focus();
		return false;
	}
	if(wall_cond=="NA")
	{   
		if(WALL_COND_COMMENT.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please enter Comment in Location Details Tab');
		$('#WALL_COND_COMMENT').focus();
		return false;
	       }
	}
	if(power_avail.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Power Available in Location Details Tab");
		$('#power_avail').focus();
		return false;
	}
	if(power_avail=="YES")
	{   
		if(voltage_info.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please enter voltage info in Location Details Tab');
		$('#voltage_info').focus();
		return false;
	       }
	}
	if(DIS_ELE_POINT.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Distance to electrical power point of presence:Estimated meters of cable to be installed in Location Details Tab");
		$('#DIS_ELE_POINT').focus();
		return false;
	}
	if(fiber_avail.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Fiber Optic Available in Location Details Tab");
		$('#fiber_avail').focus();
		return false;
	}
	if(DIS_FIBER_POINT.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Distance to Fibre Optic point of presence:Estimated meters of cable to be installed in Location Details Tab");
		$('#DIS_FIBER_POINT').focus();
		return false;
	}
	if(other_operator.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Other Operator already present in Location Details Tab");
		$('#other_operator').focus();
		return false;
	}
	if(operator_plan.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Other Operator planned in Location Details Tab");
		$('#operator_plan').focus();
		return false;
	}
	if(operator_plan=="YES")
	{   
		if(operator_present.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please select option according to other operator planned in Location Details Tab');
		$('#operator_present').focus();
		return false;
	       }
	}
	if(PLAN_DATE.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Planned date arrival other operator Date in Location Details Tab");
		$('#PLAN_DATE').focus();
		return false;
	}
	if(SITE_CODE_PROXIMUS.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter site code Proximus in Location Details Tab");
		$('#SITE_CODE_PROXIMUS').focus();
		return false;
	}
	if(SITE_CODE_MOBESTAR.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter site code MOBESTAR in Location Details Tab");
		$('#SITE_CODE_MOBESTAR').focus();
		return false;
	}
	if(SITE_CODE_ASTRID.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter site code ASTRID in Location Details Tab");
		$('#SITE_CODE_ASTRID').focus();
		return false;
	}
	if(SITE_CODE_NMBS_SNCB.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter site code NMBS/SNCB in Location Details Tab");
		$('#SITE_CODE_NMBS_SNCB').focus();
		return false;
	}
	if(SITE_CODE_OTHER.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter site code Other in Location Details Tab");
		$('#SITE_CODE_OTHER').focus();
		return false;
	}
	//Attachements null validation
	if(exist_draw=="YES")
	{    
		if(docFile1.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please select Existing Drawings in Attachments Tab');
		$('#docFile1').focus();
		return false;
		}
	}
	if(pic_site=="YES")
	{    
		if(docFile2.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please select Overview Picture Existing site in Attachments Tab');
		$('#docFile2').focus();
		return false;
		}
	}
	if(drawing_other_operator=="YES")
	{    
		if(docFile3.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please select As-built drawings other operators in Attachments Tab');
		$('#docFile3').focus();
		return false;
		}
	}
	if(lease_agreement=="YES")
	{    
		if(docFile4.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please select Principle lease agreement in Attachments Tab');
		$('#docFile4').focus();
		return false;
		}
	}
	if(panoramic_pic.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please select Panoramic pictures in Attachments Tab");
		$('#panoramic_pic').focus();
		return false;
	}
	if(panoramic_pic == "YES"){
 		var flag=0;
 		for(var i=0;i<=11;i++){
 			var panoramic_pictures=$("#panoramic_pictures"+i).val();
 			if(panoramic_pictures != ''){
 				flag = 1;
 				break;
 			}
 		}
 		if(flag==0){
 			$('#ssrScreenErrorMsg').html("Please upload document for at least one Panoramic picture");
 			return false;
 		}
 	}
	if(other_pic=="YES")
	{    
		if(extra_docFile.trim() == ''){
		$("#ssrScreenErrorMsg").html('Please select Other pictures in Attachments Tab');
		$('#extra_docFile').focus();
		return false;
		}
	}
	// Validation null validation
	if(NAME_NEG.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Negotiator name in Validation Tab");
		$('#NAME_NEG').focus();
		return false;
	}
	if(PHONE_NEG.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Negotiator phone in Validation Tab");
		$('#PHONE_NEG').focus();
		return false;
	}
	if(SIGNATURE_NEG.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Negotiator signature in Validation Tab");
		$('#SIGNATURE_NEG').focus();
		return false;
	}
	if(NAME_RADIO.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Radio Planner name in Validation Tab");
		$('#NAME_RADIO').focus();
		return false;
	}
	if(PHONE_RADIO.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Radio Planner phone in Validation Tab");
		$('#PHONE_RADIO').focus();
		return false;
	}
	if(SIGNATURE_RADIO.trim() == ''){
		$('#ssrScreenErrorMsg').html("Please enter Radio Planner signature in Validation Tab");
		$('#SIGNATURE_RADIO').focus();
		return false;
	}
	if( !numberValidator(PHONE_NEG) || PHONE_NEG.length != 10){
 		$('#ssrScreenErrorMsg').html("Please enter 10 digit valid Phone Number");
 		$('#PHONE_NEG').focus();
 		return false;
 	}
	if( !numberValidator(PHONE_RADIO) || PHONE_RADIO.length != 10){
 		$('#ssrScreenErrorMsg').html("Please enter 10 digit valid Phone Number");
 		$('#PHONE_RADIO').focus();
 		return false;
 	}
	return true;
}
function submitSiteSurveyReport(){
	
	$("#ssrScreenSuccessMsg").empty();
	$("#ssrScreenErrorMsg").empty();
	var extn = "";
	var filename = "";
	var breakout = true;
	for(var i=1; i<=4; i++){
		filename = $('#docFile'+i).val();
		if(filename != ""){
			extnsn = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
			if((extnsn != "gif") && (extnsn != "jpg") && (extnsn != "jpeg") && (extnsn != "png") && (extnsn != "tiff") && (extnsn != "tif") ){
				 breakout = false;
				 break;
			}
		}
	}
	for(var i=0; i<=11; i++){
		filename = $('#panoramic_pictures'+i).val();
		if(filename != ""){
			extnsn = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
			if((extnsn != "gif") && (extnsn != "jpg") && (extnsn != "jpeg") && (extnsn != "png") && (extnsn != "tiff") && (extnsn != "tif") ){
				 breakout = false;
				 break;
			}
		}
	}
	
	if(($("#other_pic").val() == "YES") && $('#extra_docFile').val() != ""){
	$('input[name="extra_docFile"]').each(function() {
		extnsn = $(this).val().substring($(this).val().lastIndexOf(".") + 1).toLowerCase();
		if((extnsn != "gif") && (extnsn != "jpg") && (extnsn != "jpeg") && (extnsn != "png") && (extnsn != "tiff") && (extnsn != "tif") ){
			 breakout = false;
		}
	});
	}
	if(breakout){

		var projectId = $("#projectId").val();
		 var uploadDocFormData = new FormData($('#taskDetailsForm2')[0]);
		var options = {
		         message: "Are you sure want to submit ?",
		         title: 'Confirm Submit',
		         size: 'sm',          
		     };
	
		var token = $("meta[name='_csrf']").attr("content");
	    var header = $("meta[name='_csrf_header']").attr("content");
		if(validateSiteSurveyReport()){
			$("#basicInfoErrorMsg").hide();
			$("#leaseNegotiationErrorMsg").hide();
			$("#typeSiteErrorMsg").hide();
			$("#locationAccessErrorMsg").hide();
			$("#locationDetailErrorMsg").hide();
			$("#attachmentErrorMsg").hide();
			$("#validationErrorMsg").hide();
			
	    eModal.confirm(options).then(function(){
		$.ajax({
	        
			url : "SSRsubmit",
	        type : "POST",
	        data : uploadDocFormData,
	        dataType: 'text',
	        processData: false,
	        contentType: false,
	        cache : false,
	        
	        beforeSend : function(xhr) {
	        	$('#ssrScreenErrorMsg').hide();
	        	enableDisableButtons('#taskDetailsForm2','disable');
				xhr.setRequestHeader(header, token);
				$("#ssrScreenSpinner").show();
			},
			complete: function(){
				$("#ssrScreenSpinner").hide();
				$('#CommonScreenModal').modal('hide');
				loadDocumentList(projectId);
				enableDisableButtons('#taskDetailsForm2','enable');
			},
			error : function(xhr, status, error) {
				$("#ssrScreenErrorMsg").html(error);
			}
	    });  
		
	    });
	    
		}
	}
	else{
		$('#ssrScreenErrorMsg').html("Incorrect file format in attachment tab. Please upload file with format(s) JPG/JPEG, PNG, GIF, BMP or TIFF/TIF.");
		}
  return false;
}


function saveSSRDetails(){
	$("#ssrScreenSuccessMsg").empty();
	$("#ssrScreenErrorMsg").empty();
	
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    var uploadDocFormData = new FormData($('#taskDetailsForm2')[0]);
		$.ajax({
	           	type: "POST",
	           	url: "SSRSave",
	           	data: uploadDocFormData,
	           	dataType: 'text',
	            processData: false,
	            contentType: false,
	            cache : false,
	           	
	           	beforeSend: function(xhr) {
	            	enableDisableButtons('#taskDetailsForm2','disable');
	           	   xhr.setRequestHeader(header, token);
	               $("#ssrScreenSpinner").show();
	           	},
	           	complete: function(){
	           		$("#ssrScreenSpinner").hide();
	           		$('#CommonScreenModal').modal('hide');
	           		enableDisableButtons('#taskDetailsForm2','enable');
	      	  	},
	      	  	success: function(data)
	      	  	{
	        	   if(data.trim()=='SUCCESS') {
	        		   	$('#CommonScreenModal').find('.modal-content').html('');
	        		   	$('#CommonScreenModal').hide();   	
	       		   }
	        	   else{
	        		   $("#ssrScreenErrorMsg").html('Error while saving record');
	        		   
	        	   }
	           },
				error : function(xhr, status, error) {
					$("#ssrScreenErrorMsg").html(error);
				}
	         });
	
        	
    return false; // avoid to execute the actual submit of the form.
}

function clearPanoraminErrMsg(){
	$('#ssrScreenErrorMsg').empty();
}

function enableLeaseProbInfo(){
	var lease_value= $("#leaseProb option:selected" ).val();
	if(lease_value == "")
	{
		$("#lease_comment").hide();
		$("#lease_reason").hide();
		$("#lease_issue").hide();
		$('#LEASE_CMMNTS').val("");
		$('#ISSUE').val("");
		$('#REASON').val("");
	}
	else if(lease_value == "Positive")
	{
		$("#lease_comment").show();
		$("#lease_reason").hide();
		$("#lease_issue").hide();
		$('#ISSUE').val("");
		$('#REASON').val("");
	}
	else if(lease_value == "Negative")
	{
		$("#lease_reason").show();
		$("#lease_comment").hide();
		$("#lease_issue").hide();
		$('#LEASE_CMMNTS').val("");
		$('#ISSUE').val("");
	}
	else
	{
	    $("#lease_issue").show();
	    $("#lease_reason").hide();
		$("#lease_comment").hide();
		$('#REASON').val("");
		$('#LEASE_CMMNTS').val("");

	}
	return false;
}

function enableMobInfoField(){
	var radioButton = $('input[name="MOP_MOB"]:checked').val(); 
		
		if(radioButton == 'YES') {
			
			
			$("#mobister_detail").show();
		} else {
			
			
			$("#mobister_detail").hide();
		}

		return false;
	}

	function enablePylonInfoField(){
	var radioButton = $('input[name="HV_PYLON"]:checked').val(); 
		
		if(radioButton == 'YES') {
			
			
			$("#pylon_detail").show();
		} else {
			
			
			$("#pylon_detail").hide();
		}

		return false;
	}

	function enableProxInfoField(){
	var radioButton = $('input[name="MOP_PROXIMUS"]:checked').val(); 
		
		if(radioButton == 'YES') {
			
			
			$("#proximus_detail").show();
		} else {
			
			
			$("#proximus_detail").hide();
		}

		return false;
	}

	function enableLightInfoField(){
	var radioButton = $('input[name="LIGHT_POL"]:checked').val(); 
		
		if(radioButton == 'YES') {
			
			
			$("#light_detail").show();
		} else {
			
			
			$("#light_detail").hide();
		}

		return false;
	}
	
	function enableAccessSecurity(){
		var access_security =$("#AccessSecurityCompany option:selected" ).val();
		
		if(access_security == "YES") {
			
			
			$("#access_info").show();
		} 
		else{
			
			
			$("#access_info").hide();
		}

		return false;
	}
	
	function enableOperatorplanned(){
		var operator_planned = $("#operator_plan option:selected" ).val();
		
		if(operator_planned == "YES") {
			
			
			$("#Oprtr_Plnd_info").show();
		} else {
			
			
			$("#Oprtr_Plnd_info").hide();
		}

		return false;
	}

	

//15-Mar-2016 : Chandni Goel - SSR Document - End

function loadChangePasswordModal(){
	var requestData={ "pageName" : "changePassword"};
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	$.ajax({
		url : "loadChangePassword",
		type : "POST",
		data : requestData,

		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		complete: function(){
		},
		success: function(response) {
			$('#changePasswordModal').find('.modal-content').html(response);
			$('#changePasswordModal').modal('show');
		},

		error : function(xhr, status, error) {
			alert(error);
		}
	});
	return false;
}

//for multiple attachement in dacl
function addNewDoc(){
	var newRow = '<tr class="odd gradeX">' +		             
	             '<td><input class="form-control" type="file" id="extra_docFile" name="extra_docFile" data-placeholder="No file" required></td>' +
	             '<td align="center" valign="center">' +
	             '<button type="button" id="deleteDocBtn" name="deleteDocBtn" title="Remove Document Placeholder" class="btn btn-danger btn-xs removeDocClass"><i class="fa fa-remove"></i></button>' +
	             '</td>' +
	             '</tr>';
		$('#documentsAddTableBody').append(newRow);
		$(".removeDocClass").bind("click", deleteNewDocument);
		docCount++; 
}

//for multiple attachement in dssr
function addNewDocSsr(){
	var newRow = null;
	for(var i = 1; i<= 11; i++){
		newRow = '<tr class="odd gradeX">' +
				 '<td width="10%" align="center">'+ 30*i + '<sup>o</sup></td>' +
		         '<td><input class="form-control" type="file" id="panoramic_pictures" name="panoramic_pictures" data-placeholder="No file"></td>' +
		         '<td align="center" valign="center">' +
		         '<button type="button" id="deleteDocBtn" name="deleteDocBtn" title="Remove Document Placeholder" class="btn btn-danger btn-xs removeDocClass"><i class="fa fa-remove"></i></button>' +
		         '</td>' +
		         '</tr>';
		$('#documentsAddTableBodySSr').append(newRow);
		$(".removeDocClass").bind("click", deleteNewDocument);
		docCount++; 
	}
}

//15-Mar-2016 : Chandni Goel - SSR Document - End


function uploadDaclCandImage(index){
	$("#daclScreenErrorMsg").empty();
	var filename = $('#docFile'+index).val();
	var extnsn = filename.substring(filename.lastIndexOf(".") + 1);
	if((extnsn.toLowerCase() == "gif") || (extnsn.toLowerCase() == "jpg") || (extnsn.toLowerCase() == "jpeg") || (extnsn.toLowerCase() == "png") || (extnsn.toLowerCase() == "tiff") || (extnsn.toLowerCase() == "tif") ){
		var token = $("meta[name='_csrf']").attr("content");
	    var header = $("meta[name='_csrf_header']").attr("content");
	  //  alert(index);
	    var uploadDocFormData = new FormData($('#daclScreenForm')[0]);
	    uploadDocFormData.append("index",index);
			$.ajax({
		           	type: "POST",
		           	url: "uploadCandImage",
		           	data: uploadDocFormData,
		           	dataType: 'text',
		            processData: false,
		            contentType: false,
		            cache : false,
		           	beforeSend: function(xhr) {
		           		$("#daclScreenErrorMsg"+index).hide();
		           		enableDisableButtons('#daclScreenForm', 'disable');
		           	   xhr.setRequestHeader(header, token);
		           		$("#daclUploadScreenSpinner"+index).show();
		           	},
		           	complete: function(){
		           		enableDisableButtons('#daclScreenForm', 'enable');
		           		$("#daclUploadScreenSpinner"+index).hide();
		      	  	},
		      	  	success: function(data)
		      	  	{if(data.trim()=='SUCCESS'){
		        		   $("#daclScreenSuccessMsg"+index).html('Document uploaded successfully');
		        		
		        		   
		        	   }
		        	   else{
		        		   $("#daclScreenErrorMsg"+index).html('Error while saving record: '+data);
		        	   }  
		        	   
		           },
					error : function(xhr, status, error) {
						$("#daclScreenErrorMsg"+index).html(error);
					}
		         });
		return false;
	}
	
	else{
		if(filename.trim() == ''){
			$('#daclScreenErrorMsg'+index).html("Please upload file with format(s) JPG/JPEG, PNG, GIF, BMP or TIFF/TIF.");
		}else
		{
			$('#daclScreenErrorMsg'+index).html("Incorrect file format. Please upload file with format(s) JPG/JPEG, PNG, GIF, BMP or TIFF/TIF.");
		}
		return false;
		}
}

function clearDaclCandImageMsg(index){
	$("#daclScreenSuccessMsg"+index).empty();
	$("#daclScreenErrorMsg"+index).empty();
}

function uploadMultiDaclMiscImage(){
	$("#successDACLMsg").empty();
	$("#errorDACLMsg").empty();
	var projectId = $("#projectId").val();
	var docTitle =  $("#docTitle").val();
	var extra_docFile = $("#extra_docFile").val();
	var breakout = true;
	var extnsn = "";
	
	$('input[name="extra_docFile"]').each(function() {
		extnsn = $(this).val().substring($(this).val().lastIndexOf(".") + 1).toLowerCase();
		if((extnsn != "gif") && (extnsn != "jpg") && (extnsn != "jpeg") && (extnsn != "png") && (extnsn != "tiff") && (extnsn != "tif") ){
			 breakout = false;
			
		}
		
	});
	if(breakout){
	//alert("inside uploadMultiDaclMiscImage" + projectId + "  " + docTitle + extra_docFile);
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    var uploadDocFormData = new FormData($('#daclMiscImageForm')[0]); 
    /*uploadDocFormData.append("projectId",projectId);
    uploadDocFormData.append("docTitle",docTitle);
    uploadDocFormData.append("extra_docFile",extra_docFile);*/
		$.ajax({
	           	type: "POST",
	           	url: "uploadMultiDaclMiscImage",
	           	data: uploadDocFormData,
	           	dataType: 'text',
	            processData: false,
	            contentType: false,
	            cache : false,
	           	beforeSend: function(xhr) {
	           		$("#errorDACLMsg").hide();
	           		enableDisableButtons('#daclMiscImageForm', 'disable');
	           	   xhr.setRequestHeader(header, token);
	             	$("#responseSpinner").show();
	           	},
	           	complete: function(){
	           		enableDisableButtons('#daclMiscImageForm', 'enable');
	           		$("#responseSpinner").hide();
	      	  	},
	      	  	success: function(data)
	      	  	{
	      	  	if(data.trim()=='SUCCESS'){
	        		   $("#successDACLMsg").html('Document uploaded successfully');
	        	   }
	        	   else{
	        		   $("#errorDACLMsg").html('Error while saving record: '+data);
	        	   }  
	           },
				error : function(xhr, status, error) {
					$("#errorDACLMsg").html(error);	
				}
	         });
	}
	else{
		if(extra_docFile.trim() == ''){
			$('#errorDACLMsg').html("Please upload file with format(s) JPG/JPEG, PNG, GIF, BMP or TIFF/TIF.");
		}else
		{
			$('#errorDACLMsg').html("Incorrect file format. Please upload file with format(s) JPG/JPEG, PNG, GIF, BMP or TIFF/TIF.");
		}
	}
	return false;
	
}

function cancelUserButton() {
	$("#userSearchResult").hide();
	$("#searchButton").prop("disabled",false);
	$('#users').find('option:first').attr('selected', 'selected');
	$('#users').selectpicker('deselectAll');
}

//validation on upload file
function isValidFileSize(docFileId){
	 var fsize = docFileId.files[0].size; //get file size
     if(fsize> 31457280) {
    	 $("#maxFileErrorMsg").html("The file size is greater than 30 MB. You can upload max 30 MB file size.");
    	 docFileId.value='';
         return false;
     }
    return true;
}

function clearUpload(){
	$("#displayUploadFileResult").empty();
}

function clearMaxFileErrorMsg(){
	$("#maxFileErrorMsg").html("");
}

//validation on SendLS_OLo
function submitReviewLSNeg() {
	var RES_REJ = $("#RSN_REJN_HS").val();
	var LS_appr = $("input[name='LS_APPR_HS']:checked").val();
	if(LS_appr == 'NO' && RES_REJ.trim() == ''){
		$("#taskDetailsUpdateErrorMsg").html("Please enter Reason for rejection");
		$('#RSN_REJN_HS').focus();
		return false;
	}
	submitTaskDetails();
	return false;		
}
function changeLSNegApproved(){
	var LS_appr = $("input[name='LS_APPR_NEG']:checked").val();
	if(LS_appr == 'NO'){
		$("#reasonForRejection").show();
	}
	else{
		$("#reasonForRejection").hide();
		$('#RSN_REJN_NEG').val("");
	}
}

function changeLSHSApproved(){
    var LS_appr = $("input[name='LS_APPR_HS']:checked").val();
    if(LS_appr == 'NO'){
                    $("#reasonForRejection").show();
    }
    else{
                    $("#reasonForRejection").hide();
                    $('#RSN_REJN_HS').val('');
    }
}

function enableLease(){
    var radioButton = $('input[name="REF_PRC_EXCD"]:checked').val();
    $("#LDS_ADND_LS_SGN_OWNR").prop('checked', false);
    $("#LDS_LMS_ADND_LS_SGN_OWNR").prop('checked', false);
    
    if(radioButton == 'NO') { 
                  $("#LDS_ADND_LS_SGN_OWNR_DIV").show();
                  $("#LDS_LMS_ADND_LS_SGN_OWNR_DIV").hide();
           
           } else {
                  
                  $("#LDS_LMS_ADND_LS_SGN_OWNR_DIV").show();
                  $("#LDS_ADND_LS_SGN_OWNR_DIV").hide();
           
           }

           return false;
    }

function enableDVTNRPT(){
	var radioButton1 = $('input[name="TX_RF_SPCS_RESP"]:checked').val();
	var radioButton2= $('input[name="DEV_REP_RF_TX_APPR"]:checked').val();
	
	$("#validateTRErrorMsg").html("");
	
	if(radioButton1 == 'NO') {
        $("#DEV_REP_SBMTD_APRVL").show();
        
        if(radioButton2 == 'YES'){
        	$('#docfileDivRAF').show();
        	
        }
        else{
        	$('#docfileDivRAF').hide();
        }
       } 
	else {
		$("#DEV_REP_SBMTD_APRVL").hide();
        $("#r1_yes").prop('checked', false);
        $("#r1_no").prop('checked', false);
        $('#DEV_REP_RF_TX_APPR').prop('selected', false);
        $('#docfileDivRAF').hide();
        
	}
	
	return false;
}

function enableRJTN_RSN(){
	
	var radioButton1 = $('input[name="LS_APPR_RPT"]:checked').val(); 
	
	if(radioButton1 == 'NO') {
		
		$("#RJTN_RSN").show();
		
	}
	else{
	
		$("#RJTN_RSN").hide();	
		$("#RSN_REJN_RPT").val('');
		
	}
}


function enableDocsSent(){
	
	var radioButton1 = $('input[name="BP_REQD"]:checked').val(); 
	$("#DOCS_SENT_ARCH").prop('checked', false);
	
	if(radioButton1 == 'YES') {
		$("#DOCS_SENT").show();
	} else {
		$("#DOCS_SENT").hide();
	}
}


function approvedOLO(){
    
    var radioButton1 = $('input[name="LS_APPR_OLO"]:checked').val(); 
    var typeOfWork = $('#typeOfWork').val();
    
    if(radioButton1 == 'YES') {
    	$('#docfileAttachDiv').show();
    	$("#RSN_REJN_OLO_div").hide();
    	$("#RSN_REJN_OLO").val('');
    	if(typeOfWork == "NB"){
    		$('#docfileDivSLSE').hide();
    	}
    	else if(typeOfWork == "UPG"){
    		$('#docfileDivLSE').hide();
    	}
    }
    else{
    	 $("#RSN_REJN_OLO_div").show();
         $('#docfileAttachDiv').hide();
    }
    
}

function changeLSBPApproved(){
    var LS_appr = $("input[name='LS_APPR_BPC']:checked").val();
    if(LS_appr == 'NO'){
                    $("#reasonForRejection").show();
    }
    else{
                    $("#reasonForRejection").hide();
                    $('#RSN_REJN_BPC').val('');
    }
}
function changeLSSEApproved(){
    var LS_appr = $("input[name='LS_APPR_SE']:checked").val();
    if(LS_appr == 'NO'){
                    $("#reasonForRejection").show();
    }
    else{
                    $("#reasonForRejection").hide();
                    $('#RSN_REJN_SE').val('');
    }
}

function changeLSfrmApproved(){
    var LS_appr = $("input[name='LS_APPR_FRM']:checked").val();
    if(LS_appr == 'NO'){
                    $("#reasonForRejection").show();
    }
    else{
                    $("#reasonForRejection").hide();
                    $('#RSN_REJN_FRM').val('');
    }
}
function changeCondSmt(){
    var var1 = $("#TYPE_GRNT_BP option:Selected").val();
    if(var1 == "CONDITIONAL"){
                    $("#COND_STMNT_DIV").show();
    }
    else{
                    $("#COND_STMNT_DIV").hide();
                    $('#COND_STMNT_AUTH').val('');
    }
}
function changeProjDesc(projDesc){
	 var radioButton1 = $('input[name="CH_PROJ_DESC"]:checked').val(); 
	    if(radioButton1 == 'YES') {
	           $("#PROJ_DESC").removeAttr("readonly");
	          
	    }
	    else
	    {
	    		$('#PROJ_DESC').attr("readonly", "readonly");
	    		$('#PROJ_DESC').val(projDesc);
	    }
}
//BHARAT SSR image add 13/4 start
function enablePanoramPic(){
	var radioButton =$("#panoramic_pic").val();
		if(radioButton == 'YES') {
			$("#panoramic_pic_div").show();
		} else {
			$("#panoramic_pic_div").hide();
		}

		return false;
}

function enableMiscPic(){
	var radioButton = $("#other_pic").val();
		if(radioButton == 'YES') {
			$("#misc_pic_div").show();
		} else {
			$("#misc_pic_div").hide();
		}

		return false;
}


function enableExistDraw(){
	var radioButton = $("#exist_draw").val();
		if(radioButton == 'YES') {
			$("#exist_draw_div").show();
		} else {
			$("#exist_draw_div").hide();
		}

		return false;
}

function enablePicSite(){
	var radioButton = $("#pic_site").val();
		if(radioButton == 'YES') {
			$("#pic_site_div").show();
		} else {
			$("#pic_site_div").hide();
		}

		return false;
}

function enableDrawingOtherOperator(){
	var radioButton = $("#drawing_other_operator").val();
		if(radioButton == 'YES') {
			$("#drawing_other_operator_div").show();
		} else {
			$("#drawing_other_operator_div").hide();
		}

		return false;
}

function enableLeaseAgreement(){
	var radioButton = $("#lease_agreement").val();
		if(radioButton == 'YES') {
			$("#lease_agreement_div").show();
		} else {
			$("#lease_agreement_div").hide();
		}

		return false;
}

//BHARAT SSR image add 13/4 end

// Madhura 12/4 start

function submitReviewLSRPT()
{  
	var LS_APPR_RPT = $('input[name="LS_APPR_RPT"]:checked').val(); 
	var RSN_REJN_RPT=$("#RSN_REJN_RPT").val();

    if(LS_APPR_RPT == 'NO' && !RSN_REJN_RPT )
     {
    		$("#reviewLSRPTErrorMsg").html('Please enter reason for rejection');
    		$('#RSN_REJN_RPT').focus();  
    		return false;
     }	
    
    	$("#reviewLSRPTErrorMsg").html(' ');
		submitTaskDetails();
    	return false;
    
 	
}

function submitLSNegotiator()
{  
	var LS_APPR_NEG = $('input[name="LS_APPR_NEG"]:checked').val(); 
	var RSN_REJN_NEG=$("#RSN_REJN_NEG").val();

    if(LS_APPR_NEG == 'NO' && !RSN_REJN_NEG )
     {
    		$("#reviewLSNegotiatorErrorMsg").html('Please enter reason for rejection');
    		$('#RSN_REJN_NEG').focus();  
    		return false;
     }	
    
    	$("#reviewLSNegotiatorErrorMsg").html(' ');
		submitTaskDetails();
    	return false;
    
 	
}

function submitLSBPC()
{  
	var LS_APPR_BPC = $('input[name="LS_APPR_BPC"]:checked').val(); 
	var RSN_REJN_BPC=$("#RSN_REJN_BPC").val();

    if(LS_APPR_BPC == 'NO' && !RSN_REJN_BPC )
     {
    		$("#reviewLSBPCErrorMsg").html('Please enter reason for rejection');
    		$('#RSN_REJN_BPC').focus();  
    		return false;
     }	
    
    	$("#reviewLSBPCErrorMsg").html(' ');
		submitTaskDetails();
    	return false;
    
 	
}
function submitLSSE()
{  
	var LS_APPR_SE = $('input[name="LS_APPR_SE"]:checked').val(); 
	var RSN_REJN_SE =$("#RSN_REJN_SE").val();

    if(LS_APPR_SE == 'NO' && !RSN_REJN_SE )
     {
    		$("#reviewLSSEErrorMsg").html('Please enter reason for rejection');
    		$('#RSN_REJN_SE').focus();  
    		return false;
     }	
   
    	$("#reviewLSSEErrorMsg").html(' ');
		submitTaskDetails();
    	return false;
    
 	
}

function submitLSHS()
{  
	var LS_APPR_HS = $('input[name="LS_APPR_HS"]:checked').val(); 
	var RSN_REJN_HS =$("#RSN_REJN_HS").val();

    if(LS_APPR_HS == 'NO' && !RSN_REJN_HS )
     {
    		$("#reviewLSHSErrorMsg").html('Please enter reason for rejection');
    		$('#RSN_REJN_HS').focus();  
    		return false;
     }	
  
    	$("#reviewLSHSErrorMsg").html(' ');
		submitTaskDetails();
    	return false;

}
function submitLSOLO()
{  
	var LS_APPR_OLO = $('input[name="LS_APPR_OLO"]:checked').val(); 
	var RSN_REJN_OLO =$("#RSN_REJN_OLO").val();

    if(LS_APPR_OLO == 'NO' && !RSN_REJN_OLO )
     {
    		$("#reviewLSOLOErrorMsg").html('Please enter reason for rejection');
    		$('#RSN_REJN_OLO').focus();  
    		return false;
     }	
    
    	$("#reviewLSOLOErrorMsg").html(' ');
		submitTaskDetails();
    	return false;
    
 	
}

function submitLSFRM()
{  
	var LS_APPR_FRM = $('input[name="LS_APPR_FRM"]:checked').val(); 
	var RSN_REJN_FRM =$("#RSN_REJN_FRM").val();

    if(LS_APPR_FRM == 'NO' && !RSN_REJN_FRM )
     {
    		$("#reviewLSFRMErrorMsg").html('Please enter reason for rejection');
    		$('#RSN_REJN_FRM').focus();  
    		return false;
     }	
    
    	$("#reviewLSFRMErrorMsg").html(' ');
		submitTaskDetails();
    	return false;
}

//MAdhura 14/4 end

function changeSiteType(){
	$("#sacinputesErrorMsg").html('');
	var siteval =$("#SITE_TYPE option:selected" ).val();
	if(siteval == "SHARED"){
		$("#docfileAttachDiv").show();
	}
	else{
		$("#docfileAttachDiv").hide();
		$("#docFile").val('');
	}
}

function chngEPFile(){
	$("#technicalEPErrorMsg").html('');
	var EP_OK = $('input[name="EP_FL_OK"]:checked').val();
	if(EP_OK == "YES"){
		$("#docfileAttachDiv").show();
	}
	else{
		$("#docfileAttachDiv").hide();
		$("#docFile").val('');
	}
}

function chngUpldEP1(){
	var EP_FL_APPR_AUTH = $('input[name="EP_FL_APPR_AUTH"]:checked').val();
	if(EP_FL_APPR_AUTH == "NO"){
		$("#ntcEPPublDiv").hide();
		$("#rsnRejEPFileDiv").show();
		$('#EP_NTC_PUBL').attr('checked', false);
	}
	else{
		$("#rsnRejEPFileDiv").hide();
		$("#ntcEPPublDiv").show();
		$("#RSN_REJN_EP_FL").val("");
	}
}

function chngupdMtxEPPubl(){
	var UP_MTX_EP_PUBL = $("input[name=UP_MTX_EP_PUBL]:checked").val();
	if (UP_MTX_EP_PUBL == "YES"){
		$('#updMtxEPPublDiv').show();
	}
	else{
		$('#updMtxEPPublDiv').hide();
		$('#EP_COMPL').attr('checked', false);
	}
}

function openDocumentVersion(projectId, docTitle, documentTypeId){
	
	var requestData= {"pageName" : "openDocumentVersion", "projectId" : projectId, "docTitle" : docTitle, "documentTypeId" : documentTypeId};
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
		
	$.ajax({
        
		url : "openDocumentVersion",
        type : "POST",
        data : requestData,
        
        beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		
		success : function(response) {
			$('#CommonScreenModal').find('.modal-content').html(response);
			$('#CommonScreenModal').modal({ backdrop: 'static', keyboard: false, show : true });
		},
		
		error : function(xhr, status, error) {
			alert(error);
		}
    });
	
  return false;
}

function deleteDocumentsForTitle(projectId, docTitle, documentTypeId){
	
	$("#successMsg").empty();
	$("#errorMsg").empty();
	
	var requestData= {"projectId" : projectId, "docTitle" : docTitle, "documentTypeId" : documentTypeId};
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
		
    var options = {
			message: "Are you sure?",
			title: 'Confirm Delete',
			size: 'sm',
	};

	eModal.confirm(options).then(function(){
		$.ajax({
			url : "deleteDocumentsForTitle",
	        type : "POST",
	        data : requestData,
			beforeSend: function(xhr) {
				enableDisableButtons('#uploadDocForm', 'disable');
				xhr.setRequestHeader(header, token);
				$("#responseSpinner").show();
			},
			complete: function(){
				$('#responseSpinner').hide();
				loadAttachmentDocList(projectId);
				enableDisableButtons('#uploadDocForm', 'enable');
			},
			success: function(data)
			{
				if(data.trim() != 'SUCCESS') {
					$("#errorMsg").html('Error while saving record');
				}
			},
			error : function(xhr, status, error) {
				$("#errorMsg").html(error);
			}
		});
	});
	
  return false;
}

function auditTrailPop(projectId){
	var requestData= {"pageName" : "auditTrailPopup", "projectId" : projectId};
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajax({

		url : "OpenStatus",
		type : "POST",
		data : requestData,

		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},

		success : function(response) {
			$('#CommonScreenModal').find('.modal-content').html(response);
			$('#CommonScreenModal').modal({ backdrop: 'static', keyboard: false, show : true });
		},

		error : function(xhr, status, error) {
			alert(error);
		}
	});
	return false;
}

function funCrtTechHz(){
	var radioButton = $('input[name="HZ_FL_OK"]:checked').val();
		if(radioButton == 'YES') {
			$("#hzFileAprvdDiv").show();
		}
		else {
			$("#hzFileAprvdDiv").hide();
			 $("#hzFileValidatedDiv").hide();
			 $("#hzCertificateDiv").hide();
			 $("#rejectionReasonDiv").hide();
			 $("#HZ_FL_APPR_AUTH").prop('checked', false);
			 $("#HZ_FL_VALD_AUTH_YES").prop('checked', false);
			 $("#HZ_FL_VALD_AUTH_NO").prop('checked', false);
			 $("#HZ_CERT_RECV").prop('checked', false);
			 $("#RSN_REJN_HZ_FL").val('');		
		}

		return false;
}

function funCrtTechHz1(){
	var HZ_FL_APPR_AUTH = $('input[name="HZ_FL_APPR_AUTH"]:checked').val();
		if(HZ_FL_APPR_AUTH == 'YES') {
			$("#hzFileValidatedDiv").show();
			
		} 
		else{
			 $("#hzFileValidatedDiv").hide();
			 $("#hzCertificateDiv").hide();
			 $("#rejectionReasonDiv").hide();
			 $("#HZ_FL_VALD_AUTH_YES").prop('checked', false);
			 $("#HZ_FL_VALD_AUTH_NO").prop('checked', false);
			 $("#HZ_CERT_RECV").prop('checked', false);
			 $("#RSN_REJN_HZ_FL").val('');
		}
		return false;
}

function funHzCert(){
	var HZ_FL_VALD_AUTH = $('input[name="HZ_FL_VALD_AUTH"]:checked').val();
	if(HZ_FL_VALD_AUTH == 'YES') {
		$("#hzCertificateDiv").show();
		$("#rejectionReasonDiv").hide();
		$("#RSN_REJN_HZ_FL").val('');
	}
	else{
		 $("#hzCertificateDiv").hide();
		 $("#rejectionReasonDiv").show();
		 $("#HZ_CERT_RECV").prop('checked', false);
	}
}



// BHARAT BHANDERI 5/3  enamble or disable button while back end process is running
function enableDisableButtons(formObj, enableDisableFlag){
	if(enableDisableFlag == 'disable'){
		$(formObj).find(':button').prop('disabled',true);
	}
	else if(enableDisableFlag == 'enable'){
		$(formObj).find(':button').prop('disabled',false);
	}
	else{
		// Do nothing
	}
	
	
}

function showTimeDiv(){
	$("#showTimeDiv").show();
}

function exportMilestones() {
	$('#errorMsg').html('');
	var formData = new FormData($('#exportDataForm')[0]);
	var date = $("#exportDate").val();
	var fromTime = $("#fromTime").val();
	var toTime = $("#toTime").val();
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	if(date=="" || fromTime=="" || toTime==""){
		$('#errorMsg').html("Please enter all the fields.");
	}
	else if(fromTime>toTime){
		$('#errorMsg').html("From time should be less than to time.");
	}
	else if(fromTime==toTime){
		$('#errorMsg').html("From time and to time can not be same.");
	}
	else{

		$.ajax({
			url : "exportMilestones",
			type : "POST",
			data : formData,
			dataType: 'text',
			processData: false,
			contentType: false,
			cache : false,
			beforeSend : function(xhr) {
				xhr.setRequestHeader(header, token);
				$("#exportMilestone").prop("disabled",true);
				$('#responseSpinner').show();
			},
			complete : function() {
				$('#responseSpinner').hide();
				$("#exportMilestone").prop("disabled",false);
			},
			success : function(response) {
				$('#successMsg').html(response);
			},
			error : function(xhr, status, error) {
				$('#errorMsg').html(error);
			}
		});
	}
	return false;
}

function confirmExport(exportId, confirmBtnObj){
	$(errorMsg).html('');
	var jsonReq = new FormData();
	//alert("inside confirmExport "+exportId);

	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	var btnObj=$(confirmBtnObj).closest("td").find("button[id=exportBtn]");
	$(btnObj).prop("disabled",false);
	var evidenceDoc = $(confirmBtnObj).parent().closest("tr").find("input[id=evidenceDoc]");
	if((($(confirmBtnObj).closest("tr").find("input[id=evidenceDoc]")).val()) == null || (($(confirmBtnObj).closest("tr").find("input[id=evidenceDoc]").val()).trim() == '')){
		$(errorMsg).html("Please attach evidence document.");
		return false;
	}

	jsonReq.append("exportId", exportId);
	jsonReq.append("evidenceDoc", evidenceDoc[0].files[0]);

	var options = {
			message: "Are you sure?",
			title: 'Confirm Submit',
			size: 'sm',	        
	};

	eModal.confirm(options).then(function(){
		$.ajax({
			url : "confirmExport",
			type : "post",
			data : jsonReq,
			dataType: 'text',
			processData: false,
			contentType: false,
			cache : false,
			beforeSend : function(xhr) {
				xhr.setRequestHeader(header, token);
			},
			complete : function() {

			},
			success : function(response) {
				if(response=='SUCCESS'){
					$(btnObj).prop("disabled",true);
					//$('#successMsgForSearchPR').html("PR Cancelled successfully");
					//searchPR();
				}else{
					//$('#errorMsgForSearchPR').html("Error : "+ response);
				}
			},
			error : function(xhr, status, error) {

			}
		});
	});
	return false;
}

function reforecast(projectId,operationId){
	var requestData= {"projectId" : projectId, "operationId" : operationId, "pageName" : "reforecast" };
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajax({

		url : "reforecast",
		type : "POST",
		data : requestData,

		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},

		success : function(response) {
			$('#ReforecastScreenModal').find('.modal-content').html(response);
			$('#ReforecastScreenModal').modal({ backdrop: 'static', keyboard: false, show : true });
		},

		error : function(xhr, status, error) {
			alert(error);
		}
	});
	return false;
}

function confirmReforecast(btnObj, expectedEndDate, operationId, projectId, milestoneId, candidateId, locationId, processId, taskId){
	$('#errorMsg').html('');
	$('#successMsg').html('');
	var reforecastDate = $(btnObj).parent().closest("tr").find("input[id=reforecastDate]").val();
	var comments = $(btnObj).parent().closest("tr").find("textarea[id=comments]").val();
	if(reforecastDate.trim()=='' || reforecastDate==null){
		$('#errorMsg').html("Please select re-forecast date.");
		return false;
	}
	else if(comments.trim()=='' || comments==null){
		$('#errorMsg').html("Please select comments.");
		return false;
	}
	else if(expectedEndDate.trim()!='' && expectedEndDate!=null){
		if(new Date(expectedEndDate)>new Date(reforecastDate)){
			$('#errorMsg').html("Please select the date greater than Expexted End Date.");
			return false;
		}
	}
	else if(new Date()>new Date(reforecastDate)){
		$('#errorMsg').html("Please select the date greater than Current Date.");
		return false;
	}

	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	var requestData= {
			"projectId" : projectId,
			"operationId" : operationId,
			"milestoneId" : milestoneId,
			"candidateId" : candidateId,
			"locationId" : locationId,
			"reforecastDate" : reforecastDate,
			"comments" : comments,
			"processId" : processId,
			"taskId" : taskId
			};
	var options = {
			message: "Are you sure?",
			title: 'Confirm Submit',
			size: 'sm',	        
	};

	eModal.confirm(options).then(function(){
		$.ajax({

			url : "confirmReforecast",
			type : "POST",
			data : requestData,

			beforeSend : function(xhr) {
				xhr.setRequestHeader(header, token);
			},

			success : function(response) {
				$(btnObj).prop("disabled",true);
				$('#successMsg').html("Saved successfully");
			},

			error : function(xhr, status, error) {
				$('#errorMsg').html(error);
				alert(error);
			}
		});
	});
	return false;
}

function addOperationNotes(projectId,operationId,siteId){
	var requestData= { "projectId" : projectId, "pageName" : "operationNotes", "operationId" : operationId, "siteId" : siteId };
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajax({

		url : "addOperationNotes",
		type : "POST",
		data : requestData,

		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},

		success : function(response) {
			$('#ReforecastScreenModal').find('.modal-content').html(response);
			$('#ReforecastScreenModal').modal({ backdrop: 'static', keyboard: false, show : true });
		},

		error : function(xhr, status, error) {
			$('#noteErrorMsg').html(error);
			alert(error);
		}
	});
	return false;
}
function addNotes(operationId,projectId,siteId){
	var operationNote = $("#operationNote").val();
	if(operationNote.trim() != ""){
		var requestData= { "projectId" : projectId, "operationId" : operationId, "operationNote" : operationNote };
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		$.ajax({
	
			url : "saveOperationNotesForUser",
			type : "POST",
			data : requestData,
	
			beforeSend : function(xhr) {
				xhr.setRequestHeader(header, token);
				$('#noteErrorMsg').hide();
				$('#noteSuccessMsg').show();
			},
	
			success : function(response) {
				$('#noteSuccessMsg').html("Note saved successfully");
				addOperationNotes(projectId,operationId,siteId);
			},
	
			error : function(xhr, status, error) {
				$('#noteErrorMsg').html(error);
				alert(error);
			}
		});
	}
	else{
		$('#noteErrorMsg').html("Please enter some note.");
	}
	return false;
}
function getUrlForCoordinate(){
	
	var xCoordinate = $("#X_Coordinate").val();
	var yCoordinate = $("#Y_Coordinate").val();
	var requestData= { "xCoordinate" : xCoordinate, "yCoordinate" : yCoordinate};
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajax({
		type: "POST",
		url: "getUrlForCoordinate",
		data: requestData,
		beforeSend: function(xhr) {
			enableDisableButtons('#taskDetailsForm','disable');
			xhr.setRequestHeader(header, token);
			$("#resetUrlDiv").html('');
			$("#getUrlSpinner").show();
		},
		complete: function(){
			$('#getUrlSpinner').hide();
//			showQueueDetails(queueId, queueName);
			enableDisableButtons('#taskDetailsForm','enable');
			
		},
		success: function(data)
		{
				$("#url").attr('href', "javascript:window.open('"+data+"');");
				$("#resetUrlDiv").html(data);
		},
		error : function(xhr, status, error) {
			$("#getUrlErrorMsg").html(error);
		}
	});
	//});

	return false; 
}
function operationUsers(operationid){
	//alert("Inside Operation users ::"+operationid);
	var requestData= { "operationid" : operationid, "pageName" : "operationUsers"}; 
	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajax({

		url : "loadOperationUsersModal",
		type : "POST",
		data : requestData,

		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},

		success : function(response) {
			$('#operationUsersModal').find('.modal-content').html(response);
			$('#operationUsersModal').modal({ backdrop: 'static', keyboard: false, show : true });
		},

		error : function(xhr, status, error) {
			$('#errorMsg').html(error);
			alert(error);
		}
	});
	return false;
}


function createDaCandidate(projectId,operationId,siteId){
	var requestData= {"pageName" : "daCandidates", "projectId" : projectId, "operationId" : operationId, "siteId" : siteId};
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajax({

		url : "createDaCandidate",
		type : "POST",
		data : requestData,

		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},

		success : function(response) {
			$('#DACLScreenModal').find('.modal-content').html(response);
			$('#DACLScreenModal').modal({ backdrop: 'static', keyboard: false, show : true });
		},

		error : function(xhr, status, error) {
			alert(error);
		}
	});
	return false;
}

function validateDaclCandDetails(){
	var numberOfCandidate = parseInt($("#numberOfCand option:selected" ).val(), 10);
	var i;
	for(i = 1;i<= numberOfCandidate;i++)
		{   
			var zip_code=$("#zip_code"+i).val();
			var x_co_ordinate=$("#x_co_ordinate"+i).val();
			var y_co_ordinate=$("#y_co_ordinate"+i).val();
			var gnd_ht_amsl=$("#gnd_ht_amsl"+i).val();
			var bld_ht_agl=$("#bld_ht_agl"+i).val();
			var bld_ht_amsl=$("#bld_ht_amsl"+i).val();
			var ht_over_cltr=$("#ht_over_cltr"+i).val();
			var max_ant_ht_agl=$("#max_ant_ht_agl"+i).val();
			 if(!floatNumberValidator(zip_code) &&  zip_code != "")
				{
					$("#daclCandErrorMsg").html('Please enter Numeric value for zip code');
					$('#zip_code'+i).focus();
	
					return false;
				}
		    else if(!floatNumberValidator(x_co_ordinate) &&  x_co_ordinate != "")
				{
					$("#daclCandErrorMsg").html('Please enter Numeric value for LAMBERT x co-ordinate');
					$('#x_co_ordinate'+i).focus();
	
					return false;
				}
			else if(!floatNumberValidator(y_co_ordinate) &&  y_co_ordinate != "")
				{
					$("#daclCandErrorMsg").html('Please enter Numeric value for LAMBERT y co-ordinate');
					$('#y_co_ordinate'+i).focus();
	
					return false;
				}
			else if(!floatNumberValidator(gnd_ht_amsl) &&  gnd_ht_amsl != "")
			{
				$("#daclCandErrorMsg").html('Please enter Numeric value for Ground Height AMSL');
				$('#gnd_ht_amsl'+i).focus();
	
				return false;
			}
			else if(!floatNumberValidator(bld_ht_agl) &&  bld_ht_agl != "")
			{
				$("#daclCandErrorMsg").html('Please enter Numeric value for Building Height AGL');
				$('#bld_ht_agl'+i).focus();
				return false;
			}
			else if(!floatNumberValidator(bld_ht_amsl) &&  bld_ht_amsl != "")
			{
				$("#daclCandErrorMsg").html('Please enter Numeric value for Building Height AMSL');
				$('#bld_ht_amsl'+i).focus();
				return false;
			}
			else if(!floatNumberValidator(ht_over_cltr) &&  ht_over_cltr != "")
			{
				$("#daclCandErrorMsg").html('Please enter Numeric value for Height Over Clutter');
				$('#ht_over_cltr'+i).focus();
				return false;
			}
			else if(!floatNumberValidator(max_ant_ht_agl) &&  max_ant_ht_agl != "")
			{
				$("#daclCandErrorMsg").html('Please enter Numeric value for Maximum Antenna Height AGL');
				$('#max_ant_ht_agl'+i).focus();
				return false;
			}
		}
	return true;
}
function saveDaclCandDetails(){
	$("#daclCandSuccessMsg").empty();
	$("#daclCandErrorMsg").empty();
	var projectId = $("#projectId").val();
	var operationId = $('#operationId').val();
	var options = {
	         message: "Are you sure want to submit ?",
	         title: 'Confirm Submit',
	         size: 'sm',          
	     };

	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    if(validateDaclCandDetails()){
		$("#daclCandErrorMsg").hide();
    eModal.confirm(options).then(function(){
	$.ajax({
		url : "saveDaclCandDetails",
        type : "POST",
        data : $("#daCandidateForm").serialize(),
        
        beforeSend : function(xhr) {
        	enableDisableButtons('#daCandidateForm', 'disable');
			xhr.setRequestHeader(header, token);
			$("#daclCandSpinner").show();
		},
		complete: function(){
			$("#daclCandSpinner").hide();
			$('#DACLScreenModal').modal('hide');
			loadDocumentList(projectId);
			loadCandidatesTable(operationId);
			enableDisableButtons('#daCandidateForm', 'enable');
   	   	},
        success: function(data)
        {
     	   if(data.trim()=='SUCCESS'){
     		   $("#daclCandSuccessMsg").html('Document uploaded successfully');
     	   } else {
     		   $("#daclCandErrorMsg").html('Error while saving record: '+data);
     	   }        	           	   
        },
 	    error : function(xhr, status, error) {
			$("#daclCandErrorMsg").html(error);
		}
    });  
	
    });
    }
  return false;
}

function numberOfDaclCandidate(){
	var numberOfCandidate = parseInt($("#numberOfCand option:selected" ).val(), 10);
	var i;
	for (i = 1; i <= numberOfCandidate; i++) {
		$("#candidatelist" + i).show();
	}
	for (i = numberOfCandidate + 1; i <= 10; i++) {
		$("#candidatelist" + i).hide();
		$('#name'+i).val("");
		$('#address'+i).val("");
		$('#zip_code'+i).val("");
		$('#commune'+i).val("");
		$('#cad_zone_type'+i).val("");
		$('#x_co_ordinate'+i).val("");
		$('#y_co_ordinate'+i).val("");
		$('#SiteList'+i).val("");
		$('#desc_site'+i).val("");
		$('#MOP_mob'+i).prop('checked', false);
		$('#HV_pylon'+i).prop('checked', false);
		$('#MOP_prox'+i).prop('checked', false);
		$('#light_pole'+i).prop('checked', false);
		$('#light_pole_num'+i).val("");
		$('#prox_site_code'+i).val("");
		$('#pylon_num'+i).val("");
		$('#Mob_site_code'+i).val("");
		$('#avl_height'+i).val("");
		$('#achv_height'+i).val("");
	}
	return false;
}

function showBPGRNTD(){
	
	var radioButton1 = $('input[name="BP_APPR_AUTH"]:checked').val();
	if(radioButton1 == 'YES') {
        $("#bpgranted").show();
	}
	else{
		$("#bpgranted").hide();
		$("#BP_GRNT_AUTH1").prop('checked', false);
		$("#BP_GRNT_AUTH2").prop('checked', false);
	}
}

function loadCandidatesTable(operationId){
	var requestData={"pageName" : "candidateList" , "operationId" : operationId};
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	$.ajax({

		url : "loadCandidatesList",
		type : "POST",
		data : requestData,

		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},

		complete : function() {

		},

		success : function(response) {
			$('#candidatesTableBody').html(response);
		},

		error : function(xhr, status, error) {
			alert(error);
		}
	});
	return false;
}

function validateBPChnage(){
	
	var bpAccepted = $('input[name="BP_APPL_PKG_ACPTD"]:checked').val();
	
	if(bpAccepted == 'YES'){
		$('#bpSentDiv').show(); 
	}else{
		$('#bpSentDiv').hide();
	}
}

function submitBpRefused(){
	 var typeOfWork = $('#typeOfWork').val();
	 if(typeOfWork == "UPG"){
			var options = {
			         message: "You have selected alternate solution is not possible. So the site needs to be cancelled." +
			         		"Do you want to continue?",
			         title: 'Confirm Submit',
			         size: 'lg',          
			     };
			eModal.confirm(options).then(function(){
			submitTaskDetails();
			});
	 }
	 else{
		 submitTaskDetails();
	 }
	return false;
}

function changeCompany(companyFieldName, userFieldName, queueType, userDiv) {
	var selectedCompany = $("#" + companyFieldName + " option:selected").val();
	
	if(selectedCompany == 'TECHM') {
		var requestData={"pageName" : "companyUserList" , "selectedCompany" : selectedCompany, "userFieldName" : userFieldName, "queueType" : queueType};
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
	
		$.ajax({
			url : "getUserListForCompany",
			type : "POST",
			data : requestData,
	
			beforeSend : function(xhr) {
				xhr.setRequestHeader(header, token);
			},
	
			complete : function() {
	
			},
	
			success : function(response) {
				$("#" + userDiv).show();
				$("#" + userDiv).html(response);
			},
	
			error : function(xhr, status, error) {
				alert(error);
			}
		});
	} else {
		$("#" + userDiv).hide();
		$("#" + userDiv).html('');
	}
	return false;				
}

function getLogin(){
	alert("inside");
	data={ "pageName" : "login"}; 
	var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
	$.ajax({
        type: "POST",
        url: "login",
        data: data,
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);   
        },
        success: function(response) {
            $("#defaultBody").html( response );
        }
    });
	
	return false;
}