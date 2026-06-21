package com.lms.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ResponseDto {
    private String message;
    private boolean status;
    private String token; // To hold JWT

    public ResponseDto(String message, boolean status) {
        this.message = message;
        this.status = status;
    }
}
