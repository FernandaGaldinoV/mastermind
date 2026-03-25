package com.mastermind.backend.service;

import com.mastermind.backend.entity.Partida;
import com.mastermind.backend.repository.PartidaRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JogoService {

    private final List<String> cores = List.of("red", "blue", "green", "yellow", "purple", "orange");
    private final PartidaRepository partidaRepository;

    public JogoService(PartidaRepository partidaRepository) {
        this.partidaRepository = partidaRepository;
    }


    public Map<String, Object> iniciarPartida(String usuario) {

        List<String> codigo = gerarCodigo();

        Partida partida = new Partida();
        partida.setUsuario(usuario);
        partida.setCodigoSecreto(String.join(",", codigo));
        partida.setTentativas(0);
        partida.setVenceu(false);

        partidaRepository.save(partida);

        Map<String, Object> response = new HashMap<>();
        response.put("partidaId", partida.getId());

        return response;
    }

    public Map<String, Object> verificarJogada(Long partidaId, List<String> tentativa) {

        Partida partida = partidaRepository.findById(partidaId)
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));

        List<String> codigo = Arrays.asList(partida.getCodigoSecreto().split(","));

        int acertosPosicao = 0;
        int acertosOutraPosicao = 0;

        boolean[] usadoCodigo = new boolean[4];
        boolean[] usadoTentativa = new boolean[4];


        for (int i = 0; i < 4; i++) {
            if (tentativa.get(i).equals(codigo.get(i))) {
                acertosPosicao++;
                usadoCodigo[i] = true;
                usadoTentativa[i] = true;
            }
        }

        for (int i = 0; i < 4; i++) {
            if (usadoTentativa[i]) continue;

            for (int j = 0; j < 4; j++) {
                if (usadoCodigo[j]) continue;

                if (tentativa.get(i).equals(codigo.get(j))) {
                    acertosOutraPosicao++;
                    usadoCodigo[j] = true;
                    usadoTentativa[i] = true;
                    break;
                }
            }
        }

        partida.setTentativas(partida.getTentativas() + 1);

        if (acertosPosicao == 4) {
            partida.setVenceu(true);
        }

        Map<String, Object> resultado = new HashMap<>();
        resultado.put("acertosPosicao", acertosPosicao);
        resultado.put("acertosOutraPosicao", acertosOutraPosicao);

        return resultado;
    }

    private List<String> gerarCodigo() {
        Random random = new Random();
        List<String> codigo = new ArrayList<>();

        for (int i = 0; i < 4; i++) {
            codigo.add(cores.get(random.nextInt(cores.size())));
        }

        return codigo;
    }
}