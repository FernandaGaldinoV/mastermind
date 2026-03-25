package com.mastermind.backend.service;

import com.mastermind.backend.entity.Usuario;
import com.mastermind.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario salvar(Usuario usuario) {

        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }
        return usuarioRepository.save(usuario);
    }

    public Usuario login(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha)
                .orElseThrow(() -> new IllegalArgumentException("Usuário ou senha inválidos"));
    }
}