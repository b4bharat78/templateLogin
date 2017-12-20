<!DOCTYPE html>
<html >
<head>
<meta charset="UTF-8">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="description" content="Ro-Pro User Interface">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>

<title>Login Form</title>
<link rel="stylesheet" href="css/style.css">

</head>
<body>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<form name="createUsersForm" id="createUsersForm" onsubmit="return createUsers()">
	<c:forEach items="${usersList}" var="usersList">
		<input type="hidden" id="usersList" name="usersList" value="${usersList.username}">
	</c:forEach>


		<div class="column">
		<div class="row-md-6">
			<div class="panel panel-primary" style="">
				<div class="panel-heading">Create</div>
			</div>
			<div class="panel panel-default">
				<div class="panel-body">
					<div class="row">
						<div class="col-sm-1">User Id:</div>
						<div class="col-sm-3">
							<input class="form-control" id="userId" name="userId" type="text" maxlength="50" required>
						</div>
						<div class="col-sm-1">First Name:</div>
						<div class="col-sm-3">
							<input class="form-control" id="firstName" name="firstName" type="text" maxlength="100" required>
						</div>
						<div class="col-sm-1">Last Name:</div>
						<div class="col-sm-3">
							<input class="form-control" id="lastName" name="lastName" type="text" maxlength="100">
						</div>
					</div>
					<br />

					<div class="row">
						<div class="col-sm-1">Password:</div>
						<div class="col-sm-3">
							<input type="password" class="form-control" id="password" name="password" maxlength="50" required required
								pattern="(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,32}"
								onchange="if(this.checkValidity()) createUsersForm.confirmPassword.pattern = this.value;">
						</div>
						<div class="col-sm-1">Confirm Password:</div>
						<div class="col-sm-3">
							<input type="password" class="form-control" id="confirmPassword" name="confirmPassword" maxlength="50" required
								pattern="(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,32}">
						</div>

						<div class="col-sm-1">Email:</div>
						<div class="col-sm-3">
							<input class="form-control" id="email" name="email" type="text" maxlength="100" required>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-4">
							<div class="fyi-txt-sm">Password must contain at least 8 characters, including UPPER/lowercase alphabets, numbers and special characters</div>
						</div>
					</div>
					<br />

					<div class="row">
						<div class="col-sm-1">User Type</div>
						<div class="col-sm-3">
							<select id="userType" name="userType" class="form-control" onChange="userTypeHide()">
								<option value="">Select User Type</option>
								<c:forEach var="userTypes" items="${userTypesList}">
									<option value="${userTypes.userType}" class="form-control">${userTypes.userTypeDesc}</option>
								</c:forEach>
							</select>
						</div>
						<div id="phoneNumDiv"  hidden="true">
						<div class="col-sm-1">Phone Number:</div>
						<div class="col-sm-3">
							<input class="form-control" id="phoneNum" name="phoneNum" maxlength="10" type="text">
						</div>
						</div>
						<div id="phoneAltDiv"  hidden="true">
						<div class="col-sm-1">Alternate Number:</div>
						<div class="col-sm-3">
							<input class="form-control" id="phoneNumAlt" name="phoneNumAlt" maxlength="10"  type="text">
						</div>
						</div>
					 	<!-- <div class="col-sm-1">Queue:</div>
						<div class="col-sm-3">
							<select id="queue" name="queue" class="form-control" onChange="queueListHide()">
								<option value="">Select Queue Type</option>
								<option value="gQueue" class="form-control">Grouped Queue</option>
							</select>
						</div> -->						
					</div>
					<br />
					<div class="row" id="phoneEmgDiv"  hidden="true">
					<div class="col-sm-1">Emergency Number:</div>
						<div class="col-sm-3">
							<input class="form-control" id="phoneNumEmg" name="phoneNumEmg"  maxlength="10"  type="text">
						</div>
					</div>
					<Br />
					<div class="row" id="tempUserDiv">
					<div class="col-sm-1">Temporary User:</div>
						<div class="col-sm-3">
							<input type="checkbox" name="tempUser" id="tempUser" onchange="changeTempUser()">
						</div>
					
						<div id="tempUserTimeDiv"  hidden="true">
						<div class="col-sm-1">Temporary User Time(Hr):</div>
							<div class="col-sm-3">
								<input class="form-control" id="tempUserTime" name="tempUserTime" type="text" maxlength="5">
							</div>
						</div>
					</div>
					<Br />
					<div class="row">
						<div id="rolesDiv" hidden="true">
							<div class="col-sm-1">Roles:</div>
							<div class="col-sm-3">
								<c:forEach var="roles" items="${rolesList}">
									<tr>
										<c:if test="${(roles.roleName != 'Vendor') && (roles.roleName != 'Application User')}">
											<td>
												<input type="checkbox" value="${roles.roleId}" name="userRoles" id="userRoles">&nbsp;${roles.roleName}<br />
											</td>
											<!-- checked="checked" -->
										</c:if>
									</tr>
								</c:forEach>
							</div>
							
     						<!-- userGroupList -->
     						<div class="col-sm-1">Groups:</div>
							<div class="col-sm-3">  
     						<!-- <div class="col-sm-1">Groups:</div> -->							     					          					          											          					   
    						<!-- <div class="container" id="groupListDiv" hidden="true"> -->             
					    		<div class="containerGroup">					     				              						    	        	
					            	<c:forEach var="groups" items="${userGroupList}">
	                 					<input type="checkbox" value="${groups.id}" name="userGroups" id="userGroups">&nbsp;${groups.name}<br/><!-- checked="checked" -->
	           						</c:forEach>   
								</div>
							</div>
							</div>          			
          					
						<div id="vendorsDiv" hidden="true">
							<div class="col-sm-1">Vendor Type</div>
							<div class="col-sm-3">
							<select id="vendorType" name="vendorType" class="form-control" onChange="vendorTypeHide()">
								<option value="">Select Vendor Type</option>
								<c:forEach var="vendorTypes" items="${vendorTypesList}">
									<option value="${vendorTypes.vendorTypeID}" class="form-control">${vendorTypes.vendorTypeName}</option>
								</c:forEach>
							</select>
						</div>
						</div>
						
						 <%-- <div id="modulesDiv">
							<div class="col-sm-1">Modules:</div>
							<div class="col-sm-3">
								<c:forEach var="modules" items="${modulesList}">
									<tr>
										<td>
											<input type="checkbox" value="${modules.moduleId}" name="userModules" id="userModules">&nbsp;${modules.moduleName}<br />
										</td>
										<!-- checked="checked" -->
									</tr>
								</c:forEach>
							</div>
						</div> --%> 
						<%-- <div id="queuesDiv" hidden="true">
							<div class="col-sm-1">Grouped Queues:</div>
							<div class="col-sm-3">
								<c:forEach var="queues" items="${queueList}">
									<tr>
										<td>
											<input type="checkbox" value="${queues.queueId}" name="userQueues" id="userQueues">&nbsp;${queues.queueDescription}<br />
										</td>
										<!-- checked="checked" -->
									</tr>
								</c:forEach>
							</div>
						</div> --%>
					</div>
					<br />

					<div>
						<button type="submit" id="createButton" name="createButton" class="btn btn-success"> <i class="fa fa-check"></i> Create </button>&nbsp;&nbsp;
						<button type="button" id="resetButton" name="resetButton" class="btn btn-info" onclick="clearUserCreateReq()"> <i class="fa fa-refresh"></i> Clear </button>&nbsp;&nbsp;
						<span class="fa fa-spinner fa-pulse" id="responseSpinner" style="display: none;"></span>
						<span class="green bolder" id="successMsg"></span>
						<span class="red bolder" id="errorMsg"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
    <!-- jQuery -->
    <script src="js/jquery.min.js"></script>

	<!-- Our JavaScript -->
    <script src="js/login.js"></script>
    
</body>
</html>
