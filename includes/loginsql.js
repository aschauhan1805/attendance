const db = window.openDatabase('data', '1.0', 'data', 1*1024*1024);
function createdatabase()
{
    //console.log('Database created.');
    db.transaction(t => {
        t.executeSql('CREATE TABLE login (pwd TEXT)');
        t.executeSql('CREATE TABLE company (code TEXT)');
        t.executeSql('insert into login values(?)',['123']);
        t.executeSql('insert into company values(?)',['000']);
    }, e => console.error(e));
    
}
function validatelogin(secret,callback)
{
    var sql='select count(*) from login where  pwd=\'' + secret +'\'';
    //console.log(sql)
    db.transaction(t => {      
        t.executeSql(sql,[],
        function (tx, results) {   
            i= results.rows.length;
            //console.log('count ->' + i)    
            callback(i);
        },null);      
       
    }, e => console.error(e));
}
function readCompanyCode(callback)
{
    var sql='select code from company ';
    console.log(sql)
    db.transaction(t => {      
        t.executeSql(sql,[],
        function (tx, results) {   
            
            console.log('company code ->' + results.rows.item(0).code);
            callback(results.rows.item(0).code);
        },null);      
       
    }, e => console.error(e));
}
