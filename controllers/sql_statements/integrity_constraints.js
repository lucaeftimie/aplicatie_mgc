const integrityConstraintsQuery = `

ALTER TABLE filme DROP CONSTRAINT IF EXISTS film_rating;
ALTER TABLE pret_variabil_bilete DROP CONSTRAINT IF EXISTS interval_orar_pozitiv;

ALTER TABLE sali_cinema DROP CONSTRAINT IF EXISTS nr_max_sala;

ALTER TABLE angajati_cinema DROP CONSTRAINT IF EXISTS email_valid;

ALTER TABLE produse_cumparate DROP CONSTRAINT IF EXISTS prod_mai_mare_ca_zero;

ALTER TABLE stoc_lunar_cinema DROP CONSTRAINT IF EXISTS luna_valida;

ALTER TABLE stoc_lunar_cinema DROP CONSTRAINT IF EXISTS stoc_mai_mare_ca_zero;

ALTER TABLE roluri_angajati_cinema DROP CONSTRAINT IF EXISTS rol_tura_valida;

ALTER TABLE recenzii_filme DROP CONSTRAINT IF EXISTS rec_rating;

ALTER TABLE angajati_cinema DROP CONSTRAINT IF EXISTS unic_angajat;

ALTER TABLE distributie_filme DROP CONSTRAINT IF EXISTS unic_film_actor;

ALTER TABLE filme
ADD CONSTRAINT film_rating CHECK (rating BETWEEN 1.0 AND 5.0);

ALTER TABLE distributie_filme
ADD CONSTRAINT unic_film_actor UNIQUE (id_film, id_actor);

ALTER TABLE pret_variabil_bilete
ADD CONSTRAINT interval_orar_pozitiv CHECK (interv_oral_pret > INTERVAL '0');

ALTER TABLE sali_cinema
ADD CONSTRAINT nr_max_sala CHECK (nr_locuri <= 100);

ALTER TABLE angajati_cinema
ADD CONSTRAINT email_valid CHECK (TRIM(email) ~* '^[a-z0-9._%+-]+@(cinema\.ro)$');

ALTER TABLE angajati_cinema
ADD CONSTRAINT unic_angajat UNIQUE (nr_telefon, email);

ALTER TABLE produse_cumparate
ADD CONSTRAINT prod_mai_mare_ca_zero CHECK (cantitate_produs > 0);

ALTER TABLE stoc_lunar_cinema
ADD CONSTRAINT luna_valida CHECK (luna BETWEEN 1 AND 12);

ALTER TABLE stoc_lunar_cinema
ADD CONSTRAINT stoc_mai_mare_ca_zero CHECK (cantitate_ceruta > 0);

ALTER TABLE roluri_angajati_cinema
ADD CONSTRAINT rol_tura_valida CHECK (incepere_tura < final_tura);

ALTER TABLE recenzii_filme
ADD CONSTRAINT rec_rating CHECK (rating BETWEEN 1.0 AND 5.0);
`
module.exports = integrityConstraintsQuery;	
