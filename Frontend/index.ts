interface TodoInterface{ 
    id?:number,
    title?:string,
    date?:string,
    details?:string,
    complete?:boolean
}

class View{
    constructor(){

    }
    Create(todo:TodoInterface):boolean{
        State.Data.push(todo);
        return true;
    }
    update(id:number ,todo:TodoInterface):boolean{
      State.Data=State.Data.map(item=>{
            if(item.id===id){
                item.complete=todo.complete;
                item.date=todo.date;
                item.details=todo.details;
                item.title=todo.title;
            }
            return item;
        })
        return true;
    }
    Delete(id:number):boolean{
      State.Data=State.Data.filter(item=>{
        if(item.id !==id){
            return item;
        }
        })
        return true;
    }
}
class Controller extends View
{
    private form:HTMLFormElement;
    private title:HTMLInputElement;
    private textarea:HTMLInputElement;
    private date:HTMLInputElement;
    private Todos=document.getElementById("Todos") as HTMLDivElement;
    private complet=document.getElementById("complet") as HTMLDivElement;

   constructor(){
    super();
   
    this.form=document.getElementById('form') as HTMLFormElement;
    this.title=document.getElementById('title') as HTMLInputElement;
    this.textarea=document.getElementById('textarea') as HTMLInputElement;
    this.date=document.getElementById('date')as HTMLInputElement;
    this.form.addEventListener('submit',(e)=>{
        e.preventDefault();
      if(this.title.value===""|| this.textarea.value ===""|| this.date.value==="")
      {
        window.alert("Can`t Create an Empty Todo");
      }
      else{
        e.preventDefault();
        let newtodo:TodoInterface={};
        newtodo.complete=false;
        newtodo.date=this.date.value;
        newtodo.details=this.textarea.value;
        newtodo.title=this.title.value;
        newtodo.id=State.Data.length+1;

        fetch(`http://localhost:8001/`,{
            method:'POST',
            mode: 'cors',
            headers:{
                "Content-type":"application/json"
            },
            
            body:JSON.stringify ({
	            data:{
	            id:newtodo.id,
                title:newtodo.title,
                details:newtodo.details,
                complete:newtodo.complete,
                mdate:newtodo.date
                      }
}),
        }).then(res=>{
            return res.json()
        }).then(data=>{
            if(data.rowsAffected.length>=1){
                this.Create(newtodo);
                this.readTodos(); 
                window.alert("saved successfully")
            }
            else{
                window.alert("Failed Please Try again");
            }
           
        })
        .catch(err=>{
          window.alert("Creating error"+err)
            
        })
        this.title.value="";
        this.textarea.value="";
        this.date.value="";
        console.log(newtodo);
      }
    })
    
   }

   reload=()=>{
       while(this.Todos.firstChild){
           this.Todos.removeChild(this.Todos.firstChild); 
       }
       while(this.complet.firstChild){
        this.complet.removeChild(this.complet.firstChild); 
    }
   }
   readTodos=():boolean=>{
       console.log("reading.....");
    this.reload();
        State.Data.map(item=>{
           let div=document.createElement('div') as HTMLDivElement;
           div.id=`${item.id}`;
           div.className="todo-complete flex-c";
           let h4=document.createElement('h4') as HTMLElement;
           h4.textContent=item.title;
           let h5=document.createElement('h5') as HTMLElement;
           h5.textContent=item.date;
           let p=document.createElement('p') as HTMLElement;
           p.textContent=item.details;
           let small=document.createElement('small') as HTMLElement;
           small.textContent=this.date.value+ "completed at "+Date().toString();
           let btndiv=document.createElement('div') as HTMLDivElement;
           let btndelete=document.createElement('input') as HTMLInputElement
            btndelete.className="btnd";
            btndelete.value="Delete";
            btndelete.type="button";
           let btncreate=document.createElement('input') as HTMLInputElement
           btncreate.className="btnc";
           btncreate.value="Done";
           btncreate.type="button"
           div.appendChild(h4);
           div.appendChild(h5);
           div.appendChild(p);
           div.appendChild(small);
           btndiv.className="m-5";
         
            if(item.complete){
                this.complet.appendChild(div);
            }
            else{
                btndiv.appendChild(btndelete);
                btndiv.appendChild(btncreate);
               div.appendChild(btndiv);
               this.Todos.appendChild(div);
                btncreate.addEventListener('click',(e)=>{
                    State.Data=State.Data.map(item=>{
                        console.log(div.id);
                        
                        if(item.id===parseInt(div.id)){
                            item.complete=!item.complete;
                        }
                        return item;
                    })
                    this.readTodos(); 
                })
                btndelete.addEventListener('click',(e)=>{
                    e.preventDefault();
                    fetch(`http://localhost:8001/${div.id}`,{
                        method: 'DELETE',
                        mode: 'cors',
                    }).then(res=>{
                        return res.json()
                        
                    }).then(data=>{
                    this.Delete(parseInt(div.id));
                    this.readTodos(); 
                    })
                    .catch(err=>{
                        console.log(err);
                        
                    })
                    this.Delete(parseInt(div.id));
                    this.readTodos(); 
                })
                
            }
        })
    return true;
} 
}


let con=new Controller();

class State{
    static Data:TodoInterface[]=[];
     constructor(){    
     }
     Gdata=()=>{

         console.log("connecting");    
        fetch(`http://localhost:8001/`,{
            method: 'GET',
            mode: 'cors',
        }).then(res=>{
            return res.json()
            
        }).then(data=>{
             State.Data=data;
             console.log(State.Data);
             con.readTodos();
             
        })
        .catch(err=>{
            console.log(err);
            
        })
        console.log("done connecting");
        
    }
}
let state=new State().Gdata();


