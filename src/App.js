/* eslint-disable jsx-a11y/anchor-is-valid */

import './App.css';
import { useState } from "react";

function App() {
    const navStyle = "flex flex-row justify-around text-2xl"
    let [ number, setNumber ] = useState( 0 )
    let [like , setlike] = useState(0)
    const [todolist, setTodolist] = useState([])
    
    
  // number: 우리가 쓸 변수
  // setNumber: 그 변수를 바꿔줄 앤데, 스토킹을 잘해서 number가 쓰인 모든 곳을 찾아가서 다 값 바뀐 거 반영해 줌(리렌더링)

  // 배열이나 객체는 좀 더 나중에.

  // 조건문 반복문
  // 반복문은 map 함수 추천
  // 조건문은 Short circuit, 3항 연산자, ...
  // (조건식) && ...

  // 자바스크립트에서 지원하는 여러 함수들 활용


  return (
    <div className="App">
      <header className="py-8 shadow-xl">
        <nav className={ navStyle }>
          <a onClick={  (event) => { setNumber(number + 1); console.log("카운트 업 클릭됨") }  }
          >Count up</a>
          <a>menu2 { true && "This is true" }</a>
          <a>menu3 { false ? "This is true" : "This is false" }</a>
          <a onClick={(event) => {setlike(like +1 ); console.log("like ~~ @")}}>
              Like
          </a>
        </nav>
      </header>
        <SampleComponent param1={ number } />
        <p>{like}</p>
        <div className="flex flex-col items-center py-8">
            <ToDoTable todolist={ todolist } setTodolist={setTodolist} />
            <div className="flex flex-row justify-between my-4 shadow p-3" style={{width: '800px'}}>
                <span>작성자</span>
                <input id="author" className="border-2" type="text" />
                <span>할일</span>
                <input id="task" className="border-2"  type="text" />
                <span>기한</span>
                <input id="deadline" className="border-2"  type="text" />
                <button className="border-2 rounded-full w-12 transform duration-100 hover:scale-110 active:scale-90"
                        onClick={(event) => {
                            let newArray = [ ...todolist ]
                            newArray.push({
                                name: document.querySelector('#author').value,
                                task: document.querySelector('#task').value,
                                deadline: document.querySelector('#deadline').value,
                                createdAt: new Date().toISOString().split('T')[0] , // '2021-11-29'
                            })                              // 즉시 실행
                            setTodolist(newArray)           // 예약 실행(0초)
                            console.log(newArray)
                        }}
                > 추가 </button>
            </div>
        </div>
    </div>
  );
}

// 대문자로 시작
function SampleComponent({ param1 }) {

  return (
      <div>
        <p>Sample Component { param1 }</p>
      </div>
  )
}

function ToDoTable({todolist, setTodolist}) {
    // {name: '홍길동', age: 20}
    // const {name, age} = object
    const tableStyle = {
        width: '800px',
    }
    const trStyle = "border-b "
    const btnStyle = "border-2 rounded-full w-12 transform duration-100 hover:scale-110 active:scale-90 "

    return (
        <table className="border-t-2 border-b-2" style={ tableStyle }>
            <thead className="border-b-2">
            <tr>
                <th>
                    <button className={ btnStyle + " w-20"}
                            onClick={(e) => {
                                const ckList = Array.from(document.getElementsByClassName('ckbox_item'))
                                // console.log(ckList)
                                // 선택삭제 filter
                                let newList = []
                                ckList.filter( (element, index) => { 
                                    if(!element.checked){
                                        newList.push(todolist[index])
                                    }
                                    element.checked = false
                                    return setTodolist(newList)
                                })
                                
                                // 선택삭제 for Each
                                // let newList = []
                                // ckList.forEach( (element, index ) => {
                                //     if (!element.checked) {
                                //         newList.push(todolist[index])
                                //         console.log(todolist[index])
                                //     }
                                //      element.checked = false
                                // setTodolist(newList)₩
                                // });
                                
                                // 선택삭제 체크박스 해제
                                
                            }}
                    >선택 삭제</button>
                </th>
                <th>작성자</th>
                <th>할일</th>
                <th>기한</th>
                <th>작성일</th>
                <th>수정</th>
            </tr>
            </thead>
            <tbody>
            
            {
                todolist.map((obj, index)=> {

                    const {name, task, deadline, createdAt} = obj;
                    

                    return (
                        <tr className={ trStyle }>
                            <td>
                                <input type="checkbox" className="ckbox_item" value={ index } />
                            </td>
                            <td>{ name }</td>
                            <td>{ task }</td>
                            <td>{ deadline === new Date().toISOString().split('T')[0] ? '오늘' : deadline }</td>
                            <td>{ createdAt === new Date().toISOString().split('T')[0] ? '오늘' : createdAt }</td>
                            <td>
                                <button className={ btnStyle }>수정</button>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default App;