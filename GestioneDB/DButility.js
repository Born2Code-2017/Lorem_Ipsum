var app = {
    
    users: [],
    currentUser: null,
    baseurl: "https://born2code-d2578.firebaseio.com/",

    init: function(){
        app.eventHandler();
        var url = app.baseurl + 'loremipsum/unimove/users.json';
        $.ajax({
            type: 'GET',
            url: url,
            contentType: 'application/json',
        }).done(app.onInitSuccess).fail(app.onInitError);
    },

    eventHandler: function(){
        $('#logDB').click(app.logDB);
        $('#save_btn').click(app.addUser);
        $('#user_list ul').on('click','.users',app.viewUser);
        $('#delete_btn').click(app.deleteUser);
        $('#deleteAll_btn').click(app.deleteAll);
        $('#clear_btn').click(app.clearFields);
    },

    onInitSuccess: function(data){
        if (data !== null)
            app.users = data;

        app.showUsers();
    },

    onInitError: function(e){
        console.log('Errore: ' + e.message);
    },

    showUsers: function(){
        var strLI = '';
        for (var i=0;i<app.users.length;i++)
            strLI += '<li class="users" data-id="' + i +
            '">Username: ' + app.users[i].username +
            '<br>Password: ' + app.users[i].password +
            '<br>Data di nascita: ' + app.users[i].dataNascita +
            '<br>Url foto profilo: ' + app.users[i].fotoProfilo +
            '<br>Facoltà: ' + app.users[i].facolta +
            '<br>Eventi a cui partecipa: ' + app.users[i].partecipaEventi +
            '<br>Eventi creati: ' + app.users[i].tuoiEventi +
            '</li><br>';
        $("#user_list ul").html(strLI);
    },
    
    addUser: function(){
        let newUser = new User();
        newUser.username = $('#user').val();
        newUser.password = $('#password').val();
        newUser.dataNascita = $('#birth').val();
        newUser.fotoProfilo = $('#photo').val();
        newUser.facolta = $('#facolta').val();
        newUser.partecipaEventi = $('#partecipa').val().split(',');
        newUser.tuoiEventi = $('#creati').val().split(',');
        if (app.currentUser === null){
            app.users.push(newUser);
            app.showUsers();
            app.putUsers();
            app.clearFields();
        }
        else{
            app.users[app.currentUser] = newUser;
            app.showUsers();
            app.putUsers();
            app.clearFields();
        }
    },
    
    viewUser: function(){
        app.currentUser = $(this).data('id');
        $('#user').val(app.users[app.currentUser].username);
        $('#password').val(app.users[app.currentUser].password);
        $('#birth').val(app.users[app.currentUser].dataNascita);
        $('#photo').val(app.users[app.currentUser].fotoProfilo);
        $('#facolta').val(app.users[app.currentUser].facolta);
        let partecipa = '';
        for (event of app.users[app.currentUser].partecipaEventi){
            partecipa += event + ',';
        }
        partecipa = partecipa.replace(/(\s+)?.$/, '');
        $('#partecipa').val(partecipa);
        let crea = '';
        for (event of app.users[app.currentUser].tuoiEventi){
            crea += event + ',';
        }
        crea = crea.replace(/(\s+)?.$/, '');
        $('#creati').val(crea);
    },
    
    deleteUser: function(){
        if(app.currentUser !== null){
            app.users.splice(app.currentUser, 1);
            app.showUsers();
            /*var url = app.baseurl + 'loremipsum/unimove/users/' + app.currentUser + '.json';
            $.ajax({
                type: 'DELETE',
                url: url,
                contentType: "application/json",
            }).done(app.onPutSuccess).fail(app.onPutError);*/
            app.putUsers();
            app.clearFields();
        }
    },

    deleteAll: function(){
        app.users = [];
        app.showUsers();
        app.putUsers();
    },

    clearFields: function(){
        $('#user').val('');
        $('#password').val('');
        $('#birth').val('');
        $('#photo').val('');
        $('#facolta').val('');
        $('#partecipa').val('');
        $('#creati').val('');
        app.currentUser = null;
    },
    
    /*putUser: function(n){
        var jsondata = JSON.stringify(app.users[n]);
        var url = app.baseurl + 'loremipsum/unimove/users/' + n + '.json';
        $.ajax({
            type: 'POST',
            url: url,
            contentType: "application/json",
            data: jsondata
        }).done(app.onPutSuccess).fail(app.onPutError);
    },*/

    putUsers: function(){
        var jsondata = JSON.stringify(app.users);
        var url = app.baseurl + 'loremipsum/unimove/users.json';
            $.ajax({
                type: 'PUT',
                url: url,
                contentType: "application/json",
                data: jsondata
            }).done(app.onPutSuccess).fail(app.onPutError);
    },

    onPutSuccess: function(){},

    onPutError: function(){
         console.log('Errore: ' + e.message);
    },

    logDB: function(){
        var url = app.baseurl + 'loremipsum/unimove.json';
        $.ajax({
            type: 'GET',
            url: url,
            contentType: 'application/json',
        }).done(app.onLogDBSuccess).fail(app.onLogDBError);

    },
    
    onLogDBSuccess: function(data){
        console.log(data);
    },

    onLogDBError: function(e){
        console.log('Errore: ' + e.message);
    }
};

User = function(){
    username = '';
    password = '';
    dataNascita = '';
    fotoProfilo = '';
    facolta = '';
    partecipaEventi = [];
    tuoiEventi = [];
};

$(document).ready(app.init);