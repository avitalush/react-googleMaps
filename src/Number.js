import React from "react";
export default function GuessNumber(props) {
   const [status,SetStatus]=React.useState();
   const [status1,SetStatus1]=React.useState();

   function showNumber(num) {
      if(props.player===1)
      {
         if (num > props.random)
         SetStatus("big")
      else {
         if (num < props.random)
         SetStatus("small")       
         else
            SetStatus("excellent");
        }
      }
      else{
         if (num > props.random)
         SetStatus1("big")
      else {
         if (num < props.random)
         SetStatus1("small")       
         else
            SetStatus1("excellent");
        }
      }
      
   }

   return <>
           
      <Rand showNumber={showNumber} player={1}/>
      {status}
      <Rand showNumber={showNumber} player={2}/>
      {status1}
   </>

}
function Rand(props) {
   return <input onBlur={(e) => props.showNumber((Number)(e.target.value),props.player)}></input>;
}










