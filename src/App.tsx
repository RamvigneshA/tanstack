import { useState } from 'react';
import './App.css'
import { Todo, DuplicatedTodo, AddTodo} from './component'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>TanStack Query Playground</h1>
        <AddTodo />
        <Todo />
      </div>
    </QueryClientProvider>
  )
}

export default App