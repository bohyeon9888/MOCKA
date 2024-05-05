package com.mozart.mocka.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import static org.hibernate.query.sqm.tree.SqmNode.log;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendEmail(String[] emails) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("mockab304@gmail.com");
        helper.setTo(emails);
        helper.setSubject("mocka 프로젝트 초대 이메일");
        helper.setText("초대 이메일입니다.\n 링크를 클릭하세요!");

        mailSender.send(message);
        log.debug("=========== complete sending emails ===========");
    }
}
