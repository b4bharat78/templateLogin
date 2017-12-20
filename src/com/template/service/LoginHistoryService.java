package com.template.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.template.domain.LoginHistory;
import com.template.persistence.LoginHistoryRepository;

@Service
public class LoginHistoryService{
	
	protected static final Logger LOGGER = Logger.getLogger(LoginHistoryService.class);	
	@Autowired
	private LoginHistoryRepository loginHistoryRepository;
	
	/*@Autowired
	private LoginHistory loginHistoryObj;*/

	public List <LoginHistory> getAllLoginHistory(){
		
		List <LoginHistory> loginHistoryList = loginHistoryRepository.findAll();
		return loginHistoryList;
		
	}
	
	public void insertUserLogin(String userId, String loginAction, String loginIp){
		LOGGER.debug("Inside insertUserLogin for user: "+userId);
		LoginHistory loginHistoryObj = new LoginHistory();
		loginHistoryObj.setUserId(userId);
		loginHistoryObj.setLoginAction(loginAction);
		loginHistoryObj.setLoginIp(loginIp);
		loginHistoryRepository.save(loginHistoryObj);
	}

}
