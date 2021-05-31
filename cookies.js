function updateUI(){
    if(countTasks().total>0){

    const tasks= getCookies()

    document.getElementById("list").innerHTML=""
    tasks.map(task=>{
        //task create
        var li = document.createElement("li");
        var value = task.title;
        var t = document.createTextNode(value);
        li.appendChild(t);

        //update ui list
        document.getElementById("list").appendChild(li);
        li.addEventListener('click', function(ev) {
            if (ev.target.tagName === 'LI') {
                console.log("triggering",task.id)
            toggleTask(task.id)
            }
          }, false); 
        if(task.status){
        li.classList.toggle('checked');
        }
        // li.onclick=()=>{
        //     updateTask(task.id)
        // }
        
        //task close button
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.onclick=()=>{removeTask(task.id)}
        span.appendChild(txt);
        li.appendChild(span);
    })
}
else{
    document.getElementById("list").innerHTML=""
}

}

function getCookies(){
if(document.cookie.indexOf('Tasks')==-1){
    return []
}
else{
cookiearray=document.cookie.split(';')
const tasks= JSON.parse(cookiearray[1].split('=')[1]);
 return tasks
}   
}
function updateCookies(tasks){
const task_variable_name="Tasks"
document.cookie = task_variable_name+'='+ JSON.stringify(tasks) +';'
updateUI()
}

function AddTask(title){
const id=Math.floor(Math.random()*1000)
var tasks=[]
if(countTasks().total>0){
    tasks= getCookies()
}
tasks.push({"id":id,"title":title,"status":0});
updateCookies(tasks)
}

function countTasks(){
if(document.cookie.indexOf('Tasks')==-1){
    return {total:0,completed:0,pending:0}
}
else{
const tasks=getCookies()
 var total=0;
 var completed=0;
 var pending=0;
 tasks.map(task=>{
     total++;
     if(task.status){
         completed++;
     }
     else{
         pending++;
     }
 })  
 return {total:total,completed:completed,pending:pending}
}
}

function removeTask(id){

if(countTasks().total>0){
    const tasks= getCookies()
    for(var i=0; i<tasks.length; i++) {

        if(tasks[i].id == id) {
            tasks.splice(i, 1);
            updateCookies(tasks)
            break;
        }
    }
    updateUI();
}
}

function toggleTask(id){
if(countTasks().total>0){
    const tasks= getCookies()
    for(var i=0; i<tasks.length; i++) {
        if(tasks[i].id == id) {
          tasks[i].status=tasks[i].status==0?1:0
         updateCookies(tasks)
        }
    }

}
updateUI();
}
function removeAllTasks(){
updateCookies([])
}

function loadname(){
const name_variable_name="Name"
if(document.cookie.indexOf(name_variable_name)==-1){
var name=window.prompt("Enter your name!")
if(name){
document.cookie=name_variable_name+"="+name.toString()+";"
}
else{
    loadname()
}
}
else{
document.getElementById("username").innerHTML=getName()
updateUI()
}
}

function getName(){
if(document.cookie.indexOf("Name")!=-1){
    cookiearray=document.cookie.split(';')
    const name= cookiearray[0].split('=')[1];
     return name;
}   
}
