import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTodo } from '../api/todoApi';
const DuplicatedTodo = ({ idValue }) => { 
  const {data: todo, isLoading,isFetching, error} = useQuery({
    queryKey: ['todos', idValue],
    queryFn: () => getTodo(idValue),
    staleTime: 5000, // Data is considered fresh for 5 seconds
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching todos</div>

  return (
    <div>
  {isFetching && <>Refreshing...</>}  

      {Array.isArray(todo) ? (
        todo.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.completed ? 'Completed' : 'Not Completed'}</p>
          </div>
        ))
      ) : (
        <div key={todo.id}>
          <h2>{todo.title}</h2>
          <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
        </div>
      )}

    </div>
  )
}

export default DuplicatedTodo;
