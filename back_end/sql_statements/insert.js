const delete_data = `
DELETE FROM distributie_filme;
DELETE FROM actori;
DELETE FROM recenzii_filme;
DELETE FROM produse_cumparate;
DELETE FROM pret_variabil_bilete;
DELETE FROM clienti_cinema;
DELETE FROM bilete_cinema;
DELETE FROM stoc_lunar_cinema;
DELETE FROM produse_cinema;
DELETE FROM roluri_angajati_cinema;
DELETE FROM angajati_cinema;
DELETE FROM departamente_cinema;
DELETE FROM derulari_filme;
DELETE FROM sali_cinema;
DELETE FROM filme;
`
const insert_into_actori = `
INSERT INTO actori VALUES (1, 'DiCaprio', 'Leonardo');
INSERT INTO actori VALUES (2, 'Roberts', 'Julia');
INSERT INTO actori VALUES (3, 'Depp', 'Johnny');
INSERT INTO actori VALUES (4, 'Lawrence', 'Jennifer');
INSERT INTO actori VALUES (5, 'Smith', 'Will');
INSERT INTO actori VALUES (6, 'Theron', 'Charlize');
INSERT INTO actori VALUES (7, 'Downey', 'Robert');
INSERT INTO actori VALUES (8, 'Blunt', 'Emily');
INSERT INTO actori VALUES (9, 'Clooney', 'George');
INSERT INTO actori VALUES(10, 'Jolie', 'Angelina');
`
const insert_into_filme = `
INSERT INTO filme VALUES (1, 'Inception', 'Sci-Fi', '2010-07-16', 148, 4.57);
INSERT INTO filme VALUES (2, 'Pretty Woman', 'Romance', '1990-03-23', 119, 3.21);
INSERT INTO filme VALUES (3, 'Pirates of the Caribbean', 'Adventure', '2003-07-09', 143, 3.93);
INSERT INTO filme VALUES (4, 'Hunger Games', 'Action', '2012-03-23', 142, 3.38);
INSERT INTO filme VALUES (5, 'I Am Legend', 'Drama', '2007-12-14', 101, 3.38);
INSERT INTO filme VALUES (6, 'Mad Max: Fury Road', 'Action', '2015-05-15', 120, 4.17);
INSERT INTO filme VALUES (7, 'Iron Man', 'Action', '2008-05-02', 126, 3.82);
INSERT INTO filme VALUES (8, 'A Quiet Place', 'Horror', '2018-04-06', 90, 3.57);
INSERT INTO filme VALUES (9, 'Gravity', 'Sci-Fi', '2013-10-04', 91, 3.73);
INSERT INTO filme VALUES (10, 'Salt', 'Action', '2010-07-23', 100, 2.50);
`
const insert_into_distributie_filme = `
INSERT INTO distributie_filme VALUES (1, 1); 
INSERT INTO distributie_filme VALUES (2, 2); 
INSERT INTO distributie_filme VALUES (3, 3); 
INSERT INTO distributie_filme VALUES (4, 4); 
INSERT INTO distributie_filme VALUES (5, 5);
INSERT INTO distributie_filme VALUES (6, 6); 
INSERT INTO distributie_filme VALUES (7, 7); 
INSERT INTO distributie_filme VALUES  (8, 8); 
INSERT INTO distributie_filme VALUES (9, 9); 
INSERT INTO distributie_filme VALUES (10, 10);
`
const insert_into_sali_cinema = `
INSERT INTO sali_cinema VALUES (1, 1, 100); 
INSERT INTO sali_cinema VALUES(2, 2, 65); 
INSERT INTO sali_cinema VALUES (3, 3, 45); 
INSERT INTO sali_cinema VALUES (4, 4, 86); 
INSERT INTO sali_cinema VALUES (5, 5, 28);
INSERT INTO sali_cinema VALUES(6, 6, 49); 
INSERT INTO sali_cinema VALUES (7, 7, 55); 
INSERT INTO sali_cinema VALUES (8, 8, 58); 
INSERT INTO sali_cinema VALUES (9, 9, 100); 
INSERT INTO sali_cinema VALUES (10, 10, 65);
`
const insert_into_departamente_cinema = `
INSERT INTO departamente_cinema VALUES (1, 'Marketing'); 
INSERT INTO departamente_cinema VALUES(2, 'HR'); 
INSERT INTO departamente_cinema VALUES(3, 'Sales'); 
INSERT INTO departamente_cinema VALUES(4, 'IT'); 
INSERT INTO departamente_cinema VALUES(5, 'Operations');
INSERT INTO departamente_cinema VALUES(6, 'Finance'); 
INSERT INTO departamente_cinema VALUES(7, 'Customer Service');
INSERT INTO departamente_cinema VALUES(8, 'Logistics');
INSERT INTO departamente_cinema VALUES(9, 'Cleaning');
INSERT INTO departamente_cinema VALUES(10, 'Security');
`
const insert_into_angajati_cinema = `
INSERT INTO angajati_cinema VALUES (1, NULL, 'Popescu', 'Andrei', '0723000001', trim('andrei.popescu@cinema.ro'), 3500, 1);
INSERT INTO angajati_cinema VALUES (2, 1, 'Ionescu', 'Maria', '0723000002', trim('maria.ionescu@cinema.ro'), 3000, 2);
INSERT INTO angajati_cinema VALUES (3, 1, 'Georgescu', 'Ion', '0723000003', trim('ion.georgescu@cinema.ro'), 2800, 3);
INSERT INTO angajati_cinema VALUES (4, 2, 'Avram', 'Elena', '0723000004', trim('elena.avram@cinema.ro'), 3200, 4);
INSERT INTO angajati_cinema VALUES (5, 3, 'Dumitru', 'Ana', '0723000005', trim('ana.dumitru@cinema.ro'), 2700, 5);
INSERT INTO angajati_cinema VALUES (6, 3, 'Barbu', 'Mihai', '0723000006', trim('mihai.barbu@cinema.ro'), 2900, 6);
INSERT INTO angajati_cinema VALUES (7, 4, 'Stan', 'Ioana', '0723000007', trim('ioana.stan@cinema.ro'), 3100, 7);
INSERT INTO angajati_cinema VALUES (8, 5, 'Lupu', 'George', '0723000008', trim('george.lupu@cinema.ro'), 3400, 8);
INSERT INTO angajati_cinema VALUES (9, 6, 'Radu', 'Laura', '0723000009', trim('laura.radu@cinema.ro'), 3300, 9);
INSERT INTO angajati_cinema VALUES (10, 7, 'Preda', 'Victor', '0723000010', trim('victor.preda@cinema.ro'), 3500, 10);
INSERT INTO angajati_cinema VALUES (11, 8, 'Mihai', 'Georgescu', '0751009809', trim('mihai.georgescu@cinema.ro'), 330, 9);
INSERT INTO angajati_cinema VALUES (12, 4, 'Ioana', 'Antonescu', '0709009152', trim('ioana.antonescu@cinema.ro'), 3900, 6);
`


