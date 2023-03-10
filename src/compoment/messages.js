import React from "react";

function Messages(props) {
    const message = props.Data;

    function reqmes(reqm) {
        return(
            <div className="my-6 bg-gray-200 rounded-md h-10 w-auto items-center"> {reqm} </div>
        )
    }

    function resmes(resm) {
        return(
            <div className="my-6 bg-gray-400 rounded-md h-10 flex items-center"> {resm} </div>
        )
    }

    function messages(tmp) {
        const result = tmp.map((item) => {
            if (item.type === "MEQ") {
                return (
                    <div className="h-auto w-auto text-right">
                        {reqmes(item.content)}
                    </div>
                  )
            }
            return (
                <div className="h-auto w-auto text-left">
                    {resmes(item.content)}
                </div>
              )
        })

        return result;
    }

    return (
        <>
            <div className=" my-10 border-zinc-800 h-96 w-full bg-sky-100">
                {messages(message)}
            </div>
        </>
    );
  }
  
  export default Messages;
  