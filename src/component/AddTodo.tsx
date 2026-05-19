import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTodo } from '../api/todoApi'

interface TodoItem {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
}

const AddTodo = () => {
  const [title, setTitle] = useState("Learn TanStack Query")
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: addTodo,
    
    // 1. Triggered right before the mutation function runs
    onMutate: async (newTodo) => {
      console.log("Mutation started (onMutate) - Payload:", newTodo)
    },
    
    // 2. Triggered when the mutation is successful
    onSuccess: (newTodo: TodoItem, variables) => {
      console.log("Mutation succeeded (onSuccess) - Received response:", newTodo)
      
      // Update local query cache
      queryClient.setQueryData<TodoItem[]>(['todos'], (oldTodos) => {
        return [newTodo, ...(oldTodos || [])]
      })
    },

    // 3. Triggered if the mutation encounters an error
    onError: (error, variables) => {
      console.error("Mutation failed (onError) - Error info:", error)
    },

    // 4. Triggered when mutation is either successful or has an error
    onSettled: (data, error, variables) => {
      console.log("Mutation completed (onSettled)")
    }
  })

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    mutation.mutate({
      title: title,
      completed: false
    })
  }

  return (
    <div>
      <h3>Create Todo (POST)</h3>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title..."
        />
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Adding...' : 'Add Todo'}
        </button>
      </form>

      {mutation.isPending && (
        <div>
          Sending POST request...
        </div>
      )}

      {mutation.isError && (
        <div>
          Error: {mutation.error instanceof Error ? mutation.error.message : 'Unknown error occurred'}
        </div>
      )}

      {mutation.isSuccess && mutation.data && (
        <div>
          <h4>✓ POST Response Received!</h4>
          <pre>
            {JSON.stringify(mutation.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default AddTodo