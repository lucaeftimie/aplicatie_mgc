const update_clienti_cinema = `
UPDATE clienti_cinema cc SET ora_plata_efectuata = df.ora_derulare - INTERVAL '10 minutes' FROM derulari_filme df WHERE cc.id_derulare_film = df.id AND cc.ora_plata_efectuata >= df.ora_derulare;
`

module.exports = { update_clienti_cinema}
