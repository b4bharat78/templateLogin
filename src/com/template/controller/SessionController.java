package com.template.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.template.service.LoginHistoryService;
import com.template.service.UserDetailsService;

@Controller

public class SessionController {
	
	protected static final Logger LOGGER = Logger.getLogger(SessionController.class);

	@Autowired
	private LoginHistoryService loginHistoryService;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private UserDetailsService userDetailsService;

	@Value("${max.failed.login.attempts}")
	private String maxFailedLoginAttempts;

	@RequestMapping({"/", "/login"})
	public ModelAndView loginPage() {
		ModelAndView model = new ModelAndView();
		model.setViewName("login");
		return model;
	}

	@RequestMapping({"/loginerror"})
	public ModelAndView loginErrorPage() {
		ModelAndView model = new ModelAndView();
		model.addObject("error", "Invalid UserName / Password. Account will be locked after " + maxFailedLoginAttempts +" attempts. ");
		model.setViewName("login");
		return model;
	}

	@RequestMapping({"/accessDenied"})
	public ModelAndView accessDenied() {
		ModelAndView model = new ModelAndView();
		model.addObject("error", "Authorization Failed. Please contact system admin.");
		model.setViewName("login");
		return model;
	}

	@RequestMapping({"/accountDelete"})
	public ModelAndView accountDelete() {
		ModelAndView model = new ModelAndView();
		model.addObject("error", "User is marked inactive. Please contact support.");
		model.setViewName("login");
		return model;
	}

	@RequestMapping({"/accountLocked"})
	public ModelAndView accountLocked() {
		ModelAndView model = new ModelAndView();
		model.addObject("error", "Account is locked. Please contact system admin.");
		model.setViewName("login");
		return model;
	}

	@RequestMapping({"/accountExpired"})
	public ModelAndView accountExpired() {
		ModelAndView model = new ModelAndView();
		model.addObject("error", "Account is Expired. Please contact system admin.");
		model.setViewName("login");
		return model;
	}
	@RequestMapping("/logout")
	public ModelAndView logoutPage() {
		ModelAndView model = new ModelAndView();
		model.setViewName("login");
		String username = "";
		String userIPAddress = request.getRemoteAddr();
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (principal instanceof UserDetails) {
			username = ((UserDetails)principal).getUsername();
			LOGGER.debug("Username from if HomeController: "+username);
		} else {
			username = principal.toString();
			LOGGER.debug("Username from else HomeController: "+username);
		}
		loginHistoryService.insertUserLogin(username, "OUT", userIPAddress);
		return model;
	}


}