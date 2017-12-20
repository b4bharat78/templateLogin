package com.template.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.template.domain.Users;
import com.template.service.LoginHistoryService;
import com.template.service.ManageUsersService;
import com.template.service.UserDetailsService;

@Controller
public class HomeController {
	
	protected static final Logger LOGGER = Logger.getLogger(HomeController.class);
	
	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private LoginHistoryService loginHistoryService;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private ManageUsersService manageUserService;

	@RequestMapping("/app")
	public ModelAndView homePage() throws JsonGenerationException, JsonMappingException, IOException {
		ModelAndView model = new ModelAndView();
		String username = "";
		String userIPAddress = request.getRemoteAddr();
		String userFullName = "";
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (principal instanceof UserDetails) {
			username = ((UserDetails)principal).getUsername();
			LOGGER.debug("Username from if HomeController: "+username);
		} else {
			username = principal.toString();
			LOGGER.debug("Username from else HomeController: "+username);
		}

		loginHistoryService.insertUserLogin(username, "IN", userIPAddress);

		Users userDetails = (Users)userDetailsService.loadUserByUsername(username);
		userFullName = userDetails.getFirst_name()+" "+userDetails.getLast_name();

		userDetails.setFailedLoginAttempts(0);
		userDetails.setIsAccountLocked("N");
		manageUserService.saveUser(userDetails);

		model.addObject("userFullName", userFullName);
		model.setViewName("default");

		return model;

	}		
}