import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTodos } from '../api/todoApi';

interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Todo = () => { 
  const { data: todos, isLoading, isFetching, error } = useQuery<TodoItem[]>({
    queryKey: ['todos'],
    queryFn: getTodos,
    staleTime: 10000,
  })

  if (isLoading) return <div>Loading todos...</div>
  if (error) return <div>Error fetching todos</div>

  return (
    <div>
      <div>
        <h3>
          Todo List ({todos?.length || 0})
        </h3>
        {isFetching && <span>Refreshing...</span>}
      </div>

      <div>
        {todos && todos.map((item) => (
          <div key={item.id}>
            <span>
              {item.title} {item.id > 200 && <span>New (Local Cache)</span>}
            </span>
            <span>
              {item.completed ? 'Done' : 'Active'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todo