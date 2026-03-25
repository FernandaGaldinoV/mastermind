package com.mastermind.backend.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JogoService {

    private final List<String> cores = List.of("red", "blue", "green", "yellow", "purple", "orange");

    public Map<String, Object> verificarJogada(List<String> tentativa) {

        List<String> codigo = gerarCodigo();

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