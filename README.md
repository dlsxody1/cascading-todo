# cascading-todo

Vanila JS, React Only css, React TailwindCSS typescript로 TODO를 만들어 보았습니다.

React only css Link : https://boisterous-chimera-4a83b6.netlify.app/
React tailwindCSS typescript Link : https://chimerical-kataifi-a5e06a.netlify.app/todo

### 만들고자 한 이유

일단 기본적으로 todo는 웹 서비스의 기반이 되는 기능입니다.
Create , Read, Update, Delete .
또한 JS도 요즘 많이 사용하는 React, Next, Vue ..등의 근간이 되는 언어입니다. React 같은 경우에 .. 왜 쓰는지 이유를 알기 위해선 자바스크립트로 웹 어플리케이션을 만들어보고, 어느 부분이 편했는지 그리고 CSS도 마찬가지 입니다. 왜 CSS-in-JS나 tailwind를 사용하는지 왜 생산성이 증가하는가 몸소 느끼기 위해서 cascading 즉, 위에서 아래로 오래된 기술부터 천천히 만들어보고자 했습니다.<br/>
비록 JS는 TODO를 DB가 아닌, 이벤트 리스너로 html 요소를 붙이는 방법으로 만들었지만, 확실히.. React와 같은 프레임워크의 편리성을 또 한 번 몸소 느끼는 기회였습니다.

# 바닐라 자바스크립트로 Todo 만들기.

<img src="./Honeycam 2023-07-31 16-41-41.gif" />
구동 방식이나 구현은 아주 간단했습니다.
todoForm에 Submit 이벤트가 일어나면 todo 요소들이 생기고
만약 input안에 내용이 없다면 "내용을 채워주세요" 라는 경고 메세지가 발생합니다.
그리고 내용이 있어야만 todo들이 생성되고
supabase라는 DB를 이용하기 위해서 mdn을 script에 연결했고,
supabase의 api key를 숨기기 위해서 webpack과 npm을 install했습니다.
하지만 webpack들을 이용하는데 있어서 수많은 issue들이 있었습니다.
몇가지 deprecated 된 프로퍼티도 있었고, 설치해야 될 것들도 많았습니다.
또한 웹팩을 이용해서 번들링하면 로딩 속도도 빨라질 것이다.. 라고 했지만
큰 차이를 느끼지 못했습니다.

## DB를 넣었다면..?

```javascript
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://xyzcompany.supabase.co",
  "public-anon-key"
);

// Todo 목록을 가져올 때

const { data, error } = await supabase.from("todo").select();

// Todo 목록을 추가할 때
const { data, error } = await supabase
  .from("todo")
  .insert({ content: "밥먹기" });

// Check Button을 눌렀을 때 (삭제할 때)
const { data, error } = await supabase.from("todo").delete().eq("id", 1);
// 그리고 새로 생긴 Todo에다가 각각 Id를 붙여줬을 것이다.
```

supabase를 넣었다면 이런 방식으로 Todo app을 만들었을 것인데 너무나 많은 오류로 잠정 보류했습니다. CRA나 VITE가 많은 기능을 포함해 빌드해준다는 사실을 또 알게 되었습니다.

그 흔한 env로 환경변수를 관리하고자하는데도 webpack에 설정해줘야 할 것들이 많고 설치해야할 라이브러리들이 많으며 react에서 npm start만 해주면 일어났던 일들은 사실 '공짜'가 아니었습니다. 모두 어떤 명령어 들에 의해서 움직인 것이다.

저는 사실 이 프로젝트를 통해서 Javascript 이벤트나, javascript 메소드에 대한 이해보다는 webpack과 npm의 소중함과 중요함을 느꼈습니다. 개발자 분들이 참 신경써서 만들었구나... 했습니다.
webpack을 건드리다가 차라리 간단한 node server를 만들까 했지만
react가 벌써 그리워져 빨리 바닐라 프로젝트를 마치고 싶었습니다
하지만 예전 노마드 코더 선생님과 함께 했던 지난 시간들이 새록새록 떠오르는 재미있던 시간이기도 했습니다 !

# React CSS만 써서 Todo 만들기

이 때 부터는 VITE를 사용해서 빌드하였습니다.
<img src="./Honeycam 2023-08-19 00-42-18.gif">

### CSS

styling이 많지는 않지만, css를 사용해서 만들었는데, 그냥 날 것의 css는 많이 불편했습니다. 어떤 점이 불편했냐면

- 클래스 이름을 정해주는 것이 불편했습니다. - 변수명 정하는 것도 많은 고민이 들어가는데 클래스 이름까지 짓기에는 너무 머리아프고 고민하는 시간이 조금 아깝다고 생각했습니다.
  <br/>
- CSS 결합자와 같은 요소들을 nesting 할 수 없는 것이 아쉬웠습니다. - styled-components 나 scss는 nesting이 되어 굳이 바깥에 객체를 하나 만들지 않고도 사용할 수 있고, 중복된 속성에 mixin을 사용할 수 없었습니다.
  <br/>
