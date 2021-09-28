/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

let db;

function entrar(){
    console.log("function entrar(){...");
    console.log(db);

    let login = document.getElementById("loginSen").value;
    let pass = document.getElementById("loginSen").value;

        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO usuarios VALUES (?,?)', [login, pass]);
        }, function(error) {
            alert('Erro durante a transacao com o banco: ' + error.message);
        }, function() {
            alert('Insercao realizada com sucesso!!!');
        });
    }
}

function criarconta(){
    console.log("function criar(){...");
    console.log(db);

    db.executeSql(
        'SELECT login AS uLoginName, pass AS uPassword FROM usuarios', [], function(rs) {
            alert(JSON.stringify(rs));
            alert(rs.rows.length);
            let i = 0;
            for(i = 0; i < rs.rows.length; i++){
                alert("item "+i);
                let recordItem = rs.rows.item(i);
                alert(JSON.stringify(recordItem));
            }                
    }, function(error) {
        alert('Erro no SELECT: ' + error.message);
    });
}


function inicializarbanco(){
    console.log("function inicializarbanco(){...")
    db = window.sqlitePlugin.openDatabase({
        name: "my db",
        location: "default",
        androidDatabaseProvider: "system"
    });

    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (login, pass)');
    }, function(error) {
        console.log('Transaction ERROR: ' + error.message);
    }, function() {
        alert('Banco e Tabela usuarios criados com sucesso!!!');
    });
}


function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    inicializarbanco();

    document.getElementById("loginBut").addEventListener("click", app.entrar);
    document.getElementById("loginBut-criar").addEventListener("click", app.criarconta);
    this.receivedEvent('deviceready');

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
