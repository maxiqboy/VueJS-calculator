
new Vue({
el: '#app',
data: {
    expression: '',
    result: '0',
    operatorArray: ["+","-","*","/"] 
},

methods: {
    pressNumber(num)   {
        

         //not allow a number to begin with multiple zeros.
        // input: 00000 ~~> AC 

        
        this.result = (this.result == '0'|| this.lastItemIsOperator() ||this.expression.includes("=") ) ? num
                    : (this.expression===''&&num==='0')? 0
                    : (this.result + num);
        
        this.expression = (this.expression.includes("="))?num
                        :(this.expression===""&&num==='0')? ""
                        : this.expression+num;
        
               
     
    },
    pressOperator(item){

        //If 2 or more operators are entered consecutively, the operation performed should be the last operator entered.
        // input: 6+-*:8 ~> display: 6:8

        if(this.expression===''&&this.result==='0') return;

    
        this.expression = (this.lastItemIsOperator()&&(item!="-")) ? this.expression.slice(0,-1) + item
                        : (this.expression.includes("=")) ? this.result + item
                        : this.expression+item;
        
        this.result = item;
    },

    pressDot(){

        //if (this.expression.includes('.')) return;
        if (!this.checkDotLegit()) return;
        
        if (this.expression === '') {
            this.expression = "0.";
            this.result = "0."; }
        else {
            this.expression += '.';
            this.result += '.';
        }

       
    },
    pressNegative(){


    },

    clear(){
        this.result = '0';
        this.expression ='';
    },

    equal() {
        if (this.expression.includes("=")) this.expression = this.expression.slice(0,-1);
        this.result=Number(eval(this.expression).toFixed(8));
        this.expression += "=";
    },

    lastItemIsOperator(){

        let lastItem = this.expression.slice(-1);

        return (this.operatorArray.includes(lastItem))?true:false;
        
        /* if (this.operatorArray.includes(this.expression.slice(-1))) return true;
        else return false;
        */
    },
    
    checkDotLegit () {
        let lastIndexOfOperator = 0;
        
        for(i=0;i<this.operatorArray.length;i++) {
           if ( this.expression.lastIndexOf(this.operatorArray[i]) > lastIndexOfOperator )
                lastIndexOfOperator = this.expression.lastIndexOf(this.operatorArray[i]);
        }

        let sliceCheck = this.expression.slice(lastIndexOfOperator);
        

        return (sliceCheck.includes('.'))? false:true;

    }

}

});