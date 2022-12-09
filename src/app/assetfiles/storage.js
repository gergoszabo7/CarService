window.indexedDB = window.indexedDB || window.mozIndexed || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB){
    alert("This site is not supported in this browser");
}

var db;

var request = windows.indexedDB.open("cars",1);

request.onerror = function(event){
    console.log("error"+event.target.result);
}

request.onsuccess = function(event){
    db = request.result;
    console.log(db);
}

request.onupgradeneeded = function(event){
    var db;
    var objectStore = db.createObjectStore("cars");
}