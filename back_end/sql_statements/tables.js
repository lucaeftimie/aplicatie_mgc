const dropTablesQuery = `
DROP TABLE IF EXISTS produse_cumparate CASCADE;
DROP TABLE IF EXISTS stoc_lunar_cinema CASCADE;
DROP TABLE IF EXISTS derulari_filme CASCADE;
DROP TABLE IF EXISTS bilete_cinema CASCADE;
DROP TABLE IF EXISTS distributie_filme CASCADE;
DROP TABLE IF EXISTS produse_cinema CASCADE;
DROP TABLE IF EXISTS sali_cinema CASCADE;
DROP TABLE IF EXISTS filme CASCADE;
DROP TABLE IF EXISTS angajati_cinema CASCADE;
DROP TABLE IF EXISTS departamente_cinema CASCADE;
DROP TABLE IF EXISTS actori CASCADE;
DROP TABLE IF EXISTS pret_variabil_bilete CASCADE;
DROP TABLE IF EXISTS roluri_angajati_cinema CASCADE;
DROP TABLE IF EXISTS recenzii_filme CASCADE;
DROP TABLE IF EXISTS clienti_cinema CASCADE;
`;

const create_actori = `
CREATE TABLE IF NOT EXISTS actori (
    id SMALLINT,
    nume VARCHAR(50) NOT NULL,
    prenume VARCHAR(50) NOT NULL,
    CONSTRAINT actor_pk PRIMARY KEY (id)
);
`;

const create_filme = `
CREATE TABLE IF NOT EXISTS filme (
    id SMALLINT,
    nume VARCHAR(200) NOT NULL,
    gen VARCHAR(50) NOT NULL,
    data_lansare DATE NOT NULL,
    durata SMALLINT NOT NULL,
    rating NUMERIC(2,1) DEFAULT NULL,
    CONSTRAINT film_pk PRIMARY KEY (id)
);
`;

const create_distributie_filme = `
CREATE TABLE IF NOT EXISTS distributie_filme (
    id_actor SMALLINT NOT NULL,
    id_film SMALLINT NOT NULL,
    CONSTRAINT actor_fk FOREIGN KEY (id_actor) REFERENCES actori(id),
    CONSTRAINT film_fk FOREIGN KEY (id_film) REFERENCES filme(id)
);
`;

const create_sali_cinema = `
CREATE TABLE IF NOT EXISTS sali_cinema (
    id SMALLINT,
    nr_sala SMALLINT NOT NULL,
    nr_locuri SMALLINT NOT NULL,
    CONSTRAINT sala_cinema_pk PRIMARY KEY (id)
);
`;

const create_departamente = `
CREATE TABLE IF NOT EXISTS departamente_cinema (
    id SMALLINT,
    nume VARCHAR(50) NOT NULL,
    CONSTRAINT dep_cinema_pk PRIMARY KEY (id)
);
`;

const create_angajati = `
CREATE TABLE IF NOT EXISTS angajati_cinema (
    id_angajat SMALLINT PRIMARY KEY,
    id_manager SMALLINT,
    nume VARCHAR(50) NOT NULL,
    prenume VARCHAR(50) NOT NULL,
    nr_telefon VARCHAR(12) NOT NULL,
    email VARCHAR(50) NOT NULL,
    salariul INTEGER NOT NULL,
    id_departament SMALLINT,
    CONSTRAINT manager_fk_cinema FOREIGN KEY (id_manager) REFERENCES angajati_cinema(id_angajat),
    CONSTRAINT ang_dep_fk FOREIGN KEY (id_departament) REFERENCES departamente_cinema(id)
);
`;

const create_bilete = `
CREATE TABLE IF NOT EXISTS bilete_cinema (
    id SMALLINT,
    pret_unitar NUMERIC(5,2) NOT NULL,
    id_film SMALLINT,
    CONSTRAINT film_bilet_fk FOREIGN KEY (id_film) REFERENCES filme(id),
    CONSTRAINT bilet_cinema_pk PRIMARY KEY (id)
);
`;

const create_derulari = `
CREATE TABLE IF NOT EXISTS derulari_filme (
    id SMALLINT,
    id_film SMALLINT NOT NULL,
    id_sala SMALLINT NOT NULL,
    ora_derulare TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT film_derulare_film_fk FOREIGN KEY (id_film) REFERENCES filme(id),
    CONSTRAINT sala_derulare_film_fk FOREIGN KEY (id_sala) REFERENCES sali_cinema(id),
    CONSTRAINT id_der_film_pk PRIMARY KEY (id)
);
`;

