package com.template.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.template.domain.LoginHistory;

public interface LoginHistoryRepository extends JpaRepository<LoginHistory, String>{
	
}
