package com.mastermind.backend.repository;

import com.mastermind.backend.entity.Partida;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartidaRepository extends JpaRepository<Partida, Long> {

    List<Partida> findAllByOrderByTentativasAsc();
}