- style 폴더에 너무 많아지는 css 파일 - 저는 비록 하나의 todo.css를 사용했지만, 만약 더 많은 기능과 페이지가 생긴다고 했을 때는 조금 찾기 어려워 생산성이 떨어지지 않을까? 생각했습니다.
  <br />

### React

바닐라 자바스크립트와 리액트, 페이지를 전환할 일이 많고, 데이터를 송수신 할 일이 많았더라면 성능 차이를 느낄 수 있었겠지만 일단 이 Todo에서는 크게 느끼지 못했습니다. 하지만 '컴포넌트'라는 개념이 조금 더 생산성을 향상 시킬 수 있겠다. 라고 생각한 부분은
Custum hook과, JSX문입니다. react-only-css에는 jsx에 비즈니스 로직이 너무나 많이 들어있지만, 그것과는 별개로

```javascript
export const usePostQuery = (todo, query) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addTodo(todo), {
    onSuccess: () => queryClient.invalidateQueries(query),
    onError: () => {
      console.log("만들기 실패!");
    },
  });

  return mutate;
};
```

위 코드와 같이 이런 hook을 만들어서 필요한 곳에 적재적소에 사용하고, 재사용 될 수 있을 것 같은 JSX문, 로직들을 컴포넌트화해서 똑같은 코드를 복사 붙여넣기 하는 것이 아니라 import 라는 명령어로 쉽게 갖다 쓸 수 있다는 점이 장점이라고 느꼈고,
(물론 컴포넌트 이름을 짓는다거나, 어떤 기준으로 컴포넌트를 만들 것인가? 그것에 대해서는 고민을 많이 해야되는 것이 힘들긴 하다.)

위에서 말했던 env 와 같은 모듈을 알아서 내장된 상태로 빌드해주니 정말 편하지 않을 수 없었다.
또한 react-query로 서버 상태를 관리 했는데, get 요청으로 받아온 데이터들을 알아서 캐싱해 불필요한 요청을 줄여주고,
useMutation 과 같은 hook으로 db상태가 업데이트 되었을 때 (CREATE, DELETE, UPDATE) 리렌더링 해주는 것이 아주 편리했다. 물론 그것을 이해하고 사용하는데는 시간이 좀 걸렸지만.. 바닐라 자바스크립트로 구현하려면 , cache api를 사용해서 구현해야 한다고 한다.
이런 라이브러리 생태계를 이용할 수 있는 것도 리액트의 아주 큰 장점이라고 생각합니다.

# React-Typescript + tailwind css

<img src="./Honeycam 2023-08-19 09-29-41.gif"/>
이번에야 말로 리액트 내장 hook들이 필요한 함수들을 다 hooks로 만들고,(다른 레이아웃에 쓰일 것이라는 가정하에 만들어 보았습니다. ) 
typescript와 tailwind css를 사용하여 만들었습니다.
느낀 점을 간단하게 말씀드리면

## hooks

바로 위에 있는 프로젝트에서는 레이아웃이 있는 컴포넌트에서 모든 비즈니스 로직을 다 썼습니다. 어떤식으로 체크박스가 움직이는지도 전부 하나의 컴포넌트에서 이루어졌습니다만 여기에선, hooks라는 폴더를 만들어 리액트의 내장 hooks 들이 사용되는 로직들을 전부 hook로 만들었습니다. 학습의 용도이어서 그렇긴 하지만 모두 재사용된다는 가정하에 말이죠.  
이것은 제가 만든 useInput 이라는 hook입니다.
그 이외에도 useCheckbox, useQueryHooks 을 만들었는데
한 웹사이트에서 다양한 Input 요소를 사용하는 일이 많은데
그런 곳에다가 적재적소에 사용하면 좋습니다.

```javascript
import { ChangeEvent, FormEvent, useState } from "react";
import { signIn } from "../lib/supabase";

// 어떤 state를 초기값으로 전달하면 좋을까 생각했는데, string인 경우가 있고, 객체 형태인 경우가 있습니다.
//그래서 유니온 타입으로 지정할까 했습니다만, 다양한 인자를 받고자 해서 any로 정했습니다.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useInput = (initState: any) => {
  const [state, setState] = useState(initState);

  //객체형태의 input data를 받을 때의 커스텀 훅입니다.
  const onObjectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //string 형태의 인자를 받았을 때는 이 함수를 사용하도록 합니다.
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  //type이 login 일 때는 signIn을 받고
  //다양한 타입의 submit event를 분기로 처리할 수 있겠죠?

  const onSubmit = async (e: FormEvent<HTMLFormElement>, type: string) => {
    e.preventDefault();
    if (type === "login") {
      await signIn(state);
    }
  };

  return { onObjectChange, onTextChange, onSubmit, state };
};

export { useInput };
```

사용할 때는 아래와 같이 사용합니다.

