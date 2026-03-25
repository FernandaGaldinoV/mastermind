package com.mastermind.backend.service;

import com.mastermind.backend.dto.PartidaDTO;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PartidaServiceTest {

    @Test
    void deveLancarErroQuandoUsuarioInvalido() {

        PartidaService service = new PartidaService(null);

        PartidaDTO dto = new PartidaDTO("", 5, true);

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            service.salvar(dto);
        });

        assertEquals("Usuário inválido", exception.getMessage());
    }

    @Test
    void deveLancarErroQuandoTentativasInvalidas() {

        PartidaService service = new PartidaService(null);

        PartidaDTO dto = new PartidaDTO("fernanda@email.com", 0, true);

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            service.salvar(dto);
        });

        assertEquals("Tentativas inválidas", exception.getMessage());
    }

}