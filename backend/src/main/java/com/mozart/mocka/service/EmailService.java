package com.mozart.mocka.service;

import com.mozart.mocka.domain.Projects;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import static org.hibernate.query.sqm.tree.SqmNode.log;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendEmail(String[] emails, Projects project) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String projectName = URLEncoder.encode(project.getProjectName(), StandardCharsets.UTF_8);


        helper.setFrom("mockab304@gmail.com");
        helper.setTo(emails);
        helper.setSubject("mocka 프로젝트 초대 이메일");
        helper.setText("\t초대 이메일입니다.\n\t링크를 클릭하세요!\thttps://mock-a.com/invite?projectId="+project.getProjectId()+"&projectName="+projectName);

        mailSender.send(message);
        log.debug("=========== complete sending emails ===========");
    }
}
