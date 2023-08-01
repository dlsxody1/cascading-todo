git# 바닐라 자바스크립트로 Todo 만들기.

![Alt text](<Honeycam 2023-07-31 16-41-41.gif>)

구동 방식이나 구현은 아주 간단했다.
todoForm에 Submit 이벤트가 일어나면 todo 요소들이 생기고
만약 input안에 내용이 없다면 "내용을 채워주세요" 라는 경고 메세지가 발생한다.
그리고 내용이 있어야만 todo들이 생성된다.
supabase라는 DB를 이용하기 위해서 mdn을 script에 연결했고,
supabase의 api key를 숨기기 위해서 webpack과 npm을 install했다.
하지만 webpack들을 이용하는데 있어서 수많은 issue들이 있었다.
몇가지 deprecated 된 프로퍼티도 있었고, 설치해야 될 것들도 많았다.
또한 웹팩을 이용해서 번들링하면 로딩 속도도 빨라질 것이다.. 라고 했지만
큰 차이를 느끼지 못했다.

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

supabase를 넣었다면 이런 방식으로 Todo app을 만들었을 것인데<br/>
webpack과 mdn 이슈로 잘 안되어서 pass하게 되었다.<br/> 기존 같았으면 될 때 까지 했겠지만 해야할 것들이 너무 많아서 잠깐 보류했다.<br/>

그 흔한 env로 환경변수를 관리하고자하는데도 webpack에 설정해줘야 할 것들이 많고 설치해야할 라이브러리들이 많으며 react에서 npm start만 해주면 일어났던 일들은 사실 '공짜'가 아니었다. 모두 어떤 명령어 들에 의해서 움직인 것이다.

나는 사실 이 프로젝트를 통해서 Javascript 이벤트나, javascript 메소드에 대한 이해보다는 webpack과 npm의 소중함과 중요함을 느꼈다. 개발자 분들이 참 신경써서 만들었구나... 했다.
webpack을 건드리다가 차라리 간단한 node server를 만들까 했지만,.. 오기가 두마리 토끼를 놓치게 만들었다.

webpack을 이용해서 env를 세팅하는 것은 추후에 업데이트 해보겠다.
