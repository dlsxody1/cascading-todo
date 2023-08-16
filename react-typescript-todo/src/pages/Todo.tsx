import TodoBefore from "../components/TodoBefore";

const Todo = () => {
  return (
    <>
      <div className="w-full h-100vh flex items-center justify-center">
        <div className="w-1/2 h-3/4 bg-orange-200">
          <TodoBefore />
        </div>
      </div>
    </>
  );
};

export default Todo;
