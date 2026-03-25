package com.mastermind.backend.dto;

public class PartidaDTO {

    private String usuario;
    private int tentativas;
    private boolean venceu;

    public PartidaDTO(String usuario, int tentativas, boolean venceu) {
        this.usuario = usuario;
        this.tentativas = tentativas;
        this.venceu = venceu;
    }

    public String getUsuario() {
        return usuario;
    }

    public int getTentativas() {
        return tentativas;
    }

    public boolean isVenceu() {
        return venceu;
    }
}