const create_produse = `  
CREATE TABLE IF NOT EXISTS produse_cinema (
    id SMALLINT,
    pret_unitar NUMERIC(5,2) NOT NULL,
    nume VARCHAR(30) NOT NULL,
    CONSTRAINT produs_cinema_pk PRIMARY KEY (id)
);
`;

const create_clienti = `
CREATE TABLE IF NOT EXISTS clienti_cinema (
    id SMALLINT,
    id_bilet SMALLINT NOT NULL, 
    id_derulare_film SMALLINT NOT NULL, 
    tip_plata VARCHAR(20) NOT NULL,
    ora_plata_efectuata TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT client_bilet_fk FOREIGN KEY (id_bilet) REFERENCES bilete_cinema(id),
    CONSTRAINT client_derulare_film_fk FOREIGN KEY (id_derulare_film) REFERENCES derulari_filme(id),
    CONSTRAINT client_cinema_pk PRIMARY KEY (id)
);
`;

const create_produse_cumparate = `
CREATE TABLE produse_cumparate (
    id SMALLINT,
    id_client SMALLINT,
    id_produs SMALLINT,
    cantitate_produs SMALLINT NOT NULL,
    CONSTRAINT tip_produs_cinema_fk FOREIGN KEY (id_produs) REFERENCES produse_cinema(id),
    CONSTRAINT client_produs_cumparat_fk FOREIGN KEY (id_client) REFERENCES clienti_cinema(id)
);

ALTER TABLE produse_cumparate
ADD CONSTRAINT prod_cump_cinema_pk PRIMARY KEY (id);
`;

const create_stoc_lunar = `
CREATE TABLE IF NOT EXISTS stoc_lunar_cinema (
    id SMALLINT,
    luna SMALLINT NOT NULL,
    an INTEGER NOT NULL,
    cantitate_ceruta SMALLINT NOT NULL,
    tip_produs SMALLINT,
    CONSTRAINT tip_produs_fk FOREIGN KEY (tip_produs) REFERENCES produse_cinema(id)
);
`;

const create_pret = `
CREATE TABLE IF NOT EXISTS pret_variabil_bilete (
    id SMALLINT,
    id_bilet SMALLINT,
    zi_schimbare_pret DATE DEFAULT CURRENT_DATE,
    interv_oral_pret INTERVAL NOT NULL,
    pret_ajustat SMALLINT,
    eveniment_special VARCHAR(70),
    CONSTRAINT pret_variabil_bilete_fk FOREIGN KEY (id_bilet) REFERENCES bilete_cinema(id),
    CONSTRAINT pret_variabil_bilete_pk PRIMARY KEY (id)
);
`;

const create_roluri = `
CREATE TABLE IF NOT EXISTS roluri_angajati_cinema (
    id_angajat SMALLINT,
    rol VARCHAR(50) NOT NULL,
    incepere_tura TIMESTAMP NOT NULL,
    final_tura TIMESTAMP NOT NULL,
    CONSTRAINT rol_ang_fk FOREIGN KEY (id_angajat) REFERENCES angajati_cinema(id_angajat),
    CONSTRAINT rol_ang_pk PRIMARY KEY (id_angajat, rol)
);
`;

const create_recenzii = `
CREATE TABLE IF NOT EXISTS recenzii_filme (
    id SMALLINT,
    id_client SMALLINT,
    id_film SMALLINT,
    text_recenzie VARCHAR(500),
    rating NUMERIC(2,1),
    CONSTRAINT recenzie_client_fk FOREIGN KEY (id_client) REFERENCES clienti_cinema(id),
    CONSTRAINT recenzie_film_fk FOREIGN KEY (id_film) REFERENCES filme(id),
    CONSTRAINT rec_film_pk PRIMARY KEY (id)
);
`;

const create_array = [
    create_actori, 
    create_filme,
    create_distributie_filme,
    create_sali_cinema,
    create_departamente,
    create_angajati,
    create_bilete,
    create_derulari,
    create_produse,
    create_clienti,
    create_produse_cumparate,
    create_stoc_lunar,
    create_pret,
    create_roluri,
    create_recenzii
]
module.exports = {create_array, dropTablesQuery}

