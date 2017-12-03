export class User{
    id: number;
    username: string;
    nome: string;
    cognome: string;
    password: string;
    dataDiNascita: string;
    fotoProfilo: string;
    facolta: string;
    partecipa: number[];
    creati: number[];
};
export class Event{
    id: number;
    titolo: string;
    categoria: number;
    descrizione: string;
    immagine: string;
    data: string;
    start: string;
    end: string;
    luogo: string;
    owner: number;
    partecipanti: number[];
}