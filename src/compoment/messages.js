import React from "react";

function Messages(props) {
    const message = props.Data;

    function reqmes(reqm) {
        // TODO : 메시지 클릭 시 답변이 나오게 한다.
        return(
            <div className="bg-sky-100 rounded-md h-10 px-5 w-auto max-w-md flex items-center border-2 border-sky-400 font-light"> {reqm} </div>
        )
    }

    function resmes(item) {
        if (item.type === "REQ") {
            return (
                <div className="bg-red-100 rounded-md h-10 px-5 w-auto max-w-md flex items-center border-2 border-red-400 font-light"> 
                    {item.content}
                </div>
              )
        }
        return(
            <div className="bg-white rounded-md h-10 px-5 w-auto max-w-md flex items-center border-2 border-gray-400 font-light"> 
                {item.content} 
            </div>
        )
    }

    function messages(tmp) {
        const result = tmp.map((item) => {
            if (item.type === "MEQ") {
                return (
                    <div className="my-6 h-10 w-full text-right flex justify-end">
                        {reqmes(item.content)}
                    </div>
                  )
            }
            return (
                <div className="my-6 h-10 w-full text-left flex justify-start">
                    {resmes(item)}
                </div>
              )
        })

        return result;
    }

    return (
        <div className="mx-[15vw] mb-10 min-h-[600px] h-auto max-h-[80vh] w-[70vw]">
            {messages(message)}
        </div>
    );
  }
  
  export default Messages;
  