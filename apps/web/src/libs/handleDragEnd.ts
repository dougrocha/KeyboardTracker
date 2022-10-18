import { DragEndEvent } from "@dnd-kit/core"
import { Dispatch, SetStateAction } from "react"

export default function handleDragEnd<T extends unknown[]>(
  event: DragEndEvent,
  setState?: Dispatch<SetStateAction<T>>
) {
  const { active, over } = event

  if (active.id !== over?.id) {
    if (!setState) {
      console.debug("setState undefined", {
        active,
        over,
      })
      return
    }

    setState((items) => {
      const activeId = active.id as unknown as String
      const oldIndex = items.indexOf(activeId)
      const newIndex = items.indexOf(over?.id as unknown as String)
      const newItems = [...items]
      newItems.splice(oldIndex, 1)
      newItems.splice(newIndex, 0, activeId)
      return newItems as T
    })
  }
}
