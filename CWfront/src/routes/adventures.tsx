import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/adventures')({
  component: () => <div>Hello /adventures!</div>,
})
