package com.mastermind.backend.controller;

import com.mastermind.backend.dto.JogadaDTO;
import com.mastermind.backend.service.JogoService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/jogo")
@CrossOrigin(origins = "http://localhost:4200")
public class JogoController {

    private final JogoService jogoService;

    public JogoController(JogoService jogoService) {
        this.jogoService = jogoService;
    }

    @PostMapping("/iniciar")
    public Map<String, Object> iniciar(@RequestParam String usuario) {
        return jogoService.iniciarPartida(usuario);
    }

    @PostMapping("/jogar")
    public Map<String, Object> jogar(@RequestParam Long partidaId,
                                     @RequestBody JogadaDTO jogada) {

        return jogoService.verificarJogada(partidaId, jogada.getTentativa());
    }
}