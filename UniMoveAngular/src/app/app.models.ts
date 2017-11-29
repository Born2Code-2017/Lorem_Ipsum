export class User{
    username: string;
    password: string;
    dataDiNascita: string;
    urlFotoProfilo: string;
    facolta: string;
    partecipa: number[];
    creati: number[];
};
export class Event{
    titolo: string;
    categoria: number;
    descrizione: string;
    immagine: string;
    data: string;
    luogo: string;
    owner: User;
    partecipanti: number[];
}