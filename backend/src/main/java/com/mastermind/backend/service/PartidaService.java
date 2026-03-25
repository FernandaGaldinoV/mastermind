package com.mastermind.backend.service;

import com.mastermind.backend.dto.PartidaDTO;
import com.mastermind.backend.entity.Partida;
import com.mastermind.backend.repository.PartidaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartidaService {

    private final PartidaRepository partidaRepository;

    public PartidaService(PartidaRepository partidaRepository) {
        this.partidaRepository = partidaRepository;
    }

    public Partida salvar(PartidaDTO dto) {

        if (dto.getUsuario() == null || dto.getUsuario().isEmpty()) {
            throw new IllegalArgumentException("Usuário inválido");
        }

        if (dto.getTentativas() <= 0) {
            throw new IllegalArgumentException("Tentativas inválidas");
        }

        if (dto.getTentativas() > 10) {
            throw new IllegalArgumentException("Número máximo de tentativas excedido");
        }

        Partida partida = new Partida();
        partida.setUsuario(dto.getUsuario());
        partida.setTentativas(dto.getTentativas());
        partida.setVenceu(dto.isVenceu());

        return partidaRepository.save(partida);
    }

    public List<Partida> listar() {
        return partidaRepository.findAllByOrderByTentativasAsc();
    }
}