const insert_into_bilete_cinema = `
INSERT INTO bilete_cinema VALUES(1, 30.00, 1);
INSERT INTO bilete_cinema VALUES(2, 50.00, 2);
INSERT INTO bilete_cinema VALUES(3, 25.00, 3);
INSERT INTO bilete_cinema VALUES(4, 40.00, 4);
INSERT INTO bilete_cinema VALUES(5, 60.00, 5);
INSERT INTO bilete_cinema VALUES(6, 20.00, 6);
INSERT INTO bilete_cinema VALUES(7, 35.00, 7);
INSERT INTO bilete_cinema VALUES(8, 45.00, 8);
INSERT INTO bilete_cinema VALUES(9, 15.00, 9);
INSERT INTO bilete_cinema VALUES(10, 20.00, 10);
`


const insert_into_derulari_filme = `
INSERT INTO derulari_filme VALUES(1, 1, 1, TIMESTAMP '2023-12-01 14:00:00');
INSERT INTO derulari_filme VALUES(2, 2, 2, TIMESTAMP '2023-12-01 16:00:00');
INSERT INTO derulari_filme VALUES(3, 3, 3, TIMESTAMP '2023-12-01 18:00:00');
INSERT INTO derulari_filme VALUES(4, 4, 4, TIMESTAMP '2023-12-01 20:00:00');
INSERT INTO derulari_filme VALUES(5, 5, 5, TIMESTAMP '2023-12-01 22:00:00');
INSERT INTO derulari_filme VALUES(6, 6, 6, TIMESTAMP '2023-12-02 14:00:00');
INSERT INTO derulari_filme VALUES(7, 7, 7, TIMESTAMP '2023-12-02 16:00:00');
INSERT INTO derulari_filme VALUES(8, 8, 8, TIMESTAMP '2023-12-02 18:00:00');
INSERT INTO derulari_filme VALUES(9, 9, 9, TIMESTAMP '2023-12-02 20:00:00');
INSERT INTO derulari_filme VALUES(10, 10, 10, TIMESTAMP '2023-12-02 22:00:00');
`
const insert_into_produse_cinema = `
INSERT INTO produse_cinema VALUES(1, 10.00, 'Popcorn');
INSERT INTO produse_cinema VALUES(2, 5.00, 'Soda');
INSERT INTO produse_cinema VALUES(3, 15.00, 'Combo Pack');
INSERT INTO produse_cinema VALUES(4, 8.00, 'Candy');
INSERT INTO produse_cinema VALUES(5, 12.00, 'Nachos');
INSERT INTO produse_cinema VALUES(6, 20.00, 'Hot Dog');
INSERT INTO produse_cinema VALUES(7, 25.00, 'Premium Combo');
INSERT INTO produse_cinema VALUES(8, 30.00, 'Family Pack');
INSERT INTO produse_cinema VALUES(9, 4.00, 'Water');
INSERT INTO produse_cinema VALUES(10, 18.00, 'Ice Cream');
`
const insert_into_clienti_cinema = `
INSERT INTO clienti_cinema VALUES (1, 7, 5, 'Card', TO_TIMESTAMP('2023-12-01 14:10:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (2, 10, 2, 'Cash', TO_TIMESTAMP('2023-12-01 16:15:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (3, 3, 6, 'Card', TO_TIMESTAMP('2023-12-01 18:20:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (4, 5, 8, 'Cash', TO_TIMESTAMP('2023-12-01 20:25:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (5, 8, 1, 'Card', TO_TIMESTAMP('2023-12-01 22:30:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (6, 1, 9, 'Cash', TO_TIMESTAMP('2023-12-02 14:10:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (7, 4, 10, 'Card', TO_TIMESTAMP('2023-12-02 16:15:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (8, 9, 3, 'Cash', TO_TIMESTAMP('2023-12-02 18:20:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (9, 6, 7, 'Card', TO_TIMESTAMP('2023-12-02 20:25:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (10, 2, 4, 'Cash', TO_TIMESTAMP('2023-12-02 22:30:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (11, 7, 5, 'Card', TO_TIMESTAMP('2023-12-01 14:30:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (12, 10, 2, 'Cash', TO_TIMESTAMP('2023-12-01 16:35:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (13, 3, 6, 'Card', TO_TIMESTAMP('2023-12-01 18:40:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (14, 5, 8, 'Cash', TO_TIMESTAMP('2023-12-01 20:35:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (15, 8, 1, 'Card', TO_TIMESTAMP('2023-12-01 22:40:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (16, 1, 9, 'Cash', TO_TIMESTAMP('2023-12-02 14:50:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (17, 4, 10, 'Card', TO_TIMESTAMP('2023-12-02 16:35:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (18, 9, 3, 'Cash', TO_TIMESTAMP('2023-12-02 18:40:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (19, 6, 7, 'Card', TO_TIMESTAMP('2023-12-02 20:45:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO clienti_cinema VALUES (20, 2, 4, 'Cash', TO_TIMESTAMP('2023-12-02 22:50:00', 'YYYY-MM-DD HH24:MI:SS'));
`
const insert_into_produse_cumparate = `
INSERT INTO produse_cumparate VALUES(1, 4, 3, 2);
INSERT INTO produse_cumparate VALUES(2, 6, 1, 3);
INSERT INTO produse_cumparate VALUES(3, 8, 5, 1);
INSERT INTO produse_cumparate VALUES(4, 2, 8, 4);
INSERT INTO produse_cumparate VALUES(5, 10, 7, 2);
INSERT INTO produse_cumparate VALUES(6, 3, 10, 5);
INSERT INTO produse_cumparate VALUES(7, 7, 6, 3);
INSERT INTO produse_cumparate VALUES(8, 5, 4, 2);
INSERT INTO produse_cumparate VALUES(9, 1, 9, 4);
INSERT INTO produse_cumparate VALUES(10, 9, 2, 1);
INSERT INTO produse_cumparate VALUES(11, 8, 1, 1);
INSERT INTO produse_cumparate VALUES(12, 2, 1, 2);
INSERT INTO produse_cumparate VALUES (13, 10, 1, 6);
`
const insert_into_stoc_lunar_cinema = `
INSERT INTO stoc_lunar_cinema VALUES(1, 6, 2023, 300, 4);
INSERT INTO stoc_lunar_cinema VALUES(2, 2, 2023, 150, 5);
INSERT INTO stoc_lunar_cinema VALUES(3, 7, 2023, 400, 7);
INSERT INTO stoc_lunar_cinema VALUES(4, 9, 2023, 200, 6);
INSERT INTO stoc_lunar_cinema VALUES(5, 10, 2023, 700, 3);
INSERT INTO stoc_lunar_cinema VALUES(6, 3, 2023, 250, 8);
INSERT INTO stoc_lunar_cinema VALUES(7, 8, 2023, 500, 10);
INSERT INTO stoc_lunar_cinema VALUES(8, 1, 2023, 100, 9);
INSERT INTO stoc_lunar_cinema VALUES(9, 4, 2023, 180, 2);
INSERT INTO stoc_lunar_cinema VALUES(10, 5, 2023, 600, 1);
`
const insert_into_pret_variabil_bilete = `
INSERT INTO pret_variabil_bilete VALUES(1, 1, DATE '2024-12-25', INTERVAL '12 hours', 40.00, 'Holiday');
INSERT INTO pret_variabil_bilete VALUES(2, 2, DATE '2024-08-15', INTERVAL '9 hours', 50.00, NULL);
INSERT INTO pret_variabil_bilete VALUES(3, 3, DATE '2024-01-01', INTERVAL '18 hours', 30.00, 'Special Event');
INSERT INTO pret_variabil_bilete VALUES(4, 4, DATE '2024-10-20', INTERVAL '21 hours', 60.00, 'Weekend');
INSERT INTO pret_variabil_bilete VALUES(5, 5, DATE '2024-03-13', INTERVAL '13 hours', 55.00, NULL);
INSERT INTO pret_variabil_bilete VALUES(6, 6, DATE '2024-12-24', INTERVAL '17 hours', 25.00, 'Holiday');
INSERT INTO pret_variabil_bilete VALUES(7, 7, DATE '2024-04-11', INTERVAL '11 hours', 35.00, NULL);
INSERT INTO pret_variabil_bilete VALUES(8, 8, DATE '2024-06-15', INTERVAL '14 hours', 45.00, 'Festival');
INSERT INTO pret_variabil_bilete VALUES(9, 9, DATE '2024-02-15', INTERVAL '15 hours', 40.00, 'Special Event');
INSERT INTO pret_variabil_bilete VALUES(10, 10, DATE '2024-10-16', INTERVAL '16 hours', 28.00, 'Weekend');
`
const alter_table_roluri_angajati_cinema = `
ALTER TABLE roluri_angajati_cinema ALTER COLUMN final_tura DROP NOT NULL;
`
const insert_into_roluri_angajati_cinema = `
INSERT INTO roluri_angajati_cinema VALUES(1, 'Marketing Manager', TO_TIMESTAMP('2025-01-01 08:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2025-01-01 16:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO roluri_angajati_cinema VALUES(2, 'HR Specialist', TO_TIMESTAMP('2025-01-01 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2025-01-01 17:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO roluri_angajati_cinema VALUES(3, 'Sales Associate', TO_TIMESTAMP('2025-01-01 10:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2025-01-01 18:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO roluri_angajati_cinema VALUES(4, 'IT Support Specialist', TO_TIMESTAMP('2025-01-01 08:30:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2025-01-01 16:30:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO roluri_angajati_cinema VALUES(5, 'Operations Coordinator', TO_TIMESTAMP('2025-01-01 07:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2025-01-01 15:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO roluri_angajati_cinema VALUES(6, 'Finance Analyst', TO_TIMESTAMP('2025-01-01 09:30:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2025-01-01 17:30:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO roluri_angajati_cinema VALUES(7, 'Customer Service Representative', TO_TIMESTAMP('2025-01-01 10:30:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2025-01-01 18:30:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO roluri_angajati_cinema VALUES(8, 'Logistics Manager', TO_TIMESTAMP('2025-01-01 06:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2025-01-01 14:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO roluri_angajati_cinema VALUES(9, 'Cleaning Staff', TO_TIMESTAMP('2025-01-01 05:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2025-01-01 13:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO roluri_angajati_cinema VALUES(10, 'Security Officer', TO_TIMESTAMP('2025-01-01 11:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2025-01-01 19:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO roluri_angajati_cinema VALUES(5, 'Cashier', TO_TIMESTAMP('2025-03-04 12:00:00', 'YYYY-MM-DD HH24:MI:SS'), NULL);
INSERT INTO roluri_angajati_cinema VALUES(7, 'Ticket Validation', TO_TIMESTAMP('2025-04-05 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), NULL);
INSERT INTO roluri_angajati_cinema VALUES(11, 'Bathroom cleaning', TO_TIMESTAMP('2025-01-05 08:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2025-01-05 18:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO roluri_angajati_cinema VALUES(12, 'Sales Reporting', TO_TIMESTAMP('2025-01-04 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2025-01-04 19:00:00', 'YYYY-MM-DD HH24:MI:SS'));
`
const insert_into_recenzii_filme = `
INSERT INTO recenzii_filme (id, id_client, id_film, text_recenzie, rating) VALUES(1, 1, 7, 'Amazing!', 5.0);
INSERT INTO recenzii_filme (id, id_client, id_film, text_recenzie, rating) VALUES(2, 5, 3, 'Good.', 4.0);
INSERT INTO recenzii_filme (id, id_client, id_film, text_recenzie, rating) VALUES(3, 8, 10, 'Okay.', 3.0);
INSERT INTO recenzii_filme (id, id_client, id_film, text_recenzie, rating) VALUES(4, 4, 9, 'Meh.', 2.5);
INSERT INTO recenzii_filme (id, id_client, id_film, text_recenzie, rating) VALUES(5, 6, 2, 'Loved!', 5.0);
INSERT INTO recenzii_filme (id, id_client, id_film, text_recenzie, rating) VALUES(6, 3, 8, 'Bad.', 1.5);
INSERT INTO recenzii_filme (id, id_client, id_film, text_recenzie, rating) VALUES(7, 7, 4, 'Wow!', 5.0);
INSERT INTO recenzii_filme (id, id_client, id_film, text_recenzie, rating) VALUES(8, 9, 5, 'Cool.', 4.5);
INSERT INTO recenzii_filme (id, id_client, id_film, text_recenzie, rating) VALUES(9, 2, 6, 'Eh.', 2.0);
INSERT INTO recenzii_filme (id, id_client, id_film, text_recenzie, rating) VALUES(10, 10, 1, 'Great!', 4.5);
`

const insert_array = [
    insert_into_actori,
    insert_into_filme,
    insert_into_distributie_filme,
    insert_into_sali_cinema,
    insert_into_departamente_cinema,
    insert_into_angajati_cinema,
    insert_into_bilete_cinema,
    insert_into_derulari_filme,
    insert_into_produse_cinema,
    insert_into_clienti_cinema,
    insert_into_produse_cumparate,
    insert_into_stoc_lunar_cinema,
    insert_into_stoc_lunar_cinema,
    insert_into_pret_variabil_bilete,
    insert_into_roluri_angajati_cinema,
    insert_into_recenzii_filme
]

module.exports = {insert_array, alter_table_roluri_angajati_cinema, delete_data}
