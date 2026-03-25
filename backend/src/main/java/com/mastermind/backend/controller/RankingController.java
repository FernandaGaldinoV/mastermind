package com.mastermind.backend.controller;

import com.mastermind.backend.dto.PartidaDTO;
import com.mastermind.backend.entity.Partida;
import com.mastermind.backend.service.PartidaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ranking")
@CrossOrigin(origins = "http://localhost:4200")
public class RankingController {

    private final PartidaService partidaService;

    public RankingController(PartidaService partidaService) {
        this.partidaService = partidaService;
    }

    @PostMapping
    public Partida salvar(@RequestBody PartidaDTO dto) {
        return partidaService.salvar(dto);
    }

    @GetMapping
    public List<PartidaDTO> listar() {
        return partidaService.listar()
                .stream()
                .map(p -> new PartidaDTO(
                        p.getUsuario(),
                        p.getTentativas(),
                        p.isVenceu()
                ))
                .toList();
    }
}