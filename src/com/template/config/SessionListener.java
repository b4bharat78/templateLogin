package com.template.config;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.log4j.Logger;
 
public class SessionListener implements HttpSessionListener {
	
	protected static final Logger LOGGER = Logger.getLogger(SessionListener.class);
	
    @Override
    public void sessionCreated(HttpSessionEvent event) {
        LOGGER.debug("==== Session is created ====");
        event.getSession().setMaxInactiveInterval(15*60);
    }
 
    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
    	LOGGER.debug("==== Session is destroyed ====");
    }
}
