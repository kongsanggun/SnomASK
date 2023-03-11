import React from "react";

function Messages(props) {
    const message = props.Data;

    function reqmes(reqm) {
        // TODO : 메시지 클릭 시 답변이 나오게 한다.
        return(
            <div className="bg-gray-200 rounded-md h-10 px-5 w-auto max-w-md flex items-center"> {reqm} </div>
        )
    }

    function resmes(resm) {
        return(
            <div className="bg-gray-400 rounded-md h-10 px-5 w-auto max-w-md flex items-center"> {resm} </div>
        )
    }

    function messages(tmp) {
        const result = tmp.map((item) => {
            if (item.type === "MEQ") {
                return (
                    <div className="my-6 h-10 w-full text-right flex justify-end">
                        <div></div>
                        {reqmes(item.content)}
                    </div>
                  )
            }
            if (item.type === "REQ") {
                return (
                    <div className="my-6 h-10 w-full text-left flex justify-start border border-red-30">
                        {resmes(item.content)}
                    </div>
                  )
            }
            return (
                <div className="my-6 h-10 w-full text-left flex justify-start">
                    {resmes(item.content)}
                </div>
              )
        })

        return result;
    }

    return (
        <>
            <div className="px-6 my-10 border-zinc-800 min-h-[600px] h-auto w-full rounded-sm">
                {messages(message)}
            </div>
        </>
    );
  }
  
  export default Messages;
  