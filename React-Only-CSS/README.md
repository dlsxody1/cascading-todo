# React Only Css + Vite

## React와 그냥 CSS로 TODO만들기!

일단 App.jsx만 봐도 반복되는 이벤트 투성이다.
이것은 물론 그냥 javascript라서 그런 것은 아니다...
hooks 등의 리팩토링은 다음 typescript에서 진행할 예정이다.

우선 몇가지 코드를 간단하게 살펴보면
update,delete,insert의 생김새가 모두 같기 때문에 insert를 기준으로 설명해보겠다.

//supabase/supbase.js

```javascript
//reacttodo라는 테이블에 todo라는 column을 넣어서
//새로운 row를 만든다.
const addTodo = async (todo) => {
  const { error } = await supabase
    .from("reacttodo")
    .insert([{ todo: todo }])
    .select();
  //insert문을 쓰고나서 select문을 사용한 이유는
  //데이터가 잘 들어갔는지 확인하기 위함.
  if (error) throw error;
};
```

//App.jsx

```javascript
const [inputData, setInputData] = useState("");

//useMuation 를 왜썼냐? -> 일단 useMutation은 서버에 데이터 변경 작업을 요청할 때 사용하고, DB의 데이터를 변형시키고 그것을 불러와야하기 떄문에
//queryClient.invalidateQueries(query) 이것은 (useQuery를 사용해 get요청을 해서 받아온)캐시 되어있는 데이터를 업데이트 합니다
const postMutate = useMutation((inputData) => addTodo(inputData), {
  onSuccess: () => queryClient.invalidateQueries(query),
  onError: () => {
    console.log("추가 실패!");
  },
});
//.mutate는 useMutation을 이용해 작성한 내용들이 실행될 수 있도록 trigger 역할을 해줍니다.
//useMutation을 정의 해둔 뒤 이벤트가 발생했을 때 mutate를 사용하면됩니다.
const onSubmitValue = (e, todo) => {
  e.preventDefault();
  postMutate.mutate(todo);
};
```

//App.jsx 의 jsx문

```javscript
 <form
                className="todo__form"
                onSubmit={(e) => onSubmitValue(e, inputData)}
              >
                <input
                  className="todo__input"
                  type="text"
                  placeholder="할 일을 입력하세요"
                  onChange={onChangeValue}
                />
                <button className="todo__button">추가</button>
              </form>
              <div className="todo__list">
                <div className="todo">
                  {data?.map((el) => {
                    return (
                      <div className="todo__box" key={el.id} name={el.id}>
                        {todoToggle.id !== el.id || !todoToggle.toggle ? (
                          <div>{el.todo}</div>
                        ) : (
                          <input
                            onChange={modifyOnChangeValue}
                            name={el.id}
                            type="text"
                            defaultValue={el.todo}
                          />
                        )}

                        <div className="button__box">
                          {todoToggle.id !== el.id || !todoToggle.toggle ? (
                            <button
                              className="button__modify"
                              onClick={() => modifyTodo(el.id)}
                              data-todo-id={el.id}
                            >
                              수정
                            </button>
                          ) : (
                            <form
                              onSubmit={(e) =>
                                updateSubmitTodo(e, modifyInputData, el.id)
                              }
                            >
                              <button className="button__modify__submit">
                                완료
                              </button>
                            </form>
                          )}

                          <button
                            className="button__delete"
                            onClick={() => mutate(el.id)}
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    );
                  })}
```

issue

전

```javascript
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);
```

후

```javascript
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
```

## 느낀점.

```css
1. javascript
일단 typescript와 css-in-js를 자주 사용했던 사람으로서
todo에 어떤 값이 들어와야하는지 id에는 어떤 형태의 값이 들어와야 하는지 체크하기 어려웠고, 그에 따른 에러메세지들은 브라우저의 Error에서만 체크할 수 있었다.
typescript에서 일어났던 컴파일 단계에서의 에러들이 없었고,
꼭 실행하고 나서야 에러가 발생했다
이걸.. 좋아해야하나 싫어해야 하나.. 생각해보니 나는 싫었던 것 같다. 컴파일 단계에서 다 해주는데 typescript는 말이다.
약간 애증인 것 같다.

2.just css
css... 너무나 불편했다. 규칙을 정해서 className을 만든다고 하더라도 이것은 너무나 많은 고민을 해야했다.
styled-componets, tailwindCss 가 그리웠다. (물론 styled-components는 컴포넌트 명을 고민해야 할 필요가 있었지만?) 그리고 nesting이라는 기능 너무나 감사한 기능이었다. 선택자의 combinator를 통해서 하는 것은 헷갈릴수도 있다. 예를들면
body h1 + p .special {
  color: yellow;
  background-color: black;
  padding: 5px;
}

이런거 있잖나.. body 안에 h1 형제의 p 안에 있는 claasName special 과 같은.. 아는 형님의 아는 누님의 아는 동생이요~ 같은거..

css 파일을 새로 만드는 것도.. 조금은 귀찮다고 느꼈다.
아무래도 tailwindCSS 취향인 것 같다.

3.hooks 만들기 쉽지 않다.
react-query를 사용해서 hook을 만들려고 했으나
여러가지 에러를 발견해서 잠정 중단했다
react-typescript에서 다시 한 번 도전 할 것이지만 관심사의 분리부터해서 머릿속에서 조그만한 정보들이 엉켜 더 어렵게 만드는 것 같다.
그리고 기본적인 onChange, onSubmit hook을 안만들었더니
한 페이지에서 엄청나게 같은양의 코드가 불어났다.
hook의 중요성 ! 또 한 번 깨닫는다!

```
