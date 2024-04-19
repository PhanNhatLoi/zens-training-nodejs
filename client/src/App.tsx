import { useEffect, useState } from "react";
import { TodoType } from "./types";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

function App() {
  // const
  const [todoList, setTodoList] = useState<TodoType[]>([]); // list to do from server
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // effect data
  useEffect(() => {
    fetchData();
  }, []);

  // function fetchData
  // get all todo works
  const fetchData = async () => {
    try {
      client
        .query({
          query: gql`
            query {
              TodoList {
                _id
                name
                description
                status
              }
            }
          `,
        })
        .then((result) => {
          setTodoList(result.data.TodoList);
        });
    } catch (error) {
      setTodoList([]);
      console.log(error);
    }
  };

  // handle listener

  // create new todo work
  const handleCreate = () => {
    try {
      client
        .mutate({
          mutation: gql`
            mutation {
              createTodo(name: "${name}", description: "${description}")
            }
          `,
        })
        .then(() => {
          fetchData();
          setName("");
          setDescription("");
        });
    } catch (error) {
      console.log(error);
    }
  };
  // delete one line todo
  const handleDelete = (_id: string) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        client
          .mutate({
            mutation: gql`
            mutation {
              delete(_id: "${_id}")
            }
          `,
          })
          .then(() => {
            fetchData();
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // update state todo
  const handleChangeStatus = (_id: string, action: boolean) => {
    try {
      client
        .mutate({
          mutation: gql`
              mutation {
                changeStatus(_id: "${_id}", status:"${action ? "DONE" : "NEW"}")
              }
            `,
        })
        .then(() => {
          fetchData();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // todo app
    <div className="h-screen w-screen">
      <div className="w-full text-center text-5xl font-bold">
        <span>Todo List</span>
      </div>
      {/* body */}
      <div className="w-full flex flex-wrap">
        {/* sidebar */}
        <div className="w-full md:w-1/5 p-10">
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="border w-full h-10 rounded p-2 m-1"
            type="text"
            name="name"
            placeholder="Name"
          />
          <input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="border w-full h-50 rounded p-2 m-1"
            name="description"
            placeholder="Description"
          />
          <button
            disabled={!name}
            className="w-full h-10 rounded bg-cyan-400"
            onClick={handleCreate}
          >
            Submit
          </button>
        </div>
        <div className="w-full md:w-4/5 border-l flex justify-center p-10">
          <div
            className="w-full md:w-3/5"
            style={{ height: "80vh", overflow: "auto", marginTop: "10px" }}
          >
            {todoList.map((item) => {
              return (
                <div
                  style={{ minHeight: "100px" }}
                  className="w-full border flex items-center justify-between flex-wrap p-2 rounded mb-10"
                  key={item._id}
                >
                  <div style={{ height: "30px", width: "30px" }}>
                    <input
                      onClick={(e: any) => {
                        handleChangeStatus(item._id, e.target.checked);
                      }}
                      checked={item.status === "DONE"}
                      type="checkbox"
                      className="w-full h-full"
                    />
                  </div>
                  <div
                    className={`w-4/5 h-full break-words ${
                      item.status === "DONE" ? "line-through" : ""
                    }`}
                  >
                    <span className="block text-2xl">Name: {item.name}</span>
                    <span className="block">
                      <i>Des: {item.description}</i>
                    </span>
                  </div>
                  <div className="h-full w-7">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="border w-7 h-7 rounded"
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
