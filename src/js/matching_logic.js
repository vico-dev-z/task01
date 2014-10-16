


// code for generate the table
var matrixSize = document.getElementById("matrix_size");
var message = document.getElementById("message");
var matrixGraphic = document.getElementById("matrix_graphic");
var matrixGenerator = document.getElementById("generator");
var matrixReset= document.getElementById("reset");
matrixReset.disabled=true;
var size=1;
var maxNumber;

var mAllocation = [];
var lastCellId = null;
var Elements = [];
var revealedCounter = 0;
var revealedArray = [];
var successfulAttempts=0;

var successMessage=document.getElementById("success");


var handleMouseover = function (e) {
    var target = e.target || e.srcElement;
    lastCellId = target.id;
    var cellTemp = document.getElementById(lastCellId );

    if(successfulAttempts==0 || (successfulAttempts % 2 ==0)) {
        revealedArray[revealedCounter]=mAllocation[lastCellId];
        revealedCounter++;

        cellTemp.style.color = "#708090";
        cellTemp.className = cellTemp.className.replace( /(?:^|\s)notselected(?!\S)/g , '' );
        successfulAttempts++;
    }
    else{
        if (revealedArray.contains(mAllocation[lastCellId]))
        {
            revealedArray[revealedCounter]=mAllocation[lastCellId];
            revealedCounter++;

            cellTemp.style.color = "#708090";
            cellTemp.className = cellTemp.className.replace( /(?:^|\s)notselected(?!\S)/g , '' );
            successfulAttempts++;
        }
        else{

            cellTemp.style.color = "#708090";
            cellTemp.className = cellTemp.className.replace( /(?:^|\s)notselected(?!\S)/g , '' );

            var handle= setTimeout(function() {

                cellTemp.style.color = "transparent";
                cellTemp.className+=" notselected";
            }, 1000);
          //  clearTimeout(handle);

        }
    }

     if(mAllocation.length==successfulAttempts){

         successMessage.style.visibility="visible";

     }



};

function reveal(element){


}

Array.prototype.contains = function(k) {
    for(var i=0; i < this.length; i++){
        if(this[i] == k){
            return true;
        }
    }
    return false;
}

matrixSize.addEventListener("click", function(event) {
    size=matrixSize.value;
    if (size!=1){
        message.innerHTML="The Matrix will have: " + size + " rows and " + size + " columns ";
    }
}, false);

matrixGenerator.addEventListener("click", function(event) {
    if (size!=1){
        var cols=size,
            rows=size,
            wid=50,
            hei=50,
            cellTemplate=document.createElement('div');
            cellTemplate.className='cell';
            cellTemplate.className+=' notselected';
            cellTemplate.style.width=wid+'px';
            cellTemplate.style.height=hei+'px';
            maxNumber=size*size/2;
            mAllocation=getRandomNumbersForMatrix();

            for(var i=0;i<cols*rows;i++){
                var cell=cellTemplate.cloneNode(false);
                cell.style.top=Math.floor(i/cols)*hei+'px';
                cell.style.left=i%cols*wid+'px';
                cell.id=i;
                cell.addEventListener("mousedown",handleMouseover,false ); // assign events
                cell.innerHTML+=mAllocation[i] ;
                matrixGraphic.appendChild(cell);
                Elements[i]=cell;
            }
        matrixGenerator.disabled=true;
        matrixReset.disabled=false;
    }
    }, false);


matrixReset.addEventListener("click", function(event) {
    if (size!=1){
        if(matrixGraphic.hasChildNodes())
        matrixGraphic.innerHTML="";
        matrixGenerator.disabled=false;
        matrixReset.disabled=true;

        revealedCounter = 0;
        revealedArray = [];
        successfulAttempts=0;

        //JIC
        mAllocation = [];
        lastCellId = null;
        Elements = [];

        successMessage.style.visibility="hidden";
    }
}, false);


function getRandomNumbersForMatrix(){

    var c = [];
    for (var a=[],b=[],i=0;i<maxNumber;++i) {

        a[i]=i+1;
        b[i]=i+1;
    }
    c=b.concat(a);
    return shuffle(c);

}


function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}