```javascript
// components/TodoBox.tsx
const { useGetTodoQuery, useDeleteTodoQuery, useUpdateTodoQuery } =
  useQueryHooks();
const { data, isLoading } = useGetTodoQuery();
const { deleteTodoHandler } = useDeleteTodoQuery();
const { updateTodoHandler } = useUpdateTodoQuery();
const {
  toggleCheckBox,
  checkValue,
  setCheckValue,
  changeCheckBox,
  completedTodos,
} = useCheckout();
const { onTextChange, state } = useInput("");
```

이와 같이 필요한 요소들을 사용할 수 있었습니다.
이러한 hook를 만드는 것은 가독성 측면이나 관심사의 분리 측면에서 정말 좋았습니다. 하지만, 이것들을 만들고 테스트 하는데 있어서 시간이 투자 되기 때문에 빠른 개발이 필요하다면 엄청 빨리 만들 수 있게 숙련하거나, 안만드는 쪽이 좋다고 생각했습니다. 저는 물론 전자가 될 수 있도록 노력 할 것입니다..

<br/>

## Typescript

아는 동료분 중에 한 분이 그랬습니다. 이제 타입스크립트가 오히려 편하다. 라고요 매일 툭하면 컴파일 에러를 발생하는데 뭐가 그리 편할까요?

```typescript
export interface ResponseProps {
  id: number;
  todo: string;
  createdAt: Date;
}
```

위와 같이 객체를 정의 할 때는 interface를 쓰곤하는데, 자바스크립트를 쓰면 이런거 정의할 필요도 없잖아! 라고 생각한 적이 있었습니다. 하지만 무엇이 편할까 생각해보면..
<br />

1. db의 컬럼 타입 맞추기 => 클라이언트가 db에게 보내준 type이 다르면 error가 발생합니다. 불안정하게 전송되는 것이죠. 위와 같이 interface, type 등을 정의해서 데이터를 전송하면 적어도 type 때문에 에러가 생길 일은 없습니다.

2. 컴파일 에러 => 컴파일 에러가 장점..? 이라구요? 제가 느낀 것은 장점이었습니다. 어떤 부분이냐면, 런타임 단계가 아니라 컴파일 단계에서 이미 에러를 알려주기 때문입니다! 그러면 실행하지 않고도 어느 부분에서 에러가 났는지 (물론 type 관련 에러지만) 알려주고, 자동으로 타입추론까지 해준다? 무조건 사용해야겠잖아?! 라고 생각했습니다.

하지만 나머지는 그렇게 편하지는 않았습니다만, 프론트 이외에 다른 백엔드 개발자 분들과 평화를 위해서 사용한다면 안정성 있는 개발을 할 수 있지 않을까 싶습니다.

### tailwind CSS

저는 주로 styld-components를 사용해 개발했습니다만, 요 근래에 다른 프로젝트에 tailwind css를 쓰면서 이게 정말 좋다고 생각했습니다. 최근에 tailwind css 절망편이라는 이미지를 봤는데, 한 요소에 className이 몇십개가 있는 것을 봐서 이런걸 왜쓰나? 싶기도 하지만 제가 느껴본 바를 말씀드리면
<br />

1. 역시나 class이름 안지어도 된다! style 요소가 곧 class 이름! => 하지만 이건 양면성이 좀 있습니다. 이름 안지어도 되는거 물론 장점이지만 만약 협업했을 때 내가 tailwind로 된 다른 사람의 코드를 고쳐야 할 일이 생겼다.,, 이렇게 되면 조금 머리 아플 수도 있을 것 같다고 생각했습니다.

2. 파일을 따로 만들지 않고 레이아웃 자체에서 처리합니다. => style 폴더를 따로 만들지 않아서 용량이 줄어들고 그에 따른 빌드 속도도 증가할 것이라 저는 감히 예상합니다.

3. 빠른 개발 가능 ! => 물론 처음에 margin-left -> ml 과 같은 축약어가 어색할지 모르겠지만 익숙해지면 필요한 속성들은 후다닥 개발할 수 있고, custom 속성을 정의 할 수 있어서 이런 부분은 협업에도 능할 수 있습니다.

## 느낀점

다양한 feature, languge 사용하고 개발하는 것은 개발자의 당연한 덕목입니다. 하지만 그 뿌리와 기본적인 이해가 없이 사용한다면 쪼오끔 아쉬운 개발자가 될 것이라 생각합니다. 저 역시 많이 부족하고 뿌리를 강조하지만 , 기본이 완벽하다고 생각하지 않습니다. 하지만 이런 경험으로 인해 왜 why?! 써야하는지 또 한 번 느끼고 , 편리한 개발 생태계를 만들어주신 선배님들에게 감사를 느낍니다.. 그리고 hook와 같이 함수를 컴포넌트화 해서 사용했던 것은 앞으로의 프로젝트에 더 신경써서 만들어볼 예정입니다.
