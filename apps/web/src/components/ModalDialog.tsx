import {
  useFloating,
  useInteractions,
  useClick,
  useRole,
  useDismiss,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from "@floating-ui/react-dom-interactions"
import React, { cloneElement, useId, useMemo, useState } from "react"
import { mergeRefs } from "react-merge-refs"

interface ModalDialogProps {
  open?: boolean
  render: (props: {
    close: () => void
    labelId: string
    descriptionId: string
  }) => React.ReactNode
  children: JSX.Element
}

const ModalDialog = ({
  render,
  open: passedOpen = false,
  children,
}: ModalDialogProps) => {
  const [open, setOpen] = useState(passedOpen)

  const { reference, floating, context } = useFloating({
    open,
    onOpenChange: setOpen,
  })

  const id = useId()
  const labelId = `${id}-label`
  const descriptionId = `${id}-description`

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context),
  ])

  // Preserve the consumer's ref
  const ref = useMemo(
    () => mergeRefs([reference, (children as any).ref]),
    [reference, children]
  )

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref, ...children.props }))}
      <FloatingPortal>
        {open && (
          <FloatingOverlay
            lockScroll
            style={{
              display: "grid",
              placeItems: "center",
              background: "rgba(25, 25, 25, 0.25)",
            }}
          >
            <FloatingFocusManager context={context}>
              <div
                ref={floating}
                className="grid h-full w-full place-items-center"
                aria-labelledby={labelId}
                aria-describedby={descriptionId}
                {...getFloatingProps()}
              >
                {render({
                  close: () => setOpen(false),
                  labelId,
                  descriptionId,
                })}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  )
}

export default ModalDialog
