package com.template.domain;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * The persistent class for the login_history database table.
 * 
 */
@Entity
@Table(name="LOGIN_HISTORY", schema="template")

public class LoginHistory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="HISTORY_ID")
	private int historyId;

	@Column(name="ENTRY_TIMESTAMP")
	private Timestamp entryTimestamp;

	@Column(name="LOGIN_ACTION")
	private String loginAction;

	@Column(name="LOGIN_IP")
	private String loginIp;

	@Column(name="USER_ID")
	private String userId;

	public LoginHistory() {
	}

	public int getHistoryId() {
		return this.historyId;
	}

	
	public void setHistoryId(int historyId) {
		this.historyId = historyId;
	}

	public Timestamp getEntryTimestamp() {
		return this.entryTimestamp;
	}

	public void setEntryTimestamp(Timestamp entryTimestamp) {
		this.entryTimestamp = entryTimestamp;
	}

	public String getLoginAction() {
		return this.loginAction;
	}

	public void setLoginAction(String loginAction) {
		this.loginAction = loginAction;
	}

	public String getLoginIp() {
		return this.loginIp;
	}

	public void setLoginIp(String loginIp) {
		this.loginIp = loginIp;
	}

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

}