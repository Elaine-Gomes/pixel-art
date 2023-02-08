const container = document.querySelector('.container');

const gridwidth = document.getElementById('width-range');
const labelwidthvalue = document.getElementById('width-value');

const gridHeight = document.getElementById('height-range');
const labelHeightvalue = document.getElementById('height-value');

const clearGridButton = document.getElementById('clear-grid');
const colorButton = document.getElementById('color-input');
const eraseBtn = document.getElementById('erase-btn');
const paintBtn = document.getElementById('paint-btn');
const gridButton = document.getElementById('submit-grid');

const valueColor = document.getElementById('value-color');

valueColor.innerHTML = colorButton.value;
valueColor.style.color = colorButton.value;

colorButton.addEventListener('input', ()=>{
    valueColor.innerHTML = colorButton.value;
    valueColor.style.color = colorButton.value
    console.log(colorButton.value)
})

// Events objesct
let events = {
    mouse:{
        down: 'mousedown',
        move: 'mousemove',
        up: 'mouseup'
    },
    touch:{
        down: 'touchstart',
        move: 'touchmove',
        up: 'touchup'
    }
}

let deviceType = "";

//initially draw and erase would be false

let draw = false;
let erase = false;

//Detect touch device

/*Esse código é uma função JavaScript que
determina se o dispositivo que está
sendo usado é um dispositivo de toque ou não.
A função usa um teste de criação de evento 
para verificar se o dispositivo suporta eventos de toque.
Se o evento for criado com sucesso, significa que o
dispositivo suporta toques, então a variável deviceType é 
definida como 'toque' e a função retorna true. Se houver
uma exceção ao criar o evento, significa que o dispositivo 
não suporta toques, então a variável deviceType é definida 
como 'mouse' e a função retorna false.*/

const isTouchDevice = ()=>{
    try{
        document.createEvent('touchEvent');
        deviceType = 'touch';
        return true;
    }
    catch(e){
        deviceType = 'mouse';
        return false;
    }
}
isTouchDevice();
//Creat grid

gridButton.addEventListener('click',(e)=>{
   
   gridButton.className = 'active';
   clearGridButton.className ='';
   paintBtn.className =  ''
   eraseBtn.className = ''
   //Initially clear grid 
   container.innerHTML = "";

   //count variable for generating unique ids
   //variável de contagem para gerar IDs exclusivos
   let count = 0;

   //loop for creating rows

   for (let i = 0; i < gridHeight.value; i++) {
      count += 2;
      //Creat row div
      let div = document.createElement('div');
      div.classList.add('gridRow');
      //creat columns
      for (let i = 0; i < gridwidth.value; i++){
        count += 2;

        //we need unique id for all columns(for touch screen specifically
        /*precisamos de id único para todas as colunas 
         (para tela sensível ao toque especificamente)*/
        let col = document.createElement('div');
        col.classList.add('gridCol');
        col.setAttribute('id',`gridCol${count}`);

        /*
       for eg if deviceType = "mouse"
       the statement for the event would 
       be events [mouse].down  equal mousedown
       if deviceType = "touch"
       the statement for the event would 
       be events [touch].down  equal touchstart
       
 */
      col.addEventListener(events[deviceType].down, ()=>{
           draw = true;
           if(erase){
             col.style.backgroundColor = 'transparent'
           }else{
             col.style.backgroundColor = colorButton.value;
           }
      });
      col.addEventListener(events[deviceType].move, (e)=>{
            let elementId = document.elementFromPoint(
                !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                !isTouchDevice() ? e.clientY : e.touches[0].clientY,
            ).id;
            checker(elementId)
      });
      col.addEventListener(events[deviceType].up, ()=>{
            draw = false;
      });
      div.appendChild(col)
      }
      container.appendChild(div)
   }
   
});
function checker(elementId){
   let gridColumns = document.querySelectorAll('.gridCol');
   gridColumns.forEach((element)=>{
    if(elementId === element.id){
        if(draw && !erase){
            element.style.backgroundColor = colorButton.value
    
        } else if(draw && erase){
            element.style.backgroundColor = 'transparent'
        }
       }
   });
    
 }
 //Clear grid
clearGridButton.addEventListener('click',()=>{

    clearGridButton.className ='active';
    gridButton.className = ''
    paintBtn.className =  ''
    eraseBtn.className = ''

    container.innerHTML = ""
 });

 //Erase button
 eraseBtn.addEventListener('click', ()=>{

    eraseBtn.className = 'active'
    gridButton.className = ''
    clearGridButton.className ='';
    paintBtn.className =  ''
  
     erase = true;
 });

 paintBtn.addEventListener('click', ()=>{
    gridButton.className = ''
    clearGridButton.className ='';
    eraseBtn.className = ''
    paintBtn.className =  'active'
    erase = false;
 })

labelHeightvalue.innerHTML = gridwidth.value;
labelwidthvalue.innerHTML = gridwidth.value ;

const updateValueWidth = ()=>{
    labelwidthvalue.innerHTML = gridwidth.value 
}
const updateValueheight = ()=>{
    labelHeightvalue.innerHTML = gridHeight.value 
}

gridwidth.addEventListener('input',updateValueWidth);
gridHeight.addEventListener('input',updateValueheight);