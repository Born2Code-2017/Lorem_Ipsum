(function(){
var xhttp = new XMLHttpRequest();
var events;
xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        console.log('ready!');
        events = JSON.parse(xhttp.responseText);
        console.log(events);
        caricaEventi();
    }
}
xhttp.open('GET','./events.json');
xhttp.send();

function caricaEventi(){
    var section, i, label, ul, li, date, span, row, divCol4hr, divCol4date, hr, col4event, eventDiv, eventImage, title, insideElementRow, eventCreatorImage;
    section = document.getElementById('events');
    date = '----------';
    for (i = 0; i < events.length; i++){
        if (events[i].date !== date){
            if (date !== '----------'){
                section.appendChild(row);
            }
            row = document.createElement('div');
            row.className = 'row';
            divCol4hr = document.createElement('div');
            divCol4hr.className = 'col-4 hr';
            hr = document.createElement('hr');
            divCol4hr.appendChild(hr);
            row.appendChild(divCol4hr);
            divCol4date = document.createElement('div');
            divCol4date.className = 'col-4 date';
            span = document.createElement('span');
            if(events[i].date.substring(0,4) !== date.substring(0,4)){
                span.innerHTML = getDay(events[i]) + ' ' + getMonth(events[i]) + ' ' + getYear(events[i]);
            }
            else{
                if(events[i].date.substring(5,7) !== date.substring(5,7)){
                    span.innerHTML = getDay(events[i]) + '  '+ getMonth(events[i]);
                }
                else{
                    span.innerHTML = getDay(events[i]);
                }
            }
            divCol4date.appendChild(span);
            row.appendChild(divCol4date);
            divCol4hr = document.createElement('div');
            divCol4hr.className = 'col-4 hr';
            hr = document.createElement('hr');
            divCol4hr.appendChild(hr);
            row.appendChild(divCol4hr);
            section.appendChild(row);
            date = events[i].date;
            row = document.createElement('div');
            row.className = 'row';
        }
        col4event = document.createElement('div');
        col4event.className = 'col-4 event';
        eventDiv = document.createElement('div');
        eventDiv.className = 'event';
        eventImage = document.createElement('img');
        eventImage.title = 'event image';
        eventImage.src = events[i].image;
        eventDiv.appendChild(eventImage);
        title = document.createElement('p');
        title.title = 'event title';
        title.innerHTML = events[i].name;
        eventDiv.appendChild(title);
        insideElementRow = document.createElement('div');
        insideElementRow.className = 'row';
        span = document.createElement('span');
        span.title = 'event hour';
        span.innerHTML = events[i].timeStart.substring(0,5) + ' - ' + events[i].timeEnd.substring(0,5);
        insideElementRow.appendChild(span);
        eventCreatorImage = document.createElement('img');
        eventCreatorImage.src = 'img/avatar.png';
        eventCreatorImage.title = 'event organizer';
        insideElementRow.appendChild(eventCreatorImage);
        eventDiv.appendChild(insideElementRow);
        col4event.appendChild(eventDiv);
        row.appendChild(col4event);
    }
    section.appendChild(row);
}
function getYear(event){
    return event.date.substring(0,4);
}
function getMonth(event){
    switch (parseInt(event.date.substring(5,7))){
        case 01:
            return 'gennaio';
            break;
        case 02:
            return 'febbraio';
            break;
        case 03:
            return 'marzo';
            break;
        case 04:
            return 'aprile';
            break;
        case 05:
            return 'maggio';
            break;
        case 06:
            return 'giugno';
            break;
        case 07:
            return 'luglio';
            break;
        case 08:
            return 'agosto';
            break;
        case 09:
            return 'settembre';
            break;
        case 10:
            return 'ottobre';
            break;
        case 11:
            return 'novembre';
            break;
        case 12:
            return 'dicembre';
            break;
    }
}
function getDay(event){
    return event.date.substring(8);
}
})();